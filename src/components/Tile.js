import React, { Component } from "react";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.tileData.color,
      crow: false,
    };
  }
  render() {
    if (this.props.crow) {
        let spinning = false;
        if (this.props.colorCluster && this.props.colorCluster.length === this.props.size * this.props.size) {
            spinning = true;
        }
      return (
        <div
          className={`tile tile-spin--${spinning}`}
          style={{ height: this.props.height, width: this.props.width }}
        >
          <i
            className="fas fa-crow"
            style={{
              color: this.props.tileData.color,
              fontSize: this.props.height,
            }}
          ></i>
        </div>
      );
    } else {
      return (
        <div
          className="tile"
          style={{
            backgroundColor: this.props.tileData.color,
            height: this.props.height,
            width: this.props.width,
          }}
        ></div>
      );
    }
  }
}

export default Tile;
