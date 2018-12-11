import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { PanelComponent } from '../components/uikit/panel';
import { HorizontalGrid, GridColumn } from '../components/uikit/grid';

export default () => {
  storiesOf('Panel', module)
  .addDecorator(decorator)
  .add('default appearance', () => (
    <div>
      <PanelComponent title="Admin Panel" subtitle="can have a subtitle" m={[4]}>
        <p>This is the content</p>
      </PanelComponent>
    </div>
  ))
  .add('can be closable', () => (
    <div>
      <PanelComponent title="Admin Panel" subtitle="can have a subtitle" m={[4]} closable>
        <p>This is the content</p>
      </PanelComponent>
    </div>
  ))
  .add('can be collapsable', () => (
    <div>
      <HorizontalGrid>
        <GridColumn minWidth="250px">
          <PanelComponent title="Admin Panel" m={[4, 2]} collapsable>
            <p>This is the content</p>
          </PanelComponent>
        </GridColumn>
        <GridColumn minWidth="250px">
          <PanelComponent height="500px" title="Admin Panel" subtitle="collapsed" m={[4, 2]} collapsable collapsed>
            <p>
              This is the content, This is the content, This is the content, This is the content,
              This is the content, This is the content, This is the content.
            </p>
          </PanelComponent>
        </GridColumn>
        <GridColumn minWidth="250px">
          <PanelComponent title="Admin Panel" subtitle="More content" m={[4, 2]} collapsable>
            <p>
              This is the content, This is the content, This is the content, This is the content,
              This is the content, This is the content, This is the content.
            </p>
          </PanelComponent>
        </GridColumn>
      </HorizontalGrid>
    </div>
  ))
  .add('or closable and collapsable', () => (
    <div>
      <HorizontalGrid>
        <GridColumn minWidth="250px">
          <PanelComponent title="Admin Panel" m={[4, 2]} collapsable closable>
            <p>This is the content</p>
          </PanelComponent>
        </GridColumn>
        <GridColumn minWidth="250px">
          <PanelComponent height="500px" title="Admin Panel" subtitle="collapsed" m={[4, 2]} collapsable closable collapsed>
            <p>
              This is the content, This is the content, This is the content, This is the content,
              This is the content, This is the content, This is the content.
            </p>
          </PanelComponent>
        </GridColumn>
        <GridColumn minWidth="250px">
          <PanelComponent title="Admin Panel" subtitle="More content" m={[4, 2]} collapsable closable>
            <p>
              This is the content, This is the content, This is the content, This is the content,
              This is the content, This is the content, This is the content.
            </p>
          </PanelComponent>
        </GridColumn>
      </HorizontalGrid>
    </div>
  ))
  .add('can have an icon', () => (
    <div>
      <PanelComponent icon="act-cog" title="Admin Panel" subtitle="can have a subtitle" m={[4]}>
        <p>This is the content</p>
      </PanelComponent>
    </div>
  ));
};
