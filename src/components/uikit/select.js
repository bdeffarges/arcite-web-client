import React, { Component } from 'react';
import radium from 'radium';
import { TextField } from './input';
import { Paper } from './paper';
import { FAIcon } from './icon';

import styles from '../../styles';
import outsideClick from './clickOutside';

const OptionItemComponent = ({
  label,
  selected,
  ...props
}) => {
  const sx = {
    label: {
      ...styles.getPadding(2),
      ...styles.getFontSize(5),
      ':hover': {
        backgroundColor: styles.shade[0],
      },
    },
    selected: {
      color: styles.variables.color.primaryColor,
    },
  };
  const selectedStyle = selected ? sx.selected : {};
  return (
    <div {...props} style={[sx.label, selectedStyle]}>{label}</div>
  );
};

OptionItemComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool,
};

const OptionItem = radium(OptionItemComponent);


// -----------------------------------------------------------------------------
// Select component
// -----------------------------------------------------------------------------

function getOptionComponents(options, onSelect) {
  return options.map(option => (
    <OptionItem
      key={option.value}
      label={option.label}
      value={option.value}
      selected={option.selected}
      onClick={() => onSelect(option.value)}
    />
  ));
}

function getSelectedValue(selection, options) {
  const labels = selection.filter(item => item !== '').map((item) => {
    const idx = options.findIndex(option => option.value === item);
    if (idx > -1) {
      return options[idx].label;
    }
    return undefined;
  })
  .filter(item => item);
  return labels.join(', ');
}

const SelectComponent = ({
  options,
  open,
  onOpen,
  onSelect,
  selection,
  ...props
}) => {
  const sx = {
    container: {
      position: 'relative',
    },
    input: {
    },
    options: {
      backgroundColor: styles.variables.type.baseBackgroundColor,
      listStyle: 'none',
      display: open ? 'block' : 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      // maxHeight: '12rem',
      // overflowY: 'scroll',
    },
    option: {
      ...styles.getPadding([2, 4]),
      ':hover': {
        backgroundColor: styles.shade[0],
        cursor: 'pointer',
      },
    },
  };

  const optionComponents = getOptionComponents(options, onSelect, sx.option);
  const selectedValue = getSelectedValue(selection, options);
  return (
    <div style={sx.container}>
      <TextField style={sx.input} {...props} readOnly value={selectedValue} cursor="pointer" onFocus={onOpen} icon={<FAIcon dimmed icon="act-caret-down" m={[0]} p={[0]} />} />
      <Paper m={1} p={0} style={sx.options}>
        {optionComponents}
      </Paper>
    </div>
  );
};

SelectComponent.propTypes = {
  children: React.PropTypes.node,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      selected: React.PropTypes.bool,
    })
  ),
  open: React.PropTypes.bool,
  onOpen: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  selection: React.PropTypes.arrayOf(React.PropTypes.string),
};

const Select = radium(SelectComponent);

// -----------------------------------------------------------------------------
// Dropdown HOC
// -----------------------------------------------------------------------------

class DropdownComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleOpen(e) {
    const newState = { ...this.state, open: true };
    this.setState(newState);
    e.stopPropagation();
  }

  handleClose() {
    const newState = { ...this.state, open: false };
    this.setState(newState);
  }

  handleSelect(value) {
    const idx = this.props.options.findIndex(option => option.value === value);
    this.props.onSelect(idx, value);
    const newState = { ...this.state, open: false };
    this.setState(newState);
  }

  render() {
    const { options, selection } = this.props;
    const optionsExt = options.map((option) => {
      const idx = selection.findIndex(e => e === option.value);
      return { ...option, selected: idx >= 0 };
    });

    const SelectHOC = outsideClick(Select, this.handleClose);
    return (
      <SelectHOC
        {...this.props}
        options={optionsExt}
        open={this.state.open}
        onOpen={this.handleOpen}
        selection={this.props.selection}
        onSelect={this.handleSelect}
      />
    );
  }
}

DropdownComponent.defaultProps = {
  selection: [],
};

DropdownComponent.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func,
  selection: React.PropTypes.arrayOf(React.PropTypes.string),
};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const Dropdown = props => <DropdownComponent {...props} />;
export const MultiSelect = props => <DropdownComponent {...props} multiple />;
