import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import decorator from './decorator';
import { ActionBar } from '../components/uikit/action-bar';
import { Action } from '../components/uikit/action-bar-action';
import { Section, SecondarySection } from '../components/uikit/containers';

export default () => {
  storiesOf('Action Bar', module)
  .addDecorator(decorator)
  .add('default appearance', () => (
    <div>
      <Section>
        <ActionBar>
          <Action
            name="Yo"
            onAction={action('action clicked')}
            confirmation={{
              message: 'Are you sure?',
              okLabel: 'Absolutely',
              cancelLabel: 'Ah, nope',
            }}
          />
        </ActionBar>
      </Section>
      <SecondarySection>
        <ActionBar invert>
          <Action
            name="Settings"
            icon="act-cog"
            onAction={action('action clicked')}
          />
          <Action
            name="Clone"
            icon="act-clone"
            onAction={action('action clicked')}
            confirmation={{
              message: 'Are you sure?',
              okLabel: 'Absolutely',
              cancelLabel: 'Ah, nope',
            }}
          />
          <Action
            name="Delete"
            icon="act-trash"
            onAction={action('action clicked')}
            confirmation={{
              message: 'Are you sure?',
            }}
          />
        </ActionBar>
      </SecondarySection>
    </div>

  ));
};
