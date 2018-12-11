import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, TableFooter } from '../components/uikit/table';

function rows(n) {
  const result = [];
  for (let i = 0; i < n; i += 1) {
    result.push(
      <TableRow>
        <TableRowColumn>Column 1</TableRowColumn>
        <TableRowColumn>Column 2</TableRowColumn>
        <TableRowColumn>Column 3</TableRowColumn>
        <TableRowColumn>Column 4</TableRowColumn>
      </TableRow>
    );
  }
  return result;
}
export default () => {
  storiesOf('Table', module)
  .addDecorator(decorator)
  .add('default appearance', () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Header 1</TableHeaderColumn>
          <TableHeaderColumn>Header 2</TableHeaderColumn>
          <TableHeaderColumn>Header 3</TableHeaderColumn>
          <TableHeaderColumn>Header 4</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows(100)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableRowColumn>Footer 1</TableRowColumn>
          <TableRowColumn>Footer 2</TableRowColumn>
          <TableRowColumn>Footer 3</TableRowColumn>
          <TableRowColumn>Footer 4</TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>
  ))
  .add('can have a fixed size', () => (
    <Table height="300px">
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Header 1</TableHeaderColumn>
          <TableHeaderColumn>Header 2</TableHeaderColumn>
          <TableHeaderColumn>Header 3</TableHeaderColumn>
          <TableHeaderColumn>Header 4</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows(100)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableRowColumn>Footer 1</TableRowColumn>
          <TableRowColumn>Footer 2</TableRowColumn>
          <TableRowColumn>Footer 3</TableRowColumn>
          <TableRowColumn>Footer 4</TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>
  ))
  .add('can have a fixed header and footer', () => (
    <Table height="300px" fixedHeader fixedFooter>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Header 1</TableHeaderColumn>
          <TableHeaderColumn>Header 2</TableHeaderColumn>
          <TableHeaderColumn>Header 3</TableHeaderColumn>
          <TableHeaderColumn>Header 4</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows(100)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableRowColumn>Footer 1</TableRowColumn>
          <TableRowColumn>Footer 2</TableRowColumn>
          <TableRowColumn>Footer 3</TableRowColumn>
          <TableRowColumn>Footer 4</TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>
  ));
};
