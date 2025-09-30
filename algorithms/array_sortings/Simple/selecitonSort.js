const selectionSort = (nums) => {
    const size = nums.length;

    for (let i = 0; i < size; ++i) {
        let min_index = i;
        for (let j = i + 1; j < size; ++j) {
            if (nums[j] < nums[min_index]) {
                min_index = j;
            }
        }
    
        if (nums[min_index] !== i) {
            [nums[i], nums[min_index]] = [nums[min_index], nums[i]];
        }
    }
    return nums;
}

const nums = [5, 1, 6, 8, 2, 9, 3];
selectionSort(nums);
console.log(nums);