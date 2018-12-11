import React from 'react';
import radium from 'radium';

import styles from '../../styles';

// -----------------------------------------------------------------------------
// Grid Component
// -----------------------------------------------------------------------------


const GridContainerComponent = ({
  children,
  gutter = styles.variables.space.gridGutter,
  horizontalAlign,
  verticalAlign,
  // mainAlign,
  direction,
  style,
  p = [0],
  ...props
}) => {
  const sx = {
    display: 'flex',
    flexDirection: direction || 'row',
    flexWrap: 'wrap',
    alignItems: direction === 'row' ? (verticalAlign || 'stretch') : (horizontalAlign || 'stretch'),
    justifyContent: direction === 'column' ? (verticalAlign || 'flex-start') : (horizontalAlign || 'flex-start'),
    ...styles.getMarginTop(-gutter),
    ...styles.getMarginLeft(-gutter),
    ...styles.getPadding(p),
  };
  return (
    <div {...props} style={[style, sx]}>
      {children}
    </div>
  );
};

GridContainerComponent.propTypes = {
  children: React.PropTypes.node,
  gutter: React.PropTypes.number,
  horizontalAlign: React.PropTypes.string,
  verticalAlign: React.PropTypes.string,
  style: React.PropTypes.object,
  // mainAlign: React.PropTypes.string,
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  direction: React.PropTypes.string,
};

const GridContainer = radium(GridContainerComponent);
const HorizontalGrid = props => (<GridContainer {...props} direction="row" />);
const VerticalGrid = props => (<GridContainer {...props} direction="column" />);
const Row = props => (<GridContainer {...props} gutter={0} />);

// -----------------------------------------------------------------------------
// Column component
// -----------------------------------------------------------------------------

const GridItemComponent = ({
  children,
  style,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  width,
  height,
  gutter = styles.variables.space.gridGutter,
  space = 1,
  ...props
}) => {
  const sx = {
    flexBasis: 0,
    flexGrow: space,
    flexShrink: space,
    boxSizing: 'borderBox',
    width: width || null,
    height: height || null,
    minWidth: minWidth || null,
    maxWidth: maxWidth || null,
    minHeight: minHeight || null,
    maxHeight: maxHeight || null,
    ...styles.getMarginTop(gutter),
    ...styles.getMarginLeft(gutter),
  };
  return (
    <div {...props} style={[sx, style]}>
      {children}
    </div>
  );
};

GridItemComponent.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  minWidth: React.PropTypes.string,
  maxWidth: React.PropTypes.string,
  minHeight: React.PropTypes.string,
  maxHeight: React.PropTypes.string,
  gutter: React.PropTypes.number,
  space: React.PropTypes.number,
};

const GridItem = radium(GridItemComponent);
const GridColumn = props => (<GridItem {...props} />);
const FullWidthGridColumn = props => (<GridItem {...props} width="100%" />);
const FullHeightGridColumn = props => (<GridItem {...props} height="100%" />);
const GridRow = props => (<GridItem {...props} />);


export {
  HorizontalGrid,
  VerticalGrid,
  Row,
  GridColumn,
  FullWidthGridColumn,
  FullHeightGridColumn,
  GridRow,
};
