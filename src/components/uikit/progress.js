import React from 'react';
import radium from 'radium';
import _ from 'lodash';

import styles from '../../styles';

const ProgressBarComponent = ({
  progress,
  width = '100%',
  height = 6,
  m = [0, 'auto'],
  innerM = 1 / 4,
  invert,
}) => {
  const baseColor = styles.getBaseColor(invert);
  const sx = {
    progress: {
      display: !_.isUndefined(progress) ? 'block' : 'none',
      width,
      ...styles.getMargin(m),
      ...styles.getScaledProperty('height')(height),
      border: `1px solid ${styles.alpha(baseColor)(1 / 2)}`,
      borderRadius: styles.variables.space.borderRadius,
      position: 'relative',
    },
    progressBar: {
      position: 'absolute',
      ...styles.getMargin(innerM),
      top: 0,
      bottom: 0,
      left: 0,
      borderRadius: styles.variables.space.borderRadius,
      width: `${_.min([progress, 100])}%`,
      backgroundColor: styles.variables.color.primaryColor,
    },
  };
  return (
    <div style={sx.progress}>
      <div style={sx.progressBar} />
    </div>
  );
};

ProgressBarComponent.propTypes = {
  progress: React.PropTypes.number,
  width: React.PropTypes.string,
  height: React.PropTypes.number,
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  innerM: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  invert: React.PropTypes.bool,
};

export const ProgressBar = radium(ProgressBarComponent);
export const ExtraSmallProgressBar = props => (<ProgressBar height={2} innerM={0} {...props} />);
export const SmallProgressBar = props => (<ProgressBar height={3} innerM={0} {...props} />);
export const LargeProgressBar = props => (<ProgressBar height={8} innerM={1 / 2} {...props} />);

export default {
  ProgressBar,
  LargeProgressBar,
  SmallProgressBar,
  ExtraSmallProgressBar,
};
