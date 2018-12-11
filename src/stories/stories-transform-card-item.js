import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import TransformCardItem from '../components/transform/transform-card-item';

import DataTransform from '../model/data-transform';
import dataTransformsData from '../api/data/dataTransforms.json';

const transform = new DataTransform();
transform.fromApi(dataTransformsData.transforms[1]);

const sx = {
  container: {
    margin: '4rem auto',
    width: '80%',
  },
};

export default () => {
  storiesOf('Transform Card Item', module)
  .addDecorator(decorator)
  .add('standard behaviour', () => (
    <div style={sx.container}>
      <TransformCardItem transform={transform} />
    </div>
   ));
};
