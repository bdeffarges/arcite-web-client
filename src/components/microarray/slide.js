import React from 'react';
import _ from 'lodash';

import Barcode from '../barcode';

import Array from './array';

const renderArrays = (arrays) => {
  const columns = arrays.length === 8 ? 4 : arrays.length;
  const width = (90 / columns);
  const sortedArrays = arrays.sort((a, b) => {
    if (a.arrayID > b.arrayID) {
      return 1;
    } else if (a.arrayID < b.arrayID) {
      return -1;
    }
    return 0;
  });
  return _.map(sortedArrays, (array, idx) => (<Array style={{ minWidth: `${width}%`, maxWidth: `${width}%` }} className="slide__array" key={idx} array={array} />));
};

const Slide = ({ slide }) => (
  <div className="slide">
    <Barcode barcode={slide.barcode} type="Code128" barWidth={1} height={15} fontSize={12} />
    <div className="slide__content">
      {renderArrays(slide.arrays)}
    </div>
  </div>
);

Slide.propTypes = {
  slide: React.PropTypes.object,
};

export default Slide;
