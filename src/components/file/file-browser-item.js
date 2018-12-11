import React, { Component } from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import RemoteFile from '../../model/remoteFile';
import { PrimaryButton } from '../uikit/buttons';

import styles from '../../styles';

class DataSourceComponent extends Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick() {
    const { remoteFile, loadRemoteFiles } = this.props;
    if (!remoteFile.isFile()) {
      loadRemoteFiles(remoteFile.successorPath.dataSource, remoteFile.successorPath.folder);
    }
  }


  render() {
    const { remoteFile, attachRemoteFile, invert } = this.props;
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
          cursor: remoteFile.isFile() ? 'auto' : 'pointer',
        },
      },
      icon: {
        ...styles.getMarginRight(2),
      },
    };

    const iClass = remoteFile.isFile() ? 'fa fa-file-o' : 'fa fa-folder';
    return (
      <div
        style={sx.container}
        role="button"
        onDoubleClick={this.handleDoubleClick}
      >
        <div style={sx.name}>
          <i className={iClass} style={sx.icon} />
          { remoteFile.name }
        </div>
        <div style={sx.action}>
          <PrimaryButton size="xsmall" onClick={attachRemoteFile}>Add</PrimaryButton>
        </div>
      </div>
    );
  }
}

DataSourceComponent.propTypes = {
  remoteFile: PropTypes.instanceOf(RemoteFile).isRequired,
  loadRemoteFiles: PropTypes.func.isRequired,
  attachRemoteFile: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

DataSourceComponent.defaultProps = {
  invert: false,
};

const RemoteFileItem = radium(DataSourceComponent);

const FileBrowserItem = ({ remoteFile, loadRemoteFiles, attachRemoteFile, invert }) => (
  <RemoteFileItem
    remoteFile={remoteFile}
    invert={invert}
    loadRemoteFiles={loadRemoteFiles}
    attachRemoteFile={() => attachRemoteFile(remoteFile)}
  />
);


FileBrowserItem.propTypes = {
  remoteFile: PropTypes.objectOf(RemoteFile).isRequired,
  loadRemoteFiles: PropTypes.func.isRequired,
  attachRemoteFile: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

FileBrowserItem.defaultProps = {
  invert: false,
};

export default radium(FileBrowserItem);
