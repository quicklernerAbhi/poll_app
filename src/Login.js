import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCHNmel1aQI93CQ_5ut9Kau40Uby7G1SH0",
  authDomain: "c-survey-4985d.firebaseapp.com",
  databaseURL: "https://c-survey-4985d.firebaseio.com",
  projectId: "c-survey-4985d",
  storageBucket: "c-survey-4985d.appspot.com",
  messagingSenderId: "523304708732"
};
firebase.initializeApp(config);


class Login extends Component {
    constructor(props){
      super(props);
    }

    handleInfoSubmit = (e) => {
        const Username = this.refs.name.value;
        const email = this.refs.email.value;

        if(Username !== '' && email !== '') {
            this.props.changeUsername(Username, email);
        } else {
            alert('fill in the form');
        }

        // console.log(Username);
        e.preventDefault();
    }

    googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const promise = firebase.auth().signInWithPopup(provider);
        promise
        .then(result => {
            const user = result.user;
            // const username = user.displayName;
            // const email = user.email;
            const { displayName: username, email } = result.user;
            this.props.logUser(user, username, email);
        })
        .catch(err => {
            console.log(err);
        });
    }

  render(){
    return(
      <div>
          <div className="login-tab">
              <h3>Please, checkIn to start survey</h3>
              <div className="tab-content">
                  <form onSubmit={this.handleInfoSubmit}>
                      <label>Fullname <span className="star">*</span></label>
                      <input className="nameInput" type="text" placeholder="FullName" autoFocus="true" ref="name"/><br />
                      <label>Email <span className="star">*</span></label>
                      <input className="nameInput" type="email" placeholder="Email" ref="email"/><br />
                      <input className="submitButton" type="submit" value="Continue"/>
                  </form>
              </div>
              <div className="tab-content">
                  <p className="large-txt">OR</p>
                  <button className="google-Button" onClick={this.googleLogin}>
                      <span className="icon"><i className="fab fa-google"></i></span>
                      <span className='text'>Sign in with Google</span>
                  </button>
              </div>
          </div>

      </div>
    );
  }
}

// TODO: validate input field
// TODO: signIn without google to create firebase account;

export default Login;
