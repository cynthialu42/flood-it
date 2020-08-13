import React, { Component } from "react";
import Grid from "../components/Grid";
import ColorButtons from "../components/ColorButtons";
import Sidedrawer from "../components/Sidedrawer";
import Settings from "../components/Settings";
import colorSchemes from "../constants/colorSchemes";

class GameContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentColor: null,
      crow: false,
      sidedrawerIsOpen: null,
      content: "hi",
    };
    this.colorClicked = this.colorClicked.bind(this);
    this.closeSidedrawer = this.closeSidedrawer.bind(this);
  }

  colorClicked(color) {
    this.setState({ currentColor: color });
  }

  closeSidedrawer() {
    this.setState({ sidedrawerIsOpen: false });
  }

  render() {
    let buttonSection;
    buttonSection = colorSchemes["standard"].map((color) => {
      return (
        <ColorButtons
          color={color}
          sendColor={this.colorClicked}
          crow={this.state.crow}
        />
      );
    });
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
          <a class="navbar-brand" href="#">
            Flood It!
          </a>
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
                  className="fas fa-crow font-25 rainbow"
                  onClick={() => this.setState({ crow: !this.state.crow })}
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
        <div className="pt-5 pb-3">
          <Grid
            size={5}
            crow={this.state.crow}
            colors={["#EAC435", "#345995", "#E40066", "#03CEA4", "#FB4D3D"]}
            currentColor={this.state.currentColor}
          />
          <div className="d-flex justify-content-center mt-5">
            {buttonSection}
          </div>
        </div>
        <Sidedrawer
          isOpen={this.state.sidedrawerIsOpen}
          content={<Settings />}
          closeSidedrawer={this.closeSidedrawer}
        />
      </div>
    );
  }
}

export default GameContainer;
