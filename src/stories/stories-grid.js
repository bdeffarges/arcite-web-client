import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { HorizontalGrid, VerticalGrid, GridColumn, FullWidthGridColumn, Row } from '../components/uikit/grid';

const sx = {
  column: {
    background: '#AEAEAE',
    border: '1px solid rgba(0,0,0,0.2)',
  },
  container: {
    margin: '20px 0',
  },
};

export default () => {
  storiesOf('Grid', module)
  .addDecorator(decorator)
  .add('Basic Grid with responsive columns and 1:2:3 ratio', () => (
    <div>
      <HorizontalGrid>
        <GridColumn space={1} style={sx.column}>
          Column 1: Some text...
        </GridColumn>
        <GridColumn space={2} style={sx.column}>
          Column 2 Some text... and some more text to make this column higher than the
          other columns.
        </GridColumn>
        <GridColumn space={3} style={sx.column}>
          Column 3: Some text...
        </GridColumn>
      </HorizontalGrid>
    </div>
   ))
   .add('Columns with minimum width to force wrapping (200px, 100px, 300px)', () => (
     <div>
       <HorizontalGrid>
         <GridColumn minWidth="200px" style={sx.column}>
           Column 1: Some text...
         </GridColumn>
         <GridColumn minWidth="100px" space={2} style={sx.column}>
           Column 2 Some text... and some more text to make this column higher than the
           other columns.
         </GridColumn>
         <GridColumn minWidth="300px" space={3} style={sx.column}>
           Column 3: Some text...
         </GridColumn>
       </HorizontalGrid>
     </div>
  ))
  .add('Columns with maximum width - control the alignment', () => (
    <div>
      <div style={sx.container}>
        <HorizontalGrid>
          <GridColumn maxWidth="200px" style={sx.column}>
            Column 1: Some text...
          </GridColumn>
          <GridColumn maxWidth="100px" space={2} style={sx.column}>
            Column 2 Some text... and some more text to make this column higher than the
            other columns.
          </GridColumn>
          <GridColumn maxWidth="300px" space={3} style={sx.column}>
            Column 3: Some text...
          </GridColumn>
        </HorizontalGrid>
      </div>
      <div style={sx.container}>
        <HorizontalGrid horizontalAlign="space-between" >
          <GridColumn maxWidth="200px" style={sx.column}>
            Column 1: Some text...
          </GridColumn>
          <GridColumn maxWidth="100px" space={2} style={sx.column}>
            Column 2 Some text... and some more text to make this column higher than the
            other columns.
          </GridColumn>
          <GridColumn maxWidth="300px" space={3} style={sx.column}>
            Column 3: Some text...
          </GridColumn>
        </HorizontalGrid>
      </div>
      <div style={sx.container}>
        <HorizontalGrid horizontalAlign="space-around" >
          <GridColumn maxWidth="200px" style={sx.column}>
            Column 1: Some text...
          </GridColumn>
          <GridColumn maxWidth="100px" space={2} style={sx.column}>
            Column 2 Some text... and some more text to make this column higher than the
            other columns.
          </GridColumn>
          <GridColumn maxWidth="300px" space={3} style={sx.column}>
            Column 3: Some text...
          </GridColumn>
        </HorizontalGrid>
      </div>
    </div>
 ))
  .add('Multiple Rows', () => (
    <HorizontalGrid>
      <Row>
        <GridColumn minWidth="200px" style={sx.column}>
          Column 1: Some text...
        </GridColumn>
        <GridColumn minWidth="100px" space={2} style={sx.column}>
          Column 2 Some text... and some more text to make this column higher than the
          other columns.
        </GridColumn>
        <GridColumn minWidth="300px" space={3} style={sx.column}>
          Column 3: Some text...
        </GridColumn>
      </Row>
      <Row>
        <GridColumn minWidth="200px" style={sx.column}>
          Column 1: Some text...
        </GridColumn>
        <GridColumn minWidth="100px" space={2} style={sx.column}>
          Column 2 Some text... and some more text to make this column higher than the
          other columns.
        </GridColumn>
        <GridColumn minWidth="300px" space={3} style={sx.column}>
          Column 3: Some text...
        </GridColumn>
      </Row>
    </HorizontalGrid>
  ))
  .add('Grid in vertical direction', () => (
    <VerticalGrid horizontalAlign="center">
      <FullWidthGridColumn style={sx.column} maxWidth="200px">
        Column X: This is a simple column, but laid out vertically.
      </FullWidthGridColumn>
      <FullWidthGridColumn style={sx.column} width="100%">
        Column X: This is a simple column, but laid out vertically.
      </FullWidthGridColumn>
      <FullWidthGridColumn style={sx.column}>
        Column X: This is a simple column, but laid out vertically.
      </FullWidthGridColumn>
    </VerticalGrid>
  ));
};
