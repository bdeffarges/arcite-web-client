import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { LargeCenteredBlock } from '../components/uikit/containers';
import { Heading2 } from '../components/uikit/typography';
import { DefaultButton, ButtonBar } from '../components/uikit/buttons';
import { Paper } from '../components/uikit/paper';
import { DefaultConfirmationBox, IconConfirmationBox } from '../components/uikit/confirmation';

export default () => {
  storiesOf('Confirmation', module)
  .addDecorator(decorator)
  .add('in a box', () => (
    <div>
      <LargeCenteredBlock>
        <Paper>
          <Heading2>A box</Heading2>
          <ButtonBar>
            <DefaultButton>Action</DefaultButton>
          </ButtonBar>
          <DefaultConfirmationBox message="Are you sure?" />
        </Paper>
      </LargeCenteredBlock>
    </div>
  ))
  .add('in a box with icons', () => (
    <div>
      <LargeCenteredBlock>
        <Paper>
          <Heading2>A box</Heading2>
          <ButtonBar>
            <DefaultButton>Action</DefaultButton>
          </ButtonBar>
          <IconConfirmationBox message="Are you sure?" okLabel="Yes" cancelLabel="No" />
        </Paper>
      </LargeCenteredBlock>
    </div>
  ))
  .add('collapsed', () => (
    <div>
      <LargeCenteredBlock>
        <Paper>
          <Heading2>A box</Heading2>
          <ButtonBar>
            <DefaultButton>Action</DefaultButton>
          </ButtonBar>
          <IconConfirmationBox message="Are you sure?" okLabel="Yes" cancelLabel="No" collapsed />
        </Paper>
      </LargeCenteredBlock>
    </div>
  ));
};
