import React, { Component } from "react";
import Tile from "./Tile";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      colors: this.props.colors,
      gridColors: null,
      colorCluster: null,
      crow: this.props.crow,
    };
    this.updateGrid = this.updateGrid.bind(this);
  }

  componentDidMount() {
    this.generateGridData(this.props.size);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentColor !== prevProps.currentColor) {
      this.updateGrid(this.props.currentColor);
    }
    if(this.props.colors !== prevProps.colors || this.props.size !== prevProps.size || this.props.refresh) {
        this.setState({ colorCluster: null, colors: this.props.colors, size: this.props.size })
        this.generateGridData(this.props.size);
    }
  }

  findAllTiles = (array, gridObjectClone, color, originalArray) => {
    let tempArr = [];
    array.map((tileNum) => {
      const { top, bottom, left, right } = gridObjectClone[tileNum];
      console.log(array.includes(top));
      if (
        gridObjectClone[top] &&
        gridObjectClone[top].color === color &&
        !array.includes(top) &&
        !originalArray.includes(top)
      ) {
        tempArr.push(top);
      }
      if (
        gridObjectClone[bottom] &&
        gridObjectClone[bottom].color === color &&
        !array.includes(bottom) &&
        !originalArray.includes(bottom)
      ) {
        tempArr.push(bottom);
      }
      if (
        gridObjectClone[left] &&
        gridObjectClone[left].color === color &&
        !array.includes(left) &&
        !originalArray.includes(left)
      ) {
        tempArr.push(left);
      }
      if (
        gridObjectClone[right] &&
        gridObjectClone[right].color === color &&
        !array.includes(right) &&
        !originalArray.includes(right)
      ) {
        tempArr.push(right);
      }
    });
    console.log("tempArr", [...new Set(tempArr)]);
    const noDuplicates = [...new Set(tempArr)];
    const newFullArray = [...new Set([...originalArray, ...noDuplicates])];
    console.log("new full array", newFullArray);
    if ([...new Set(tempArr)].length) {
      return this.findAllTiles(
        noDuplicates,
        gridObjectClone,
        color,
        newFullArray
      );
    } else {
      console.log([...new Set(tempArr)]);
      return newFullArray;
    }
  };
  updateGrid(color) {
    let tileColorsUpdated = [];
    let gridObjectClone = JSON.parse(JSON.stringify(this.state.gridColors));
    let gridArrayClone = JSON.parse(JSON.stringify(this.state.gridArray));
    let colorClusterArray;
    if (this.state.colorCluster) {
      colorClusterArray = this.state.colorCluster;
    } else {
      colorClusterArray = this.findAllTiles(
        [1],
        gridObjectClone,
        gridObjectClone[1].color,
        [1]
      );
    }
    colorClusterArray.forEach((tileNum) => {
      const { top, bottom, left, right } = gridObjectClone[tileNum];
      gridObjectClone[tileNum].color = color;
      gridArrayClone[tileNum - 1].color = color;
      tileColorsUpdated.push(tileNum);
      if (gridObjectClone[top] && gridObjectClone[top].color === color) {
        tileColorsUpdated.push(top);
      }
      if (gridObjectClone[bottom] && gridObjectClone[bottom].color === color) {
        tileColorsUpdated.push(bottom);
      }
      if (gridObjectClone[left] && gridObjectClone[left].color === color) {
        tileColorsUpdated.push(left);
      }
      if (gridObjectClone[right] && gridObjectClone[right].color === color) {
        tileColorsUpdated.push(right);
      }
    });
    let tempArr = JSON.parse(JSON.stringify(tileColorsUpdated));
    let finalArr = this.findAllTiles(tempArr, gridObjectClone, color, tempArr);
    tileColorsUpdated = finalArr;
    this.setState({
      colorCluster: [...new Set(tileColorsUpdated)],
      gridColors: gridObjectClone,
      gridArray: gridArrayClone,
    }, () => {
        if (
            this.state.colorCluster &&
            this.state.colorCluster.length === this.props.size * this.props.size
          ) {
            this.props.showWin();
          }
    });
    
  }

  generateGridData(size) {
    let totalTiles = size * size;
    let gridColors = {};
    let gridArray = [];
    for (let i = 1; i <= totalTiles; i++) {
      let color = this.props.colors[
        Math.floor(Math.random() * Math.floor(this.props.colors.length))
      ];
      let top = i - size > 0 ? i - size : null;
      let bottom = i + size < size * size ? i + size : null;
      let left = i % size === 1 ? null : i - 1;
      let right = i % size === 0 ? null : i + 1;
      gridColors[i] = {
        color,
        top,
        bottom,
        left,
        right,
      };
      gridArray.push({
        tileNum: i,
        color,
        top,
        bottom,
        left,
        right,
      });
    }

    this.setState({ gridColors, gridArray });
  }
  render() {
    let gameBoard;
    let winText = null;
    let tileHeight = Math.floor(420 / this.props.size);
    let tileWidth = Math.floor(420 / this.props.size);
    
    if (this.state.gridArray) {
      let splitArray = [];
      let gridArrayCopy = JSON.parse(JSON.stringify(this.state.gridArray));
      for (let i = 0; i < this.state.size; i++) {
        splitArray.push(gridArrayCopy.splice(0, this.state.size));
      }
      gameBoard = splitArray.map((row) => {
        let rowTiles = row.map((tile) => (
          <Tile
            crow={this.props.crow}
            tileData={tile}
            height={tileHeight}
            width={tileWidth}
            size={this.props.size}
            colorCluster={this.state.colorCluster}
          />
        ));
        return (
          <div className="d-flex flex-row justify-content-center">
            {rowTiles}
          </div>
        );
      });

      // gameBoard = null;
    } else {
      gameBoard = null;
    }
    return (
      <div>
        <div>{gameBoard}</div>
        {winText}
      </div>
    );
  }
}

export default Grid;
