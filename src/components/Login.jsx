import { FcGoogle } from "react-icons/fc";
import { BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion"; // Using lucide-react for the graphic

export default function Login() {
  const handleGoogleLogin = () => {
    // 🔥 Backend endpoint
    console.log("redirecting");
    window.location.href =
      //"http://localhost:3000/auth/google" ||
      "  https://apiprapper.kyzron.com/auth/google";
  };

  return (
    <div className="min-h-screen flex w-full bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#ea580c]/30">
      {/* ================= LEFT SIDE: LOGIN FORM ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 relative z-10">
        {/* Subtle Background Glow for mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ea580c]/5 blur-[100px] rounded-full pointer-events-none lg:hidden"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md relative"
        >
          {/* Mobile Logo (Only visible on small screens) */}
          <div className="lg:hidden mb-12 text-center">
            <h1 className="text-3xl font-bold text-white mogra-regular tracking-wide">
              PRAPP<span className="text-[#ea580c]">ER</span>
            </h1>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-lg">
              Login to access your dashboard and track your daily progress.
            </p>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#141414] border border-white/10 hover:border-[#ea580c]/50 hover:bg-[#1a1a1a] py-4 rounded-xl transition-all duration-300 shadow-lg group relative overflow-hidden"
          >
            {/* Button Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ea580c]/0 via-[#ea580c]/5 to-[#ea580c]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

            <FcGoogle size={26} className="z-10" />
            <span className="font-semibold text-white z-10 text-lg tracking-wide cursor-pointer">
              Continue with Google
            </span>
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-8 opacity-50">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-4 text-sm text-gray-500">Secure</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* NOTE */}
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-sm text-gray-400 lobster-two-regular italic text-lg">
              "No passwords. No hassle. Just focus on your NEET prep 🚀"
            </p>
          </div>
        </motion.div>
      </div>

      {/* ================= RIGHT SIDE: BRANDING/UI SHOWCASE ================= */}
      <div className="hidden lg:flex w-1/2 bg-[#050505] relative overflow-hidden items-center justify-center border-l border-white/5">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Deep Orange Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ea580c]/15 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center max-w-lg"
        >
          {/* Logo Branding */}
          <h1 className="text-6xl font-bold text-white mb-2 mogra-regular tracking-widest drop-shadow-2xl">
            PRAPP<span className="text-[#ea580c]">ER</span>
          </h1>
          <p className="text-[#ea580c] font-medium lobster-two-regular tracking-widest uppercase text-sm mb-12">
            The Ultimate Preparation Platform.
          </p>

          {/* Floating UI Mockups (Decorative) */}
          <div className="relative w-full">
            {/* Mockup Card 2 */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 1,
              }}
              className="bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-2xl w-96 relative z-10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-xs text-gray-500">prapper.com</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={18} className="text-[#ea580c]" />
                  <span>Physics Notes Uploaded</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={18} className="text-[#ea580c]" />
                  <span>Chemistry DPP Logged</span>
                </div>
                <div className="w-full h-2 bg-[#2a2a2a] rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ea580c] to-[#ff8c42] w-3/4 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
