import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, LayoutList, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UniversalToolbarCatalog from "./UniversalToolbarCatalog";
import { dsaSheetsData } from "../data/dsaSheets";

export const TUF_ARRAY_STEP = {
  stepId: "step_3_arrays",
  stepTitle: "Step 3: Arrays",
  subTopics: [
    {
      subTopicId: "arr_subtopic_1",
      subTopicTitle: "1. Fundamentals & Easy Arrays",
      questions: {
        Easy: [
          {
            id: "arr_e1",
            title: "Largest Element in an Array",
            level: "Easy",
            description: "Given an array `nums`, find and return the largest element in the array.",
            examples: [
              { input: "nums = [2, 5, 1, 3, 0]", output: "5", explanation: "5 is the maximum element in the array." }
            ],
            constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"]
          },
          {
            id: "arr_e2",
            title: "Second Largest Element Without Sorting",
            level: "Easy",
            description: "Given an array `nums`, return the second largest distinct element. If it doesn't exist, return -1.",
            examples: [
              { input: "nums = [12, 35, 1, 10, 34, 1]", output: "34" }
            ],
            constraints: ["2 <= nums.length <= 10^5", "1 <= nums[i] <= 10^5"]
          },
          {
            id: "arr_e3",
            title: "Check if Array Is Sorted and Rotated",
            level: "Easy",
            description: "Given an array `nums`, return true if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero).",
            examples: [
              { input: "nums = [3, 4, 5, 1, 2]", output: "true" }
            ],
            constraints: ["1 <= nums.length <= 100", "1 <= nums[i] <= 100"]
          },
          {
            id: "arr_e4",
            title: "Remove Duplicates from Sorted Array",
            level: "Easy",
            description: "Given a sorted array `nums`, remove the duplicates in-place such that each element appears only once. Return the number of unique elements.",
            examples: [
              { input: "nums = [1, 1, 2]", output: "2 (nums = [1, 2, _])" }
            ],
            constraints: ["1 <= nums.length <= 3 * 10^4"]
          },
          {
            id: "arr_e5",
            title: "Left Rotate an Array by One Place",
            level: "Easy",
            description: "Given an array `nums` of size N, rotate the array to the left by one position.",
            examples: [
              { input: "nums = [1, 2, 3, 4, 5]", output: "[2, 3, 4, 5, 1]" }
            ],
            constraints: ["1 <= nums.length <= 10^5"]
          },
          {
            id: "arr_e6",
            title: "Move Zeroes to End",
            level: "Easy",
            description: "Given an integer array `nums`, move all 0's to the end of it while maintaining the relative order of the non-zero elements in-place.",
            examples: [
              { input: "nums = [0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" }
            ],
            constraints: ["1 <= nums.length <= 10^4"]
          }
        ],
        Medium: [
          {
            id: "arr_m1",
            title: "Rotate Array by K Places",
            level: "Medium",
            description: "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.",
            examples: [
              { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" }
            ],
            constraints: ["1 <= nums.length <= 10^5", "0 <= k <= 10^5"]
          },
          {
            id: "arr_m2",
            title: "Find Missing Number in Array",
            level: "Medium",
            description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
            examples: [
              { input: "nums = [3,0,1]", output: "2" }
            ],
            constraints: ["n == nums.length", "1 <= n <= 10^4"]
          },
          {
            id: "arr_m3",
            title: "Max Consecutive Ones",
            level: "Medium",
            description: "Given a binary array `nums`, return the maximum number of consecutive 1's in the array.",
            examples: [
              { input: "nums = [1,1,0,1,1,1]", output: "3" }
            ],
            constraints: ["1 <= nums.length <= 10^5"]
          }
        ],
        Hard: [
          {
            id: "arr_h1",
            title: "Longest Subarray with Sum K (Positives + Negatives)",
            level: "Hard",
            description: "Given an array `nums` containing both positive and negative integers, find the length of the longest subarray with sum equal to `k`.",
            examples: [
              { input: "nums = [10, 5, 2, 7, 1, 9], k = 15", output: "4 (subarray [5, 2, 7, 1])" }
            ],
            constraints: ["1 <= nums.length <= 10^5", "-10^9 <= k <= 10^9"]
          },
          {
            id: "arr_h2",
            title: "First Missing Positive",
            level: "Hard",
            description: "Given an unsorted integer array `nums`, return the smallest missing positive integer in O(N) time and O(1) auxiliary space.",
            examples: [
              { input: "nums = [3,4,-1,1]", output: "2" }
            ],
            constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1"]
          }
        ]
      }
    },
    {
      subTopicId: "arr_subtopic_2",
      subTopicTitle: "2. Two Pointers, Sliding Window & Logic",
      questions: {
        Easy: [
          {
            id: "arr_e7",
            title: "Two Sum",
            level: "Easy",
            description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
            examples: [
              { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
            ],
            constraints: ["2 <= nums.length <= 10^4"]
          },
          {
            id: "arr_e8",
            title: "Sort An Array of 0s, 1s and 2s (Dutch National Flag)",
            level: "Easy",
            description: "Given an array `nums` with `n` objects colored red, white, or blue (represented as 0, 1, 2), sort them in-place in linear time.",
            examples: [
              { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" }
            ],
            constraints: ["1 <= nums.length <= 300"]
          }
        ],
        Medium: [
          {
            id: "arr_m4",
            title: "3Sum",
            level: "Medium",
            description: "Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `nums[i] + nums[j] + nums[k] == 0`.",
            examples: [
              { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }
            ],
            constraints: ["3 <= nums.length <= 3000"]
          },
          {
            id: "arr_m5",
            title: "Container With Most Water",
            level: "Medium",
            description: "Given `n` non-negative integers representing heights where each line is drawn at position `i`, find two lines that together with the x-axis form a container containing the most water.",
            examples: [
              { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }
            ],
            constraints: ["n == height.length", "2 <= n <= 10^5"]
          },
          {
            id: "arr_m6",
            title: "Rearrange Array Elements by Sign",
            level: "Medium",
            description: "You are given a 0-indexed integer array `nums` of even length with equal numbers of positive and negative integers. Rearrange `nums` such that every consecutive pair has opposite signs starting with positive.",
            examples: [
              { input: "nums = [3,1,-2,-5,2,-4]", output: "[3,-2,1,-5,2,-4]" }
            ],
            constraints: ["2 <= nums.length <= 10^5", "nums.length is even"]
          },
          {
            id: "arr_m7",
            title: "Subarray Sum Equals K",
            level: "Medium",
            description: "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.",
            examples: [
              { input: "nums = [1,1,1], k = 2", output: "2" }
            ],
            constraints: ["1 <= nums.length <= 2 * 10^4"]
          }
        ],
        Hard: [
          {
            id: "arr_h3",
            title: "4Sum",
            level: "Hard",
            description: "Given an array `nums` of `n` integers, return an array of all unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that their sum equals `target`.",
            examples: [
              { input: "nums = [1,0,-1,0,-2,2], target = 0", output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" }
            ],
            constraints: ["1 <= nums.length <= 200"]
          },
          {
            id: "arr_h4",
            title: "Trapping Rain Water",
            level: "Hard",
            description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
            examples: [
              { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
            ],
            constraints: ["n == height.length", "1 <= n <= 2 * 10^4"]
          },
          {
            id: "arr_h5",
            title: "Sliding Window Maximum",
            level: "Hard",
            description: "You are given an array of integers `nums` and a sliding window of size `k` moving from left to right. Return the max position value in each window.",
            examples: [
              { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" }
            ],
            constraints: ["1 <= nums.length <= 10^5", "1 <= k <= nums.length"]
          }
        ]
      }
    },
    {
      subTopicId: "arr_subtopic_3",
      subTopicTitle: "3. Kadane's, Matrix & Hard Patterns",
      questions: {
        Easy: [
          {
            id: "arr_e9",
            title: "Best Time to Buy and Sell Stock",
            level: "Easy",
            description: "You are given an array `prices` where `prices[i]` is the price of a given stock on day `i`. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",
            examples: [
              { input: "prices = [7,1,5,3,6,4]", output: "5 (Buy at 1, sell at 6)" }
            ],
            constraints: ["1 <= prices.length <= 10^5"]
          },
          {
            id: "arr_e10",
            title: "Majority Element (> N/2 times)",
            level: "Easy",
            description: "Given an array `nums` of size `n`, return the majority element (appears more than ⌊n / 2⌋ times).",
            examples: [
              { input: "nums = [3,2,3]", output: "3" }
            ],
            constraints: ["n == nums.length", "1 <= n <= 5 * 10^4"]
          }
        ],
        Medium: [
          {
            id: "arr_m8",
            title: "Maximum Subarray Sum (Kadane's Algorithm)",
            level: "Medium",
            description: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
            examples: [
              { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6 ([4,-1,2,1])" }
            ],
            constraints: ["1 <= nums.length <= 10^5"]
          },
          {
            id: "arr_m9",
            title: "Next Permutation",
            level: "Medium",
            description: "A permutation of an array of integers is an arrangement of its members into a sequence. Rearrange numbers into the lexicographically next greater permutation of numbers.",
            examples: [
              { input: "nums = [1,2,3]", output: "[1,3,2]" }
            ],
            constraints: ["1 <= nums.length <= 100"]
          },
          {
            id: "arr_m10",
            title: "Rotate Image / Matrix by 90 Degrees",
            level: "Medium",
            description: "You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.",
            examples: [
              { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }
            ],
            constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 20"]
          },
          {
            id: "arr_m11",
            title: "Spiral Matrix Traversal",
            level: "Medium",
            description: "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
            examples: [
              { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }
            ],
            constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10"]
          }
        ],
        Hard: [
          {
            id: "arr_h6",
            title: "Majority Element II (> N/3 times)",
            level: "Hard",
            description: "Given an integer array of size `n`, find all elements that appear more than ⌊ n/3 ⌋ times using Boyer-Moore Voting Algorithm.",
            examples: [
              { input: "nums = [3,2,3]", output: "[3]" }
            ],
            constraints: ["1 <= nums.length <= 5 * 10^4"]
          },
          {
            id: "arr_h7",
            title: "Merge Overlapping Subintervals",
            level: "Hard",
            description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals.",
            examples: [
              { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }
            ],
            constraints: ["1 <= intervals.length <= 10^4"]
          },
          {
            id: "arr_h8",
            title: "Reverse Pairs",
            level: "Hard",
            description: "Given an integer array `nums`, return the number of reverse pairs in the array. A reverse pair is a pair `(i, j)` where `0 <= i < j < nums.length` and `nums[i] > 2 * nums[j]`.",
            examples: [
              { input: "nums = [1,3,2,3,1]", output: "2" }
            ],
            constraints: ["1 <= nums.length <= 5 * 10^4"]
          },
          {
            id: "arr_h9",
            title: "Maximum Product Subarray",
            level: "Hard",
            description: "Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return the product.",
            examples: [
              { input: "nums = [2,3,-2,4]", output: "6" }
            ],
            constraints: ["1 <= nums.length <= 2 * 10^4"]
          }
        ]
      }
    }
  ]
};

export const TUF_SHEET_DATA = [TUF_ARRAY_STEP];

// Helper to enrich lightweight question objects with full details from dsaSheetsData if available
const enrichQuestion = (q: any) => {
  if (q.description && q.solutions) return q;
  
  // Try finding match in dsaSheetsData
  const arraySheet = dsaSheetsData.find((s: any) => s.title === "Arrays");
  if (arraySheet && arraySheet.questions) {
    const match = arraySheet.questions.find(
      (item: any) => 
        item.id === q.id || 
        item.title.toLowerCase().includes(q.title.toLowerCase()) || 
        q.title.toLowerCase().includes(item.title.toLowerCase())
    );
    if (match) {
      return { ...match, ...q, description: match.description, solutions: match.solutions, constraints: match.constraints, examples: match.examples };
    }
  }

  // Fallback enriched data
  return {
    ...q,
    pattern: q.level === "Easy" ? "Basic Iteration" : q.level === "Medium" ? "Two Pointers / Sliding Window" : "Hard Dynamic Programming",
    description: `Given an array of integers, solve the ${q.title} problem with optimal time and space complexity.`,
    examples: [{ input: "nums = [1, 2, 3, 4, 5]", output: "Result", explanation: `Sample run for ${q.title}` }],
    constraints: ["1 <= N <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    solutions: {
      javascript: `// Optimal solution for ${q.title}\nfunction solve(nums) {\n  // Implement algorithm here\n  return true;\n}`,
      python: `# Optimal solution for ${q.title}\ndef solve(nums):\n    # Implement algorithm here\n    return True`,
      java: `// Optimal solution for ${q.title}\nclass Solution {\n    public boolean solve(int[] nums) {\n        return true;\n    }\n}`,
      cpp: `// Optimal solution for ${q.title}\nclass Solution {\npublic:\n    bool solve(vector<int>& nums) {\n        return true;\n    }\n};`
    }
  };
};

export default function TUFStyleSheet({ 
  stepData = TUF_ARRAY_STEP, 
  onSelectQuestion, 
  completedIds = [] 
}: {
  stepData?: any;
  onSelectQuestion?: (question: any) => void;
  completedIds?: string[];
}) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <UniversalToolbarCatalog 
        onSelectQuestion={onSelectQuestion} 
        completedIds={completedIds} 
      />
    </div>
  );
}
