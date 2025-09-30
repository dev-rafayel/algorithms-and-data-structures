# Simple Sorting Algorithms

Bubble Sort

Bubble Sort is one of the simplest sorting algorithms. It repeatedly compares adjacent elements in a list and swaps them if they are in the wrong order. This process continues until the list is completely sorted. The name comes from the way larger elements “bubble up” to the top of the list with each pass.

> How It Works?

1. Start at the beginning of the array.

2. Compare the current element with the next one.

3. If the current element is greater, swap them.

4. Move to the next pair and repeat until the end of the array.

5. After the first pass, the largest element will be at the end.

6. Repeat the process for the remaining unsorted elements until no swaps are needed.

> Complexity Analysis

- Best Case (Already Sorted):
    Time: O(n) (only one pass, no swaps needed)

- Average Case:
    Time: O(n²)

- Worst Case (Reverse Sorted):
    Time: O(n²)

- Space Complexity:
    O(1) (in-place sorting, no extra memory required)

> Where It Is Useful

- Education: Easy to understand, often used as the first example of sorting algorithms.

- Small Data Sets: Works fine for small arrays where simplicity matters more than efficiency.

- Step-by-Step Demonstrations: Good for visualizing the concept of sorting and swaps.

> Where It Is Not Useful

- Large Data Sets: Performs very poorly because of its quadratic time complexity.

- Performance-Critical Applications: Algorithms like Quick Sort, Merge Sort, or Heap Sort are significantly faster and more practical.

> Stability

- Stable – equal elements retain their original relative order.


-----------------------------------------------------------------------------------------------

Insertion Sort

Insertion Sort is a simple and intuitive sorting algorithm that builds the final sorted array one element at a time. It works similarly to how people often sort playing cards: by taking one card and inserting it into its correct position relative to the already sorted cards.

> How It Works

1. Start with the second element (since a single element is trivially sorted).

2. Compare it with the elements before it.

3. Shift all larger elements one position to the right.

4. Insert the current element into its correct place.

5. Repeat for all elements until the entire list is sorted.

> Complexity Analysis

- Best Case (Already Sorted):
    Time: O(n) (only one comparison per element, no shifting needed)

- Average Case:
    Time: O(n²)

- Worst Case (Reverse Sorted):
    Time: O(n²)

> Space Complexity:

- O(1) (in-place sorting, requires no extra memory)

> Stability

- Stable Algorithm: Yes.
Equal elements retain their original relative order after sorting. This makes Insertion Sort useful when sorting data with multiple keys (e.g., sorting by name and preserving order by age).

> Where It Is Useful

- Small Data Sets: Efficient and simple for small arrays or nearly sorted data.

- Nearly Sorted Data: Performs very well when the list is almost sorted (close to linear time).

- Stable Sorting Required: Useful when preserving the relative order of equal elements is important.

> Where It Is Not Useful

- Large Data Sets: Inefficient due to quadratic time complexity compared to faster algorithms like Merge Sort or Quick Sort.

- Random/Reverse Data: Performance drops significantly on unsorted or reversed inputs.


-----------------------------------------------------------------------------------------------


Selection Sort

Selection Sort is a simple comparison-based sorting algorithm. It repeatedly selects the smallest (or largest, depending on order) element from the unsorted portion of the list and places it at the beginning.

> How It Works

1. Start with the first element as the minimum.

2. Compare it with the rest of the array to find the true minimum element.

3. Swap the found minimum with the first element.

4. Move the boundary of the sorted portion one step to the right.

5. Repeat until the entire list is sorted.

> Complexity Analysis

- Best Case:
    Time: O(n²) (still scans the array fully, regardless of order).

- Average Case:
    Time: O(n²).

- Worst Case:
    Time: O(n²).

> Space Complexity:

- O(1) (in-place sorting).

> Stability

Stable Algorithm: No.
Selection Sort is generally unstable because it may swap non-adjacent equal elements, changing their relative order. (It can be modified to be stable, but the basic version is not.)

> Where It Is Useful

- Small Data Sets: Works fine for small arrays when simplicity is more important than efficiency.

- Memory-Constrained Environments: Requires constant extra space.

- When Fewer Swaps Matter: Minimizes the number of swaps compared to Bubble Sort (at most n – 1 swaps).

> Where It Is Not Useful

- Large Data Sets: Very inefficient compared to more advanced algorithms like Merge Sort, Quick Sort, or Heap Sort.

- When Stability Is Needed: Shouldn’t be used if the relative order of equal elements must be preserved.


-----------------------------------------------------------------------------------------------


Counting Sort

Counting Sort is a non-comparison-based sorting algorithm that sorts integers (or data that can be mapped to integers) by counting the frequency of each unique value. It is especially efficient when the range of input values is not significantly larger than the number of elements to sort.

> How It Works

1. Find the minimum and maximum values in the array.

2. Create a count array where each index represents a value from the input.

3. Count the occurrences of each element and store them in the count array.

4. Modify the count array to store prefix sums (cumulative counts), which represent positions in the output array.

5. Build the output array by placing each element in its correct position based on the counts.

6. Copy the output array back to the original (if required).

> Complexity Analysis

- Best Case:
    Time: O(n + k)

- Average Case:
    Time: O(n + k)

- Worst Case:
    Time: O(n + k) where n = number of elements, k = range of input values.

> Space Complexity:

- O(k) extra space for the count array.

> Stability

- Stable Algorithm: Yes, if implemented with cumulative counts (prefix sums). Equal elements maintain their original relative order, which is important in radix sort or multi-key sorting.

> Where It Is Useful

- When the Range is Small: Ideal when the maximum value (k) is not much larger than n.

- Sorting Integers or Categorical Data: Works well with integer keys, characters, or data mapped to integers.

- As a Subroutine: Often used in Radix Sort because of its stability.

> Where It Is Not Useful

- Large Range of Values: Becomes impractical if k (range of input) is very large compared to n.

- Non-Integer or Complex Data: Not suitable for floating-point numbers or data that cannot be mapped easily to integers.

- Memory-Limited Systems: Requires additional memory proportional to the range of input.


