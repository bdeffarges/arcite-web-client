import React from 'react';
import PropTypes from 'prop-types';

import radium from 'radium';

import Design from '../../model/design';

import { LeadText } from '../uikit/typography';
import { PrimaryButton } from '../uikit/buttons';
import { Dropdown } from '../uikit/select';
import { SampleGrid } from './sample-grid';
import { getPalette } from '../../utils/color_utils';

import styles from '../../styles';

const palettes = {};

function createOptions(values) {
  const options = values.map(value => (
    {
      label: value,
      value,
    }
  ));

  return [{ label: 'None', value: '' }, ...options];
}

function colorByCondition(design, sample, condition) {
  const values = design.getConditionValues(condition);
  if (!palettes[condition]) {
    palettes[condition] = getPalette(values.length);
  }
  const sampleCondition = sample.getCondition(condition);
  const value = sampleCondition ? sampleCondition.value : undefined;
  if (value) {
    const idx = values.indexOf(value);
    return palettes[condition][idx].hex();
  }
  return styles.variables.color.secondaryColor;
}

const DesignViewComponent = ({
                               design,
                               colorBy,
                               sortBy,
                               onSortBy,
                               onColorBy,
                               onClear,
                               ...props
                             }) => {
  const sx = {
    header: {
      display: 'flex',
      content: {
        flex: 1,
      },
    },
    filters: {
      display: 'flex',
      flexDirection: 'row',
      '@media (max-width: 48rem)': {
        flexDirection: 'column',
      },
      ...styles.getMarginBottom(4),
    },
    filter: {
      flex: 1,
      ...styles.getMargin([0, 4, 0, 0]),
      '@media (max-width: 48rem)': {
        ...styles.getMargin([0, 0, 4, 0]),
      },
      last: {
        ...styles.getMargin([0, 0, 0, 0]),
        '@media (max-width: 48rem)': {
          ...styles.getMargin([0, 0, 0, 0]),
        },
      },
    },
  };
  // console.log(design);
  if (!design) {
    return <div />;
  }
  const options = createOptions(design.getConditionNames());
  const highlightConditions = [];
  if (colorBy) {
    highlightConditions.push(colorBy);
  }
  if (sortBy) {
    highlightConditions.push(sortBy);
  }
  return (
    <div {...props} style={sx}>
      <div style={sx.header}>
        <div style={sx.header.content}>
          <LeadText>
            {design.description}
          </LeadText>
        </div>
        <div style={sx.button}>
          <PrimaryButton onClick={onClear}>Clear Design</PrimaryButton>
        </div>
      </div>

      <div style={sx.filters}>
        <div style={sx.filter}>
          <Dropdown
            label="Color by"
            name="selectColor"
            options={options}
            selection={colorBy ? [colorBy] : []}
            onSelect={idx => onColorBy(options[idx].value)}
          />
        </div>
        <div style={[sx.filter, sx.filter.last]}>
          <Dropdown
            label="Sort by"
            name="selectSort"
            options={options}
            selection={sortBy ? [sortBy] : []}
            onSelect={idx => onSortBy(options[idx].value)}
          />
        </div>
      </div>
      <SampleGrid
        samples={design.samples}
        colorBy={sample => colorByCondition(design, sample, colorBy)}
        sortBy={sortBy}
        highlightConditions={highlightConditions}
      />
    </div>
  );
};

DesignViewComponent.propTypes = {
  design: PropTypes.instanceOf(Design),
  colorBy: PropTypes.string,
  sortBy: PropTypes.string,
  onSortBy: PropTypes.func.isRequired,
  onColorBy: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

const DesignView = radium(DesignViewComponent);

export default DesignView;
