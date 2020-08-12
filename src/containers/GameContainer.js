import React, { Component } from 'react';
import Grid from '../components/Grid';
import ColorButtons from '../components/ColorButtons';

class GameContainer extends Component {
    constructor() {
        super();
        this.state = {
            currentColor: null
        }
        this.colorClicked = this.colorClicked.bind(this);
    }

    colorClicked(color) {
        this.setState({ currentColor: color });
    }

    render() {
        return (
            <div>
                <h2>Flood It Copy Cat</h2>
                <Grid size={5} colors={["#EAC435", "#345995", "#E40066", "#03CEA4", "#FB4D3D"]} currentColor={this.state.currentColor} />
                <div className="d-flex justify-content-center mt-5">
                    <ColorButtons color="#EAC435" sendColor={this.colorClicked} />
                    <ColorButtons color="#345995" sendColor={this.colorClicked} />
                    <ColorButtons color="#E40066" sendColor={this.colorClicked} />
                    <ColorButtons color="#03CEA4" sendColor={this.colorClicked} />
                    <ColorButtons color="#FB4D3D" sendColor={this.colorClicked} />
                </div>
            </div>
        );
    }
}

export default GameContainer;