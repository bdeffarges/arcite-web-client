import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm, propTypes } from 'redux-form';

import { Section, SecondarySection, MediumCenteredBlock, LoadingBlock } from '../../components/uikit/containers';
import { Paper } from '../../components/uikit/paper';
import { ErrorBox } from '../../components/uikit/error';
import { Heading2, Subheading2 } from '../../components/uikit/typography';
import { DefaultButton, PrimaryButton, ButtonBar } from '../../components/uikit/buttons';

import * as actions from '../../actions/actions-experiments';
import * as formUtils from '../../utils/form-utils';

import { getExperimentById } from '../../reducers';

import hocAuthUser from '../hoc-auth-user';
import User from '../../model/user';

function handleCancel() {
  browserHistory.goBack();
}

const CloneExperimentContainer = ({
                                    sendingRequest,
                                    requestError,
                                    params: { uid },
                                    cloneExperiment,
                                    authUser,
                                    handleSubmit,
                                    submitting,
                                    invalid,
                                  }) =>
  (
    <div>
      <SecondarySection center>
        <Heading2>Clone Experiment</Heading2>
        <Subheading2 invert>Clone experiment in ARCITE</Subheading2>
      </SecondarySection>
      <Section>
        <MediumCenteredBlock>
          <LoadingBlock text="Cloning experiment... Please wait" visible={sendingRequest}>
            <Paper>
              <Heading2>Experiment Details</Heading2>
              <div>
                <form
                  onSubmit={
                    handleSubmit((values) => {
                      cloneExperiment(
                        uid,
                        values.experimentName,
                        values.experimentDescription,
                        authUser.username,
                        authUser.organization,
                        {
                          userRaw: values.cloneRawDataFiles,
                          userMeta: values.cloneRawMetaFiles,
                          expDesign: values.cloneDesign,
                          userProps: values.cloneProperties,
                          raw: values.cloneExternalFiles,
                        }
                      )
                        .then((json) => {
                          if (json.status === 201) {
                            browserHistory.push(`/experiments/${json.data.uid}`);
                          }
                        });
                    })}
                >
                  <Field name="experimentName" component={formUtils.renderTextField} label="Experiment Name" />
                  <Field name="experimentDescription" component={formUtils.renderTextArea} label="Description" />
                  <Field name="cloneRawDataFiles" component={formUtils.renderCheckbox} label="Include raw data files" />
                  <Field name="cloneRawMetaFiles" component={formUtils.renderCheckbox} label="Include meta files" />
                  <Field name="cloneExternalFiles" component={formUtils.renderCheckbox} label="Include files from server" />
                  <Field name="cloneDesign" component={formUtils.renderCheckbox} label="Include design" />
                  <Field name="cloneProperties" component={formUtils.renderCheckbox} label="Include properties" />
                  {requestError ? <ErrorBox error={requestError} m={[2, 0]} /> : ''}
                  <ButtonBar m={[12, 0, 0, 0]}>
                    <DefaultButton onClick={handleCancel}>Cancel</DefaultButton>
                    <PrimaryButton
                      type="submit"
                      disabled={submitting || sendingRequest || invalid}
                    >
                      Clone
                    </PrimaryButton>
                  </ButtonBar>
                </form>
              </div>
            </Paper>
          </LoadingBlock>
        </MediumCenteredBlock>
      </Section>
    </div>
  );

function validate(values) {
  const error = {};
  if (!values.experimentName) {
    error.experimentName = 'Please provide a name for the experiment';
  }
  if (!values.experimentName) {
    error.experimentDescription = 'Please provide a description for the experiment';
  }
  return error;
}

CloneExperimentContainer.propTypes = {
  ...propTypes,
  params: React.PropTypes.object,
  authUser: React.PropTypes.instanceOf(User),
};

function getInitialValues(experiment) {
  return {
    experimentName: experiment.title,
    experimentDescription: experiment.description,
    cloneRawDataFiles: true,
    cloneRawMetaFiles: true,
    cloneDesign: true,
    cloneProperties: true,
    cloneExternalFiles: true,
  };
}

function mapStateToProps(state, ownProps) {
  return {
    // TODO: Refactor and replace with a selector
    sendingRequest: state.experiments.isSaving,
    // TODO: Refactor and replace with a selector
    requestError: state.experiments.error,
    initialValues: getInitialValues(getExperimentById(state, ownProps.params.uid)),
  };
}

const connectedComp = connect(mapStateToProps, actions)(reduxForm({
  form: 'cloneExperiment',
  validate,
})(CloneExperimentContainer));

export default hocAuthUser(connectedComp);
