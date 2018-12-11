import React from 'react';
import { Base } from '../components/uikit/containers';

const decorator = story => (
  <Base>
    {story()}
  </Base>
);

export default decorator;
