let arr = [1, 1, 2, 3, 3, 6, 7, 8, 9, 1, 2, 4];

function cumulativeCounting(arr) {
  let length = arr.length;
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  let range = max - min + 1;
  let arrCount = new Array(range).fill(0);

  for (let i = 0; i < length; ++i) {
    arrCount[arr[i] - min] += 1;
  }

  for (let i = 1; i < range; ++i) {
    arrCount[i] += arrCount[i - 1];
  }

  let newArr = new Array(length);
  let k = 0;

  for (let i = length - 1; i >= 0; --i) {
    const elem = arr[i];
    const index = arrCount[elem - min] - 1;
    newArr[index] = elem;
    --arrCount[elem - min];
  }
  return newArr;
}
console.log(cumulativeCounting(arr));
