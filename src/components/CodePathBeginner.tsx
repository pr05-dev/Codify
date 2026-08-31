import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Code2, 
  CornerDownRight, 
  HelpCircle, 
  Lightbulb, 
  Lock, 
  Sparkles, 
  Star, 
  Timer, 
  Trash2, 
  Unlock, 
  UserCheck, 
  Zap,
  ArrowRight,
  Sun,
  Moon,
  Compass,
  LogOut
} from "lucide-react";
import { CODEPATH_CURRICULUM, CodePathTopic, TOPICS_LIST } from "./CodePathData";
import { DID_YOU_KNOW_DATA } from "./CodePathDidYouKnow";
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase"; // Assumes db is initialized there or App.tsx
import CareerRoadmap from "./CareerRoadmap";

interface CodePathBeginnerProps {
  user: any;
  onBackToDashboard: () => void;
  onLogoutTrigger?: () => void;
  dayStreak?: number;
  onStreakClick?: () => void;
}

export default function CodePathBeginner({ 
  user, 
  onBackToDashboard, 
  onLogoutTrigger,
  dayStreak,
  onStreakClick
}: CodePathBeginnerProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("codepath_theme");
    return saved !== "light";
  });

  useEffect(() => {
    localStorage.setItem("codepath_theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"theory" | "practice">("theory");
  const [isDidYouKnowExpanded, setIsDidYouKnowExpanded] = useState<boolean>(true);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(1);
  const displayStreak = dayStreak !== undefined ? dayStreak : streak;
  const [loading, setLoading] = useState<boolean>(true);

  // Practice States
  const [showHint, setShowHint] = useState<boolean>(false);
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [mcqChecked, setMcqChecked] = useState<boolean>(false);
  const [blankValue, setBlankValue] = useState<string>("");
  const [blankChecked, setBlankChecked] = useState<boolean>(false);
  const [predictValue, setPredictValue] = useState<string>("");
  const [predictChecked, setPredictChecked] = useState<boolean>(false);
  const [errorChecked, setErrorChecked] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Step-by-Step Code Viewer State
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<"languages" | "career_roadmap">("languages");

  const handleEarnPoints = async (cPointsVal = 0, bPointsVal = 0) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        await updateDoc(userDocRef, {
          cPoints: (data.cPoints || 0) + cPointsVal,
          bPoints: (data.bPoints || 0) + bPointsVal
        });
      }
    } catch (err) {
      console.error("Error updating points in CodePathBeginner:", err);
    }
  };


  // Load progress from Firestore on mount
  useEffect(() => {
    async function loadProgress() {
      if (!user) return;
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const progress = userData.codePathProgress || {};
          if (selectedLanguage && progress[selectedLanguage]) {
            setCompletedTopics(progress[selectedLanguage].completedTopics || []);
            setStreak(progress[selectedLanguage].streak || 1);
          } else if (progress.streak) {
            setStreak(progress.streak);
          }
        }
      } catch (error) {
        console.error("Error loading CodePath progress:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProgress();
  }, [user, selectedLanguage]);

  // Sync completed topic to Firestore
  const handleMarkComplete = async (topicId: string) => {
    if (!user || !selectedLanguage) return;
    const newCompleted = [...new Set([...completedTopics, topicId])];
    setCompletedTopics(newCompleted);

    try {
      const userDocRef = doc(db, "users", user.uid);
      const updatePayload = {
        [`codePathProgress.${selectedLanguage}`]: {
          completedTopics: newCompleted,
          streak: streak,
          lastActive: new Date().toISOString()
        }
      };
      await updateDoc(userDocRef, updatePayload);
      setIsCompleted(true);

      // Deeply serialize and append to user_history_cache
      try {
        const cacheCollectionRef = collection(db, "user_history_cache");
        await addDoc(cacheCollectionRef, {
          userId: user.uid,
          timestamp: serverTimestamp(),
          actionType: "module_completed",
          payload: {
            language: selectedLanguage,
            topicId: topicId,
            topicIndex: activeTopicIndex,
            topicName: activeTopic?.title || topicId,
            isCompleted: true,
            pointsAwarded: 15 // from MCQ/predict answers
          },
          strategy: "immutable-append",
          lifecycle: "permanent_cache"
        });
      } catch (cacheErr) {
        console.error("Error appending module completion to history cache:", cacheErr);
      }
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  const resetPracticeStates = () => {
    setShowHint(false);
    setSelectedMcqOption(null);
    setMcqChecked(false);
    setBlankValue("");
    setBlankChecked(false);
    setPredictValue("");
    setPredictChecked(false);
    setErrorChecked(false);
    setIsCompleted(false);
    setActiveLineIndex(0);
    setIsDidYouKnowExpanded(true);
  };

  // Language list mapping with beautiful custom metadata
  const languages = [
    { id: "python", name: "Python", desc: "Friendly syntax that reads like plain English. Ideal for absolute beginners.", color: "from-blue-600 to-yellow-500", label: "Interactive Scripting" },
    { id: "java", name: "Java", desc: "Statically typed & structure-first. Powering world-class corporate servers.", color: "from-orange-600 to-red-500", label: "Object Oriented" },
    { id: "c", name: "C", desc: "No guardrails, high-speed procedural coding closest to microchips.", color: "from-sky-600 to-indigo-600", label: "Procedural Speed" },
    { id: "cpp", name: "C++", desc: "Object-oriented booster packs mounted straight inside optimal C compiler grids.", color: "from-pink-600 to-rose-600", label: "High Performance" }
  ];

  const currentCurriculum = selectedLanguage ? CODEPATH_CURRICULUM[selectedLanguage] || [] : [];
  const activeTopic = currentCurriculum[activeTopicIndex] || null;

  // Percentage calculates complete topics vs current total (which is 9)
  const percentComplete = Math.round((completedTopics.length / TOPICS_LIST.length) * 100);

  return (
    <div className={`flex-1 overflow-y-auto transition-colors duration-200 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"} min-h-screen`}>
      {/* Absolute Header branding */}
      <header className={`p-4 border-b flex items-center justify-between shadow-lg transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"}`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToDashboard}
            className={`p-2 rounded-xl transition ${isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent flex items-center gap-2">
              <Code2 className="w-5 h-5 text-teal-400" />
              CodePath Beginner Academy
            </h1>
            <p className="text-xs text-slate-500">Learn programming step-by-step from absolute scratch</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {selectedLanguage && (
            <div className={`px-3 py-1 rounded-lg border flex items-center gap-2 text-sm transition-all ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-700"}`}>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="capitalize font-medium">{selectedLanguage} Pathway</span>
            </div>
          )}
          
          {/* Theme Toggler Switcher */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border transition flex items-center justify-center ${
              isDarkMode 
                ? "bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800" 
                : "bg-slate-100 border-slate-200 text-indigo-600 hover:text-indigo-800 hover:bg-slate-200"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onStreakClick}
            className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 text-sm font-bold hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer hover:shadow-[0_0_12px_rgba(245,158,11,0.15)] group"
            title="Click to view Consistency Calendar"
          >
            <Zap className="w-4 h-4 fill-amber-500 group-hover:animate-bounce" />
            <span>{displayStreak} Day Streak</span>
          </button>
        </div>
      </header>

      {!selectedLanguage ? (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
          {/* Subtab Segment Selector */}
          <div className="flex justify-center mb-6">
            <div className={`p-1 rounded-2xl flex items-center border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <button
                onClick={() => setActiveSubTab("languages")}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  activeSubTab === "languages"
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/15 font-bold"
                    : isDarkMode 
                      ? "text-slate-400 hover:text-slate-200" 
                      : "text-slate-650 hover:text-slate-800"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Language Pathways
              </button>
              <button
                onClick={() => setActiveSubTab("career_roadmap")}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  activeSubTab === "career_roadmap"
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/15 font-bold"
                    : isDarkMode 
                      ? "text-slate-400 hover:text-slate-200" 
                      : "text-slate-650 hover:text-slate-800"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                AI Career Roadmap
              </button>
            </div>
          </div>

          {activeSubTab === "languages" ? (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-4 py-1.5 bg-teal-500/10 text-teal-500 dark:text-teal-400 rounded-full w-fit mx-auto text-xs font-bold border border-teal-500/20"
                >
                  🚀 Absolute Beginner Route
                </motion.div>
                <h2 className={`text-3xl font-extrabold tracking-tight transition-colors duration-200 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Choose your starter language</h2>
                <p className={`text-sm max-w-lg mx-auto transition-colors duration-200 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  We recommend starting with Python if you are complete new to coding. Choose any option to open your interactive visual roadmap.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {languages.map((lang, idx) => (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      setSelectedLanguage(lang.id);
                      setActiveTopicIndex(0);
                      resetPracticeStates();
                    }}
                    className={`p-6 border rounded-2xl cursor-pointer group transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                      isDarkMode 
                        ? "bg-slate-950 border-slate-800 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/5 text-slate-200" 
                        : "bg-white border-slate-200 hover:border-teal-500 shadow-md hover:shadow-xl hover:shadow-teal-500/5 text-slate-800"
                    }`}
                  >
                    {/* Decorative background glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr ${lang.color} opacity-4 blur-3xl group-hover:opacity-8 transition-opacity`} />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider font-bold transition-colors ${isDarkMode ? "text-slate-500 group-hover:text-teal-400" : "text-slate-400 group-hover:text-teal-500"}`}>
                          {lang.label}
                        </span>
                        <div className={`p-2.5 rounded-xl border transition-colors ${isDarkMode ? "bg-slate-900 border-slate-800 group-hover:border-slate-700" : "bg-slate-50 border-slate-200 group-hover:border-slate-350"}`}>
                          <Code2 className="w-5 h-5 text-teal-400" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className={`text-xl font-bold transition-colors ${isDarkMode ? "text-slate-200 group-hover:text-white" : "text-slate-800 group-hover:text-teal-950"}`}>
                          {lang.name}
                        </h3>
                        <p className={`text-xs font-normal leading-relaxed transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          {lang.desc}
                        </p>
                      </div>
                    </div>

                    <div className={`pt-6 border-t flex items-center justify-between text-xs mt-4 font-medium transition-colors ${isDarkMode ? "border-slate-950 text-slate-500 group-hover:text-slate-300" : "border-slate-100 text-slate-400 group-hover:text-slate-600"}`}>
                      <span>9 Structured Topics</span>
                      <div className="flex items-center gap-1 text-teal-500 dark:text-teal-400 font-semibold">
                        Start Learning
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={`border p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-800 shadow-md"}`}>
                <div className="space-y-1">
                  <h4 className={`font-bold flex items-center gap-2 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Need Career/Coding Advice?
                  </h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>Switch back to the AI Mentor workspace to discuss career roadmap strategies dynamically.</p>
                </div>
                <button 
                  onClick={onBackToDashboard}
                  className={`px-4 py-2 border rounded-xl text-xs font-semibold hover:text-white transition ${isDarkMode ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300" : "bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border-slate-200 text-slate-700"}`}
                >
                  Open AI Mentor
                </button>
              </div>
            </div>
          ) : (
            <CareerRoadmap 
              user={user} 
              isDarkMode={isDarkMode} 
              onAddCPoints={(pts) => handleEarnPoints(pts, 0)}
              onAddBPoints={(pts) => handleEarnPoints(0, pts)}
            />
          )}

          {/* Down-Below Sign Out Option */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-dashed transition-colors duration-200 bg-slate-900/10 border-slate-300 dark:bg-slate-950/20 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center font-mono font-extrabold text-xs">
                {user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Logged in as {user?.email}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Need to switch accounts or take a break from placements?</p>
              </div>
            </div>
            <button
              onClick={onLogoutTrigger}
              className="px-4 py-2 text-xs font-bold text-rose-500 dark:text-rose-400 border border-slate-3 tracking-wide border-slate-300 hover:bg-slate-105 dark:border-slate-800 dark:hover:bg-slate-900/40 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out & End Session
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 2. Interactive Learning Roadmap Screen */}
          <div className="grid lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">
          
          {/* Roadmap Sidebar Selector */}
          <div className={`lg:col-span-4 p-6 rounded-2xl border h-fit space-y-6 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedLanguage(null)}
                className="text-xs text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 flex items-center gap-1 font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Change Language
              </button>
              <span className={`text-xs font-bold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>{percentComplete}% Complete</span>
            </div>

            {/* Progress Bar */}
            <div className={`h-2 rounded-full overflow-hidden border transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800/50" : "bg-slate-100 border-slate-200"}`}>
              <div 
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full transition-all duration-300" 
                style={{ width: `${percentComplete}%` }} 
              />
            </div>

            <div className="space-y-2">
              <p className={`text-[10px] font-bold uppercase tracking-widest px-1 transition-colors ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Curriculum Roadmap</p>
              
              <div className="space-y-1">
                {TOPICS_LIST.map((topicName, idx) => {
                  const topicId = topicName.toLowerCase().replace(/[^a-z0-9]/g, "");
                  // For simplicity we map standard static topic IDs
                  const actualTopicId = idx === 0 ? "intro" : idx === 1 ? "setup" : idx === 2 ? "variables" : idx === 3 ? "datatypes" : idx === 4 ? "operators" : idx === 5 ? "io" : idx === 6 ? "conditions" : idx === 7 ? "loops" : "functions";
                  const isCompleted = completedTopics.includes(actualTopicId);
                  const isCurrent = idx === activeTopicIndex;
                  const isUnlocked = idx === 0 || completedTopics.includes(idx === 1 ? "intro" : idx === 2 ? "setup" : idx === 3 ? "variables" : idx === 4 ? "datatypes" : idx === 5 ? "operators" : idx === 6 ? "io" : idx === 7 ? "conditions" : "loops");

                  return (
                    <button
                      key={idx}
                      disabled={!isUnlocked}
                      onClick={() => {
                        setActiveTopicIndex(idx);
                        setActiveTab("theory");
                        resetPracticeStates();
                      }}
                      className={`w-full p-3 rounded-xl flex items-center justify-between transition text-left text-xs ${
                        isCurrent 
                          ? isDarkMode ? "bg-teal-500/10 border border-teal-500 text-white font-bold" : "bg-teal-50 border border-teal-500 text-teal-950 font-bold shadow-sm" 
                          : isCompleted
                            ? isDarkMode ? "bg-slate-900 text-slate-350 hover:bg-slate-900 hover:text-white" : "bg-slate-50 text-slate-705 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-205/50 border-slate-200"
                            : isUnlocked
                              ? isDarkMode ? "bg-slate-900/50 text-slate-400 hover:bg-slate-900 hover:text-white" : "bg-slate-50/50 text-slate-600 hover:bg-slate-100 hover:text-slate-950 border border-slate-200/40"
                              : isDarkMode ? "opacity-45 cursor-not-allowed bg-slate-950/20 text-slate-600" : "opacity-45 cursor-not-allowed bg-slate-100/50 text-slate-400 border border-slate-200/20"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-semibold text-[10px] text-slate-500">0{idx+1}</span>
                        <span className="font-semibold">{topicName}</span>
                      </div>

                      <div>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                        ) : isUnlocked ? (
                          <Unlock className={`w-3.5 h-3.5 ${isDarkMode ? "text-slate-600" : "text-slate-400"}`} />
                        ) : (
                          <Lock className={`w-3.5 h-3.5 ${isDarkMode ? "text-slate-700" : "text-slate-300"}`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Workspace / Content Page */}
          <div className="lg:col-span-8 space-y-6">
            {!activeTopic ? (
              <div className={`p-12 text-center rounded-2xl border space-y-4 transition-colors ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
                <BookOpen className={`w-12 h-12 mx-auto ${isDarkMode ? "text-slate-600" : "text-slate-400"}`} />
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Concept Roadmap Unveiling</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">This topic is currently locked or under development for {selectedLanguage}. Complete earlier topics to unlock!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                {/* Visual Tab controller - STRICT TWO MODULE PLAN */}
                <div className={`p-1 rounded-xl border flex transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                  <button
                    onClick={() => setActiveTab("theory")}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all gap-2 flex items-center justify-center ${
                      activeTab === "theory" 
                        ? isDarkMode ? "bg-teal-500 text-slate-950 shadow-xl shadow-teal-500/10" : "bg-teal-500 text-white shadow-md" 
                        : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    1. Theory (Intuition & Analogy)
                  </button>
                  <button
                    onClick={() => setActiveTab("practice")}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all gap-2 flex items-center justify-center ${
                      activeTab === "practice" 
                        ? isDarkMode ? "bg-teal-500 text-slate-950 shadow-xl shadow-teal-500/10" : "bg-teal-500 text-white shadow-md" 
                        : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    2. Practice (Interactive Quizzes)
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "theory" ? (
                    <motion.div
                      key="theory"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6"
                    >
                      {/* Analogy & Intuition Building Card */}
                      <div className={`p-6 border rounded-2xl space-y-4 shadow-xl transition-colors duration-200 ${isDarkMode ? "bg-gradient-to-br from-teal-950/20 to-slate-950 border-teal-500/20" : "bg-gradient-to-br from-teal-50/50 to-white border-teal-500/20 shadow-slate-100"}`}>
                        <div className="flex items-center gap-2 text-teal-500 dark:text-teal-400">
                          <Lightbulb className="w-5 h-5" />
                          <h4 className="font-bold uppercase tracking-wider text-xs">Real-World Analogy</h4>
                        </div>
                        <p className={`text-sm leading-relaxed font-normal italic transition-colors ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                          "{activeTopic.theory.analogy}"
                        </p>
                      </div>

                      {/* What/Why/When Comparison Matrix */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={`p-5 rounded-2xl border space-y-2 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                          <h5 className={`text-xs font-bold uppercase ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Why does this exist?</h5>
                          <p className={`text-xs leading-relaxed font-normal ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{activeTopic.theory.why}</p>
                        </div>
                        <div className={`p-5 rounded-2xl border space-y-2 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                          <h5 className={`text-xs font-bold uppercase ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>When should you use it?</h5>
                          <p className={`text-xs leading-relaxed font-normal ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{activeTopic.theory.when}</p>
                        </div>
                      </div>

                      {/* Visual Architecture Representation */}
                      <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div>
                          <h4 className={`font-bold text-sm ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>{activeTopic.theory.visual.title}</h4>
                          <p className="text-xs text-slate-500">{activeTopic.theory.visual.description}</p>
                        </div>

                        {/* Interactive diagram rendering */}
                        <div className={`p-6 rounded-xl border flex flex-col md:flex-row items-center justify-center gap-6 transition-colors duration-200 ${isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                          {activeTopic.theory.visual.nodes.map((node, nodeIdx) => (
                            <React.Fragment key={node.id}>
                              <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                                node.highlight 
                                  ? isDarkMode ? "bg-teal-500/10 border-teal-400/50 text-white" : "bg-teal-50 border-teal-400/50 text-teal-950 font-bold shadow-sm" 
                                  : isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700 shadow-sm"
                              } w-44 shadow-lg`}>
                                <span className="font-bold text-sm mb-1">{node.label}</span>
                                <span className="text-[10px] text-slate-500 leading-tight">{node.sub}</span>
                              </div>
                              {nodeIdx < activeTopic.theory.visual.nodes.length - 1 && (
                                <ChevronRight className={`w-5 h-5 hidden md:block ${isDarkMode ? "text-slate-600" : "text-slate-400"}`} />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Main explanation markdown */}
                      <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                        <h4 className={`font-bold text-sm ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>Deep Concept Breakdown</h4>
                        <p className={`text-sm leading-relaxed font-normal transition-colors duration-200 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                          {activeTopic.theory.explanation}
                        </p>
                        <div className={`p-4 rounded-xl border transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                          <p className="text-[10px] text-teal-500 dark:text-teal-400 font-bold uppercase tracking-wider mb-2">How it works under the hood (RAM/CPU)</p>
                          <p className={`text-xs transition-colors duration-200 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{activeTopic.theory.internalWorking}</p>
                        </div>
                      </div>

                      {/* Step-by-Step Code line analyzer */}
                      <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div>
                          <h4 className={`font-bold text-sm ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>Line-by-Line Code Intuition</h4>
                          <p className="text-xs text-slate-500">Click any line below to understand exactly what action the computer takes.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className={`rounded-xl border overflow-hidden transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                            <div className={`p-2 border-b text-[10px] uppercase font-bold transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-250 text-slate-500"}`}>Source Code</div>
                            <div className="p-4 font-mono text-xs space-y-1">
                              {activeTopic.theory.stepByStepCode.map((item, lineIdx) => (
                                <div 
                                  key={lineIdx}
                                  onClick={() => setActiveLineIndex(lineIdx)}
                                  className={`p-2 rounded cursor-pointer transition-all ${
                                    activeLineIndex === lineIdx 
                                      ? isDarkMode ? "bg-teal-500/10 text-white border-l-2 border-teal-400" : "bg-teal-50 text-teal-950 font-bold border-l-2 border-teal-500 shadow-sm" 
                                      : isDarkMode ? "hover:bg-slate-850 text-slate-400" : "hover:bg-slate-200 text-slate-650"
                                  }`}
                                >
                                  {item.line}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={`p-4 rounded-xl border flex flex-col justify-between transition-colors duration-200 ${isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider font-bold text-teal-500 dark:text-teal-400 mb-2">Internal Translation</p>
                              <p className={`text-xs leading-relaxed font-normal transition-colors duration-200 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                                {activeTopic.theory.stepByStepCode[activeLineIndex]?.comment || "Select a code line above to inspect logic."}
                              </p>
                            </div>
                            <div className="text-[9px] text-slate-500 uppercase font-mono mt-4">Pointers and memory allocations verified.</div>
                          </div>
                        </div>
                      </div>

                      {/* Mistakes / Tips Cards */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={`p-5 border rounded-2xl space-y-3 transition-colors duration-200 ${isDarkMode ? "bg-red-950/15 border-red-500/20" : "bg-red-50/20 border-red-200/50"}`}>
                          <h5 className={`text-xs font-bold uppercase ${isDarkMode ? "text-red-400" : "text-red-600"}`}>Common Newcomer Mistakes</h5>
                          {activeTopic.theory.commonMistakes.map((m, idx) => (
                            <div key={idx} className="space-y-1 text-xs">
                              <p className={`font-bold ${isDarkMode ? "text-red-200" : "text-red-900"}`}>❌ {m.mistake}</p>
                              <p className={`transition-colors duration-200 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>✔️ Fix: <code className={`font-mono px-1.5 py-0.5 rounded ${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900 border border-slate-200/60"}`}>{m.fix}</code></p>
                            </div>
                          ))}
                        </div>

                        <div className={`p-5 border rounded-2xl space-y-3 transition-colors duration-200 ${isDarkMode ? "bg-teal-950/10 border-teal-500/20" : "bg-teal-50/20 border-teal-500/20"}`}>
                          <h5 className="text-xs font-bold uppercase text-teal-500 dark:text-teal-400">Memory Trick & Tips</h5>
                          <div className={`p-3 rounded-xl border transition-colors ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                            <p className="text-[10px] font-bold text-teal-500 dark:text-teal-400 uppercase tracking-widest mb-1">Mnemonic Phrase</p>
                            <p className={`text-xs italic font-normal transition-colors ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>"{activeTopic.theory.memoryTrick}"</p>
                          </div>
                          <ul className={`text-xs space-y-1 pl-4 list-disc transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-650 text-slate-605 text-slate-600"}`}>
                            {activeTopic.theory.beginnerTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Did You Know? Masterclass Comparison Section */}
                      {DID_YOU_KNOW_DATA[activeTopic.id] && (() => {
                        const dyk = DID_YOU_KNOW_DATA[activeTopic.id];
                        return (
                          <div id="did-you-know-section" className={`border rounded-2xl overflow-hidden shadow-xl transition-all duration-200 ${isDarkMode ? "bg-gradient-to-br from-indigo-950/25 via-slate-950 to-slate-950 border-amber-500/20 shadow-slate-950/30" : "bg-gradient-to-br from-slate-50 via-white to-white border-amber-500/20 shadow-slate-200/50"}`}>
                            {/* Toggle Header */}
                            <button
                              id="did-you-know-toggle"
                              onClick={() => setIsDidYouKnowExpanded(!isDidYouKnowExpanded)}
                              className={`w-full p-5 flex items-center justify-between text-left transition duration-200 ${isDarkMode ? "hover:bg-slate-900/40" : "hover:bg-slate-50"}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`relative p-2.5 rounded-xl border transition-colors ${isDarkMode ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-50 text-amber-500 border-amber-500/30"}`}>
                                  <Lightbulb className="w-5 h-5 animate-pulse" />
                                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-amber-300 dark:text-amber-500 animate-bounce" />
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 dark:text-amber-400">Did You Know?</span>
                                  <h4 className={`text-sm font-bold flex items-center gap-2 transition-colors ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
                                    {dyk.title}
                                    <span className={`text-[9px] border px-2 py-0.5 rounded font-normal transition-colors ${isDarkMode ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" : "bg-indigo-55 text-indigo-600 border-indigo-200"}`}>Cross-Language View</span>
                                  </h4>
                                </div>
                              </div>
                              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDarkMode ? "text-slate-400" : "text-slate-500"} ${isDidYouKnowExpanded ? "rotate-180" : ""}`} />
                            </button>

                            {/* Collapse/Expand area */}
                            <AnimatePresence initial={false}>
                              {isDidYouKnowExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className={`border-t transition-colors duration-200 ${isDarkMode ? "border-slate-900/80" : "border-slate-100"}`}
                                >
                                  <div className="p-5 space-y-5">
                                    {/* Introduction text */}
                                    <p className={`text-xs leading-relaxed max-w-2xl transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-650"}`}>
                                      See how the concept of <strong className={`font-semibold ${isDarkMode ? "text-slate-205 text-slate-205 text-slate-200" : "text-slate-900"}`}>"{activeTopic.title.replace(/^\d+\.\s*/, '')}"</strong> differs across popular starter languages. It enhances your programming fluency to understand how code layouts change!
                                    </p>

                                    {/* Language comparison cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                      {dyk.comparisons.map((comp) => {
                                        const isCurrent = comp.language.toLowerCase() === selectedLanguage?.toLowerCase();
                                        return (
                                          <div 
                                            key={comp.language}
                                            id={`dyk-card-${comp.language.toLowerCase()}`}
                                            className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                                              isCurrent 
                                                ? isDarkMode ? "bg-teal-950/20 border-teal-500/40 shadow-lg shadow-teal-500/5" : "bg-teal-50 border-teal-500/40 shadow-md shadow-teal-500/5" 
                                                : isDarkMode ? "bg-slate-900/50 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                                            }`}
                                          >
                                            <div className="space-y-3">
                                              <div className="flex items-center justify-between">
                                                <span className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                                                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-teal-400 animate-pulse' : 'bg-slate-400'}`} />
                                                  {comp.language}
                                                </span>
                                                {isCurrent && (
                                                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-teal-500 dark:text-teal-300 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">
                                                    You are here
                                                  </span>
                                                )}
                                              </div>

                                              <div className={`p-2.5 rounded-lg border font-mono text-[11px] leading-normal whitespace-pre-wrap select-all transition-all duration-205 overflow-x-auto max-h-[160px] ${isDarkMode ? "bg-slate-950/80 border-slate-900/60 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700 shadow-inner"}`}>
                                                <code>{comp.code}</code>
                                              </div>
                                            </div>

                                            {comp.note && (
                                              <p className={`text-[10px] mt-2.5 leading-normal italic transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                                                {comp.note}
                                              </p>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Interesting Fact alert banner */}
                                    <div id="dyk-interesting-fact" className={`p-4 border-l-4 rounded-r-xl space-y-1 transition-colors ${isDarkMode ? "bg-amber-500/5 border-amber-500" : "bg-amber-50/50 border-amber-500"}`}>
                                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5" /> Interesting Fact!
                                      </span>
                                      <p className={`text-xs leading-relaxed font-normal transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                                        {dyk.interestingFact}
                                      </p>
                                    </div>

                                    {/* Additional Insight if present */}
                                    {dyk.additionalTip && (
                                      <div id="dyk-additional-tip" className={`p-3.5 border rounded-xl flex items-center gap-3 text-xs leading-normal transition-colors ${isDarkMode ? "bg-indigo-500/5 border-indigo-500/10 text-slate-400" : "bg-indigo-50/30 border-indigo-100 text-slate-600"}`}>
                                        <div className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-650"}`}>
                                          <HelpCircle className="w-4 h-4 flex-shrink-0" />
                                        </div>
                                        <span>{dyk.additionalTip}</span>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })()}

                      {/* Ready for Practice button */}
                      <button
                        onClick={() => setActiveTab("practice")}
                        className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-teal-500/10 transition-all flex items-center justify-center gap-2"
                      >
                        Let's Practice this Concept
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="practice"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6"
                    >
                      {/* QUIZ - MCQ */}
                      <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">MCQ Concept check</span>
                          <span className="text-xs text-slate-500 font-medium font-mono">Reward: 10 C Points</span>
                        </div>

                        <p className="text-sm font-bold text-slate-200">{activeTopic.practice.mcq.question}</p>

                        <div className="space-y-2">
                          {activeTopic.practice.mcq.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (!mcqChecked) setSelectedMcqOption(idx);
                              }}
                              className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold border transition flex items-center gap-2.5 ${
                                mcqChecked && idx === activeTopic.practice.mcq.correctAnswer
                                  ? "bg-green-500/10 border-green-500 text-green-300"
                                  : mcqChecked && idx === selectedMcqOption
                                    ? "bg-red-500/10 border-red-500 text-red-300"
                                    : selectedMcqOption === idx
                                      ? "bg-teal-500/5 border-teal-500 text-teal-300"
                                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                              }`}
                            >
                              <span className="text-[10px] bg-slate-950 p-1.5 rounded-lg border border-slate-800">{String.fromCharCode(65 + idx)}</span>
                              <span>{option}</span>
                            </button>
                          ))}
                        </div>

                        {!mcqChecked ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setMcqChecked(true)}
                              disabled={selectedMcqOption === null}
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white transition disabled:opacity-50"
                            >
                              Check Answer
                            </button>
                            <button
                              onClick={() => setShowHint(true)}
                              className="px-4 py-2 bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 text-xs rounded-xl transition inline-flex items-center gap-1"
                            >
                              <HelpCircle className="w-3.5 h-3.5" /> Request Hint
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 leading-normal italic">
                            💡 Explanation: {activeTopic.practice.mcq.explanation}
                          </p>
                        )}
                      </div>

                      {/* Fill in the Blanks */}
                      <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">Fill-in-the-blank</span>
                          <span className="text-xs text-slate-500 font-medium">Reward: 10 C Points</span>
                        </div>

                        <p className="text-sm font-bold text-slate-200">{activeTopic.practice.fillInBlanks.question}</p>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type response words"
                            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 ring-teal-500 w-64"
                            value={blankValue}
                            onChange={(e) => setBlankValue(e.target.value)}
                            disabled={blankChecked}
                          />
                          <button
                            onClick={() => setBlankChecked(true)}
                            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white transition"
                          >
                            Verify Choice
                          </button>
                        </div>

                        {blankChecked && (
                          <div className={`p-4 rounded-xl text-xs ${
                            blankValue.toLowerCase().trim() === activeTopic.practice.fillInBlanks.blankWord.toLowerCase()
                              ? "bg-green-500/10 text-green-300 border border-green-500/20"
                              : "bg-red-500/10 text-red-300 border border-red-500/20"
                          }`}>
                            <p className="font-bold mb-1">
                              {blankValue.toLowerCase().trim() === activeTopic.practice.fillInBlanks.blankWord.toLowerCase()
                                ? "Correct Code Mapping!"
                                : `Target word was: ${activeTopic.practice.fillInBlanks.blankWord}`}
                            </p>
                            <p className="text-slate-400">{activeTopic.practice.fillInBlanks.explanation}</p>
                          </div>
                        )}
                      </div>

                      {/* Predict Output */}
                      <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-teal-500 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">Predict Output</span>
                          <span className={`text-xs font-medium ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Reward: 15 C Points</span>
                        </div>

                        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`}>
                          {activeTopic.practice.predictOutput.code}
                        </div>

                        <p className={`text-sm font-semibold transition-colors ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{activeTopic.practice.predictOutput.question}</p>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Expected Output description"
                            className={`rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 ring-teal-500 w-64 transition-colors ${isDarkMode ? "bg-slate-900 border border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-800 shadow-inner"}`}
                            value={predictValue}
                            onChange={(e) => setPredictValue(e.target.value)}
                            disabled={predictChecked}
                          />
                          <button
                            onClick={() => setPredictChecked(true)}
                            className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition ${isDarkMode ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-white" : "bg-slate-800 hover:bg-slate-900 border-slate-705 text-white"}`}
                          >
                            Submit
                          </button>
                        </div>

                        {predictChecked && (
                          <div className={`p-4 rounded-xl text-xs ${
                            predictValue.toLowerCase().trim() === activeTopic.practice.predictOutput.expectedAnswer.toLowerCase()
                              ? "bg-green-500/10 text-green-600 dark:text-green-300 border border-green-500/20"
                              : "bg-red-500/10 text-red-650 text-red-600 dark:text-red-300 border border-red-500/20"
                          }`}>
                            <p className="font-bold mb-1">
                              {predictValue.toLowerCase().trim() === activeTopic.practice.predictOutput.expectedAnswer.toLowerCase()
                                ? "Flawless Execution prediction!"
                                : `Expected execution output: ${activeTopic.practice.predictOutput.expectedAnswer}`}
                            </p>
                            <p className={`transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-605 text-slate-600"}`}>{activeTopic.practice.predictOutput.explanation}</p>
                          </div>
                        )}
                      </div>

                      {/* Error Identification and bug detection */}
                      <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-teal-500 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">Bug Identifier</span>
                          <span className={`text-xs font-medium ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Reward: 15 C Points</span>
                        </div>

                        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800 text-red-400" : "bg-red-50/40 border-red-200 text-red-900"}`}>
                          {activeTopic.practice.errorIdentification.code}
                        </div>

                        <div className="space-y-3">
                          <p className={`text-xs transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Analyze the faulty code above. Do you identify where the bug lies?</p>
                          {showHint && (
                            <div className={`p-4 rounded-xl border text-xs italic flex items-center gap-2 transition-colors duration-200 ${isDarkMode ? "bg-slate-900 text-teal-450 text-teal-400 border-slate-850" : "bg-teal-50 text-teal-800 border-teal-200"}`}>
                              <Lightbulb className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                              <span>Analogy hint: {activeTopic.practice.hint}</span>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => setErrorChecked(true)}
                              className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition hover:opacity-90 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-slate-800 hover:bg-slate-900 border-slate-700 text-white"}`}
                            >
                              Show Bug Fix explanation
                            </button>
                            {!showHint && (
                              <button
                                onClick={() => setShowHint(true)}
                                className={`px-4 py-2.5 border text-xs rounded-xl transition ${isDarkMode ? "bg-slate-950 border-slate-850 hover:bg-slate-900 text-slate-400" : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600"}`}
                              >
                                Need a Hint?
                              </button>
                            )}
                          </div>
                        </div>

                        {errorChecked && (
                          <div className={`p-4 rounded-xl border space-y-2 text-xs transition-colors duration-200 ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                            <p className="font-bold text-red-500 dark:text-red-300">❌ Found Bug: {activeTopic.practice.errorIdentification.bug}</p>
                            <p className="font-bold text-green-600 dark:text-green-350">✔️ Safe Code: <code className={`font-mono px-2 py-0.5 rounded transition-colors ${isDarkMode ? "bg-slate-950 text-white" : "bg-white border border-slate-200 text-slate-850"}`}>{activeTopic.practice.errorIdentification.fix}</code></p>
                            <p className={`mt-2 transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{activeTopic.practice.errorIdentification.explanation}</p>
                          </div>
                        )}
                      </div>

                      {/* Ultimate Completion Button and progress save */}
                      {isCompleted ? (
                        <div className={`p-6 border rounded-2xl text-center space-y-3 transition-colors duration-200 ${isDarkMode ? "bg-gradient-to-br from-green-950/20 to-slate-950 border-green-500/30" : "bg-gradient-to-br from-green-50/20 to-white border-green-500/25 shadow-sm"}`}>
                          <CheckCircle className="w-10 h-10 text-green-500 dark:text-green-400 mx-auto animate-bounce" />
                          <h4 className="font-bold text-lg text-green-600 dark:text-green-300 font-bold">Topic Completed Successfully!</h4>
                          <p className={`text-xs transition-colors duration-200 ${isDarkMode ? "text-slate-500" : "text-slate-600 font-medium"}`}>Your progress has been submitted and saved in Firestore. Keep going, absolute programmer!</p>
                          <button
                            onClick={() => {
                              if (activeTopicIndex < TOPICS_LIST.length - 1) {
                                setActiveTopicIndex(activeTopicIndex + 1);
                                setActiveTab("theory");
                                resetPracticeStates();
                              } else {
                                onBackToDashboard();
                              }
                            }}
                            className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xs mt-4 hover:shadow-lg transition"
                          >
                            {activeTopicIndex < TOPICS_LIST.length - 1 ? "Advance to Next Topic" : "Proceed to Graduation"}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMarkComplete(activeTopic.id)}
                          className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl transition shadow-xl"
                        >
                          Mark Topic Complete & Save Progress
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>

        {/* Down-Below Sign Out Option */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-dashed transition-colors duration-200 bg-slate-900/10 border-slate-300 dark:bg-slate-950/20 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center font-mono font-extrabold text-xs">
                {user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-705 dark:text-slate-300">Logged in as {user?.email}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Need to switch accounts or take a break from placements?</p>
              </div>
            </div>
            <button
              onClick={onLogoutTrigger}
              className="px-4 py-2 text-xs font-bold text-rose-500 dark:text-rose-400 border border-slate-300 hover:bg-slate-105 dark:border-slate-800 dark:hover:bg-slate-900/40 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out & End Session
            </button>
          </div>
        </div>

        </>
      )}
    </div>
  );
}
