import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, X, Zap, Award, Sparkles } from 'lucide-react';

interface StreakCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayStreak: number;
  openedDates: string[];
  isDarkMode?: boolean;
}

export default function StreakCalendarModal({
  isOpen,
  onClose,
  dayStreak,
  openedDates,
  isDarkMode = true
}: StreakCalendarModalProps) {
  if (!isOpen) return null;

  const currentYear = 2026; // Setting year from standard session year context
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

  // Helper to get total count across the current year
  const activeThisYearCount = openedDates.filter(d => d.startsWith(`${currentYear}-`)).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[220] flex items-center justify-center p-4 overflow-y-auto font-sans">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
          className={`relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border ${
            isDarkMode 
              ? "bg-slate-950 border-slate-800 text-slate-100" 
              : "bg-white border-slate-200 text-slate-800"
          } p-6 md:p-8 my-8`}
        >
          {/* Top Header Controls */}
          <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-900/10 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-extrabold tracking-tight">Your Coding Consistency Calendar</h2>
                <p className="text-[11px] text-slate-400">Streak tracker scaled to Indian Standard Time (IST)</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              title="Close Calendar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Widget Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className={`p-4 rounded-2xl flex items-center gap-4 border ${
              isDarkMode ? "bg-slate-900/40 border-slate-800/80" : "bg-slate-50 border-slate-100"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap className="w-5 h-5 fill-amber-500" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Streak</p>
                <p className="text-lg font-black text-amber-500">{dayStreak} Days</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl flex items-center gap-4 border ${
              isDarkMode ? "bg-slate-900/40 border-slate-800/80" : "bg-slate-50 border-slate-100"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Days Active (2026)</p>
                <p className="text-lg font-black text-teal-400">{activeThisYearCount} Days</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl flex items-center gap-4 border ${
              isDarkMode ? "bg-slate-900/40 border-slate-800/80" : "bg-slate-50 border-slate-100"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Consistency Status</p>
                <p className="text-sm font-bold text-slate-350 dark:text-slate-300">
                  {dayStreak >= 15 ? "🏆 Elite Master" : dayStreak >= 7 ? "🔥 Coding Warrior" : dayStreak >= 2 ? "📈 Rising Star" : "🌱 Quick Starter"}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 12-Month Calendar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {MONTHS.map((monthName, monthIndex) => {
              const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
              const firstDayOfWeek = new Date(currentYear, monthIndex, 1).getDay();
              
              // Generate days grid
              const daysArray = [];
              // Add empty slots for month offset
              for (let i = 0; i < firstDayOfWeek; i++) {
                daysArray.push(null);
              }
              // Add day counts
              for (let day = 1; day <= daysInMonth; day++) {
                daysArray.push(day);
              }

              return (
                <div 
                  key={monthIndex}
                  className={`p-4 rounded-2xl border flex flex-col ${
                    isDarkMode ? "bg-slate-900/20 border-slate-800/60" : "bg-slate-50/50 border-slate-100"
                  }`}
                >
                  <h3 className="text-[13px] font-bold tracking-tight mb-3 text-center text-slate-700 dark:text-slate-250">
                    {monthName}
                  </h3>

                  {/* Weekday labels */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                    {WEEKDAYS.map((dayLabel, idx) => (
                      <span key={idx} className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-600 block">
                        {dayLabel}
                      </span>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {daysArray.map((day, idx) => {
                      if (day === null) {
                        return <div key={idx} className="w-5 h-5" />;
                      }

                      // Build dates comparison key
                      const mm = String(monthIndex + 1).padStart(2, '0');
                      const dd = String(day).padStart(2, '0');
                      const dateStr = `${currentYear}-${mm}-${dd}`;
                      const isHighlighted = openedDates.includes(dateStr);

                      return (
                        <div
                          key={idx}
                          className={`w-5 h-5 flex items-center justify-center text-[9px] font-semibold font-mono rounded-md relative ${
                            isHighlighted
                              ? "bg-amber-500 text-slate-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.5)] scale-110"
                              : isDarkMode
                                ? "text-slate-500 hover:text-white hover:bg-slate-800"
                                : "text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                          }`}
                          title={isHighlighted ? `Opened on ${dateStr}!` : dateStr}
                        >
                          {day}
                          {isHighlighted && (
                            <span className="absolute -top-[1.5px] -right-[1.5px] w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center text-[10px] text-slate-500">
            * Every day you open this dashboard in Indian Standard Time (IST) increases your active streak. If 1 day is missed, your streak restarts.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
