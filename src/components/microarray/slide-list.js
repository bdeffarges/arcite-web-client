import React from 'react';
import _ from 'lodash';

import Slide from './slide';

const renderSlides =
  slides => _.keys(slides).map(barcode =>
    (<Slide key={barcode} slide={{ barcode, arrays: slides[barcode] }} />)
  );

const SlideList = ({ slides }) => (
  <div className="slide-list">
    {renderSlides(slides)}
  </div>
);

SlideList.propTypes = {
  slides: React.PropTypes.object,
};

export default SlideList;
