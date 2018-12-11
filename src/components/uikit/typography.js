import React from 'react';
import radium from 'radium';

import styles from '../../styles';

let Text = ({
  tag = 'span',
  alt,
  size,
  bold,
  thin,
  center,
  caps,
  m,
  p = [0],
  muted,
  supermuted,
  invert,
  style,
  underline,
  ...props
}) => {
  const Tag = tag;
  const baseColor = styles.getBaseColor(invert);

  const sx = {
    default: {
      fontFamily: alt ? styles.variables.type.alternateFont : null,
      ...styles.getFontSize(size),
      ...styles.getLineHeight(size),
      ...styles.getMargin(m),
      ...styles.getPadding(p),
      textAlign: center ? 'center' : null,
      textTransform: caps ? 'uppercase' : null,
      color: muted ? styles.alpha(baseColor)(1 / 2) : 'inherit',
    },
    bold: {
      fontWeight: styles.variables.type.bold,
    },
    thin: {
      fontWeight: styles.variables.type.thin,
    },
    underline: {
      borderBottom: `1px solid ${muted ? styles.alpha(baseColor)(1 / 2) : baseColor}`,
    },
    muted: {
      color: muted ? styles.alpha(baseColor)(1 / 2) : null,
    },
    supermuted: {
      color: supermuted ? styles.alpha(baseColor)(1 / 4) : null,
    },
  };
  const csx = [sx.default];
  if (bold) {
    csx.push(sx.bold);
  }
  if (thin) {
    csx.push(sx.thin);
  }
  if (underline) {
    csx.push(sx.underline);
  }
  if (muted) {
    csx.push(sx.muted);
  }
  if (supermuted) {
    csx.push(sx.supermuted);
  }
  csx.push(style);

  return (
    <Tag {... props} style={csx} />
  );
};

Text = radium(Text);

Text.propTypes = {
  tag: React.PropTypes.string,
  alt: React.PropTypes.bool,
  size: React.PropTypes.number,
  marginBottom: React.PropTypes.number,
  bold: React.PropTypes.bool,
  thin: React.PropTypes.bool,
  center: React.PropTypes.bool,
  caps: React.PropTypes.bool,
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  p: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  muted: React.PropTypes.bool,
  supermuted: React.PropTypes.bool,
  invert: React.PropTypes.bool,
  underline: React.PropTypes.bool,
  style: React.PropTypes.object,
};
// [48, 32, 24, 20, 16, 14, 12],
export const Hero1 = props => <Text size={0} m={[0, 0, 6, 0]} tag="h1" {...props} />;
export const Heading1 = props => <Text size={0} m={[0, 0, 6, 0]} tag="h1" {...props} />;
export const Heading2 = props => <Text size={1} m={[0, 0, 4, 0]} tag="h2" {...props} />;
export const Heading3 = props => <Text size={2} m={[0, 0, 3, 0]} tag="h3" {...props} />;
export const Heading4 = props => <Text size={3} m={[0, 0, 2, 0]} tag="h4" {...props} />;
export const Heading5 = props => <Text size={4} m={[0, 0, 2, 0]} tag="h5" {...props} />;
export const Heading6 = props => <Text size={5} m={[0, 0, 1, 0]} tag="h6" {...props} />;
export const Subheading1 = props => <Text size={2} m={[-8, 0, 6, 0]} tag="h1" muted {...props} />;
export const Subheading2 = props => <Text size={3} m={[-6, 0, 4, 0]} tag="h2" muted {...props} />;
export const Subheading3 = props => <Text size={4} m={[-5, 0, 3, 0]} tag="h3" muted {...props} />;
export const Subheading4 = props => <Text size={5} m={[-5, 0, 3, 0]} tag="h3" muted {...props} />;
export const ThinHeading1 = props => <Text size={0} m={[0, 0, 6, 0]} tag="h1" thin {...props} />;
export const ThinHeading2 = props => <Text size={1} m={[0, 0, 4, 0]} tag="h2" thin {...props} />;
export const ThinHeading3 = props => <Text size={2} m={[0, 0, 3, 0]} tag="h3" thin {...props} />;
export const ThinHeading4 = props => <Text size={3} m={[0, 0, 2, 0]} tag="h4" thin {...props} />;
export const ThinHeading5 = props => <Text size={4} m={[0, 0, 2, 0]} tag="h5" thin {...props} />;
export const ThinHeading6 = props => <Text size={5} m={[0, 0, 1, 0]} tag="h6" thin {...props} />;

export const LeadText = props => <Text tag="p" size={2} {...props} />;
export const Caps = props => <Text caps {...props} />;
export const MetaText = props => <Text tag="p" size={5} caps {...props} />;
export const AltParagraph = props => <Text tag="p" alt {...props} />;
export const InfoText = props => <Text size={0} m={[0, 0, 1, 0]} tag="p" supermuted {...props} />;
