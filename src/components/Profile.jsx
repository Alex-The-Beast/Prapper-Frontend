
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMe } from "@/api/profile/index.js"; // adjust path
import { 
  MapPin, 
  CalendarDays, 
  Flame, 
  Target, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Edit3
} from "lucide-react";

// Helper: Format Date
const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Helper: Get Initials
const initial = (name = "") => name.trim()[0]?.toUpperCase() ?? "?";

// Google Icon SVG
const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

// Helper: Generate Mock 30-Day Heatmap Data
const generateHeatmap = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Random activity level between 0 and 4
    const count = Math.floor(Math.random() * 5); 
    data.push({ date: date.toDateString(), count });
  }
  return data;
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Generate heatmap only once on mount
  const [heatmapData] = useState(generateHeatmap());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMe();
        setUser(res?.data);
      } catch (err) {
        setError(true);
        throw err;
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-sans">
        <p className="text-red-400 font-medium">Failed to load profile. Please try again.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#141414] border-t-[#ea580c] rounded-full animate-spin"></div>
          <p className="text-gray-500 tracking-widest text-sm font-semibold uppercase">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const displayName = user.name?.replace(/["_]/g, "").trim();

  // Map heatmap count to Tailwind colors
  const getHeatmapColor = (count) => {
    if (count === 0) return "bg-[#1a1a1a] border-white/5";
    if (count === 1) return "bg-[#ea580c]/30 border-[#ea580c]/20";
    if (count === 2) return "bg-[#ea580c]/60 border-[#ea580c]/40";
    if (count === 3) return "bg-[#ea580c]/80 border-[#ea580c]/60";
    return "bg-[#ea580c] border-[#ea580c] shadow-[0_0_8px_rgba(234,88,12,0.5)]";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans p-4 md:p-8 selection:bg-[#ea580c]/30">
      
      {/* Top Nav/Breadcrumb Space (Optional) */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
       <Link to="/">
        <h1 className="text-2xl font-bold text-white mogra-regular tracking-wider">
          PRAPP<span className="text-[#ea580c]">ER</span> 
        </h1>
       </Link> 
        <button 
          onClick={() => navigate("/dashboard")}
          className="text-sm font-semibold text-gray-400 hover:text-[#ea580c] transition-colors"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= LEFT COLUMN: USER ID CARD ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 flex flex-col gap-6"
        >
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            {/* Subtle glow behind avatar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#ea580c]/20 blur-[50px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-[#ea580c] to-[#ff8c42] shadow-lg shadow-[#ea580c]/20">
                  {user.profile ? (
                    <img
                      src={user.profile}
                      alt={displayName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full border-4 border-[#141414] object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full border-4 border-[#141414] bg-[#1a1a1a] flex items-center justify-center text-3xl font-bold text-[#ea580c]">
                      {initial(displayName)}
                    </div>
                  )}
                </div>
                {/* Rank Badge */}
                <div className="absolute -bottom-2 -right-2 bg-[#1a1a1a] border border-white/10 text-xs font-bold px-2 py-1 rounded-md text-[#ea580c] flex items-center gap-1 shadow-md">
                  <Award size={12} /> #42
                </div>
              </div>

              {/* Name & Quote */}
              <h2 className="text-2xl font-bold text-white mb-1">{displayName || "Anonymous"}</h2>
              <p className="text-gray-400 text-sm mb-4">{user.email}</p>
              
              <p className="text-[#ea580c] text-sm mb-6 lobster-two-regular italic">
                "Consistency is the ultimate cheat code 🚀"
              </p>

              {/* Edit Profile Button */}
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 mb-6">
                <Edit3 size={16} /> Edit Profile
              </button>

              {/* Basic Info Details */}
              <div className="w-full space-y-4 text-left border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin size={16} className="text-gray-500" />
                  <span>India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <CalendarDays size={16} className="text-gray-500" />
                  <span>Joined {fmt(user.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <GoogleIcon />
                  <span className="capitalize text-gray-300">Auth via {user.provider}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Widget (e.g. Current Goal) */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target size={16} className="text-[#ea580c]"/> Next Milestone
            </h3>
            <p className="text-sm text-gray-400 mb-3">Solve 500 Physics MCQs</p>
            <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-[#ea580c] w-[64%] rounded-full"></div>
            </div>
            <p className="text-xs font-medium text-gray-500 text-right mt-2">320 / 500</p>
          </div>
        </motion.div>


        {/* ================= RIGHT COLUMN: STATS & HEATMAP ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-9 flex flex-col gap-6"
        >
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#ea580c]/50 transition-colors">
              <div className="p-4 bg-[#ea580c]/10 rounded-xl text-[#ea580c]">
                <Flame size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Current Streak</p>
                <p className="text-3xl font-bold text-white">12 <span className="text-sm text-gray-500 font-normal">Days</span></p>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#ea580c]/50 transition-colors">
              <div className="p-4 bg-[#ea580c]/10 rounded-xl text-[#ea580c]">
                <TrendingUp size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Problems Solved</p>
                <p className="text-3xl font-bold text-white">845</p>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#ea580c]/50 transition-colors">
              <div className="p-4 bg-[#ea580c]/10 rounded-xl text-[#ea580c]">
                <BookOpen size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Notes Logged</p>
                <p className="text-3xl font-bold text-white">47</p>
              </div>
            </div>
          </div>

          {/* Subject Progress (LeetCode style Easy/Med/Hard replacement) */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Subject Proficiency</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Physics */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-300">Physics</span>
                  <span className="text-gray-500">210 / 500</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] border border-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[42%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
              </div>

              {/* Chemistry */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-300">Chemistry</span>
                  <span className="text-gray-500">305 / 500</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] border border-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[61%] rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                </div>
              </div>

              {/* Biology */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-300">Biology</span>
                  <span className="text-gray-500">450 / 800</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] border border-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[56%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 30-Day Activity Heatmap */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">30 Days of Code & Study</h3>
                <p className="text-sm text-gray-400">Total 124 submissions in the past month</p>
              </div>
              <p className="text-xs text-gray-500 hidden sm:block">Last logged in: {fmt(user.lastLoggedIN)}</p>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto custom-scrollbar pb-4">
              <div className="flex gap-2 min-w-max">
                {/* Dividing 30 days into roughly 4-5 weeks. 
                  Displaying column by column.
                */}
                {Array.from({ length: Math.ceil(heatmapData.length / 7) }).map((_, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-2">
                    {heatmapData.slice(colIdx * 7, colIdx * 7 + 7).map((day, rowIdx) => (
                      <div
                        key={rowIdx}
                        title={`${day.count} logs on ${day.date}`}
                        className={`w-4 h-4 rounded-sm border cursor-pointer hover:scale-110 transition-transform ${getHeatmapColor(day.count)}`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500 font-medium">
              <span>Less</span>
              <div className={`w-3 h-3 rounded-sm border ${getHeatmapColor(0)}`}></div>
              <div className={`w-3 h-3 rounded-sm border ${getHeatmapColor(1)}`}></div>
              <div className={`w-3 h-3 rounded-sm border ${getHeatmapColor(2)}`}></div>
              <div className={`w-3 h-3 rounded-sm border ${getHeatmapColor(3)}`}></div>
              <div className={`w-3 h-3 rounded-sm border ${getHeatmapColor(4)}`}></div>
              <span>More</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Profile;