import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Subheading1, Subheading2, Subheading3, LeadText, Caps, MetaText, AltParagraph } from '../components/uikit/typography';

export default () => {
  storiesOf('Typography', module)
  .addDecorator(decorator)
  .add('Headings', () => (
    <div>
      <Heading1>This is a Heading Level 1</Heading1>
      <Heading2>This is a Heading Level 2</Heading2>
      <Heading3>This is a Heading Level 3</Heading3>
      <Heading4>This is a Heading Level 4</Heading4>
      <Heading5>This is a Heading Level 5</Heading5>
      <Heading6>This is a Heading Level 6</Heading6>
    </div>
  ))
  .add('Headings with capitalized text', () => (
    <div>
      <Heading1 caps>This is a Heading Level 1</Heading1>
      <Heading2 caps>This is a Heading Level 2</Heading2>
      <Heading3 caps>This is a Heading Level 3</Heading3>
      <Heading4 caps>This is a Heading Level 4</Heading4>
      <Heading5 caps>This is a Heading Level 5</Heading5>
      <Heading6 caps>This is a Heading Level 6</Heading6>
    </div>
  ))
  .add('Headings with alternate font', () => (
    <div>
      <Heading1 alt>This is a Heading Level 1</Heading1>
      <Heading2 alt>This is a Heading Level 2</Heading2>
      <Heading3 alt>This is a Heading Level 3</Heading3>
      <Heading4 alt>This is a Heading Level 4</Heading4>
      <Heading5 alt>This is a Heading Level 5</Heading5>
      <Heading6 alt>This is a Heading Level 6</Heading6>
    </div>
  ))
  .add('Headings with bold font', () => (
    <div>
      <Heading1 bold>This is a Heading Level 1</Heading1>
      <Heading2 bold>This is a Heading Level 2</Heading2>
      <Heading3 bold>This is a Heading Level 3</Heading3>
      <Heading4 bold>This is a Heading Level 4</Heading4>
      <Heading5 bold>This is a Heading Level 5</Heading5>
      <Heading6 bold>This is a Heading Level 6</Heading6>
    </div>
  ))
  .add('Centered headings', () => (
    <div>
      <Heading1 center>This is a Heading Level 1</Heading1>
      <Heading2 center>This is a Heading Level 2</Heading2>
      <Heading3 center>This is a Heading Level 3</Heading3>
      <Heading4 center>This is a Heading Level 4</Heading4>
      <Heading5 center>This is a Heading Level 5</Heading5>
      <Heading6 center>This is a Heading Level 6</Heading6>
    </div>
  ))
  .add('Subheadings', () => (
    <div>
      <Heading1>This is a Heading Level 1</Heading1>
      <Subheading1>This is a its subheading</Subheading1>
      <Heading2>This is a Heading Level 2</Heading2>
      <Subheading2>This is a its subheading</Subheading2>
      <Heading3>This is a Heading Level 3</Heading3>
      <Subheading3>This is a its subheading</Subheading3>
    </div>
  ))
  .add('Lead Text', () => (
    <LeadText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam aut eligendi
    laboriosam ratione ab doloribus, fugit repudiandae recusandae corrupti! Similique autem est
    libero quas ea molestias nemo necessitatibus dicta excepturi?</LeadText>
  ))
  .add('Capitalized Text', () => (
    <Caps>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam aut eligendi
    laboriosam ratione ab doloribus, fugit repudiandae recusandae corrupti! Similique autem est
    libero quas ea molestias nemo necessitatibus dicta excepturi?</Caps>
  ))
  .add('Meta Text', () => (
    <MetaText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam aut eligendi
    laboriosam ratione ab doloribus, fugit repudiandae recusandae corrupti! Similique autem est
    libero quas ea molestias nemo necessitatibus dicta excepturi?</MetaText>
  ))
  .add('Alternative Text', () => (
    <AltParagraph>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam aut eligendi
      laboriosam ratione ab doloribus, fugit repudiandae recusandae corrupti! Similique autem
      est libero quas ea molestias nemo necessitatibus dicta excepturi?
  </AltParagraph>
  ));
};
