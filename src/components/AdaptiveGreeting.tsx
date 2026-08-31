import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface AdaptiveGreetingProps {
  userName: string;
}

export default function AdaptiveGreeting({ userName }: AdaptiveGreetingProps) {
  const [greeting, setGreeting] = useState("Good Day");
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const updateGreeting = () => {
      const hr = new Date().getHours();
      if (hr < 12) {
        setGreeting("Good Morning");
      } else if (hr < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();
    // Update every minute to keep it highly localized and adaptive
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const isActive = isHovered || isFocused;

  // Split greeting words and username into characters for stagger animation
  const greetingWords = greeting.split(" ");
  const nameWords = (userName || "Developer").split(" ");

  // Cubic-bezier ease and duration from specifications
  const transitionSpec: any = {
    ease: [0.25, 1, 0.5, 1], // cubic-bezier(0.25, 1, 0.5, 1)
    duration: 0.6, // 600ms
  };

  return (
    <div
      id="adaptive-greeting-container"
      className="flex flex-col items-center justify-center space-y-2 select-none group focus:outline-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      {/* 1. Kinetic Greeting Word Reveal Block */}
      <h2 
        id="greeting-text-heading"
        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center flex flex-wrap justify-center gap-x-3 gap-y-1"
      >
        <span className="flex gap-1 overflow-hidden" data-animation-hook="kinetic-shift-reveal">
          {greetingWords.map((word, wIdx) => (
            <span key={`w-${wIdx}`} className="flex">
              {word.split("").map((char, cIdx) => (
                <motion.span
                  key={`c-${wIdx}-${cIdx}`}
                  initial={{ 
                    y: 35, 
                    opacity: 0,
                    fontWeight: 300, 
                    color: "#94a3b8" // slate-400
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    fontWeight: isActive ? 900 : 700,
                    color: isActive 
                      ? "#2dd4bf" // teal-400
                      : "#f8fafc"  // slate-50
                  }}
                  transition={{
                    ...transitionSpec,
                    delay: (wIdx * 5 + cIdx) * 0.03,
                  }}
                  className="inline-block origin-bottom transform-gpu"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>

        {/* separator comma with dynamic kinetic shift */}
        <motion.span
          animate={{
            color: isActive ? "#38bdf8" : "#64748b",
            scale: isActive ? 1.2 : 1
          }}
          transition={transitionSpec}
          className="text-slate-500 font-extrabold mr-1"
        >
          ,
        </motion.span>

        {/* 2. Personalized Interactive Name Sequence */}
        <span className="flex gap-1 overflow-hidden">
          {nameWords.map((word, wIdx) => (
            <span key={`nw-${wIdx}`} className="flex">
              {word.split("").map((char, cIdx) => (
                <motion.span
                  key={`nc-${wIdx}-${cIdx}`}
                  initial={{ 
                    y: -35, 
                    opacity: 0,
                    fontWeight: 300, 
                    color: "#94a3b8" 
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    fontWeight: isActive ? 900 : 800,
                    color: isActive 
                      ? "#fbbf24" // amber-400
                      : "#38bdf8"  // sky-400
                  }}
                  transition={{
                    ...transitionSpec,
                    delay: 0.15 + (wIdx * 5 + cIdx) * 0.03,
                  }}
                  className="inline-block origin-top transform-gpu"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      </h2>

      {/* Subtle interaction micro-hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.8 : 0.3 }}
        transition={transitionSpec}
        className="text-[10px] font-mono uppercase tracking-widest text-slate-500"
      >
        {isActive ? "✦ Kinetic Focus Active ✦" : "Hover or click to shift focus"}
      </motion.p>
    </div>
  );
}
