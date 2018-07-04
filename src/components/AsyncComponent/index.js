import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentWillMount() {
      const { default: component } = await importComponent();
      this.setState({
        component,
      });
    }

    render() {
      const WrappedComponent = this.state.component;
      return WrappedComponent ? <WrappedComponent {...this.props} /> : <Wrapper />;
    }
  }

  return AsyncComponent;
}
