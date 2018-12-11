import React from 'react';
import radium from 'radium';

import ArtifactPublishBox from '../artifact/artifact-publish-box';
import { Paper } from '../uikit/paper';
import DataTransform from '../../model/data-transform';
import Artifact from '../../model/artifact';

import styles from '../../styles';

function getValue(value) {
  return value || '-';
}

function renderArtifacts(artifacts, onPublish, onUnpublish) {
  if (!artifacts.length) {
    return 'None';
  }
  const sx = {
    container: {
      overflow: 'hidden',
      wordWrap: 'break-word',
      ...styles.getFontSize(6),
      width: '100%',
    },
  };

  return (
    <ul style={sx.container}>
      {
        artifacts.map((artifact, idx) => (
          <ArtifactPublishBox
            key={artifact.key}
            first={idx === 0}
            last={idx === (artifacts.length)}
            artifact={artifact}
            onPublish={onPublish}
            onUnpublish={onUnpublish}
          />))
      }
    </ul>
  );
}

const TransformCardItemComponent = ({
  transform,
  artifacts,
  onPublish,
  onUnpublish,
}) => {
  if (!transform) {
    return <div />;
  }

  const sx = {
    header: {
      display: 'flex',
      flexWrap: 'wrap',
      borderBottom: `1px solid ${styles.shade[0]}`,
      ...styles.getPadding([0, 0, 4, 0]),
      ...styles.getMargin([0, 0, 4, 0]),
    },
    heading: {
      flex: 1,
      ...styles.getFontSize(3),
      fontWeight: styles.variables.type.bold,
    },
    subheading: {
      ...styles.getFontSize(4),
      ...styles.getPadding([2, 0, 0, 0]),
      color: styles.shade[2],
    },
    side: {
      ...styles.getScaledProperty('flexBasis')(16),
      flexGrow: 0,
      textAlign: 'right',
      alignSelf: 'flex-end',
    },
    status: {
      textTransform: 'uppercase',
      success: {
        borderBottom: `4px solid ${styles.variables.color.primaryColor}`,
      },
      failed: {
        borderBottom: `4px solid ${styles.variables.color.alertColor}`,
      },
      running: {
        borderBottom: '4px solid rgb(158, 103, 229)',
      },
    },
    icon: {
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'middle',
    },
    content: {},
    contentItem: {
      display: 'flex',
      flexDirection: 'column',
      ...styles.getMargin([2, 0]),
      // alignContent: 'stretch',
      name: {
        display: 'block',
        // ...styles.getScaledProperty('flexBasis')(24),
        flexGrow: 0,
        fontWeight: styles.variables.type.bold,
      },
      value: {
        display: 'block',
        flex: 1,
        overflow: 'hidden',
        wordWrap: 'break-word',
        ...styles.getFontSize(6),
      },
    },
    block: {
      display: 'block',
    },
    flexColumn: {
      flexDirection: 'column',
    },
  };

  return (
    <Paper>
      <div style={sx.header}>
        <div style={sx.heading}>
          {transform.name} - {transform.selectables ? Object.keys(transform.selectables).length : 'No'}
          <div style={sx.subheading}>
            <i className="act-sitemap" style={sx.icon} /> {transform.organization}<br />
            <i className="act-code-fork" style={sx.icon} /> {transform.version}
          </div>
        </div>
        <div style={sx.side}>
          <span style={[sx.status, sx.status[transform.status.toLowerCase()]]}>
            {transform.status}
          </span>
        </div>
      </div>

      <div style={sx.content}>
        <div style={sx.contentItem}>
          <div style={sx.contentItem.name}>Message</div>
          <div style={sx.contentItem.value}>{getValue(transform.statusMessage)}</div>
        </div>
        <div style={sx.contentItem}>
          <div style={sx.contentItem.name}>Start time</div>
          <div style={sx.contentItem.value}>{getValue(transform.startTime)}</div>
        </div>
        <div style={sx.contentItem}>
          <div style={sx.contentItem.name}>End time</div>
          <div style={sx.contentItem.value}>{getValue(transform.endTime)}</div>
        </div>
        <div style={sx.contentItem}>
          <div style={sx.contentItem.name}>Results</div>
          <div style={sx.contentItem.value}>
            {renderArtifacts(artifacts, onPublish, onUnpublish)}
          </div>
        </div>
      </div>
    </Paper>
  );
};

TransformCardItemComponent.propTypes = {
  transform: React.PropTypes.instanceOf(DataTransform),
  artifacts: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Artifact)),
  onPublish: React.PropTypes.func.isRequired,
  onUnpublish: React.PropTypes.func.isRequired,
};

const TransformCardItem = radium(TransformCardItemComponent);

export default TransformCardItem;
