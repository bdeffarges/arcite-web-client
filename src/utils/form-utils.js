import React from 'react';
import { default as TextFieldUI } from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { TextField, NumberField, PasswordField, TextArea } from '../components/uikit/input';
import Checkbox from '../components/uikit/checkbox';
import { Dropdown } from '../components/uikit/select';

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    value={input.value}
    name={label}
    label={label}
    error={touched ? error : ''}
    {...input}
    {...custom}
  />
);

renderTextField.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};

export const renderNumberField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <NumberField
    value={input.value}
    name={label}
    label={label}
    error={touched ? error : ''}
    {...input}
    {...custom}
  />
);

renderNumberField.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};

export const renderPasswordField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <PasswordField
    name={label}
    label={label}
    error={touched ? error : ''}
    {...input}
    {...custom}
  />
);

renderPasswordField.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};

export const renderTextArea = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextArea
    name={label}
    label={label}
    error={touched ? error : ''}
    {...input}
    {...custom}
  />
);

renderTextArea.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};

export const renderSelectField = ({
  input, label, meta: { touched, error }, options, ...custom
}) => (
  <Dropdown
    name={label}
    label={label}
    selection={[input.value]}
    error={touched ? error : ''}
    options={options}
    onSelect={(idx, value) => input.onChange(value)}
    {...input}
    {...custom}
  />
);

renderSelectField.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
  })).isRequired,
};

export const renderCheckbox = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Checkbox
    error={touched ? error : ''}
    checked={!!input.value}
    {...input}
    {...custom}
  >{label}</Checkbox>
  );

renderCheckbox.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};


export const renderTextFieldMUI = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextFieldUI
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth
    {...input}
    {...custom}
  />
);

renderTextFieldMUI.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
};

export const renderSelectFieldMUI = ({
  input, label, meta: { touched, error }, children, ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    // eslint-disable-next-line
    children={children}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    {...custom}
  />
);

renderSelectFieldMUI.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
  children: React.PropTypes.arrayOf(React.PropTypes.node),
};
