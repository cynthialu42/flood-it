import React, { Component } from "react";
import colorThemes from "../constants/colorThemes";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColorTheme: this.props.colorTheme,
      selectedGridSize: this.props.size,
    };
    this.applySettingsChanges = this.applySettingsChanges.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    let newSize;
    let newTheme;
    if (prevProps.size !== this.props.size) {
      newSize = this.props.size;
      this.setState({ selectedGridSize: newSize});
    }
    if (prevProps.colorTheme !== this.props.colorTheme) {
      newTheme = this.props.colorTheme;
      this.setState({ selectedColorTheme: newTheme });
    }
  }

  applySettingsChanges() {
    let settings = {
      colorTheme: this.state.selectedColorTheme,
      size: this.state.selectedGridSize,
    };
    this.props.applyNewSettings(settings);
    this.props.closeSidedrawer();
  }

  updateGridSize(e) {
    console.log(e.target.value);
    this.setState({ selectedGridSize: Math.floor(e.target.value) });
  }

  handleChange(e) {
    console.log(e.target);
    console.log(e);
  }

  render() {
    let themes = colorThemes.map((theme) => {
      let colorSwatches = theme.colors.map((color) => {
        return (
          <div style={{ backgroundColor: color, height: 35, width: 35 }} />
        );
      });
      return (
        <div
          className={`d-flex mb-3 color-swatch-bar color-swatch-bar--${
            this.state.selectedColorTheme === theme.name ? "border" : null
          }`}
          onClick={() => this.setState({ selectedColorTheme: theme.name })}
        >
          {colorSwatches}
        </div>
      );
    });
    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <h3>Manage Settings</h3>
          <div>
            <button
              className={`btn btn-${
                this.props.darkMode ? "dark" : "light"
              } mr-2`}
              onClick={this.props.closeSidedrawer}
            >
              Cancel
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.applySettingsChanges}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="mb-3">
          *Current game will be lost when applying new settings
        </div>
        <h5>Color Themes</h5>
        <div className="d-flex flex-column align-items-start mb-3">
          {themes}
        </div>
        <h5>{`Grid Size ${this.state.selectedGridSize} x ${this.state.selectedGridSize}`}</h5>
        <div className="mb-3">
          <input
            className="width-70"
            type="number"
            onKeyPress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
            name="tentacles"
            min="5"
            step="5"
            max="25"
            value={this.state.selectedGridSize}
            onChange={this.updateGridSize}
          />
        </div>
      </div>
    );
  }
}

export default Settings;
