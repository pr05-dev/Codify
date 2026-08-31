import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, X } from 'lucide-react';

interface SignOutConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDarkMode?: boolean;
}

export default function SignOutConfirmModal({ onConfirm, onClose, isDarkMode = true }: SignOutConfirmModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 font-sans">
        {/* Animated modal focus container */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          className="relative max-w-sm w-full rounded-3xl p-[2.5px] overflow-hidden"
        >
          {/* Continuous flow rotating lights border background */}
          <div className="absolute w-[250%] h-[250%] -top-[75%] -left-[75%] bg-[conic-gradient(from_0deg,#22d3ee,#6366f1,#f43f5e,#22d3ee)] animate-rotate-border opacity-100" />
          
          {/* Pulsing neon backing glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-rose-500 opacity-60 mix-blend-screen blur-2xl animate-pulse-glowing" />

          {/* Modal Inner Panel */}
          <div className="relative bg-slate-950 text-slate-100 rounded-[21.5px] p-6 w-full z-10 flex flex-col items-center text-center space-y-6 border border-slate-900 shadow-2xl">
            {/* Top Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:text-white hover:bg-slate-900 transition cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center animate-pulse">
              <LogOut className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-white tracking-tight">Sign Out & End Session</h3>
              <p className="text-xs text-slate-400 leading-relaxed px-2">
                Are you sure you want to end your dashboard session? You can sign right back in anytime to resume your progress.
              </p>
            </div>

            {/* Form actions */}
            <div className="grid grid-cols-2 gap-3 w-full pt-1">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 rounded-xl text-xs font-bold transition duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-extrabold transition duration-200 cursor-pointer shadow-lg shadow-rose-500/10 hover:scale-[1.02]"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
