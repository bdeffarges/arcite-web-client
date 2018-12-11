import React, { Component } from 'react';
import radium from 'radium';


import FileDropArea from '../file/file-drop-area';
import FileGridItem from '../file/file-grid-item';
import { TextField } from '../uikit/input';
import { PrimaryButton } from '../uikit/buttons';
import { getDesignFromCSV } from '../../utils/csv-utils';

import styles from '../../styles';

const FileItem = ({ file, handleDelete }) => (
  <FileGridItem
    file={file}
    handleDelete={handleDelete}
  />
);

FileItem.propTypes = {
  file: React.PropTypes.object,
  handleDelete: React.PropTypes.func.isRequired,
};
class MyFileUploadFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: undefined,
      file: undefined,
      design: undefined,
    };

    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleReadFile = this.handleReadFile.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
    this.handleUploadDesign = this.handleUploadDesign.bind(this);
  }

  handleChangeDescription(e) {
    this.setState({
      ...this.state,
      description: e.target.value,
    });
  }

  handleReadFile(file) {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          const design = getDesignFromCSV(fileReader.result);
          this.setState({ ...this.state, design, file });
        }
      };

      fileReader.readAsText(file);
    } else {
      this.handleDeleteFile();
    }
  }

  handleDeleteFile() {
    this.setState({ ...this.state, file: undefined, design: undefined });
  }

  handleUploadDesign() {
    const { uploadDesign } = this.props;
    const design = this.state.design;
    design.description = this.state.description;
    uploadDesign(design);
  }

  render() {
    const sx = {
      container: {
        display: 'flex',
        flexDirection: 'column',
      },
      row: {
        ...styles.getMargin(4, 0),
      },
      button: {
        alignSelf: 'center',
      },
    };
    return (
      <div style={sx.container}>
        <div style={sx.row}>
          <TextField name="description" value={this.state.description} label="Description" multiline rows={3} onChange={this.handleChangeDescription} />
        </div>
        <div style={sx.row}>
          { this.state.file ?
            (<FileItem file={this.state.file} handleDelete={this.handleDeleteFile} />) :
            (<FileDropArea
              id="design"
              message="Drop CSV file with your samples."
              handleDroppedFiles={file => this.handleReadFile(file)}
            />)
          }
        </div>
        <div style={[sx.row, sx.button]}>
          <PrimaryButton
            disabled={!this.state.description || !this.state.design}
            onClick={this.handleUploadDesign}
          >
            Upload design
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

MyFileUploadFormComponent.propTypes = {
  uploadDesign: React.PropTypes.func,
};

const FileUploadFormComponent = radium(MyFileUploadFormComponent);

export default FileUploadFormComponent;
