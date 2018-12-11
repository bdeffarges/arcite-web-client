import React from 'react';
import radium, { StyleRoot } from 'radium';

import styles from '../../styles';
import '../../styles/styles.sass';

// -----------------------------------------------------------------------------
// Base Container: Wrapper for your app
// -----------------------------------------------------------------------------


const BaseComponent = ({
  children,
  ...props
}) => {
  const sx = {
    container: {
      position: 'relative',
      minHeight: '100%',
    },
    content: {
      fontFamily: styles.variables.type.baseFont,
      color: styles.variables.type.baseColor,
      minHeight: '100%',
      ...styles.getFontSize(4),
      ...styles.getLineHeight(4),
    },
  };
  return (
    <StyleRoot style={sx.container}>
      <div {...props} style={[sx.content]}>{children}</div>
    </StyleRoot>
  );
};

BaseComponent.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

const Base = radium(BaseComponent);

// -----------------------------------------------------------------------------
// Content Container
// -----------------------------------------------------------------------------
const ContentComponent = ({
  children,
  ...props
}) => {
  const sx = {
    paddingBottom: styles.getFooterHeight(),
  };
  return (
    <div {...props} style={sx}>
      {children}
    </div>
  );
};

ContentComponent.propTypes = {
  children: React.PropTypes.node,
};

const Content = radium(ContentComponent);

// -----------------------------------------------------------------------------
// Section
// -----------------------------------------------------------------------------

const SectionComponent = ({
  children,
  background,
  color,
  center,
  overlay,
  p = [31, 0, 31, 0],
  ...props
}) => {
  let effectiveBackground;
  if (overlay) {
    effectiveBackground = `radial-gradient(transparent, rgba(0,0,0,0.4)), ${background || null}`;
  } else {
    effectiveBackground = background || null;
  }
  const sx = {
    container: {
      position: 'relative',
      textAlign: center ? 'center' : null,
    },
    section: {
      ...styles.getPadding(p),
      background: effectiveBackground,
      color: color || null,
      width: '100%',
    },
    pseudo: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      display: 'block',
      width: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    },
    before: {
      asc: {
        borderTop: '160px solid white',
        borderRight: '3000px solid transparent',
      },
      desc: {
        borderTop: '160px solid white',
        borderLeft: '3000px solid transparent',
      },
    },
    after: {
      asc: {
        borderBottom: '160px solid white',
        borderRight: '3000px solid transparent',
      },
      desc: {
        borderBottom: '160px solid white',
        borderLeft: '3000px solid transparent',
      },
    },
  };


  return (
    <div style={sx.container}>
      <section {...props} style={sx.section}>{children}</section>
    </div>
  );
};

SectionComponent.propTypes = {
  children: React.PropTypes.node,
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  background: React.PropTypes.string,
  color: React.PropTypes.string,
  center: React.PropTypes.bool,
  overlay: React.PropTypes.bool,
};

const Section = radium(SectionComponent);

const DarkSection = props => (
  <Section {... props} background="#000" color="#fff" />
);

const PrimarySection = props => (
  <Section {... props} overlay background={styles.darken(styles.variables.color.primaryColor, 1.5)} color="#fff" />
);

const SecondarySection = props => (
  <Section {... props} overlay background={styles.darken(styles.variables.color.secondaryColor, 1.5)} color="#fff" />
);
const SecondaryAltSection = props => (
  <Section {... props} background={styles.alpha(styles.variables.color.secondaryColor)(1 / 8)} />
);

// -----------------------------------------------------------------------------
// Container
// -----------------------------------------------------------------------------
const ContainerComponent = ({
  children,
  ...props
}) => {
  const sx = {
    width: '73.125rem',
    margin: '0 auto',
    '@media (max-width: 75rem)': {
      width: '60.625rem',
    },
    '@media (max-width: 62rem)': {
      width: '46.875rem',
    },
    '@media (max-width: 48rem)': {
      width: '100%',
    },
  };
  return (
    <div {...props} style={sx}>{children}</div>
  );
};

ContainerComponent.propTypes = {
  children: React.PropTypes.node,
};

const Container = radium(ContainerComponent);

// -----------------------------------------------------------------------------
// Centered Block
// -----------------------------------------------------------------------------
const CenteredBlockComponent = ({
  children,
  width,
  align,
  ...props
}) => {
  const sx = {
    container: {
      width,
      ...styles.getMargin([0, 'auto']),
      textAlign: align || null,
    },
  };
  return (
    <div {...props} style={sx.container}>
      {children}
    </div>
  );
};

CenteredBlockComponent.propTypes = {
  children: React.PropTypes.node,
  width: React.PropTypes.string,
  align: React.PropTypes.string,
};

const CenteredBlock = radium(CenteredBlockComponent);

const SmallCenteredBlock = props => (<CenteredBlock {...props} width="16rem" />);
const MediumCenteredBlock = props => (<CenteredBlock {...props} width="32rem" />);
const LargeCenteredBlock = props => (<CenteredBlock {...props} width="48rem" />);


// -----------------------------------------------------------------------------
// Loading Block
// -----------------------------------------------------------------------------
const LoadingBlockComponent = ({
  children,
  text,
  visible,
  ...props
}) => {
  const sx = {
    container: {
      position: 'relative',
    },
    overlay: {
      display: visible ? 'block' : 'none',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...styles.getFontSize(2),
      backgroundColor: styles.shade[1],
      zIndex: 1000,
    },
    label: {
      display: 'block',
      position: 'absolute',
      width: '90%',
      top: '45%',
      right: '5%',
      ...styles.getPadding(2),
      textAlign: 'center',
      color: 'white',
      backgroundColor: styles.shade[2],
      borderRadius: styles.variables.space.borderRadius,
    },
  };
  return (
    <div {...props} style={sx.container}>
      <div style={sx.overlay}>
        <span style={sx.label}>{text}</span>
      </div>
      {children}
    </div>
  );
};

LoadingBlockComponent.propTypes = {
  children: React.PropTypes.node,
  text: React.PropTypes.string,
  visible: React.PropTypes.bool,
};

const LoadingBlock = radium(LoadingBlockComponent);

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------


export {
  Base,
  Content,
  Section,
  DarkSection,
  PrimarySection,
  SecondarySection,
  SecondaryAltSection,
  Container,
  CenteredBlock,
  SmallCenteredBlock,
  MediumCenteredBlock,
  LargeCenteredBlock,
  LoadingBlock,
};
