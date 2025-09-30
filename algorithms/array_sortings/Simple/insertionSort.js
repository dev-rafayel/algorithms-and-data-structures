const insertionSort = (nums) => {
    const size = nums.length;
    for (let i = 1; i < size; ++i) {
        let j = i - 1;
        let current = nums[i];

        while (j >= 0 && nums[j] > current) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = current;
    }
    return nums;
}

const nums = [5, 1, 6, 8, 2, 9, 3];
insertionSort(nums);
console.log(nums);