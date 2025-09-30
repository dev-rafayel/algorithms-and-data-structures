Merge Sort

Merge Sort is a divide-and-conquer, comparison-based sorting algorithm. It works by recursively dividing the array into halves, sorting each half, and then merging the sorted halves back together.

> How It Works

1. If the array has 0 or 1 element, it is already sorted.

2. Divide the array into two roughly equal halves.

3. Recursively apply Merge Sort to each half.

4. Merge the two sorted halves into a single sorted array.

5. Repeat until the entire array is merged and sorted.

> Complexity Analysis

- Best Case:
    Time: O(n log n)

- Average Case:
    Time: O(n log n)

- Worst Case:
    Time: O(n log n)

> Space Complexity:

- O(n) (requires additional space for merging)

> Stability

- Stable Algorithm: Yes.
Equal elements maintain their original relative order after sorting, making Merge Sort suitable for multi-key sorting scenarios.

> Where It Is Useful

- Large Data Sets: Efficient for sorting large arrays due to guaranteed O(n log n) performance.

- Linked Lists: Works well with linked lists since merging can be done without extra space.

- Stable Sorting Needed: Preserves the relative order of equal elements.

- External Sorting: Suitable for sorting data too large to fit in memory (external merge sort).

> Where It Is Not Useful

- Memory-Constrained Environments: Requires additional space proportional to the array size.

- Small Arrays: Overhead of recursion and merging can make it slower than simpler algorithms like Insertion Sort or Bubble Sort for small datasets.


-----------------------------------------------------------------------------------------------


Quick Sort

Quick Sort is a divide-and-conquer, comparison-based sorting algorithm. It works by selecting a pivot element, partitioning the array into elements less than the pivot and elements greater than the pivot, and then recursively sorting the partitions.

> How It Works

1. Choose a pivot element from the array (common strategies: first element, last element, middle, or random).

2. Partition the array into two subarrays:

3. Elements less than the pivot

4. Elements greater than the pivot

5. Recursively apply Quick Sort to the two subarrays.

6. Combine the sorted subarrays and the pivot to produce the final sorted array.

> Complexity Analysis

- Best Case (balanced partitions):
    Time: O(n log n)

- Average Case:
    Time: O(n log n)

- Worst Case (already sorted or poorly chosen pivots):
    Time: O(n²)

> Space Complexity:

- O(log n) on average (due to recursion stack), O(n) worst case if recursion is unbalanced

> Stability

- Stable Algorithm: ❌ No.
Standard Quick Sort is not stable because swapping elements can change the relative order of equal elements. Stable versions exist but require extra work or memory.

> Where It Is Useful

- Large Data Sets: Very efficient on average, faster than Merge Sort in practice due to lower overhead.

- In-Place Sorting: Requires minimal extra memory compared to Merge Sort.

- Randomized Pivot: Helps avoid worst-case performance.

> Where It Is Not Useful

- Memory-Constrained Recursive Environments: Deep recursion can cause stack overflow in worst-case scenarios.

- Stability Required: Not suitable if the relative order of equal elements must be preserved.

- Already Nearly Sorted Arrays: Can perform poorly with naive pivot selection.