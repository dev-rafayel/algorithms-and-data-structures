const bubbleSort = (nums) => {
    const size = nums.length;

    for (let i = 0; i < size; ++i) {
        let isSwapped = false; 
        for (let j = 0; j < size - 1 - i; ++j) { 
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]; 
                isSwapped = true;
            }
        }
        if (!isSwapped) break; 
    }
    return nums;
}

const nums = [5, 1, 6, 8, 2, 9, 3];
bubbleSort(nums);
console.log(nums);