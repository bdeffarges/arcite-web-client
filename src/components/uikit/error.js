import React from 'react';
import radium from 'radium';

import styles from '../../styles';

// -----------------------------------------------------------------------------
// Error Box
// -----------------------------------------------------------------------------
function getMessage(error) {
  if (error.response) {
    return error.response.data.error;
  }
  return error.message;
}

const ErrorBoxComponent = ({
  error,
  p = 1,
  m,
  ...props
}) => {
  const sx = {
    container: {
      backgroundColor: styles.alpha(styles.variables.color.alertColor)(1 / 4),
      color: styles.variables.color.alertColor,
      border: `1px solid ${styles.alpha(styles.variables.color.alertColor)(1 / 2)}`,
      borderRadius: styles.variables.space.borderRadius,
      ...styles.getMargin(m),
      ...styles.getPadding(p),
      ...styles.getFontSize(6),
      ...styles.getLineHeight(6),
    },
    icon: {
      display: 'inline-block',
      ...styles.getFontSize(5),
      verticalAlign: 'middle',
    },
    label: {
      display: 'inline-block',
    },
  };
  const message = getMessage(error);
  return (
    <div {...props} style={sx.container}>
      <span style={sx.icon}><i style={sx.icon} className="act-exclamation-circle" /></span> <span style={sx.label}>{message}</span>
    </div>
  );
};

ErrorBoxComponent.propTypes = {
  error: React.PropTypes.object,
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
};

export const ErrorBox = radium(ErrorBoxComponent);

export default {
  ErrorBox,
};
