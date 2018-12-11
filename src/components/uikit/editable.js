import React from 'react';
import radium from 'radium';

import { PrimaryRoundButton } from './buttons';
import { ConfirmationButtons } from './confirmation';


const EditableComponent = ({
  children,
  isEdit,
  editIcon = 'act-pencil',
  onEditStart,
  onEditRevert,
  onEditCommit,
}) => {
  const sx = {
    container: {},
    view: {
      display: isEdit ? 'none' : 'flex',
      flexDirection: 'column',
      component: {},
    },
    edit: {
      display: !isEdit ? 'none' : 'flex',
      flexDirection: 'column',
    },
    buttons: {
      alignSelf: 'flex-end',
    },
  };
  return (
    <div style={sx.container}>
      <div style={sx.view}>
        <div style={sx.view.component}>
          {React.Children.toArray(children)[0]}
        </div>
        <div style={sx.buttons}>
          <PrimaryRoundButton icon={editIcon} onClick={onEditStart} />
        </div>
      </div>
      <div style={sx.edit}>
        <div style={sx.edit.component}>
          {React.Children.toArray(children)[1]}
        </div>
        <div style={sx.buttons}>
          <ConfirmationButtons okLabel="Save" cancelLabel="Revert" onOk={onEditCommit} onCancel={onEditRevert} />
        </div>
      </div>
    </div>
  );
};

EditableComponent.propTypes = {
  children: React.PropTypes.node,
  isEdit: React.PropTypes.bool,
  editIcon: React.PropTypes.string,
  onEditStart: React.PropTypes.func.isRequired,
  onEditRevert: React.PropTypes.func.isRequired,
  onEditCommit: React.PropTypes.func.isRequired,
};

export const Editable = radium(EditableComponent);

export default {
  Editable,
};
