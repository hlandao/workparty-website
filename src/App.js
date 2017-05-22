import React from 'react';
import MobileDetect from 'mobile-detect';

import 'bootstrap/dist/css/bootstrap.css';
import './loader.css';
import './app.css';

import {joinBeta} from './apollo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.mobileDetect = new MobileDetect(window.navigator.userAgent);
    this.isMobile = !!this.mobileDetect.mobile()

    this.state = {
      joinedBeta: false,
      loading: false,
      clickedDownload: false,
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
        <div style={{textAlign: 'center', color: '#a1a2a3', marginTop: 5, fontWeight: 'lighter', fontSize: '17px'}}>
          Always on screen sharing and audio calls for teams!
        </div>
      </div>
    )
  }


  renderBottom() {
    const {joinedBeta, joinedError} = this.state;

    if(this.isMobile) {
      return (
        <div id="bottom-container" className="container-fluid">
          {
            joinedBeta ? (joinedError ? this.renderJoinedError() : this.renderJoinedSuccess()) : this.renderEnterEmail()
          }
        </div>
      );
    } else {
      return (
        <div id="bottom-container" className="container-fluid">
          {this.renderDownloadDesktop()}
        </div>
      )
    }
  }

  renderDownloadDesktop() {
    const {clickedDownload} = this.state;
    return (
      <div className="row download-wrapper">
        <div className="col-xs-12 col-sm-4 col-sm-offset-2 col-md-3 col-md-offset-3 btn-wrapper">
          <button className="btn" onClick={() => this.downloadMac()}>
            <i className="fa fa-apple centered" aria-hidden="true"></i>
            Download for Mac
          </button>
        </div>
        <div className="col-xs-12 col-sm-4 col-md-3 btn-wrapper">
          <button className="btn" onClick={() => this.downloadWindows()}>
            <i className="fa fa-windows centered" aria-hidden="true"></i>
            Download for Win
          </button>
        </div>
        {clickedDownload ? this.renderInviteCode() : null}
      </div>
    )
  }

  renderInviteCode() {
    const {inviteCode} = this.state;
    return (
      <div className="col-sm-12 invite-code-wrapper">
        <span className="thanks-subtitle">Your download is on the way and your invite code is: <span className="invite-code">{inviteCode}</span></span>
      </div>
    )
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
    <div className="row">
      <div id="email-form" className="col-md-4 col-lg-offset-4">
        <div>
          <input type="email" placeholder="email..." onChange={e => this.setState({email: e.target.value})}/>
        </div>
        <div style={{'marginTop': '15px'}}>
          <button type="button" id="join-btn" onClick={this.joinBeta.bind(this)}> Join Beta</button>
        </div>
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

  downloadMac() {
    window.location.assign('http://workparty-downloads.s3.amazonaws.com/workparty-0-1-2.zip');
    if(!this.state.clickedDownload) {
      this.setState({clickedDownload: true, inviteCode: this.genInviteCode()});
    }
  }

  downloadWindows() {
    window.location.assign('http://workparty-downloads.s3.amazonaws.com/workparty-windows-0.1.2.zip');
    if(!this.state.clickedDownload) {
      this.setState({clickedDownload: true, inviteCode: this.genInviteCode()});
    }
  }
  genInviteCode() {
    return `wpXX${getRandom(3)}`;
  }
}

function getRandom(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
}


export default App;