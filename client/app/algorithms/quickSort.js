import { setArray } from "../reducers/array";
import { setCurrentQuickTwo, setPivot } from "../reducers/quickSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function quickSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  quickSortHelper(array, 0, array.length - 1, toDispatch);
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

function quickSortHelper(array, start, end, toDispatch) {
  if (start >= end) {
    toDispatch.push([true, start]);
    return;
  }
  let pivot = start,
      left = start + 1,
      right = end;
  toDispatch.push(pivot);
  toDispatch.push([left, right]);
  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      toDispatch.push([left, right, true]);
      let temp = array[right];
      array[right] = array[left];
      array[left] = temp;
      toDispatch.push(array.slice(0));
      toDispatch.push([]);
    }
    if (array[right] >= array[pivot]) {
      right--;
    }
    if (array[left] <= array[pivot]) {
      left++;
    }
    if (right >= left) toDispatch.push([left, right]);
  }
  toDispatch.push([pivot, right]);
  if (pivot !== right) {
    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
    toDispatch.push([pivot, right, true]);
    toDispatch.push(array.slice(0));
    toDispatch.push([]);
    toDispatch.push([true, right]);
  }
  quickSortHelper(array, start, right - 1, toDispatch);
  quickSortHelper(array, right + 1, end, toDispatch);
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setPivot(null));
    dispatch(setCurrentQuickTwo(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentQuickTwo([]));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction = !(toDispatch[0] instanceof Array) ?
    setPivot : toDispatch[0].length > 3 ?
      setArray : toDispatch[0].length !== 2 ?
        setCurrentSwappers : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" ?
          setCurrentSorted : setCurrentQuickTwo;
  dispatch(dispatchFunction(toDispatch.shift()));
  if (dispatchFunction === setPivot) dispatch(setCurrentQuickTwo(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default quickSort;
