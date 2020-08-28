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

  componentDidMount() {
    let currentSettings;
    if (localStorage.getItem("floodItSettings")) {
      currentSettings = JSON.parse(localStorage.getItem("floodItSettings"));
      const { theme, size, crow, darkMode, best } = currentSettings;
      this.setState({
        theme,
        size,
        crow,
        darkMode,
        best,
      });
    } else {
      currentSettings = {
        theme: colorThemes[0],
        size: 5,
        crow: false,
        darkMode: false,
        best: {},
      };
      localStorage.setItem("floodItSettings", JSON.stringify(currentSettings));
    }
  }

  showWin() {
    const { size, best, totalClicks } = this.state;
    let updateBest = JSON.parse(localStorage.getItem("floodItSettings"));
    let historicBest = updateBest.best[size];
    let bestGame = {};
    let bestClicks = 0;
    if (!best[size] || totalClicks <= best[size]) {
      if (totalClicks < historicBest) {
        bestGame[size] = totalClicks;
      } else {
        bestGame[size] = historicBest;
      }
      bestClicks = totalClicks;
    } else {
      bestGame[size] = best[size];
      bestClicks = best[size];
    }
    if (updateBest.best[size] < bestClicks) {
    } else {
      updateBest.best[size] = bestClicks;
      localStorage.setItem("floodItSettings", JSON.stringify(updateBest));
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
    let currentStorage = JSON.parse(localStorage.getItem("floodItSettings"));
    currentStorage.theme = newColorTheme;
    currentStorage.size = settings.size;
    localStorage.setItem("floodItSettings", JSON.stringify(currentStorage));
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
    let storageBestStatsObj = JSON.parse(
      localStorage.getItem("floodItSettings")
    );
    let storageBestStatsArr = [];
    for (let key in storageBestStatsObj.best) {
      storageBestStatsArr.push({
        size: key,
        value: storageBestStatsObj.best[key],
      });
    }
    let historicStats = storageBestStatsArr.map((stat) => {
      let boldFont = false;
      if (parseInt(stat.size) === this.state.size) {
        boldFont = true;
      }
      return (
        <div
          className={`mb-2 font-20 d-flex justify-content-center bold--${boldFont}`}
        >
          {stat.size}x{stat.size} Grid:{" "}
          <div className={`win-stat-number ml-3 bold--${boldFont}`}>
            {stat.value}
          </div>
        </div>
      );
    });
    let navBarColor = this.state.darkMode
      ? this.state.theme.colors[this.state.theme.colors.length - 1]
      : this.state.theme.colors[0];
    let stats = this.state.winStats ? (
      <div className="mt-5 width-420">
        <div
          className={`text-align-center win-box--${this.state.darkMode} p-5`}
        >
          <h5 className="mb-5 font-25">
            <strong>{this.state.winStats.message}</strong>
          </h5>
          <div className="mb-3 font-20 d-flex justify-content-center bold--true">
            <strong>Steps Taken: </strong>
            <div className="win-stat-number ml-3">
              {this.state.winStats.steps}
            </div>
          </div>
          <div className="mb-2 font-20">
            <strong>Best Game:</strong>
          </div>
          {historicStats}
          <button className="btn btn-secondary mt-3" onClick={this.startNewGame}>
            New Game?
          </button>
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
              <li className="nav-item active ml-3">
                <i
                  title="How To Play"
                  className="fas fa-question font-25 cursor-pointer"
                  data-toggle="modal"
                  data-target="#instructionsModal"
                ></i>
              </li>
              <li className="nav-item active ml-3">
                <i
                  title={this.state.darkMode ? "Dark Mode" : "Light Mode"}
                  className={`fas fa-${
                    this.state.darkMode ? "moon" : "sun"
                  } font-25 rainbow cursor-pointer`}
                  onClick={() => {
                    let currentStorage = JSON.parse(
                      localStorage.getItem("floodItSettings")
                    );
                    currentStorage.darkMode = !this.state.darkMode;
                    localStorage.setItem(
                      "floodItSettings",
                      JSON.stringify(currentStorage)
                    );
                    this.setState({ darkMode: !this.state.darkMode });
                  }}
                ></i>
              </li>
              <li className="nav-item active ml-3">
                <i
                  title={this.state.crow ? "Block Mode!" : "CAW!"}
                  className={`fas fa-${
                    this.state.crow ? "square" : "crow"
                  } font-25 rainbow cursor-pointer`}
                  onClick={() => {
                    let currentStorage = JSON.parse(
                      localStorage.getItem("floodItSettings")
                    );
                    currentStorage.crow = !this.state.crow;
                    localStorage.setItem(
                      "floodItSettings",
                      JSON.stringify(currentStorage)
                    );
                    this.setState({ crow: !this.state.crow });
                  }}
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
              {!this.state.winStats ? (
                <div>
                  <i
                    title="New Game"
                    className="fas fa-redo font-1_25 cursor-pointer"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  ></i>
                </div>
              ) : (
                <div />
              )}
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
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className={`modal-content dark-mode--${
                this.state.darkMode ? "true" : "false"
              }`}
            >
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
        <div
          className="modal fade"
          id="instructionsModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="instructionsModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className={`modal-content dark-mode--${
                this.state.darkMode ? "true" : "false"
              }`}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="instructionsModalLabel">
                  How To Play
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
              <div className="modal-body">
                <ul>
                  <li>
                    The goal is to 'flood' the board with 1 color, starting from
                    the top left corner
                  </li>
                  <li>
                    Click on the 5 color buttons below the grid to change the
                    color of the starting square
                  </li>
                  <li>
                    Same colors adjacent to the starting square will become part
                    of the 'flood'
                  </li>
                  <li>Keep changing colors until the board is flooded!</li>
                </ul>
              </div>
              {/* <div className="modal-footer">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameContainer;
