import React, { Component } from "react";

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
        <div className={`sidedrawer sidedrawer--${sidedrawerStatus}`}>
          {this.props.content}
        </div>
        {showOverlay}
      </div>
    );
  }
}

export default Sidedrawer;
