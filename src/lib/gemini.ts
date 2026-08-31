import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Simple in-memory cache to reduce API calls
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

const handleGeminiError = (error: any) => {
  console.error("Gemini Error Details:", error);
  
  // Handle the specific error structure reported by the user
  const errorObj = error?.error || error;
  const message = errorObj?.message || String(error);
  const status = errorObj?.status || "";
  
  if (
    message.toLowerCase().includes("quota") || 
    message.includes("429") || 
    status === "RESOURCE_EXHAUSTED"
  ) {
    return "I've reached my daily limit for AI responses. Please try again in a bit! In the meantime, you can keep practicing with the existing challenges.";
  }
  
  return "I'm having a little trouble connecting right now. Please try again in a moment.";
};

export const analyzeCode = async (code: string, language: string) => {
  const prompt = `
    You are an expert programming mentor for beginners. 
    Analyze the following ${language} code and provide a detailed analysis in JSON format.
    
    IMPORTANT: Be extremely concise. Focus on logic, syntax errors, and conceptual misunderstandings.
    
    Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    JSON structure:
    {
      "mistakes": [{"line": number, "description": "short desc", "fix": "short fix"}],
      "confusingParts": [{"block": "snippet", "explanation": "short explanation"}],
      "concepts": [{"title": "Name", "description": "short desc", "example": "short example"}],
      "overallFeedback": "short encouraging summary"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { 
      mistakes: [], 
      confusingParts: [], 
      concepts: [], 
      overallFeedback: handleGeminiError(error) 
    };
  }
};

export const clearDoubt = async (code: string, selectedSnippet: string, doubt: string, language: string) => {
  const prompt = `
    Friendly virtual mentor. Student has a doubt about ${language} code.
    
    INSTRUCTIONS:
    - EXTREMELY simple language.
    - Analogies (like boxes for variables).
    - Very short and precise.
    
    Full Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Selected Snippet:
    \`\`\`${language}
    ${selectedSnippet}
    \`\`\`
    
    User's Doubt: "${doubt}"
    
    Markdown response.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Doubt Error:", error);
    return handleGeminiError(error);
  }
};

export const getRecommendation = async (points: { bPoints: number, cPoints: number }, completedTopics: string[]) => {
  const cacheKey = `rec-${points.bPoints}-${points.cPoints}-${completedTopics.join(",")}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const hasProgress = points.bPoints > 0 || points.cPoints > 0 || completedTopics.length > 0;
  
  const prompt = hasProgress ? `
    AI Career Coach. Profile: B Points: ${points.bPoints}, C Points: ${points.cPoints}, Completed: ${completedTopics.join(", ") || "None"}.
    Suggest NEXT MOVE. Short, precise, Markdown.
  ` : `
    AI Career Coach. User starting out. Suggest first Algorithm/DS to learn. Short, precise, Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const result = response.text;
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return handleGeminiError(error);
  }
};

export const verifySolution = async (question: string, code: string, language: string) => {
  const prompt = `
    Expert programming judge. Verify ${language} code for:
    Question: ${question}
    
    Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    INSTRUCTIONS:
    - Be LENIENT. Focus on LOGIC.
    - Short feedback. 1-2 improvements.
    - Identify the core algorithmic or design pattern used in this problem (e.g., Two Pointers, Sliding Window, Backtracking, Divide and Conquer, Greedy, Hash Map, etc.).
    - Provide a concise explanation of how this problem/code uses that pattern.
    - Provide an explanation of why this pattern is used or preferred here (e.g., optimizes time complexity to O(N), avoids nested loops, etc.).
    - Suggest exactly two practice questions with the SAME pattern.
    
    JSON format:
    {
      "isCorrect": boolean,
      "feedback": "short feedback",
      "suggestions": ["s1", "s2"],
      "patternAnalysis": {
        "patternName": "Name of the pattern",
        "howUsed": "Concise paragraph explaining how the pattern is applied in this solution.",
        "whyUsed": "Concise paragraph explaining why we used this pattern here instead of other approaches.",
        "suggestedQuestions": [
          {
            "title": "Question Title 1",
            "level": "Easy",
            "description": "Short description of the similar question."
          },
          {
            "title": "Question Title 2",
            "level": "Medium",
            "description": "Short description of the similar question."
          }
        ]
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            patternAnalysis: {
              type: Type.OBJECT,
              properties: {
                patternName: { type: Type.STRING },
                howUsed: { type: Type.STRING },
                whyUsed: { type: Type.STRING },
                suggestedQuestions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      level: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ["title", "level", "description"]
                  }
                }
              },
              required: ["patternName", "howUsed", "whyUsed", "suggestedQuestions"]
            }
          },
          required: ["isCorrect", "feedback", "suggestions"]
        }
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Verification Error:", error);
    return { isCorrect: false, feedback: "Error verifying solution.", suggestions: [] };
  }
};

