import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Map, 
  Compass, 
  CheckCircle2, 
  Copy, 
  Check, 
  RotateCcw, 
  ArrowRight, 
  Trophy, 
  Terminal, 
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  Workflow,
  Layers,
  Shield,
  Play,
  ArrowDown,
  GitFork,
  Share2,
  Code,
  Eye
} from "lucide-react";
import { generateRoadmap, generateStreamMentor, generatePremiumPath } from "../lib/gemini";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

interface CareerRoadmapProps {
  user: any;
  isDarkMode: boolean;
  onAddCPoints?: (amount: number) => void;
  onAddBPoints?: (amount: number) => void;
}

const PRESET_ROLES = [
  { id: "SDE", name: "SDE (Core)", desc: "Software engineering fundamentals & system foundations", icon: Workflow },
  { id: "Frontend", name: "Frontend Engineer", desc: "Interactive, fully-polished responsive visual designs", icon: Compass },
  { id: "Backend", name: "Backend Architect", desc: "High performance APIs, databases, & cloud systems", icon: BrainCircuit },
  { id: "Fullstack", name: "Fullstack Developer", desc: "End-to-end applications, frontend UI & backend systems", icon: Layers },
  { id: "DevOps", name: "DevOps Architect", desc: "Continuous pipelines, infrastructure-as-code & containers", icon: Terminal },
  { id: "CyberSecurity", name: "Cyber Security", desc: "Network security foundations, Linux systems, & web safety", icon: Shield },
  { id: "Data Scientist", name: "Data Scientist", desc: "Machine learning, mathematical statistics, & big data", icon: TrendingUp }
];

const PRESET_STREAMS = [
  { id: "SDE Core", name: "SDE Core", desc: "Core software engineering & backend systems", icon: Terminal },
  { id: "Frontend", name: "Frontend", desc: "User interfaces, React, & interactive client apps", icon: Layers },
  { id: "Fullstack", name: "Fullstack", desc: "Both end development, database schemas, & full deployment", icon: Workflow }
];

const PREMIUM_FIELDS = [
  { id: "SDE", name: "SDE", desc: "Language Basics, Memory, CS Core, SOLID, System Tool Project", icon: Terminal },
  { id: "Frontend", name: "Frontend", desc: "JS & TS Core, Async, Rendering Path, Core Web Vitals", icon: Layers },
  { id: "Backend", name: "Backend", desc: "Request Lifecycles, REST/JWT, Caching (Redis), Decoupled Architecture", icon: Workflow },
  { id: "Full Stack", name: "Full Stack", desc: "End-to-End Client/Server, CORS/XSS, WebSockets, State Sync", icon: Compass },
  { id: "Cyber Sec", name: "Cyber Sec", desc: "Security Paradigms, OWASP Top 10, Network Layers, Cryptography", icon: Shield },
  { id: "AI/ML", name: "AI/ML", desc: "Math Foundations, Matrix Calculus, Data Wrangling, ML Algos", icon: BrainCircuit },
  { id: "Data Analyst", name: "Data Analyst", desc: "Distributed Data Architectures, Advanced SQL, Pipeline ETL, Warehousing", icon: TrendingUp }
];

