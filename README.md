<div align="center">

# ⚡ Codify: AI Code Mentor

**An intelligent, multi-language coding assistant and structured learning workspace powered by Google Gemini and Firebase.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Firebase_Auth_%26_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[Explore Features](#-key-features) • [Quickstart](#-quickstart) • [Tech Stack](#-technology-stack) • [Architecture](#-architecture)

</div>

---

## 📖 Overview

**Codify** is a full-featured code mentor and computer science learning platform engineered for both beginners and experienced developers. By combining the conversational and analytical capabilities of the **Google Gemini API** with an interactive code execution environment, Codify bridges the gap between writing code and deeply understanding it.

Whether diagnosing subtle logic bugs, breaking down asymptotic complexity, or mastering curated DSA sheets, Codify offers an end-to-end learning workspace.

---

## ✨ Key Features

### 🧠 1. AI Code Mentor & Diagnostic Engine
- **Instant Fault Localization**: Detects syntax errors, logical bugs, and edge-case oversights with precise line-number tagging.
- **Deep Explanations & Line Inspection**: Select any line or code block to receive an on-demand breakdown of its runtime purpose.
- **Complexity Analysis**: Computes accurate Big-O Time and Space complexities ($O(n)$, $O(\log n)$, etc.) for user solutions.

### 🎓 2. CodePath Academy (Zero-to-Hero Tracks)
- Tailored pathways for **Java, Python, C, and C++**.
- Graphical mental models, memory allocation visualizations, and step-by-step conceptual milestones.

### 📚 3. Curated Problem Sheets & Test Suite
- Comprehensive catalog covering **Arrays, Strings, LinkedLists, Trees, Graphs, Dynamic Programming, and System Design**.
- Integrated sandbox to test implementations against custom test cases.

### 💻 4. Multi-Language State Persistence
- Supports **JavaScript, TypeScript, Python, Java, C, and C++**.
- Code state is strictly preserved per language independently in local memory and cloud storage.

### 🌓 5. Universal Design System
- Precision engineered **Dark Mode** and **Light Mode** themes with high-contrast Prism syntax highlighting.

### 🔥 6. User Profiles & Daily Streaks
- Firebase-backed authentication (Google OAuth & Email/Password).
- Real-time Firestore sync for submission history, XP points, and consistency calendars.

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite | Single Page Application architecture |
| **Language** | TypeScript 5+ | End-to-end static type safety |
| **Styling** | Tailwind CSS + Lucide Icons | Responsive utility design & iconography |
| **Animations** | Motion (Framer Motion) | Micro-interactions and fluid view transitions |
| **Syntax Highlighting** | Prism.js | Multi-language syntax tokenization |
| **AI Integration** | `@google/genai` (Gemini API) | Automated code analysis, tutor hints, and QA |
| **Backend & Database** | Firebase Authentication & Firestore | User sessions, streaks, and submission records |

---

## 🚀 Quickstart

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn**
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/pr05-dev/Codify.git
cd Codify
3. Install Dependencies
code
Bash
npm install



4. Configure Environment Variables
Create a .env file in the root directory:
code
Env
# Gemini API Key (Required for AI Analysis)
GEMINI_API_KEY=your_gemini_api_key_here
5. Launch Development Server
code
Bash
npm run dev
Navigate to http://localhost:3000 to launch Codify.
📂 Project Structure
code
Text
Codify/
├── public/              # Static assets and icons
├── src/
│   ├── components/      # UI components (Editor, Toolbar, Sheets, Modals)
│   │   ├── AdaptiveGreeting.tsx
│   │   ├── CareerRoadmap.tsx
│   │   ├── CodePathBeginner.tsx
│   │   ├── QuestionSelector.tsx
│   │   ├── TUFStyleSheet.tsx
│   │   └── UniversalToolbarCatalog.tsx
│   ├── data/            # Problem catalogs, DSA roadmaps, and challenge datasets
│   ├── lib/             # Firebase and Gemini API client integrations
│   ├── types.ts         # Central TypeScript interfaces and definitions
│   ├── App.tsx          # Main application orchestrator and layout router
│   ├── main.tsx         # React root entry point
│   └── index.css        # Tailwind core directives and theme tokens
├── index.html           # HTML5 entry with metadata
├── package.json         # Project manifests and dependencies
├── tailwind.config.js   # Tailwind design tokens
└── tsconfig.json        # TypeScript configuration
