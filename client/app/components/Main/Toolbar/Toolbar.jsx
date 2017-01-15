import React, { Component } from "react";
import "./Toolbar.css";

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { generateArray } = this.props;

    generateArray(87);
    document.getElementById("changeSize").value = 50;
  }

  handleClick(algorithm) {
    const { updateAlgorithm } = this.props;

    updateAlgorithm(algorithm);
  }

  handleChange(evt) {
    const { generateArray } = this.props;

    generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
  }

  render() {
    const {
      array,
      algorithm,
      generateArray,
      sort,
      isRunning,
    } = this.props;

    const speed = 570 - Math.pow(array.length, 2) > 0 ?
      570 - Math.pow(array.length, 2) : 0;

    const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";

    const cursor = isRunning ? "auto" : "pointer";

    return (
      <div id="toolbar">
        <div
          id={!isRunning ? "generateArray" : "generateArrayX"}
          style={{color: color, cursor: cursor}}
          onClick={!isRunning ? () => generateArray(array.length) : null}>
          Generate New Array
        </div>
        <div className="separator"></div>
        <div
          id="arraySize"
          style={{color: color}}>
          Change Array Size & Sorting Speed
        </div>
        <input
          id="changeSize"
          type="range"
          min="0"
          max="100"
          style={{background: color, cursor: cursor}}
          disabled={isRunning ? "disabled" : null}
          onChange={this.handleChange}
          />
        <div className="separator"></div>
        <div
          className={algorithm === "mergeSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("mergeSort")}>
          Merge Sort
        </div>
        <div
          className={algorithm === "quickSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("quickSort")}>
          Quick Sort
        </div>
        <div
          className={algorithm === "heapSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("heapSort")}>
          Heap Sort
        </div>
        <div
          className={algorithm === "bubbleSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("bubbleSort")}>
          Bubble Sort
        </div>
        <div className="separator"></div>
        { algorithm ? <div
            id="sort"
            style={{color: color, cursor: cursor}}
            onClick={!isRunning ? () => sort(algorithm, array, speed) : null}>
            Sort!
          </div> : null
        }
      </div>
    )
  }
}

export default Toolbar;
