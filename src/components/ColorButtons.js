import React, { Component } from "react";

class ColorButtons extends Component {
  render() {
    if (this.props.crow) {
      return (
        <div
          className="color-buttons"
          style={{ height: 50, width: 50 }}
          onClick={() => this.props.sendColor(this.props.color)}
        >
          <i
            className="fas fa-crow"
            style={{
              color: this.props.color,
              fontSize: 50,
            }}
          ></i>
        </div>
      );
    } else {
      return (
        <div
          className="color-buttons"
          style={{ backgroundColor: this.props.color, height: 50, width: 50 }}
          onClick={() => this.props.sendColor(this.props.color)}
        />
      );
    }
  }
}

export default ColorButtons;
