import React from 'react';
import radium from 'radium';

import styles from '../../styles';

const BasePaperComponent = ({
  children,
  z = 0,
  m,
  p = [6],
  width,
  height,
  round,
  style,
}) => {
  const sx = {
    ...styles.getBoxShadow(z),
    ...styles.getMargin(m),
    ...styles.getPadding(p),
    height: height || null,
    width: width || null,
    borderRadius: round ? '50%' : null,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  };
  return (
    <div style={[style, sx]}>
      {children}
    </div>
  );
};

BasePaperComponent.propTypes = {
  children: React.PropTypes.node,
  z: React.PropTypes.number,
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  round: React.PropTypes.bool,
  style: React.PropTypes.object,
};

const BasePaper = radium(BasePaperComponent);
const Paper = props => (<BasePaper {...props} />);
const RoundPaper = props => (<BasePaper {...props} round />);

export {
  Paper,
  RoundPaper,
};
