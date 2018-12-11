import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import Checkbox from '../components/uikit/checkbox';


export default () => {
  storiesOf('Checkbox', module)
    .addDecorator(decorator)
    .add('simple checkbox', () => (
      <div>
        <Checkbox>Unchecked example</Checkbox>
        <Checkbox checked>Checked example</Checkbox>
      </div>
    ));
};
