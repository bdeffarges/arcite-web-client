import React from 'react';

import radium from 'radium';
import cx from 'classnames';

import styles from '../../styles';

const getFlexDirection = (s) => {
  switch (s) {
    case 'above':
      return 'column-reverse';
    case 'right':
      return 'row';
    case 'left':
      return 'row-reverse';
    default:
      return 'column';
  }
};

const getIconColor = (color, dimmed) => {
  if (!color) {
    return null;
  }
  if (!dimmed) {
    return color;
  }
  return styles.dim(color);
};

const BaseIconComponent = ({
  icon,
  size,
  color,
  block,
  p = [0],
  m = [0],
  label,
  labelPosition,
  className,
  style,
  dimmed,
  ...props
}) => {
  const flexDirection = getFlexDirection(labelPosition);
  const iconColor = getIconColor(color, dimmed);
  const sx = {
    container: {
      display: block ? 'flex' : 'inline-flex',
      flexDirection,
      alignItems: 'center',
      justifyContent: 'center',
      color: iconColor || null,
      ...styles.getFontSize(size),
      ...styles.getLineHeight(size),
      ...styles.getMargin(m),
      ...styles.getPadding(p),
    },
    icon: {
      ...styles.getPadding(1, 2),
      verticalAlign: 'middle',
    },
    label: {
      verticalAlign: 'middle',
    },
  };
  const labelComponent = label ? (<span style={sx.label}>{label}</span>) : '';
  return (
    <div style={[style, sx.container]} >
      <i {...props} className={cx(className, icon)} style={sx.icon} />
      {labelComponent}
    </div>
  );
};

BaseIconComponent.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(['font-awesome']),
  icon: React.PropTypes.string.isRequired,
  size: React.PropTypes.number,
  color: React.PropTypes.string,
  dimmed: React.PropTypes.bool,
  m: React.PropTypes.arrayOf(React.PropTypes.number),
  p: React.PropTypes.arrayOf(React.PropTypes.number),
  block: React.PropTypes.bool,
  style: React.PropTypes.object,
  label: React.PropTypes.string,
  labelPosition: React.PropTypes.oneOf(['above', 'below', 'left', 'right']),
};

const BaseIcon = radium(BaseIconComponent);
const FAIcon = props => (<BaseIcon type="font-awesome" size={4} {...props} />);
const DefaultFAIcon = props => (<BaseIcon type="font-awesome" size={4} color={styles.variables.type.baseColor} {...props} />);
const PrimaryFAIcon = props => (<BaseIcon type="font-awesome" size={4} color={styles.variables.color.primaryColor} {...props} />);
const SecondaryFAIcon = props => (<BaseIcon type="font-awesome" size={4} color={styles.variables.color.secondaryColor} {...props} />);
const AlertFAIcon = props => (<BaseIcon type="font-awesome" size={4} color={styles.variables.color.alertColor} {...props} />);

export {
  FAIcon,
  DefaultFAIcon,
  PrimaryFAIcon,
  SecondaryFAIcon,
  AlertFAIcon,
};
