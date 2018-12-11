import React from 'react';
import radium from 'radium';

import { Field, reduxForm, propTypes } from 'redux-form';

import * as formUtils from '../../utils/form-utils';
import { Section, SecondarySection, MediumCenteredBlock, LoadingBlock } from '../uikit/containers';
import { Heading2, Subheading2 } from '../uikit/typography';
import { Paper } from '../uikit/paper';
import { PrimaryButton, DefaultButton, ButtonBar } from '../uikit/buttons';
import { ErrorBox } from '../uikit/error';

const ExperimentCreationFormComponent = ({
  options,
  handleSubmit,
  onSubmit,
  onCancel,
  requestError,
  pristine,
  submitting,
  invalid,
  sendingRequest,
}) => ((
  <div>
    <SecondarySection center>
      <Heading2>Create Experiment</Heading2>
      <Subheading2 invert>Add a new experiment to ARCITE</Subheading2>
    </SecondarySection>
    <Section>
      <MediumCenteredBlock>
        <LoadingBlock text="Creating experiment... Please wait" visible={sendingRequest}>
          <Paper>
            <Heading2>Experiment Details</Heading2>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Field name="experimentName" component={formUtils.renderTextField} label="Experiment Name" />
                <Field name="description" component={formUtils.renderTextArea} label="Description" rows={4} />
                <Field name="type" component={formUtils.renderSelectField} label="Type" options={options} />
                {requestError ? <ErrorBox error={requestError} m={[2, 0]} /> : ''}
                <ButtonBar m={[12, 0, 0, 0]}>
                  <DefaultButton onClick={onCancel}>Cancel</DefaultButton>
                  <PrimaryButton type="submit" disabled={pristine || submitting || sendingRequest || invalid} >Create</PrimaryButton>
                </ButtonBar>
              </form>
            </div>
          </Paper>
        </LoadingBlock>
      </MediumCenteredBlock>
    </Section>
  </div>
));

function validate(values) {
  const error = {};
  if (!values.experimentName) {
    error.experimentName = 'Please provide a name for the experiment';
  }
  if (!values.description) {
    error.description = 'Please provide a description for the experiment';
  }
  if (!values.description) {
    error.description = 'Please provide a description for the experiment';
  }
  if (!values.type) {
    error.type = 'Please select the type of the experiment';
  }
  return error;
}

ExperimentCreationFormComponent.propTypes = {
  ...propTypes,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
  })),
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export const ExperimentCreationForm = reduxForm({
  form: 'createExperiment',
  validate,
})(radium(ExperimentCreationFormComponent));

export default {
  ExperimentCreationForm,
};
