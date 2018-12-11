import React from 'react';

import styles from '../styles';
import { Container } from '../components/uikit/containers';

const Footer = () => {
  const sx = {
    container: {
      position: 'absolute',
      width: '100%',
      left: 0,
      bottom: 0,
      height: styles.getFooterHeight(),
      color: styles.variables.type.baseBackgroundColor,
      backgroundColor: styles.variables.type.baseColor,
      ...styles.getFontSize(5),
      ...styles.getPadding(4),
      fontWeight: styles.variables.type.bold,
    },
    content: {
      textAlign: 'center',
    },
  };
  return (
    <div style={sx.container}>
      <Container>
        <p style={sx.content}>
          Copyright {new Date().getFullYear()} - Idorsia Pharmaceuticals Ltd.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
