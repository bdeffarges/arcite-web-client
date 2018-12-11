import React from 'react';
import radium from 'radium';
import _ from 'lodash';

import { reduxForm, Field, propTypes } from 'redux-form';

import * as formUtils from '../../utils/form-utils';
import Transform from '../../model/transform';
import Property from '../../model/property';
import { ThinHeading4 } from '../uikit/typography';
import { Paper } from '../uikit/paper';
import { PrimaryButton } from '../uikit/buttons';
import TransformSummary from './transform-summary';

import styles from '../../styles';

function renderParameterField(parameter) {
  const { type } = parameter;
  switch (type) {
    case 'INT_NUMBER':
    case 'FLOAT_NUMBER': {
      return (
        <Field
          key={parameter.key}
          name={parameter.formKey}
          component={formUtils.renderNumberField}
          label={`${parameter.name}`}
        />
      );
    }
    case 'PREDEFINED_VALUE': {
      const options = parameter.options.values.map(v => ({
        label: v,
        value: v,
      }));
      return (
        <Field
          key={parameter.key}
          name={parameter.formKey}
          component={formUtils.renderSelectField}
          label={`${parameter.name}`}
          options={options}
        />
      );
    }
    case 'FREE_TEXT': {
      return (
        <Field
          key={parameter.key}
          name={parameter.formKey}
          component={formUtils.renderTextArea}
          label={`${parameter.name}`}
        />
      );
    }
    default: {
      return '';
    }
  }
}

function renderSelectableCheckbox(selectable) {
  return (
    <Field
      key={selectable.name}
      name={selectable.name}
      component={formUtils.renderCheckbox}
      label={_.upperFirst(selectable.name)}
    />
  );
}

function renderParameterFields(transform) {
  if (!transform || !transform.parameters || !transform.parameters.length) {
    return '';
  }
  return (
    <div>
      <ThinHeading4>Transform settings</ThinHeading4>
      {transform.parameters.map(renderParameterField)}
    </div>
  );
}

function renderSelectableCheckboxes(transform, selectables) {
  if (!transform || !selectables.length) {
    return '';
  }
  return (
    <div>
      <ThinHeading4>Pass on from previous transform</ThinHeading4>
      {selectables.map(renderSelectableCheckbox)}
    </div>
  );
}

const TransformCreationFormComponent = ({
  transforms,
  selectables,
  selected,
  onApply,
  handleSubmit,
}) => {
  const sx = {
    header: {
      display: 'flex',

    },
    heading: {
      borderBottom: `1px solid ${styles.shade[0]}`,
      ...styles.getPadding([0, 0, 4, 0]),
      ...styles.getMargin([0, 0, 4, 0]),
      ...styles.getFontSize(3),
      fontWeight: styles.variables.type.bold,
    },
    subheading: {
      ...styles.getFontSize(4),
      ...styles.getPadding([2, 0, 0, 0]),
      color: styles.shade[2],
    },
    dropdown: {},
    label: {
      color: `${styles.shade[2]}`,
    },
    button: {
      ...styles.getMargin([4, 'auto']),
      width: '33%',
    },
  };
  if (!transforms || !transforms.length) {
    return <div />;
  }

  const transformOptions = transforms.map(transform => (
    {
      label: _.upperFirst(transform.name),
      value: transform.id,
    }
  ));
  const selectedTransform = _.find(transforms, { id: selected });
  return (
    <form onSubmit={handleSubmit(onApply)}>
      <Paper>
        <div style={sx.heading}>
          Select a transform to apply:
        </div>

        <div style={sx.content}>
          <Field
            name="transform"
            component={formUtils.renderSelectField}
            label="Transform"
            options={transformOptions}
          />
          <TransformSummary transform={selectedTransform} m={[8, 0]} />
          { renderParameterFields(selectedTransform) }
          { renderSelectableCheckboxes(selectedTransform, selectables) }
          <div style={sx.button}>
            <PrimaryButton size="large" block disabled={!selected}>Apply</PrimaryButton>
          </div>
        </div>
      </Paper>
    </form>
  );
};

TransformCreationFormComponent.propTypes = {
  ...propTypes,
  transforms: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Transform)),
  selectables: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Property)),
  selected: React.PropTypes.string,
  onApply: React.PropTypes.func.isRequired,
};

TransformCreationFormComponent.defaultProps = {
  selectables: [],
};

function validate() {
  return {};
}

const TransformCreationForm = reduxForm({
  form: 'transform-create',
  validate,
})(radium(TransformCreationFormComponent));

export default TransformCreationForm;
