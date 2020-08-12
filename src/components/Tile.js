import React, { Component } from 'react';

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.tileData.color
        }
    }
    render() {
        return (
            <div className="tile" style={{backgroundColor: this.props.tileData.color, height: 50, width: 50}}>
            </div>
        );
    }
}

export default Tile;