import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { Section, SecondarySection, LargeCenteredBlock } from '../components/uikit/containers';
import { ProgressBar, ExtraSmallProgressBar, SmallProgressBar, LargeProgressBar } from '../components/uikit/progress';

export default () => {
  storiesOf('ProgressBar', module)
  .addDecorator(decorator)
  .add('in a box', () => (
    <div>
      <Section>
        <LargeCenteredBlock>
          <ProgressBar progress={0} m={[2, 'auto']} />
          <ProgressBar progress={20} m={[2, 'auto']} />
          <ProgressBar progress={40} m={[2, 'auto']} />
          <ProgressBar progress={60} m={[2, 'auto']} />
          <ProgressBar progress={80} m={[2, 'auto']} />
          <ProgressBar progress={100} m={[2, 'auto']} />
        </LargeCenteredBlock>
      </Section>
      <SecondarySection>
        <LargeCenteredBlock>
          <ProgressBar invert progress={0} m={[2, 'auto']} />
          <ProgressBar invert progress={20} m={[2, 'auto']} />
          <ProgressBar invert progress={40} m={[2, 'auto']} />
          <ProgressBar invert progress={60} m={[2, 'auto']} />
          <ProgressBar invert progress={80} m={[2, 'auto']} />
          <ProgressBar invert progress={100} m={[2, 'auto']} />
        </LargeCenteredBlock>
      </SecondarySection>
    </div>
  ))
  .add('with different sizes', () => (
    <SecondarySection>
      <LargeCenteredBlock>
        <ExtraSmallProgressBar invert progress={0} m={[2, 'auto']} />
        <SmallProgressBar invert progress={20} m={[2, 'auto']} />
        <ProgressBar invert progress={40} m={[2, 'auto']} />
        <LargeProgressBar invert progress={60} m={[2, 'auto']} />
      </LargeCenteredBlock>
    </SecondarySection>
  ));
};
