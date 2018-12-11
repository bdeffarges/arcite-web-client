import React, { Component } from 'react';
import radium from 'radium';

import styles from '../../styles';

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e, handleDroppedFiles, multipleAllowed) {
  e.preventDefault();
  e.stopPropagation();
  const dt = e.dataTransfer;
  if (multipleAllowed) {
    handleDroppedFiles(dt.files);
  } else {
    handleDroppedFiles(dt.files.item(0));
  }
}

class FileDropAreaComponent extends Component {
  render() {
    const {
      id,
      message,
      icon = 'act-arrow-circle-down fa-2x',
      handleDroppedFiles,
      switchToRemoteFileBrowser,
      multipleAllowed = false,
      invert,
    } = this.props;
    const baseColor = styles.getBaseColor(invert);
    const sx = {
      container: {
        position: 'relative',
        background: styles.alpha(baseColor)(1 / 8),
        border: `1px solid ${styles.alpha(baseColor)(1 / 4)}`,
        borderRadius: styles.variables.space.borderRadius,
        ...styles.getPadding(16),
        height: '100%',
        minHeight: '20rem',
        ':hover': {
          background: styles.alpha(baseColor)(1 / 4),
          border: `1px solid ${styles.alpha(baseColor)(1 / 2)}`,
        },
      },
      content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        width: '100%',
        textAlign: 'center',
      },
      icon: {
        ...styles.getFontSize(0),
        ...styles.getMargin([0, 0, 2, 0]),
        display: 'block',
        textAlign: 'center',
      },
      dropMessage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        message: {
          ...styles.getFontSize(4),
          ...styles.getLineHeight(16),
        },
        icon: {
          ...styles.getPadding([0, 2, 0, 0]),
        },
      },
      separator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...styles.getMargin([4, 0]),
        dash: {
          display: 'inline-block',
          height: '1px',
          background: styles.alpha(baseColor)(1 / 4),
          flex: 1,
          ...styles.getScaledProperty('maxWidth')(24),
        },
        text: {
          display: 'inline-block',
          color: styles.alpha(baseColor)(1 / 2),
          ...styles.getMargin([0, 4, 0, 4]),
        },
      },
      fileSelector: {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: -1,
      },
      fileSelectorLabel: {
        cursor: 'pointer',
        zIndex: 100,
        margin: '0rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'inline-block',
        color: styles.getBaseColor(true),
        background: styles.variables.color.secondaryColor,
        borderColor: 'rgba(0, 0, 0, 0.247059)',
        borderStyle: 'solid',
        borderWidth: '0.0625rem',
        borderRadius: '0.125rem',
        textTransform: 'uppercase',
        userSelect: 'none',
        touchAction: 'manipulation',
        whiteSpace: 'nowrap',
        transition: 'all 1350ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      },
    };
    return (
      <div
        style={sx.container}
        onDragOver={handleDragOver}
        onDrop={e => handleDrop(e, handleDroppedFiles, multipleAllowed)}
      >
        <div style={sx.content}>
          <div style={sx.dropMessage}>
            <i className={icon} style={sx.dropMessage.icon} />
            <span style={sx.dropMessage.text}>{message}</span>
          </div>
          <div style={sx.separator}>
            <span style={sx.separator.dash} />
            <span style={sx.separator.text}>OR</span>
            <span style={sx.separator.dash} />
          </div>
          <input
            ref={(el) => {
              this.fileInput = el;
            }}
            id={id}
            style={sx.fileSelector}
            type="file"
            multiple={multipleAllowed}
            onChange={() => {
              if (multipleAllowed) {
                handleDroppedFiles(this.fileInput.files);
              } else {
                handleDroppedFiles(this.fileInput.files.item(0));
              }
            }}
          />
          <label style={sx.fileSelectorLabel} htmlFor={id}>
            Select file{multipleAllowed ? 's' : ''}
          </label>
          <div style={sx.separator}>
            <span style={sx.separator.dash} />
            <span style={sx.separator.text}>OR</span>
            <span style={sx.separator.dash} />
          </div>
          <button style={sx.fileSelectorLabel} onClick={switchToRemoteFileBrowser}>
            Select file{multipleAllowed ? 's' : ''} from server
          </button>
        </div>
      </div>
    );
  }
}

FileDropAreaComponent.propTypes = {
  id: React.PropTypes.string.isRequired,
  message: React.PropTypes.string,
  icon: React.PropTypes.string,
  handleDroppedFiles: React.PropTypes.func,
  switchToRemoteFileBrowser: React.PropTypes.func,
  multipleAllowed: React.PropTypes.bool,
  invert: React.PropTypes.bool,
};

const FileDropArea = radium(FileDropAreaComponent);

export default FileDropArea;
