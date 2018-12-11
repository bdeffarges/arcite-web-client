import React from 'react';

import radium from 'radium';
import styles from '../../styles';

// -----------------------------------------------------------------------------
// BaseButton
// -----------------------------------------------------------------------------

const ButtonBaseComponent = ({
  children,
  m = [0, 0],
  p = [2, 4],
  block,
  size,
  color = styles.variables.type.baseColor,
  background = styles.variables.type.baseBackgroundColor,
  outline,
  disabled,
  uppercase,
  thin,
  icon,
  round,
  humble,
  invert,
  ...props
}) => {
  let sizeNumber = 5;
  let padding = p;
  if (size === 'xsmall') {
    sizeNumber = 8;
    padding = [0, 1];
  } else if (size === 'small') {
    sizeNumber = 7;
    padding = [1, 2];
  } else if (size === 'large') {
    sizeNumber = 3;
  }

  const sx = {
    default: {
      ...styles.getMargin(m),
      ...styles.getPadding(padding),
      ...styles.getFontSize(sizeNumber),
      fontWeight: styles.variables.type.bold,
      display: block ? 'block' : 'inline-block',
      width: block ? '100%' : null,
      color: outline ? styles.getBaseColor(invert) : color,
      background: outline ? 'none' : background,
      opacity: disabled ? 0.65 : 1,
      borderColor: `${outline ? background : styles.shade[1]}`,
      borderStyle: 'solid ',
      ...styles.getScaledProperty('borderWidth')(1 / 4),
      borderRadius: styles.variables.space.borderRadius,
      textTransform: uppercase ? 'uppercase' : null,
      userSelect: 'none',
      touchAction: 'manipulation',
      whiteSpace: 'nowrap',
      ':hover': {
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? background : styles.darken(background, 1 / 2),
        color,
      },
      ':focus': {
        outline: 0,
      },
      ':active': {
        background: disabled ? background : styles.darken(background, 3 / 2),
      },
      transition: styles.getStandardTransition(3),
    },
    thin: {
      fontWeight: styles.variables.type.thin,
    },
    round: {
      borderRadius: '50%',
      ...styles.getScaledProperty('width')(12),
      ...styles.getScaledProperty('height')(12),
      ...styles.getBoxShadow(1),
      ...styles.getPadding(3),
      ...styles.getFontSize(4),
      ':hover': {
        ...styles.getBoxShadow(2),
      },
      small: {
        ...styles.getScaledProperty('width')(8),
        ...styles.getScaledProperty('height')(8),
        ...styles.getPadding(2),
        ...styles.getFontSize(6),
      },
      large: {
        ...styles.getScaledProperty('width')(16),
        ...styles.getScaledProperty('height')(16),
        ...styles.getPadding(4),
        ...styles.getFontSize(2),
      },
    },
    humble: {
      background: 'none',
      borderWidth: 0,
      color: styles.alpha(styles.getBaseColor(invert))(1 / 2),
      ...styles.getMargin(m),
      ...styles.getPadding(1),
      ...styles.getFontSize(8),
      ...styles.getFontSize(sizeNumber),
      ':hover': {
        color: styles.getBaseColor(invert),
        background: 'none',
        borderWidth: 0,
      },
      ':active': {
        background: 'none',
      },
    },
  };
  const csx = [sx.default];
  if (thin) {
    csx.push(sx.thin);
  }
  if (round) {
    csx.push(sx.round);
    if (size === 'small') {
      csx.push(sx.round.small);
    }
    if (size === 'large') {
      csx.push(sx.round.large);
    }
  }
  if (humble) {
    csx.push(sx.humble);
  }

  return (
    <button {...props} style={csx}><i className={icon} />{children}</button>
  );
};

ButtonBaseComponent.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large']),
  color: React.PropTypes.string,
  background: React.PropTypes.string,
  block: React.PropTypes.bool,
  outline: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  uppercase: React.PropTypes.bool,
  thin: React.PropTypes.bool,
  icon: React.PropTypes.string,
  round: React.PropTypes.bool,
  humble: React.PropTypes.bool,
  invert: React.PropTypes.bool,
};

const Button = radium(ButtonBaseComponent);
const DefaultButton = props => (<Button {...props} uppercase />);
const PrimaryButton = props => (
  <Button {...props} color="#fff" background={styles.variables.color.primaryColor} uppercase />);
const SecondaryButton = props => (
  <Button {...props} color="#fff" background={styles.variables.color.secondaryColor} uppercase />);
const AlertButton = props => (
  <Button {...props} color="#fff" background={styles.variables.color.alertColor} uppercase />);
const DefaultRoundButton = props => (<Button {...props} round />);
const PrimaryRoundButton = props => (
  <Button {...props} round color="#fff" background={styles.variables.color.primaryColor} />);
const SecondaryRoundButton = props => (
  <Button {...props} round color="#fff" background={styles.variables.color.secondaryColor} />);
const AlertRoundButton = props => (
  <Button {...props} round color="#fff" background={styles.variables.color.alertColor} />);
const DefaultHumbleButton = props => (<Button humble {...props} />);

// -----------------------------------------------------------------------------
// ButtonBar
// -----------------------------------------------------------------------------

function renderButtonBarButtons(children, style, spacing) {
  let idx = 1;
  const lastIdx = React.Children.count(children);
  return React.Children.map(children, (child) => {
    const margin = (idx === lastIdx) ? [0] : [0, spacing, 0, 0];
    idx += 1;
    return React.cloneElement(child, { block: true, style, m: margin });
  });
}

const ButtonBarComponent = ({
  children,
  spacing = 4,
  m,
  p,
  ...props
}) => {
  const sx = {
    container: {
      display: 'flex',
      ...styles.getMargin(m),
      ...styles.getPadding(p),
    },
    button: {
      flex: 1,
      display: 'inline-block',
    },
  };

  return (
    <div {...props} style={sx.container}>
      {renderButtonBarButtons(children, sx.button, spacing)}
    </div>
  );
};

ButtonBarComponent.propTypes = {
  children: React.PropTypes.node,
  spacing: React.PropTypes.number,
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
};

const ButtonBar = radium(ButtonBarComponent);

export {
  DefaultButton,
  PrimaryButton,
  SecondaryButton,
  AlertButton,
  DefaultRoundButton,
  PrimaryRoundButton,
  SecondaryRoundButton,
  AlertRoundButton,
  DefaultHumbleButton,
  ButtonBar,
};
