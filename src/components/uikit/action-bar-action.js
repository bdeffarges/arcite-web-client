import React, { Component } from 'react';

import radium from 'radium';
import { DefaultButton, PrimaryButton } from '../uikit/buttons';

import styles from '../../styles';

class ActionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
      confirmation: undefined,
    };
    this.handleHighlight = this.handleHighlight.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isHighlight = this.isHighlight.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  handleHighlight(highlight) {
    this.setState({
      ...this.state,
      highlight,
    });
  }

  handleClick() {
    const { name, confirmation, onAction, onActivate } = this.props;
    onActivate(name);
    if (confirmation) {
      this.setState({
        ...this.state,
        confirmation: confirmation.message,
      });
    } else {
      onAction();
    }
  }

  handleOk(e) {
    e.stopPropagation();
    const { onAction } = this.props;
    onAction();
  }

  handleCancel(e) {
    e.stopPropagation();
    const { onActivate } = this.props;
    onActivate();
  }


  isActive() {
    const { activeAction, name } = this.props;
    return activeAction === name && this.state.confirmation;
  }

  isHighlight() {
    return this.state.highlight || this.isActive();
  }

  render() {
    const {
      name,
      icon = 'act-dot-circle-o',
      confirmation,
      invert,
    } = this.props;
    const baseColor = styles.getBaseColor(invert);
    const iconSize = this.isHighlight() ? 0 : 4;
    const okLabel = confirmation && confirmation.okLabel ? confirmation.okLabel : 'Yes';
    const cancelLabel = confirmation && confirmation.cancelLabel ? confirmation.cancelLabel : 'No';
    const sx = {
      container: {
        flex: 1,
        fontFamily: styles.variables.type.baseFont,
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        ...styles.getScaledProperty('height')(10),
        verticalAlign: 'middle',
        color: baseColor,
        ':hover': {
          cursor: 'pointer',
        },
        ':focus': {
          outline: 0,
        },
      },
      button: {
        backgroundColor: 'transparent',
        border: 'none',
        color: baseColor,
        ':hover': {
          cursor: 'pointer',
        },
        ':focus': {
          outline: 0,
        },
      },
      icon: {
        ...styles.getFontSize(iconSize),
        transition: styles.getStandardTransition(1),
      },
      label: {
        ...styles.getLineHeight(2),
        opacity: this.isHighlight() ? 1 : 0,
        fontWeight: invert ? styles.variables.type.thin : null,
        ...styles.getFontSize(4),
        transition: styles.getStandardTransition(1),
      },
      confirmation: {
        display: this.isActive() ? 'block' : 'none',
        backgroundColor: styles.alpha(baseColor)(1 / 4),
        ...styles.getMarginTop(2),
        ...styles.getPadding(2),
        overflow: 'hidden',
        borderRadius: styles.variables.space.borderRadius,
        message: {
          ...styles.getMarginBottom(2),
        },
      },
    };
    return (
      <div key="container" style={sx.container}>
        <button
          style={sx.button}
          onMouseOver={() => this.handleHighlight(true)}
          onMouseOut={() => this.handleHighlight(false)}
          onClick={this.handleClick}
        >
          <div style={sx.icon}><i className={icon} /></div>
          <div style={sx.label}>{name}</div>
        </button>
        <div key="confirmation" style={sx.confirmation}>
          <p style={sx.confirmation.message}>{this.state.confirmation}</p>
          <DefaultButton outline invert={invert} size="small" onClick={this.handleCancel}>{cancelLabel}</DefaultButton>&nbsp;
          <PrimaryButton outline invert={invert} size="small" onClick={this.handleOk}>{okLabel}</PrimaryButton>
        </div>
      </div>
    );
  }
}

ActionComponent.propTypes = {
  name: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  onAction: React.PropTypes.func.isRequired,
  activeAction: React.PropTypes.string,
  onActivate: React.PropTypes.func,
  confirmation: React.PropTypes.object,
  invert: React.PropTypes.bool,
};

export const Action = radium(ActionComponent);

export default {
  Action,
};
