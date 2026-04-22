// import React, { useState } from "react";
// import {
//   Upload,
//   FileText,
//   LogOut,
//   User,
// } from "lucide-react";

// const SUBJECTS = [
//   "Physics",
//   "Physical Chemistry",
//   "Organic Chemistry",
//   "Inorganic Chemistry",
//   "Botany",
//   "Zoology",
// ];

// const Dashboard = () => {
//   const [data, setData] = useState(
//     SUBJECTS.reduce((acc, sub) => {
//       acc[sub] = { topic: "", notes: null, dpp: null };
//       return acc;
//     }, {})
//   );

//   const [calendar] = useState(Array(30).fill(0));

//   const today = new Date().toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   // HANDLE INPUT
//   const handleChange = (subject, field, value) => {
//     setData((prev) => ({
//       ...prev,
//       [subject]: {
//         ...prev[subject],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-[#0b0b0b] text-white">

//       {/* ================= SIDEBAR ================= */}
//       <div className="w-full md:w-64 bg-[#111] border-r border-gray-800 flex flex-col justify-between">

//         <div className="p-6">
//           <h2 className="text-xl font-bold mb-6">NEET OS</h2>

//           <div className="space-y-3 text-gray-400">
//             <p className="hover:text-white cursor-pointer">Dashboard</p>
//             {SUBJECTS.map((s) => (
//               <p key={s} className="text-sm">{s}</p>
//             ))}
//           </div>
//         </div>

//         {/* PROFILE */}
//         <div className="p-4 border-t border-gray-800 flex items-center gap-3">
//           <User />
//           <div>
//             <p className="text-sm font-semibold">Student</p>
//             <p className="text-xs text-gray-400">NEET Aspirant</p>
//           </div>
//         </div>

//       </div>

//       {/* ================= MAIN ================= */}
//       <div className="flex-1 p-4 md:p-8 overflow-y-auto">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-3">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">
//               Daily Tracker
//             </h1>
//             <p className="text-gray-400 text-sm">{today}</p>
//           </div>

//           <button className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl w-fit">
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>

//         {/* ================= CALENDAR ================= */}
//         {/* <div className="bg-[#111] p-5 rounded-xl mb-8 w-full md:w-[50%]">
//           <h2 className="mb-4 font-semibold">30-Day Consistency</h2>

//           <div className="grid grid-cols-10 gap-2">
//             {calendar.map((val, i) => (
//               <div
//                 key={i}
//                 className={`w-6 h-6 md:w-8 md:h-8 rounded ${
//                   val ? "bg-green-500" : "bg-gray-800"
//                 }`}
//               />
//             ))}
//           </div>
//         </div> */}

//         {/* ================= SUBJECT TRACKING ================= */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

//           {SUBJECTS.map((subject) => (
//             <div
//               key={subject}
//               className="bg-[#111] p-5 rounded-xl"
//             >
//               <h3 className="font-semibold mb-3 text-sm md:text-base">
//                 {subject}
//               </h3>

//               {/* TOPIC INPUT */}
//               <input
//                 type="text"
//                 placeholder="Enter topic taught today"
//                 className="w-full mb-3 bg-black border border-gray-700 p-2 rounded text-sm"
//                 onChange={(e) =>
//                   handleChange(subject, "topic", e.target.value)
//                 }
//               />

//               {/* NOTES UPLOAD */}
//               <label className="flex items-center gap-2 text-xs text-orange-400 cursor-pointer mb-2">
//                 <Upload size={14} />
//                 Upload Notes
//                 <input
//                   type="file" 
//                   className="hidden"
//                   onChange={(e) =>
//                     handleChange(subject, "notes", e.target.files[0])
//                   }
//                 />
//               </label>

//               {data[subject].notes && (
//                 <p className="text-xs text-gray-400 mb-2">
//                   📄 {data[subject].notes.name}
//                 </p>
//               )}

