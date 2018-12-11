import React from 'react';
import radium from 'radium';

import ArtifactLink from './artifact-link';
import styles from '../../styles';

const ArtifactLinkBoxComponent = ({ artifact }) => {
  const sx = {
    container: {
      display: 'flex',
      border: `1px solid ${styles.darken(styles.variables.color.primaryColor, 2)}`,
      backgroundColor: styles.alpha(styles.variables.color.primaryColor)(0.4),
      color: styles.darken(styles.variables.color.primaryColor, 2),
      borderRadius: styles.variables.space.borderRadius,
      ...styles.getFontSize(8),
      ...styles.getPadding([1, 2]),
      ...styles.getMargin([1, 0]),
      ':hover': {
        backgroundColor: styles.darken(styles.variables.color.primaryColor, 1),
        color: 'white',
      },
      transition: styles.getStandardTransition(3),
    },
    anchor: {
      cursor: 'pointer',
      flex: 1,
    },
    icon: {
      ...styles.getMargin([0, 1, 0, 0]),
      ...styles.getFontSize(4),
    },
  };
  return (
    <div style={sx.container}>
      <ArtifactLink artifact={artifact} />
      <i style={sx.icon} className="act-eye-2" />
    </div>
  );
};

ArtifactLinkBoxComponent.propTypes = {
  artifact: React.PropTypes.object,
};

const ArtifactLinkBox = radium(ArtifactLinkBoxComponent);

export default ArtifactLinkBox;
