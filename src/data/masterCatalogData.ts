export interface Question {
  id: string;
  title: string;
  level: "Easy" | "Medium" | "Hard";
  description?: string;
  type?: "Singly LL" | "DLL"; // Added for Linked List classification
  examples?: { input: string; output: string; explanation?: string }[];
  constraints?: string[];
  solutions?: Record<string, string>;
}

export interface SubTopic {
  subTopicId: string;
  subTopicTitle: string;
  description: string;
  questions: {
    Easy: Question[];
    Medium: Question[];
    Hard: Question[];
  };
}

export interface DataStructureCatalog {
  id: string;
  title: string;
  subTopics: SubTopic[];
}

export const MASTER_CATALOG: Record<string, DataStructureCatalog> = {
  // ================= 1. ARRAYS (EXPANDED) =================
  arrays: {
    id: "arrays",
    title: "Arrays Catalog",
    subTopics: [
      {
        subTopicId: "arr_subtopic_1",
        subTopicTitle: "1. Fundamentals & In-Place Manipulations",
        description: "Rotations, linear scans, array mutations, and frequency counters.",
        questions: {
          Easy: [
            { id: "arr_e1", title: "Largest Element in an Array", level: "Easy" },
            { id: "arr_e2", title: "Second Largest Element Without Sorting", level: "Easy" },
            { id: "arr_e3", title: "Check if Array Is Sorted and Rotated", level: "Easy" },
            { id: "arr_e4", title: "Remove Duplicates from Sorted Array", level: "Easy" },
            { id: "arr_e5", title: "Left Rotate an Array by One Place", level: "Easy" },
            { id: "arr_e6", title: "Move Zeroes to End", level: "Easy" },
            { id: "arr_e7", title: "Linear Search and Frequency Counting", level: "Easy" },
            { id: "arr_e8", title: "Union of Two Sorted Arrays", level: "Easy" },
            { id: "arr_e9", title: "Intersection of Two Sorted Arrays", level: "Easy" },
            { id: "arr_e10", title: "Find the Missing Number (0 to N)", level: "Easy" }
          ],
          Medium: [
            { id: "arr_m1", title: "Rotate Array by K Places", level: "Medium" },
            { id: "arr_m2", title: "Find Duplicate Number (Floyd's Tortoise)", level: "Medium" },
            { id: "arr_m3", title: "Max Consecutive Ones", level: "Medium" },
            { id: "arr_m4", title: "Single Number (Bitwise XOR)", level: "Medium" },
            { id: "arr_m5", title: "Sort Array by Parity", level: "Medium" }
          ],
          Hard: [
            { id: "arr_h1", title: "Longest Subarray with Sum K", level: "Hard" },
            { id: "arr_h2", title: "First Missing Positive", level: "Hard" },
            { id: "arr_h3", title: "Count Inversions in an Array", level: "Hard" },
            { id: "arr_h4", title: "Maximum Sum Circular Subarray", level: "Hard" }
          ]
        }
      },
      {
        subTopicId: "arr_subtopic_2",
        subTopicTitle: "2. Two Pointers & Sliding Window",
        description: "Target pairs, multi-pointer convergence, and dynamic window sizing.",
        questions: {
          Easy: [
            { id: "arr_e11", title: "Two Sum", level: "Easy" },
            { id: "arr_e12", title: "Sort 0s, 1s and 2s (Dutch National Flag)", level: "Easy" },
            { id: "arr_e13", title: "Remove Element in O(1) Space", level: "Easy" },
            { id: "arr_e14", title: "Squares of a Sorted Array", level: "Easy" }
          ],
          Medium: [
            { id: "arr_m6", title: "3Sum", level: "Medium" },
            { id: "arr_m7", title: "Container With Most Water", level: "Medium" },
            { id: "arr_m8", title: "Rearrange Array Elements by Sign", level: "Medium" },
            { id: "arr_m9", title: "Subarray Sum Equals K", level: "Medium" },
            { id: "arr_m10", title: "3Sum Closest", level: "Medium" },
            { id: "arr_m11", title: "Minimum Size Subarray Sum", level: "Medium" },
            { id: "arr_m12", title: "Fruit Into Baskets", level: "Medium" }
          ],
          Hard: [
            { id: "arr_h5", title: "4Sum", level: "Hard" },
            { id: "arr_h6", title: "Trapping Rain Water", level: "Hard" },
            { id: "arr_h7", title: "Sliding Window Maximum", level: "Hard" },
            { id: "arr_h8", title: "Subarrays with K Different Integers", level: "Hard" },
            { id: "arr_h9", title: "Minimum Window Substring in Array", level: "Hard" }
          ]
        }
      },
      {
        subTopicId: "arr_subtopic_3",
        subTopicTitle: "3. Kadane's, Matrix & Hard Patterns",
        description: "Continuous maximum products, Boyer-Moore voting, interval merging, and 2D matrix transformations.",
        questions: {
          Easy: [
            { id: "arr_e15", title: "Best Time to Buy and Sell Stock", level: "Easy" },
            { id: "arr_e16", title: "Majority Element (> N/2 times)", level: "Easy" },
            { id: "arr_e17", title: "Pascal's Triangle Element Generation", level: "Easy" }
          ],
          Medium: [
            { id: "arr_m13", title: "Maximum Subarray Sum (Kadane's)", level: "Medium" },
            { id: "arr_m14", title: "Next Permutation", level: "Medium" },
            { id: "arr_m15", title: "Rotate Matrix by 90 Degrees", level: "Medium" },
            { id: "arr_m16", title: "Spiral Matrix Traversal", level: "Medium" },
            { id: "arr_m17", title: "Set Matrix Zeroes", level: "Medium" },
            { id: "arr_m18", title: "Product of Array Except Self", level: "Medium" },
            { id: "arr_m19", title: "Game of Life", level: "Medium" }
          ],
          Hard: [
            { id: "arr_h10", title: "Majority Element II (> N/3 times)", level: "Hard" },
            { id: "arr_h11", title: "Merge Overlapping Intervals", level: "Hard" },
            { id: "arr_h12", title: "Reverse Pairs", level: "Hard" },
            { id: "arr_h13", title: "Maximum Product Subarray", level: "Hard" },
            { id: "arr_h14", title: "Merge Two Sorted Arrays Without Extra Space", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 2. STRINGS (EXPANDED) =================
  strings: {
    id: "strings",
    title: "Strings Catalog",
    subTopics: [
      {
        subTopicId: "str_1",
        subTopicTitle: "1. Basic String Operations & Anagrams",
        description: "String reversals, palindrome validation, character mapping, and frequency maps.",
        questions: {
          Easy: [
            { id: "str_e1", title: "Valid Anagram", level: "Easy" },
            { id: "str_e2", title: "Valid Palindrome", level: "Easy" },
            { id: "str_e3", title: "Reverse Words in a String", level: "Easy" },
            { id: "str_e4", title: "Isomorphic Strings", level: "Easy" },
            { id: "str_e5", title: "Rotate String Check", level: "Easy" },
            { id: "str_e6", title: "Longest Common Prefix", level: "Easy" }
          ],
          Medium: [
            { id: "str_m1", title: "Group Anagrams", level: "Medium" },
            { id: "str_m2", title: "Sort Characters By Frequency", level: "Medium" },
            { id: "str_m3", title: "String to Integer (atoi)", level: "Medium" },
            { id: "str_m4", title: "Roman to Integer & Integer to Roman", level: "Medium" },
            { id: "str_m5", title: "Count and Say", level: "Medium" }
          ],
          Hard: [
            { id: "str_h1", title: "Longest Valid Parentheses", level: "Hard" },
            { id: "str_h2", title: "Text Justification", level: "Hard" }
          ]
        }
      },
      {
        subTopicId: "str_2",
        subTopicTitle: "2. Sliding Window & Substrings",
        description: "Unique character windows, frequency matching, and substring pattern matching.",
        questions: {
          Easy: [
            { id: "str_e7", title: "First Unique Character in a String", level: "Easy" },
            { id: "str_e8", title: "Find the Index of First Occurrence in a String", level: "Easy" }
          ],
          Medium: [
            { id: "str_m6", title: "Longest Substring Without Repeating Characters", level: "Medium" },
            { id: "str_m7", title: "Longest Repeating Character Replacement", level: "Medium" },
            { id: "str_m8", title: "Find All Anagrams in a String", level: "Medium" },
            { id: "str_m9", title: "Permutation in String", level: "Medium" },
            { id: "str_m10", title: "Longest Palindromic Substring", level: "Medium" }
          ],
          Hard: [
            { id: "str_h3", title: "Minimum Window Substring", level: "Hard" },
            { id: "str_h4", title: "Substring with Concatenation of All Words", level: "Hard" },
            { id: "str_h5", title: "KMP Algorithm for Pattern Searching", level: "Hard" },
            { id: "str_h6", title: "Shortest Palindrome", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 3. LINKED LISTS (WITH SINGLY / DLL TYPES) =================
  linkedlists: {
    id: "linkedlists",
    title: "Linked Lists Catalog",
    subTopics: [
      {
        subTopicId: "ll_1",
        subTopicTitle: "1. Singly Linked List Fundamentals & Fast/Slow Pointers",
        description: "Reversals, cycle detection, merging, and middle node searches.",
        questions: {
          Easy: [
            { id: "ll_e1", title: "Reverse Linked List", level: "Easy", type: "Singly LL" },
            { id: "ll_e2", title: "Find Middle of Linked List", level: "Easy", type: "Singly LL" },
            { id: "ll_e3", title: "Detect Cycle in Linked List", level: "Easy", type: "Singly LL" },
            { id: "ll_e4", title: "Merge Two Sorted Lists", level: "Easy", type: "Singly LL" },
            { id: "ll_e5", title: "Delete Node in a Linked List", level: "Easy", type: "Singly LL" },
            { id: "ll_e6", title: "Palindrome Linked List", level: "Easy", type: "Singly LL" }
          ],
          Medium: [
            { id: "ll_m1", title: "Find Starting Point of Cycle", level: "Medium", type: "Singly LL" },
            { id: "ll_m2", title: "Remove Nth Node From End of List", level: "Medium", type: "Singly LL" },
            { id: "ll_m3", title: "Add Two Numbers Represented as LL", level: "Medium", type: "Singly LL" },
            { id: "ll_m4", title: "Intersection of Two Linked Lists", level: "Medium", type: "Singly LL" },
            { id: "ll_m5", title: "Sort List using Merge Sort", level: "Medium", type: "Singly LL" },
            { id: "ll_m6", title: "Odd Even Linked List", level: "Medium", type: "Singly LL" },
            { id: "ll_m7", title: "Reorder List", level: "Medium", type: "Singly LL" }
          ],
          Hard: [
            { id: "ll_h1", title: "Reverse Nodes in k-Group", level: "Hard", type: "Singly LL" },
            { id: "ll_h2", title: "Merge k Sorted Lists", level: "Hard", type: "Singly LL" },
            { id: "ll_h3", title: "Copy List with Random Pointer", level: "Hard", type: "Singly LL" }
          ]
        }
      },
      {
        subTopicId: "ll_2",
        subTopicTitle: "2. Doubly Linked Lists & Cache Architectures",
        description: "Two-way node links, doubly linked list operations, and memory cache mechanisms.",
        questions: {
          Easy: [
            { id: "ll_e7", title: "Construct Doubly Linked List from Array", level: "Easy", type: "DLL" },
            { id: "ll_e8", title: "Insert Node in Doubly Linked List", level: "Easy", type: "DLL" },
            { id: "ll_e9", title: "Delete Node in Doubly Linked List", level: "Easy", type: "DLL" },
            { id: "ll_e10", title: "Reverse a Doubly Linked List", level: "Easy", type: "DLL" }
          ],
          Medium: [
            { id: "ll_m8", title: "Find Pairs with Given Sum in Sorted DLL", level: "Medium", type: "DLL" },
            { id: "ll_m9", title: "Remove Duplicates from Sorted DLL", level: "Medium", type: "DLL" },
            { id: "ll_m10", title: "Flatten a Multilevel Doubly Linked List", level: "Medium", type: "DLL" }
          ],
          Hard: [
            { id: "ll_h4", title: "LRU Cache Implementation (DLL + HashMap)", level: "Hard", type: "DLL" },
            { id: "ll_h5", title: "LFU Cache Implementation (DLL + Frequency Map)", level: "Hard", type: "DLL" }
          ]
        }
      }
    ]
  },

  // ================= 4. BINARY SEARCH =================
  binarysearch: {
    id: "binarysearch",
    title: "Binary Search Catalog",
    subTopics: [
      {
        subTopicId: "bs_1",
        subTopicTitle: "1. Binary Search on 1D Arrays",
        description: "Search space reduction, bounds finding, and rotated array searches.",
        questions: {
          Easy: [
            { id: "bs_e1", title: "Binary Search Implementation", level: "Easy" },
            { id: "bs_e2", title: "Search Insert Position", level: "Easy" },
            { id: "bs_e3", title: "Find First and Last Position of Element", level: "Easy" },
            { id: "bs_e4", title: "Floor and Ceil in a Sorted Array", level: "Easy" }
          ],
          Medium: [
            { id: "bs_m1", title: "Search in Rotated Sorted Array I", level: "Medium" },
            { id: "bs_m2", title: "Search in Rotated Sorted Array II (Duplicates)", level: "Medium" },
            { id: "bs_m3", title: "Find Minimum in Rotated Sorted Array", level: "Medium" },
            { id: "bs_m4", title: "Find Peak Element", level: "Medium" },
            { id: "bs_m5", title: "Single Element in a Sorted Array", level: "Medium" }
          ],
          Hard: [
            { id: "bs_h1", title: "Find K-th Smallest Pair Distance", level: "Hard" },
            { id: "bs_h2", title: "Median of Two Sorted Arrays", level: "Hard" }
          ]
        }
      },
      {
        subTopicId: "bs_2",
        subTopicTitle: "2. Binary Search on Answers & 2D Matrices",
        description: "Optimization space reduction, range allocation, and 2D grid searches.",
        questions: {
          Easy: [
            { id: "bs_e5", title: "Square Root of an Integer", level: "Easy" },
            { id: "bs_e6", title: "N-th Root of an Integer", level: "Easy" }
          ],
          Medium: [
            { id: "bs_m6", title: "Koko Eating Bananas", level: "Medium" },
            { id: "bs_m7", title: "Minimum Days to Make M Bouquets", level: "Medium" },
            { id: "bs_m8", title: "Find the Smallest Divisor Given a Threshold", level: "Medium" },
            { id: "bs_m9", title: "Capacity To Ship Packages Within D Days", level: "Medium" },
            { id: "bs_m10", title: "Search a 2D Matrix I", level: "Medium" },
            { id: "bs_m11", title: "Search a 2D Matrix II (Row and Column Sorted)", level: "Medium" }
          ],
          Hard: [
            { id: "bs_h3", title: "Book Allocation Problem", level: "Hard" },
            { id: "bs_h4", title: "Aggressive Cows (Distance Maximization)", level: "Hard" },
            { id: "bs_h5", title: "Split Array Largest Sum", level: "Hard" },
            { id: "bs_h6", title: "K-th Element of Two Sorted Arrays", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 5. RECURSION & BACKTRACKING =================
  recursion: {
    id: "recursion",
    title: "Recursion & Backtracking Catalog",
    subTopics: [
      {
        subTopicId: "rec_1",
        subTopicTitle: "1. Subsets, Combinations & Permutations",
        description: "Decision trees, call stacks, power sets, and pruning techniques.",
        questions: {
          Easy: [
            { id: "rec_e1", title: "Reverse a Stack using Recursion", level: "Easy" },
            { id: "rec_e2", title: "Count Good Numbers", level: "Easy" },
            { id: "rec_e3", title: "Sort a Stack using Recursion", level: "Easy" },
            { id: "rec_e4", title: "Pow(x, n) Recursive Approach", level: "Easy" }
          ],
          Medium: [
            { id: "rec_m1", title: "Subsets / Power Set", level: "Medium" },
            { id: "rec_m2", title: "Subsets II (With Duplicates)", level: "Medium" },
            { id: "rec_m3", title: "Combination Sum I", level: "Medium" },
            { id: "rec_m4", title: "Combination Sum II", level: "Medium" },
            { id: "rec_m5", title: "Combination Sum III", level: "Medium" },
            { id: "rec_m6", title: "Permutations I", level: "Medium" },
            { id: "rec_m7", title: "Permutations II (Unique Permutations)", level: "Medium" },
            { id: "rec_m8", title: "Letter Combinations of a Phone Number", level: "Medium" },
            { id: "rec_m9", title: "Palindrome Partitioning", level: "Medium" }
          ],
          Hard: [
            { id: "rec_h1", title: "N-Queens Problem", level: "Hard" },
            { id: "rec_h2", title: "Sudoku Solver", level: "Hard" },
            { id: "rec_h3", title: "Word Search II", level: "Hard" },
            { id: "rec_h4", title: "Rat in a Maze", level: "Hard" },
            { id: "rec_h5", title: "M-Coloring Problem", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 6. GREEDY ALGORITHMS =================
  greedy: {
    id: "greedy",
    title: "Greedy Algorithms Catalog",
    subTopics: [
      {
        subTopicId: "gr_1",
        subTopicTitle: "1. Intervals, Scheduling & Choice Heuristics",
        description: "Locally optimal choices, interval sorting, and jump bounds.",
        questions: {
          Easy: [
            { id: "gr_e1", title: "Assign Cookies", level: "Easy" },
            { id: "gr_e2", title: "Lemonade Change", level: "Easy" },
            { id: "gr_e3", title: "Valid Parenthesis String Check", level: "Easy" }
          ],
          Medium: [
            { id: "gr_m1", title: "N Meetings in One Room", level: "Medium" },
            { id: "gr_m2", title: "Jump Game I", level: "Medium" },
            { id: "gr_m3", title: "Jump Game II (Min Jumps)", level: "Medium" },
            { id: "gr_m4", title: "Gas Station Circular Route", level: "Medium" },
            { id: "gr_m5", title: "Non-overlapping Intervals", level: "Medium" },
            { id: "gr_m6", title: "Minimum Platforms Needed for Trains", level: "Medium" },
            { id: "gr_m7", title: "Job Sequencing Problem", level: "Medium" }
          ],
          Hard: [
            { id: "gr_h1", title: "Candy Distribution Problem", level: "Hard" },
            { id: "gr_h2", title: "Minimum Number of Refueling Stops", level: "Hard" },
            { id: "gr_h3", title: "Insert Interval", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 7. STACKS & QUEUES =================
  stacksqueues: {
    id: "stacksqueues",
    title: "Stacks & Queues Catalog",
    subTopics: [
      {
        subTopicId: "sq_1",
        subTopicTitle: "1. Monotonic Stack & Expression Parsing",
        description: "LIFO/FIFO paradigms, next greater elements, and histogram areas.",
        questions: {
          Easy: [
            { id: "sq_e1", title: "Valid Parentheses", level: "Easy" },
            { id: "sq_e2", title: "Implement Queue using Stacks", level: "Easy" },
            { id: "sq_e3", title: "Implement Stack using Queues", level: "Easy" },
            { id: "sq_e4", title: "Min Stack in O(1) Time and Space", level: "Easy" },
            { id: "sq_e5", title: "Backspace String Compare", level: "Easy" }
          ],
          Medium: [
            { id: "sq_m1", title: "Next Greater Element I", level: "Medium" },
            { id: "sq_m2", title: "Next Greater Element II (Circular Array)", level: "Medium" },
            { id: "sq_m3", title: "Asteroid Collision", level: "Medium" },
            { id: "sq_m4", title: "Daily Temperatures", level: "Medium" },
            { id: "sq_m5", title: "Sum of Subarray Minimums", level: "Medium" },
            { id: "sq_m6", title: "Online Stock Span", level: "Medium" },
            { id: "sq_m7", title: "Evaluate Reverse Polish Notation", level: "Medium" }
          ],
          Hard: [
            { id: "sq_h1", title: "Largest Rectangle in Histogram", level: "Hard" },
            { id: "sq_h2", title: "Maximal Rectangle in 2D Binary Matrix", level: "Hard" },
            { id: "sq_h3", title: "Sliding Window Maximum (Monotonic Deque)", level: "Hard" },
            { id: "sq_h4", title: "LRU Cache Implementation", level: "Hard" },
            { id: "sq_h5", title: "LFU Cache Implementation", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 8. BINARY TREES =================
  binarytrees: {
    id: "binarytrees",
    title: "Binary Trees Catalog",
    subTopics: [
      {
        subTopicId: "bt_1",
        subTopicTitle: "1. Traversals, Depth & Structural Views",
        description: "Inorder/Preorder/Postorder traversals, BFS level order, and node paths.",
        questions: {
          Easy: [
            { id: "bt_e1", title: "Binary Tree Inorder Traversal", level: "Easy" },
            { id: "bt_e2", title: "Binary Tree Preorder Traversal", level: "Easy" },
            { id: "bt_e3", title: "Binary Tree Postorder Traversal", level: "Easy" },
            { id: "bt_e4", title: "Maximum Depth of Binary Tree", level: "Easy" },
            { id: "bt_e5", title: "Balanced Binary Tree Check", level: "Easy" },
            { id: "bt_e6", title: "Diameter of Binary Tree", level: "Easy" },
            { id: "bt_e7", title: "Same Tree Check", level: "Easy" },
            { id: "bt_e8", title: "Symmetric Tree Check", level: "Easy" }
          ],
          Medium: [
            { id: "bt_m1", title: "Binary Tree Level Order Traversal", level: "Medium" },
            { id: "bt_m2", title: "Binary Tree Zigzag Level Order", level: "Medium" },
            { id: "bt_m3", title: "Boundary Traversal of Binary Tree", level: "Medium" },
            { id: "bt_m4", title: "Vertical Order Traversal of a Binary Tree", level: "Medium" },
            { id: "bt_m5", title: "Top View and Bottom View of Binary Tree", level: "Medium" },
            { id: "bt_m6", title: "Left View and Right View of Binary Tree", level: "Medium" },
            { id: "bt_m7", title: "Lowest Common Ancestor (LCA)", level: "Medium" },
            { id: "bt_m8", title: "All Nodes Distance K in Binary Tree", level: "Medium" },
            { id: "bt_m9", title: "Path Sum II (All Root-to-Leaf Paths)", level: "Medium" }
          ],
          Hard: [
            { id: "bt_h1", title: "Binary Tree Maximum Path Sum", level: "Hard" },
            { id: "bt_h2", title: "Serialize and Deserialize Binary Tree", level: "Hard" },
            { id: "bt_h3", title: "Construct Binary Tree from Preorder and Inorder", level: "Hard" },
            { id: "bt_h4", title: "Flatten Binary Tree to Linked List", level: "Hard" },
            { id: "bt_h5", title: "Count Complete Tree Nodes in O(log^2 N)", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 9. BINARY SEARCH TREES (BST) =================
  bst: {
    id: "bst",
    title: "Binary Search Trees Catalog",
    subTopics: [
      {
        subTopicId: "bst_1",
        subTopicTitle: "1. BST Invariant, Searches & Operations",
        description: "Ordering properties, predecessor/successor links, and BST mutations.",
        questions: {
          Easy: [
            { id: "bst_e1", title: "Search in a Binary Search Tree", level: "Easy" },
            { id: "bst_e2", title: "Find Minimum / Maximum in BST", level: "Easy" },
            { id: "bst_e3", title: "Lowest Common Ancestor in a BST", level: "Easy" },
            { id: "bst_e4", title: "Inorder Predecessor and Successor in BST", level: "Easy" }
          ],
          Medium: [
            { id: "bst_m1", title: "Validate Binary Search Tree", level: "Medium" },
            { id: "bst_m2", title: "Insert a Node in a BST", level: "Medium" },
            { id: "bst_m3", title: "Delete a Node in a BST", level: "Medium" },
            { id: "bst_m4", title: "Kth Smallest Element in a BST", level: "Medium" },
            { id: "bst_m5", title: "Convert Sorted Array to Binary Search Tree", level: "Medium" },
            { id: "bst_m6", title: "Construct BST from Preorder Traversal", level: "Medium" },
            { id: "bst_m7", title: "Two Sum IV - Input is a BST", level: "Medium" }
          ],
          Hard: [
            { id: "bst_h1", title: "Recover Binary Search Tree (Two Swapped Nodes)", level: "Hard" },
            { id: "bst_h2", title: "Largest BST in a Binary Tree", level: "Hard" },
            { id: "bst_h3", title: "BST Iterator with O(1) Memory", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 10. HEAPS / PRIORITY QUEUES =================
  heaps: {
    id: "heaps",
    title: "Heaps & Priority Queues Catalog",
    subTopics: [
      {
        subTopicId: "heap_1",
        subTopicTitle: "1. Min-Heap, Max-Heap & K-Way Merges",
        description: "Complete binary trees, heapify up/down operations, and K-element tracking.",
        questions: {
          Easy: [
            { id: "hp_e1", title: "Kth Largest Element in a Stream", level: "Easy" },
            { id: "hp_e2", title: "Last Stone Weight", level: "Easy" },
            { id: "hp_e3", title: "Relative Ranks using Heap", level: "Easy" }
          ],
          Medium: [
            { id: "hp_m1", title: "Kth Largest Element in an Array", level: "Medium" },
            { id: "hp_m2", title: "Top K Frequent Elements", level: "Medium" },
            { id: "hp_m3", title: "Task Scheduler", level: "Medium" },
            { id: "hp_m4", title: "Sort Characters By Frequency", level: "Medium" },
            { id: "hp_m5", title: "K Closest Points to Origin", level: "Medium" },
            { id: "hp_m6", title: "Reorganize String No Two Adjacent Same", level: "Medium" }
          ],
          Hard: [
            { id: "hp_h1", title: "Find Median from Data Stream (Dual Heap)", level: "Hard" },
            { id: "hp_h2", title: "Merge k Sorted Lists", level: "Hard" },
            { id: "hp_h3", title: "Smallest Range Covering Elements from K Lists", level: "Hard" },
            { id: "hp_h4", title: "IPO / Maximum Capital Building", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 11. GRAPHS =================
  graphs: {
    id: "graphs",
    title: "Graphs Catalog",
    subTopics: [
      {
        subTopicId: "graph_1",
        subTopicTitle: "1. BFS, DFS, Shortest Paths & Topo Sort",
        description: "Connectivity, cycle detection, DAG orderings, and weighted shortest paths.",
        questions: {
          Easy: [
            { id: "grph_e1", title: "Flood Fill Algorithm", level: "Easy" },
            { id: "grph_e2", title: "Find Center of Star Graph", level: "Easy" },
            { id: "grph_e3", title: "Find if Path Exists in Graph", level: "Easy" }
          ],
          Medium: [
            { id: "grph_m1", title: "Number of Islands (Grid BFS/DFS)", level: "Medium" },
            { id: "grph_m2", title: "Rotting Oranges (Multi-source BFS)", level: "Medium" },
            { id: "grph_m3", title: "Detect Cycle in Undirected Graph", level: "Medium" },
            { id: "grph_m4", title: "Detect Cycle in Directed Graph", level: "Medium" },
            { id: "grph_m5", title: "Course Schedule I (Kahn's / Topo Sort)", level: "Medium" },
            { id: "grph_m6", title: "Course Schedule II (Order Retrieval)", level: "Medium" },
            { id: "grph_m7", title: "Is Graph Bipartite?", level: "Medium" },
            { id: "grph_m8", title: "Surrounded Regions (Replace O's with X's)", level: "Medium" },
            { id: "grph_m9", title: "Number of Enclaves", level: "Medium" },
            { id: "grph_m10", title: "Network Delay Time (Dijkstra)", level: "Medium" }
          ],
          Hard: [
            { id: "grph_h1", title: "Word Ladder I (Shortest Transformation)", level: "Hard" },
            { id: "grph_h2", title: "Word Ladder II (All Shortest Sequences)", level: "Hard" },
            { id: "grph_h3", title: "Alien Dictionary (Topo Order on Words)", level: "Hard" },
            { id: "grph_h4", title: "Cheapest Flights Within K Stops", level: "Hard" },
            { id: "grph_h5", title: "Number of Ways to Arrive at Destination", level: "Hard" },
            { id: "grph_h6", title: "Strongly Connected Components (Kosaraju's)", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 12. DYNAMIC PROGRAMMING (DP) =================
  dp: {
    id: "dp",
    title: "Dynamic Programming Catalog",
    subTopics: [
      {
        subTopicId: "dp_1",
        subTopicTitle: "1. 1D, 2D Grids & Strings DP",
        description: "Overlapping subproblems, optimal substructure, memoization, and tabulation.",
        questions: {
          Easy: [
            { id: "dp_e1", title: "Climbing Stairs", level: "Easy" },
            { id: "dp_e2", title: "Min Cost Climbing Stairs", level: "Easy" },
            { id: "dp_e3", title: "Fibonacci Number (Tabulation / Space Opt)", level: "Easy" }
          ],
          Medium: [
            { id: "dp_m1", title: "House Robber I", level: "Medium" },
            { id: "dp_m2", title: "House Robber II (Circular Houses)", level: "Medium" },
            { id: "dp_m3", title: "Coin Change I (Min Coins Needed)", level: "Medium" },
            { id: "dp_m4", title: "Coin Change II (Total Ways)", level: "Medium" },
            { id: "dp_m5", title: "Target Sum (0/1 Knapsack Variation)", level: "Medium" },
            { id: "dp_m6", title: "Unique Paths I (Grid DP)", level: "Medium" },
            { id: "dp_m7", title: "Unique Paths II (Grid with Obstacles)", level: "Medium" },
            { id: "dp_m8", title: "Minimum Path Sum in Grid", level: "Medium" },
            { id: "dp_m9", title: "Longest Increasing Subsequence (LIS)", level: "Medium" },
            { id: "dp_m10", title: "Longest Common Subsequence (LCS)", level: "Medium" },
            { id: "dp_m11", title: "Partition Equal Subset Sum", level: "Medium" }
          ],
          Hard: [
            { id: "dp_h1", title: "Edit Distance", level: "Hard" },
            { id: "dp_h2", title: "Burst Balloons (Matrix Chain Multiplication DP)", level: "Hard" },
            { id: "dp_h3", title: "Distinct Subsequences", level: "Hard" },
            { id: "dp_h4", title: "Wildcard Matching", level: "Hard" },
            { id: "dp_h5", title: "Regular Expression Matching", level: "Hard" },
            { id: "dp_h6", title: "Palindrome Partitioning II (Min Cuts)", level: "Hard" }
          ]
        }
      }
    ]
  }
};

export const MASTER_CATALOG_EXTENSION: Record<string, DataStructureCatalog> = {
  // ================= 11. OBJECT-ORIENTED PROGRAMMING (OOP) =================
  oops: {
    id: "oops",
    title: "Object-Oriented Programming & System Design Catalog",
    subTopics: [
      {
        subTopicId: "oop_1",
        subTopicTitle: "1. Core Pillars & Invariants (Encapsulation, Inheritance, Polymorphism)",
        description: "Access modifiers, virtual tables, dynamic dispatch, abstraction, and memory layout.",
        questions: {
          Easy: [
            { id: "oop_e1", title: "Design a Bank Account with Encapsulation", level: "Easy" },
            { id: "oop_e2", title: "Method Overloading vs Overriding Mechanics", level: "Easy" },
            { id: "oop_e3", title: "Abstract Classes vs Interfaces Model", level: "Easy" },
            { id: "oop_e4", title: "Static Members & Memory Allocation Mechanics", level: "Easy" }
          ],
          Medium: [
            { id: "oop_m1", title: "Design a Payment Gateway System (Polymorphism)", level: "Medium" },
            { id: "oop_m2", title: "Virtual Functions & VTable Mechanism (C++/Java)", level: "Medium" },
            { id: "oop_m3", title: "Shallow Copy vs Deep Copy & Copy Constructors", level: "Medium" },
            { id: "oop_m4", title: "Multiple Inheritance & Diamond Problem Resolution", level: "Medium" }
          ],
          Hard: [
            { id: "oop_h1", title: "Design an In-Memory File System Architecture", level: "Hard" },
            { id: "oop_h2", title: "Thread-Safe Singleton Class Implementation", level: "Hard" }
          ]
        }
      },
      {
        subTopicId: "oop_2",
        subTopicTitle: "2. SOLID Principles & Low-Level Design (LLD)",
        description: "Single responsibility, open-closed architecture, dependency inversion, and design patterns.",
        questions: {
          Easy: [
            { id: "oop_e5", title: "Single Responsibility Principle (SRP) Refactoring", level: "Easy" },
            { id: "oop_e6", title: "Liskov Substitution Principle (LSP) Verification", level: "Easy" }
          ],
          Medium: [
            { id: "oop_m5", title: "Design a Parking Lot System (LLD)", level: "Medium" },
            { id: "oop_m6", title: "Factory & Abstract Factory Design Pattern", level: "Medium" },
            { id: "oop_m7", title: "Observer Pattern (Pub-Sub Event Engine)", level: "Medium" },
            { id: "oop_m8", title: "Strategy Pattern for Pricing & Discount Engine", level: "Medium" },
            { id: "oop_m9", title: "Decorator Pattern for Coffee Shop Customizer", level: "Medium" }
          ],
          Hard: [
            { id: "oop_h3", title: "Design Elevator System with Scheduling Algorithms", level: "Hard" },
            { id: "oop_h4", title: "Design Rate Limiter using Token Bucket (LLD)", level: "Hard" },
            { id: "oop_h5", title: "Design Snake & Ladders Game Engine", level: "Hard" }
          ]
        }
      }
    ]
  },

  // ================= 12. CS FUNDAMENTALS =================
  csfundamentals: {
    id: "csfundamentals",
    title: "CS Fundamentals Catalog (OS, DBMS, Networks)",
    subTopics: [
      {
        subTopicId: "cs_1",
        subTopicTitle: "1. Operating Systems & Concurrency Mechanics",
        description: "Process lifecycle, thread synchronization, deadlocks, virtual memory, and page replacement.",
        questions: {
          Easy: [
            { id: "os_e1", title: "Process vs Thread State Transition Model", level: "Easy" },
            { id: "os_e2", title: "CPU Scheduling Algorithms (FCFS, SJF, RR)", level: "Easy" },
            { id: "os_e3", title: "User Mode vs Kernel Mode Context Switching", level: "Easy" }
          ],
          Medium: [
            { id: "os_m1", title: "Producer-Consumer Problem (Mutex & Semaphores)", level: "Medium" },
            { id: "os_m2", title: "Banker's Algorithm for Deadlock Avoidance", level: "Medium" },
            { id: "os_m3", title: "Page Replacement Algorithms (LRU, FIFO, Optimal)", level: "Medium" },
            { id: "os_m4", title: "Readers-Writers Problem Synchronization", level: "Medium" }
          ],
          Hard: [
            { id: "os_h1", title: "Design a Custom Thread Pool Engine", level: "Hard" },
            { id: "os_h2", title: "Virtual Memory Paging & TLB Hit Rate Analyzer", level: "Hard" }
          ]
        }
      },
      {
        subTopicId: "cs_2",
        subTopicTitle: "2. Database Management Systems (DBMS & SQL)",
        description: "ACID guarantees, indexing strategies (B+ Trees), normalization, and transaction locks.",
        questions: {
          Easy: [
            { id: "db_e1", title: "SQL Joins & Aggregations Practice", level: "Easy" },
            { id: "db_e2", title: "Primary Key vs Foreign Key & Constraints", level: "Easy" },
            { id: "db_e3", title: "1NF, 2NF, 3NF Normalization Refactoring", level: "Easy" }
          ],
          Medium: [
            { id: "db_m1", title: "B+ Tree Indexing vs Full Table Scan Mechanics", level: "Medium" },
            { id: "db_m2", title: "ACID Properties & Transaction Isolation Levels", level: "Medium" },
            { id: "db_m3", title: "SQL Query Optimization & EXPLAIN Execution Plans", level: "Medium" },
            { id: "db_m4", title: "Shared Locks vs Exclusive Locks (2PL Concurrency)", level: "Medium" }
          ],
          Hard: [
            { id: "db_h1", title: "WAL (Write-Ahead Logging) & Recovery Engine", level: "Hard" },
            { id: "db_h2", title: "Distributed Database Sharding & Consistent Hashing", level: "Hard" }
          ]
        }
      },
      {
        subTopicId: "cs_3",
        subTopicTitle: "3. Computer Networks & Web Protocols",
        description: "OSI/TCP-IP stacks, handshake flows, HTTP/HTTPS, DNS resolution, and WebSockets.",
        questions: {
          Easy: [
            { id: "net_e1", title: "OSI 7-Layer Stack vs TCP/IP Protocol Suite", level: "Easy" },
            { id: "net_e2", title: "HTTP Status Codes & RESTful Endpoints Design", level: "Easy" }
          ],
          Medium: [
            { id: "net_m1", title: "TCP 3-Way Handshake & 4-Way Teardown Flow", level: "Medium" },
            { id: "net_m2", title: "HTTPS TLS/SSL Handshake & Symmetric Encryption", level: "Medium" },
            { id: "net_m3", title: "DNS Lookup Hierarchy & Caching Strategy", level: "Medium" },
            { id: "net_m4", title: "WebSockets vs Server-Sent Events (SSE) vs Polling", level: "Medium" }
          ],
          Hard: [
            { id: "net_h1", title: "TCP Congestion Control (Reno, Cubic) Mechanics", level: "Hard" },
            { id: "net_h2", title: "Design a Distributed CDN Caching Edge Node", level: "Hard" }
          ]
        }
      }
    ]
  }
};

// Add OOP & CS Fundamentals Topics to MASTER_CATALOG
MASTER_CATALOG.oops = MASTER_CATALOG_EXTENSION.oops;
MASTER_CATALOG.csfundamentals = MASTER_CATALOG_EXTENSION.csfundamentals;
