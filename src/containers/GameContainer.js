import React, { Component } from 'react';
import Grid from '../components/Grid';

class GameContainer extends Component {
    render() {
        return (
            <div>
                <h2>Flood It Copy Cat</h2>
                <Grid />
                <div>Color Button Section</div>
            </div>
        );
    }
}

export default GameContainer;