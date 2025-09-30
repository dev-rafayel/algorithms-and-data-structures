const mergeSort = (nums, left, right) => {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);

    mergeSort(nums, left, right);
    mergeSort(nums, mid + 1, right);
    merge(nums, left, mid, right);

    return nums;
}

const merge = (nums, left, mid, right) => {
    const a1 = nums.slice(left, mid + 1);
    const a2 = nums.slice(mid + 1, right);

    
}