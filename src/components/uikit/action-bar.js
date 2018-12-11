import React, { Component } from 'react';
import radium from 'radium';

class ActionBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: undefined,
    };

    this.handleActivate = this.handleActivate.bind(this);
  }

  handleActivate(active) {
    this.setState({
      ...this.state,
      active,
    });
  }

  render() {
    const {
      children,
    } = this.props;
    const sx = {
      container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'none',
        justifyContent: '',
      },
    };

    const childrenWithProps = React.Children.map(children,
      child => React.cloneElement(child, {
        activeAction: this.state.active,
        onActivate: action => this.handleActivate(action),
        ...this.props,
      })
    );

    return (
      <div style={sx.container}>
        {childrenWithProps}
      </div>
    );
  }
}

ActionBarComponent.propTypes = {
  children: React.PropTypes.node,
};

export const ActionBar = radium(ActionBarComponent);

export default {
  ActionBar,
};
