import { setArray } from "../reducers/array";
import { setCurrentMergeX } from "../reducers/mergeSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function mergeSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  let finalArray = mergeSortHelper(array.map((num, idx) => [num, idx]), toDispatch, 0, array.length - 1, {array: array.slice(0)});
  handleDispatch(toDispatch, dispatch, finalArray, speed);
}

function mergeSortHelper(array, toDispatch, start, end, obj) {
  if (array.length === 1) {
    return array;
  }
  let half = Math.floor(array.length / 2),
      first = array.slice(0, half),
      second = array.slice(half),
      indexHalf = Math.floor((end + 1 + start) / 2),
      actualFirst = mergeSortHelper(first, toDispatch, start, indexHalf - 1, obj),
      actualSecond = mergeSortHelper(second, toDispatch, indexHalf, end, obj),
      isFinalMerge = false;
  if (actualFirst.length + actualSecond.length === obj.array.length) isFinalMerge = true;
  return actualSort(actualFirst, actualSecond, toDispatch, obj, start, end, isFinalMerge);
}

function actualSort(first, second, toDispatch, obj, start, end, isFinalMerge) {
  let sortedArray = [];
  let indexToPush = start;
  while (first.length && second.length) {
    toDispatch.push([first[0][1], second[0][1]]);
    if (first[0][0] <= second[0][0]) {
      indexToPush++;
      sortedArray.push(first.shift());
    } else {
      toDispatch.push([first[0][1], second[0][1], true]);
      second[0][1] = indexToPush++;
      sortedArray.push(second.shift());
      first.forEach(subArr => subArr[1]++);
      if (start === 0) {
        obj.array = sortedArray.map(subArr => subArr[0]).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
      } else {
        obj.array = obj.array.slice(0, start).concat(sortedArray.map(subArr => subArr[0])).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
      }
      toDispatch.push(obj.array.concat([indexToPush - 1, indexToPush]));
      toDispatch.push([]);
    }
    if (isFinalMerge) toDispatch.push([true, indexToPush - 1]);
  }
  return sortedArray.concat(first).concat(second);
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentMergeX(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentMergeX([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction = toDispatch[0].length > 3 ?
    setArray : toDispatch[0].length === 3 && typeof toDispatch[0][2] === "boolean" || toDispatch[0].length === 0 ?
      setCurrentSwappers : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" ?
        setCurrentSorted : setCurrentMergeX;
  if (dispatchFunction === setArray) {
    let currentToDispatch = toDispatch.shift();
    dispatch(dispatchFunction(currentToDispatch.slice(0, currentToDispatch.length - 2)));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentMergeX([]));
    dispatch(setCurrentSwappers([currentToDispatch[currentToDispatch.length - 2], currentToDispatch[currentToDispatch.length - 1]]));
    dispatch(setCurrentMergeX([currentToDispatch[currentToDispatch.length - 2], currentToDispatch[currentToDispatch.length - 1]]));
  } else {
    dispatch(dispatchFunction(toDispatch.shift()));
  }
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default mergeSort;
