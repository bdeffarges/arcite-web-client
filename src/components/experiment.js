import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';

// import classnames from 'classnames';
import Avatar from 'react-avatar';

import SlideList from './microarray/slide-list';

const extractSlides = (design) => {
  const slides = {};
  const { samples } = design;

  samples.forEach((sampleCondition) => {
    const o = {};
    let barcode;
    sampleCondition.conditions.forEach((condition) => {
      if (condition.category === 'barcode') {
        barcode = condition.name;
      }
      o[condition.category] = condition.name;
    });
    if (!slides[barcode]) {
      slides[barcode] = [];
    }
    slides[barcode].push(o);
  });
  return slides;
};

function renderActions(actions) {
  if (actions && actions.length) {
    const buttons = actions.map(action =>
      (<FlatButton key={action.name} label={action.name} onClick={action.onClick} />)
    );
    return (
      <CardActions>{buttons}</CardActions>
    );
  }
  return null;
}

const renderDesign = (type, design) => {
  if (design && type === 'com.idorsia.research.microarray') {
    const slides = extractSlides(design);
    return (
      <div className="experiment-design">
        <CardTitle title="Experimental Design" subtitle={design.description} />
        <SlideList slides={slides} />
      </div>
    );
  }
  return (
    null
  );
};

class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'data',
    };
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(value) {
    const newState = { ...this.state, activeTab: value };
    this.setState(newState);
  }

  renderContent(experiment) {
    return (
      <Tabs value={this.state.activeTab} onChange={this.onTabChange}>
        <Tab label="Data" value="data" />
        <Tab label="Design" value="design">
          <CardText>
            {renderDesign(experiment.owner.organization, experiment.design)}
          </CardText>
        </Tab>
      </Tabs>
    );
  }


  render() {
    const {
      experiment = {
        owner: {} },
        // transforms = [],
        compact = false,
        // flex = false,
        actions = [],
      } = this.props;

    // const containerClasses = classnames(
    //   'experiment',
    //   { 'experiment--compact': compact },
    //   { 'experiment--detail': !compact },
    //   { 'experiment--flex': flex },
    // );

    return (
      <div >
        <Card style={{ height: '100%' }}>
          <CardHeader
            title={experiment.owner.person}
            subtitle={experiment.owner.organization}
            avatar={<Avatar name={experiment.owner.person} size={50} round />}
          />
          <CardTitle title={experiment.name} />
          <CardText>
            {experiment.description}
          </CardText>
          { compact ? null : this.renderContent(experiment)}
          {renderActions(actions)}

        </Card>
      </div>
    );
  }
}
Experiment.propTypes = {
  experiment: React.PropTypes.object,
  // transforms: React.PropTypes.arrayOf(React.PropTypes.object),
  actions: React.PropTypes.arrayOf(React.PropTypes.object),
  compact: React.PropTypes.bool,
  // flex: React.PropTypes.bool,
};

export default Experiment;
