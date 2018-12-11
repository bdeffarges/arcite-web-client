import React from 'react';
import radium from 'radium';
import _ from 'lodash';

import Sample from '../../model/sample';
import styles from '../../styles';

function renderConditions(sample, style, highlight) {
  const sx = {
    label: {
      display: 'inline-block',
      minWidth: '33%',
      ...styles.getFontSize(6),
      ...styles.getPaddingLeft(2),
      borderLeft: 'none',
    },
    value: {
      display: 'inline-block',
      ...styles.getFontSize(5),
    },
    odd: {
      backgroundColor: styles.alpha('white')(1 / 4),
    },
    bold: {
      borderLeft: '4px solid white',
    },
  };
  return _.sortBy(_.values(sample.conditions), condition => condition.name)
    .map((condition, idx) => {
      const container = [style];
      const label = [sx.label];
      if (idx % 2 === 1) {
        container.push(sx.odd);
      }
      if (highlight.indexOf(condition.name) > -1) {
        label.push(sx.bold);
      }
      return (
        <div style={container} key={condition.name}>
          <span style={label}>{condition.name}</span>
          <span style={sx.value}>{condition.value}</span>
        </div>
      );
    }
  );
}

const SampleGridItemComponent = ({
  sample,
  title,
  color,
  highlightConditions,
  invert,
}) => {
  const padding = [4, 4];
  const baseColor = styles.getBaseColor(invert);
  const backgroundColor = color || baseColor;
  const textColor = 'white';
  const sx = {
    container: {
      color: textColor,
      backgroundColor,
      borderRadius: styles.variables.space.borderRadius,
      ...styles.getBoxShadow(0),
      height: '100%',
      transition: styles.getStandardTransition(),
      ':hover': {
        ...styles.getBoxShadow(1),
      },
    },
    title: {
      ...styles.getFontSize(3),
      ...styles.getLineHeight(3),
      backgroundColor: styles.shade[1],
      ...styles.getPadding(padding),
      verticalAlign: 'middle',
      icon: {
        display: 'inline-block',
        verticalAlign: 'middle',
        ...styles.getPadding([1, 0, 0, 0]),
      },
      text: {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
    },
    item: {
      flex: 1,
      width: '100%',
      ...styles.getPadding([0, padding[1]]),
    },
  };
  return (
    <div style={sx.container}>
      <div style={sx.title}>
        <i style={sx.title.icon} className="act-tube" />
        <span style={sx.title.text}>{title}</span>
      </div>
      <div style={sx.body}>
        {renderConditions(sample, sx.item, highlightConditions)}
      </div>
    </div>
  );
};

SampleGridItemComponent.propTypes = {
  sample: React.PropTypes.instanceOf(Sample),
  title: React.PropTypes.string,
  color: React.PropTypes.string,
  highlightConditions: React.PropTypes.arrayOf(React.PropTypes.string),
  invert: React.PropTypes.bool,
};

const SampleGridItem = radium(SampleGridItemComponent);

export default SampleGridItem;
