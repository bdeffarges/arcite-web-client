import React from 'react';

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import * as actions from '../actions/actions-auth';
import * as formUtils from '../utils/form-utils';

import { Section, SecondarySection, MediumCenteredBlock, LoadingBlock } from '../components/uikit/containers';
import { Paper } from '../components/uikit/paper';
import { DefaultButton, PrimaryButton, ButtonBar } from '../components/uikit/buttons';
import { Heading2, Subheading2 } from '../components/uikit/typography';
import { ErrorBox } from '../components/uikit/error';

function validate(values) {
  const error = {};
  if (!values.username) {
    error.username = 'Please provide your username';
  }
  if (!values.password) {
    error.password = 'Please provide your password';
  }
  return error;
}

function handleCancel() {
  browserHistory.goBack();
}

const Login = ({
  sendingRequest,
  requestError,
  loginUser,
  handleSubmit,
  pristine,
  submitting,
  invalid,
  from,
}) => (
  <div>
    <SecondarySection center>
      <Heading2>Login</Heading2>
      <Subheading2 invert>Login to ARCITE to get full access to all features</Subheading2>
    </SecondarySection>
    <Section>
      <MediumCenteredBlock>
        <LoadingBlock text="Loggin in... Please wait" visible={sendingRequest}>
          <Paper>
            <form
              onSubmit={handleSubmit((values) => {
                loginUser(values).then(() => {
                  if (from) {
                    browserHistory.push(from);
                  } else {
                    browserHistory.push('/browse');
                  }
                }).catch();
              })}
            >
              <Heading2>Login</Heading2>
              <Field name="username" component={formUtils.renderTextField} label="Username" />
              <Field name="password" component={formUtils.renderPasswordField} label="Password" type="password" />
              {requestError ? <ErrorBox error={requestError} m={[2, 0]} /> : ''}
              <ButtonBar m={[12, 0, 0, 0]}>
                <DefaultButton type="reset" onClick={handleCancel}>Cancel</DefaultButton>
                <PrimaryButton type="submit" disabled={pristine || submitting || sendingRequest || invalid}>Login</PrimaryButton>
              </ButtonBar>
            </form>
          </Paper>
        </LoadingBlock>
      </MediumCenteredBlock>
    </Section>
  </div>

);

Login.propTypes = {
  ...propTypes,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    sendingRequest: state.auth.loggingIn,
    requestError: state.auth.error,
    from: state.routing.locationBeforeTransitions.query.from,
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'login',
  validate,
})(Login));

// export default connect(null, actions)(Login);
