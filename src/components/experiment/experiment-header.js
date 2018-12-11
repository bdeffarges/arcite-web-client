
import React from 'react';
import radium from 'radium';

import styles from '../../styles';

import { FAIcon } from '../uikit/icon';

// -----------------------------------------------------------------------------
// Experiment type header (icon and label)
// -----------------------------------------------------------------------------

const ExperimentHeaderComponent = ({
  type,
  size = 0,
  align = 'left',
  showLabel,
  ...props
}) => {
  const sx = {
    container: {
      textAlign: align,
    },
    icon: {

    },
    label: {
      ...styles.getFontSize(size + 6),
    },
  };

  let icon = 'experiment';
  if (type === 'nanostring' || type === 'microarray' || type === 'ngs' || type === 'catwalk') {
    icon = type;
  }

  const labelComponent = showLabel ? (
    <div style={sx.label}>
      {type.toUpperCase()}
    </div>
  ) : '';

  return (
    <div {...props} style={sx.container}>
      <div style={sx.icon}>
        <FAIcon size={size} icon={`act-${icon}`} width="25px" />
      </div>
      {labelComponent}
    </div>
  );
};

ExperimentHeaderComponent.propTypes = {
  type: React.PropTypes.string.isRequired,
  align: React.PropTypes.string,
  size: React.PropTypes.number,
  showLabel: React.PropTypes.bool,
};

const ExperimentHeader = radium(ExperimentHeaderComponent);

export default ExperimentHeader;
