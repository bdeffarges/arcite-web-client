import React from 'react';
import { Section, SecondarySection, LargeCenteredBlock } from './uikit/containers';
import { Heading1, ThinHeading2 } from './uikit/typography';
import { DefaultButton, ButtonBar } from './uikit/buttons';

const Home = ({ goTo }) => (
  <div>
    <Section>
      <LargeCenteredBlock>
        <Heading1 caps center>Arcite</Heading1>
        <ThinHeading2 center>Process & Manage Biological Data</ThinHeading2>
        <ButtonBar spacing={16}>
          <DefaultButton thin size="large" onClick={() => goTo('#about')}>
            Learn more
          </DefaultButton>
        </ButtonBar>
      </LargeCenteredBlock>
    </Section>
    <SecondarySection id="about">
      <div className="about__content">
        <h2 className="about__header">About Arcite</h2>
        <p className="about__body">
          Arcite aims to be a general purpose biological data management
          and processing engine based on Akka and Spark.
        </p>
        <p className="about__body">
          The purpose of Arcite is to enable scientists to run reproducible
          analysis on data produced by laboratory equipments
          like microrray scanner, sequencer, etc.
        </p>
      </div>
    </SecondarySection>
  </div>
);

Home.propTypes = {
  goTo: React.PropTypes.func.isRequired,
};

export default Home;
