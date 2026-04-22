import {
  Upload,
  FileText,

  CheckCircle2,
  History,
  PenSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "@/config/axiosConfig.js";
import { motion, AnimatePresence } from "framer-motion";
import HistoryTab from "@/components/HistoryTab.jsx";
import { fetchHistoryApi } from "@/api/progress/index.js";

const SUBJECTS = [
  "Physics",
  "Physical Chemistry",
  "Organic Chemistry",
  "Inorganic Chemistry",
  "Botany",
  "Zoology",
];

const DashCompo = ({ activeSubject, setActiveSubject }) => {
  const [tab, setTab] = useState("today");
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState(
    SUBJECTS.reduce((acc, sub) => {
      acc[sub] = {
        topic: "",
        notesUrls: [],
        dppUrls: [],
        history: [],
        isUploadingBg: false, // background upload
        isSubmitting: false, // UI upload (on submit)
        progress: {},       // track upload percentage
        pendingUploads: {  // this will store promises not files or url
          notes: [],
          dpp: [],
        },
      };
      return acc;
    }, {}),
  );

  const today = new Date().toISOString().split("T")[0];

  // ================= HANDLE FILE UPLOAD =================
  const handleFileUpload = async (files, type) => {
    const fileArray = Array.from(files);

    try {
      // 🔥 1. Set uploading true
      setData((prev) => ({
        ...prev,
        [activeSubject]: {
          ...prev[activeSubject],
          isUploadingBg: true,
        },
      }));
     

      // 🔥 2. Get signed URLs
      const { data: resData } = await axios.post(
        "/submit-notes",
        {
          files: fileArray.map((f) => ({
            type,
            name: f.name,
            contentType: f.type,
          })),
        },
        {
          withCredentials: true, // 🔥 IMPORTANT
        },
      );

      const uploads = resData.uploads;

      // updated ux
      const uploadPromises = uploads.map((u, i) => {
        const file = fileArray[i];

        return axios
          .put(u.uploadUrl, file, {
            headers: { "Content-Type": file.type },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );

              setData((prev) => ({
                ...prev,
                [activeSubject]: {
                  ...prev[activeSubject],
                  progress: {
                    ...prev[activeSubject].progress,
                    [file.name]: percent,
                  },
                },
              }));
            },
          })
          .then(() => u.key);
      });

      setData((prev) => ({
        ...prev,
        [activeSubject]: {
          ...prev[activeSubject],
          pendingUploads: {
            ...prev[activeSubject].pendingUploads,
            [type]: [
              ...prev[activeSubject].pendingUploads[type],
              ...uploadPromises,
            ],
          },
        },
      }));
    } catch (error) {
      console.error("Upload Error:", error);

      // 🔥 5. Reset uploading on error
      setData((prev) => ({
        ...prev,
        [activeSubject]: {
          ...prev[activeSubject],
          isUploadingBg: false,
        },
      }));

      alert("Upload failed. Please try again.");
    }
  };

  // ================= HANDLE INPUT =================
  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [activeSubject]: {
        ...prev[activeSubject],
        [field]: value,
      },
    }));
  };

  // ================= FETCH HISTORY =================
  const fetchHistory = async (force = false) => {
    if (!force && data[activeSubject].history.length > 0) return;

    const res = await fetchHistoryApi(activeSubject);
    console.log(res, "From fetch history in dashcompo.");

    setData((prev) => ({
      ...prev,
      [activeSubject]: {
        ...prev[activeSubject],
        history: res,
      },
    }));
    console.log(data, "From fetch history in dashcompo after setting data.");
  };
  // =======handle save =========
  const handleSave = async () => {
    const current = data[activeSubject];

    const hasFiles =
      current.notesUrls.length > 0 ||
      current.dppUrls.length > 0 ||
      current.pendingUploads.notes.length > 0 ||
      current.pendingUploads.dpp.length > 0;

    if (!current.topic || !hasFiles) {
      alert("Topic and at least one file are required.");
      return;
    }
    try {
      const uploadedNotes = await Promise.all(current.pendingUploads.notes);
      const uploadedDpp = await Promise.all(current.pendingUploads.dpp);

      const finalNotes = [...current.notesUrls, ...uploadedNotes];
      const finalDpp = [...current.dppUrls, ...uploadedDpp];

      setData((prev) => ({
        ...prev,
        [activeSubject]: {
          ...prev[activeSubject],
          notesUrls: finalNotes,
          dppUrls: finalDpp,
        },
      }));
      setData((prev) => ({
        ...prev,
        [activeSubject]: {
          ...prev[activeSubject],
          isSubmitting: true,
        },
      }));
      // 🟢 API CALL
      const response = await axios.post(
        "/log-submit",
        {
          subject: activeSubject,
          topic: current.topic,
          notesUrls: finalNotes,
          dppUrls: finalDpp,
        },
        {
          withCredentials: true, // 🔥 IMPORTANT (cookies)
        },
      );

      console.log("Saved:", response.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);

   
      // alert("Saved successfully");
     await fetchHistory(true); // force refresh
     setData((prev) => ({
       ...prev,
       [activeSubject]: {
         ...prev[activeSubject],
         topic: "",
         notesUrls: [],
         dppUrls: [],
         progress: {},
         isSubmitting: false,
         isUploadingBg: false,

         // ✅ ADD THIS
         pendingUploads: {
           notes: [],
           dpp: [],
         },
       },
     }));
      // 🟢 SWITCH TAB
      setTab("history");
    } catch (error) {
      console.error("Save Error:", error);

      if (error.response) {
        alert(error.response.data?.error || "Server error");
      } else {
        alert("Network error");
      }
    }
  };
  useEffect(() => {
    if (tab === "history") {
      fetchHistory();
    }
  }, [activeSubject, tab]);
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex p-1 bg-[#141414] rounded-xl border border-white/5 mb-8 w-fit">
          <button
            onClick={() => setTab("today")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === "today"
                ? "bg-[#202020] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <PenSquare size={16} />
            Today's Log
          </button>
          <button
            onClick={() => setTab("history")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === "history"
                ? "bg-[#202020] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <History size={16} />
            History
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* ================= TODAY TAB ================= */}
          {tab === "today" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#141414] border border-white/5 p-6 md:p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-6">
                What did you study today?
              </h3>

              {/* TOPIC INPUT */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Topic / Chapter
                </label>
                <input
                  type="text"
                  placeholder="e.g. Current Electricity - Kirchhoff's Laws"
                  className="w-full bg-[#0a0a0a] border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
                  value={data[activeSubject].topic}
                  onChange={(e) => handleChange("topic", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* NOTES UPLOAD */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Class Notes
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 bg-[#0a0a0a] border-2 border-dashed border-white/10 hover:border-[#ea580c]/50 hover:bg-[#ea580c]/5 transition-all rounded-xl cursor-pointer group relative overflow-hidden">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e.target.files, "notes")
                      }
                    />
                    <Upload
                      size={24}
                      className="text-gray-500 group-hover:text-[#ea580c] mb-2 transition-colors"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300">
                      Upload Notes PDF
                    </span>
                  </label>

                  {/* Animated File Badge */}

                  {/* PROGRESS */}
                  {(data[activeSubject].isSubmitting ||
                    data[activeSubject].isUploadingBg) &&
                    Object.entries(data[activeSubject].progress).map(
                      ([name, p]) => (
                        <div key={name} className="mt-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{name}</span>
                            <span>{p}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${p}%` }}
                              transition={{ ease: "easeOut", duration: 0.3 }}
                              className="h-full bg-[#ea580c]"
                            />
                          </div>
                        </div>
                      ),
                    )}
                  {/*notes uploading */}
                  <AnimatePresence>
                    {(data[activeSubject].pendingUploads.notes.length > 0 ||
                      data[activeSubject].notesUrls.length > 0) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 space-y-2"
                      >
                        {data[activeSubject].notesUrls.map((key, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl"
                          >
                            <FileText size={16} className="text-[#ea580c]" />
                            <span className="text-sm text-gray-300 truncate">
                              {key.split("_").pop()}
                            </span>
                            <CheckCircle2
                              size={16}
                              className="text-green-500 ml-auto"
                            />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {data[activeSubject].pendingUploads.notes.length > 0 && (
                    <p className="text-xs text-gray-400 mt-2">
                      Files uploading...
                    </p>
                  )}
                </div>

                {/* DPP UPLOAD */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Daily Practice Problem (DPP)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 bg-[#0a0a0a] border-2 border-dashed border-white/10 hover:border-[#ea580c]/50 hover:bg-[#ea580c]/5 transition-all rounded-xl cursor-pointer group relative overflow-hidden">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files, "dpp")}
                    />
                    <Upload
                      size={24}
                      className="text-gray-500 group-hover:text-[#ea580c] mb-2 transition-colors"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300">
                      Upload DPP PDF
                    </span>
                  </label>

                  {data[activeSubject].isUploadingBg &&
                    !data[activeSubject].isSubmitting && (
                      <p className="text-xs text-gray-500 mt-2">
                        Uploading in background...
                      </p>
                    )}

                  {/* Animated File Badge for dpp */}
                  <AnimatePresence>
                    {data[activeSubject].dppUrls.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 space-y-2"
                      >
                        {data[activeSubject].dppUrls.map((key, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl"
                          >
                            <FileText size={16} className="text-[#ea580c]" />
                            <span className="text-sm text-gray-300 truncate">
                              {key.split("_").pop()}
                            </span>
                            <CheckCircle2
                              size={16}
                              className="text-green-500 ml-auto"
                            />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <button
                disabled={
                  data[activeSubject].isSubmitting 
           
                }
                onClick={handleSave}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  data[activeSubject].isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#ea580c] hover:bg-[#c2410c] text-white"
                }`}
              >
                {data[activeSubject].isSubmitting
                  ? "Finishing Upload & Saving..."
                  : "Log Progress"}
              </button>
            </motion.div>
          )}
          {/* ======success toast======*/}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-10"
              >
                Saved Successfully ✅
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= HISTORY TAB ================= */}
          <HistoryTab
            activeSubject={activeSubject}
            data={data}
            setData={setData}
            tab={tab}
            setTab={setTab}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashCompo;


