import React from 'react';
import radium from 'radium';

import { PrimaryButton, DefaultButton } from './buttons';
import styles from '../../styles';

const ConfirmationBoxComponent = ({
  message,
  okLabel,
  cancelLabel,
  onOk,
  onCancel,
  border = [true, false, false, false],
  collapsed,
  ...props
}) => {
  const sx = {
    container: {
      display: collapsed ? 'none' : 'flex',
      overflow: 'hidden',
      alignContent: 'stretch',
      ...styles.getMargin([4, 0, 0, 0]),
      ...styles.getPadding([2, 0, 0, 0]),
      borderTop: border[0] ? `1px solid ${styles.shade[0]}` : null,
      borderRight: border[1] ? `1px solid ${styles.shade[0]}` : null,
      borderBottom: border[2] ? `1px solid ${styles.shade[0]}` : null,
      borderLeft: border[3] ? `1px solid ${styles.shade[0]}` : null,
    },
    text: {
      flex: 1,
      ...styles.getFontSize(6),
      textAlign: 'right',
      alignSelf: 'center',
    },
    button: {
      flexBasis: 'content',
      flexGrow: 0,
      ...styles.getMarginLeft(2),
    },

  };
  return (
    <div {...props} style={sx.container}>
      <span style={sx.text}>{message}</span>
      <span style={sx.button}>
        <DefaultButton size="small" p={[1, 2]} m={0} onClick={onCancel}>{cancelLabel}</DefaultButton>
      </span>
      <span style={sx.button}>
        <PrimaryButton size="small" p={[1, 2]} m={0} onClick={onOk}>{okLabel}</PrimaryButton>
      </span>
    </div>
  );
};

ConfirmationBoxComponent.propTypes = {
  message: React.PropTypes.string,
  okLabel: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
  cancelLabel: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
  border: React.PropTypes.arrayOf(React.PropTypes.bool),
  collapsed: React.PropTypes.bool,
  onOk: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

const ConfirmationBox = radium(ConfirmationBoxComponent);
const DefaultConfirmationBox = props => (
  <ConfirmationBox
    {...props}
    okLabel="Yes"
    cancelLabel="No"
  />
);
const IconConfirmationBox = props => (
  <ConfirmationBox
    {...props}
    okLabel={<i className="act-checkmark" />}
    cancelLabel={<i className="act-undo" />}
  />
);

// -----------------------------------------------------------------------------
// ConfirmationButtons
// -----------------------------------------------------------------------------
const ConfirmationButtonsComponent = ({
  okLabel = 'Ok',
  cancelLabel = 'Cancel',
  size,
  onOk,
  onCancel,
}) => (
  <div>
    <DefaultButton size={size} m={[0, 2, 0, 0]} onClick={onCancel}>{cancelLabel}</DefaultButton>
    <PrimaryButton size={size} onClick={onOk}>{okLabel}</PrimaryButton>
  </div>
);


ConfirmationButtonsComponent.propTypes = {
  okLabel: React.PropTypes.string,
  cancelLabel: React.PropTypes.string,
  onOk: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  size: React.PropTypes.string,
};

const ConfirmationButtons = radium(ConfirmationButtonsComponent);


export {
  ConfirmationBox,
  DefaultConfirmationBox,
  IconConfirmationBox,
  ConfirmationButtons,
};
