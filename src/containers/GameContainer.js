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
    };
    this.colorClicked = this.colorClicked.bind(this);
    this.closeSidedrawer = this.closeSidedrawer.bind(this);
    this.applyNewSettings = this.applyNewSettings.bind(this);
    this.applyMode = this.applyMode.bind(this);
    this.showWin = this.showWin.bind(this);
  }

  showWin() {
    this.setState({ winStats: { message: "Flooded!" } });
  }

  colorClicked(color) {
    this.setState({ currentColor: color });
  }

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
      darkMode: settings.darkMode,
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
    let stats = this.state.winStats ? <div>{this.state.winStats.message}</div> : null;
    return (
      <div className={`dark-mode--${this.state.darkMode}`}>
        <nav
          className="navbar navbar-expand-lg navbar-light mb-5"
          style={{ backgroundColor: navBarColor }}
        >
          <h1>Flood It!</h1>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse flex-row-reverse"
            id="navbarNavDropdown"
          >
            <ul class="navbar-nav">
              <li class="nav-item active">
                <i
                  className={`fas fa-${
                    this.state.crow ? "square" : "crow"
                  } font-25 rainbow`}
                  onClick={() => this.setState({ crow: !this.state.crow })}
                ></i>
              </li>
              <li class="nav-item active ml-3">
                <i
                  className="fas fa-redo font-25"
                  onClick={() =>
                    this.setState({ refresh: !this.state.refresh }, () =>
                      this.setState({ refresh: !this.state.refresh })
                    )
                  }
                ></i>
              </li>
              <li class="nav-item active ml-3">
                <i
                  className="fas fa-cog font-25"
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
        <div className="pt-3 pb-3 d-flex justify-content-around">
          <div>
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
      </div>
    );
  }
}

export default GameContainer;
