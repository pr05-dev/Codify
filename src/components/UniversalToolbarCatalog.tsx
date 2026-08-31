import { useState, useEffect } from "react";
import { Layers, ChevronDown, Sparkles, X, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MASTER_CATALOG, DataStructureCatalog, Question } from "../data/masterCatalogData";
import { dsaSheetsData } from "../data/dsaSheets";

// Helper to enrich lightweight question objects with descriptions/solutions if needed
const enrichQuestion = (q: Question) => {
  if (q.description && q.solutions) return q;

  // Search across dsaSheetsData for additional details
  for (const sheet of dsaSheetsData) {
    if (sheet.questions) {
      const match = sheet.questions.find(
        (item: any) =>
          item.id === q.id ||
          item.title.toLowerCase().includes(q.title.toLowerCase()) ||
          q.title.toLowerCase().includes(item.title.toLowerCase())
      );
      if (match) {
        return {
          ...match,
          ...q,
          description: q.description || match.description,
          solutions: match.solutions,
          constraints: q.constraints || match.constraints,
          examples: q.examples || match.examples,
        };
      }
    }
  }

  // Fallback default details
  return {
    ...q,
    pattern:
      q.level === "Easy"
        ? "Basic Iteration & Pointers"
        : q.level === "Medium"
        ? "Two Pointers & Sliding Window"
        : "Advanced Algorithmic Pattern",
    description:
      q.description ||
      `Given the input data structure, solve the ${q.title} problem with optimal time and space complexity.`,
    examples: q.examples || [
      { input: "Sample Input", output: "Sample Output", explanation: `Example run for ${q.title}` },
    ],
    constraints: q.constraints || ["1 <= N <= 10^5", "Standard bounds apply"],
    solutions: {
      javascript: `// Optimal solution for ${q.title}\nfunction solve(data) {\n  // Implementation here\n  return true;\n}`,
      python: `# Optimal solution for ${q.title}\ndef solve(data):\n    # Implementation here\n    return True`,
      java: `// Optimal solution for ${q.title}\nclass Solution {\n    public boolean solve(int[] nums) {\n        return true;\n    }\n}`,
      cpp: `// Optimal solution for ${q.title}\nclass Solution {\npublic:\n    bool solve(vector<int>& nums) {\n        return true;\n    }\n};`,
    },
  };
};

export default function UniversalToolbarCatalog({ onSelectQuestion, completedIds = [] }: any) {
  const [selectedDsKey, setSelectedDsKey] = useState<string>("arrays");
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const currentCatalog: DataStructureCatalog =
    MASTER_CATALOG[selectedDsKey] || MASTER_CATALOG.arrays;

  const [activeSubTopic, setActiveSubTopic] = useState<any>(
    currentCatalog?.subTopics?.[0] || null
  );
  const [activeDifficulty, setActiveDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");

  // Sync subtopic automatically when selectedDsKey changes
  useEffect(() => {
    const targetCatalog = MASTER_CATALOG[selectedDsKey] || MASTER_CATALOG.arrays;
    if (targetCatalog?.subTopics?.length > 0) {
      setActiveSubTopic(targetCatalog.subTopics[0]);
    }
  }, [selectedDsKey]);

  const currentQuestions = activeSubTopic?.questions?.[activeDifficulty] || [];

  const handleSwitchCategory = (dsKey: string) => {
    setSelectedDsKey(dsKey);
    setIsCatalogOpen(true);
  };

  return (
    <div className="w-full space-y-6">
      {/* ================= 1. UNIVERSAL TOOLBAR ================= */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg gap-3">
        {/* Left: DS Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full scrollbar-thin">
          {Object.keys(MASTER_CATALOG).map((key) => {
            const cat = MASTER_CATALOG[key];
            const isActive = selectedDsKey === key;

            return (
              <button
                key={key}
                onClick={() => handleSwitchCategory(key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="capitalize">
                  {key === "oops"
                    ? "OOP & LLD"
                    : key === "csfundamentals"
                    ? "CS Fundamentals"
                    : cat?.title?.replace(/\s*Catalog.*$/i, "") || key}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            );
          })}
        </div>

        {/* Right: Active Difficulty Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(["Easy", "Medium", "Hard"] as const).map((level) => {
            const count = activeSubTopic?.questions?.[level]?.length || 0;
            const isSelected = activeDifficulty === level;

            return (
              <button
                key={level}
                onClick={() => setActiveDifficulty(level)}
                className={`px-3 py-1.5 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {level} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE SUB-TOPIC BAR */}
      {activeSubTopic && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Active Module:</span>
            <span className="text-indigo-400 font-bold">{activeSubTopic.subTopicTitle}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCatalogOpen(true)}
            className="h-7 text-[11px] text-indigo-400 hover:text-indigo-300 p-0 cursor-pointer"
          >
            Change Module →
          </Button>
        </div>
      )}

      {/* ================= 2. ACTIVE QUESTION LIST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentQuestions.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-950 rounded-2xl border border-dashed border-slate-800 col-span-2 text-xs">
            No {activeDifficulty} questions in this module yet.
          </div>
        ) : (
          currentQuestions.map((q: any) => {
            const isSolved = completedIds.includes(q.id);

            return (
              <div
                key={q.id}
                onClick={() => {
                  const enriched = enrichQuestion(q);
                  if (onSelectQuestion) onSelectQuestion(enriched);
                }}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {isSolved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {q.title}
                    </h4>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="text-[10px] border-slate-800 text-slate-400 group-hover:border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                >
                  Solve →
                </Badge>
              </div>
            );
          })
        )}
      </div>

      {/* ================= 3. CATALOG MODAL POPUP ================= */}
      {isCatalogOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white capitalize">
                    {currentCatalog?.title || "Catalog"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Select a sub-topic module to load into your workspace
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCatalogOpen(false)}
                className="rounded-full hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              {currentCatalog?.subTopics?.map((sub: any) => {
                const totalQuestions =
                  (sub.questions?.Easy?.length || 0) +
                  (sub.questions?.Medium?.length || 0) +
                  (sub.questions?.Hard?.length || 0);

                const isCurrent = activeSubTopic?.subTopicId === sub.subTopicId;

                return (
                  <div
                    key={sub.subTopicId}
                    onClick={() => {
                      setActiveSubTopic(sub);
                      setIsCatalogOpen(false);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                      isCurrent
                        ? "bg-indigo-600/10 border-indigo-500/50 shadow-lg shadow-indigo-500/5"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                          {sub.subTopicTitle}
                        </h4>
                        {isCurrent && (
                          <Badge className="bg-indigo-600 text-white text-[9px]">Active</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                        {sub.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                        {totalQuestions} Questions
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

