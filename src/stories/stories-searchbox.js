import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import SearchBox from '../components/uikit/searchbox';

export default () => {
  storiesOf('Search Box', module)
  .addDecorator(decorator)
  .add('standard display', () => (
    <div>
      <SearchBox name="search" m={[4]} />
      <SearchBox name="search" placeholder="Search for something" m={[4]} />
    </div>
   ))
   .add('with label', () => (
     <div>
       <SearchBox name="searchOne" label="Search for something" m={[4]} />
       <SearchBox name="searchTwo" label="Search for something" labelPosition="inline" m={[4]} />
     </div>
    ))
    .add('with different sizes', () => (
      <div>
        <SearchBox name="searchOne" size="small" m={[4]} />
        <SearchBox name="searchOne" size="normal" m={[4]} />
        <SearchBox name="searchOne" size="large" m={[4]} />
      </div>
     ))
   ;
};
