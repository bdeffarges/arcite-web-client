import React from 'react';
import radium from 'radium';
import _ from 'lodash';

import Transform from '../../model/transform';
import { ThinHeading3 } from '../uikit/typography';

import styles from '../../styles';

const TransformSummaryComponent = ({
  transform,
  m,
}) => {
  if (!transform) {
    return (<div />);
  }

  const sx = {
    container: {
      ...styles.getMargin(m),
    },
    title: {
      color: styles.variables.color.secondaryColor,
      ...styles.getMargin([0, 0, 2, 0]),
    },
    item: {
      display: 'flex',
      ...styles.getMargin([2, 0]),
      alignContent: 'stretch',
      name: {
        display: 'inline-block',
        ...styles.getScaledProperty('flexBasis')(24),
        flexGrow: 0,
        fontWeight: styles.variables.type.bold,
      },
      value: {
        display: 'inline-block',
        flex: 1,
      },
    },
  };
  return (
    <div style={sx.container}>
      <ThinHeading3>{_.upperFirst(transform.name)}</ThinHeading3>
      <div style={sx.item}>
        <span style={sx.item.name}>Description</span>
        <span style={sx.item.value}>{transform.description}</span>
      </div>
      <div style={sx.item}>
        <span style={sx.item.name}>Consumes</span>
        <span style={sx.item.value}>{transform.consumes}</span>
      </div>
      <div style={sx.item}>
        <span style={sx.item.name}>Produces</span>
        <span style={sx.item.value}>{transform.produces}</span>
      </div>
    </div>
  );
};

TransformSummaryComponent.propTypes = {
  transform: React.PropTypes.instanceOf(Transform),
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
};

const TransformSummary = radium(TransformSummaryComponent);

export default TransformSummary;
