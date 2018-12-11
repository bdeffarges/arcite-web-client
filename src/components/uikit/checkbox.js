import React from 'react';
import radium from 'radium';

import styles from '../../styles';

const CheckboxComponent = ({
  checked,
  inline,
  onChange,
  children,
  small,
}) => {
  const sx = {
    field: {
      position: 'relative',
      display: inline ? 'inline-block' : 'block',
      ...styles.getScaledProperty('height')(small ? 6 : 8),
      ...styles.getMargin([0, 0, (inline ? 0 : 2), 0]),
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
    },
    input: {
      position: 'absolute',
      width: 0,
      height: 0,
      overflow: 'hidden',
      opacity: 0,
    },
    check: {
      position: 'relative',
      display: 'inline-block',
      ...styles.getMargin([1, 0]),
      ...styles.getScaledProperty('width')(small ? 4 : 6),
      ...styles.getScaledProperty('height')(small ? 4 : 6),
      verticalAlign: 'top',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderColor: '#000',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: '2px',
      ':focus': {
        outline: 'none',
      },

    },
    checked: {
      backgroundColor: '#3f51b5',
      borderColor: '#3f51b5',
    },
    checkedMarker: {
      position: 'absolute',
      top: small ? '.4rem' : '.35rem',
      left: small ? '.35rem' : '.5rem',
      ...styles.getScaledProperty('width')(small ? 1 : 2),
      ...styles.getScaledProperty('height')(small ? 2 : 4),
      borderColor: '#fff',
      borderStyle: 'solid',
      borderTop: 0,
      borderRightWidth: small ? '.125rem' : '.25rem',
      borderBottomWidth: small ? '.125rem' : '.25rem',
      borderLeft: 0,
      transform: 'rotate(45deg)',
      pointerEvents: 'none',
    },
    text: {
      display: 'inline-block',
      ...styles.getPadding([0, 0, 0, small ? 1 : 2]),
      ...styles.getFontSize(small ? 6 : 4),
      ...styles.getScaledProperty('lineHeight')(small ? 6 : 8),
      color: '#000',
      whiteSpace: 'nowrap',
      verticalAlign: 'top',
    },
  };
  const sxCheck = [sx.check];
  if (checked) {
    sxCheck.push(sx.checked);
  }
  return (

    <label htmlFor={name} style={sx.field}>
      <input
        name={name}
        type="checkbox"
        style={sx.input}
        checked={checked}
        onChange={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
      />
      <button
        style={sxCheck}
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
      />
      <span style={[sx.checkedMarker]} />
      <span style={sx.text}>{children}</span>
    </label>

  );
};

CheckboxComponent.propTypes = {
  checked: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  small: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
};

CheckboxComponent.defaultProps = {
  checked: false,
  inline: false,
  small: false,
  children: '',
};

const Checkbox = radium(CheckboxComponent);
export default Checkbox;
