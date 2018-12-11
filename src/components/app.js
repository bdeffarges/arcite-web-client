import React, { Component } from 'react';
import Header from '../containers/container-header';
import Footer from '../components/footer';
import { Base, Content } from '../components/uikit/containers';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { children } = this.props;
    return (
      <Base>
        <Header />
        <Content>
          {children}
        </Content>
        <Footer />
      </Base>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  init: React.PropTypes.func.isRequired,
};

export default App;
