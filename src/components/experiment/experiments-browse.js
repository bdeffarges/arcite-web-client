import React, { Component } from 'react';
import _ from 'lodash';

import styles from '../../styles';

import { SearchField } from '../uikit/searchbox';
import { Section, SecondarySection } from '../uikit/containers';
import { HorizontalGrid, GridColumn } from '../uikit/grid';
import { Heading2, Subheading2, InfoText } from '../uikit/typography';
import { PanelComponent } from '../uikit/panel';
import { Paper } from '../uikit/paper';

import ExperimentCardGrid from './experiment-card-grid';
import ExperimentList from './experiment-list';
import GlobalArtifactList from '../artifact/global-artifact-list';

import User from '../../model/user';


// -----------------------------------------------------------------------------
// RESULT LIST
// -----------------------------------------------------------------------------

const ResultList = ({
                      experiments,
                      artifacts,
                      showExperiment,
                      authUser,
                      deleteExperiment,
                    }) =>
  (
    <ExperimentCardGrid
      experiments={experiments}
      artifacts={artifacts}
      authUser={authUser}
      showExperiment={showExperiment}
      deleteExperiment={deleteExperiment}
    />
  );


ResultList.propTypes = {
  experiments: React.PropTypes.object,
  artifacts: React.PropTypes.object,
  authUser: React.PropTypes.instanceOf(User),
  deleteExperiment: React.PropTypes.func.isRequired,
  showExperiment: React.PropTypes.func.isRequired,
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT: ExperimentBrowser
// -----------------------------------------------------------------------------


class ExperimentBrowser extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.func = this.func.bind(this);
    this.func = _.debounce(this.func, 250);
    this.state = {
      query: '',
    };
  }

  func() {
    this.props.filterExperiments(this.state.query);
  }

  handleChange(event) {
    const newState = { ...this.state, query: event.target.value };
    this.props.filterExperiments('');
    this.setState(newState);
    this.func();
  }

  render() {
    const {
      experiments,
      recentGlobalArtifacts,
      recentExperiments,
      userExperiments,
      showExperiment,
    } = this.props;

    const sx = {
      top: {
        textAlign: 'center',
      },
      search: {
        width: '50%',
        ...styles.getMargin([0, 'auto']),
      },
      content: {
        left: {
          '@media (max-width: 37.5rem)': {
            display: 'none',
          },
        },
        center: {},
      },
      noresult: {
        container: {
          position: 'relative',
        },
        text: {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          textAlign: 'center',
        },
      },
    };

    const hasExperiments = _.keys(experiments).length;
    const hasUserExperiments = _.keys(userExperiments).length;
    const hasArtifacts = _.keys(recentGlobalArtifacts).length;

    return (
      <div>
        <SecondarySection>
          <div style={sx.top}>
            <Heading2>Browse ARCITE</Heading2>
            <Subheading2 invert>Search experiments in ARCITE</Subheading2>
            <div style={sx.search}>
              <SearchField
                name="search" value={this.state.query}
                onChange={this.handleChange}
                placeholder="Search for experiments"
              />
            </div>
          </div>
        </SecondarySection>
        <Section>
          <HorizontalGrid p={4} gutter={12}>
            <GridColumn gutter={12} space={1} maxWidth="24rem" style={sx.content.left}>
              {
                hasArtifacts ?
                  (
                    <PanelComponent m={[0, 0, 4, 0]} title="Recent results" icon="act-clock-2" collapsable>
                      <GlobalArtifactList artifacts={recentGlobalArtifacts} />
                    </PanelComponent>
                  ) : undefined
              }
              <PanelComponent title="Last Updates" icon="act-clock-2" collapsable>
                <ExperimentList experiments={recentExperiments} onClick={showExperiment} />
              </PanelComponent>
              {
                hasUserExperiments ?
                  (
                    <PanelComponent m={[4, 0, 0, 0]} title="Your Experiments" icon="act-user-2" collapsable>
                      <ExperimentList experiments={userExperiments} onClick={showExperiment} />
                    </PanelComponent>
                  ) : ''
              }
            </GridColumn>
            <GridColumn gutter={12} space={3} style={sx.content.center}>
              {hasExperiments ? (
                <ResultList {...this.props} />
              ) : (
                <Paper height="100%" style={sx.noresult.container}>
                  <InfoText center style={sx.noresult.text}>No results found</InfoText>
                </Paper>
              )}
            </GridColumn>
          </HorizontalGrid>
        </Section>
      </div>
    );
  }
}

ExperimentBrowser.propTypes = {
  experiments: React.PropTypes.object,
  recentGlobalArtifacts: React.PropTypes.object,
  recentExperiments: React.PropTypes.object,
  userExperiments: React.PropTypes.object,
  showExperiment: React.PropTypes.func.isRequired,
  filterExperiments: React.PropTypes.func.isRequired,
};

export default ExperimentBrowser;
