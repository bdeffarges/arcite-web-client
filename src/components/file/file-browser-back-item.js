import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import RemoteFile from '../../model/remoteFile';

import styles from '../../styles';

const FileBrowserBackItem = ({ currentRemoteFolder, loadRemoteFiles, invert }) => {
  const baseColor = styles.getBaseColor(invert);

  const sx = {
    container: {
      display: 'flex',
      ...styles.getFontSize(7),
      justifyContent: 'space-between',
      ...styles.getPadding(2),
      userSelect: 'none',
      ':hover': {
        backgroundColor: styles.alpha(baseColor)(1 / 8),
        cursor: 'pointer',
      },
    },
    icon: {
      ...styles.getMarginRight(2),
    },
  };
  const iClass = 'fa fa-chevron-left';
  return (
    <div
      style={sx.container}
      role="button"
      onDoubleClick={
        () => loadRemoteFiles(
          currentRemoteFolder.predecessorPath.dataSource,
          currentRemoteFolder.predecessorPath.folder,
        )
      }
    >
      <div>
        <i className={iClass} style={sx.icon} />
        Back
      </div>
    </div>
  );
};


FileBrowserBackItem.propTypes = {
  currentRemoteFolder: PropTypes.objectOf(RemoteFile).isRequired,
  loadRemoteFiles: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

FileBrowserBackItem.defaultProps = {
  invert: false,
};

export default radium(FileBrowserBackItem);
