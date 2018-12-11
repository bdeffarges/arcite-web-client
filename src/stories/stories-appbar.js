import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { AppBar } from '../components/uikit/appbar';

export default () => {
  storiesOf('AppBar', module)
  .addDecorator(decorator)
  .add('standard behaviour', () => (
    <div>
      <AppBar />
    </div>
   ));
};
