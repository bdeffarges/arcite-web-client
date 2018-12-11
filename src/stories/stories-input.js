import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { TextField, PasswordField, NumberField, TextArea } from '../components/uikit/input';
import { FAIcon } from '../components/uikit/icon';

export default () => {
  storiesOf('Input', module)
  .addDecorator(decorator)
  .add('field types', () => (
    <div>
      <TextField name="Simple Text" label="Simple Text" placeholder="Enter your text" m={[4]} />
      <PasswordField name="Password" label="Password" placeholder="Password" m={[4]} />
      <NumberField name="Number" label="Number" placeholder="number" m={[4]} />
      <TextArea name="TextArea" label="Text Area" placeholder="your text" m={[4]} rows={10} />
    </div>
   ))
   .add('with different label position', () => (
     <div>
       <TextField name="Label above (default)" label="Label above" labelPosition="above" placeholder="Enter your text" m={[4]} />
       <TextField name="Label inline" label="Label inline" labelPosition="inline" placeholder="Enter your text" m={[4]} />
     </div>
    ))
    .add('with block or inline fields', () => (
      <div>
        <TextField name="fieldOneBlock" label="Field One (Block)" display="block" placeholder="Enter your text" m={[4]} />
        <TextField name="fieldTwoBlock" label="Field Two (Block)" display="block" placeholder="Enter your text" m={[4]} />
        <TextField name="fieldOneInline" label="Field One (Inline)" display="inline" placeholder="Enter your text" m={[4]} />
        <TextField name="fieldTowInline" label="Field Two (Inline)" display="inline" placeholder="Enter your text" m={[4]} />
      </div>
    ))
    .add('with defined width for inline fields', () => (
      <div>
        <TextField name="fieldOneInline" label="Field One (400px)" display="inline" fieldWidth="400px" placeholder="Enter your text" m={[4]} />
        <TextField name="fieldTowInline" label="Field Two (200px)" display="inline" fieldWidth="200px" placeholder="Enter your text" m={[4]} />
        <TextField name="fieldTowInline" label="Field Three (400px)" display="inline" fieldWidth="400px" placeholder="Enter your text" m={[4]} />
      </div>
    ))
    .add('with defined width for labels', () => (
      <div>
        <TextField name="fieldOneInline" label="Field One" labelPosition="inline" labelWidth="150px" placeholder="Enter your text" m={[4]} />
        <TextField name="fieldTowInline" label="Field Two" labelPosition="inline" labelWidth="150px" placeholder="Enter your text" m={[4]} />
        <TextField name="fieldTowInline" label="Field Three" labelPosition="inline" labelWidth="150px" placeholder="Enter your text" m={[4]} />
      </div>
    ))
    .add('with different sizes', () => (
      <div>
        <TextField name="small" label="Field One (small)" size="small" labelPosition="inline" placeholder="Enter your text" m={[4]} />
        <TextField name="normal" label="Field Two (normal)" size="normal" labelPosition="inline" placeholder="Enter your text" m={[4]} />
        <TextField name="large" label="Field Three (large)" size="large" labelPosition="inline" placeholder="Enter your text" m={[4]} />
      </div>
    ))
    .add('with icon', () => (
      <div>
        <TextField name="username" label="Username" size="normal" labelPosition="inline" labelWidth="150px" icon={<FAIcon icon="fa-user" />} m={[4]} />
        <TextField name="email" label="Email" size="normal" labelPosition="inline" labelWidth="150px" icon={<FAIcon icon="fa-envelope" />} m={[4]} />
        <TextField name="password" label="Password" size="normal" labelPosition="inline" labelWidth="150px" icon={<FAIcon icon="fa-lock" />} m={[4]} />
      </div>
    ))
    .add('with error message', () => (
      <div>
        <TextField name="username" size="small" label="Username" labelPosition="inline" labelWidth="150px" icon={<FAIcon icon="fa-user" />} m={[4]} error="Please enter a user name" />
        <TextField name="username" size="small" label="Username" labelPosition="above" icon={<FAIcon icon="fa-user" />} m={[4]} error="Please enter a user name" />
        <TextField name="username" size="normal" label="Username" labelPosition="inline" labelWidth="150px" icon={<FAIcon icon="fa-user" />} m={[4]} error="Please enter a user name" />
        <TextField name="username" size="normal" label="Username" labelPosition="above" icon={<FAIcon icon="fa-user" />} m={[4]} error="Please enter a user name" />
        <TextField name="username" size="large" label="Username" labelPosition="inline" labelWidth="150px" icon={<FAIcon icon="fa-user" />} m={[4]} error="Please enter a user name" />
        <TextField name="username" size="large" label="Username" labelPosition="above" icon={<FAIcon icon="fa-user" />} m={[4]} error="Please enter a user name" />
      </div>
    ));
};