export const chatWithExpert = async (
  messages: Array<{ role: 'user' | 'ai', content: string }>, 
  language: string,
  profile: { points: { bPoints: number, cPoints: number }, completedTopics: string[] }
) => {
  const context = messages.map(m => `${m.role === 'user' ? 'Student' : 'Mentor'}: ${m.content}`).join("\n");
  
  const prompt = `
    Expert programming mentor. Student learning ${language || "programming"}.
    Profile: B:${profile.points.bPoints}, C:${profile.points.cPoints}, Completed:${profile.completedTopics.join(", ") || "None"}.
    
    History:
    ${context}
    
    INSTRUCTIONS:
    - Conversational, precise, Markdown.
    - If start, suggest path.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return handleGeminiError(error);
  }
};

export const generateRoadmap = async (role: string) => {
  const prompt = `
    You are the core engineering brain of Codify, an adaptive learning platform for software development.
    Your task is to generate a highly customized, role-specific learning roadmap based on the user's requested role. 

    The user has requested a roadmap for the role: ${role} (e.g., SDE, Frontend Engineer, Fullstack Developer).

    You must return a raw JSON object containing exactly 6 distinct, sequential "pillars" (modules) tailored strictly to that specific role. Do not use generic placeholders. 

    Strict JSON Schema to follow:
    {
      "role": "[Requested Role]",
      "pillars": [
        {
          "id": 1,
          "title": "Specific Pillar Title (e.g., 'Asynchronous JavaScript & DOM' for Frontend, or 'System Design Foundations' for SDE)",
          "description": "Brief description of what foundational mindset or patterns this pillar clears up.",
          "estimated_days": 7
        },
        ... (repeat for exactly 6 pillars)
      ]
    }

    Ensure the output is valid JSON, contains no markdown wrapping, and that the 6 pillars are completely unique and technically accurate for the specific role requested.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: {
              type: Type.STRING,
              description: "The requested career or software role.",
            },
            pillars: {
              type: Type.ARRAY,
              description: "The 6 distinct, sequential learning pillars tailored to the role.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: {
                    type: Type.INTEGER,
                    description: "Pillar index from 1 to 6.",
                  },
                  title: {
                    type: Type.STRING,
                    description: "Specific technical or concept pillar title.",
                  },
                  description: {
                    type: Type.STRING,
                    description: "Brief description of what foundational mindset or patterns this pillar clears up.",
                  },
                  estimated_days: {
                    type: Type.INTEGER,
                    description: "Estimated days to finish learning this pillar.",
                  },
                },
                required: ["id", "title", "description", "estimated_days"],
              },
            },
          },
          required: ["role", "pillars"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Roadmap Error:", error);
    // Safe fallback matching the exact requested 6-pillar JSON structure
    return {
      role: role,
      pillars: [
        { 
          id: 1, 
          title: "Programming Fundamentals", 
          description: "Establish basic control flow, functions, memory types, and language syntax.", 
          estimated_days: 7 
        },
        { 
          id: 2, 
          title: "Data Structures & Algorithms", 
          description: "Solve algorithmic problems using arrays, hashes, trees, and searching/sorting algorithms.", 
          estimated_days: 10 
        },
        { 
          id: 3, 
          title: "Object-Oriented Design", 
          description: "Implement design patterns, inheritance, polymorphism, encapsulation, and modular classes.", 
          estimated_days: 7 
        },
        { 
          id: 4, 
          title: "Database Management Systems", 
          description: "Understand SQL queries, schemas, indexing, and data normalization models.", 
          estimated_days: 8 
        },
        { 
          id: 5, 
          title: "Operating Systems & Networks", 
          description: "Master processes, threading, memory virtualization, TCP/IP, and HTTP protocols.", 
          estimated_days: 7 
        },
        { 
          id: 6, 
          title: "Core Projects & Version Control", 
          description: "Package full projects using Git, GitHub, continuous delivery, and deployment tools.", 
          estimated_days: 9 
        }
      ]
    };
  }
};