//               {/* DPP UPLOAD */}
//               <label className="flex items-center gap-2 text-xs text-blue-400 cursor-pointer">
//                 <Upload size={14} />
//                 Upload DPP
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={(e) =>
//                     handleChange(subject, "dpp", e.target.files[0])
//                   }
//                 />
//               </label>

//               {data[subject].dpp && (
//                 <p className="text-xs text-gray-400 mt-1">
//                   📘 {data[subject].dpp.name}
//                 </p>
//               )}
//             </div>
//           ))}

//         </div>

//         {/* SAVE BUTTON */}
//         <div className="mt-8">
//           <button className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-xl font-semibold text-lg">
//             Save Today's Progress
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from "react";
// import { Upload, FileText, LogOut, User } from "lucide-react";

// const SUBJECTS = [
//   "Physics",
//   "Physical Chemistry",
//   "Organic Chemistry",
//   "Inorganic Chemistry",
//   "Botany",
//   "Zoology",
// ];

// const Dashboard = () => {
//   const [activeSubject, setActiveSubject] = useState("Physics");
//   const [tab, setTab] = useState("today");

//   const [data, setData] = useState(
//     SUBJECTS.reduce((acc, sub) => {
//       acc[sub] = { topic: "", notes: null, dpp: null, history: [] };
//       return acc;
//     }, {})
//   );

//   const today = new Date().toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   // 🔥 HANDLE INPUT
//   const handleChange = (field, value) => {
//     setData((prev) => ({
//       ...prev,
//       [activeSubject]: {
//         ...prev[activeSubject],
//         [field]: value,
//       },
//     }));
//   };

//   // 🔥 SAVE DATA
//   const handleSave = () => {
//     const entry = {
//       date: today,
//       topic: data[activeSubject].topic,
//       notes: data[activeSubject].notes,
//       dpp: data[activeSubject].dpp,
//     };

//     setData((prev) => ({
//       ...prev,
//       [activeSubject]: {
//         ...prev[activeSubject],
//         history: [entry, ...prev[activeSubject].history],
//       },
//     }));

//     alert("Saved successfully!");
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-[#0b0b0b] text-white">

//       {/* ================= SIDEBAR ================= */}
//       <div className="w-full md:w-64 bg-[#111] border-r border-gray-800 flex flex-col justify-between">

//         <div className="p-6">
//           <h2 className="text-xl font-bold mb-6">NEET OS</h2>

//           <div className="space-y-2 text-gray-400">
//             {SUBJECTS.map((s) => (
//               <div
//                 key={s}
//                 onClick={() => {
//                   setActiveSubject(s);
//                   setTab("today");
//                 }}
//                 className={`cursor-pointer px-3 py-2 rounded-lg text-sm ${
//                   activeSubject === s
//                     ? "bg-orange-500 text-white"
//                     : "hover:bg-gray-800"
//                 }`}
//               >
//                 {s}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* PROFILE */}
//         <div className="p-4 border-t border-gray-800 flex items-center gap-3">
//           <User />
//           <div>
//             <p className="text-sm font-semibold">Student</p>
//             <p className="text-xs text-gray-400">NEET Aspirant</p>
//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN ================= */}
//       <div className="flex-1 p-4 md:p-8">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">{activeSubject}</h1>
//             <p className="text-gray-400 text-sm">{today}</p>
//           </div>

//           <button className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-xl">
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>

//         {/* ================= TABS ================= */}
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={() => setTab("today")}
//             className={`px-4 py-2 rounded-lg ${
//               tab === "today"
//                 ? "bg-orange-500"
//                 : "bg-gray-800"
//             }`}
//           >
//             Today
//           </button>

//           <button
//             onClick={() => setTab("history")}
//             className={`px-4 py-2 rounded-lg ${
//               tab === "history"
//                 ? "bg-orange-500"
//                 : "bg-gray-800"
//             }`}
//           >
//             History
//           </button>
//         </div>

//         {/* ================= TODAY TAB ================= */}
//         {tab === "today" && (
//           <div className="bg-[#111] p-6 rounded-xl max-w-xl">

//             {/* TOPIC */}
//             <input
//               type="text"
//               placeholder="Enter topic taught today"
//               className="w-full mb-4 bg-black border border-gray-700 p-3 rounded"
//               value={data[activeSubject].topic}
//               onChange={(e) =>
//                 handleChange("topic", e.target.value)
//               }
//             />

//             {/* NOTES */}
//             <label className="flex items-center gap-2 text-orange-400 cursor-pointer mb-3">
//               <Upload size={16} />
//               Upload Notes
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={(e) =>
//                   handleChange("notes", e.target.files[0])
//                 }
//               />
//             </label>

//             {data[activeSubject].notes && (
//               <p className="text-sm text-gray-400 mb-3">
//                 📄 {data[activeSubject].notes.name}
//               </p>
//             )}

//             {/* DPP */}
//             <label className="flex items-center gap-2 text-blue-400 cursor-pointer">
//               <Upload size={16} />
//               Upload DPP
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={(e) =>
//                   handleChange("dpp", e.target.files[0])
//                 }
//               />
//             </label>

//             {data[activeSubject].dpp && (
//               <p className="text-sm text-gray-400 mt-2">
//                 📘 {data[activeSubject].dpp.name}
//               </p>
//             )}

//             {/* SAVE */}
//             <button
//               onClick={handleSave}
//               className="mt-6 w-full bg-orange-500 py-3 rounded-xl font-semibold"
//             >
//               Save Today
//             </button>
//           </div>
//         )}

//         {/* ================= HISTORY TAB ================= */}
//         {tab === "history" && (
//           <div className="space-y-4 max-w-xl">

//             {data[activeSubject].history.length === 0 && (
//               <p className="text-gray-400 text-sm">
//                 No history yet
//               </p>
//             )}

//             {data[activeSubject].history.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-[#111] p-4 rounded-xl"
//               >
//                 <p className="text-sm text-gray-400">
//                   {item.date}
//                 </p>

//                 <p className="font-semibold mt-1">
//                   {item.topic}
//                 </p>

//                 {item.notes && (
//                   <p className="text-xs text-gray-400">
//                     📄 {item.notes.name}
//                   </p>
//                 )}

//                 {item.dpp && (
//                   <p className="text-xs text-gray-400">
//                     📘 {item.dpp.name}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashCompo from "@/components/DashCompo"
import {Link} from "react-router-dom"
import { 
  Upload, 
  FileText, 
  LogOut, 
  User, 
  Menu, 
  X, 
  CheckCircle2, 
  History, 
  PenSquare,
  Atom,
  FlaskConical,
  Leaf,
  Dna,
} from "lucide-react";

const SUBJECTS = [
  "Physics",
  "Physical Chemistry",
  "Organic Chemistry",
  "Inorganic Chemistry",
  "Botany",
  "Zoology",
];

const subjectIcons = {
  Physics: Atom,
  "Physical Chemistry": FlaskConical,
  "Organic Chemistry": FlaskConical,
  "Inorganic Chemistry": FlaskConical,
  Botany: Leaf,
  Zoology: Dna,
};

const Dashboard = () => {
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [tab, setTab] = useState("today");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize data structure


  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Handle mobile sidebar auto-close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [activeSubject]: {
        ...prev[activeSubject],
        [field]: value,
      },
    }));
  };



  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-gray-200 font-sans overflow-hidden">
      
      {/* ================= MOBILE SIDEBAR BACKDROP ================= */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#141414] border-r border-white/10 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <Link to="/">
                <h2 className="text-3xl mogra-regular tracking-tight text-white">
              PRAPP<span className="text-[#ea580c]">ER</span>
            </h2>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subjects List */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
              Subjects
            </p>
          {SUBJECTS.map((s) => {
  const Icon = subjectIcons[s];

  return (
    <button
      key={s}
      onClick={() => {
        setActiveSubject(s);
        setTab("today");
        setIsSidebarOpen(false);
      }}
      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
        activeSubject === s
          ? "bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/20"
          : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
      }`}
    >
      <Icon
        size={18}
        className={`${
          activeSubject === s ? "text-[#ea580c]" : "text-gray-400"
        }`}
      />
      {s}
    </button>
  );
})}
          </div>

          {/* User Profile */}
       <Link to ="/profile">
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="p-2 bg-[#ea580c]/20 text-[#ea580c] rounded-lg">
                <User size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Student Name</p>
                <p className="text-xs text-gray-500 truncate">NEET Aspirant</p>
              </div>
            </div>
          </div>
       </Link>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:p-5.5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-400 hover:text-white md:hidden "
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{activeSubject}</h1>
              {/* <p className="text-[#ea580c] text-sm font-medium">{today}</p> */}
            </div>
          </div>

          {/* <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button> */}
        </header>

        {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
      <DashCompo 
        activeSubject={activeSubject} 
        setActiveSubject={setActiveSubject}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;