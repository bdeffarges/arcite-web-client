
import React from 'react';
import radium from 'radium';

import styles from '../../styles';

import { default as ExperimentModel } from '../../model/experiment';

import ExperimentHeader from './experiment-header';
import { HorizontalGrid, VerticalGrid, GridColumn } from '../uikit/grid';


// -----------------------------------------------------------------------------
// ExperimentListItem
// -----------------------------------------------------------------------------

const ExperimentListItemComponent = ({
  experiment,
  m = 2,
  onClick,
  ...props
}) => {
  const sx = {
    container: {
      ...styles.getMargin(m),
    },
    title: {
      ...styles.getFontSize(6),
      ...styles.getLineHeight(5),
      fontWeight: styles.variables.type.bold,
      color: styles.variables.color.secondaryColor,
      cursor: onClick ? 'pointer' : null,
    },
    organization: {
      display: 'inline-block',
    },
    date: {
      float: 'right',
      display: 'inline-block',
      '@media (max-width: 25rem)': {
        float: 'none',
        display: 'block',
      },
    },

    header: {
      borderBottom: `1px solid ${styles.shade[1]}`,
      ...styles.getFontSize(7),
      ...styles.getLineHeight(7),
    },
  };
  return (
    <div style={sx.container}>
      <HorizontalGrid {...props} verticalAlign="center" gutter={1}>
        <GridColumn space={0} gutter={1} style={sx.icon}>
          <ExperimentHeader type={experiment.type} size={1} align="center" />
        </GridColumn>
        <GridColumn gutter={1}>
          <VerticalGrid gutter={0}>
            <GridColumn style={sx.header} gutter={0}>
              <div style={sx.organization}>{experiment.user} at {experiment.organization}</div>
              <div style={sx.date}>{experiment.lastUpdate}</div>
            </GridColumn>
            <GridColumn
              gutter={0}
              style={sx.title}
              onClick={onClick}
            >
              {experiment.title}
            </GridColumn>
          </VerticalGrid>
        </GridColumn>
      </HorizontalGrid>
    </div>
  );
};

ExperimentListItemComponent.propTypes = {
  experiment: React.PropTypes.instanceOf(ExperimentModel).isRequired,
  m: React.PropTypes.arrayOf(React.PropTypes.number),
  onClick: React.PropTypes.func,
};

const ExperimentListItem = radium(ExperimentListItemComponent);

export default ExperimentListItem;
