export const dsaSheetsData = [
  {
    title: "Arrays",
    pattern: "Array Manipulation & Sequences",
    questions: [
      {
        id: "arr_1",
        title: "Two Sum",
        pattern: "Hash Table / Complement Lookup",
        role: "Primary Classic",
        level: "Easy",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }],
        constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
        solutions: {
          javascript: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}",
          python: "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []",
          java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (mp.count(diff)) return {mp[diff], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};"
        }
      },
      {
        id: "arr_2",
        title: "Best Time to Buy and Sell Stock",
        pattern: "One Pass Greedy / Running Minimum",
        role: "Primary Classic",
        level: "Easy",
        description: "You are given an array `prices` where `prices[i]` is the price of a stock on the `i`-th day. Return maximum profit achievable from a single transaction.",
        examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." }],
        constraints: ["1 <= prices.length <= 10^5"],
        solutions: {
          javascript: "function maxProfit(prices) {\n  let minPrice = Infinity, maxProfit = 0;\n  for (let price of prices) {\n    if (price < minPrice) minPrice = price;\n    else maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}",
          python: "def maxProfit(prices):\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        min_p = min(min_p, p)\n        max_p = max(max_p, p - min_p)\n    return max_p",
          java: "class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else maxP = Math.max(maxP, p - minP);\n        }\n        return maxP;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minP = INT_MAX, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else maxP = max(maxP, p - minP);\n        }\n        return maxP;\n    }\n};"
        }
      },
      {
        id: "arr_3",
        title: "Contains Duplicate",
        pattern: "Hash Set Uniqueness Check",
        role: "Primary Classic",
        level: "Easy",
        description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
        examples: [{ input: "nums = [1,2,3,1]", output: "true" }],
        constraints: ["1 <= nums.length <= 10^5"],
        solutions: {
          javascript: "function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}",
          python: "def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)",
          java: "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) if (!set.add(n)) return true;\n        return false;\n    }\n}",
          cpp: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> st;\n        for (int n : nums) if (!st.insert(n).second) return true;\n        return false;\n    }\n};"
        }
      },
      {
        id: "arr_4",
        title: "Product of Array Except Self",
        pattern: "Prefix & Postfix Accumulation",
        role: "Must-Know Follow-Up",
        level: "Medium",
        description: "Given integer array `nums`, return an array `answer` where `answer[i]` equals product of all elements except `nums[i]` without using division in O(N).",
        examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }],
        constraints: ["2 <= nums.length <= 10^5"],
        solutions: {
          javascript: "function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  let prefix = 1, postfix = 1;\n  for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }\n  for (let i = n - 1; i >= 0; i--) { res[i] *= postfix; postfix *= nums[i]; }\n  return res;\n}",
          python: "def productExceptSelf(nums):\n    n = len(nums); res = [1] * n\n    prefix = postfix = 1\n    for i in range(n): res[i] = prefix; prefix *= nums[i]\n    for i in range(n - 1, -1, -1): res[i] *= postfix; postfix *= nums[i]\n    return res",
          java: "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length, res[] = new int[n];\n        int prefix = 1, postfix = 1;\n        for (int i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }\n        for (int i = n - 1; i >= 0; i--) { res[i] *= postfix; postfix *= nums[i]; }\n        return res;\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size(); vector<int> res(n, 1);\n        int prefix = 1, postfix = 1;\n        for (int i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }\n        for (int i = n - 1; i >= 0; i--) { res[i] *= postfix; postfix *= nums[i]; }\n        return res;\n    }\n};"
        }
      },
      {
        id: "arr_5",
        title: "Maximum Subarray (Kadane's)",
        pattern: "Kadane's Dynamic Programming",
        role: "Primary Classic",
        level: "Medium",
        description: "Given an integer array `nums`, find the contiguous subarray with the largest sum and return its sum.",
        examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6." }],
        constraints: ["1 <= nums.length <= 10^5"],
        solutions: {
          javascript: "function maxSubArray(nums) {\n  let maxSoFar = nums[0], currMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}",
          python: "def maxSubArray(nums):\n    max_so_far = curr_max = nums[0]\n    for x in nums[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far",
          java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0], currMax = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currMax = Math.max(nums[i], currMax + nums[i]);\n            maxSoFar = Math.max(maxSoFar, currMax);\n        }\n        return maxSoFar;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSoFar = nums[0], currMax = nums[0];\n        for (size_t i = 1; i < nums.size(); i++) {\n            currMax = max(nums[i], currMax + nums[i]);\n            maxSoFar = max(maxSoFar, currMax);\n        }\n        return maxSoFar;\n    }\n};"
        }
      },
      {
        id: "arr_6",
        title: "Maximum Product Subarray",
        pattern: "Min/Max Dual Running Tracking",
        role: "Must-Know Follow-Up",
        level: "Medium",
        description: "Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return the product.",
        examples: [{ input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." }],
        constraints: ["1 <= nums.length <= 2 * 10^4"],
        solutions: {
          javascript: "function maxProduct(nums) {\n  let res = nums[0], curMin = nums[0], curMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    const n = nums[i];\n    if (n < 0) [curMin, curMax] = [curMax, curMin];\n    curMax = Math.max(n, curMax * n);\n    curMin = Math.min(n, curMin * n);\n    res = Math.max(res, curMax);\n  }\n  return res;\n}",
          python: "def maxProduct(nums):\n    res = max_p = min_p = nums[0]\n    for n in nums[1:]:\n        if n < 0: max_p, min_p = min_p, max_p\n        max_p = max(n, max_p * n)\n        min_p = min(n, min_p * n)\n        res = max(res, max_p)\n    return res",
          java: "class Solution {\n    public int maxProduct(int[] nums) {\n        int res = nums[0], maxP = nums[0], minP = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] < 0) { int tmp = maxP; maxP = minP; minP = tmp; }\n            maxP = Math.max(nums[i], maxP * nums[i]);\n            minP = Math.min(nums[i], minP * nums[i]);\n            res = Math.max(res, maxP);\n        }\n        return res;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        int res = nums[0], maxP = nums[0], minP = nums[0];\n        for (int i = 1; i < nums.size(); i++) {\n            if (nums[i] < 0) swap(maxP, minP);\n            maxP = max(nums[i], maxP * nums[i]);\n            minP = min(nums[i], minP * nums[i]);\n            res = max(res, maxP);\n        }\n        return res;\n    }\n};"
        }
      },
      {
        id: "arr_7",
        title: "Find Minimum in Rotated Sorted Array",
        pattern: "Binary Search Boundary Pivot",
        role: "Primary Classic",
        level: "Medium",
        description: "Given a rotated sorted array of unique elements, return the minimum element in O(log N) time.",
        examples: [{ input: "nums = [3,4,5,1,2]", output: "1" }],
        constraints: ["1 <= nums.length <= 5000"],
        solutions: {
          javascript: "function findMin(nums) {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] > nums[r]) l = mid + 1;\n    else r = mid;\n  }\n  return nums[l];\n}",
          python: "def findMin(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]: l = mid + 1\n        else: r = mid\n    return nums[l]",
          java: "class Solution {\n    public int findMin(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[r]) l = mid + 1;\n            else r = mid;\n        }\n        return nums[l];\n    }\n}",
          cpp: "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int l = 0, r = nums.size() - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[r]) l = mid + 1;\n            else r = mid;\n        }\n        return nums[l];\n    }\n};"
        }
      },
      {
        id: "arr_8",
        title: "Search in Rotated Sorted Array",
        pattern: "Sorted Half Decision Bisect",
        role: "Must-Know Follow-Up",
        level: "Medium",
        description: "Given a rotated sorted array `nums` and a `target`, return the index of `target` or -1 if not found in O(log N) time.",
        examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }],
        constraints: ["1 <= nums.length <= 5000"],
        solutions: {
          javascript: "function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}",
          python: "def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1",
          java: "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n};"
        }
      },
      {
        id: "arr_9",
        title: "3Sum",
        pattern: "Sorted Triplet Pointer Search",
        role: "Primary Classic",
        level: "Medium",
        description: "Given an integer array `nums`, return all distinct triplets `[nums[i], nums[j], nums[k]]` such that `nums[i] + nums[j] + nums[k] == 0`.",
        examples: [{ input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }],
        constraints: ["3 <= nums.length <= 3000"],
        solutions: {
          javascript: "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      } else if (sum < 0) l++; else r--;\n    }\n  }\n  return res;\n}",
          python: "def threeSum(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]: continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]: l += 1\n                while l < r and nums[r] == nums[r - 1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0: l += 1\n            else: r -= 1\n    return res",
          java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++; else r--;\n            }\n        }\n        return res;\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        for (int i = 0; i < nums.size() - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.size() - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++; else r--;\n            }\n        }\n        return res;\n    }\n};"
        }
      },
      {
        id: "arr_10",
        title: "Container With Most Water",
        pattern: "Two Pointers Greedy Squeeze",
        role: "Primary Classic",
        level: "Medium",
        description: "Given `n` vertical line heights, find two lines that together with x-axis form a container holding maximum water volume.",
        examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }],
        constraints: ["2 <= height.length <= 10^5"],
        solutions: {
          javascript: "function maxArea(height) {\n  let l = 0, r = height.length - 1, maxA = 0;\n  while (l < r) {\n    const area = Math.min(height[l], height[r]) * (r - l);\n    maxA = Math.max(maxA, area);\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return maxA;\n}",
          python: "def maxArea(height):\n    l, r, max_a = 0, len(height) - 1, 0\n    while l < r:\n        area = min(height[l], height[r]) * (r - l)\n        max_a = max(max_a, area)\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return max_a",
          java: "class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1, maxA = 0;\n        while (l < r) {\n            int area = Math.min(height[l], height[r]) * (r - l);\n            maxA = Math.max(maxA, area);\n            if (height[l] < height[r]) l++; else r--;\n        }\n        return maxA;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1, maxA = 0;\n        while (l < r) {\n            int area = min(height[l], height[r]) * (r - l);\n            maxA = max(maxA, area);\n            if (height[l] < height[r]) l++; else r--;\n        }\n        return maxA;\n    }\n};"
        }
      },
      {
        id: "arr_11",
        title: "Merge Intervals",
        pattern: "Interval Sorting & Overlap Consolidation",
        role: "Primary Classic",
        level: "Medium",
        description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals.",
        examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
        constraints: ["1 <= intervals.length <= 10^4"],
        solutions: {
          javascript: "function merge(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n    else res.push(intervals[i]);\n  }\n  return res;\n}",
          python: "def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    res = [intervals[0]]\n    for start, end in intervals[1:]:\n        if start <= res[-1][1]: res[-1][1] = max(res[-1][1], end)\n        else: res.append([start, end])\n    return res",
          java: "class Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> res = new ArrayList<>();\n        int[] curr = intervals[0]; res.add(curr);\n        for (int[] next : intervals) {\n            if (next[0] <= curr[1]) curr[1] = Math.max(curr[1], next[1]);\n            else { curr = next; res.add(curr); }\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& interval : intervals) {\n            if (res.empty() || res.back()[1] < interval[0]) res.push_back(interval);\n            else res.back()[1] = max(res.back()[1], interval[1]);\n        }\n        return res;\n    }\n};"
        }
      },
      {
        id: "arr_12",
        title: "Insert Interval",
        pattern: "Three Phase Interval Processing",
        role: "Must-Know Follow-Up",
        level: "Medium",
        description: "Insert a `newInterval` into non-overlapping sorted `intervals` and merge if necessary.",
        examples: [{ input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" }],
        constraints: ["0 <= intervals.length <= 10^4"],
        solutions: {
          javascript: "function insert(intervals, newInterval) {\n  const res = [];\n  let i = 0, n = intervals.length;\n  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);\n  while (i < n && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  while (i < n) res.push(intervals[i++]);\n  return res;\n}",
          python: "def insert(intervals, newInterval):\n    res = []\n    for i, inv in enumerate(intervals):\n        if newInterval[1] < inv[0]:\n            return res + [newInterval] + intervals[i:]\n        elif newInterval[0] > inv[1]:\n            res.append(inv)\n        else:\n            newInterval = [min(newInterval[0], inv[0]), max(newInterval[1], inv[1])]\n    return res + [newInterval]",
          java: "class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        List<int[]> res = new ArrayList<>();\n        int i = 0, n = intervals.length;\n        while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.add(newInterval);\n        while (i < n) res.add(intervals[i++]);\n        return res.toArray(new int[res.size()][]);\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        vector<vector<int>> res;\n        int i = 0, n = intervals.size();\n        while (i < n && intervals[i][1] < newInterval[0]) res.push_back(intervals[i++]);\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = min(newInterval[0], intervals[i][0]);\n            newInterval[1] = max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.push_back(newInterval);\n        while (i < n) res.push_back(intervals[i++]);\n        return res;\n    }\n};"
        }
      },
      {
        id: "arr_13",
        title: "Non-overlapping Intervals",
        pattern: "Greedy Interval Removal by End Time",
        role: "Primary Classic",
        level: "Medium",
        description: "Return minimum number of intervals you need to remove to make remaining intervals non-overlapping.",
        examples: [{ input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "[1,3] can be removed and the rest are non-overlapping." }],
        constraints: ["1 <= intervals.length <= 10^5"],
        solutions: {
          javascript: "function eraseOverlapIntervals(intervals) {\n  if (!intervals.length) return 0;\n  intervals.sort((a, b) => a[1] - b[1]);\n  let count = 0, prevEnd = intervals[0][1];\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < prevEnd) count++;\n    else prevEnd = intervals[i][1];\n  }\n  return count;\n}",
          python: "def eraseOverlapIntervals(intervals):\n    intervals.sort(key=lambda x: x[1])\n    count = 0; prev_end = intervals[0][1]\n    for start, end in intervals[1:]:\n        if start < prev_end: count += 1\n        else: prev_end = end\n    return count",
          java: "class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n        int count = 0, prevEnd = intervals[0][1];\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] < prevEnd) count++;\n            else prevEnd = intervals[i][1];\n        }\n        return count;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b){ return a[1] < b[1]; });\n        int count = 0, prevEnd = intervals[0][1];\n        for (size_t i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] < prevEnd) count++;\n            else prevEnd = intervals[i][1];\n        }\n        return count;\n    }\n};"
        }
      },
      {
        id: "arr_14",
        title: "Meeting Rooms II",
        pattern: "Min-Heap / Chronological Pointer Sweep",
        role: "Primary Classic",
        level: "Medium",
        description: "Given an array of meeting time intervals, find the minimum number of conference rooms required.",
        examples: [{ input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" }],
        constraints: ["1 <= intervals.length <= 10^4"],
        solutions: {
          javascript: "function minMeetingRooms(intervals) {\n  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);\n  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);\n  let rooms = 0, endPtr = 0;\n  for (let i = 0; i < starts.length; i++) {\n    if (starts[i] < ends[endPtr]) rooms++;\n    else endPtr++;\n  }\n  return rooms;\n}",
          python: "def minMeetingRooms(intervals):\n    starts = sorted([i[0] for i in intervals])\n    ends = sorted([i[1] for i in intervals])\n    res = end_p = 0\n    for s in starts:\n        if s < ends[end_p]: res += 1\n        else: end_p += 1\n    return res",
          java: "class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        int[] starts = new int[intervals.length], ends = new int[intervals.length];\n        for (int i = 0; i < intervals.length; i++) { starts[i] = intervals[i][0]; ends[i] = intervals[i][1]; }\n        Arrays.sort(starts); Arrays.sort(ends);\n        int rooms = 0, endPtr = 0;\n        for (int i = 0; i < starts.length; i++) {\n            if (starts[i] < ends[endPtr]) rooms++; else endPtr++;\n        }\n        return rooms;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int minMeetingRooms(vector<vector<int>>& intervals) {\n        vector<int> starts, ends;\n        for (auto& i : intervals) { starts.push_back(i[0]); ends.push_back(i[1]); }\n        sort(starts.begin(), starts.end()); sort(ends.begin(), ends.end());\n        int rooms = 0, endPtr = 0;\n        for (size_t i = 0; i < starts.size(); i++) {\n            if (starts[i] < ends[endPtr]) rooms++; else endPtr++;\n        }\n        return rooms;\n    }\n};"
        }
      },
      {
        id: "arr_15",
        title: "Set Matrix Zeroes",
        pattern: "First Row/Col In-Place Markers",
        role: "Must-Know Follow-Up",
        level: "Medium",
        description: "Given an `m x n` integer matrix, if an element is 0, set its entire row and column to 0s in-place with O(1) space.",
        examples: [{ input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" }],
        constraints: ["m == matrix.length", "n == matrix[0].length"],
        solutions: {
          javascript: "function setZeroes(matrix) {\n  const m = matrix.length, n = matrix[0].length;\n  let firstColZero = false;\n  for (let r = 0; r < m; r++) {\n    if (matrix[r][0] === 0) firstColZero = true;\n    for (let c = 1; c < n; c++) {\n      if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; }\n    }\n  }\n  for (let r = m - 1; r >= 0; r--) {\n    for (let c = n - 1; c >= 1; c--) {\n      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;\n    }\n    if (firstColZero) matrix[r][0] = 0;\n  }\n}",
          python: "def setZeroes(matrix):\n  m, n = len(matrix), len(matrix[0])\n  first_col = False\n  for r in range(m):\n    if matrix[r][0] == 0: first_col = True\n    for c in range(1, n):\n      if matrix[r][c] == 0: matrix[r][0] = matrix[0][c] = 0\n  for r in range(m - 1, -1, -1):\n    for c in range(n - 1, 0, -1):\n      if matrix[r][0] == 0 or matrix[0][c] == 0: matrix[r][c] = 0\n    if first_col: matrix[r][0] = 0",
          java: "class Solution {\n    public void setZeroes(int[][] matrix) {\n        int m = matrix.length, n = matrix[0].length;\n        boolean col0 = false;\n        for (int r = 0; r < m; r++) {\n            if (matrix[r][0] == 0) col0 = true;\n            for (int c = 1; c < n; c++) {\n                if (matrix[r][c] == 0) matrix[r][0] = matrix[0][c] = 0;\n            }\n        }\n        for (int r = m - 1; r >= 0; r--) {\n            for (int c = n - 1; c >= 1; c--) {\n                if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n            }\n            if (col0) matrix[r][0] = 0;\n        }\n    }\n}",
          cpp: "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        int m = matrix.size(), n = matrix[0].size();\n        bool col0 = false;\n        for (int r = 0; r < m; r++) {\n            if (matrix[r][0] == 0) col0 = true;\n            for (int c = 1; c < n; c++) {\n                if (matrix[r][c] == 0) matrix[r][0] = matrix[0][c] = 0;\n            }\n        }\n        for (int r = m - 1; r >= 0; r--) {\n            for (int c = n - 1; c >= 1; c--) {\n                if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n            }\n            if (col0) matrix[r][0] = 0;\n        }\n    }\n};"
        }
      },
      {
        id: "arr_16",
        title: "Spiral Matrix",
        pattern: "4-Boundary Shrinking Loop",
        role: "Primary Classic",
        level: "Medium",
        description: "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
        examples: [{ input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }],
        constraints: ["m == matrix.length", "n == matrix[i].length"],
        solutions: {
          javascript: "function spiralOrder(matrix) {\n  const res = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let i = left; i <= right; i++) res.push(matrix[top][i]);\n    top++;\n    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);\n    right--;\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);\n      left++;\n    }\n  }\n  return res;\n}",
          python: "def spiralOrder(matrix):\n    res = []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    while top <= bottom and left <= right:\n        for i in range(left, right + 1): res.append(matrix[top][i])\n        top += 1\n        for i in range(top, bottom + 1): res.append(matrix[i][right])\n        right -= 1\n        if top <= bottom:\n            for i in range(right, left - 1, -1): res.append(matrix[bottom][i])\n            bottom -= 1\n        if left <= right:\n            for i in range(bottom, top - 1, -1): res.append(matrix[i][left])\n            left += 1\n    return res",
          java: "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) res.add(matrix[top][i]); top++;\n            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]); right--;\n            if (top <= bottom) { for (int i = right; i >= left; i--) res.add(matrix[bottom][i]); bottom--; }\n            if (left <= right) { for (int i = bottom; i >= top; i--) res.add(matrix[i][left]); left++; }\n        }\n        return res;\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        vector<int> res;\n        int top = 0, bottom = matrix.size() - 1;\n        int left = 0, right = matrix[0].size() - 1;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) res.push_back(matrix[top][i]); top++;\n            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]); right--;\n            if (top <= bottom) { for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]); bottom--; }\n            if (left <= right) { for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]); left++; }\n        }\n        return res;\n    }\n};"
        }
      },
      {
        id: "arr_17",
        title: "Rotate Image",
        pattern: "Matrix Transpose + Reverse Rows",
        role: "Primary Classic",
        level: "Medium",
        description: "You are given an `n x n` 2D matrix representing an image. Rotate the image by 90 degrees clockwise in-place.",
        examples: [{ input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }],
        constraints: ["n == matrix.length == matrix[i].length"],
        solutions: {
          javascript: "function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  for (let i = 0; i < n; i++) matrix[i].reverse();\n}",
          python: "def rotate(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for row in matrix: row.reverse()",
          java: "class Solution {\n    public void rotate(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int tmp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = tmp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int tmp = matrix[i][j]; matrix[i][j] = matrix[i][n - 1 - j]; matrix[i][n - 1 - j] = tmp;\n            }\n        }\n    }\n}",
          cpp: "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        int n = matrix.size();\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) swap(matrix[i][j], matrix[j][i]);\n        }\n        for (int i = 0; i < n; i++) reverse(matrix[i].begin(), matrix[i].end());\n    }\n};"
        }
      },
      {
        id: "arr_18",
        title: "Word Search",
        pattern: "2D Grid Backtracking / DFS",
        role: "Must-Know Follow-Up",
        level: "Medium",
        description: "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.",
        examples: [{ input: "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"", output: "true" }],
        constraints: ["m == board.length", "n == board[i].length"],
        solutions: {
          javascript: "function exist(board, word) {\n  const m = board.length, n = board[0].length;\n  const dfs = (r, c, k) => {\n    if (k === word.length) return true;\n    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[k]) return false;\n    const tmp = board[r][c]; board[r][c] = '#';\n    const res = dfs(r + 1, c, k + 1) || dfs(r - 1, c, k + 1) || dfs(r, c + 1, k + 1) || dfs(r, c - 1, k + 1);\n    board[r][c] = tmp;\n    return res;\n  };\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) if (dfs(r, c, 0)) return true;\n  }\n  return false;\n}",
          python: "def exist(board, word):\n    m, n = len(board), len(board[0])\n    def dfs(r, c, k):\n        if k == len(word): return True\n        if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != word[k]: return False\n        tmp, board[r][c] = board[r][c], '#'\n        res = dfs(r+1,c,k+1) or dfs(r-1,c,k+1) or dfs(r,c+1,k+1) or dfs(r,c-1,k+1)\n        board[r][c] = tmp\n        return res\n    for r in range(m):\n        for c in range(n):\n            if dfs(r, c, 0): return True\n    return False",
          java: "class Solution {\n    public boolean exist(char[][] board, String word) {\n        int m = board.length, n = board[0].length;\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) if (dfs(board, word, r, c, 0)) return true;\n        }\n        return false;\n    }\n    private boolean dfs(char[][] board, String word, int r, int c, int k) {\n        if (k == word.length()) return true;\n        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != word.charAt(k)) return false;\n        char tmp = board[r][c]; board[r][c] = '#';\n        boolean res = dfs(board, word, r+1, c, k+1) || dfs(board, word, r-1, c, k+1) || dfs(board, word, r, c+1, k+1) || dfs(board, word, r, c-1, k+1);\n        board[r][c] = tmp;\n        return res;\n    }\n}",
          cpp: "class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        int m = board.size(), n = board[0].size();\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) if (dfs(board, word, r, c, 0)) return true;\n        }\n        return false;\n    }\n    bool dfs(vector<vector<char>>& board, string& word, int r, int c, int k) {\n        if (k == word.length()) return true;\n        if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size() || board[r][c] != word[k]) return false;\n        char tmp = board[r][c]; board[r][c] = '#';\n        bool res = dfs(board, word, r+1, c, k+1) || dfs(board, word, r-1, c, k+1) || dfs(board, word, r, c+1, k+1) || dfs(board, word, r, c-1, k+1);\n        board[r][c] = tmp;\n        return res;\n    }\n};"
        }
      },
      {
        id: "arr_19",
        title: "First Missing Positive",
        pattern: "In-Place Cyclic Sort Placement",
        role: "Must-Know Follow-Up",
        level: "Hard",
        description: "Given an unsorted integer array `nums`, return the smallest missing positive integer in O(N) time and O(1) auxiliary space.",
        examples: [{ input: "nums = [1,2,0]", output: "3" }, { input: "nums = [3,4,-1,1]", output: "2" }],
        constraints: ["1 <= nums.length <= 10^5"],
        solutions: {
          javascript: "function firstMissingPositive(nums) {\n  const n = nums.length;\n  for (let i = 0; i < n; i++) {\n    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {\n      const targetIdx = nums[i] - 1;\n      [nums[i], nums[targetIdx]] = [nums[targetIdx], nums[i]];\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    if (nums[i] !== i + 1) return i + 1;\n  }\n  return n + 1;\n}",
          python: "def firstMissingPositive(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n            idx = nums[i] - 1\n            nums[i], nums[idx] = nums[idx], nums[i]\n    for i in range(n):\n        if nums[i] != i + 1: return i + 1\n    return n + 1",
          java: "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                int tmp = nums[nums[i] - 1];\n                nums[nums[i] - 1] = nums[i];\n                nums[i] = tmp;\n            }\n        }\n        for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;\n        return n + 1;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                swap(nums[i], nums[nums[i] - 1]);\n            }\n        }\n        for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;\n        return n + 1;\n    }\n};"
        }
      },
      {
        id: "arr_20",
        title: "Trapping Rain Water",
        pattern: "Two Pointers Max Heights Squeeze",
        role: "Primary Classic",
        level: "Hard",
        description: "Given `n` non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.",
        examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
        constraints: ["n == height.length", "1 <= n <= 2 * 10^4"],
        solutions: {
          javascript: "function trap(height) {\n  let l = 0, r = height.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (l < r) {\n    if (height[l] < height[r]) {\n      if (height[l] >= leftMax) leftMax = height[l];\n      else water += leftMax - height[l];\n      l++;\n    } else {\n      if (height[r] >= rightMax) rightMax = height[r];\n      else water += rightMax - height[r];\n      r--;\n    }\n  }\n  return water;\n}",
          python: "def trap(height):\n    l, r = 0, len(height) - 1\n    left_max = right_max = water = 0\n    while l < r:\n        if height[l] < height[r]:\n            if height[l] >= left_max: left_max = height[l]\n            else: water += left_max - height[l]\n            l += 1\n        else:\n            if height[r] >= right_max: right_max = height[r]\n            else: water += right_max - height[r]\n            r -= 1\n    return water",
          java: "class Solution {\n    public int trap(int[] height) {\n        int l = 0, r = height.length - 1;\n        int leftMax = 0, rightMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= leftMax) leftMax = height[l];\n                else water += leftMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rightMax) rightMax = height[r];\n                else water += rightMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int leftMax = 0, rightMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= leftMax) leftMax = height[l];\n                else water += leftMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rightMax) rightMax = height[r];\n                else water += rightMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n};"
        }
      }
    ]
  },
  {
    title: "Strings",
    pattern: "String Matching & Anagrams",
    questions: [
      {
        id: "str_1",
        title: "Valid Anagram",
        pattern: "Frequency Counter",
        role: "Primary Classic",
        level: "Easy",
        description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
        examples: [{ input: "s = \"anagram\", t = \"nagaram\"", output: "true" }],
        constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
        solutions: {
          javascript: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let char of s) count[char] = (count[char] || 0) + 1;\n  for (let char of t) {\n    if (!count[char]) return false;\n    count[char]--;\n  }\n  return true;\n}",
          python: "def isAnagram(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    count = {}\n    for c in s: count[c] = count.get(c, 0) + 1\n    for c in t:\n        if count.get(c, 0) == 0: return False\n        count[c] -= 1\n    return True",
          java: "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n        for (char c : t.toCharArray()) {\n            if (--count[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}",
          cpp: "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) return false;\n        vector<int> count(26, 0);\n        for (char c : s) count[c - 'a']++;\n        for (char c : t) {\n            if (--count[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n};"
        }
      },
      {
        id: "str_2",
        title: "Valid Palindrome",
        pattern: "Two Pointers Clean Squeeze",
        role: "Primary Classic",
        level: "Easy",
        description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing non-alphanumeric characters, it reads the same forward and backward.",
        examples: [{ input: "s = \"A man, a plan, a canal: Panama\"", output: "true" }],
        constraints: ["1 <= s.length <= 2 * 10^5"],
        solutions: {
          javascript: "function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let l = 0, r = clean.length - 1;\n  while (l < r) {\n    if (clean[l++] !== clean[r--]) return false;\n  }\n  return true;\n}",
          python: "def isPalindrome(s):\n    c = [ch.lower() for ch in s if ch.isalnum()]\n    return c == c[::-1]",
          java: "class Solution {\n    public boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n}",
          cpp: "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !isalnum(s[l])) l++;\n            while (l < r && !isalnum(s[r])) r--;\n            if (tolower(s[l]) != tolower(s[r])) return false;\n            l++; r--;\n        }\n        return true;\n    }\n};"
        }
      },
      {
        id: "str_3",
        title: "Group Anagrams",
        pattern: "Categorization Hash Map",
        role: "Primary Classic",
        level: "Medium",
        description: "Given an array of strings `strs`, group the anagrams together in any order.",
        examples: [{ input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" }],
        constraints: ["1 <= strs.length <= 10^4"],
        solutions: {
          javascript: "function groupAnagrams(strs) {\n  const map = new Map();\n  for (let str of strs) {\n    const sorted = str.split('').sort().join('');\n    if (!map.has(sorted)) map.set(sorted, []);\n    map.get(sorted).push(str);\n  }\n  return Array.from(map.values());\n}",
          python: "def groupAnagrams(strs):\n    d = {}\n    for s in strs:\n        key = ''.join(sorted(s))\n        d.setdefault(key, []).append(s)\n    return list(d.values())",
          java: "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray(); Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> mp;\n        for (string s : strs) {\n            string t = s; sort(t.begin(), t.end());\n            mp[t].push_back(s);\n        }\n        vector<vector<string>> res;\n        for (auto p : mp) res.push_back(p.second);\n        return res;\n    }\n};"
        }
      },
      {
        id: "str_4",
        title: "Longest Substring Without Repeating Characters",
        pattern: "Sliding Window",
        role: "Must-Know Follow-Up",
        level: "Medium",
        description: "Given a string `s`, find the length of the longest substring without repeating characters.",
        examples: [{ input: "s = \"abcabcbb\"", output: "3", explanation: "Answer is \"abc\" with length 3." }],
        constraints: ["0 <= s.length <= 5 * 10^4"],
        solutions: {
          javascript: "function lengthOfLongestSubstring(s) {\n  let set = new Set(), left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) set.delete(s[left++]);\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}",
          python: "def lengthOfLongestSubstring(s: str) -> int:\n    charSet = set(); l = max_len = 0\n    for r in range(len(s)):\n        while s[r] in charSet:\n            charSet.remove(s[l]); l += 1\n        charSet.add(s[r])\n        max_len = max(max_len, r - l + 1)\n    return max_len",
          java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> set = new HashSet<>();\n        int l = 0, maxLen = 0;\n        for (int r = 0; r < s.length(); r++) {\n            while (set.contains(s.charAt(r))) set.remove(s.charAt(l++));\n            set.add(s.charAt(r));\n            maxLen = Math.max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> st; int l = 0, maxLen = 0;\n        for (int r = 0; r < s.length(); r++) {\n            while (st.count(s[r])) st.erase(s[l++]);\n            st.insert(s[r]);\n            maxLen = max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n};"
        }
      },
      {
        id: "str_5",
        title: "Longest Palindromic Substring",
        pattern: "Expand Around Center",
        role: "Primary Classic",
        level: "Medium",
        description: "Given a string `s`, return the longest palindromic substring in `s`.",
        examples: [{ input: "s = \"babad\"", output: "\"bab\"" }],
        constraints: ["1 <= s.length <= 1000"],
        solutions: {
          javascript: "function longestPalindrome(s) {\n  let res = \"\";\n  for (let i = 0; i < s.length; i++) {\n    let s1 = expand(s, i, i);\n    let s2 = expand(s, i, i + 1);\n    if (s1.length > res.length) res = s1;\n    if (s2.length > res.length) res = s2;\n  }\n  return res;\n}\nfunction expand(s, l, r) {\n  while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n  return s.slice(l + 1, r);\n}",
          python: "def longestPalindrome(s):\n    res = \"\"\n    for i in range(len(s)):\n        p1 = expand(s, i, i)\n        p2 = expand(s, i, i + 1)\n        res = max(res, p1, p2, key=len)\n    return res\ndef expand(s, l, r):\n    while l >= 0 and r < len(s) and s[l] == s[r]: l -= 1; r += 1\n    return s[l+1:r]",
          java: "class Solution {\n    public String longestPalindrome(String s) {\n        String res = \"\";\n        for (int i = 0; i < s.length(); i++) {\n            String s1 = expand(s, i, i), s2 = expand(s, i, i + 1);\n            if (s1.length() > res.length()) res = s1;\n            if (s2.length() > res.length()) res = s2;\n        }\n        return res;\n    }\n    private String expand(String s, int l, int r) {\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }\n        return s.substring(l + 1, r);\n    }\n}",
          cpp: "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        string res = \"\";\n        for (int i = 0; i < s.length(); i++) {\n            string s1 = expand(s, i, i), s2 = expand(s, i, i + 1);\n            if (s1.length() > res.length()) res = s1;\n            if (s2.length() > res.length()) res = s2;\n        }\n        return res;\n    }\n    string expand(string s, int l, int r) {\n        while (l >= 0 && r < s.length() && s[l] == s[r]) { l--; r++; }\n        return s.substr(l + 1, r - l - 1);\n    }\n};"
        }
      }
    ]
  },
  {
    title: "Linked List",
    pattern: "Node Pointer Traversal & Reversal",
    questions: [
      {
        id: "ll_1",
        title: "Reverse Linked List",
        pattern: "Iterative Pointer Reversal",
        role: "Primary Classic",
        level: "Easy",
        description: "Given the head of a singly linked list, reverse the list and return the reversed list.",
        examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }],
        constraints: ["Number of nodes in the list is in range [0, 5000]."],
        solutions: {
          javascript: "function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}",
          python: "def reverseList(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
          java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n}",
          cpp: "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode *prev = nullptr, *curr = head;\n        while (curr) {\n            ListNode* next = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n};"
        }
      },
      {
        id: "ll_2",
        title: "Linked List Cycle",
        pattern: "Floyd's Fast & Slow Pointers",
        role: "Primary Classic",
        level: "Easy",
        description: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.",
        examples: [{ input: "head = [3,2,0,-4], pos = 1", output: "true" }],
        constraints: ["Number of nodes is in range [0, 10^4]."],
        solutions: {
          javascript: "function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}",
          python: "def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False",
          java: "public class Solution {\n    public boolean hasCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n}",
          cpp: "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};"
        }
      },
      {
        id: "ll_3",
        title: "Merge Two Sorted Lists",
        pattern: "Dummy Head Iteration",
        role: "Must-Know Follow-Up",
        level: "Easy",
        description: "Merge two sorted linked lists into one sorted linked list.",
        examples: [{ input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" }],
        constraints: ["Number of nodes in both lists is in range [0, 50]."],
        solutions: {
          javascript: "function mergeTwoLists(l1, l2) {\n  const dummy = new ListNode(0);\n  let curr = dummy;\n  while (l1 && l2) {\n    if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }\n    else { curr.next = l2; l2 = l2.next; }\n    curr = curr.next;\n  }\n  curr.next = l1 || l2;\n  return dummy.next;\n}",
          python: "def mergeTwoLists(l1, l2):\n    dummy = curr = ListNode(0)\n    while l1 and l2:\n        if l1.val < l2.val: curr.next = l1; l1 = l1.next\n        else: curr.next = l2; l2 = l2.next\n        curr = curr.next\n    curr.next = l1 or l2\n    return dummy.next",
          java: "class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0), curr = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }\n            else { curr.next = l2; l2 = l2.next; }\n            curr = curr.next;\n        }\n        curr.next = (l1 != null) ? l1 : l2;\n        return dummy.next;\n    }\n}",
          cpp: "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0), *curr = &dummy;\n        while (l1 && l2) {\n            if (l1->val < l2->val) { curr->next = l1; l1 = l1->next; }\n            else { curr->next = l2; l2 = l2->next; }\n            curr = curr->next;\n        }\n        curr->next = l1 ? l1 : l2;\n        return dummy.next;\n    }\n};"
        }
      },
      {
        id: "ll_4",
        title: "Remove Nth Node From End of List",
        pattern: "Two Pointer Gap Technique",
        role: "Primary Classic",
        level: "Medium",
        description: "Given the head of a linked list, remove the nth node from the end of the list and return its head in one pass.",
        examples: [{ input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" }],
        constraints: ["1 <= sz <= 30"],
        solutions: {
          javascript: "function removeNthFromEnd(head, n) {\n  const dummy = new ListNode(0, head);\n  let fast = dummy, slow = dummy;\n  for (let i = 0; i <= n; i++) fast = fast.next;\n  while (fast) { fast = fast.next; slow = slow.next; }\n  slow.next = slow.next.next;\n  return dummy.next;\n}",
          python: "def removeNthFromEnd(head, n):\n    dummy = ListNode(0, head)\n    fast = slow = dummy\n    for _ in range(n + 1): fast = fast.next\n    while fast:\n        fast, slow = fast.next, slow.next\n    slow.next = slow.next.next\n    return dummy.next",
          java: "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0, head);\n        ListNode fast = dummy, slow = dummy;\n        for (int i = 0; i <= n; i++) fast = fast.next;\n        while (fast != null) { fast = fast.next; slow = slow.next; }\n        slow.next = slow.next.next;\n        return dummy.next;\n    }\n}",
          cpp: "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode dummy(0, head);\n        ListNode *fast = &dummy, *slow = &dummy;\n        for (int i = 0; i <= n; i++) fast = fast->next;\n        while (fast) { fast = fast->next; slow = slow->next; }\n        slow->next = slow->next->next;\n        return dummy.next;\n    }\n};"
        }
      }
    ]
  },
  {
    title: "Binary Search",
    pattern: "Search Space Reduction",
    questions: [
      {
        id: "bs_1",
        title: "Binary Search",
        pattern: "Classic Logarithmic Bisect",
        role: "Primary Classic",
        level: "Easy",
        description: "Given array of integers `nums` sorted in ascending order and integer `target`, write a function to search `target` in `nums` in O(log N) time.",
        examples: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }],
        constraints: ["1 <= nums.length <= 10^4"],
        solutions: {
          javascript: "function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
          python: "def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1",
          java: "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n};"
        }
      },
      {
        id: "bs_2",
        title: "Search a 2D Matrix",
        pattern: "2D Flat Indexing Bisect",
        role: "Primary Classic",
        level: "Medium",
        description: "Write an efficient algorithm that searches for value `target` in an `m x n` integer matrix where each row is sorted.",
        examples: [{ input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" }],
        constraints: ["m == matrix.length", "n == matrix[i].length"],
        solutions: {
          javascript: "function searchMatrix(matrix, target) {\n  const m = matrix.length, n = matrix[0].length;\n  let l = 0, r = m * n - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    const val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    if (val < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return false;\n}",
          python: "def searchMatrix(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    l, r = 0, m * n - 1\n    while l <= r:\n        mid = (l + r) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target: return True\n        elif val < target: l = mid + 1\n        else: r = mid - 1\n    return False",
          java: "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        int m = matrix.length, n = matrix[0].length;\n        int l = 0, r = m * n - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            if (val < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return false;\n    }\n}",
          cpp: "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        int m = matrix.size(), n = matrix[0].size();\n        int l = 0, r = m * n - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            if (val < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return false;\n    }\n};"
        }
      }
    ]
  },
  {
    title: "Trees",
    pattern: "Binary Trees & BST Traversals",
    questions: [
      {
        id: "tree_1",
        title: "Maximum Depth of Binary Tree",
        pattern: "DFS Tree Height Recursion",
        role: "Primary Classic",
        level: "Easy",
        description: "Given the root of a binary tree, return its maximum depth.",
        examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }],
        constraints: ["0 <= nodes <= 10^4"],
        solutions: {
          javascript: "function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}",
          python: "def maxDepth(root):\n    if not root: return 0\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))",
          java: "class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}",
          cpp: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};"
        }
      },
      {
        id: "tree_2",
        title: "Invert Binary Tree",
        pattern: "Subtree Swap Recursion",
        role: "Primary Classic",
        level: "Easy",
        description: "Given the root of a binary tree, invert the tree (mirror left and right child nodes) and return its root.",
        examples: [{ input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }],
        constraints: ["Number of nodes in tree is in range [0, 100]."],
        solutions: {
          javascript: "function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}",
          python: "def invertTree(root):\n    if not root: return None\n    root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root",
          java: "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode left = invertTree(root.left);\n        TreeNode right = invertTree(root.right);\n        root.left = right; root.right = left;\n        return root;\n    }\n}",
          cpp: "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (!root) return nullptr;\n        TreeNode* left = invertTree(root->left);\n        TreeNode* right = invertTree(root->right);\n        root->left = right; root->right = left;\n        return root;\n    }\n};"
        }
      }
    ]
  },
  {
    title: "Graph",
    pattern: "BFS / DFS & Connectivity",
    questions: [
      {
        id: "graph_1",
        title: "Number of Islands",
        pattern: "2D Grid BFS/DFS Flood Fill",
        role: "Primary Classic",
        level: "Medium",
        description: "Given an `m x n` 2D binary grid representing a map of `'1'`s (land) and `'0'`s (water), return the number of islands.",
        examples: [{ input: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", output: "1" }],
        constraints: ["m == grid.length", "n == grid[i].length"],
        solutions: {
          javascript: "function numIslands(grid) {\n  if (!grid.length) return 0;\n  let count = 0;\n  const dfs = (r, c) => {\n    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') return;\n    grid[r][c] = '0';\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  };\n  for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] === '1') { count++; dfs(r, c); }\n    }\n  }\n  return count;\n}",
          python: "def numIslands(grid):\n  if not grid: return 0\n  count = 0\n  def dfs(r, c):\n    if r < 0 or c < 0 or r >= len(grid) or c >= len(grid[0]) or grid[r][c] == '0': return\n    grid[r][c] = '0'\n    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n  for r in range(len(grid)):\n    for c in range(len(grid[0])):\n      if grid[r][c] == '1': count += 1; dfs(r, c)\n  return count",
          java: "class Solution {\n    public int numIslands(char[][] grid) {\n        int count = 0;\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[0].length; c++) {\n                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n            }\n        }\n        return count;\n    }\n    private void dfs(char[][] g, int r, int c) {\n        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] == '0') return;\n        g[r][c] = '0';\n        dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);\n    }\n}",
          cpp: "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int r = 0; r < grid.size(); r++) {\n            for (int c = 0; c < grid[0].size(); c++) {\n                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n            }\n        }\n        return count;\n    }\n    void dfs(vector<vector<char>>& g, int r, int c) {\n        if (r < 0 || c < 0 || r >= g.size() || c >= g[0].size() || g[r][c] == '0') return;\n        g[r][c] = '0';\n        dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);\n    }\n};"
        }
      }
    ]
  },
  {
    title: "DP",
    pattern: "Dynamic Programming & State Transitions",
    questions: [
      {
        id: "dp_1",
        title: "Climbing Stairs",
        pattern: "1D Fibonacci DP",
        role: "Primary Classic",
        level: "Easy",
        description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps.",
        examples: [{ input: "n = 3", output: "3" }],
        constraints: ["1 <= n <= 45"],
        solutions: {
          javascript: "function climbStairs(n) {\n  if (n <= 2) return n;\n  let first = 1, second = 2;\n  for (let i = 3; i <= n; i++) {\n    const third = first + second;\n    first = second; second = third;\n  }\n  return second;\n}",
          python: "def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1): a, b = b, a + b\n    return b",
          java: "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n};"
        }
      },
      {
        id: "dp_2",
        title: "Coin Change",
        pattern: "Unbounded Knapsack DP",
        role: "Primary Classic",
        level: "Medium",
        description: "You are given an integer array `coins` and an integer `amount`. Return fewest coins needed to make up amount.",
        examples: [{ input: "coins = [1,2,5], amount = 11", output: "3" }],
        constraints: ["1 <= amount <= 10^4"],
        solutions: {
          javascript: "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (let c of coins) {\n      if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
          python: "def coinChange(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0: dp[i] = min(dp[i], 1 + dp[i - c])\n    return dp[amount] if dp[amount] != float('inf') else -1",
          java: "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1); dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
          cpp: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};"
        }
      }
    ]
  }
];
