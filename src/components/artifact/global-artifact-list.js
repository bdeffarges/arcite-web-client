import React from 'react';
import _ from 'lodash';

import GlobalArtifactListItem from './global-artifact-list-item';

function renderListItems(artifacts, onClick) {
  return _.values(artifacts).map(
    artifact => (
      <GlobalArtifactListItem
        key={artifact.id}
        artifact={artifact}
        onClick={() => onClick(artifact.id)}
      />
    )
  );
}

const GlobalArtifactList = ({ artifacts, onClick }) => {
  if (!artifacts || artifacts.length === 0) {
    return (<div>No results published yet</div>);
  }
  return (
    <ul>
      {renderListItems(artifacts, onClick)}
    </ul>
  );
};

GlobalArtifactList.propTypes = {
  artifacts: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export default GlobalArtifactList;
