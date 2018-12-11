import React from 'react';
import _ from 'lodash';

import * as sortUtils from '../../utils/sort-utils';

const renderFields = array =>
  (_.keys(array).sort(sortUtils.sortCaseInsensitive).map(key => (
    <div key={key}>
      <span>{key}:</span>&nbsp;<span>{array[key]}</span>
    </div>
  )));


const Array = ({ className, style, array }) => (
  <div className={className} style={style} >
    {renderFields(array)}
  </div>);

Array.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  array: React.PropTypes.object,
};

export default Array;
