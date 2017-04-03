import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './loader.css';
import './app.css';

import {joinBeta} from './apollo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joinedBeta: false,
      loading: false,
      joinedError: false
    }
  }

  render() {
    return (
      <div id="content">
        <div id="top-container">
          <div id="logo" className="centered">
            <img alt="" src="./img/logo-website-top-left.png" />
          </div>
        </div>
        {this.renderMain()}
        {this.renderBottom()}
      </div>
    );
  }

  joinBeta() {
    const {email} = this.state;
    this.setState({loading: true});
    joinBeta(email)
      .then(() => {
        this.setState({joinedBeta: true, loading: false});
      })
      .catch(e => {
        this.setState({joinedBeta: true, joinedError: true, loading: false});
        console.error('error register to beta',e);
      });
  }

  renderMain() {
    return (
      <div id="middle-container">
        <div id="screencast-wrapper">
          <img src="./img/screencast.gif" id="screencast" className="centered"/>
        </div>
        <div id="subtitle">
          work <strong>remotely</strong> with your co-workers as if you sit together at the same <strong>room</strong>
        </div>
      </div>
    )
  }

  renderBottom() {
    const {joinedBeta, joinedError} = this.state;
    return (
      <div id="bottom-container">
        {
          joinedBeta ? (joinedError ? this.renderJoinedError() : this.renderJoinedSuccess()) : this.renderEnterEmail()
        }
      </div>
    );
  }

  renderEnterEmail() {
    if (this.state.loading) {
      return (
        <div id="loader-container">
          <div className="loader"></div>
        </div>
      );
    }

    return (
      <div id="email-form" className="centered">
        <div>
          <input type="email" placeholder="email..." onChange={e => this.setState({email: e.target.value})}/>
        </div>
        <div style={{'marginTop': '15px'}}>
          <button type="button" id="join-btn" onClick={this.joinBeta.bind(this)}> Join Beta</button>
        </div>
      </div>
    )
  }

  renderJoinedSuccess() {
    return (
      <div id="success-message" className="centered" style={{'textAlign': 'center'}}>
        <span style={{'fontWeight': 600, 'fontSize': '1.25em', 'letterSpacing': '5px'}}>THANKS!</span> <br />
        <span style={{'fontSize': '0.9em'}}>We will shortly send you an email with the download link.</span>
      </div>
    );
  }

  renderJoinedError() {
    return (
      <div id="success-message" className="centered" style={{'textAlign': 'center'}}>
        <span style={{'fontWeight': 600, 'fontSize': '1.25em', 'letterSpacing': '5px'}}>SORRY!</span> <br />
        <span style={{'fontSize': '0.9em'}}>We got an error. Please send an email to hlandao@gmail.com.</span>
      </div>
    );
  }
}

export default App;