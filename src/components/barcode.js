import React, { Component } from 'react';
import jsbarcode from 'jsbarcode';


class Barcode extends Component {
  componentDidMount() {
    this.update();
  }

  componentWillUpdate() {
    this.update();
  }

  update() {
    jsbarcode(this.canvas, this.props.barcode, {
      width: this.props.barWidth || 2,
      height: this.props.height || 25,
      font: 'Roboto',
      fontSize: this.props.fontSize || 20,
    });
  }


  render() {
    return (
      <canvas ref={(c) => { this.canvas = c; }} />
    );
  }
}

Barcode.propTypes = {
  barcode: React.PropTypes.string,
  barWidth: React.PropTypes.number,
  height: React.PropTypes.number,
  fontSize: React.PropTypes.number,
};

export default Barcode;
