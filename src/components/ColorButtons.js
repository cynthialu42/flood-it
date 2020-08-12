import React, { Component } from 'react';

class ColorButtons extends Component {
    render() {
        return (
            <div c
                className="color-buttons" 
                style={{ backgroundColor: this.props.color, height: 50, width: 50 }} 
                onClick={() => this.props.sendColor(this.props.color)}
            />
        );
    }
}

export default ColorButtons;