export default function CareerRoadmap({ user, isDarkMode, onAddCPoints, onAddBPoints }: CareerRoadmapProps) {
  const [activeTab, setActiveTab] = useState<"pillars" | "mentor">("pillars");
  const [roleInput, setRoleInput] = useState("");
  const [activeRoadmap, setActiveRoadmap] = useState<{
    role: string;
    pillars: any[];
    ascii: string;
    checked: string[];
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [savedRoadmaps, setSavedRoadmaps] = useState<Record<string, {
    pillars: any[];
    ascii: string;
    checked: string[];
  }>>({});
  
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"diagram" | "grid">("diagram");

  // New Beginner Stream Mentor states
  const [mentorInput, setMentorInput] = useState("");
  const [mentorLoading, setMentorLoading] = useState(false);
  const [activeMentorData, setActiveMentorData] = useState<{
    stream_title: string;
    fresher_expectation: string;
    nodes: Array<{
      id: string;
      type: string;
      title: string;
      details: string;
      connects_to: string | null;
    }>;
  } | null>(null);

  const [savedMentorData, setSavedMentorData] = useState<Record<string, {
    stream_title: string;
    fresher_expectation: string;
    nodes: Array<{
      id: string;
      type: string;
      title: string;
      details: string;
      connects_to: string | null;
    }>;
  }>>({});

  // 15+ LPA Premium Path states
  const [premiumField, setPremiumField] = useState("");
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [activePremiumPath, setActivePremiumPath] = useState<{
    root_node: { id: string; label: string };
    nodes: Array<{ id: string; label: string; parent_id: string }>;
  } | null>(null);

  const [savedPremiumPaths, setSavedPremiumPaths] = useState<Record<string, {
    root_node: { id: string; label: string };
    nodes: Array<{ id: string; label: string; parent_id: string }>;
  }>>({});

  const [premiumViewMode, setPremiumViewMode] = useState<"visual" | "json">("visual");

  // Load roadmaps and mentor streams from Firestore
  useEffect(() => {
    async function loadRoadmapsAndMentors() {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          if (data.careerRoadmaps) {
            setSavedRoadmaps(data.careerRoadmaps);
            
            // Default to the first saved roadmap if available
            const keys = Object.keys(data.careerRoadmaps);
            if (keys.length > 0) {
              const firstKey = keys[0];
              setActiveRoadmap({
                role: firstKey,
                pillars: data.careerRoadmaps[firstKey].pillars || [],
                ascii: data.careerRoadmaps[firstKey].ascii || "",
                checked: data.careerRoadmaps[firstKey].checked || []
              });
            }
          }
          if (data.careerMentorData) {
            setSavedMentorData(data.careerMentorData);
            const mentorKeys = Object.keys(data.careerMentorData);
            if (mentorKeys.length > 0) {
              setActiveMentorData(data.careerMentorData[mentorKeys[0]]);
            }
          }
          if (data.careerPremiumPaths) {
            setSavedPremiumPaths(data.careerPremiumPaths);
            const premiumKeys = Object.keys(data.careerPremiumPaths);
            if (premiumKeys.length > 0) {
              setActivePremiumPath(data.careerPremiumPaths[premiumKeys[0]]);
            }
          }
        }
      } catch (error) {
        console.error("Error loading career roadmaps & mentor data:", error);
      }
    }
    loadRoadmapsAndMentors();
  }, [user]);

  // Auto-generate premium path if none exists on mount or select
  useEffect(() => {
    if (activeTab === "mentor" && !activePremiumPath && !premiumLoading) {
      handleGeneratePremiumPath("SDE");
    }
  }, [activeTab, activePremiumPath]);

  // Sync roadmap to Firestore
  const saveRoadmapState = async (updatedRoadmaps: typeof savedRoadmaps) => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        careerRoadmaps: updatedRoadmaps
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}/careerRoadmaps`);
    }
  };

  // Sync mentor to Firestore
  const saveMentorState = async (updatedMentorData: typeof savedMentorData) => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        careerMentorData: updatedMentorData
      });
    } catch (error) {
      console.error("Error saving careerMentorData:", error);
    }
  };

  // Sync premium path to Firestore
  const savePremiumPathState = async (updatedPremiumPaths: typeof savedPremiumPaths) => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        careerPremiumPaths: updatedPremiumPaths
      });
    } catch (error) {
      console.error("Error saving careerPremiumPaths:", error);
    }
  };

  const handleGeneratePremiumPath = async (targetField: string) => {
    const fieldClean = targetField.trim();
    if (!fieldClean) return;

    setPremiumLoading(true);
    try {
      if (savedPremiumPaths[fieldClean]) {
        setActivePremiumPath(savedPremiumPaths[fieldClean]);
        setPremiumLoading(false);
        return;
      }

      const res = await generatePremiumPath(fieldClean);
      const updatedPremiumPaths = {
        ...savedPremiumPaths,
        [fieldClean]: res
      };

      setSavedPremiumPaths(updatedPremiumPaths);
      setActivePremiumPath(res);
      await savePremiumPathState(updatedPremiumPaths);

      if (onAddCPoints) onAddCPoints(25);
    } catch (err) {
      console.error(err);
    } finally {
      setPremiumLoading(false);
    }
  };

  const handleGenerateMentor = async (targetStream: string) => {
    const streamClean = targetStream.trim();
    if (!streamClean) return;

    setMentorLoading(true);
    try {
      if (savedMentorData[streamClean]) {
        setActiveMentorData(savedMentorData[streamClean]);
        setMentorLoading(false);
        return;
      }

      const res = await generateStreamMentor(streamClean);
      const updatedMentorData = {
        ...savedMentorData,
        [streamClean]: res
      };

      setSavedMentorData(updatedMentorData);
      setActiveMentorData(res);
      await saveMentorState(updatedMentorData);

      if (onAddCPoints) onAddCPoints(20);
    } catch (err) {
      console.error(err);
    } finally {
      setMentorLoading(false);
    }
  };

  const handleGenerate = async (targetRole: string) => {
    const roleClean = targetRole.trim();
    if (!roleClean) return;

    setLoading(true);
    try {
      // If we already have this role saved, just activate it
      if (savedRoadmaps[roleClean]) {
        setActiveRoadmap({
          role: roleClean,
          pillars: savedRoadmaps[roleClean].pillars,
          ascii: savedRoadmaps[roleClean].ascii,
          checked: savedRoadmaps[roleClean].checked || []
        });
        setLoading(false);
        return;
      }

      const res = await generateRoadmap(roleClean);
      const mappedRole = res.role || res.career || roleClean;
      const pillars = res.pillars || [];

      // Structuring standard UML-style ascii matching candidate specs
      let ascii = "";
      if (pillars.length > 0) {
        ascii = `🚩 START: ${mappedRole}\n\n` + 
                pillars.map((p: any, idx: number) => {
                  const prefix = idx === pillars.length - 1 ? "└──" : "├──";
                  const pName = typeof p === "string" ? p : p.title;
                  const pDays = typeof p === "string" ? "" : ` (${p.estimated_days} Days)`;
                  return `${prefix} ${pName}${pDays}`;
                }).join("\n") + 
                `\n\n🏁 INTERVIEW READY`;
      } else {
        ascii = res.ascii || `🚩 START: ${mappedRole}\n\n🏁 INTERVIEW READY`;
      }

      const newRoadmap = {
        role: mappedRole,
        pillars: pillars,
        ascii: ascii,
        checked: []
      };

      const updatedRoadmaps = {
        ...savedRoadmaps,
        [newRoadmap.role]: {
          pillars: newRoadmap.pillars,
          ascii: newRoadmap.ascii,
          checked: []
        }
      };

      setSavedRoadmaps(updatedRoadmaps);
      setActiveRoadmap(newRoadmap);
      await saveRoadmapState(updatedRoadmaps);

      // Reward points for initiating new career roadmaps
      if (onAddCPoints) onAddCPoints(15);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = async (nodeName: string) => {
    if (!activeRoadmap) return;

    const isChecked = activeRoadmap.checked.includes(nodeName);
    const newChecked = isChecked 
      ? activeRoadmap.checked.filter(n => n !== nodeName)
      : [...activeRoadmap.checked, nodeName];

    const updatedRoadmap = {
      ...activeRoadmap,
      checked: newChecked
    };

    const updatedRoadmaps = {
      ...savedRoadmaps,
      [activeRoadmap.role]: {
        ...savedRoadmaps[activeRoadmap.role],
        checked: newChecked
      }
    };

    setActiveRoadmap(updatedRoadmap);
    setSavedRoadmaps(updatedRoadmaps);
    await saveRoadmapState(updatedRoadmaps);

    // Reward points on milestone checking
    if (!isChecked) {
      if (onAddCPoints) onAddCPoints(10);
      if (onAddBPoints) onAddBPoints(5);
    }
  };

  const copyToClipboard = () => {
    if (!activeRoadmap) return;
    navigator.clipboard.writeText(activeRoadmap.ascii);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = async () => {
    if (!activeRoadmap) return;
    
    const updatedRoadmap = {
      ...activeRoadmap,
      checked: []
    };

    const updatedRoadmaps = {
      ...savedRoadmaps,
      [activeRoadmap.role]: {
        ...savedRoadmaps[activeRoadmap.role],
        checked: []
      }
    };

    setActiveRoadmap(updatedRoadmap);
    setSavedRoadmaps(updatedRoadmaps);
    await saveRoadmapState(updatedRoadmaps);
  };

  // Percentage complete calculates topics
  const percentComplete = activeRoadmap && activeRoadmap.pillars.length > 0
    ? Math.round((activeRoadmap.checked.length / activeRoadmap.pillars.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("pillars")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === "pillars"
              ? "border-teal-500 text-teal-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-400"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>🎓 Comprehensive Roadmap</span>
        </button>
        <button
          onClick={() => setActiveTab("mentor")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === "mentor"
              ? "border-teal-500 text-teal-400 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-400"
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>✨ Beginner Path</span>
        </button>
      </div>

      {activeTab === "pillars" && (
        <div className="space-y-8">
          {/* 1. Header & Selector Box */}
      <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-teal-500 mb-2">
            <Compass className="w-5 h-5 animate-spin-slow" />
            <span className="text-xs uppercase tracking-wider font-extrabold font-mono">Structure-First Roadmap Generation Engine</span>
          </div>
          <h1 className={`text-2xl font-bold tracking-tight mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            AI Career Roadmap Generator
          </h1>
          <p className={`text-xs mb-6 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Generate interactive hierarchical learning pillars mapped directly to your targeted industry positions. Use any custom role or kickstart with our premium engineering templates.
          </p>

          {/* Form generator */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input 
              type="text" 
              placeholder="Enter Custom Role (e.g. Android Engineer, Cyber Analyst, Product Manager)..."
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerate(roleInput);
              }}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                isDarkMode 
                  ? "bg-slate-900/50 border-slate-800 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                  : "bg-slate-50 border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              }`}
            />
            <button 
              onClick={() => handleGenerate(roleInput)}
              disabled={loading || !roleInput.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Generate Roadmap
            </button>
          </div>

          {/* Preset templates */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Popular Template Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_ROLES.map((role) => {
                const IconComp = role.icon;
                const isSelected = activeRoadmap?.role === role.name || activeRoadmap?.role === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleGenerate(role.name)}
                    disabled={loading}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? "bg-teal-500/10 border-teal-500 text-teal-400"
                        : isDarkMode
                          ? "bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                          : "bg-slate-50 border-slate-200 text-slate-650 hover:border-slate-300 hover:text-slate-800"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5 text-teal-400" />
                    <span>{role.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Loading State */}
      {loading && (
        <div className={`p-12 rounded-3xl border flex flex-col items-center justify-center gap-4 text-center ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}>
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-teal-500/10 border-t-teal-400 animate-spin" />
            <Compass className="w-6 h-6 text-teal-400 absolute inset-0 m-auto animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className={`font-bold text-sm ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>Plotting Broad Pillars...</h4>
            <p className="text-xs text-slate-500">Retrieving structure-first requirements with no descriptions or time constraints.</p>
          </div>
        </div>
      )}

      {/* 3. Output Split Screen */}
      {!loading && activeRoadmap && (
        <div className="space-y-4">
          
          {/* Pathway Visualization Panel */}
          <div className="space-y-4">
            <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              
              {/* Header metrics */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-900 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/10">Hierarchy Master</span>
                    <span className="text-xs font-mono text-slate-500">{activeRoadmap.pillars.length} Core Milestones</span>
                  </div>
                  <h3 className={`text-xl font-extrabold mt-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {activeRoadmap.role} Pathway
                  </h3>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Trophy className="w-4 h-4 text-amber-500 fill-amber-500/10" />
                      <span className="text-sm font-bold text-teal-400">{percentComplete}% Path Completion</span>
                    </div>
                    <p className="text-[9px] text-slate-500 font-mono">Unlock points by marking pillars</p>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border rounded-xl hover:opacity-85 transition cursor-pointer ${
                      copied 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : isDarkMode
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          : "bg-slate-50 border-slate-200 text-slate-600 shadow-xs"
                    }`}
                    title="Copy Roadmap Text Format"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Path"}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className={`p-2 rounded-xl border hover:opacity-85 transition cursor-pointer ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-600"}`}
                    title="Reset Checked Progress"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dual-View Mode Switcher */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-2">
                <p className="text-[10px] font-extrabold uppercase text-slate-400 font-mono tracking-wider">Pathway Visualization Mode</p>
                <div className={`p-0.5 rounded-xl flex items-center border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                  <button
                    onClick={() => setViewMode("diagram")}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                      viewMode === "diagram"
                        ? "bg-teal-500 text-white"
                        : isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Tree Flow Diagram
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-teal-500 text-white"
                        : isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Quick Grid Matrix
                  </button>
                </div>
              </div>

              {viewMode === "diagram" ? (
                /* Interactive Tree Diagram Layout */
                <div className="relative pl-8 sm:pl-12 py-4 space-y-6">
                  {/* Glowing Connection Spinal Cord Line */}
                  <div className={`absolute top-2 bottom-6 left-3 sm:left-5 w-0.5 transition-all duration-500 ${
                    percentComplete > 0 
                      ? "bg-gradient-to-b from-teal-400 via-teal-500/70 to-indigo-500/20" 
                      : isDarkMode ? "bg-slate-800" : "bg-slate-200"
                  }`} />

                  {/* Root Node of the diagram at the top header list */}
                  <div className="relative -ml-8 sm:-ml-12 mb-8 flex items-center gap-3">
                    <div className="relative z-10 w-6 h-6 rounded-full bg-slate-900 border-2 border-teal-400 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    </div>
                    <div className={`px-4 py-2 rounded-xl border font-bold text-xs uppercase tracking-wider ${
                      isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-xs"
                    }`}>
                      🚩 START: {activeRoadmap.role}
                    </div>
                  </div>

                  {/* Individual Diagrammatic Nodes with Left branching tracks */}
                  {activeRoadmap.pillars.map((node, index) => {
                    const nodeTitle = typeof node === "string" ? node : node.title;
                    const nodeDesc = typeof node === "string" ? "" : node.description;
                    const nodeDays = typeof node === "string" ? null : node.estimated_days;
                    const isChecked = activeRoadmap.checked.includes(nodeTitle);
                    const isLast = index === activeRoadmap.pillars.length - 1;
                    
                    return (
                      <motion.div
                        key={nodeTitle}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative group flex items-start gap-4"
                      >
                        {/* Horizontal branch line joining node to the spinal trunk */}
                        <div className={`absolute top-5 -left-5 sm:-left-7 w-5 sm:w-7 h-0.5 transition-all duration-300 ${
                          isChecked 
                            ? "bg-teal-500/60" 
                            : isDarkMode ? "bg-slate-850" : "bg-slate-200"
                        }`} />

                        {/* Anchor checkpoint indicator */}
                        <div 
                          onClick={() => toggleNode(nodeTitle)}
                          className={`absolute top-3 -left-7 sm:-left-9 w-4 h-4 rounded-full border-2 cursor-pointer z-10 transition-all flex items-center justify-center ${
                            isChecked
                              ? "bg-teal-500 border-teal-400 scale-110 shadow-md shadow-teal-500/30"
                              : isDarkMode 
                                ? "bg-slate-950 border-slate-800 group-hover:border-teal-500 group-hover:scale-105"
                                : "bg-white border-slate-300 group-hover:border-teal-500 group-hover:scale-105 shadow-xs"
                          }`}
                        >
                          {isChecked ? (
                            <Check className="w-2 h-2 text-slate-950 stroke-[3]" />
                          ) : (
                            <div className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-teal-400 transition-colors" />
                          )}
                        </div>

                        {/* High-Fidelity Diagrammatic Node Content Card */}
                        <div
                          onClick={() => toggleNode(nodeTitle)}
                          className={`flex-1 p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-md relative overflow-hidden ${
                            isChecked
                              ? isDarkMode
                                ? "bg-gradient-to-r from-teal-950/20 to-emerald-950/10 border-teal-500/30 text-emerald-100"
                                : "bg-gradient-to-r from-emerald-50/70 to-teal-50/20 border-emerald-300 text-slate-800"
                              : isDarkMode
                                ? "bg-slate-900/30 border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-white"
                                : "bg-white border-slate-200 hover:border-teal-300 text-slate-700 hover:text-slate-900 shadow-xs"
                          }`}
                        >
                          {/* Checked ambient highlight layout */}
                          {isChecked && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/3 rounded-full blur-2xl pointer-events-none" />
                          )}

                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                              <div className="flex items-center gap-3">
                                {/* Step indicator */}
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                  isChecked
                                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                                    : "bg-slate-100 dark:bg-slate-950 text-slate-400 border dark:border-slate-850"
                                }`}>
                                  Pillar {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Node Label Text */}
                                <h4 className="text-xs sm:text-sm font-semibold transition-colors duration-200">
                                  {nodeTitle}
                                </h4>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {/* Estimated Days Badge */}
                                {nodeDays !== null && (
                                  <span className="text-[10px] font-mono bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/10 font-bold">
                                    ⏱️ {nodeDays} Days
                                  </span>
                                )}

                                {/* Chevron / checkbox feedback */}
                                <div className={`text-[10px] font-bold uppercase transition-all ${
                                  isChecked 
                                    ? "text-teal-500" 
                                    : "text-slate-400 group-hover:text-teal-400"
                                }`}>
                                  {isChecked ? "Standard Verified" : "Mark Covered"}
                                </div>
                              </div>
                            </div>

                            {/* Node Description Text */}
                            {nodeDesc && (
                              <p className={`text-xs leading-relaxed mt-1 ${
                                isChecked 
                                  ? isDarkMode ? "text-emerald-300/70" : "text-emerald-800/70"
                                  : isDarkMode ? "text-slate-400" : "text-slate-500"
                              }`}>
                                {nodeDesc}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* End node indicator of connection tree diagram */}
                  <div className="relative -ml-8 sm:-ml-12 pt-2 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center shrink-0">
                      <Trophy className="w-3 h-3 text-indigo-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Graduation Node Reached</span>
                  </div>
                </div>
              ) : (
                /* Node bento grid of milestones */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeRoadmap.pillars.map((node, index) => {
                    const nodeTitle = typeof node === "string" ? node : node.title;
                    const nodeDesc = typeof node === "string" ? "" : node.description;
                    const nodeDays = typeof node === "string" ? null : node.estimated_days;
                    const isChecked = activeRoadmap.checked.includes(nodeTitle);
                    
                    return (
                      <motion.div
                        key={nodeTitle}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => toggleNode(nodeTitle)}
                        className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between gap-3 group relative overflow-hidden transition-all duration-300 ${
                          isChecked
                            ? isDarkMode
                              ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-100"
                              : "bg-emerald-50/80 border-emerald-400/50 text-slate-800"
                            : isDarkMode
                              ? "bg-slate-900/30 border-slate-800 hover:border-teal-500/50 text-slate-300 hover:text-white"
                              : "bg-slate-50 border-slate-100 hover:border-teal-300 text-slate-700 hover:text-slate-900 shadow-xs"
                        }`}
                      >
                        {/* Upper row: ID, Title, Checkbox */}
                        <div className="flex items-start justify-between gap-3 w-full">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                              isChecked
                                ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-400"
                                : isDarkMode 
                                  ? "bg-slate-950 border-slate-800 text-slate-500"
                                  : "bg-white border-slate-200 text-slate-400"
                            }`}>
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <span className="text-xs font-semibold leading-snug">{nodeTitle}</span>
                          </div>

                          {/* Right Indicator checkbox */}
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                            isChecked 
                              ? "bg-emerald-500 text-white" 
                              : isDarkMode
                                ? "border border-slate-800 group-hover:border-teal-500/50 hover:bg-slate-800/10"
                                : "border border-slate-200 group-hover:border-teal-300 bg-white"
                          }`}>
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-teal-500/40 transition-colors" />
                            )}
                          </div>
                        </div>

                        {/* Middle: Description */}
                        {nodeDesc && (
                          <p className={`text-xs leading-relaxed mt-1 ${
                            isChecked 
                              ? isDarkMode ? "text-emerald-300/60" : "text-emerald-800/60"
                              : isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}>
                            {nodeDesc}
                          </p>
                        )}

                        {/* Lower: Days estimate */}
                        {nodeDays !== null && (
                          <div className="flex justify-end w-full mt-1">
                            <span className="text-[9px] font-mono bg-teal-500/5 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/10 font-bold">
                              ⏱️ {nodeDays} Days
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

        </div>
      )}

      {/* 4. Display of saved roadmaps histories */}
      {Object.keys(savedRoadmaps).length > 1 && (
        <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
          <h4 className={`text-xs font-extrabold font-mono uppercase tracking-widest mb-3 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>Your Generated Roadmap Vault</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(savedRoadmaps).map((roleKey) => {
              const isSelected = activeRoadmap?.role === roleKey;
              const roadmap = savedRoadmaps[roleKey];
              const pct = roadmap.pillars.length ? Math.round((roadmap.checked.length / roadmap.pillars.length) * 100) : 0;
              return (
                <div
                  key={roleKey}
                  onClick={() => setActiveRoadmap({
                    role: roleKey,
                    pillars: roadmap.pillars,
                    ascii: roadmap.ascii,
                    checked: roadmap.checked || []
                  })}
                  className={`p-3 rounded-2xl border cursor-pointer text-left transition-all ${
                    isSelected
                      ? "bg-teal-500/10 border-teal-500 text-teal-400"
                      : isDarkMode
                        ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <p className="text-xs font-bold truncate">{roleKey}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[9px] opacity-75 font-mono">{roadmap.pillars.length} pillars</span>
                    <span className="text-[9px] font-bold font-mono">{pct}% complete</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "mentor" && (
        <div className="space-y-8">
          {/* Header Selector Card */}
          <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-teal-500 mb-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-xs uppercase tracking-wider font-extrabold font-mono">15+ LPA Beginner Structural Node Tree Layout</span>
              </div>
              <h1 className={`text-2xl font-bold tracking-tight mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Beginner Path Structural Node Tree
              </h1>
              <p className={`text-xs mb-6 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Generate clean, minimalist parent-child structural tree nodes for students aiming for top tier 15+ LPA placement packages. Displays raw, high-value technical headings without verbose, spoon-fed explanations.
              </p>

              {/* Preset selectors */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Select a Professional Path to Output</p>
                <div className="flex flex-wrap gap-2">
                  {PREMIUM_FIELDS.map((field) => {
                    const isSelected = activePremiumPath?.root_node.label.toLowerCase().includes(field.id.toLowerCase());
                    const Icon = field.icon;
                    return (
                      <button
                        key={field.id}
                        onClick={() => {
                          setPremiumField(field.id);
                          handleGeneratePremiumPath(field.id);
                        }}
                        disabled={premiumLoading}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-teal-500/10 border-teal-500 text-teal-400"
                            : isDarkMode
                              ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                              : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{field.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {premiumLoading && (
            <div className={`p-12 rounded-3xl border flex flex-col items-center justify-center gap-4 text-center ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}>
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-teal-500/10 border-t-teal-400 animate-spin" />
                <Sparkles className="w-6 h-6 text-teal-400 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className={`font-bold text-sm ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>Querying Structural Tree Layout...</h4>
                <p className="text-xs text-slate-500">Mapping flawless parent-child associations with technical labels.</p>
              </div>
            </div>
          )}

          {!premiumLoading && activePremiumPath && (
            <div className="space-y-4">
              {/* Toolbar without copy / raw json buttons */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/10">15+ LPA Beginner Path</span>
                    <span className="text-xs font-mono text-slate-500">{activePremiumPath.nodes.length} Nodes</span>
                  </div>
                  <h3 className={`text-lg font-extrabold mt-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {activePremiumPath.root_node.label}
                  </h3>
                </div>
              </div>
              {/* Dynamic Interactive Visual Tree Mapping Panel */}
              <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <div className="max-w-4xl mx-auto space-y-12 relative py-4">
                    
                    {/* Visual Spinal Center Line */}
                    <div className={`absolute top-10 bottom-10 left-1/2 transform -translate-x-1/2 w-0.5 border-r border-dashed ${isDarkMode ? "border-slate-800" : "border-slate-200"}`} />

                    {/* Root Node Display at absolute Tier 0 */}
                    <div className="flex flex-col items-center justify-center relative z-10">
                      <div className={`px-6 py-3 rounded-full border-2 border-teal-500 flex items-center gap-3 shadow-lg ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                        <span className="text-sm font-black uppercase tracking-wider text-teal-400 font-mono">{activePremiumPath.root_node.label}</span>
                      </div>
                      <div className={`h-8 w-0.5 bg-gradient-to-b from-teal-500 to-teal-500/20`} />
                    </div>

                    {/* Depth Levels */}
                    {(() => {
                      const buildTreeLevels = (rootId: string, nodes: Array<{ id: string; label: string; parent_id: string }>) => {
                        const levels: Record<number, Array<{ id: string; label: string; parent_id: string }>> = {};
                        const childrenMap: Record<string, string[]> = {};
                        nodes.forEach(n => {
                          if (!childrenMap[n.parent_id]) childrenMap[n.parent_id] = [];
                          childrenMap[n.parent_id].push(n.id);
                        });

                        const nodeMap = new globalThis.Map(nodes.map(n => [n.id, n]));
                        const queue: Array<{ id: string; depth: number }> = [];
                        (childrenMap[rootId] || []).forEach(childId => {
                          queue.push({ id: childId, depth: 1 });
                        });

                        while (queue.length > 0) {
                          const { id, depth } = queue.shift()!;
                          const node = nodeMap.get(id);
                          if (node) {
                            if (!levels[depth]) levels[depth] = [];
                            levels[depth].push(node);
                            (childrenMap[id] || []).forEach(childId => {
                              queue.push({ id: childId, depth: depth + 1 });
                            });
                          }
                        }
                        return levels;
                      };

                      const getLevelsOrNodes = (rootNode: { id: string; label: string }, nodes: Array<{ id: string; label: string; parent_id: string }>) => {
                        const levels = buildTreeLevels(rootNode.id, nodes);
                        const mappedIds = new Set<string>();
                        Object.values(levels).forEach(lvlNodes => {
                          lvlNodes.forEach(n => mappedIds.add(n.id));
                        });

                        const orphaned = nodes.filter(n => !mappedIds.has(n.id));
                        if (orphaned.length > 0) {
                          if (!levels[1]) levels[1] = [];
                          orphaned.forEach(n => {
                            levels[1].push(n);
                          });
                        }
                        return levels;
                      };

                      const levels = getLevelsOrNodes(activePremiumPath.root_node, activePremiumPath.nodes);
                      const maxDepth = Math.max(...Object.keys(levels).map(Number), 1);
                      const levelNames: Record<number, string> = {
                        1: "Level 1: Language Basics & Foundations",
                        2: "Level 2: Essential Structures & Patterns",
                        3: "Level 3: Core Operating & Storage Systems",
                        4: "Level 4: Architecture, OOP, & Clean Code",
                        5: "Level 5: Depth Capstone Tool Project"
                      };

                      return Array.from({ length: maxDepth }).map((_, i) => {
                        const depth = i + 1;
                        const levelNodes = levels[depth] || [];
                        if (levelNodes.length === 0) return null;

                        return (
                          <div key={depth} className="space-y-4 relative z-10">
                            {/* Level Heading Badge */}
                            <div className="flex justify-center">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider font-mono border ${
                                isDarkMode 
                                  ? "bg-slate-900 border-slate-800 text-teal-300 shadow-md" 
                                  : "bg-slate-100 border-slate-200 text-slate-700 shadow-xs"
                              }`}>
                                {levelNames[depth] || `Level ${depth}: Technical Concepts`}
                              </span>
                            </div>

                            {/* Node list items at this depth */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {levelNodes.map((node) => (
                                <motion.div
                                  key={node.id}
                                  whileHover={{ y: -3, scale: 1.01 }}
                                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                                    isDarkMode
                                      ? "bg-slate-950 border-slate-800 text-slate-200 hover:border-teal-500/50 hover:bg-slate-900/60"
                                      : "bg-white border-slate-200 text-slate-800 shadow-xs hover:border-teal-400 hover:shadow-md"
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-teal-400 font-mono mb-2 uppercase tracking-wide">
                                      <GitFork className="w-3 h-3 text-teal-400 shrink-0" />
                                      <span>Node ID: {node.id}</span>
                                    </div>
                                    <h4 className="text-xs font-extrabold font-mono tracking-tight uppercase leading-relaxed text-balance">
                                      {node.label}
                                    </h4>
                                  </div>

                                  <div className={`mt-3 pt-2 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center text-[8px] font-bold font-mono text-slate-500`}>
                                    <span>PARENT: {node.parent_id}</span>
                                    <span className="text-teal-400/80">15+ LPA Target</span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* Visual link down to next tier if not the last tier */}
                            {depth < maxDepth && (
                              <div className="flex justify-center pt-2">
                                <ArrowDown className="w-4 h-4 text-teal-500/50 animate-pulse" />
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
            </div>
          )}

          {/* Premium Saved Vault */}
          {Object.keys(savedPremiumPaths).length > 1 && (
            <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-slate-950/60 border-slate-800" : "bg-white border-slate-200 shadow-md"}`}>
              <h4 className={`text-xs font-extrabold font-mono uppercase tracking-widest mb-3 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>Your Premium Path Vault</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.keys(savedPremiumPaths).map((fieldKey) => {
                  const isSelected = activePremiumPath?.root_node.label.toLowerCase().includes(fieldKey.toLowerCase());
                  return (
                    <div
                      key={fieldKey}
                      onClick={() => setActivePremiumPath(savedPremiumPaths[fieldKey])}
                      className={`p-3 rounded-2xl border cursor-pointer text-left transition-all ${
                        isSelected
                          ? "bg-teal-500/10 border-teal-500 text-teal-400"
                          : isDarkMode
                            ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300 hover:shadow-xs"
                      }`}
                    >
                      <p className="text-xs font-bold truncate">{fieldKey}</p>
                      <span className="text-[9px] opacity-75 font-mono">{savedPremiumPaths[fieldKey].nodes.length} nodes</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
