import React, { Component } from 'react';
import AuthContent from './authRoutes';
import UnAuthContent from './unAuthRoutes';
import { getUserStorage } from '../utils/browserStorage';

class Gatekeeper extends Component {
    constructor() {
      super();
      this.state = {
        token: getUserStorage(),
      };
    }

    updateToken = () => {
        this.setState({
            token: getUserStorage(),
        });
    }

    render() {
    const { token }  = this.state;
      return (
          <div>
            { token ? <AuthContent updateToken={this.updateToken}/> : <UnAuthContent updateToken={this.updateToken}/>}
          </div>
      );
    }
}

export default Gatekeeper;

