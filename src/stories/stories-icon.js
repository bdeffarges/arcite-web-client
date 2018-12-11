import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { DefaultFAIcon, PrimaryFAIcon, SecondaryFAIcon, AlertFAIcon } from '../components/uikit/icon';

export default () => {
  storiesOf('Icon', module)
  .addDecorator(decorator)
  .add('from font-awesome', () => (
    <div>
      <DefaultFAIcon icon="fa-search" />
      <DefaultFAIcon icon="fa-music" />
      <DefaultFAIcon icon="fa-user" />
      <DefaultFAIcon icon="fa-envelope" />
      <DefaultFAIcon icon="fa-star" />
      <DefaultFAIcon icon="fa-star-o" />
      <DefaultFAIcon icon="fa-trash" />
    </div>
   ))
   .add('color variations', () => (
     <div>
       <DefaultFAIcon icon="fa-envelope" />
       <PrimaryFAIcon icon="fa-envelope" />
       <SecondaryFAIcon icon="fa-envelope" />
       <AlertFAIcon icon="fa-envelope" />
       <DefaultFAIcon dimmed icon="fa-envelope" />
       <PrimaryFAIcon dimmed icon="fa-envelope" />
       <SecondaryFAIcon dimmed icon="fa-envelope" />
       <AlertFAIcon dimmed icon="fa-envelope" />
     </div>
    ))
    .add('with label', () => (
      <div>
        <DefaultFAIcon icon="fa-envelope" label="Label below" labelPosition="below" block m={[2]} p={[2]} />
        <DefaultFAIcon icon="fa-envelope" label="Label right" labelPosition="right" block m={[2]} p={[2]} />
        <DefaultFAIcon icon="fa-envelope" label="Label above" labelPosition="above" block m={[2]} p={[2]} />
        <DefaultFAIcon icon="fa-envelope" label="Label left" labelPosition="left" block m={[2]} p={[2]} />
      </div>
     ))
    .add('size variations', () => (
      <div>
        <DefaultFAIcon icon="fa-envelope" size={0} />
        <DefaultFAIcon icon="fa-envelope" size={1} />
        <DefaultFAIcon icon="fa-envelope" size={2} />
        <DefaultFAIcon icon="fa-envelope" size={3} />
        <DefaultFAIcon icon="fa-envelope" size={4} />
        <DefaultFAIcon icon="fa-envelope" size={5} />
        <DefaultFAIcon icon="fa-envelope" size={6} />
      </div>
     ))
   ;
};
