import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import _ from 'lodash';

import { HorizontalGrid, GridColumn } from '../uikit/grid';
import { Heading3, Subheading3 } from '../uikit/typography';
import FileCompactGridItem from './file-grid-item-compact';
import FileDropArea from './file-drop-area';
import FileBrowser from './file-browser';

import FileType from '../../model/file_type';

const gridWidth = '10rem';
// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

function getDeleteFileHandler(file, props) {
  const { editable, handleDeleteFile } = props;
  if (editable) {
    return () => handleDeleteFile(file);
  }
  return undefined;
}

function renderFiles(files, props) {
  if (!files) {
    return '';
  }

  const { invert } = props;
  return files.map(file => (
    <GridColumn key={file.id} minWidth="40%" width="48%" maxWidth="98%">
      <FileCompactGridItem
        file={file}
        invert={invert}
        handleDelete={getDeleteFileHandler(file, props)}
      />
    </GridColumn>
  ));
}

function renderDropArea(type, files, remoteFiles, currentRemoteFolder, loadRemoteFiles, props) {
  const {
    editable,
    remoteFileEnabledByType,
    invert,
    handleDroppedFiles,
    enableRemoteFileUpload,
    handleAttachRemoteFile,
  } = props;
  if (editable) {
    if (remoteFileEnabledByType[type.name]) {
      return (
        <GridColumn minWidth="98%" maxWidth="98%" minHeight={gridWidth}>
          <FileBrowser
            invert={invert}
            files={files}
            remoteFiles={remoteFiles ? remoteFiles.files : []}
            currentRemoteFolder={currentRemoteFolder || {}}
            switchToLocalFileBrowser={() => enableRemoteFileUpload(type.name, false)}
            loadRemoteFiles={(dataSource, folder) => {
              loadRemoteFiles(type.name, dataSource, folder);
            }}
            attachRemoteFile={(file) => {
              handleAttachRemoteFile(type, file);
            }}
          />
        </GridColumn>
      );
    }
    return (
      <GridColumn minWidth="98%" maxWidth="98%" minHeight={gridWidth}>
        <FileDropArea
          id={type.name}
          message="Drop one or more files to upload"
          invert={invert}
          multipleAllowed
          handleDroppedFiles={droppedFiles => handleDroppedFiles(type, droppedFiles)}
          switchToRemoteFileBrowser={() => enableRemoteFileUpload(type.name, true)}
        />
      </GridColumn>
    );
  }
  return '';
}

renderDropArea.propTypes = {
  invert: PropTypes.bool,
  editable: PropTypes.bool,
  remoteFileEnabledByType: PropTypes.object,
  handleDroppedFiles: PropTypes.func,
  enableRemoteFileUpload: PropTypes.func,
  handleAttachRemoteFile: PropTypes.func,
};

function renderFileCountInfo(count) {
  if (count === 1) {
    return '1 file uploaded';
  }
  return `${count} files uploaded`;
}

function renderTypes(files,
                     remoteFilesByType,
                     currentRemoteFolderByType,
                     loadRemoteFiles,
                     types,
                     props) {
  const filesByType = _.groupBy(_.values(files), 'typeName');
  return types.map(fileType => (
    <GridColumn key={fileType.name}>
      <Heading3 center invert>{fileType.display}s</Heading3>
      <Subheading3 center invert>
        {renderFileCountInfo(filesByType[fileType.name] ? filesByType[fileType.name].length : 0)}
      </Subheading3>
      <HorizontalGrid horizontalAlign="space-around">
        {renderFiles(filesByType[fileType.name], props)}
        {renderDropArea(
          fileType,
          filesByType[fileType.name],
          remoteFilesByType[fileType.name],
          currentRemoteFolderByType[fileType.name],
          loadRemoteFiles,
          props,
        )}
      </HorizontalGrid>
    </GridColumn>
  ));
}
// -----------------------------------------------------------------------------
// FileGridComponent
// -----------------------------------------------------------------------------


const FileGridComponent = ({
  files,
  remoteFilesByType,
  currentRemoteFolderByType,
  types,
  loadRemoteFiles,
  ...props
}) => {
  const sx = {};
  return (
    <div>
      <HorizontalGrid style={sx}>
        {renderTypes(
          files,
          remoteFilesByType,
          currentRemoteFolderByType,
          loadRemoteFiles,
          types,
          props
        )}
      </HorizontalGrid>
    </div>
  );
};

FileGridComponent.propTypes = {
  files: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      folder: PropTypes.string,
      size: PropTypes.number,
      type: PropTypes.string,
      progress: PropTypes.number,
    }),
  }),
  remoteFilesByType: PropTypes.object,
  currentRemoteFolderByType: PropTypes.object,
  types: PropTypes.arrayOf(PropTypes.instanceOf(FileType)),
  editable: PropTypes.bool,
  remoteFileEnabledByType: PropTypes.object,
  loadRemoteFiles: PropTypes.func,
  handleDroppedFiles: PropTypes.func,
  handleDeleteFile: PropTypes.func,
  handleAttachRemoteFile: PropTypes.func,
};

const FileGrid = radium(FileGridComponent);

export default FileGrid;
