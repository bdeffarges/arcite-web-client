import React, { Component } from 'react';


const outsideClick = (WrappedComponent, onOutsideClick) => {
  class HOC extends Component {
    componentWillMount() {
      if (onOutsideClick) {
        window.addEventListener('click', onOutsideClick);
      }
    }

    componentWillUnmount() {
      if (onOutsideClick) {
        window.removeEventListener('click', onOutsideClick);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return HOC;
};

export default outsideClick;
