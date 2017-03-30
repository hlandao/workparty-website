import React from 'react';
import './loader.css'

import {joinBeta} from './apollo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joinedBeta: false,
      loading: false
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderBaseSite()}
        {this.renderJoinBeta()}
      </div>
    );
  }

  joinBeta() {
    const {email} = this.state;
    this.setState({loading: true});
    joinBeta(email).then(() => {
      this.setState({joinedBeta: true, loading: false});
    });
  }

  renderBaseSite() {
    return (
      <div>
        <div id="logo" style={{margin: '80px auto 0px', textAlign: 'center'}}>
          <img alt="" src="./img/logo-website-top-left.png" style={{height: '60px'}}/>
        </div>
        <div id="avatars" style={{width: '394px', margin: '70px auto 0px'}}>
          <img alt="" src="./img/avatars/avatar1.png" className="avatar"/>
          <img alt="" src="./img/avatars/avatar2.png" className="avatar"/>
          <img alt="" src="./img/avatars/avatar3.png" className="avatar"/>
          <img alt="" src="./img/avatars/avatar4.png" className="avatar"/>
          <img alt="" src="./img/avatars/avatar5.png" className="avatar"/>
          <img alt="" src="./img/avatars/avatar6.png" className="avatar"/>
        </div>
        <div style={{margin: '20px auto 0', textAlign: 'center', fontSize: '28px'}}>
          work with your co-workers as if you sit together at the same office
        </div>
        <div style={{
          marginTop: '15px',
          'textAlign': 'center',
          color: '#D82C65',
          'fontSize': '30px',
          'lineHeight': 1.4
        }}>
          MAKE WORKING REMOTELY <br />
          <span style={{'fontWeight': 600, 'fontSize': '34px', 'letterSpacing': '5px'}}> GREAT AGAIN!
          </span>
        </div>
      </div>
    )
  }

  renderJoinBeta() {
    const {joinedBeta} = this.state;
    return (
      <div style={{'marginTop': '70px'}}>
        {
          joinedBeta ? this.renderJoinedSuccess() : this.renderEnterEmail()
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
      <div id="email-form" style={{width: '300px', margin: '0 auto'}}>
        <div style={{'textAlign': 'center', 'fontSize': '22px', 'fontWeight': '400', 'color': 'rgb(64,97,255)'}}>
          Get Workparty for mac
        </div>
        <div style={{'marginTop': '20px'}}>
          <input type="email" placeholder="email"
                 style={{
                   outline: 'none',
                   border: 0,
                   'borderBottom': '2px solid rgb(64,97,255)',
                   height: '50px',
                   width: '100%',
                   'marginRight': '25px',
                   'fontSize': '17px'
                 }} onChange={e => this.setState({email: e.target.value})}/>
        </div>
        <div style={{'marginTop': '25px'}}>
          <button type="button" id="join-btn" onClick={this.joinBeta.bind(this)}> Join Beta</button>
        </div>
      </div>
    )
  }

  renderJoinedSuccess() {
    return (
      <div id="success-message" style={{'textAlign': 'center', 'fontSize': '26px'}}>
        <span style={{'fontWeight': 600, 'fontSize': '30px', 'letterSpacing': '5px'}}>THANKS!</span> <br />
        <span>We will shortly send you an email with the download link.</span>
      </div>
    );
  }
}

export default App;