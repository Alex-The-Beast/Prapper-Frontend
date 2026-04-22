// import { motion } from "framer-motion";
// import { BookOpen, ClipboardCheck, TrendingUp, LogOut, User, LayoutDashboard} from "lucide-react";
// import {Link,useNavigate} from 'react-router-dom'
// import {logout,getMe} from "@/api/profile/index.js";
// import {useEffect,useState} from "react"


// const HomePage = () => {
//     const [user,setUser]=useState(null)
//     const [isLoading,setIsLoading]=useState(true)
//     const navigate=useNavigate(); 

//     useEffect(()=>{
//          const checkAuth=async()=>{
//             try {
//                 const userData=await getMe()
//                 setUser( userData.data);
//             }catch(error){
//                 setUser(null)
//             }finally{
//                 setIsLoading(false)
//             }
//          }
//          checkAuth();
//     },[])
//     const handleLogout=async()=>{
//         try{
//             await logout();
//             setUser(null)
//             navigate('/')
//         }catch(error){
//             console.log("Logout Failed",error)
//         }
//     }
//   return (
//     <div className="bg-white text-gray-800">

//       {/* NAVBAR */}
//       <nav className="flex items-center justify-between px-8 py-4 shadow-sm relative">
//         <h1 className="text-2xl font-bold text-green-600">
//           NEET Tracker
//         </h1>

//         <div className="flex items-center gap-6">
//           <a href="#" className="hover:text-green-600">Home</a>
//           <a href="#" className="hover:text-green-600">Features</a>
//           <a href="#" className="hover:text-green-600">About</a>

//           {/* Conditional Rendering based on Auth State */}
//           {isLoading ? (
//             // Loading skeleton for the avatar
//             <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
//           ) : user ? (
//             // Logged In: Show Profile Dropdown
//             <div className="relative group cursor-pointer z-50">
//               <img 
//                 src={user.profile} 
//                 alt="User Avatar" 
//                 className="w-10 h-10 rounded-full border-2 border-green-600 object-cover"
//                 referrerPolicy="no-referrer"
//               />
              
//               {/* Dropdown Menu - Appears on group-hover */}
//               <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                 <div className="p-4 border-b border-gray-100">
//                   <p className="font-semibold text-gray-800 truncate">{user.name}</p>
//                   <p className="text-sm text-gray-500 truncate">{user.email}</p>
//                 </div>
                
//                 <div className="flex flex-col py-2">
//                   <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
//                     <LayoutDashboard size={18} className="text-gray-500" />
//                     Dashboard
//                   </Link>
//                   <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
//                     <User size={18} className="text-gray-500" />
//                     Profile
//                   </Link>
//                   <button 
//                     onClick={handleLogout} 
//                     className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition w-full text-left"
//                   >
//                     <LogOut size={18} />
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Not Logged In: Show Login Button
//             <Link to='/login'>     
//               <button className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition cursor-pointer">
//                 Login
//               </button>
//             </Link>
//           )}
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-6xl font-bold leading-tight"
//         >
//           Track Your NEET Preparation <br />
//           <span className="text-green-600">Daily. Smartly. Consistently.</span>
//         </motion.h1>

//         <p className="mt-6 text-lg max-w-2xl text-gray-600">
//           Log your daily study progress, track notes, solve DPPs, and build
//           unstoppable consistency to crack NEET.
//         </p>

//         {/* Change CTA behavior based on auth status */}
//         <Link to={user ? "/dashboard" : "/login"}>
//           <button className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-green-700 transition">
//             {user ? "Go to Dashboard" : "Get Started"}
//           </button>
//         </Link>
//       </section>

//       {/* FEATURES SECTION (Unchanged) */}
//       <section className="py-16 px-8 bg-gray-50">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Why Use NEET Tracker?
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {/* CARD 1 */}
//           <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//             <BookOpen className="text-green-600 mb-4" size={32} />
//             <h3 className="text-xl font-semibold mb-2">Track Notes</h3>
//             <p className="text-gray-600">Record how many pages or chapters you complete daily.</p>
//           </div>

//           {/* CARD 2 */}
//           <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//             <ClipboardCheck className="text-green-600 mb-4" size={32} />
//             <h3 className="text-xl font-semibold mb-2">DPP Progress</h3>
//             <p className="text-gray-600">Monitor daily practice problems and accuracy level.</p>
//           </div>

//           {/* CARD 3 */}
//           <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//             <TrendingUp className="text-green-600 mb-4" size={32} />
//             <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
//             <p className="text-gray-600">Visualize your improvement and stay motivated.</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 text-center">
//         <h2 className="text-3xl font-bold mb-4">
//           Start Your NEET Journey Today 🚀
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Small daily progress leads to big results.
//         </p>

