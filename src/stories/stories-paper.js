import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';
import { Container, Section } from '../components/uikit/containers';
import { Paper, RoundPaper } from '../components/uikit/paper';

export default () => {
  storiesOf('Paper', module)
  .addDecorator(decorator)
  .add('Paper at different z-height', () => (
    <Section>
      <Container>
        <Paper m={[6, 0]}>
          <p>Paper with content and a height of 0 (default) and some more text
          </p>
        </Paper>
        <Paper z={1} m={[6, 0]}>
          <p>Paper with content and a height of 1</p>
        </Paper>
        <Paper z={2} m={[6, 0]}>
          <p>Paper with content and a height of 2</p>
        </Paper>

        <Paper z={3} m={[6, 0]}>
          <p>Paper with content and a height of 3</p>
        </Paper>
        <Paper z={4} m={[6, 0]}>
          <p>Paper with content and a height of 4</p>
        </Paper>
      </Container>
    </Section>
   ))
   .add('Round Paper', () => (
     <Section>
       <Container>
         <RoundPaper m={[6, 0]} width="250px" height="250px" />
         <RoundPaper z={1} m={[6, 0]} width="250px" height="250px" />
         <RoundPaper z={2} m={[6, 0]} width="250px" height="250px" />
         <RoundPaper z={3} m={[6, 0]} width="250px" height="250px" />
         <RoundPaper z={4} m={[6, 0]} width="250px" height="250px" />
       </Container>
     </Section>
  ));
};
