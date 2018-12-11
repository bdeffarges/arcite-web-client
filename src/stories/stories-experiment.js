import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import ExperimentCard from '../components/experiment/experiment-card';
import ExperimentHeader from '../components/experiment/experiment-header';
import ExperimentListItem from '../components/experiment/experiment-list-item';
import { default as ExperimentModel } from '../model/experiment';
import { now } from '../utils/date-utils';

const experiment = new ExperimentModel();
experiment.title = 'AMS0047';
experiment.description = 'CXCR3: Human T cells\n_Treatment: Vehicle, CXCL9, CXCL10, CXCL11, CXCL12, ACT-602825, CXCL9+ACT, CXCL10+ACT, CXCL11+ACT \n_ TimePoint: T0 (1 sample) , T1h, T4h\n_ Donors: x8';
experiment.organization = 'com.idorsia.research';
experiment.user = 'renaulb';
experiment.type = 'microarray';
experiment.lastUpdate = now();

export default () => {
  storiesOf('Experiment', module)
  .addDecorator(decorator)
  .add('type in header form', () => (
    <div>
      <ExperimentHeader type="nanostring" showLabel />
      <ExperimentHeader type="microarray" showLabel />
      <ExperimentHeader type="ngs" showLabel />
      <ExperimentHeader type="catwalk" showLabel />
      <ExperimentHeader type="other" showLabel />
    </div>
  ))
  .add('in card style', () => (
    <ExperimentCard experiment={experiment} />
   ))
   .add('in list style', () => (
     <ul>
       <ExperimentListItem experiment={experiment} />
       <ExperimentListItem experiment={experiment} />
       <ExperimentListItem experiment={experiment} />
       <ExperimentListItem experiment={experiment} />
     </ul>
    ))
   ;
};
