import React, { Component } from 'react';
import radium from 'radium';

import { DefaultHumbleButton } from '../uikit/buttons';
import { DefaultFAIcon } from '../uikit/icon';
import { SmallProgressBar } from '../uikit/progress';
import { ConfirmationButtons } from '../uikit/confirmation';

import styles from '../../styles';


class FileGridItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      deleteCallback: undefined,
    };

    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.renderDeleteConfirmation = this.renderDeleteConfirmation.bind(this);
    this.showConfirmation = this.showConfirmation.bind(this);
    this.handleDeleteOk = this.handleDeleteOk.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
  }

  handleDeleteOk() {
    this.state.deleteCallback();
    const newState = {
      ...this.state,
      showConfirmation: false,
      deleteCallback: undefined,
    };
    this.setState(newState);
  }

  handleDeleteCancel() {
    const newState = {
      ...this.state,
      showConfirmation: false,
      deleteCallback: undefined,
    };
    this.setState(newState);
  }
  showConfirmation(deleteCallback) {
    const newState = {
      ...this.state,
      showConfirmation: true,
      deleteCallback,
    };
    this.setState(newState);
  }

  renderDeleteButton() {
    const { handleDelete, invert } = this.props;
    if (handleDelete && !this.state.showConfirmation) {
      return (<DefaultHumbleButton invert={invert} icon="act-trash" onClick={() => this.showConfirmation(handleDelete)} />);
    }
    return '';
  }

  renderDeleteConfirmation() {
    if (this.state.showConfirmation) {
      const sx = {
        buttons: {
          ...styles.getMargin([4, 0, 0, 0]),
          ...styles.getPadding([4, 0, 0, 0]),
          borderTop: `1px solid ${styles.alpha('white')(1 / 2)}`,
        },
      };
      return (
        <div>
          <div style={sx.title}>
            Delete file?
          </div>
          <div style={sx.buttons}>
            <ConfirmationButtons okLabel="Yes" cancelLabel="No" onOk={this.handleDeleteOk} onCancel={this.handleDeleteCancel} />
          </div>
        </div>
      );
    }
    return '';
  }

  render() {
    const {
      file,
      invert,
    } = this.props;
    const baseColor = styles.getBaseColor(invert);
    const sx = {
      container: {
        background: styles.alpha(baseColor)(1 / 8),
        border: `1px solid ${styles.alpha(baseColor)(1 / 4)}`,
        borderRadius: styles.variables.space.borderRadius,
        ...styles.getPadding(8),
        height: '100%',
        ':hover': {
          background: styles.alpha(baseColor)(1 / 4),
          border: `1px solid ${styles.alpha(baseColor)(1 / 2)}`,
        },
        textAlign: 'center',
      },
      icon: {
        display: 'block',
      },
      title: {
        ...styles.getFontSize(4),
      },
      info: {
        ...styles.getFontSize(6),
        ...styles.getLineHeight(6),
        verticalAlign: 'middle',
      },

    };

    return (
      <div style={sx.container}>
        <span style={sx.icon}>
          <DefaultFAIcon icon="act-file-text" color={baseColor} size={0} />
        </span>
        <div style={sx.title}>
          {file.name}
        </div>
        { file.folder ?
          (
            <div style={sx.info}>
              <i className="act-folder-open" /> {file.folder}
            </div>
          ) :
          (
            <div />
          )
        }
        <div style={sx.info}>
          <i className="act-gift" /> {file.size}
        </div>
        <SmallProgressBar progress={file.progress} />
        <div>
          <div>
            {this.renderDeleteButton()}
          </div>
          <div>
            {this.renderDeleteConfirmation()}
          </div>
        </div>
      </div>
    );
  }
}

FileGridItemComponent.propTypes = {
  file: React.PropTypes.object,
  handleDelete: React.PropTypes.func,
  invert: React.PropTypes.bool,
};

const FileGridItem = radium(FileGridItemComponent);

export default FileGridItem;
