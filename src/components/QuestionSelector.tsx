import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function QuestionSelector({ topicData, onSelectQuestion }: any) {
  // Active difficulty state: Defaults to "Easy"
  const [activeDifficulty, setActiveDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");

  // Get array of questions for the selected difficulty (supporting both array & object formats)
  const getQuestionsForLevel = (level: "Easy" | "Medium" | "Hard") => {
    if (!topicData?.questions) return [];
    if (Array.isArray(topicData.questions)) {
      return topicData.questions.filter((q: any) => q.level === level);
    }
    return topicData.questions[level] || [];
  };

  const currentQuestions = getQuestionsForLevel(activeDifficulty);

  return (
    <div className="space-y-6">
      {/* 1. Difficulty Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800 w-fit">
        {(["Easy", "Medium", "Hard"] as const).map((level) => {
          const count = getQuestionsForLevel(level).length;
          const isActive = activeDifficulty === level;

          return (
            <button
              key={level}
              onClick={() => setActiveDifficulty(level)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {level} ({count})
            </button>
          );
        })}
      </div>

      {/* 2. Questions List for Clicked Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestions.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800 col-span-2">
            No {activeDifficulty} questions available for this topic yet.
          </div>
        ) : (
          currentQuestions.map((q: any) => (
            <Card
              key={q.id || q.title}
              onClick={() => onSelectQuestion(q)}
              className="p-5 bg-slate-950 border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge
                  className={`text-[10px] font-extrabold ${
                    q.level === "Easy"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : q.level === "Medium"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  {q.level}
                </Badge>
              </div>

              <CardTitle className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                {q.title}
              </CardTitle>

              {q.description && (
                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {q.description}
                </p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
