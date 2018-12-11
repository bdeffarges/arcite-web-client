import React, { Component } from 'react';
import radium from 'radium';

import ArtifactLink from './artifact-link';
import { DefaultButton, SecondaryButton } from '../uikit/buttons';
import { TextField } from '../uikit/input';

import Artifact from '../../model/artifact';

import styles from '../../styles';

class ArtifactPublishBoxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      callback: undefined,
      global: 'unknown',
    };

    this.handlePublish = this.handlePublish.bind(this);
    this.handleCancelPublish = this.handleCancelPublish.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
  }

  handlePublish(global) {
    const { artifact, onPublish } = this.props;
    if (this.state.callback) {
      onPublish(artifact, this.state.comment, global);
      this.setState({
        callback: undefined,
        global: 'unknown',
        comment: '',
      });
    } else {
      this.setState({
        callback: onPublish,
        global: global ? 'global' : 'private',
      });
    }
  }

  handleCancelPublish() {
    this.setState({
      callback: undefined,
      global: 'unknown',
      comment: '',
    });
  }

  handleChangeComment(e) {
    const comment = e.target.value;
    this.setState({ comment });
  }

  render() {
    const { artifact, onUnpublish, first, last } = this.props;
    const sx = {
      container: {
        borderBottom: `1px solid ${styles.shade[1]}`,
        ...styles.getPadding([2, 0]),
      },
      item: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        '@media (min-width: 40rem)': {
          flexDirection: 'row',
        },
      },
      textField: {
        flex: 1,
      },
      buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        checkbox: {
          ...styles.getMargin([0, 1, 0, 2]),
        },
      },
    };

    const renderButton = () => {
      if (artifact.published) {
        return (
          <span style={sx.buttonContainer}>
            {
              this.state.global !== 'private' ?
                (
                  <DefaultButton
                    size="xsmall"
                    m={[0, 1]}
                    onClick={() => this.handlePublish(true)}
                  >
                    Publish
                    globally
                  </DefaultButton>
                )
                : undefined
            }
            {
              this.state.global !== 'global' ?
                (
                  <SecondaryButton
                    size="xsmall"
                    m={[0, 1]}
                    onClick={() => onUnpublish(artifact)}
                  >
                    Unpublish
                  </SecondaryButton>
                )
                : undefined
            }
          </span>
        );
      }
      return (
        <div style={sx.buttonContainer}>
          {
            this.state.global !== 'unknown' ?
              (
                <DefaultButton
                  size="xsmall"
                  color="#fff"
                  background={styles.variables.color.alertColor}
                  m={[0, 1]}
                  onClick={this.handleCancelPublish}
                >
                  Cancel
                </DefaultButton>
              )
              : undefined
          }
          {
            this.state.global !== 'private' ?
              (
                <DefaultButton
                  color="#fff"
                  background={styles.variables.color.primaryColor}
                  size="xsmall"
                  m={[0, 1]}
                  onClick={() => this.handlePublish(true)}
                >
                  Publish globally
                </DefaultButton>
              )
              : undefined
          }
          {
            this.state.global !== 'global' ?
              (
                <DefaultButton
                  color="#fff"
                  background={styles.variables.color.primaryColor}
                  size="xsmall"
                  m={[0, 1]}
                  onClick={() => this.handlePublish(false)}
                >
                  Publish
                </DefaultButton>
              )
              : undefined
          }
        </div>
      );
    };

    const renderContent = () => {
      if (!this.state.callback) {
        return (<ArtifactLink artifact={artifact} />);
      }
      return (
        <TextField
          style={sx.textField}
          name="comment"
          label="Comment"
          size="small"
          labelPosition="inline"
          value={this.state.comment}
          onChange={this.handleChangeComment}
        />
      );
    };

    const itemStyles = [sx.item];
    if (first) {
      itemStyles.push(sx.item.first);
    }
    if (last) {
      itemStyles.push(sx.item.last);
    }
    return (
      <li style={sx.container}>
        <div style={itemStyles}>
          {renderContent()}
          {renderButton()}
        </div>

      </li>);
  }
}

ArtifactPublishBoxComponent.propTypes = {
  artifact: React.PropTypes.instanceOf(Artifact),
  onPublish: React.PropTypes.func.isRequired,
  onUnpublish: React.PropTypes.func.isRequired,
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
};


const ArtifactPublishBox = radium(ArtifactPublishBoxComponent);

export default ArtifactPublishBox;
