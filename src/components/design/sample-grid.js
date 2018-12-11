import React from 'react';
import radium from 'radium';
import _ from 'lodash';

import Sample from '../../model/sample';
import { HorizontalGrid, GridColumn } from '../uikit/grid';
import SampleGridItem from './sample-grid-item';

function renderSampleItems(data, style) {
  let samples = _.values(data.samples).map((sample, idx) => (
    {
      sample,
      title: `Sample ${idx + 1}`,
    }
  ));
  if (data.sortBy) {
    samples = _.sortBy(
      samples,
      (sample) => {
        const sampleCondition = sample.sample.getCondition(data.sortBy);
        return sampleCondition ? sampleCondition.value : undefined;
      }
    );
  }
  return samples.map((sample, idx) => (
    <GridColumn key={idx} style={style}>
      <SampleGridItem
        sample={sample.sample}
        title={sample.title}
        color={data.colorBy ? data.colorBy(sample.sample) : undefined}
        highlightConditions={data.highlightConditions}
      />
    </GridColumn>
  ));
}
const SampleGridComponent = ({
  samples,
  colorBy,
  sortBy,
  highlightConditions,
}) => {
  const sx = {
    item: {
      minWidth: '20%',
      '@media (max-width: 75rem)': {
        minWidth: '40%',
      },
      '@media (max-width: 48rem)': {
        minWidth: '100%',
      },
    },
  };
  return (
    <HorizontalGrid style={sx.container}>
      {renderSampleItems({
        samples,
        colorBy,
        sortBy,
        highlightConditions,
      }, sx.item)}
    </HorizontalGrid>
  );
};

SampleGridComponent.propTypes = {
  samples: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Sample)),
  colorBy: React.PropTypes.func.isRequired,
  sortBy: React.PropTypes.string,
  highlightConditions: React.PropTypes.arrayOf(React.PropTypes.string),
};

export const SampleGrid = radium(SampleGridComponent);

export default {
  SampleGrid,
};