//         <Link to={user ? "/dashboard" : "/login"}>
//           <button className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition">
//             {user ? "Go to Dashboard" : "Create Account"}
//           </button>
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-gray-100 py-6 text-center text-gray-500">
//         © 2026 NEET Tracker. All rights reserved.
//       </footer>

//     </div>
  
//   )
// }

// export default HomePage


import { motion } from "framer-motion";
import { BookOpen, ClipboardCheck, TrendingUp, LogOut, User, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { logout, getMe } from "@/api/profile/index.js";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getMe();
        setUser(userData.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen font-sans selection:bg-[#ea580c]/30 selection:text-white ">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 md:top-2 z-50 max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border rounded-xl border-white/5 ">
        <h1 className="text-2xl md:text-3xl font-bold  mogra-regular tracking-tight text-white">
          PRAPP<span className="text-[#ea580c]">ER</span>
        </h1>

        <div className="flex items-center justify-start gap-6 md:gap-16 text-sm font-medium">
        {!isLoading && user && (
  <div className="hidden md:flex items-center gap-6 text-gray-400">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/profile">Profile</Link>
  </div>
)}

          {/* Conditional Rendering based on Auth State */}
          {isLoading ? (
            // Loading skeleton for the avatar
            <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
          ) : user ? (
            // Logged In: Show Profile Dropdown
            <div className="relative group cursor-pointer z-50">
              <img
                src={user.profile}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-1 border-[#ea580c] object-cover hover:ring-4 hover:ring-[#ea580c]/20 transition-all"
                referrerPolicy="no-referrer"
              />

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-3 w-56 bg-[#141414] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2">
                <div className="p-4 border-b border-white/5">
                  <p className="font-semibold text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                </div>

                <div className="flex flex-col py-2">
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    <LayoutDashboard size={16} className="text-[#ea580c]" />
                    Dashboard
                  </Link>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    <User size={16} className="text-[#ea580c]" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left mt-1"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Not Logged In: Show Login Button
            <Link to='/login'>
              <button className="bg-[#ea580c] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#c2410c] transition-all shadow-lg shadow-[#ea580c]/20 cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ea580c]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold lobster-two-regular-italic leading-tight text-white tracking-tight z-10"
        >
          Track Your NEET Prep <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#ff8c42]">
            Daily. Smartly. Consistently.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl max-w-2xl lobster-two-regular text-gray-400 z-10"
        >
          Log your daily study progress, track notes, solve DPPs, and build
          unstoppable consistency to crack NEET.
        </motion.p>

        {/* Change CTA behavior based on auth status */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.4 }}
           className="z-10"
        >
          <Link to={user ? "/dashboard" : "/login"}>
            <button className="mt-10 bg-[#ea580c] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#c2410c] hover:-translate-y-1 transition-all duration-200 shadow-xl shadow-[#ea580c]/20 flex items-center gap-2 mogra-regular cursor-pointer">
              {user ? "Go to Dashboard" : "Get Started Now"}
            </button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 md:px-12 bg-[#0d0d0d] border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Why Use <span className="text-[#ea580c]">NEET OS?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="bg-[#141414] border border-white/5 p-8 rounded-3xl hover:border-white/10 hover:bg-[#1a1a1a] transition-colors group">
              <div className="bg-[#ea580c]/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-[#ea580c]" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Track Notes</h3>
              <p className="text-gray-400 leading-relaxed">Record how many pages or chapters you complete daily and keep your PDFs organized.</p>
            </div>

            {/* CARD 2 */}
            <div className="bg-[#141414] border border-white/5 p-8 rounded-3xl hover:border-white/10 hover:bg-[#1a1a1a] transition-colors group">
              <div className="bg-[#ea580c]/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <ClipboardCheck className="text-[#ea580c]" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">DPP Progress</h3>
              <p className="text-gray-400 leading-relaxed">Monitor daily practice problems, analyze your volume, and upload your solution sheets.</p>
            </div>

            {/* CARD 3 */}
            <div className="bg-[#141414] border border-white/5 p-8 rounded-3xl hover:border-white/10 hover:bg-[#1a1a1a] transition-colors group">
              <div className="bg-[#ea580c]/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-[#ea580c]" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Performance History</h3>
              <p className="text-gray-400 leading-relaxed">Look back at your historic logs to visualize your improvement and stay motivated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Start Your NEET Journey Today 🚀
        </h2>
        <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto">
          Small daily progress leads to big results. Build the ultimate system for your preparation.
        </p>

        <Link to={user ? "/dashboard" : "/login"}>
          <button className="bg-[#141414] border border-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-2 mx-auto">
            {user ? "Enter Dashboard" : "Create Free Account"}
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© 2026 NEET OS. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default HomePage;