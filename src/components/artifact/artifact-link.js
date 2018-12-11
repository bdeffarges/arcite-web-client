import React from 'react';

import { getArtifactUrl, getGlobalArtifactUrl } from '../../api/api-utilities';

const ArtifactLink = ({ artifact, ...props }) => {
  const sx = {
    anchor: {
      cursor: 'pointer',
      flex: 1,
    },
  };

  const global = artifact.global;

  return (
    <a
      href={global ? getGlobalArtifactUrl(artifact) : getArtifactUrl(artifact)}
      style={sx.anchor}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {artifact.description}
    </a>
  );
};

ArtifactLink.propTypes = {
  artifact: React.PropTypes.object,
};

export default ArtifactLink;
