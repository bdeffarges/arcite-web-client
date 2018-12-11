import React from 'react';
import PropTypes from 'prop-types';

import radium from 'radium';

import { DefaultFAIcon } from '../uikit/icon';
import FileBrowserItem from './file-browser-item';
import FileBrowserBackItem from './file-browser-back-item';
import RemoteFile from '../../model/remoteFile';

import styles from '../../styles';

function renderBackItem(currentRemoteFolder, loadRemoteFiles, invert) {
  if (currentRemoteFolder.dataSource) {
    return (
      <FileBrowserBackItem
        key="BackItem"
        currentRemoteFolder={currentRemoteFolder}
        loadRemoteFiles={loadRemoteFiles}
        invert={invert}
      />);
  }
  return undefined;
}

function renderFileItems(remoteFiles, loadRemoteFiles, attachRemoteFile, invert) {
  return remoteFiles.map(remoteFile => (
    <FileBrowserItem
      key={remoteFile.id}
      remoteFile={remoteFile}
      loadRemoteFiles={loadRemoteFiles}
      invert={invert}
      attachRemoteFile={attachRemoteFile}
    />
  ));
}

const FileBrowser = ({
                       remoteFiles,
                       currentRemoteFolder,
                       switchToLocalFileBrowser,
                       loadRemoteFiles,
                       attachRemoteFile,
                       invert,
                     }) => {
  const baseColor = styles.getBaseColor(invert);
  const sx = {
    container: {
      position: 'relative',
      background: styles.alpha(baseColor)(1 / 8),
      border: `1px solid ${styles.alpha(baseColor)(1 / 4)}`,
      borderRadius: styles.variables.space.borderRadius,
      ...styles.getPadding(8),
      height: '100%',
      minHeight: '20rem',
    },
    close: {
      color: baseColor,
      position: 'absolute',
      top: 0,
      right: 0,
      ...styles.getMargin(1),
      ...styles.getPadding(1),
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: styles.variables.space.borderRadius,
      transition: styles.getStandardTransition(1),
      ':hover': {
        background: styles.variables.color.alertColor,
        transform: 'scale(1.1)',
      },
    },
  };

  return (
    <div style={sx.container} key="fileBrowser">
      <button
        key="closeButton"
        style={sx.close}
        onClick={switchToLocalFileBrowser}
      >
        <DefaultFAIcon
          icon="fa fa-times"
          color={baseColor}
        />
      </button>
      <ul>
        { renderBackItem(currentRemoteFolder, loadRemoteFiles, invert)}
        { renderFileItems(remoteFiles, loadRemoteFiles, attachRemoteFile, invert)}
      </ul>
    </div>
  );
};

FileBrowser.propTypes = {
  remoteFiles: PropTypes.arrayOf(RemoteFile),
  currentRemoteFolder: PropTypes.objectOf(RemoteFile),
  switchToLocalFileBrowser: PropTypes.func.isRequired,
  loadRemoteFiles: PropTypes.func.isRequired,
  attachRemoteFile: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

FileBrowser.defaultProps = {
  remoteFiles: [],
  currentRemoteFolder: {},
  invert: false,
};

export default radium(FileBrowser);
