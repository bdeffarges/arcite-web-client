import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FILE_TYPE_RAW_DATA, FILE_TYPE_META_DATA } from '../../constants';
import * as experimentActions from '../../actions/actions-experiments';
import {
  getCurrentExperiment,
  isExperimentEditable,
  getRemoteFileEnabledByType,
  getFiles,
  getRemoteFilesByType,
  getCurrentRemoteFolderByType,
} from '../../reducers';

import FileGrid from '../../components/file/file-grid';


const FileGridContainer = ({
                             experiment,
                             files,
                             remoteFilesByType,
                             currentRemoteFolderByType,
                             editable,
                             remoteFileEnabledByType,
                             uploadFile,
                             deleteFile,
                             attachRemoteFile,
                             enableRemoteFileUpload,
                             loadRemoteFiles,
                           }) => {
  const fileTypes = [FILE_TYPE_RAW_DATA, FILE_TYPE_META_DATA];
  return (
    <FileGrid
      files={files}
      remoteFilesByType={remoteFilesByType}
      currentRemoteFolderByType={currentRemoteFolderByType}
      types={fileTypes}
      remoteFileEnabledByType={remoteFileEnabledByType}
      loadRemoteFiles={loadRemoteFiles}
      editable={editable}
      handleDroppedFiles={(type, filesToUpload) => {
        for (let i = 0; i < filesToUpload.length; i += 1) {
          uploadFile(experiment.id, type, filesToUpload[i]);
        }
      }}
      handleDeleteFile={file => deleteFile(experiment.id, file)}
      handleAttachRemoteFile={(type, file) => attachRemoteFile(experiment.id, type, file)}
      enableRemoteFileUpload={enableRemoteFileUpload}
      invert
    />
  );
};


FileGridContainer.propTypes = {
  experiment: PropTypes.object,
  files: PropTypes.object,
  remoteFilesByType: PropTypes.object,
  editable: PropTypes.bool,
  remoteFileEnabledByType: PropTypes.object,
  currentRemoteFolderByType: PropTypes.object,
  uploadFile: PropTypes.func,
  deleteFile: PropTypes.func,
  attachRemoteFile: PropTypes.func,
  enableRemoteFileUpload: PropTypes.func,
  loadRemoteFiles: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    experiment: getCurrentExperiment(state),
    files: getFiles(state),
    remoteFilesByType: getRemoteFilesByType(state),
    currentRemoteFolderByType: getCurrentRemoteFolderByType(state),
    editable: isExperimentEditable(state),
    remoteFileEnabledByType: getRemoteFileEnabledByType(state),
  };
}


export default connect(mapStateToProps, {
  uploadFile: experimentActions.uploadFile,
  deleteFile: experimentActions.deleteFile,
  attachRemoteFile: experimentActions.attachRemoteFile,
  enableRemoteFileUpload: experimentActions.enableRemoteFileUpload,
  loadRemoteFiles: experimentActions.loadRemoteFiles,
})(FileGridContainer);
