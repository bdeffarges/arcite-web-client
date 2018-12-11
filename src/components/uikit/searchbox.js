import React from 'react';
import radium from 'radium';

import { FAIcon } from './icon';
import { TextField } from './input';

// import styles from '../../styles';

const SearchFieldComponent = ({
  size,
  label,
  labelPosition = 'above',
  ...props
}) => (
  <TextField
    {...props}
    label={label}
    labelPosition={labelPosition}
    size={size}
    icon={<FAIcon dimmed icon="fa-search" m={[0]} p={[0]} />}
  />
  );


SearchFieldComponent.propTypes = {
  children: React.PropTypes.node,
  size: React.PropTypes.oneOf(['small', 'normal', 'large']),
  label: React.PropTypes.string,
  labelWidth: React.PropTypes.string,
  labelPosition: React.PropTypes.oneOf(['above', 'inline']),
};

export const SearchField = radium(SearchFieldComponent);

export default SearchField;
