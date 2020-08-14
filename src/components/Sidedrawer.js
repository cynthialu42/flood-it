import React, { Component } from "react";
import Settings from "./Settings";
class Sidedrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      content: this.props.content,
    };
  }
  render() {
    let showOverlay = null;
    let sidedrawerStatus = null;
    if (this.props.isOpen) {
      sidedrawerStatus = "open";
    } else if (this.props.isOpen === false) {
      sidedrawerStatus = "closed";
    }
    if (this.props.isOpen) {
      showOverlay = (
        <div
          className="sidedrawer-overlay"
          onClick={this.props.closeSidedrawer}
        ></div>
      );
    }
    return (
      <div>
        <div
          className={`sidedrawer sidedrawer--${sidedrawerStatus} sidedrawer-dark-mode--${this.props.darkMode} pt-4 pb-4 pl-4 pr-4`}
        >
          <Settings
            colorTheme={this.props.colorTheme}
            applyNewSettings={this.props.applyNewSettings}
            closeSidedrawer={this.props.closeSidedrawer}
            size={this.props.size}
            darkMode={this.props.darkMode}
            applyMode={this.props.applyMode}
          />
        </div>
        {showOverlay}
      </div>
    );
  }
}

export default Sidedrawer;
