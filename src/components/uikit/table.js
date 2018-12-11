import React from 'react';
import radium from 'radium';

import styles from '../../styles';

// -----------------------------------------------------------------------------
// TableHeaderColumn
// -----------------------------------------------------------------------------
const TableHeaderColumnComponent = ({
  children,
  width,
  ...props
}) => {
  const sx = {
    textAlign: 'left',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    ...styles.getScaledProperty('width')(width),
  };
  return (
    <th {...props} style={sx}>
      {children}
    </th>
  );
};

TableHeaderColumnComponent.propTypes = {
  children: React.PropTypes.node,
  width: React.PropTypes.number,
};

const TableHeaderColumn = radium(TableHeaderColumnComponent);


// -----------------------------------------------------------------------------
// TableHeader
// -----------------------------------------------------------------------------
const TableHeaderComponent = ({
  children,
  size = 6,
  invert,
  ...props
}) => {
  const baseColor = styles.getBaseColor(invert);
  const sx = {
    borderBottom: '1px solid rgb(224, 224, 224)',
    display: 'tableHeader-group',
    verticalAlign: 'middle',
    color: styles.alpha(baseColor)(3 / 4),
    ...styles.getFontSize(size),
  };
  return (
    <thead {...props} style={sx}>
      {children}
    </thead>
  );
};

TableHeaderComponent.propTypes = {
  children: React.PropTypes.node,
  size: React.PropTypes.number,
  invert: React.PropTypes.bool,
};

const TableHeader = radium(TableHeaderComponent);

// -----------------------------------------------------------------------------
// TableRowColumn
// -----------------------------------------------------------------------------

const TableRowColumnComponent = ({
  children,
  ...props
}) => {
  const sx = {
  };
  return (
    <td {...props} style={sx}>
      {children}
    </td>
  );
};

TableRowColumnComponent.propTypes = {
  children: React.PropTypes.node,
};

const TableRowColumn = radium(TableRowColumnComponent);

// -----------------------------------------------------------------------------
// TableRow
// -----------------------------------------------------------------------------


const TableRowComponent = ({
  children,
  ...props
}) => {
  const sx = {
    borderBottom: '1px solid rgb(224, 224, 224)',
    ...styles.getScaledTypeProperty('height')(0),
    ...styles.getScaledTypeProperty('lineHeight')(0),
  };
  return (
    <tr {...props} style={sx}>
      {children}
    </tr>
  );
};

TableRowComponent.propTypes = {
  children: React.PropTypes.node,
};

const TableRow = radium(TableRowComponent);


// -----------------------------------------------------------------------------
// TableBody
// -----------------------------------------------------------------------------
const TableBodyComponent = ({
  children,
  ...props
}) => {
  const sx = {};
  return (
    <tbody {...props} style={sx}>
      {children}
    </tbody>
  );
};

TableBodyComponent.propTypes = {
  children: React.PropTypes.node,
};

const TableBody = radium(TableBodyComponent);

// -----------------------------------------------------------------------------
// TableFooter
// -----------------------------------------------------------------------------

const TableFooterComponent = ({
  children,
  size = 6,
  ...props
}) => {
  const sx = {
    color: styles.shade[2],
    ...styles.getFontSize(size),
  };
  return (
    <tfoot {...props} style={sx}>
      {children}
    </tfoot>
  );
};

TableFooterComponent.propTypes = {
  children: React.PropTypes.node,
  size: React.PropTypes.bool,
};

const TableFooter = radium(TableFooterComponent);


// -----------------------------------------------------------------------------
// Table
// -----------------------------------------------------------------------------
function getChildOfType(children, type) {
  for (const child of React.Children.toArray(children)) {
    if (child.type === type) {
      return child;
    }
  }
  return undefined;
}

function renderFixedHeader(children, sx, fixedHeader) {
  if (fixedHeader) {
    const child = getChildOfType(children, TableHeader);
    return (
      <div style={sx.middle}>
        <table style={sx.table}>
          {child}
        </table>
      </div>
    );
  }
  return '';
}

function renderFixedFooter(children, sx, fixedFooter) {
  if (fixedFooter) {
    const child = getChildOfType(children, TableFooter);
    return (
      <div style={sx.middle}>
        <table style={sx.table}>
          {child}
        </table>
      </div>
    );
  }
  return '';
}

function renderTable(children, sx, fixedHeader, fixedFooter) {
  const tableHeader = fixedHeader ? '' : getChildOfType(children, TableHeader);
  const tableFooter = fixedFooter ? '' : getChildOfType(children, TableFooter);
  const tableBody = getChildOfType(children, TableBody);
  return (
    <div style={sx.middle}>
      <table style={sx.table}>
        {tableHeader}
        {tableBody}
        {tableFooter}
      </table>
    </div>
  );
}

const TableComponent = ({
  children,
  height,
  fixedHeader,
  fixedFooter,
  size,
  invert,
  p = [0, 6],
}) => {
  const baseColor = styles.getBaseColor(invert);
  const sx = {
    outer: {
      height: height || 'auto',
      overflow: 'auto',
      color: baseColor,
    },
    middle: {
      height: 'auto',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    table: {
      width: '100%',
      ...styles.getPadding(p),
      borderCollapse: 'collapse',
      borderSpacing: '0px',
      tableLayout: 'fixed',
      ...styles.getFontSize(size),
    },
  };

  // let tableHeader;
  // let tableBody;
  // let tableFooter;
  // for (const child of React.Children.toArray(children)) {
  //   if (child.type === TableHeader) {
  //     tableHeader = child;
  //   }
  //   if (child.type === TableBody) {
  //     tableBody = child;
  //   }
  //   if (child.type === TableFooter) {
  //     tableFooter = child;
  //   }
  // }

  return (
    <div>
      {renderFixedHeader(children, sx, fixedHeader)}
      <div style={sx.outer}>
        {renderTable(children, sx, fixedHeader, fixedFooter)}
      </div>
      {renderFixedFooter(children, sx, fixedFooter)}
    </div>
  );
};

TableComponent.propTypes = {
  children: React.PropTypes.node,
  height: React.PropTypes.string,
  fixedHeader: React.PropTypes.bool,
  fixedFooter: React.PropTypes.bool,
  size: React.PropTypes.number,
  invert: React.PropTypes.bool,
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
};

const Table = radium(TableComponent);


export {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  TableFooter,
};
