import React, { Component } from 'react';
import radium from 'radium';
import _ from 'lodash';

import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from '../uikit/table';
import { PrimaryRoundButton, DefaultHumbleButton } from '../uikit/buttons';
import { ConfirmationButtons } from '../uikit/confirmation';
import { TextField } from '../uikit/input';

import styles from '../../styles';

// -----------------------------------------------------------------------------
// Delete Button
// -----------------------------------------------------------------------------
const DeleteButton = ({ onClick }) => (
  <DefaultHumbleButton invert icon="act-trash" onClick={onClick} />
);

DeleteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

// -----------------------------------------------------------------------------
// PropertyNameInput
// -----------------------------------------------------------------------------
const PropertyNameInput = ({ property, lastField, handleUpdateProperty }) => {
  const input = (<TextField
    name="propName"
    value={property.name}
    error={property.error}
    onChange={e => handleUpdateProperty(property.id, e.target.value, property.value)}
    m={[2, 4, 2, 0]}
    autoFocus={lastField}
  />);
  return input;
};

PropertyNameInput.propTypes = {
  property: React.PropTypes.object,
  lastField: React.PropTypes.bool,
  handleUpdateProperty: React.PropTypes.func,
};

// -----------------------------------------------------------------------------
// PropertyValueInput
// -----------------------------------------------------------------------------
const PropertyValueInput = ({ property, lastField, handleEditCommand, handleUpdateProperty }) => (
  <TextField
    name="propValue"
    value={property.value}
    onChange={e => handleUpdateProperty(property.id, property.name, e.target.value)}
    m={[2, 0, 2, 0]}
    onKeyDown={lastField ? handleEditCommand : null}
  />
);

PropertyValueInput.propTypes = {
  property: React.PropTypes.object,
  lastField: React.PropTypes.bool,
  handleEditCommand: React.PropTypes.func,
  handleUpdateProperty: React.PropTypes.func,
};

// -----------------------------------------------------------------------------
// PropertyNameField
// -----------------------------------------------------------------------------
const PropertyNameField = ({ property, handleUpdateProperty, lastField }) => {
  if (property.persisted) {
    return (<span>{property.name}</span>);
  }
  return (
    <PropertyNameInput
      property={property}
      lastField={lastField}
      handleUpdateProperty={handleUpdateProperty}
    />
  );
};

PropertyNameField.propTypes = {
  property: React.PropTypes.object,
  handleUpdateProperty: React.PropTypes.func.isRequired,
  lastField: React.PropTypes.bool,
};
// -----------------------------------------------------------------------------
// PorpertyValueField
// -----------------------------------------------------------------------------
const PropertyValueField = ({ property, handleEditCommand, handleUpdateProperty, lastField }) => {
  if (property.persisted) {
    return (<span>{property.value}</span>);
  }
  return (
    <PropertyValueInput
      property={property}
      lastField={lastField}
      handleEditCommand={handleEditCommand}
      handleUpdateProperty={handleUpdateProperty}
    />
  );
};

PropertyValueField.propTypes = {
  property: React.PropTypes.object,
  handleEditCommand: React.PropTypes.func.isRequired,
  handleUpdateProperty: React.PropTypes.func.isRequired,
  lastField: React.PropTypes.bool,
};

// -----------------------------------------------------------------------------
// PropertyTableComponent
// -----------------------------------------------------------------------------


function renderEditButton(show, onClick) {
  if (show) {
    return (<PrimaryRoundButton icon="act-plus-2" onClick={onClick} />);
  }
  return '';
}

function getNewProperties(properties) {
  return _.values(properties).filter(prop => !prop.persisted);
}

class PropertyTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      append: false,
    };

    this.handleShowAppend = this.handleShowAppend.bind(this);
    this.handleEditCommand = this.handleEditCommand.bind(this);
    this.addEmptyProperty = this.addEmptyProperty.bind(this);
    this.handleUpdateProperty = this.handleUpdateProperty.bind(this);
    this.handleSaveProperties = this.handleSaveProperties.bind(this);
    this.handleClearNewProperties = this.handleClearNewProperties.bind(this);
    this.renderPropertyRows = this.renderPropertyRows.bind(this);
    this.renderConfirmationBar = this.renderConfirmationBar.bind(this);
  }

  handleShowAppend() {
    this.addEmptyProperty(this.props);
  }

  handleEditCommand(e) {
    if (e.key === 'Tab' && !e.shiftKey) {
      this.addEmptyProperty(this.props);
      e.preventDefault();
    }
  }

  addEmptyProperty() {
    const { properties } = this.props;
    const idx = (_.keys(properties)).length;
    this.props.addNewProperty(`Property ${idx + 1}`, 'value');
  }

  handleUpdateProperty(id, name, value) {
    this.props.updateNewProperty(id, name, value);
  }

  handleSaveProperties() {
    const { properties, addPropertiesToExperiment } = this.props;
    addPropertiesToExperiment(properties);
  }

  handleClearNewProperties() {
    const { clearNewProperties } = this.props;
    clearNewProperties();
  }

  handleRemoveProperty(property) {
    if (property.persisted) {
      this.props.removePropertyFromExperiment(property.name);
    } else {
      this.props.removeNewProperty(property.id);
    }
  }

  renderPropertyRow(property, lastField) {
    return (
      <TableRow key={property.id}>
        <TableRowColumn>
          <DeleteButton onClick={() => this.handleRemoveProperty(property)} />
        </TableRowColumn>
        <TableRowColumn>
          <PropertyNameField
            property={property}
            lastField={lastField}
            handleUpdateProperty={this.handleUpdateProperty}
          />
        </TableRowColumn>
        <TableRowColumn>
          <PropertyValueField
            property={property}
            lastField={lastField}
            handleEditCommand={this.handleEditCommand}
            handleUpdateProperty={this.handleUpdateProperty}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
  renderPropertyRows() {
    const { properties } = this.props;
    const propCount = _.values(properties).length;
    return _.values(properties)
      .map((property, idx) =>
        this.renderPropertyRow(property, idx === (propCount - 1)));
  }

  renderConfirmationBar(sx) {
    const { properties } = this.props;
    const newPropCount = getNewProperties(properties).length;
    if (newPropCount) {
      return (
        <div style={sx.confirmationBar}>
          <ConfirmationButtons okLabel="Save" cancelLabel="Revert" onOk={this.handleSaveProperties} onCancel={this.handleClearNewProperties} />
        </div>
      );
    }
    return '';
  }

  render() {
    const {
      editable,
      invert,
    } = this.props;

    const sx = {
      container: {
        display: 'flex',
        alignItems: 'flex-end',
      },
      table: {
        flex: 1,
        ...styles.getMargin([0, 4, 0, 0]),
      },
      actionBar: {
        ...styles.getScaledProperty('flexBasis')(12),
        flexGrow: 0,
        flexShrink: 0,
        ...styles.getMargin([0, 0, 1, 0]),
      },
      confirmationBar: {
        display: 'flex',
        justifyContent: 'flex-end',
        ...styles.getMargin([2, 16, 0, 0]),
      },
    };

    return (
      <div>
        <div style={sx.container}>
          <div style={sx.table}>
            <Table {...this.props} invert={invert}>
              <TableHeader invert={invert}>
                <TableRow>
                  <TableHeaderColumn width={6} />
                  <TableHeaderColumn>Property</TableHeaderColumn>
                  <TableHeaderColumn>Value</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.renderPropertyRows()}
              </TableBody>
            </Table>
          </div>
          <div style={sx.actionBar}>
            {renderEditButton((editable && !this.state.append), this.handleShowAppend)}
          </div>
        </div>
        {this.renderConfirmationBar(sx)}
      </div>
    );
  }
}

PropertyTableComponent.propTypes = {
  properties: React.PropTypes.object.isRequired,
  addNewProperty: React.PropTypes.func.isRequired,
  updateNewProperty: React.PropTypes.func.isRequired,
  removeNewProperty: React.PropTypes.func.isRequired,
  clearNewProperties: React.PropTypes.func.isRequired,
  addPropertiesToExperiment: React.PropTypes.func.isRequired,
  removePropertyFromExperiment: React.PropTypes.func.isRequired,
  editable: React.PropTypes.bool,
  invert: React.PropTypes.bool,
};

const PropertyTable = radium(PropertyTableComponent);


export default PropertyTable;
