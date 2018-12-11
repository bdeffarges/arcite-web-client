import React from 'react';
import radium from 'radium';

import styles from '../../styles';

const InputComponent = ({
  type = 'text',
  multiline,
  rows,
  size,
  display = 'block',
  m = [0],
  name,
  label,
  labelWidth,
  fieldWidth,
  labelPosition = 'above',
  error,
  icon,
  cursor,
  style,
  ...props
}) => {
  const sizes = {
    size: 4,
    padding: 3,
    topMargin: 1,
  };
  sizes.size = styles.getFontScaleFor(size);
  sizes.errorSize = styles.getSmallFontScaleFor(size);
  sizes.errorPaddingLeft = 2;
  sizes.errorPaddingTop = 2;
  if (size === 'small') {
    sizes.padding = 2;
    sizes.topMargin = 2;
  } else if (size === 'large') {
    sizes.padding = 4;
    sizes.topMargin = 1;
  }

  const sx = {
    container: {
      display: display === 'block' ? 'flex' : 'inline-flex',
      flexDirection: labelPosition === 'above' ? 'column' : 'row',
      ...styles.getFontSize(sizes.size),
      ...styles.getLineHeight(sizes.size),
      ...styles.getMargin(m),
    },
    label: {
      flexBasis: 'content',
      display: 'inline-block',
      minWidth: labelWidth || null,
      ...styles.getPaddingRight(sizes.padding),
      ...styles.getMarginTop(sizes.topMargin),
      color: `${styles.shade[2]}`,
    },
    error: {
      flexBasis: 'content',
      display: 'inline-block',
      color: styles.variables.color.alertColor,
      ...styles.getFontSize(sizes.errorSize),
      ...styles.getSingleLineHeight(sizes.errorSize),
      ...styles.getPaddingTop(sizes.errorPaddingTop),
      ...styles.getPaddingLeft(sizes.errorPaddingLeft),
      alignSelf: 'flex-end',
      height: '100%',
    },
    inputContainer: {
      flex: 1,
      minWidth: fieldWidth || null,
      position: 'relative',
    },
    inputField: {
      display: 'inline-block',
      width: '100%',
      ...sizes.size,
      lineHeight: '100%',
      ...styles.getPadding(sizes.padding),
      borderRadius: styles.variables.space.borderRadius,
      boxShadow: 'none',
      border: `1px solid ${styles.shade[0]}`,
      ':focus': {
        outline: 'none',
        border: `1px solid ${styles.alpha(styles.variables.color.primaryColor)(1)}`,
      },
      ':hover': {
        cursor: cursor || null,
      },
      transition: styles.getStandardTransition(3),
    },
    inputIcon: {
      position: 'absolute',
      width: '100%',
      textAlign: 'right',
      top: '15%',
      pointerEvents: 'none',
    },
  };
  const labelComponent = label ? (
    <label style={sx.label} htmlFor={name}>{label}</label>
  ) : '';

  const errorComponent = error ? (
    <div style={sx.error}>{error}</div>
  ) : '';

  const inputComponent = multiline ?
  (<textarea {... props} name={name} rows={rows} style={sx.inputField} />) :
  (<input {... props} name={name} type={type} style={sx.inputField} />);

  const iconComponent = icon ? (<div style={sx.inputIcon}>{icon}</div>) : '';
  return (
    <div style={[style, sx.container]}>
      {labelComponent}
      <div style={sx.inputContainer}>
        {inputComponent}
        {iconComponent}
      </div>
      {errorComponent}
    </div>
  );
};

InputComponent.propTypes = {
  type: React.PropTypes.oneOf(['text', 'password', 'number']),
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  error: React.PropTypes.string,
  labelWidth: React.PropTypes.string,
  fieldWidth: React.PropTypes.string,
  display: React.PropTypes.oneOf(['block', 'inline']),
  labelPosition: React.PropTypes.oneOf(['above', 'inline']),
  m: React.PropTypes.arrayOf(React.PropTypes.number),
  multiline: React.PropTypes.bool,
  rows: React.PropTypes.number,
  size: React.PropTypes.oneOf(['small', 'normal', 'large']),
  icon: React.PropTypes.node,
  cursor: React.PropTypes.string,
  style: React.PropTypes.object,
};

const Input = radium(InputComponent);

const TextField = props => (<Input {...props} type="text" />);
const PasswordField = props => (<Input {...props} type="password" />);
const NumberField = props => (<Input {...props} type="number" />);
const TextArea = props => (<Input {...props} multiline />);

function selectAll(target) {
  target.select();
}

export {
  TextField,
  PasswordField,
  NumberField,
  TextArea,
  selectAll,
};
