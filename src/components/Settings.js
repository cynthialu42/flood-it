import React, { Component } from "react";
import colorThemes from "../constants/colorThemes";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColorTheme: this.props.colorTheme,
      selectedGridSize: this.props.size,
      selectedMode: this.props.darkMode,
    };
    this.applySettingsChanges = this.applySettingsChanges.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
    this.updateMode = this.updateMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  applySettingsChanges() {
    let settings = {
      colorTheme: this.state.selectedColorTheme,
      size: this.state.selectedGridSize,
      darkMode: this.state.selectedMode
    };
    this.props.applyNewSettings(settings);
    this.props.closeSidedrawer();
  }

  updateGridSize(e) {
    console.log(e.target.value);
    this.setState({ selectedGridSize: e.target.value });
  }

  updateMode(e) {
    console.log(e.target);
    //   console.log(e.target.value)
    this.setState({ selectedMode: !this.state.selectedMode }, () => {
        this.props.applyMode(this.state.selectedMode)
    });
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
        <div className="d-flex justify-content-between">
          <h3>Manage Settings</h3>
          <button onClick={this.applySettingsChanges}>Apply</button>
        </div>
        <h5>Color Themes</h5>
        <div className="d-flex flex-column align-items-start">{themes}</div>
        <h5>{`Grid Size ${this.state.selectedGridSize} x ${this.state.selectedGridSize}`}</h5>
        <div>
          <input
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
        <div>
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
            value="dark"
            // handleChange={this.handleCheckbox}
            // onChange={this.updateMode}
            onClick={this.updateMode}
            checked={this.state.selectedMode}
          />
          <label class="form-check-label" for="exampleCheck1">
            Dark Mode
          </label>
        </div>
      </div>
    );
  }
}

export default Settings;