export const generateStreamMentor = async (stream: string) => {
  const prompt = `
    You are the career mentor inside Codify, an interactive learning platform for absolute beginners. Your goal is to break down a tech career stream for someone who has zero coding experience, making it completely clear, encouraging, and highly visual.

    The user has selected the following stream: ${stream} (e.g., SDE Core, Frontend, Fullstack).

    Generate a response structured strictly as a JSON object to feed a node-based Tree Diagram (n8n-style flow with arrows). The language must be simple, relatable, and focus on fresher-level expectations and projects.

    Follow this exact JSON structure:
    {
      "stream_title": "Role Name",
      "fresher_expectation": "A simple, encouraging explanation of what a fresher actually does in this role, written for a beginner.",
      "nodes": [
        {
          "id": "node-1",
          "type": "start",
          "title": "Step 1: The absolute basics",
          "details": "What simple building blocks they learn here (e.g., Variables, Loops).",
          "connects_to": "node-2"
        },
        {
          "id": "node-2",
          "type": "intermediate",
          "title": "Step 2: The Core Patterns",
          "details": "How to start thinking like a programmer here.",
          "connects_to": "node-3"
        },
        {
          "id": "node-3",
          "type": "project",
          "title": "Final Step: Capstone Projects",
          "details": "2 specific, short-but-deep project ideas a fresher should build for their resume to crack this stream.",
          "connects_to": null
        }
      ]
    }

    Ensure the steps form a clear, sequential chain (Node 1 links to Node 2, Node 2 links to Node 3) so the frontend can automatically render arrow icons connecting them in an n8n-style tree manner. Do not include any markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stream_title: {
              type: Type.STRING,
              description: "The name of the tech stream or role.",
            },
            fresher_expectation: {
              type: Type.STRING,
              description: "A simple, encouraging explanation of what a fresher actually does in this role, written for a beginner.",
            },
            nodes: {
              type: Type.ARRAY,
              description: "The 3 sequential steps from basics to core to capstone projects.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: {
                    type: Type.STRING,
                    description: "Unique ID of the node (node-1, node-2, node-3).",
                  },
                  type: {
                    type: Type.STRING,
                    description: "Type of the node (start, intermediate, project).",
                  },
                  title: {
                    type: Type.STRING,
                    description: "Short title of the step.",
                  },
                  details: {
                    type: Type.STRING,
                    description: "Detailed description of the learning goals or projects for this step.",
                  },
                  connects_to: {
                    type: Type.STRING,
                    nullable: true,
                    description: "The ID of the next node (or null if it is the last node).",
                  },
                },
                required: ["id", "type", "title", "details"],
              },
            },
          },
          required: ["stream_title", "fresher_expectation", "nodes"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Stream Mentor Error:", error);
    // Safe fallback matching the exact requested JSON structure
    return {
      stream_title: stream,
      fresher_expectation: `As a fresher in ${stream}, your primary focus is learning how to decompose large problems into simple, step-by-step instructions. You will spend your time writing code, testing functionality, and collaborating with your team to solve puzzles!`,
      nodes: [
        {
          id: "node-1",
          type: "start",
          title: "Step 1: The absolute basics",
          details: "Master fundamental concepts like variables, simple data types (numbers, text), conditional logic (if/else), and loops to automate repetitive tasks.",
          connects_to: "node-2"
        },
        {
          id: "node-2",
          type: "intermediate",
          title: "Step 2: The Core Patterns",
          details: "Learn how to structure code with functions, work with arrays and dictionaries/maps, and understand basic software architecture for clean and reusable systems.",
          connects_to: "node-3"
        },
        {
          id: "node-3",
          type: "project",
          title: "Final Step: Capstone Projects",
          details: "Build 2 deep projects for your resume. Idea 1: A task planner application with persistent local storage. Idea 2: A simple command-line based game or system manager implementing robust OOP principles.",
          connects_to: null
        }
      ]
    };
  }
};

export const getPremiumPathFallback = (field: string) => {
  const norm = field.toLowerCase().trim();
  if (norm.includes("frontend")) {
    return {
      root_node: { id: "root", label: "Frontend Core Path" },
      nodes: [
        { id: "web-foundations", label: "Web Foundations: HTML & CSS", parent_id: "root" },
        { id: "vanilla-js-ts", label: "Vanilla JS & TS Logic", parent_id: "root" },
        { id: "async-await-event-loop", label: "Async/Await & Event Loop", parent_id: "vanilla-js-ts" },
        { id: "dom-delegation", label: "DOM Delegation", parent_id: "vanilla-js-ts" },
        { id: "closures", label: "Closures", parent_id: "vanilla-js-ts" },
        { id: "framework-architecture", label: "Framework Architecture: Component Lifecycles, State Rendering", parent_id: "root" },
        { id: "core-web-vitals", label: "Core Web Vitals Optimization", parent_id: "root" },
        { id: "high-perf-dashboard", label: "High-Performance Dashboard Project", parent_id: "root" }
      ]
    };
  } else if (norm.includes("backend")) {
    return {
      root_node: { id: "root", label: "Backend Core Path" },
      nodes: [
        { id: "runtime-environments", label: "Runtime Environments & Web Protocols", parent_id: "root" },
        { id: "rest-apis-jwt", label: "REST APIs & JWT Security", parent_id: "runtime-environments" },
        { id: "database-tier", label: "Database Tier: Indexing, Joins Optimization", parent_id: "root" },
        { id: "concurrency", label: "Concurrency: Multi-Threading, Asynchronous Tasks", parent_id: "root" },
        { id: "caching-strategies", label: "Caching Strategies: Redis Layers", parent_id: "database-tier" },
        { id: "distributed-rate-limiter", label: "Distributed Rate-Limiter Project", parent_id: "root" }
      ]
    };
  } else if (norm.includes("full") || norm.includes("fullstack")) {
    return {
      root_node: { id: "root", label: "Full Stack Core Path" },
      nodes: [
        { id: "client-server-paradigms", label: "Client-Server Paradigms", parent_id: "root" },
        { id: "app-layer-security", label: "App Layer Security: CORS, XSS, SQLi Mitigation", parent_id: "client-server-paradigms" },
        { id: "real-time-transport", label: "Real-Time Transport: WebSockets, Server-Sent Events", parent_id: "client-server-paradigms" },
        { id: "db-ui-state-sync", label: "Database-to-UI State Synchronization", parent_id: "root" },
        { id: "real-time-collaborative-canvas", label: "Real-Time Collaborative Canvas Project", parent_id: "root" }
      ]
    };
  } else if (norm.includes("cyber") || norm.includes("sec") || norm.includes("security")) {
    return {
      root_node: { id: "root", label: "Cyber Security Core Path" },
      nodes: [
        { id: "security-infrastructures", label: "Security Infrastructures", parent_id: "root" },
        { id: "owasp-top-10", label: "OWASP Top 10 Auditing", parent_id: "security-infrastructures" },
        { id: "transport-security", label: "Transport Security: 3-Way Handshake, SSL/TLS", parent_id: "root" },
        { id: "packet-ingestion", label: "Packet Ingestion & Wireshark Analysis", parent_id: "transport-security" },
        { id: "cryptographic-models", label: "Cryptographic Models: Symmetric vs Asymmetric", parent_id: "root" },
        { id: "static-vulnerability-scanner", label: "Static Code Vulnerability Scanner Project", parent_id: "root" }
      ]
    };
  } else if (norm.includes("ai") || norm.includes("ml")) {
    return {
      root_node: { id: "root", label: "AI / ML Core Path" },
      nodes: [
        { id: "applied-math-vectors", label: "Applied Mathematical Vectors", parent_id: "root" },
        { id: "linear-algebra-matrix", label: "Linear Algebra & Matrix Calculus", parent_id: "applied-math-vectors" },
        { id: "core-data-wrangling", label: "Core Data Wrangling: NumPy, Pandas DataFrames", parent_id: "root" },
        { id: "classical-algorithms", label: "Classical Algorithms: Regression, Classification, Decision Trees", parent_id: "root" },
        { id: "performance-metrics", label: "Performance Metrics: Precision, Recall, F1-Score", parent_id: "classical-algorithms" },
        { id: "matrix-neural-network", label: "Matrix Neural Network Project from Scratch", parent_id: "root" }
      ]
    };
  } else if (norm.includes("analyst") || norm.includes("data")) {
    return {
      root_node: { id: "root", label: "Data Analyst Core Path" },
      nodes: [
        { id: "advanced-analytical-sql", label: "Advanced Analytical SQL", parent_id: "root" },
        { id: "window-functions-aggregations", label: "Window Functions, Complex Data Aggregations", parent_id: "advanced-analytical-sql" },
        { id: "structured-data-storage", label: "Structured Data Storage: Relational schemas, Data Warehouses", parent_id: "root" },
        { id: "pipeline-engineering", label: "Pipeline Engineering: Core ETL Workflows", parent_id: "root" },
        { id: "large-dataset-mining", label: "Large Dataset Mining: PySpark, Pandas Pipelines", parent_id: "root" },
        { id: "automated-multi-source-pipeline", label: "Automated Multi-Source Pipeline Project", parent_id: "root" }
      ]
    };
  } else {
    return {
      root_node: { id: "root", label: "SDE Core Path" },
      nodes: [
        { id: "language-basics", label: "Language Basics", parent_id: "root" },
        { id: "memory-concepts", label: "Memory Concepts", parent_id: "root" },
        { id: "arrays-strings", label: "Arrays & Strings", parent_id: "language-basics" },
        { id: "hashmaps", label: "HashMaps", parent_id: "language-basics" },
        { id: "sliding-window", label: "Sliding Window", parent_id: "language-basics" },
        { id: "bfs-dfs", label: "BFS & DFS", parent_id: "language-basics" },
        { id: "system-fundamentals", label: "System Fundamentals: OS, DBMS, Networks", parent_id: "root" },
        { id: "oops-4-pillars", label: "OOPS 4 Pillars", parent_id: "root" },
        { id: "solid-principles", label: "SOLID Principles", parent_id: "root" },
        { id: "system-tool-capstone", label: "System Tool Capstone", parent_id: "root" }
      ]
    };
  }
};

export const generatePremiumPath = async (field: string) => {
  return getPremiumPathFallback(field);
};

