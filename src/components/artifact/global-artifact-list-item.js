import React from 'react';
import radium from 'radium';

import styles from '../../styles';

import GlobalArtifact from '../../model/globalArtifact';
import ArtifactLink from './artifact-link';

import { HorizontalGrid, VerticalGrid, GridColumn } from '../uikit/grid';


// -----------------------------------------------------------------------------
// ExperimentListItem
// -----------------------------------------------------------------------------

const GlobalArtifactListItemComponent = ({
                                           artifact,
                                           m = 2,
                                           ...props
                                         }) => {
  const sx = {
    container: {
      ...styles.getMargin(m),
    },
    title: {
      ...styles.getFontSize(6),
      ...styles.getLineHeight(5),
      fontWeight: styles.variables.type.bold,
      color: styles.variables.color.secondaryColor,
      cursor: 'pointer',
    },
    organization: {
      display: 'inline-block',
    },
    date: {
      float: 'right',
      display: 'inline-block',
      '@media (max-width: 25rem)': {
        float: 'none',
        display: 'block',
      },
    },

    header: {
      borderBottom: `1px solid ${styles.shade[1]}`,
      ...styles.getFontSize(7),
      ...styles.getLineHeight(7),
    },
  };
  return (
    <div style={sx.container}>
      <HorizontalGrid {...props} verticalAlign="center" gutter={1}>
        <GridColumn gutter={1}>
          <VerticalGrid gutter={0}>
            <GridColumn style={sx.header} gutter={0}>
              <div style={sx.organization}>{artifact.user} at {artifact.organization}</div>
              <div style={sx.date}>{artifact.publicationDate}</div>
            </GridColumn>
            <GridColumn
              gutter={0}
              style={sx.title}
            >
              <ArtifactLink artifact={artifact} />
            </GridColumn>
          </VerticalGrid>
        </GridColumn>
      </HorizontalGrid>
    </div>
  );
};

GlobalArtifactListItemComponent.propTypes = {
  artifact: React.PropTypes.instanceOf(GlobalArtifact).isRequired,
  m: React.PropTypes.arrayOf(React.PropTypes.number),
  onClick: React.PropTypes.func,
};

const GlobalArtifactListItem = radium(GlobalArtifactListItemComponent);

export default GlobalArtifactListItem;
