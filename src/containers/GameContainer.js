import React, { Component } from "react";
import Grid from "../components/Grid";
import ColorButtons from "../components/ColorButtons";
import Sidedrawer from "../components/Sidedrawer";
import colorThemes from "../constants/colorThemes";

class GameContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentColor: null,
      crow: false,
      sidedrawerIsOpen: null,
      content: "hi",
      theme: colorThemes[0],
      size: 5,
      darkMode: false,
      refresh: false,
      winStats: null,
      totalClicks: 0,
      best: {},
    };
    this.colorClicked = this.colorClicked.bind(this);
    this.closeSidedrawer = this.closeSidedrawer.bind(this);
    this.applyNewSettings = this.applyNewSettings.bind(this);
    this.applyMode = this.applyMode.bind(this);
    this.showWin = this.showWin.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  showWin() {
    const { size, best, totalClicks } = this.state;
    let bestGame;
    if (!best[size] || totalClicks <= best[size]) {
      bestGame = {
        [size]: totalClicks,
      };
    } else {
      bestGame = {
        [size]: best[size],
      };
    }
    this.setState({
      winStats: {
        message: "Flooded!",
        steps: totalClicks,
        best: bestGame[size],
      },
      best: bestGame,
    });
  }

  colorClicked(color) {
    if (!this.state.winStats) {
      let totalClicks = this.state.totalClicks + 1;
      this.setState({ currentColor: color, totalClicks });
    }
  }

  startNewGame() {
    this.setState(
      { refresh: !this.state.refresh, winStats: null, totalClicks: 0 },
      () => this.setState({ refresh: !this.state.refresh })
    );
  }

  startNewGameConfirmation() {}

  closeSidedrawer() {
    this.setState({ sidedrawerIsOpen: false });
  }

  applyNewSettings(settings) {
    let newColorTheme = colorThemes.find(
      (color) => color.name === settings.colorTheme
    );
    this.setState({
      theme: newColorTheme,
      currentColor: null,
      size: settings.size,
      totalClicks: 0,
      winStats: null,
    });
  }

  applyMode(mode) {
    this.setState({
      darkMode: mode,
    });
  }

  render() {
    let buttonSection;
    buttonSection = this.state.theme.colors.map((color) => {
      return (
        <ColorButtons
          color={color}
          sendColor={this.colorClicked}
          crow={this.state.crow}
        />
      );
    });
    let navBarColor = this.state.darkMode
      ? this.state.theme.colors[this.state.theme.colors.length - 1]
      : this.state.theme.colors[0];
    let stats = this.state.winStats ? (
      <div className="mt-5">
        <div>
        <h5 className="mb-5">{this.state.winStats.message}</h5>
        <div className="mb-3">Steps Taken: {this.state.winStats.steps}</div>
        <div className="mb-2">Best Game:</div>
        <div className="ml-3 mb-5">{this.state.size}x{this.state.size} Grid: {this.state.winStats.best}</div>
        <button className="btn btn-secondary" onClick={this.startNewGame}>New Game?</button>
        </div>
      </div>
    ) : null;
    return (
      <div className={`dark-mode--${this.state.darkMode}`}>
        <nav
          className="navbar navbar-expand-lg navbar-light mb-3"
          style={{ backgroundColor: navBarColor }}
        >
          <h1>Flood It!</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-row-reverse"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <i
                  title={this.state.darkMode ? "Dark Mode" : "Light Mode"}
                  className={`fas fa-${
                    this.state.darkMode ? "moon" : "sun"
                  } font-25 rainbow cursor-pointer`}
                  onClick={() =>
                    this.setState({ darkMode: !this.state.darkMode })
                  }
                ></i>
              </li>
              <li className="nav-item active ml-3">
                <i
                  title={this.state.crow ? "Block Mode!" : "CAW!"}
                  className={`fas fa-${
                    this.state.crow ? "square" : "crow"
                  } font-25 rainbow cursor-pointer`}
                  onClick={() => this.setState({ crow: !this.state.crow })}
                ></i>
              </li>
              <li className="nav-item active ml-3">
                <i
                  title="Settings"
                  className="fas fa-cog font-25 cursor-pointer"
                  onClick={() =>
                    this.setState({
                      sidedrawerIsOpen: !this.state.sidedrawerIsOpen,
                    })
                  }
                ></i>
              </li>
            </ul>
          </div>
        </nav>
        <div className="pt-2 pb-3 d-flex justify-content-around">
          <div>
          <div className="d-flex justify-content-between font-1_5 width-420">
            <div></div>
            <div>Steps: {this.state.totalClicks}</div>
            {!this.state.winStats ? <div>
              <i
                title="New Game"
                className="fas fa-redo font-1_25 cursor-pointer"
                data-toggle="modal"
                data-target="#exampleModal"
              ></i>
            </div> : <div/>}
          </div>
            <Grid
              size={this.state.size}
              crow={this.state.crow}
              colors={this.state.theme.colors}
              currentColor={this.state.currentColor}
              refresh={this.state.refresh}
              showWin={this.showWin}
            />
            <div className="d-flex justify-content-center mt-5">
              {buttonSection}
            </div>
          </div>
          {stats}
        </div>
        <Sidedrawer
          isOpen={this.state.sidedrawerIsOpen}
          closeSidedrawer={this.closeSidedrawer}
          colorTheme={this.state.theme.name}
          applyNewSettings={this.applyNewSettings}
          size={this.state.size}
          darkMode={this.state.darkMode}
          applyMode={this.applyMode}
        />
        {/* <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Launch demo modal
        </button> */}

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Start New Game?
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Current game will be lost.</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-secondary"
                  onClick={this.startNewGame}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameContainer;
