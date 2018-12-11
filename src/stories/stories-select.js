import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { Dropdown, MultiSelect } from '../components/uikit/select';

const options = [
  { label: 'Cat', value: 'cat' },
  { label: 'Dog', value: 'dog' },
  { label: 'Chicken', value: 'chicken' },
  { label: 'Duck', value: 'duck' },
];

export default () => {
  storiesOf('Select', module)
  .addDecorator(decorator)
  .add('single select', () => (
    <div>
      <Dropdown name="select" options={options} />
    </div>
   ))
   .add('multi select', () => (
     <div>
       <MultiSelect name="select" options={options} />
     </div>
    ));
};
