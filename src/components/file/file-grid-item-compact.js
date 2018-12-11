import React, { Component } from 'react';
import radium from 'radium';

import { DefaultHumbleButton } from '../uikit/buttons';
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
      return (
        <DefaultHumbleButton invert={invert} icon="act-trash" onClick={() => this.showConfirmation(handleDelete)} />);
    }
    return '';
  }

  renderDeleteConfirmation() {
    if (this.state.showConfirmation) {
      const sx = {
        buttons: {
          ...styles.getMargin(1),
          ...styles.getPadding(1),
          borderTop: `1px solid ${styles.alpha('white')(1 / 2)}`,
        },
      };
      return (
        <div>
          <div style={sx.title}>
            <ConfirmationButtons
              size="xsmall"
              okLabel="Yes"
              cancelLabel="No"
              onOk={this.handleDeleteOk}
              onCancel={this.handleDeleteCancel}
            />
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
        position: 'relative',
        ...styles.getFontSize(6),
        background: styles.alpha(baseColor)(1 / 8),
        border: `1px solid ${styles.alpha(baseColor)(1 / 4)}`,
        borderRadius: styles.variables.space.borderRadius,
        ...styles.getPadding(2),
        height: '100%',
        ':hover': {
          background: styles.alpha(baseColor)(1 / 4),
          border: `1px solid ${styles.alpha(baseColor)(1 / 2)}`,
        },

      },
      info: {
        display: 'inline-block',
        ...styles.getMargin([0, 4, 0, 0]),
        whiteSpace: 'nowrap',
        width: '100%', /* IE6 needs any width */
        overflow: 'hidden', /* "overflow" value must be different from  visible"*/
        textOverflow: 'ellipsis', /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
      },
      buttons: {
        display: 'inline-block',
        position: 'absolute',
        right: 5,
        top: 6,
      },
    };

    return (
      <div style={sx.container}>
        <div style={sx.info}>{file.name} - {file.size}</div>
        <div style={sx.buttons}>{this.renderDeleteButton()}{this.renderDeleteConfirmation()}</div>
        <SmallProgressBar progress={file.progress} />
      </div>
    );
  }
}

FileGridItemComponent.propTypes = {
  file: React.PropTypes.object.isRequired,
  handleDelete: React.PropTypes.func,
  invert: React.PropTypes.bool,
};

const FileGridItem = radium(FileGridItemComponent);

export default FileGridItem;
