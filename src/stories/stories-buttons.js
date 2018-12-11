import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import {
  DefaultButton,
  PrimaryButton,
  SecondaryButton,
  AlertButton,
  DefaultRoundButton,
  PrimaryRoundButton,
  SecondaryRoundButton,
  AlertRoundButton,
} from '../components/uikit/buttons';
import { Heading2, Heading3 } from '../components/uikit/typography';

const sx = {
  blockContainer: {
    width: '50%',
    maxWidth: '400px',
    margin: '0 auto',
  },
};

export default () => {
  storiesOf('Buttons', module)
  .addDecorator(decorator)
  .add('Button Overview', () => (
    <div>
      <Heading2>Button Overview</Heading2>
      <div>
        <DefaultButton>Default</DefaultButton>&nbsp;
        <PrimaryButton>Primary</PrimaryButton>&nbsp;
        <SecondaryButton>Secondary</SecondaryButton>&nbsp;
        <AlertButton>Alert</AlertButton>
      </div>
    </div>
   ))
   .add('Outline Buttons', () => (
     <div>
       <Heading2>Outline Buttons</Heading2>
       <div>
         <DefaultButton outline>Default</DefaultButton>&nbsp;
         <PrimaryButton outline>Primary</PrimaryButton>&nbsp;
         <SecondaryButton outline>Secondary</SecondaryButton>&nbsp;
         <AlertButton outline>Alert</AlertButton>
       </div>
     </div>
  ))
   .add('Block Buttons', () => (
     <div>
       <Heading2 block>Block Buttons</Heading2>
       <div style={sx.blockContainer}>
         <DefaultButton block>Default</DefaultButton>&nbsp;
         <PrimaryButton block>Primary</PrimaryButton>&nbsp;
         <SecondaryButton block>Secondary</SecondaryButton>&nbsp;
         <AlertButton block>Alert</AlertButton>
       </div>
     </div>
   ))
   .add('Disabled Buttons', () => (
     <div>
       <Heading2>Disabled Buttons</Heading2>
       <div>
         <DefaultButton disabled>Default</DefaultButton>&nbsp;
         <PrimaryButton disabled>Primary</PrimaryButton>&nbsp;
         <SecondaryButton disabled>Secondary</SecondaryButton>&nbsp;
         <AlertButton disabled>Alert</AlertButton>
       </div>
     </div>
  ))
  .add('Button Sizes', () => (
    <div>
      <Heading2>Button Sizes</Heading2>
      <Heading3>Small</Heading3>
      <div>
        <DefaultButton size="small">Default</DefaultButton>&nbsp;
        <PrimaryButton size="small">Primary</PrimaryButton>&nbsp;
        <SecondaryButton size="small">Secondary</SecondaryButton>&nbsp;
        <AlertButton size="small">Alert</AlertButton>
      </div>
      <Heading3>Normal</Heading3>
      <div>
        <DefaultButton>Default</DefaultButton>&nbsp;
        <PrimaryButton>Primary</PrimaryButton>&nbsp;
        <SecondaryButton>Secondary</SecondaryButton>&nbsp;
        <AlertButton>Alert</AlertButton>
      </div>

      <Heading3>Large</Heading3>
      <div>
        <DefaultButton size="large">Default</DefaultButton>&nbsp;
        <PrimaryButton size="large">Primary</PrimaryButton>&nbsp;
        <SecondaryButton size="large">Secondary</SecondaryButton>&nbsp;
        <AlertButton size="large">Alert</AlertButton>
      </div>
    </div>
  ))
  .add('round buttons', () => (
    <div>
      <Heading2>Button Sizes</Heading2>
      <Heading3>Small</Heading3>
      <div>
        <DefaultRoundButton icon="act-user-2" size="small" />&nbsp;
        <PrimaryRoundButton icon="act-user-2" size="small" />&nbsp;
        <SecondaryRoundButton icon="act-user-2" size="small" />&nbsp;
        <AlertRoundButton icon="act-user-2" size="small" />
      </div>
      <Heading3>Normal</Heading3>
      <div>
        <DefaultRoundButton icon="act-user-2" />&nbsp;
        <PrimaryRoundButton icon="act-user-2" />&nbsp;
        <SecondaryRoundButton icon="act-user-2" />&nbsp;
        <AlertRoundButton icon="act-user-2" />
      </div>
      <Heading3>Large</Heading3>
      <div>
        <DefaultRoundButton icon="act-user-2" size="large" />&nbsp;
        <PrimaryRoundButton icon="act-user-2" size="large" />&nbsp;
        <SecondaryRoundButton icon="act-user-2" size="large" />&nbsp;
        <AlertRoundButton icon="act-user-2" size="large" />
      </div>
    </div>
  ));
};
