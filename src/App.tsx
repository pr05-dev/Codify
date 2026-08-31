/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code2, 
  Sparkles, 
  Lightbulb, 
  AlertCircle, 
  HelpCircle, 
  Moon, 
  Sun, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Trash2,
  BookOpen,
  Trophy,
  Shield,
  Lock,
  Cpu,
  Binary,
  GraduationCap,
  Coins,
  ClipboardCheck,
  Zap,
  User,
  LayoutDashboard,
  ExternalLink,
  Github,
  Award,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  History,
  CheckCircle2,
  Menu,
  X,
  RefreshCw,
  Send,
  Bot,
  Snowflake,
  Maximize2,
  Minimize2,
  RotateCcw,
  FileCode,
  Compass,
  Code,
  Terminal,
  Loader2,
  Circle,
  Keyboard
} from "lucide-react";
import CareerRoadmap from "./components/CareerRoadmap";
import AdaptiveGreeting from "./components/AdaptiveGreeting";
import TUFStyleSheet from "./components/TUFStyleSheet";
import { dsaSheetsData } from "./data/dsaSheets";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import React, { Component, ErrorInfo, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-slate-500 mb-6">We've encountered an unexpected error. Please try refreshing the page.</p>
          <Button onClick={() => window.location.reload()}>Refresh App</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Modal = ({ isOpen, onClose, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type = "info" }: any) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {type === 'warning' ? <AlertCircle className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8">{message}</p>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1 rounded-xl" onClick={() => { onCancel?.(); onClose(); }}>{cancelText}</Button>
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl" onClick={() => { onConfirm?.(); onClose(); }}>{confirmText}</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism-tomorrow.css";
import { verifySolution, analyzeCode, clearDoubt, getRecommendation, chatWithExpert } from "./lib/gemini";
import ReactMarkdown from "react-markdown";
import CodePathBeginner from "./components/CodePathBeginner";
import SignOutConfirmModal from "./components/SignOutConfirmModal";
import StreakCalendarModal from "./components/StreakCalendarModal";
import { 
  auth, 
  db, 
  googleProvider, 
  OperationType, 
  handleFirestoreError 
} from "./lib/firebase";
import { 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp,
  collection,
  addDoc,
  query,
  where
} from "firebase/firestore";

const LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
  { id: "c", name: "C" },
];

const CHALLENGE_DATA = {
  "OOPS": [
    { title: "Classes & Objects", questions: [{ title: "Create a Car Class", level: "Easy" }, { title: "Bank Account Logic", level: "Medium" }] },
    { title: "Inheritance", questions: [{ title: "Animal Hierarchy", level: "Easy" }, { title: "Multi-level Employee", level: "Medium" }] },
    { title: "Polymorphism", questions: [{ title: "Shape Area Calculation", level: "Medium" }] },
    { title: "Encapsulation", questions: [{ title: "Private Member Access", level: "Medium" }] },
  ],
  "DSA Sheets": [
    { 
      title: "1. Two Pointers Pattern", 
      pattern: "Two Pointers",
      questions: [
        { 
          id: "arr_tp_1",
          title: "Two Sum II - Input Array Is Sorted", 
          pattern: "Two Pointers",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number.\n\nReturn the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.\n\nMust use only $O(1)$ constant extra space.",
          examples: [
            { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]", explanation: "The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2. We return [1, 2]." },
            { input: "numbers = [2,3,4], target = 6", output: "[1,3]", explanation: "The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3]." }
          ],
          constraints: ["2 <= numbers.length <= 3 * 10^4", "-1000 <= numbers[i] <= 1000", "numbers is sorted in non-decreasing order.", "Exact one solution exists."],
          solutions: {
            javascript: "function twoSum(numbers, target) {\n  let left = 0, right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}",
            python: "def twoSum(numbers, target):\n    l, r = 0, len(numbers) - 1\n    while l < r:\n        s = numbers[l] + numbers[r]\n        if s == target:\n            return [l + 1, r + 1]\n        elif s < target:\n            l += 1\n        else:\n            r -= 1\n    return []",
            java: "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int l = 0, r = numbers.length - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return new int[]{l + 1, r + 1};\n            if (sum < target) l++;\n            else r--;\n        }\n        return new int[]{};\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int l = 0, r = numbers.size() - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return {l + 1, r + 1};\n            if (sum < target) l++;\n            else r--;\n        }\n        return {};\n    }\n};"
          }
        }, 
        { 
          id: "arr_tp_2",
          title: "3Sum (Triple Zero Sum)", 
          pattern: "Two Pointers",
          role: "Must-Know Follow-Up",
          level: "Medium",
          targetComplexity: "O(N^2) Time | O(1) Space",
          description: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
          examples: [
            { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The distinct triplets adding to 0 are [-1,0,1] and [-1,-1,2]." },
            { input: "nums = [0,1,1]", output: "[]", explanation: "The only possible triplet does not sum to 0." }
          ],
          constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
          solutions: {
            javascript: "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      } else if (sum < 0) l++;\n      else r--;\n    }\n  }\n  return res;\n}",
            python: "def threeSum(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]: l += 1\n                while l < r and nums[r] == nums[r - 1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0:\n                l += 1\n            else:\n                r -= 1\n    return res",
            java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        for (int i = 0; i < nums.size() - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.size() - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "2. Sliding Window Pattern", 
      pattern: "Sliding Window",
      questions: [
        { 
          id: "arr_sw_1",
          title: "Maximum Average Subarray I", 
          pattern: "Sliding Window",
          role: "Primary Classic",
          level: "Easy",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "You are given an integer array `nums` consisting of `n` elements, and an integer `k`.\n\nFind a contiguous subarray whose length is equal to `k` that has the maximum average value and return this value.",
          examples: [
            { input: "nums = [1,12,-5,-6,50,3], k = 4", output: "12.75000", explanation: "Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75" }
          ],
          constraints: ["1 <= k <= n <= 10^5", "-10^4 <= nums[i] <= 10^4"],
          solutions: {
            javascript: "function findMaxAverage(nums, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n  let maxSum = sum;\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    maxSum = Math.max(maxSum, sum);\n  }\n  return maxSum / k;\n}",
            python: "def findMaxAverage(nums, k):\n    curr_sum = sum(nums[:k])\n    max_sum = curr_sum\n    for i in range(k, len(nums)):\n        curr_sum += nums[i] - nums[i - k]\n        max_sum = max(max_sum, curr_sum)\n    return max_sum / k",
            java: "class Solution {\n    public double findMaxAverage(int[] nums, int k) {\n        long sum = 0;\n        for (int i = 0; i < k; i++) sum += nums[i];\n        long maxSum = sum;\n        for (int i = k; i < nums.length; i++) {\n            sum += nums[i] - nums[i - k];\n            maxSum = Math.max(maxSum, sum);\n        }\n        return (double) maxSum / k;\n    }\n}",
            cpp: "class Solution {\npublic:\n    double findMaxAverage(vector<int>& nums, int k) {\n        double sum = 0;\n        for (int i = 0; i < k; i++) sum += nums[i];\n        double maxSum = sum;\n        for (int i = k; i < nums.size(); i++) {\n            sum += nums[i] - nums[i - k];\n            maxSum = max(maxSum, sum);\n        }\n        return maxSum / k;\n    }\n};"
          }
        },
        { 
          id: "arr_sw_2",
          title: "Minimum Size Subarray Sum", 
          pattern: "Sliding Window",
          role: "Must-Know Follow-Up",
          level: "Medium",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an array of positive integers `nums` and a positive integer `target`, return the **minimal length** of a contiguous subarray of which the sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.",
          examples: [
            { input: "target = 7, nums = [2,3,1,2,4,3]", output: "2", explanation: "Subarray [4,3] has the minimal length under the constraint." },
            { input: "target = 4, nums = [1,4,4]", output: "1", explanation: "Subarray [4] has minimal length 1." }
          ],
          constraints: ["1 <= target <= 10^9", "1 <= nums.length <= 10^5", "1 <= nums[i] <= 10^4"],
          solutions: {
            javascript: "function minSubArrayLen(target, nums) {\n  let minLen = Infinity, left = 0, sum = 0;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return minLen === Infinity ? 0 : minLen;\n}",
            python: "def minSubArrayLen(target, nums):\n    min_len = float('inf')\n    left = curr_sum = 0\n    for right in range(len(nums)):\n        curr_sum += nums[right]\n        while curr_sum >= target:\n            min_len = min(min_len, right - left + 1)\n            curr_sum -= nums[left]\n            left += 1\n    return 0 if min_len == float('inf') else min_len",
            java: "class Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        int minLen = Integer.MAX_VALUE, left = 0, sum = 0;\n        for (int right = 0; right < nums.length; right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = Math.min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? 0 : minLen;\n    }\n}",
            cpp: "class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        int minLen = INT_MAX, left = 0, sum = 0;\n        for (int right = 0; right < nums.size(); right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == INT_MAX ? 0 : minLen;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "3. Prefix Sum & Hash Map", 
      pattern: "Prefix Sum",
      questions: [
        { 
          id: "arr_ps_1",
          title: "Subarray Sum Equals K", 
          pattern: "Prefix Sum & Hash Map",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N) Time | O(N) Space",
          description: "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
          examples: [
            { input: "nums = [1,1,1], k = 2", output: "2", explanation: "Subarrays [1,1] at index (0,1) and (1,2) both sum to 2." },
            { input: "nums = [1,2,3], k = 3", output: "2", explanation: "Subarrays [1,2] and [3] sum to 3." }
          ],
          constraints: ["1 <= nums.length <= 2 * 10^4", "-1000 <= nums[i] <= 1000", "-10^7 <= k <= 10^7"],
          solutions: {
            javascript: "function subarraySum(nums, k) {\n  let count = 0, prefixSum = 0;\n  const map = new Map();\n  map.set(0, 1);\n  for (const n of nums) {\n    prefixSum += n;\n    if (map.has(prefixSum - k)) {\n      count += map.get(prefixSum - k);\n    }\n    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);\n  }\n  return count;\n}",
            python: "def subarraySum(nums, k):\n    count = prefix_sum = 0\n    d = {0: 1}\n    for n in nums:\n        prefix_sum += n\n        if prefix_sum - k in d:\n            count += d[prefix_sum - k]\n        d[prefix_sum] = d.get(prefix_sum, 0) + 1\n    return count",
            java: "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        int count = 0, prefixSum = 0;\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, 1);\n        for (int n : nums) {\n            prefixSum += n;\n            if (map.containsKey(prefixSum - k)) {\n                count += map.get(prefixSum - k);\n            }\n            map.put(prefixSum, map.getOrDefault(prefixSum, 0) + 1);\n        }\n        return count;\n    }\n}",
            cpp: "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        int count = 0, prefixSum = 0;\n        unordered_map<int, int> mp;\n        mp[0] = 1;\n        for (int n : nums) {\n            prefixSum += n;\n            if (mp.count(prefixSum - k)) count += mp[prefixSum - k];\n            mp[prefixSum]++;\n        }\n        return count;\n    }\n};"
          }
        },
        { 
          id: "arr_ps_2",
          title: "Product of Array Except Self", 
          pattern: "Prefix Sum / Accumulation",
          role: "Must-Know Follow-Up",
          level: "Medium",
          targetComplexity: "O(N) Time | O(1) Extra Space",
          description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in $O(N)$ time and **without using the division operation**.",
          examples: [
            { input: "nums = [1,2,3,4]", output: "[24,12,8,6]", explanation: "For index 0: 2*3*4 = 24. For index 1: 1*3*4 = 12." },
            { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]", explanation: "The zero at index 2 zeroes out all other positions except index 2." }
          ],
          constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
          solutions: {
            javascript: "function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    res[i] = prefix;\n    prefix *= nums[i];\n  }\n  let postfix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    res[i] *= postfix;\n    postfix *= nums[i];\n  }\n  return res;\n}",
            python: "def productExceptSelf(nums):\n    n = len(nums)\n    res = [1] * n\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n    postfix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= postfix\n        postfix *= nums[i]\n    return res",
            java: "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int prefix = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int postfix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= postfix;\n            postfix *= nums[i];\n        }\n        return res;\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n        int prefix = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int postfix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= postfix;\n            postfix *= nums[i];\n        }\n        return res;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "4. Kadane's Algorithm", 
      pattern: "Subarray Dynamics",
      questions: [
        { 
          id: "arr_kd_1",
          title: "Maximum Subarray (Kadane's)", 
          pattern: "Kadane's Algorithm",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return *its sum*.",
          examples: [
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum = 6." },
            { input: "nums = [1]", output: "1", explanation: "Single element array has max sum 1." }
          ],
          constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
          solutions: {
            javascript: "function maxSubArray(nums) {\n  let maxSoFar = nums[0], currMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}",
            python: "def maxSubArray(nums):\n    max_so_far = curr_max = nums[0]\n    for x in nums[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far",
            java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0], currMax = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currMax = Math.max(nums[i], currMax + nums[i]);\n            maxSoFar = Math.max(maxSoFar, currMax);\n        }\n        return maxSoFar;\n    }\n}",
            cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSoFar = nums[0], currMax = nums[0];\n        for (size_t i = 1; i < nums.size(); i++) {\n            currMax = max(nums[i], currMax + nums[i]);\n            maxSoFar = max(maxSoFar, currMax);\n        }\n        return maxSoFar;\n    }\n};"
          }
        },
        { 
          id: "arr_kd_2",
          title: "Maximum Product Subarray", 
          pattern: "Kadane's Algorithm Variant",
          role: "Must-Know Follow-Up",
          level: "Medium",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return *the product*.\n\nNegative numbers can flip min and max product values when multiplied.",
          examples: [
            { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
            { input: "nums = [-2,0,-1]", output: "0", explanation: "The result cannot be 2, because [-2,-1] is not a contiguous subarray." }
          ],
          constraints: ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10"],
          solutions: {
            javascript: "function maxProduct(nums) {\n  let res = nums[0], curMin = 1, curMax = 1;\n  for (const n of nums) {\n    if (n === 0) { curMin = 1; curMax = 1; res = Math.max(res, 0); continue; }\n    const tmp = curMax * n;\n    curMax = Math.max(n * curMax, n * curMin, n);\n    curMin = Math.min(tmp, n * curMin, n);\n    res = Math.max(res, curMax);\n  }\n  return res;\n}",
            python: "def maxProduct(nums):\n    res = max(nums)\n    curMin = curMax = 1\n    for n in nums:\n        if n == 0:\n            curMin = curMax = 1\n            continue\n        tmp = curMax * n\n        curMax = max(n * curMax, n * curMin, n)\n        curMin = min(tmp, n * curMin, n)\n        res = max(res, curMax)\n    return res",
            java: "class Solution {\n    public int maxProduct(int[] nums) {\n        int res = nums[0], curMin = 1, curMax = 1;\n        for (int n : nums) {\n            int tmp = curMax * n;\n            curMax = Math.max(Math.max(n * curMax, n * curMin), n);\n            curMin = Math.min(Math.min(tmp, n * curMin), n);\n            res = Math.max(res, curMax);\n        }\n        return res;\n    }\n}",
            cpp: "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        int res = nums[0], curMin = 1, curMax = 1;\n        for (int n : nums) {\n            int tmp = curMax * n;\n            curMax = max({n * curMax, n * curMin, n});\n            curMin = min({tmp, n * curMin, n});\n            res = max(res, curMax);\n        }\n        return res;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "5. Cyclic Sort Pattern", 
      pattern: "Cyclic Placement",
      questions: [
        { 
          id: "arr_cs_1",
          title: "Missing Number", 
          pattern: "Cyclic Sort / Bit Manipulation",
          role: "Primary Classic",
          level: "Easy",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the *only number in the range that is missing from the array*.",
          examples: [
            { input: "nums = [3,0,1]", output: "2", explanation: "n = 3 since there are 3 numbers, so all numbers are in range [0,3]. 2 is missing." }
          ],
          constraints: ["n == nums.length", "1 <= n <= 10^4", "0 <= nums[i] <= n"],
          solutions: {
            javascript: "function missingNumber(nums) {\n  let res = nums.length;\n  for (let i = 0; i < nums.length; i++) {\n    res ^= i ^ nums[i];\n  }\n  return res;\n}",
            python: "def missingNumber(nums):\n    res = len(nums)\n    for i, n in enumerate(nums):\n        res ^= i ^ n\n    return res",
            java: "class Solution {\n    public int missingNumber(int[] nums) {\n        int res = nums.length;\n        for (int i = 0; i < nums.length; i++) {\n            res ^= i ^ nums[i];\n        }\n        return res;\n    }\n}",
            cpp: "class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        int res = nums.size();\n        for (int i = 0; i < nums.size(); i++) {\n            res ^= i ^ nums[i];\n        }\n        return res;\n    }\n};"
          }
        },
        { 
          id: "arr_cs_2",
          title: "First Missing Positive", 
          pattern: "Cyclic Sort In-Place",
          role: "Must-Know Follow-Up",
          level: "Hard",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an unsorted integer array `nums`, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in $O(N)$ time and uses $O(1)$ auxiliary space by placing numbers in their index bucket `nums[i] == i + 1`.",
          examples: [
            { input: "nums = [1,2,0]", output: "3", explanation: "Numbers 1 and 2 are present, smallest missing positive is 3." },
            { input: "nums = [3,4,-1,1]", output: "2", explanation: "1 is in array, 2 is missing." }
          ],
          constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1"],
          solutions: {
            javascript: "function firstMissingPositive(nums) {\n  const n = nums.length;\n  for (let i = 0; i < n; i++) {\n    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {\n      const correctIdx = nums[i] - 1;\n      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    if (nums[i] !== i + 1) return i + 1;\n  }\n  return n + 1;\n}",
            python: "def firstMissingPositive(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n            correct_idx = nums[i] - 1\n            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]\n    for i in range(n):\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1",
            java: "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                int temp = nums[nums[i] - 1];\n                nums[nums[i] - 1] = nums[i];\n                nums[i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            if (nums[i] != i + 1) return i + 1;\n        }\n        return n + 1;\n    }\n}",
            cpp: "class Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                swap(nums[i], nums[nums[i] - 1]);\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            if (nums[i] != i + 1) return i + 1;\n        }\n        return n + 1;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "6. Matrix Manipulation", 
      pattern: "Grid Traversals",
      questions: [
        { 
          id: "arr_mm_1",
          title: "Rotate Image (90 Degrees)", 
          pattern: "Matrix Transpose & Reverse",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N^2) Time | O(1) Space",
          description: "You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) **in-place**.\n\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly.",
          examples: [
            { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]", explanation: "Transposed and reversed each row." }
          ],
          constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 20", "-1000 <= matrix[i][j] <= 1000"],
          solutions: {
            javascript: "function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  for (let i = 0; i < n; i++) matrix[i].reverse();\n}",
            python: "def rotate(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for row in matrix:\n        row.reverse()",
            java: "class Solution {\n    public void rotate(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            int l = 0, r = n - 1;\n            while (l < r) {\n                int temp = matrix[i][l];\n                matrix[i][l] = matrix[i][r];\n                matrix[i][r] = temp;\n                l++; r--;\n            }\n        }\n    }\n}",
            cpp: "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        int n = matrix.size();\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                swap(matrix[i][j], matrix[j][i]);\n            }\n        }\n        for (int i = 0; i < n; i++) reverse(matrix[i].begin(), matrix[i].end());\n    }\n};"
          }
        },
        { 
          id: "arr_mm_2",
          title: "Spiral Matrix", 
          pattern: "Matrix Boundary Traversal",
          role: "Must-Know Follow-Up",
          level: "Medium",
          targetComplexity: "O(M * N) Time | O(1) Space",
          description: "Given an `m x n` matrix, return all elements of the matrix in **spiral order**.",
          examples: [
            { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", explanation: "Traversed right, down, left, up in boundaries." }
          ],
          constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10"],
          solutions: {
            javascript: "function spiralOrder(matrix) {\n  const res = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let i = left; i <= right; i++) res.push(matrix[top][i]);\n    top++;\n    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);\n    right--;\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);\n      left++;\n    }\n  }\n  return res;\n}",
            python: "def spiralOrder(matrix):\n    res = []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    while top <= bottom and left <= right:\n        for i in range(left, right + 1): res.append(matrix[top][i])\n        top += 1\n        for i in range(top, bottom + 1): res.append(matrix[i][right])\n        right -= 1\n        if top <= bottom:\n            for i in range(right, left - 1, -1): res.append(matrix[bottom][i])\n            bottom -= 1\n        if left <= right:\n            for i in range(bottom, top - 1, -1): res.append(matrix[i][left])\n            left += 1\n    return res",
            java: "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) res.add(matrix[top][i]);\n            top++;\n            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);\n            right--;\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--) res.add(matrix[bottom][i]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        vector<int> res;\n        int top = 0, bottom = matrix.size() - 1;\n        int left = 0, right = matrix[0].size() - 1;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);\n            top++;\n            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);\n            right--;\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "7. Interval Merging & Overlaps", 
      pattern: "Sorting & Merging Intervals",
      questions: [
        { 
          id: "arr_im_1",
          title: "Merge Intervals", 
          pattern: "Interval Merging",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N log N) Time | O(N) Space",
          description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
          examples: [
            { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlap, merged into [1,6]." }
          ],
          constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= start_i <= end_i <= 10^4"],
          solutions: {
            javascript: "function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = res[res.length - 1];\n    const curr = intervals[i];\n    if (curr[0] <= last[1]) {\n      last[1] = Math.max(last[1], curr[1]);\n    } else {\n      res.push(curr);\n    }\n  }\n  return res;\n}",
            python: "def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    res = [intervals[0]]\n    for curr in intervals[1:]:\n        last = res[-1]\n        if curr[0] <= last[1]:\n            last[1] = max(last[1], curr[1])\n        else:\n            res.append(curr)\n    return res",
            java: "class Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> res = new ArrayList<>();\n        res.add(intervals[0]);\n        for (int i = 1; i < intervals.length; i++) {\n            int[] last = res.get(res.size() - 1);\n            if (intervals[i][0] <= last[1]) {\n                last[1] = Math.max(last[1], intervals[i][1]);\n            } else {\n                res.add(intervals[i]);\n            }\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        res.push_back(intervals[0]);\n        for (size_t i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] <= res.back()[1]) {\n                res.back()[1] = max(res.back()[1], intervals[i][1]);\n            } else {\n                res.push_back(intervals[i]);\n            }\n        }\n        return res;\n    }\n};"
          }
        },
        { 
          id: "arr_im_2",
          title: "Insert Interval", 
          pattern: "Interval Insertion",
          role: "Must-Know Follow-Up",
          level: "Medium",
          targetComplexity: "O(N) Time | O(N) Space",
          description: "You are given an array of non-overlapping intervals `intervals` sorted by `start_i` in ascending order, and a `newInterval = [start, end]`.\n\nInsert `newInterval` into `intervals` such that `intervals` is still sorted by start time and non-overlapping (merge overlapping intervals if necessary).",
          examples: [
            { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]", explanation: "newInterval overlaps with [1,3], merged into [1,5]." }
          ],
          constraints: ["0 <= intervals.length <= 10^4", "intervals[i].length == 2"],
          solutions: {
            javascript: "function insert(intervals, newInterval) {\n  const res = [];\n  let i = 0, n = intervals.length;\n  while (i < n && intervals[i][1] < newInterval[0]) {\n    res.push(intervals[i++]);\n  }\n  while (i < n && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  while (i < n) {\n    res.push(intervals[i++]);\n  }\n  return res;\n}",
            python: "def insert(intervals, newInterval):\n    res = []\n    i, n = 0, len(intervals)\n    while i < n and intervals[i][1] < newInterval[0]:\n        res.append(intervals[i])\n        i += 1\n    while i < n and intervals[i][0] <= newInterval[1]:\n        newInterval[0] = min(newInterval[0], intervals[i][0])\n        newInterval[1] = max(newInterval[1], intervals[i][1])\n        i += 1\n    res.append(newInterval)\n    while i < n:\n        res.append(intervals[i])\n        i += 1\n    return res",
            java: "class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        List<int[]> res = new ArrayList<>();\n        int i = 0, n = intervals.length;\n        while (i < n && intervals[i][1] < newInterval[0]) {\n            res.add(intervals[i++]);\n        }\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.add(newInterval);\n        while (i < n) {\n            res.add(intervals[i++]);\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        vector<vector<int>> res;\n        int i = 0, n = intervals.size();\n        while (i < n && intervals[i][1] < newInterval[0]) {\n            res.push_back(intervals[i++]);\n        }\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = min(newInterval[0], intervals[i][0]);\n            newInterval[1] = max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.push_back(newInterval);\n        while (i < n) {\n            res.push_back(intervals[i++]);\n        }\n        return res;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "8. Dutch National Flag (3-Way Partitioning)", 
      pattern: "3-Way Partitioning",
      questions: [
        { 
          id: "arr_dnf_1",
          title: "Sort Colors (0s, 1s, 2s)", 
          pattern: "Dutch National Flag",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function in $O(N)$ single pass.",
          examples: [
            { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]", explanation: "Sorted in-place using low, mid, high pointers." }
          ],
          constraints: ["n == nums.length", "1 <= n <= 300", "nums[i] is 0, 1, or 2."],
          solutions: {
            javascript: "function sortColors(nums) {\n  let low = 0, mid = 0, high = nums.length - 1;\n  while (mid <= high) {\n    if (nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++; mid++;\n    } else if (nums[mid] === 1) {\n      mid++;\n    } else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n    }\n  }\n}",
            python: "def sortColors(nums):\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1; mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1",
            java: "class Solution {\n    public void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;\n                low++; mid++;\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;\n                high--;\n            }\n        }\n    }\n}",
            cpp: "class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int low = 0, mid = 0, high = nums.size() - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                swap(nums[low++], nums[mid++]);\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                swap(nums[mid], nums[high--]);\n            }\n        }\n    }\n};"
          }
        },
        { 
          id: "arr_dnf_2",
          title: "Move Zeroes", 
          pattern: "In-Place Array Partition",
          role: "Must-Know Follow-Up",
          level: "Easy",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this **in-place** without making a copy of the array.",
          examples: [
            { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]", explanation: "Maintained order of non-zero numbers while grouping 0s at the tail." }
          ],
          constraints: ["1 <= nums.length <= 10^4", "-2^31 <= nums[i] <= 2^31 - 1"],
          solutions: {
            javascript: "function moveZeroes(nums) {\n  let lastNonZero = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] !== 0) {\n      [nums[lastNonZero], nums[i]] = [nums[i], nums[lastNonZero]];\n      lastNonZero++;\n    }\n  }\n}",
            python: "def moveZeroes(nums):\n    last_non_zero = 0\n    for i in range(len(nums)):\n        if nums[i] != 0:\n            nums[last_non_zero], nums[i] = nums[i], nums[last_non_zero]\n            last_non_zero += 1",
            java: "class Solution {\n    public void moveZeroes(int[] nums) {\n        int lastNonZero = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] != 0) {\n                int t = nums[lastNonZero]; nums[lastNonZero] = nums[i]; nums[i] = t;\n                lastNonZero++;\n            }\n        }\n    }\n}",
            cpp: "class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int lastNonZero = 0;\n        for (size_t i = 0; i < nums.size(); i++) {\n            if (nums[i] != 0) {\n                swap(nums[lastNonZero++], nums[i]);\n            }\n        }\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "9. Monotonic Stack Pattern", 
      pattern: "Monotonic Stack",
      questions: [
        { 
          id: "arr_ms_1",
          title: "Daily Temperatures", 
          pattern: "Monotonic Decreasing Stack",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N) Time | O(N) Space",
          description: "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
          examples: [
            { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]", explanation: "For index 0 (73), day 1 is 74 (1 day wait). For index 2 (75), day 6 is 76 (4 days wait)." }
          ],
          constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
          solutions: {
            javascript: "function dailyTemperatures(temperatures) {\n  const res = new Array(temperatures.length).fill(0);\n  const stack = []; // stores indices\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prevIdx = stack.pop();\n      res[prevIdx] = i - prevIdx;\n    }\n    stack.push(i);\n  }\n  return res;\n}",
            python: "def dailyTemperatures(temperatures):\n    res = [0] * len(temperatures)\n    stack = [] # stores index\n    for i, t in enumerate(temperatures):\n        while stack and t > temperatures[stack[-1]]:\n            prev = stack.pop()\n            res[prev] = i - prev\n        stack.append(i)\n    return res",
            java: "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int[] res = new int[temperatures.length];\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 0; i < temperatures.length; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prev = stack.pop();\n                res[prev] = i - prev;\n            }\n            stack.push(i);\n        }\n        return res;\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        vector<int> res(temperatures.size(), 0);\n        stack<int> st;\n        for (int i = 0; i < temperatures.size(); i++) {\n            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n                int prev = st.top(); st.pop();\n                res[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};"
          }
        },
        { 
          id: "arr_ms_2",
          title: "Next Greater Element I", 
          pattern: "Monotonic Stack & Map",
          role: "Must-Know Follow-Up",
          level: "Easy",
          targetComplexity: "O(N + M) Time | O(N) Space",
          description: "The **next greater element** of some element `x` in an array is the first greater element that is to the right of `x` in the same array.\n\nYou are given two distinct 0-indexed integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`. For each `0 <= i < nums1.length`, find the index `j` such that `nums1[i] == nums2[j]` and determine the next greater element of `nums2[j]` in `nums2`.",
          examples: [
            { input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]", explanation: "4 has no next greater (-1), 1 has next greater 3, 2 has no next greater (-1)." }
          ],
          constraints: ["1 <= nums1.length <= nums2.length <= 1000", "0 <= nums1[i], nums2[i] <= 10^4", "All elements in nums1 and nums2 are unique."],
          solutions: {
            javascript: "function nextGreaterElement(nums1, nums2) {\n  const map = new Map();\n  const stack = [];\n  for (const num of nums2) {\n    while (stack.length > 0 && num > stack[stack.length - 1]) {\n      map.set(stack.pop(), num);\n    }\n    stack.push(num);\n  }\n  return nums1.map(n => map.get(n) ?? -1);\n}",
            python: "def nextGreaterElement(nums1, nums2):\n    mapping = {}\n    stack = []\n    for n in nums2:\n        while stack and n > stack[-1]:\n            mapping[stack.pop()] = n\n        stack.append(n)\n    return [mapping.get(n, -1) for n in nums1]",
            java: "class Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        Map<Integer, Integer> map = new HashMap<>();\n        Stack<Integer> stack = new Stack<>();\n        for (int n : nums2) {\n            while (!stack.isEmpty() && n > stack.peek()) {\n                map.put(stack.pop(), n);\n            }\n            stack.push(n);\n        }\n        int[] res = new int[nums1.length];\n        for (int i = 0; i < nums1.length; i++) {\n            res[i] = map.getOrDefault(nums1[i], -1);\n        }\n        return res;\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n        unordered_map<int, int> mp;\n        stack<int> st;\n        for (int n : nums2) {\n            while (!st.empty() && n > st.top()) {\n                mp[st.top()] = n; st.pop();\n            }\n            st.push(n);\n        }\n        vector<int> res;\n        for (int n : nums1) {\n            res.push_back(mp.count(n) ? mp[n] : -1);\n        }\n        return res;\n    }\n};"
          }
        }
      ] 
    },
    { 
      title: "10. Fast & Slow Pointers (Array as Linked List)", 
      pattern: "Floyd's Cycle Detection",
      questions: [
        { 
          id: "arr_fs_1",
          title: "Find the Duplicate Number", 
          pattern: "Floyd's Tortoise and Hare",
          role: "Primary Classic",
          level: "Medium",
          targetComplexity: "O(N) Time | O(1) Space",
          description: "Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.\n\nThere is only **one repeated number** in `nums`, return this repeated number.\n\nYou must solve the problem **without modifying** the array `nums` and uses only $O(1)$ constant extra space.",
          examples: [
            { input: "nums = [1,3,4,2,2]", output: "2", explanation: "Array values form a cycle 0->1->3->2->4->2. Floyd's cycle detection locates the duplicate 2." }
          ],
          constraints: ["1 <= n <= 10^5", "nums.length == n + 1", "1 <= nums[i] <= n"],
          solutions: {
            javascript: "function findDuplicate(nums) {\n  let slow = nums[0], fast = nums[0];\n  do {\n    slow = nums[slow];\n    fast = nums[nums[fast]];\n  } while (slow !== fast);\n  slow = nums[0];\n  while (slow !== fast) {\n    slow = nums[slow];\n    fast = nums[fast];\n  }\n  return slow;\n}",
            python: "def findDuplicate(nums):\n    slow = fast = nums[0]\n    while True:\n        slow = nums[slow]\n        fast = nums[nums[fast]]\n        if slow == fast:\n            break\n    slow = nums[0]\n    while slow != fast:\n        slow = nums[slow]\n        fast = nums[fast]\n    return slow",
            java: "class Solution {\n    public int findDuplicate(int[] nums) {\n        int slow = nums[0], fast = nums[0];\n        do {\n            slow = nums[slow];\n            fast = nums[nums[fast]];\n        } while (slow != fast);\n        slow = nums[0];\n        while (slow != fast) {\n            slow = nums[slow];\n            fast = nums[fast];\n        }\n        return slow;\n    }\n}",
            cpp: "class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        int slow = nums[0], fast = nums[0];\n        do {\n            slow = nums[slow];\n            fast = nums[nums[fast]];\n        } while (slow != fast);\n        slow = nums[0];\n        while (slow != fast) {\n            slow = nums[slow];\n            fast = nums[fast];\n        }\n        return slow;\n    }\n};"
          }
        }
      ] 
    },
    { title: "11. Linked Lists", questions: [{ title: "Reverse List", level: "Easy" }, { title: "Detect Cycle", level: "Medium" }] },
    { title: "12. Stacks & Queues", questions: [{ title: "Valid Parentheses", level: "Easy" }] },
  ],
  "Core CS Subjects": [
    { title: "Operating Systems", questions: [{ title: "Process Scheduling", level: "Medium" }] },
    { title: "DBMS", questions: [{ title: "SQL Joins", level: "Easy" }] },
  ],
  "CS Fundamentals": [
    { title: "Binary & Hexadecimal", questions: [{ title: "Base Conversion", level: "Easy" }] },
  ],
  "Patterns": [
    {
      "title": "Structural Recognition",
      "questions": [
        {
          "id": "p1",
          "title": "Identifying Sliding Window",
          "level": "Easy",
          "description": "Look at the following function code and identify which standard algorithmic pattern is being applied.\n\n```javascript\nfunction solve(arr, k) {\n  let maxSum = 0;\n  let windowSum = 0;\n  for (let i = 0; i < k; i++) {\n    windowSum += arr[i];\n  }\n  maxSum = windowSum;\n  for (let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i - k];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}\n```\n\nChoose the correct pattern. Implement a function `getPattern()` that returns the exact pattern string: `\"Sliding Window\"`.",
          "examples": [
            { "input": "solve(arr, k)", "output": "\"Sliding Window\"", "explanation": "A rolling window of elements moves across the array, calculating sums incrementally in O(1) step transitions." }
          ],
          "constraints": ["Time Complexity: O(N)", "Auxiliary Space: O(1)"],
          "solutions": {
            "javascript": "function getPattern() {\n  return \"Sliding Window\";\n}",
            "python": "def getPattern():\n    return \"Sliding Window\"",
            "java": "class Solution {\n    public String getPattern() {\n        return \"Sliding Window\";\n    }\n}",
            "cpp": "class Solution {\npublic:\n    string getPattern() {\n        return \"Sliding Window\";\n    }\n};"
          }
        },
        {
          "id": "p2",
          "title": "Two Pointers Spotting",
          "level": "Medium",
          "description": "Analyze the structure of the following algorithm.\n\n```javascript\nfunction solve(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left < right) {\n    let sum = arr[left] + arr[right];\n    if (sum === target) return [left, right];\n    else if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}\n```\n\nIdentify the algorithmic pattern used. Implement a function `getPattern()` that returns the exact pattern string: `\"Two Pointers\"`.",
          "examples": [
            { "input": "solve(arr, target)", "output": "\"Two Pointers\"", "explanation": "Two pointers move from opposite ends of a sorted array towards each other based on comparison." }
          ],
          "constraints": ["Time Complexity: O(N)", "Auxiliary Space: O(1)"],
          "solutions": {
            "javascript": "function getPattern() {\n  return \"Two Pointers\";\n}",
            "python": "def getPattern():\n    return \"Two Pointers\"",
            "java": "class Solution {\n    public String getPattern() {\n        return \"Two Pointers\";\n    }\n}",
            "cpp": "class Solution {\npublic:\n    string getPattern() {\n        return \"Two Pointers\";\n    }\n};"
          }
        },
        {
          "id": "p3",
          "title": "Fast & Slow Pointers",
          "level": "Hard",
          "description": "Spot the pattern used to detect cycles or find middles in a linked structure.\n\n```javascript\nfunction solve(head) {\n  let slow = head;\n  let fast = head;\n  while (fast !== null && fast.next !== null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\n```\n\nIdentify the algorithmic pattern used. Implement a function `getPattern()` that returns the exact pattern string: `\"Fast and Slow Pointers\"`.",
          "examples": [
            { "input": "solve(head)", "output": "\"Fast and Slow Pointers\"", "explanation": "The fast pointer moves at twice the speed of the slow pointer, catching up if a cycle exists." }
          ],
          "constraints": ["Time Complexity: O(N)", "Auxiliary Space: O(1)"],
          "solutions": {
            "javascript": "function getPattern() {\n  return \"Fast and Slow Pointers\";\n}",
            "python": "def getPattern():\n    return \"Fast and Slow Pointers\"",
            "java": "class Solution {\n    public String getPattern() {\n        return \"Fast and Slow Pointers\";\n    }\n}",
            "cpp": "class Solution {\npublic:\n    string getPattern() {\n        return \"Fast and Slow Pointers\";\n    }\n};"
          }
        }
      ]
    }
  ]
};

(CHALLENGE_DATA as any)["DSA Sheets"] = dsaSheetsData;

const TEST_DATA = {
  "Easy": [
    { id: "e1", title: "Test 1: Variable Swap", question: "Write a function to swap two numbers without using a third variable." },
    { id: "e2", title: "Test 2: Even or Odd", question: "Write a function that checks if a number is even or odd." }
  ],
  "Medium": [
    { id: "m1", title: "Test 1: Palindrome Check", question: "Write a function to check if a string is a palindrome." },
    { id: "m2", title: "Test 2: Fibonacci", question: "Write a function to return the nth Fibonacci number." }
  ],
  "Hard": [
    { id: "h1", title: "Test 1: Merge Sort", question: "Implement the Merge Sort algorithm." },
    { id: "h2", title: "Test 2: Binary Search Tree", question: "Implement a basic Binary Search Tree with insert and search operations." }
  ]
};

interface AnalysisResult {
  mistakes: Array<{ line: number; description: string; fix: string }>;
  confusingParts: Array<{ block: string; explanation: string }>;
  concepts: Array<{ title: string; description: string; example: string }>;
  overallFeedback: string;
}

function getISTDateString(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(date);
  } catch (e) {
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const istDate = new Date(utcTime + (330 * 60000));
    const yyyy = istDate.getFullYear();
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const dd = String(istDate.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}

function getDayDiffInIST(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 999;
  const d1 = new Date(dateStr1 + "T00:00:00+05:30");
  const d2 = new Date(dateStr2 + "T00:00:00+05:30");
  const msDiff = d1.getTime() - d2.getTime();
  return Math.round(msDiff / (24 * 60 * 60 * 1000));
}

function getBoilerplateCode(title: string, lang: string, solveWithUserInput: boolean = false): string {
  const cleanTitle = title.replace(/^Test \d+:\s*/i, "").replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const pascalName = cleanTitle.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1);

  if (solveWithUserInput) {
    // User Input Mode: "just give class alone"
    switch (lang) {
      case "java":
        return `import java.util.*;\n\npublic class Solution {\n    // Write your Java class logic here\n}`;
      
      case "cpp":
        return `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\n    // Write your C++ class logic here\n};`;
      
      case "c":
        return `#include <stdio.h>\n#include <stdlib.h>\n\n// Write your C solution here\n`;
      
      case "typescript":
        return `class Solution {\n    // Write your TypeScript class logic here\n}`;
      
      case "python":
        return `class Solution:\n    # Write your Python class logic here\n    pass`;
      
      case "javascript":
        return `class Solution {\n    // Write your JavaScript class logic here\n}`;
        
      default:
        return `// Select a language to load a template`;
    }
  }

  // Standard Mode ("No, Standard Mode"): "give class method and all for all langs" (LeetCode style, no main function)
  switch (lang) {
    case "java":
      return `import java.util.*;\n\npublic class Solution {\n    public void ${camelName || "solve"}() {\n        // Write your Java class method here\n    }\n}`;
    
    case "cpp":
      return `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    void ${camelName || "solve"}() {\n        // Write your C++ class method here\n    }\n};`;
    
    case "c":
      return `#include <stdio.h>\n#include <stdlib.h>\n\n// Write your C function here\nvoid ${camelName || "solve"}() {\n    \n}`;
    
    case "typescript":
      return `class Solution {\n    public ${camelName || "solve"}(): void {\n        // Write your TypeScript class method here\n    }\n}`;
    
    case "python":
      return `class Solution:\n    def ${camelName || "solve"}(self):\n        # Write your Python class method here\n        pass`;
    
    case "javascript":
      return `class Solution {\n    ${camelName || "solve"}() {\n        // Write your JavaScript class method here\n    }\n}`;
      
    default:
      return `// Select a language to load a template`;
  }
}

function generateTextMapConfig(title: string, level: string, isCorrect: boolean): string {
  const timestamp = Date.now();
  const sessionId = `session_${timestamp}`;
  const streamDomain = "SDE";
  const score = isCorrect ? 100 : 0;
  const executionDate = new Date().toISOString().split('T')[0];
  const classificationTag = "Patterns";
  
  const difficulty = (level || "Easy").toLowerCase();
  let colorCode = "#10b981";
  if (difficulty === "medium") {
    colorCode = "#f59e0b";
  } else if (difficulty === "hard") {
    colorCode = "#ef4444";
  }

  return `sessionId=${sessionId}
streamDomain=${streamDomain}
score=${score}
executionDate=${executionDate}
classificationTag=${classificationTag}
difficultyTrack=${difficulty}
incrementValue=${isCorrect ? 1 : 0}
metricColorCode=${colorCode}`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("mentor");
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [dayStreak, setDayStreak] = useState<number>(1);
  const [openedDates, setOpenedDates] = useState<string[]>([]);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [routeMode, setRouteMode] = useState<"ask" | "mentor" | "codepath">("ask");
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Sign up and custom login states
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authLocalError, setAuthLocalError] = useState("");
  const [authLocalLoading, setAuthLocalLoading] = useState(false);
  const [authCountdown, setAuthCountdown] = useState(3);
  const [authSuccessMessage, setAuthSuccessMessage] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [points, setPoints] = useState({ bPoints: 0, cPoints: 0 });
  const [easyTestsDone, setEasyTestsDone] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [solvedHistory, setSolvedHistory] = useState<any[]>([]);
  const [cachedHistory, setCachedHistory] = useState<any[]>([]);
  const [historySubTab, setHistorySubTab] = useState<"tests" | "editor">("tests");
  const [selectedHistoryQuestion, setSelectedHistoryQuestion] = useState<any | null>(null);
  const [expandedAttempts, setExpandedAttempts] = useState<Record<string, boolean>>({});
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [solveWithUserInput, setSolveWithUserInput] = useState(false);
  const [customUserInputText, setCustomUserInputText] = useState("");
  const [userInputMetrics, setUserInputMetrics] = useState<{ easy: number; medium: number; hard: number }>({ easy: 0, medium: 0, hard: 0 });
  const [userInputConfigMap, setUserInputConfigMap] = useState<string | null>(null);

  useEffect(() => {
    const savedMetrics = localStorage.getItem("codify_user_input_metrics");
    if (savedMetrics) {
      try {
        setUserInputMetrics(JSON.parse(savedMetrics));
      } catch (e) {
        console.error("Error parsing user input metrics", e);
      }
    }
  }, []);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [doubt, setDoubt] = useState("");
  const [doubtResponse, setDoubtResponse] = useState("");
  const [isClearingDoubt, setIsClearingDoubt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [isGettingRec, setIsGettingRec] = useState(false);
  const [activeTest, setActiveTest] = useState<any | null>(null);
  const [testFeedback, setTestFeedback] = useState<any | null>(null);
  const [showPatternSidebar, setShowPatternSidebar] = useState(false);
  const [patternData, setPatternData] = useState<any | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<any>({ isOpen: false, title: "", message: "", onConfirm: null, type: "info" });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', content: string }>>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuestionDetail, setSelectedQuestionDetail] = useState<any | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [questionAttempts, setQuestionAttempts] = useState<Record<string, number>>({});
  const [selectedDsaTag, setSelectedDsaTag] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    let interval: any;
    if (isVerifying || isAnalyzing) {
      setVerificationStep(0);
      interval = setInterval(() => {
        setVerificationStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 750);
    } else {
      setVerificationStep(0);
    }
    return () => clearInterval(interval);
  }, [isVerifying, isAnalyzing]);

  const showModal = (config: any) => setModalConfig({ ...config, isOpen: true });
  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  useEffect(() => {
    if (activeTest && language) {
      if (!code.trim() || code.startsWith("// Select a language") || code.includes("class Solution") || code.includes("public class Solution") || code.startsWith("#include") || code.startsWith("import java")) {
        setCode(getBoilerplateCode(activeTest.title || activeTest.question || "Solve", language, activeTest.solveWithUserInput || solveWithUserInput));
      }
    }
  }, [activeTest, language, solveWithUserInput]);

  useEffect(() => {
    let cacheUnsubscribe: (() => void) | null = null;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      let activeUser = currentUser;
      
      if (activeUser && activeUser.isAnonymous) {
        try {
          await signOut(auth);
        } catch (e) {}
        activeUser = null;
      }

      if (!activeUser) {
        setUser(null);
        setIsAuthLoading(false);
        return;
      }

      setUser(activeUser);
      setIsAuthLoading(false);
      
      if (activeUser) {
        // Subscribe to user history cache in real-time
        try {
          const cacheQuery = query(
            collection(db, "user_history_cache"),
            where("userId", "==", activeUser.uid)
          );
          cacheUnsubscribe = onSnapshot(cacheQuery, (snapshot) => {
            const records = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                dateObj: data.timestamp ? (data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp)) : new Date()
              };
            });
            records.sort((a: any, b: any) => b.dateObj.getTime() - a.dateObj.getTime());
            setCachedHistory(records);
          }, (error) => {
            console.error("Cache subscriber error:", error);
          });
        } catch (cacheErr) {
          console.error("Failed to initialize cache subscriber:", cacheErr);
        }

        const userDocRef = doc(db, "users", activeUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          const todayIST = getISTDateString(new Date());
          let loadedDayStreak = 1;
          let loadedOpenedDates: string[] = [todayIST];

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid: activeUser.uid,
              email: activeUser.email || "guest@codingportal.com",
              displayName: activeUser.displayName || "Guest Scholar",
              photoURL: activeUser.photoURL || "",
              cPoints: 0,
              bPoints: 0,
              easyTestsDone: 0,
              completedQuestions: [],
              solvedHistory: [],
              createdAt: serverTimestamp(),
              dayStreak: 1,
              lastActiveDateIST: todayIST,
              openedDates: [todayIST]
            });
            setDayStreak(1);
            setOpenedDates([todayIST]);
          } else {
            const data = userDoc.data();
            setPoints({ bPoints: data.bPoints || 0, cPoints: data.cPoints || 0 });
            setEasyTestsDone(data.easyTestsDone || 0);
            setCompletedQuestions(data.completedQuestions || []);
            setSolvedHistory(data.solvedHistory || []);
            
            // Calculate and load day streak in IST
            const lastActiveDateIST = data.lastActiveDateIST || "";
            const currentStreak = data.dayStreak !== undefined ? data.dayStreak : 0;
            const currentOpened = data.openedDates || [];
            
            loadedOpenedDates = [...currentOpened];
            if (!loadedOpenedDates.includes(todayIST)) {
              loadedOpenedDates.push(todayIST);
            }

            if (lastActiveDateIST === "") {
              loadedDayStreak = 1;
            } else {
              const diff = getDayDiffInIST(todayIST, lastActiveDateIST);
              if (diff === 1) {
                // consecutive day, streak increases!
                loadedDayStreak = currentStreak + 1;
              } else if (diff > 1) {
                // missed a day, reset to 1
                loadedDayStreak = 1;
              } else if (diff === 0) {
                // already opened today, keep active streak
                loadedDayStreak = currentStreak || 1;
              } else {
                loadedDayStreak = currentStreak || 1;
              }
            }

            // Sync back to db if changed
            if (loadedDayStreak !== currentStreak || lastActiveDateIST !== todayIST || currentOpened.length !== loadedOpenedDates.length) {
              await updateDoc(userDocRef, {
                dayStreak: loadedDayStreak,
                lastActiveDateIST: todayIST,
                openedDates: loadedOpenedDates
              });
            }

            setDayStreak(loadedDayStreak);
            setOpenedDates(loadedOpenedDates);
          }

          onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setPoints({ bPoints: data.bPoints || 0, cPoints: data.cPoints || 0 });
              setEasyTestsDone(data.easyTestsDone || 0);
              setCompletedQuestions(data.completedQuestions || []);
              setSolvedHistory(data.solvedHistory || []);
              if (data.dayStreak !== undefined) {
                setDayStreak(data.dayStreak);
              }
              if (data.openedDates) {
                setOpenedDates(data.openedDates);
              }
            }
          }, (error) => handleFirestoreError(error, OperationType.GET, `users/${activeUser.uid}`));
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${activeUser.uid}`);
        }
      }
    });
    return () => {
      unsubscribe();
      if (cacheUnsubscribe) cacheUnsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLocalError("");
    setAuthSuccessMessage("");

    const name = signUpName.trim();
    const email = signUpEmail.trim();
    const password = signUpPassword.trim();

    if (!name) {
      setAuthLocalError("Please enter your name.");
      return;
    }
    if (!email) {
      setAuthLocalError("Please enter your email.");
      return;
    }
    if (!password || password.length < 6) {
      setAuthLocalError("Password must be at least 6 characters.");
      return;
    }

    setAuthLocalLoading(true);
    setAuthCountdown(3);

    // Dynamic countdown timer representing the 3 seconds load before final dashboard layout loading
    const interval = setInterval(() => {
      setAuthCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      const todayIST = getISTDateString();
      const userDocRef = doc(db, "users", userCredential.user.uid);
      try {
        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          email: email,
          displayName: name,
          photoURL: "",
          cPoints: 0,
          bPoints: 0,
          easyTestsDone: 0,
          completedQuestions: [],
          solvedHistory: [],
          createdAt: serverTimestamp(),
          dayStreak: 1,
          lastActiveDateIST: todayIST,
          openedDates: [todayIST]
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${userCredential.user.uid}`);
      }

      setTimeout(() => {
        clearInterval(interval);
        setAuthLocalLoading(false);
        setSignUpName("");
        setSignUpEmail("");
        setSignUpPassword("");
      }, 3000);
    } catch (error: any) {
      console.warn("Real Sign Up failed, trying elegant fallback:", error);
      if (error.code === "auth/email-already-in-use") {
        clearInterval(interval);
        setAuthLocalLoading(false);
        setAuthLocalError("This email address is already registered.");
      } else if (error.code === "auth/invalid-email") {
        clearInterval(interval);
        setAuthLocalLoading(false);
        setAuthLocalError("Please enter a valid email address.");
      } else {
        // Fallback: If Email/Password auth is disabled in the Firebase console, 
        // fallback to signInAnonymously & sync details directly in Firestore
        try {
          const anonCred = await signInAnonymously(auth);
          await updateProfile(anonCred.user, { displayName: name });

          const todayIST = getISTDateString();
          const userDocRef = doc(db, "users", anonCred.user.uid);
          try {
            await setDoc(userDocRef, {
              uid: anonCred.user.uid,
              email: email,
              displayName: name,
              photoURL: "",
              cPoints: 0,
              bPoints: 0,
              easyTestsDone: 0,
              completedQuestions: [],
              solvedHistory: [],
              createdAt: serverTimestamp(),
              dayStreak: 1,
              lastActiveDateIST: todayIST,
              openedDates: [todayIST]
            });
          } catch (writeErr) {
            handleFirestoreError(writeErr, OperationType.WRITE, `users/${anonCred.user.uid}`);
          }

          setTimeout(() => {
            clearInterval(interval);
            setAuthLocalLoading(false);
            setSignUpName("");
            setSignUpEmail("");
            setSignUpPassword("");
          }, 3000);
        } catch (anonError: any) {
          clearInterval(interval);
          setAuthLocalLoading(false);
          setAuthLocalError(anonError.message || "Credential authentication error.");
        }
      }
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLocalError("");
    setAuthSuccessMessage("");

    const email = loginEmail.trim();
    const password = loginPassword.trim();

    if (!email) {
      setAuthLocalError("Please enter your email.");
      return;
    }
    if (!password) {
      setAuthLocalError("Please enter your password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error: any) {
      console.error("Login Error:", error);
      let errorMsg = "Incorrect email address or password.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        errorMsg = "Incorrect email address or password.";
      }
      setAuthLocalError(errorMsg);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await chatWithExpert(
        [...chatMessages, { role: 'user', content: userMessage }], 
        language,
        { points, completedTopics: completedQuestions }
      );
      setChatMessages(prev => [...prev, { role: 'ai', content: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages(prev => [...prev, { role: 'ai', content: "Error connecting to AI Expert." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleQuestionSelect = (q: any) => {
    setSelectedQuestionDetail(q);
    setQuestionAttempts(prev => ({ ...prev, [q.id]: (prev[q.id] || 0) }));
  };

  const handleFormatCode = () => {
    if (!code.trim()) return;
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines = lines.map(line => {
      let trimmed = line.trim();
      
      // Decrease indent for closing braces/brackets BEFORE formatting the line
      if (trimmed.startsWith('}') || trimmed.startsWith(']')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      const formatted = '    '.repeat(indentLevel) + trimmed;
      
      // Increase indent for opening braces/brackets or colons (Python) AFTER formatting the line
      if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith(':')) {
        indentLevel++;
      }
      
      return formatted;
    });
    setCode(formattedLines.join('\n'));
  };

  const handleResetCode = () => {
    showModal({
      title: "Reset Code",
      message: "Are you sure you want to clear all your progress in the editor?",
      type: "warning",
      confirmText: "Yes, Reset",
      cancelText: "Cancel",
      onConfirm: () => setCode("")
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setPoints({ bPoints: 0, cPoints: 0 });
      setEasyTestsDone(0);
      setCompletedQuestions([]);
      setShowSignOutConfirm(false);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const syncPoints = async (newPoints: { bPoints: number, cPoints: number }) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        bPoints: newPoints.bPoints,
        cPoints: newPoints.cPoints
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const addBPoints = (amt: number) => {
    const newPoints = { ...points, bPoints: points.bPoints + amt };
    setPoints(newPoints);
    syncPoints(newPoints);
  };

  const addCPoints = (amt: number) => {
    const newPoints = { ...points, cPoints: points.cPoints + amt };
    setPoints(newPoints);
    syncPoints(newPoints);
  };

  const fetchRecommendation = async () => {
    setIsGettingRec(true);
    const rec = await getRecommendation(points, completedQuestions);
    setAiRecommendation(rec);
    setIsGettingRec(false);
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      showModal({
        title: "Empty Code",
        message: "Please write or paste some code to analyze.",
        type: "warning",
        confirmText: "Got it",
        cancelText: "Close"
      });
      return;
    }
    if (!language) {
      showModal({
        title: "Select Language",
        message: "Please select a programming language before analyzing.",
        type: "warning",
        confirmText: "Got it",
        cancelText: "Close"
      });
      return;
    }
    setIsAnalyzing(true);
    setAnalysis(null); // Clear previous analysis for fresh start
    try {
      // Use a faster analysis call
      const result = await analyzeCode(code, language);
      setAnalysis(result);
      addCPoints(10);

      if (user) {
        try {
          const cacheCollectionRef = collection(db, "user_history_cache");
          // Extract a descriptive title from code or default
          let codeTitle = "Workspace Session";
          const trimmedCode = code.trim();
          const firstLine = trimmedCode.split("\n")[0];
          if (firstLine && firstLine.length < 50) {
            codeTitle = firstLine.replace(/[\/*#`]/g, "").trim() || "Workspace Session";
          }
          // Let's make a testId that represents the session
          const testId = "editor_" + (codeTitle.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase() || "general");
          const hasMistakes = result.mistakes && result.mistakes.length > 0;
          await addDoc(cacheCollectionRef, {
            userId: user.uid,
            timestamp: serverTimestamp(),
            actionType: "editor_submitted",
            payload: {
              testId: testId,
              title: codeTitle,
              code: code,
              language: language,
              isCorrect: !hasMistakes, // Green if clean, Red if has mistakes
              feedback: result.overallFeedback || "Code analyzed successfully.",
              suggestions: result.mistakes ? result.mistakes.map((m: any) => `Line ${m.line || "unknown"}: ${m.description} (Fix: ${m.fix})`) : [],
              pointsAwarded: 10
            },
            strategy: "immutable-append",
            lifecycle: "permanent_cache"
          });
        } catch (cacheErr) {
          console.error("Error appending editor submission to history:", cacheErr);
        }
      }
    } catch (error) {
      console.error(error);
      showModal({
        title: "Analysis Failed",
        message: "I couldn't analyze your code right now. Please try again.",
        type: "warning",
        confirmText: "Retry"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartTest = (test: any) => {
    showModal({
      title: "Solve Mode Selection",
      message: `Would you like to solve "${test.title}" using custom user input?`,
      confirmText: "Yes, User Input Mode",
      cancelText: "No, Standard Mode",
      type: "info",
      onConfirm: () => {
        setSolveWithUserInput(true);
        setActiveTest({ ...test, solveWithUserInput: true });
        setTestFeedback(null);
        setUserInputConfigMap(null);
        setShowPatternSidebar(false);
        setPatternData(null);
        setCode(language ? getBoilerplateCode(test.title || test.question || "Solve", language, true) : "");
        setActiveTab("mentor");
      },
      onCancel: () => {
        setSolveWithUserInput(false);
        setActiveTest({ ...test, solveWithUserInput: false });
        setTestFeedback(null);
        setUserInputConfigMap(null);
        setShowPatternSidebar(false);
        setPatternData(null);
        setCode(language ? getBoilerplateCode(test.title || test.question || "Solve", language, false) : "");
        setActiveTab("mentor");
      }
    });
  };

  const handleVerifySolution = async () => {
    if (!activeTest) return;
    if (!code.trim()) {
      showModal({
        title: "Empty Solution",
        message: "Please write your solution before submitting.",
        type: "warning",
        confirmText: "Got it",
        cancelText: "Close"
      });
      return;
    }
    if (!language) {
      showModal({
        title: "Select Language",
        message: "Please select a programming language for your solution.",
        type: "warning",
        confirmText: "Got it",
        cancelText: "Close"
      });
      return;
    }
    setIsVerifying(true);
    setTestFeedback(null);
    try {
      const result = await verifySolution(activeTest.question, code, language);
      setTestFeedback(result);

      if (result.isCorrect && result.patternAnalysis) {
        setPatternData(result.patternAnalysis);
        setShowPatternSidebar(true);
      }

      if (solveWithUserInput) {
        // 1. Generate text map config
        const configMap = generateTextMapConfig(
          activeTest.title || activeTest.id || "Test",
          activeTest.level || "Easy",
          result.isCorrect
        );
        setUserInputConfigMap(configMap);

        // 2. Serialize history persistence map into local browser memory arrays
        try {
          const localHistory = JSON.parse(localStorage.getItem("codify_user_input_history") || "[]");
          const timestamp = Date.now();
          const historyRecord = {
            sessionId: `session_${timestamp}`,
            streamDomain: "SDE",
            score: result.isCorrect ? 100 : 0,
            executionDate: new Date().toISOString().split('T')[0],
            classificationTag: "Patterns"
          };
          localHistory.push(historyRecord);
          localStorage.setItem("codify_user_input_history", JSON.stringify(localHistory));
        } catch (storageErr) {
          console.error("Error saving to local storage history:", storageErr);
        }

        // 3. Assign numerical increment to target metric track
        if (result.isCorrect) {
          const difficulty = (activeTest.level || "Easy").toLowerCase();
          const updatedMetrics = { ...userInputMetrics };
          if (difficulty === "easy") updatedMetrics.easy += 1;
          else if (difficulty === "medium") updatedMetrics.medium += 1;
          else if (difficulty === "hard") updatedMetrics.hard += 1;

          setUserInputMetrics(updatedMetrics);
          localStorage.setItem("codify_user_input_metrics", JSON.stringify(updatedMetrics));
        }
      }

      if (user) {
        if (result.isCorrect) {
          const newHistory = [...solvedHistory, { ...activeTest, code, date: new Date().toISOString() }];
          const newCompleted = [...completedQuestions, activeTest.id];
          setSolvedHistory(newHistory);
          setCompletedQuestions(newCompleted);
          
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            solvedHistory: newHistory,
            completedQuestions: newCompleted,
            cPoints: points.cPoints + 50 // Bonus for solving test
          });
        }

        try {
          const cacheCollectionRef = collection(db, "user_history_cache");
          await addDoc(cacheCollectionRef, {
            userId: user.uid,
            timestamp: serverTimestamp(),
            actionType: "test_submitted",
            payload: {
              testId: activeTest.id || activeTest.title || "unknown",
              title: activeTest.title || "Unknown Test",
              code: code,
              language: language,
              isCorrect: result.isCorrect,
              feedback: result.feedback || (result.isCorrect ? "Accepted" : "Had issue / Compiler Error"),
              suggestions: result.suggestions || [],
              pointsAwarded: result.isCorrect ? 50 : 0
            },
            strategy: "immutable-append",
            lifecycle: "permanent_cache"
          });
        } catch (cacheErr) {
          console.error("Error appending to user history cache:", cacheErr);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleQuestionClick = (level: string) => {
    const totalSolved = points.cPoints / 10;
    if (level === "Hard" && totalSolved < 10) {
      showModal({
        title: "Insufficient Practice",
        message: "You haven't solved enough questions to attempt Hard level yet. We recommend practicing more Easy and Medium questions first. Proceed anyway?",
        type: "warning",
        confirmText: "Proceed Anyway",
        cancelText: "Go Back",
        onConfirm: () => {
          showModal({ title: "Opening", message: `Opening ${level} question...`, type: "info", confirmText: "OK" });
        }
      });
      return;
    }
    if (level === "Medium" && totalSolved < 5) {
      showModal({
        title: "Insufficient Practice",
        message: "You haven't solved enough questions to attempt Medium level yet. Proceed anyway?",
        type: "warning",
        confirmText: "Proceed Anyway",
        cancelText: "Go Back",
        onConfirm: () => {
          showModal({ title: "Opening", message: `Opening ${level} question...`, type: "info", confirmText: "OK" });
        }
      });
      return;
    }
    showModal({ title: "Opening", message: `Opening ${level} question...`, type: "info", confirmText: "OK" });
  };

  const handleClearDoubt = async (customDoubt?: string) => {
    const doubtToAsk = customDoubt || doubt;
    if (!doubtToAsk.trim() || !selectedText.trim()) return;
    setIsClearingDoubt(true);
    try {
      const response = await clearDoubt(code, selectedText, doubtToAsk, language);
      setDoubtResponse(response || "");
      addBPoints(2); // 2 B points for asking doubt
    } catch (error) {
      console.error(error);
    } finally {
      setIsClearingDoubt(false);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString());
    }
  };

  if (isAuthLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Code2 className="w-12 h-12 text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-4 sm:p-6 overflow-y-auto relative font-sans select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="w-full max-w-md relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
              <Code2 className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              SDE Mentor AI
            </h1>
            <p className="text-sm text-slate-400">
              Sign in to save your streaks, earn points, and track master roadmaps.
            </p>
          </div>

          <Card className="border-slate-800 bg-slate-950/80 backdrop-blur-md shadow-2xl p-6 rounded-3xl relative overflow-hidden">
            {/* Elegant glow effect */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Error Message */}
            {authLocalError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authLocalError}</span>
              </motion.div>
            )}

            {/* Tabs */}
            <Tabs defaultValue={authMode} onValueChange={(val: any) => { setAuthMode(val); setAuthLocalError(""); }} className="w-full">
              <TabsList className="grid grid-cols-2 bg-slate-900 border border-slate-800 rounded-2xl p-1 mb-6">
                <TabsTrigger value="login" className="rounded-xl font-bold text-xs">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-xl font-bold text-xs">
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    <input 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl py-3 mt-2 shadow-lg shadow-indigo-500/15"
                  >
                    Continue
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    <input 
                      type="password" 
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="At least 6 characters" 
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl py-3 mt-2 shadow-lg shadow-indigo-500/15"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-950 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <Button 
              onClick={handleLogin}
              variant="outline" 
              className="w-full border-slate-800 hover:border-slate-700 hover:bg-slate-900 bg-slate-900/40 text-slate-200 hover:text-white font-bold rounded-xl py-2.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" width="24" height="24">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.8 21.56,11.4 21.35,11.1z" fill="#4285F4" />
                  <path d="M12,20.68c2.43,0 4.47,-0.8 5.96,-2.18l-3.3,-2.6c-0.9,0.6 -2.07,0.98 -3.3,0.98c-2.34,0 -4.33,-1.58 -5.04,-3.7H2.88v2.7C4.36,18.8 8.02,20.68,12,20.68z" fill="#34A853" />
                  <path d="M6.96,13.26c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7c0,-0.59 0.1,-1.16 0.28,-1.7V7.16H2.88C2.26,8.4 1.9,9.8 1.9,11.3c0,1.5 0.36,2.9 0.98,4.14L6.96,13.26z" fill="#FBBC05" />
                  <path d="M12,5.92c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.6C16.46,3.15 14.42,2.32 12,2.32c-3.98,0 -7.64,1.88 -9.12,4.84l4.08,3.2C7.67,7.5 9.66,5.92,12,5.92z" fill="#EA4335" />
                </g>
              </svg>
              Google Account
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (authLocalLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white font-sans p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full space-y-6"
        >
          {/* Stunning glowing orbital visual */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-indigo-500 border-b-teal-500 border-l-slate-800"
            />
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-xl font-black text-amber-500">
              {authCountdown}s
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-indigo-400 to-teal-400">
              Preparing Your Experience
            </h2>
            <p className="text-sm text-slate-400 animate-pulse">
              {authCountdown === 3 && "Synthesizing custom AI workspace guidelines..."}
              {authCountdown === 2 && "Synchronizing dynamic India Standard Time (IST) calendar..."}
              {authCountdown === 1 && "Securing persistent progress containers..."}
              {authCountdown === 0 && "Welcome! Redirecting..."}
            </p>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="bg-gradient-to-r from-amber-500 via-indigo-500 to-teal-500 h-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }



  if (routeMode === "ask") {
    return (
      <>
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-6 overflow-y-auto relative">
          
          {/* Top Right Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <button
              onClick={() => setIsStreakModalOpen(true)}
              className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/20 text-xs font-extrabold hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer hover:shadow-[0_0_12px_rgba(245,158,11,0.15)] group"
              title="Click to view Consistency Calendar"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-500 group-hover:animate-bounce" />
              <span>{dayStreak} Day Streak</span>
            </button>
            <button
              onClick={() => setShowSignOutConfirm(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/30 hover:bg-slate-950 text-slate-400 hover:text-rose-450 hover:text-rose-400 hover:border-slate-700 hover:shadow-lg transition-all text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              Sign Out
            </button>
          </div>

          <div className="max-w-4xl w-full text-center space-y-4 mb-8">
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mx-auto p-4 bg-teal-500/10 text-teal-400 rounded-2xl w-fit border border-teal-500/20 shadow-xl shadow-teal-500/5 mb-4"
            >
              <GraduationCap className="w-12 h-12" />
            </motion.div>
            <AdaptiveGreeting userName={user?.displayName || user?.email?.split('@')[0] || "Developer"} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
            {/* Card A: CodePath Beginner */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-8 bg-slate-950 border border-slate-800 hover:border-teal-500/50 rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-teal-500/5 transition duration-300 relative overflow-hidden flex flex-col justify-between group"
              onClick={() => setRouteMode("codepath")}
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">Absolute Scratch Route</span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2 mt-2">CodePath Academy</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Step-by-step roadmap tailored for total beginners. Beautiful analogies, graphic memory models, and active concept mastery. Supports Java, Python, C, and C++.
                </p>
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {["Python", "Java", "C", "C++"].map((l) => (
                    <span key={l} className="text-[9px] bg-slate-900 border border-slate-805 text-slate-400 text-center py-1 rounded-lg font-mono">{l}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-teal-400 font-bold text-xs">
                <span>Start Learning Roadmap</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Card B: Professional AI Workspace */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-8 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/5 transition duration-300 relative overflow-hidden flex flex-col justify-between group"
              onClick={() => setRouteMode("mentor")}
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">Interactive Coding Workspace</span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2 mt-2">AI Mentor & Core Sheets</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Analyze complex solutions, consult with an AI Coach on tricky algorithms, and solve curated OOPS, DSA, & Computer Science sheets with real-time test runs.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {["OOPS Sheets", "DSA Cards", "Core CS Tests"].map((t) => (
                    <span key={t} className="text-[9px] bg-slate-900 border border-slate-805 text-slate-400 text-center py-1 rounded-lg font-mono">{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-indigo-400 font-bold text-xs">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>

        {showSignOutConfirm && (
          <SignOutConfirmModal 
            onConfirm={handleLogout} 
            onClose={() => setShowSignOutConfirm(false)}
            isDarkMode={true}
          />
        )}
        <StreakCalendarModal 
          isOpen={isStreakModalOpen} 
          onClose={() => setIsStreakModalOpen(false)}
          dayStreak={dayStreak}
          openedDates={openedDates}
          isDarkMode={isDarkMode}
        />
      </>
    );
  }

  if (routeMode === "codepath") {
    return (
      <>
        <CodePathBeginner 
          user={user} 
          onBackToDashboard={() => setRouteMode("ask")} 
          onLogoutTrigger={() => setShowSignOutConfirm(true)}
          dayStreak={dayStreak}
          onStreakClick={() => setIsStreakModalOpen(true)}
        />
        {showSignOutConfirm && (
          <SignOutConfirmModal 
            onConfirm={handleLogout} 
            onClose={() => setShowSignOutConfirm(false)}
            isDarkMode={true}
          />
        )}
        <StreakCalendarModal 
          isOpen={isStreakModalOpen} 
          onClose={() => setIsStreakModalOpen(false)}
          dayStreak={dayStreak}
          openedDates={openedDates}
          isDarkMode={isDarkMode}
        />
      </>
    );
  }

  const easyCount = completedQuestions.filter(id => id.startsWith("e")).length + userInputMetrics.easy;
  const mediumCount = completedQuestions.filter(id => id.startsWith("m")).length + userInputMetrics.medium;
  const hardCount = completedQuestions.filter(id => id.startsWith("h")).length + userInputMetrics.hard;
  const totalCount = easyCount + mediumCount + hardCount;

  const chartData = [
    { name: "Easy", value: easyCount },
    { name: "Medium", value: mediumCount },
    { name: "Hard", value: hardCount },
    { name: "Remaining", value: Math.max(0, 50 - totalCount) }
  ];
  const COLORS = ["#10b981", "#f59e0b", "#ef4444", isDarkMode ? "#334155" : "#e2e8f0"];

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans overflow-hidden">
          <Modal 
            isOpen={modalConfig.isOpen} 
            onClose={closeModal} 
            title={modalConfig.title} 
            message={modalConfig.message} 
            onConfirm={modalConfig.onConfirm}
            confirmText={modalConfig.confirmText}
            cancelText={modalConfig.cancelText}
            type={modalConfig.type}
          />
          {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}>
          <div className="p-6 flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => window.location.href = '/'}
            >
              <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Codify
              </h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="relative group">
                <div 
                  className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-500 transition-all"
                  onClick={() => {
                    const logoutBtn = document.getElementById('profile-logout-btn');
                    if (logoutBtn) logoutBtn.classList.toggle('hidden');
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} className="w-10 h-10 rounded-full border-2 border-indigo-600" alt="Profile" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                        {user.displayName?.[0] || user.email?.[0] || "U"}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold truncate">{user.displayName || "User"}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="h-32 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center -mt-20">
                      <p className="text-lg font-bold">{completedQuestions.length}</p>
                      <p className="text-[8px] text-slate-500 uppercase">Solved</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsStreakModalOpen(true);
                    }}
                    className="w-full mb-3 flex items-center justify-between bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 p-2.5 rounded-xl border border-amber-500/20 text-xs font-bold transition-all cursor-pointer group"
                    title="Click to view your Consistency Calendar"
                  >
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 fill-amber-500 group-hover:animate-bounce" />
                      <span>Consistency Streak</span>
                    </div>
                    <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md font-extrabold text-[10px]">
                      {dayStreak} Days
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white dark:bg-slate-950 p-2 rounded-lg text-center border border-slate-200 dark:border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">C Points</p>
                      <p className="text-sm font-bold text-amber-500">{points.cPoints}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-950 p-2 rounded-lg text-center border border-slate-200 dark:border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">B Points</p>
                      <p className="text-sm font-bold text-indigo-500">{points.bPoints}</p>
                    </div>
                  </div>
                </div>

                {/* Hidden Logout Button */}
                <div id="profile-logout-btn" className="hidden absolute top-full left-0 right-0 mt-2 z-10">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowSignOutConfirm(true)}
                    className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 rounded-xl text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-slate-900 border border-teal-500/20 dark:border-teal-500/10 mb-2 font-bold"
                  onClick={() => setRouteMode("ask")}
                >
                  <GraduationCap className="w-4 h-4 text-teal-500" /> Switch Pathway
                </Button>
                <Button 
                  variant={activeTab === "mentor" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => setActiveTab("mentor")}
                >
                  <Sparkles className="w-4 h-4" /> Mentor
                </Button>
                <Button 
                  variant={activeTab === "challenges" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => { setActiveTab("challenges"); setSelectedCategory(null); }}
                >
                  <Trophy className="w-4 h-4" /> Challenges
                </Button>
                <Button 
                  variant={activeTab === "tests" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => setActiveTab("tests")}
                >
                  <ClipboardCheck className="w-4 h-4" /> Tests
                </Button>
                <Button 
                  variant={activeTab === "history" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => setActiveTab("history")}
                >
                  <History className="w-4 h-4" /> History
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/10 font-bold cursor-pointer"
                  onClick={() => setShowSignOutConfirm(true)}
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>

              {/* External Links */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase px-2">Track Progress</p>
                <div className="grid grid-cols-2 gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-[9px] justify-start gap-1 px-2 border-slate-200 dark:border-slate-800"
                    onClick={() => window.open("https://leetcode.com", "_blank")}
                  >
                    LeetCode <ExternalLink className="w-2 h-2 ml-auto opacity-50" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-[9px] justify-start gap-1 px-2 border-slate-200 dark:border-slate-800"
                    onClick={() => window.open("https://codeforces.com", "_blank")}
                  >
                    Codeforces <ExternalLink className="w-2 h-2 ml-auto opacity-50" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-[9px] justify-start gap-1 px-2 border-slate-200 dark:border-slate-800"
                    onClick={() => window.open("https://codechef.com", "_blank")}
                  >
                    CodeChef <ExternalLink className="w-2 h-2 ml-auto opacity-50" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-[9px] justify-start gap-1 px-2 border-slate-200 dark:border-slate-800"
                    onClick={() => window.open("https://geeksforgeeks.org", "_blank")}
                  >
                    GFG <ExternalLink className="w-2 h-2 ml-auto opacity-50" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <p className="text-[10px] text-slate-500 text-center">Codify v1.0.0</p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Badge variant="secondary" className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-wider">v2.5</Badge>
              <h2 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest truncate max-w-[150px] md:max-w-none">
                {activeTab === "mentor" ? "Practice Mentor" : activeTab === "challenges" ? "Learning Challenges" : activeTab === "tests" ? "Skill Tests" : "Solved History"}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-full">
                <Snowflake className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Problem of the Day</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="sm" className="gap-2 min-w-[140px]">
                    {language ? LANGUAGES.find(l => l.id === language)?.name : "Select Language"}
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.id} 
                      onClick={() => {
                        setLanguage(lang.id);
                        if (activeTest && (!code.trim() || code.includes("class Solution") || code.includes("// Select a language") || code.includes("public class Solution") || code.startsWith("#include") || code.startsWith("import java"))) {
                          setCode(getBoilerplateCode(activeTest.title || activeTest.question || "Solve", lang.id, activeTest.solveWithUserInput || solveWithUserInput));
                        }
                      }}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-full"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === "mentor" ? (
              <motion.div 
                key="mentor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left Column: Editor */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {activeTest && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg mb-2"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          {activeTest.title}
                        </h3>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setActiveTest(null)}>
                          Exit Test
                        </Button>
                      </div>
                      <p className="text-sm opacity-90" onMouseUp={handleTextSelection}>{activeTest.question}</p>
                    </motion.div>
                  )}

                  {activeTest && solveWithUserInput && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md mb-2 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Keyboard className="w-3.5 h-3.5 text-indigo-500" />
                          Custom User Input
                        </span>
                        <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50 text-[10px]">
                          User Input Mode Active
                        </Badge>
                      </div>
                      <textarea
                        value={customUserInputText}
                        onChange={(e) => setCustomUserInputText(e.target.value)}
                        placeholder="Provide your custom runtime input here (e.g. array, target value, or arguments)..."
                        className="w-full h-20 p-3 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
                      />
                    </motion.div>
                  )}

                  <Card className={`border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-[70] h-auto' : 'h-[600px]'}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-indigo-500" />
                          Code Editor
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {activeTest ? "Solve the challenge above" : "Paste your code here to get mentored"}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={handleResetCode}
                              className="h-8 w-8 text-slate-500 hover:text-red-500"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Reset Code</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={handleFormatCode}
                              className="h-8 w-8 text-slate-500 hover:text-indigo-500"
                            >
                              <FileCode className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Format Code</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => setIsFullscreen(!isFullscreen)}
                              className="h-8 w-8 text-slate-500 hover:text-indigo-500"
                            >
                              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
                        </Tooltip>

                        <Separator orientation="vertical" className="h-4 my-auto mx-1" />

                        {activeTest ? (
                          <Button 
                            size="sm" 
                            onClick={handleVerifySolution} 
                            disabled={isVerifying || !code.trim()}
                            className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg shadow-green-500/20"
                          >
                            {isVerifying ? "Verifying..." : "Submit Solution"}
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={handleAnalyze} 
                            disabled={isAnalyzing || !code.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-500/20"
                          >
                            {isAnalyzing ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Sparkles className="w-4 h-4" />
                              </motion.div>
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                            Analyze
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-hidden relative">
                      <ScrollArea className="h-full w-full bg-slate-950">
                        <div onMouseUp={handleTextSelection}>
                          <Editor
                            value={code}
                            onValueChange={(newCode) => {
                              if (language === 'python') {
                                // Simple Python auto-indent logic
                                const lines = newCode.split('\n');
                                const lastLine = lines[lines.length - 2];
                                if (lastLine?.trim().endsWith(':')) {
                                  const currentIndent = lastLine.match(/^\s*/)?.[0] || "";
                                  const nextLine = lines[lines.length - 1];
                                  if (nextLine === "") {
                                    setCode(newCode + currentIndent + "    ");
                                    return;
                                  }
                                }
                              }
                              setCode(newCode);
                            }}
                            highlight={(code) => {
                              if (selectedText && doubtResponse && code.includes(selectedText)) {
                                const parts = code.split(selectedText);
                                return parts.map(p => highlight(p, (languages as any)[language] || languages.javascript, language))
                                  .join('<span class="bg-indigo-500/40 border-b-2 border-indigo-400 ring-1 ring-indigo-400/50 rounded-sm px-0.5">' + selectedText + '</span>');
                              }
                              return highlight(code, (languages as any)[language] || languages.javascript, language);
                            }}
                            padding={20}
                            style={{
                              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                              fontSize: 14,
                              minHeight: "100%",
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Tab') {
                                e.preventDefault();
                                const start = (e.target as HTMLTextAreaElement).selectionStart;
                                const end = (e.target as HTMLTextAreaElement).selectionEnd;
                                const val = code.substring(0, start) + "    " + code.substring(end);
                                setCode(val);
                                setTimeout(() => {
                                  (e.target as HTMLTextAreaElement).selectionStart = (e.target as HTMLTextAreaElement).selectionEnd = start + 4;
                                }, 0);
                              }
                            }}
                            className="min-h-full outline-none"
                          />
                        </div>
                      </ScrollArea>
                      
                      {selectedText && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-4 left-4 right-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                              <HelpCircle className="w-3 h-3" />
                              Selected Snippet
                            </span>
                            <div className="flex gap-1">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-6 text-[10px] gap-1"
                                onClick={() => handleClearDoubt("Explain this problem or concept in the simplest way possible.")}
                              >
                                <Sparkles className="w-3 h-3 text-amber-500" />
                                Explain Simply
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-6 text-[10px] gap-1"
                                onClick={() => handleClearDoubt("Why is this line returned or what is its purpose?")}
                              >
                                <Play className="w-3 h-3" />
                                Why this line?
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => setSelectedText("")}>Clear</Button>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="What's confusing about this part?" 
                              className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 ring-indigo-500 outline-none"
                              value={doubt}
                              onChange={(e) => setDoubt(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleClearDoubt()}
                            />
                            <Button size="sm" onClick={() => handleClearDoubt()} disabled={isClearingDoubt || !doubt.trim()}>
                              {isClearingDoubt ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <RefreshCw className="w-4 h-4" />
                                </motion.div>
                              ) : (
                                "Ask AI"
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {doubtResponse && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">Virtual Mentor Explanation</h3>
                      </div>
                      
                      {selectedText && (
                        <div className="mb-4 p-3 bg-slate-900 rounded-xl border border-indigo-500/30 overflow-hidden">
                          <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1 tracking-widest">Explaining this part:</p>
                          <code className="text-xs text-indigo-100 font-mono block whitespace-pre-wrap break-all">
                            {selectedText}
                          </code>
                        </div>
                      )}

                      <div className="prose prose-sm dark:prose-invert max-w-none bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                        <ReactMarkdown>{doubtResponse}</ReactMarkdown>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-4 text-indigo-600 dark:text-indigo-400" onClick={() => { setDoubtResponse(""); setSelectedText(""); }}>
                        Close Explanation
                      </Button>
                    </motion.div>
                  )}

                  {isVerifying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 rounded-2xl shadow-xl font-mono text-xs space-y-4 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-pulse" />
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="w-3 h-3 rounded-full bg-amber-500" />
                          <span className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider ml-2">Codify Test Runner</span>
                        </div>
                        <span className="text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase animate-pulse">
                          Running Sandbox
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-400 font-extrabold">
                          <Terminal className="w-4 h-4 animate-pulse" />
                          <span>Verifying solution structure ({language})...</span>
                        </div>
                        
                        <div className="space-y-2 pl-2 border-l border-slate-900 mt-2">
                          {[
                            "🔧 Preparing sandbox container for code run...",
                            "📝 Parsing syntax correctness & validating structure...",
                            "🔬 Running unit test suites & edge case scenarios...",
                            "📊 Measuring space-time complexity (Big-O analysis)...",
                            "🤖 Assembling grading results & AI optimizations..."
                          ].map((step, idx) => {
                            const isPast = verificationStep > idx;
                            const isActive = verificationStep === idx;
                            return (
                              <div key={idx} className={`flex items-center gap-2.5 transition-all duration-300 ${isPast ? 'text-emerald-400' : isActive ? 'text-indigo-400 font-bold' : 'text-slate-500 opacity-40'}`}>
                                {isPast ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                ) : isActive ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 shrink-0" />
                                )}
                                <span className={isActive ? 'animate-pulse' : ''}>{step}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {testFeedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-6 border rounded-2xl shadow-lg ${testFeedback.isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/50' : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50'}`}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`p-2 rounded-lg ${testFeedback.isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
                          {testFeedback.isCorrect ? <CheckCircle2 className="w-5 h-5 text-white" /> : <AlertCircle className="w-5 h-5 text-white" />}
                        </div>
                        <h3 className={`font-semibold ${testFeedback.isCorrect ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                          {testFeedback.isCorrect ? 'Correct Solution!' : 'Incorrect Solution'}
                        </h3>
                      </div>
                      <p className="text-sm mb-4 opacity-90">{testFeedback.feedback}</p>
                      {testFeedback.suggestions.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase opacity-60">Suggestions to Improvise:</p>
                          <ul className="list-disc list-inside text-xs space-y-1 opacity-80">
                            {testFeedback.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                      )}
                      {userInputConfigMap && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-bold uppercase opacity-60">Session Metrics Map Config:</p>
                          <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 font-mono text-xs select-all whitespace-pre">
                            {userInputConfigMap}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="mt-4" onClick={() => setTestFeedback(null)}>
                          Close
                        </Button>
                        {patternData && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4 border-green-300 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-950/40"
                            onClick={() => setShowPatternSidebar(true)}
                          >
                            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                            Review Pattern
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Column: Analysis */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {!analysis && !isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-12 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl opacity-60">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Code2 className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                      <p className="text-sm text-slate-500 max-w-[250px]">
                        Paste your code and click analyze to see mistakes and learn new concepts.
                      </p>
                    </div>
                  ) : isAnalyzing ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 rounded-2xl shadow-xl font-mono text-xs space-y-4 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-pulse" />
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="w-3 h-3 rounded-full bg-amber-500" />
                          <span className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider ml-2">Codify Analyzer Engine</span>
                        </div>
                        <span className="text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase animate-pulse">
                          Analyzing AST
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-400 font-extrabold">
                          <Terminal className="w-4 h-4 animate-pulse" />
                          <span>Scanning source code for optimization leaks...</span>
                        </div>
                        
                        <div className="space-y-2 pl-2 border-l border-slate-900 mt-2">
                          {[
                            "🔍 Initializing static AST analyzer tools...",
                            "📁 Locating functions & variable bindings...",
                            "🧠 Evaluating code complexity against standard patterns...",
                            "💡 Drafting performance optimization templates...",
                            "🤖 Generating diagnostic breakdown reports..."
                          ].map((step, idx) => {
                            const isPast = verificationStep > idx;
                            const isActive = verificationStep === idx;
                            return (
                              <div key={idx} className={`flex items-center gap-2.5 transition-all duration-300 ${isPast ? 'text-emerald-400' : isActive ? 'text-indigo-400 font-bold' : 'text-slate-500 opacity-40'}`}>
                                {isPast ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                ) : isActive ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 shrink-0" />
                                )}
                                <span className={isActive ? 'animate-pulse' : ''}>{step}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6"
                      >
                        <Tabs defaultValue="mistakes" className="w-full">
                          <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 bg-slate-100 dark:bg-slate-900">
                            <TabsTrigger value="mistakes" className="rounded-lg gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Mistakes
                            </TabsTrigger>
                            <TabsTrigger value="confusing" className="rounded-lg gap-2">
                              <HelpCircle className="w-4 h-4" />
                              Logic
                            </TabsTrigger>
                            <TabsTrigger value="concepts" className="rounded-lg gap-2">
                              <BookOpen className="w-4 h-4" />
                              Learn
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="mistakes" className="mt-4">
                            <ScrollArea className="h-[500px] lg:h-[600px] pr-4 overflow-y-auto">
                              <div className="flex flex-col gap-4">
                                {analysis?.mistakes.length === 0 ? (
                                  <div className="p-8 text-center bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-2xl">
                                    <Sparkles className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <p className="text-green-700 dark:text-green-400 font-medium">No mistakes found! Great job.</p>
                                  </div>
                                ) : (
                                  analysis?.mistakes.map((m, i) => (
                                    <Card key={i} className="border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-950/10">
                                      <CardHeader className="p-4 pb-2">
                                        <div className="flex items-center justify-between">
                                          <Badge variant="destructive" className="text-[10px]">Line {m.line}</Badge>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="p-4 pt-0">
                                        <p className="text-sm font-medium text-red-900 dark:text-red-200 mb-2">{m.description}</p>
                                        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-red-100 dark:border-red-900/30">
                                          <p className="text-xs font-mono text-green-600 dark:text-green-400">Fix: {m.fix}</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))
                                )}
                              </div>
                            </ScrollArea>
                          </TabsContent>

                          <TabsContent value="confusing" className="mt-4">
                            <ScrollArea className="h-[500px] lg:h-[600px] pr-4 overflow-y-auto">
                              <div className="flex flex-col gap-4">
                                {analysis?.confusingParts.map((p, i) => (
                                  <Card key={i} className="border-slate-200 dark:border-slate-800">
                                    <CardHeader className="p-4 pb-2">
                                      <code className="text-xs bg-slate-100 dark:bg-slate-800 p-1 rounded font-mono truncate block">
                                        {p.block}
                                      </code>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                      <p className="text-sm text-slate-600 dark:text-slate-400">{p.explanation}</p>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </ScrollArea>
                          </TabsContent>

                          <TabsContent value="concepts" className="mt-4">
                            <ScrollArea className="h-[500px] lg:h-[600px] pr-4 overflow-y-auto">
                              <div className="flex flex-col gap-4">
                                {analysis?.concepts.map((c, i) => (
                                  <Card key={i} className="border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/10">
                                    <CardHeader className="p-4 pb-2">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <Lightbulb className="w-4 h-4 text-indigo-500" />
                                        {c.title}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">{c.description}</p>
                                      <div className="p-3 bg-slate-950 rounded-lg">
                                        <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold tracking-widest">Example</p>
                                        <code className="text-xs font-mono text-indigo-400 block whitespace-pre-wrap">
                                          {c.example}
                                        </code>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </ScrollArea>
                          </TabsContent>
                        </Tabs>

                        <Card className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-none shadow-xl shadow-indigo-500/20">
                          <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Sparkles className="w-5 h-5" />
                              Mentor's Feedback
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6 pt-0" onMouseUp={handleTextSelection}>
                            <p className="text-sm leading-relaxed opacity-90">
                              {analysis?.overallFeedback}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </motion.div>
            ) : activeTab === "challenges" ? (
              <motion.div 
                key="challenges"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {selectedQuestionDetail ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" onClick={() => setSelectedQuestionDetail(null)} className="gap-2">
                        <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
                      </Button>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-800/50">
                          <Zap className="w-4 h-4 fill-amber-500" />
                          <span className="text-xs">3 Tries Left</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 border-indigo-200 dark:border-indigo-800"
                          onClick={() => {
                            showModal({
                              title: `${selectedQuestionDetail.title} - Solutions`,
                              message: "Viewing solutions in all supported languages.",
                              type: "info",
                              confirmText: "Close"
                            });
                          }}
                        >
                          <FileCode className="w-4 h-4 text-indigo-500" />
                          View Solutions
                        </Button>
                      </div>
                    </div>

                    {(selectedQuestionDetail.role || selectedQuestionDetail.pattern) && (
                      <Card className="border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-r from-indigo-50/50 to-slate-50 dark:from-indigo-950/20 dark:to-slate-900/50 shadow-sm">
                        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-bold text-slate-900 dark:text-slate-100">{selectedQuestionDetail.title}</span>
                            {selectedQuestionDetail.role && (
                              <Badge variant="secondary" className={`text-[10px] font-bold uppercase ${selectedQuestionDetail.role === 'Primary Classic' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'}`}>
                                {selectedQuestionDetail.role}
                              </Badge>
                            )}
                            {selectedQuestionDetail.pattern && (
                              <Badge variant="outline" className="text-[10px] border-indigo-300 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300">
                                {selectedQuestionDetail.pattern}
                              </Badge>
                            )}
                            <Badge variant="outline" className={`text-[10px] font-bold ${selectedQuestionDetail.level === 'Easy' ? 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400' : selectedQuestionDetail.level === 'Medium' ? 'border-amber-500/50 text-amber-600 dark:text-amber-400' : 'border-rose-500/50 text-rose-600 dark:text-rose-400'}`}>
                              {selectedQuestionDetail.level}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <Card className="border-slate-200 dark:border-slate-800">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-indigo-500" />
                              Problem Description
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="prose prose-sm dark:prose-invert max-w-none" onMouseUp={handleTextSelection}>
                            <ReactMarkdown>{selectedQuestionDetail.description}</ReactMarkdown>
                          </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="border-slate-200 dark:border-slate-800">
                            <CardHeader>
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                Examples
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {selectedQuestionDetail.examples?.map((ex: any, i: number) => (
                                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Example {i + 1}</p>
                                  <div className="space-y-1 text-xs">
                                    <p><span className="font-bold text-indigo-600 dark:text-indigo-400">Input:</span> {ex.input}</p>
                                    <p><span className="font-bold text-indigo-600 dark:text-indigo-400">Output:</span> {ex.output}</p>
                                    {ex.explanation && <p className="text-slate-500 italic mt-1">{ex.explanation}</p>}
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>

                          <Card className="border-slate-200 dark:border-slate-800">
                            <CardHeader>
                              <CardTitle className="text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                Constraints
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc list-inside space-y-1">
                                {selectedQuestionDetail.constraints?.map((c: string, i: number) => (
                                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400">{c}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Card className="bg-indigo-600 text-white border-none shadow-xl shadow-indigo-500/20">
                          <CardHeader>
                            <CardTitle className="text-lg">Ready to solve?</CardTitle>
                            <CardDescription className="text-indigo-100">Implement your solution in the editor.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex flex-col gap-2 p-3 bg-white/10 rounded-xl">
                              <span className="text-xs font-semibold text-white">Execution Mode:</span>
                              <div className="flex gap-2">
                                <Button 
                                  variant={solveWithUserInput ? "ghost" : "default"} 
                                  size="sm" 
                                  className={`flex-1 text-xs ${!solveWithUserInput ? 'bg-white text-indigo-600 hover:bg-white' : 'text-white border border-white/20 hover:bg-white/10'}`}
                                  onClick={() => setSolveWithUserInput(false)}
                                >
                                  Standard
                                </Button>
                                <Button 
                                  variant={solveWithUserInput ? "default" : "ghost"} 
                                  size="sm" 
                                  className={`flex-1 text-xs ${solveWithUserInput ? 'bg-white text-indigo-600 hover:bg-white' : 'text-white border border-white/20 hover:bg-white/10'}`}
                                  onClick={() => setSolveWithUserInput(true)}
                                >
                                  User Input
                                </Button>
                              </div>
                              <p className="text-[10px] text-indigo-100 italic mt-1">
                                {solveWithUserInput 
                                  ? "Will prompt for input & generate key-value persistence mappings."
                                  : "Standard automated solution grading."}
                              </p>
                            </div>

                            <Button 
                              className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold"
                              onClick={() => {
                                setActiveTest({ ...selectedQuestionDetail, question: selectedQuestionDetail.description, solveWithUserInput });
                                setUserInputConfigMap(null);
                                setShowPatternSidebar(false);
                                setPatternData(null);
                                setCode(language ? getBoilerplateCode(selectedQuestionDetail.title || selectedQuestionDetail.description, language, solveWithUserInput) : "");
                                setActiveTab("mentor");
                              }}
                            >
                              Open in Editor
                            </Button>
                          </CardContent>
                        </Card>

                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">Pro Tip</h4>
                          </div>
                          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                            Try to solve it using a Hash Map for O(n) time complexity!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedCategory ? (
                  <div className="space-y-6">
                    <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="gap-2">
                      <ChevronRight className="w-4 h-4 rotate-180" /> Back to Categories
                    </Button>
                    {selectedCategory === "DSA Sheets" ? (
                      <TUFStyleSheet 
                        onSelectQuestion={handleQuestionSelect} 
                        completedIds={completedQuestions} 
                      />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(CHALLENGE_DATA as any)[selectedCategory].map((topic: any, idx: number) => (
                        <Card key={idx} className="border-slate-200 dark:border-slate-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center justify-between">
                              <span>{topic.title}</span>
                              {topic.pattern && (
                                <Badge variant="secondary" className="text-[10px] bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                  {topic.pattern}
                                </Badge>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {topic.questions && topic.questions.length > 0 ? (
                                topic.questions.map((q: any, qIdx: number) => (
                                  <motion.div 
                                    key={qIdx} 
                                    whileHover={{ scale: 1.01, x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 100 }}
                                    onDragEnd={(_, info) => {
                                      if (info.offset.x > 50) setIsHelpOpen(true);
                                    }}
                                    className="flex items-center justify-between p-3.5 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/60 rounded-xl group cursor-pointer hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md transition-all duration-200" 
                                    onClick={() => q.description ? handleQuestionSelect(q) : handleQuestionClick(q.level)}
                                  >
                                    <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${q.level === 'Easy' ? 'bg-emerald-500' : q.level === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                                        <span className="text-sm font-semibold truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{q.title}</span>
                                        {q.role && (
                                          <Badge variant="secondary" className={`text-[9px] font-bold tracking-wide uppercase ${q.role === 'Primary Classic' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'}`}>
                                            {q.role}
                                          </Badge>
                                        )}
                                        {q.id && (
                                          <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold ml-auto sm:ml-0">
                                            <Zap className="w-3 h-3 fill-amber-500" />
                                            ({3 - (questionAttempts[q.id] || 0)} tries)
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {q.solutions && (
                                        <Badge variant="secondary" className="text-[9px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Solutions</Badge>
                                      )}
                                      <Badge variant="outline" className={`text-[10px] font-bold ${q.level === 'Easy' ? 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400' : q.level === 'Medium' ? 'border-amber-500/50 text-amber-600 dark:text-amber-400' : 'border-rose-500/50 text-rose-600 dark:text-rose-400'}`}>
                                        {q.level}
                                      </Badge>
                                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="text-xs text-slate-400 dark:text-slate-500 italic text-center py-2">
                                  No questions available in this sheet.
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: "OOPS", icon: <Cpu className="w-6 h-6" />, desc: "Master Object Oriented Programming concepts.", locked: false },
                      { title: "DSA Sheets", icon: <Binary className="w-6 h-6" />, desc: "Curated lists of Data Structures & Algorithms.", locked: false },
                      { title: "Patterns", icon: <Compass className="w-6 h-6" />, desc: "Evaluate your ability to spot and match algorithmic code patterns.", locked: false },
                      { title: "Interview Questions", icon: <HelpCircle className="w-6 h-6" />, desc: "Top questions asked in technical interviews.", locked: easyTestsDone < 2, lockMsg: "Locked: Complete 2 Easy tests to unlock" },
                      { title: "Core CS Subjects", icon: <GraduationCap className="w-6 h-6" />, desc: "OS, DBMS, Networking and more.", locked: false },
                      { title: "CS Fundamentals", icon: <BookOpen className="w-6 h-6" />, desc: "The building blocks of computer science.", locked: false },
                    ].map((item, idx) => (
                      <Card key={idx} className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-slate-200 dark:border-slate-800 ${item.locked ? 'opacity-75 grayscale' : 'cursor-pointer hover:-translate-y-1'}`} onClick={() => !item.locked && setSelectedCategory(item.title)}>
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${item.locked ? 'bg-slate-200 dark:bg-slate-800' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'}`}>
                            {item.icon}
                          </div>
                          <CardTitle className="flex items-center gap-2">
                            {item.title}
                            {item.locked && <Lock className="w-4 h-4 text-slate-400" />}
                          </CardTitle>
                          <CardDescription>{item.desc}</CardDescription>
                        </CardHeader>
                        {item.locked && (
                          <div className="absolute inset-0 bg-slate-950/10 dark:bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center p-6 text-center">
                            <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 shadow-xl py-2 px-4">
                              {item.lockMsg}
                            </Badge>
                          </div>
                        )}
                        {!item.locked && (
                          <CardContent>
                            <Button variant="ghost" size="sm" className="p-0 text-indigo-600 dark:text-indigo-400 hover:bg-transparent group-hover:translate-x-1 transition-transform">
                              Explore Challenges <ChevronRight className="w-4 h-4" />
                            </Button>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeTab === "tests" ? (
              <motion.div 
                key="tests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {(Object.keys(TEST_DATA) as Array<keyof typeof TEST_DATA>).map((level) => (
                  <Card key={level} className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-2xl group transition-all duration-300">
                    <div className={`h-2 bg-gradient-to-r ${level === 'Easy' ? 'from-green-500 to-emerald-600' : level === 'Medium' ? 'from-amber-500 to-orange-600' : 'from-red-500 to-rose-600'}`} />
                    <CardHeader className="text-center pt-8">
                      <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {level === 'Easy' ? <Sparkles className="w-8 h-8 text-green-500" /> : level === 'Medium' ? <Zap className="w-8 h-8 text-amber-500" /> : <Trophy className="w-8 h-8 text-red-500" />}
                      </div>
                      <CardTitle className="text-2xl">{level}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-8">
                      {TEST_DATA[level].map((test) => (
                        <div key={test.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-colors group/item">
                          <h4 className="text-sm font-bold mb-1">{test.title}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full text-indigo-600 dark:text-indigo-400 p-0 h-auto justify-start gap-2 hover:bg-transparent"
                            onClick={() => handleStartTest(test)}
                          >
                            Solve Now <ChevronRight className="w-4 h-4 group-hover/item:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {(() => {
                  const testSubmissions = cachedHistory.filter(r => r.actionType === "test_submitted");
                  const editorSubmissions = cachedHistory.filter(r => r.actionType === "editor_submitted");

                  const activeSubmissions = historySubTab === "tests" ? testSubmissions : editorSubmissions;

                  // Group code submissions by test ID or title
                  const groupedSubmissions = activeSubmissions.reduce((acc: Record<string, any>, record: any) => {
                    const title = record.payload?.title || (historySubTab === "tests" ? "Unknown Challenge" : "Workspace Code");
                    const testId = record.payload?.testId || title;
                    if (!acc[testId]) {
                      acc[testId] = {
                        testId,
                        title,
                        attempts: [],
                        isSolved: false,
                        latestTimestamp: record.dateObj
                      };
                    }
                    acc[testId].attempts.push(record);
                    if (record.payload?.isCorrect) {
                      acc[testId].isSolved = true;
                    }
                    if (new Date(record.dateObj).getTime() > new Date(acc[testId].latestTimestamp).getTime()) {
                      acc[testId].latestTimestamp = record.dateObj;
                    }
                    return acc;
                  }, {});

                  const sortedGroupedList = Object.values(groupedSubmissions).sort((a: any, b: any) => {
                    return new Date(b.latestTimestamp).getTime() - new Date(a.latestTimestamp).getTime();
                  });

                  return (
                    <div className="space-y-6">
                      {/* Clean Filter Sub-Tabs */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-850 self-start">
                          <button
                            onClick={() => setHistorySubTab("tests")}
                            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                              historySubTab === "tests"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-900"
                            }`}
                          >
                            <Trophy className="w-4 h-4" />
                            Test Submissions ({testSubmissions.length})
                          </button>
                          <button
                            onClick={() => setHistorySubTab("editor")}
                            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                              historySubTab === "editor"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-900"
                            }`}
                          >
                            <Code className="w-4 h-4" />
                            Code Editor Submissions ({editorSubmissions.length})
                          </button>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          Total attempts tracked: {cachedHistory.length}
                        </span>
                      </div>

                      {/* Grouped Questions List */}
                      {sortedGroupedList.length === 0 ? (
                        <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                          <History className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
                          <h3 className="text-lg font-medium">No Submissions Found</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            {historySubTab === "tests" 
                              ? "Complete coding tests or challenges to view your graded attempts here." 
                              : "Analyze custom code inside the Editor tab to view your compiled history records here."}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {sortedGroupedList.map((group: any) => (
                            <Card 
                              key={group.testId} 
                              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                              onClick={() => setSelectedHistoryQuestion(group)}
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg ${
                                    group.isSolved 
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                                  }`}>
                                    {group.isSolved ? "Solved" : "Unsolved"}
                                  </span>
                                  <span className="text-xs text-slate-400 font-mono">
                                    {group.attempts.length} {group.attempts.length === 1 ? "Attempt" : "Attempts"}
                                  </span>
                                </div>
                                <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                                  {group.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 font-mono">
                                  <span>Latest try:</span>
                                  <span>{group.latestTimestamp ? new Date(group.latestTimestamp).toLocaleString() : "Recently"}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="w-full mt-4 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold gap-1.5 rounded-xl py-2 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedHistoryQuestion(group);
                                  }}
                                >
                                  <History className="w-3.5 h-3.5" /> View Past Attempts
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {/* Small Overlay Window for Past Attempts */}
                      <AnimatePresence>
                        {selectedHistoryQuestion && (
                          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 20 }}
                              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
                            >
                              {/* Modal Header */}
                              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                                <div>
                                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-indigo-500" />
                                    {selectedHistoryQuestion.title}
                                  </h3>
                                  <p className="text-xs text-slate-400 mt-1 font-mono">
                                    {selectedHistoryQuestion.attempts.length} Total {selectedHistoryQuestion.attempts.length === 1 ? "Attempt" : "Attempts"} Recorded
                                  </p>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => setSelectedHistoryQuestion(null)}
                                  className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                  <X className="w-5 h-5" />
                                </Button>
                              </div>

                              {/* Modal Content */}
                              <ScrollArea className="flex-1 p-6 overflow-y-auto">
                                <div className="space-y-4">
                                  {selectedHistoryQuestion.attempts.map((attempt: any, idx: number) => {
                                    const isCorrect = attempt.payload?.isCorrect;
                                    const attemptId = attempt.id;
                                    const isAttemptExpanded = !!expandedAttempts[attemptId];
                                    const attemptNum = selectedHistoryQuestion.attempts.length - idx;

                                    return (
                                      <div 
                                        key={attemptId}
                                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                                          isCorrect 
                                            ? "bg-emerald-500/[0.02] border-emerald-500/15 dark:border-emerald-500/10 hover:border-emerald-500/30" 
                                            : "bg-rose-500/[0.02] border-rose-500/15 dark:border-rose-500/10 hover:border-rose-500/30"
                                        }`}
                                      >
                                        <div 
                                          onClick={() => setExpandedAttempts(prev => ({ ...prev, [attemptId]: !isAttemptExpanded }))}
                                          className="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/40 dark:hover:bg-slate-900/40"
                                        >
                                          <div className="flex items-center gap-3">
                                            {/* Beautifully highlighted past attempts */}
                                            <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                                              isCorrect 
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-500/10" 
                                                : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-500/10"
                                            }`}>
                                              {isCorrect ? "Accepted" : "Wrong Answer / Compiler Error"}
                                            </span>
                                            <span className="text-[11px] capitalize font-mono text-slate-500 dark:text-slate-400">
                                              {attempt.payload?.language} • Attempt #{attemptNum}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-slate-400 font-mono">
                                              {attempt.dateObj ? new Date(attempt.dateObj).toLocaleString() : "Recent"}
                                            </span>
                                            {isAttemptExpanded ? (
                                              <ChevronUp className="w-4 h-4 text-slate-400" />
                                            ) : (
                                              <ChevronDown className="w-4 h-4 text-slate-400" />
                                            )}
                                          </div>
                                        </div>

                                        {isAttemptExpanded && (
                                          <div className="p-5 pt-0 space-y-4 border-t border-dashed border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/40">
                                            <div className="space-y-1.5 mt-4">
                                              <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Submitted Code:</span>
                                                <Button 
                                                  variant="outline" 
                                                  size="sm" 
                                                  className="h-6 px-2 text-[10px] text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-slate-200 dark:border-slate-800 cursor-pointer"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(attempt.payload?.code || "");
                                                    showModal({ title: "Copied!", message: "Code copied to clipboard successfully.", type: "info", confirmText: "Awesome" });
                                                  }}
                                                >
                                                  Copy Code
                                                </Button>
                                              </div>
                                              <ScrollArea className="h-40 bg-slate-950 rounded-xl p-3 border border-slate-800 shadow-inner">
                                                <pre className="text-[11px] text-indigo-300 font-mono whitespace-pre overflow-x-auto select-all leading-relaxed">
                                                  {attempt.payload?.code}
                                                </pre>
                                              </ScrollArea>
                                            </div>

                                            {attempt.payload?.feedback && (
                                              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800">
                                                <h6 className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                  <Bot className="w-4 h-4 text-indigo-500" />
                                                  Judge Feedback:
                                                </h6>
                                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                                  {attempt.payload.feedback}
                                                </p>
                                                {attempt.payload.suggestions && attempt.payload.suggestions.length > 0 && (
                                                  <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800 space-y-1.5">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Suggestions / Fixes:</span>
                                                    <ul className="list-disc pl-4 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                                                      {attempt.payload.suggestions.map((sug: string, sIdx: number) => (
                                                        <li key={sIdx}>{sug}</li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </ScrollArea>

                              {/* Modal Footer */}
                              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50/50 dark:bg-slate-900/50">
                                <Button onClick={() => setSelectedHistoryQuestion(null)} className="rounded-xl px-5 cursor-pointer">
                                  Close Window
                                </Button>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

        {/* Help Pop Slide */}
        <AnimatePresence>
          {isHelpOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-[100] border-l border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-indigo-600 text-white">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  <h3 className="font-bold">Quick Explanation</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsHelpOpen(false)} className="text-white hover:bg-white/20">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                    <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      In Simple Terms
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Imagine you're looking for two people in a room whose ages add up to exactly 50. Instead of checking every possible pair, you keep a list of everyone you've already met. When you meet someone new, you check if the "missing piece" (50 - their age) is already on your list!
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-sm">Key Concepts</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Time</p>
                        <p className="text-sm font-mono text-indigo-600">O(n)</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Space</p>
                        <p className="text-sm font-mono text-indigo-600">O(n)</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/50">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Visual Hint</h4>
                    <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-indigo-400 font-mono text-xs p-4 text-center">
                      {"[2, 7, 11, 15] -> Target: 9"}
                      <br/>
                      Meet 2: Need 7. Not in list.
                      <br/>
                      Add 2 to list.
                      <br/>
                      Meet 7: Need 2. YES! Found it.
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setIsHelpOpen(false)}>
                  I Understand Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI Expert Chat */}
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AI Expert</h3>
                    <p className="text-[10px] opacity-80">Always active to help</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={() => setIsChatOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h4 className="font-bold mb-1">Hello! I'm your AI Expert</h4>
                      <p className="text-xs text-slate-500">Ask me anything about coding, career, or your profile.</p>
                    </div>
                  )}
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                      }`}>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-2xl rounded-tl-none">
                        <motion.div 
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex gap-1"
                        >
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!chatInput.trim() || isChatLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-9 w-9 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-colors"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
        </motion.button>
        {showSignOutConfirm && (
          <SignOutConfirmModal 
            onConfirm={handleLogout} 
            onClose={() => setShowSignOutConfirm(false)}
            isDarkMode={isDarkMode}
          />
        )}
        <StreakCalendarModal 
          isOpen={isStreakModalOpen} 
          onClose={() => setIsStreakModalOpen(false)}
          dayStreak={dayStreak}
          openedDates={openedDates}
          isDarkMode={isDarkMode}
        />

        <AnimatePresence>
          {showPatternSidebar && patternData && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPatternSidebar(false)}
                className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm z-50"
              />

              {/* Sliding Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-[60] flex flex-col h-full overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                      Pattern Insights
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Learn why and how we solved this problem</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 h-9 w-9"
                    onClick={() => setShowPatternSidebar(false)}
                  >
                    <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Pattern Name Badge */}
                  <div className="p-5 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-2xl border border-indigo-200/20 dark:border-indigo-900/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">DETECTED PATTERN</span>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
                      <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      {patternData.patternName}
                    </h4>
                  </div>

                  {/* HOW Section */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-emerald-500" />
                      How this problem uses that pattern
                    </h5>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {patternData.howUsed}
                    </div>
                  </div>

                  {/* WHY Section */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      Why we chose this pattern here
                    </h5>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {patternData.whyUsed}
                    </div>
                  </div>

                  {/* Suggested practice questions with same pattern */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                        Next Practice Challenges
                      </h5>
                      <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-medium">
                        Same Pattern
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {patternData.suggestedQuestions?.map((q: any, i: number) => {
                        const isEasy = q.level?.toLowerCase() === 'easy';
                        const isMedium = q.level?.toLowerCase() === 'medium';
                        return (
                          <div 
                            key={i}
                            className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <h6 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{q.title}</h6>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase shrink-0 ${
                                  isEasy ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100/30 dark:border-emerald-900/30' :
                                  isMedium ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-100/30 dark:border-amber-900/30' :
                                  'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 border border-red-100/30 dark:border-red-900/30'
                                }`}>
                                  {q.level}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {q.description}
                              </p>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 mt-1"
                              onClick={() => {
                                setActiveTest({
                                  id: `rec_${Date.now()}_${i}`,
                                  title: q.title,
                                  level: q.level,
                                  question: q.description,
                                  solveWithUserInput
                                });
                                setTestFeedback(null);
                                setUserInputConfigMap(null);
                                setCode(language ? getBoilerplateCode(q.title || q.description, language, solveWithUserInput) : "");
                                setShowPatternSidebar(false);
                                setActiveTab("mentor");
                                
                                showModal({
                                  title: "Challenge Loaded!",
                                  message: `"${q.title}" has been loaded into your editor. Good luck!`,
                                  type: "info",
                                  confirmText: "Let's Go",
                                  cancelText: "Dismiss"
                                });
                              }}
                            >
                              Solve Next
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  </TooltipProvider>
</ErrorBoundary>
);
}
