import React, { Component } from 'react';
import Login from './Login';


var firebase = require('firebase');
var uuid = require('uuid');

  // var config = {
  //   apiKey: "AIzaSyCHNmel1aQI93CQ_5ut9Kau40Uby7G1SH0",
  //   authDomain: "c-survey-4985d.firebaseapp.com",
  //   databaseURL: "https://c-survey-4985d.firebaseio.com",
  //   projectId: "c-survey-4985d",
  //   storageBucket: "c-survey-4985d.appspot.com",
  //   messagingSenderId: "523304708732"
  // };

class Survey extends Component {
    constructor(props){
      super(props);

      this.state = {
          user : '',
          Username: '',
          email: '',
          uid: uuid.v1(),
          answers: {
              answer1: '',
              answer2: '',
              answer3: '',
              answer4: '',
              answer5: ''
          },
          isLoggedIn: false,
          isSubmitted: false
      };


      this.answerSelected = this.answerSelected.bind(this);
      this.handleSurveySubmit = this.handleSurveySubmit.bind(this);
    }

    handleSurveySubmit(e) {
        firebase.database().ref('Csurvey/'+ this.state.uid).set({
            Username: this.state.Username,
            email: this.state.email,
            Answers: this.state.answers
        });
        this.setState({isSubmitted: true});
        e.preventDefault();
    }

    answerSelected(e) {
        if(e.target.checked) {
            e.target.parentNode.classList.add('label-checked');
        }
        var radios = Array.from(document.querySelectorAll('input[type="radio"]'));
        radios.forEach(radio => {
            if(radio.checked) {
                radio.parentNode.classList.add('label-checked');
            } else {
                radio.parentNode.classList.remove('label-checked');
            }
        });
        var answers = this.state.answers;
        var value = e.target.value;
        var name = e.target.name;
        answers[name] = value;
        this.setState({answers});
        console.log(this.state);
    }

    changeUsername = (Username, email) => {
        this.setState({Username, email, isLoggedIn: true});
        console.log(Username, email);
    }

    logUser = (user, Username, email) => {
        this.setState({user, Username, email, isLoggedIn: true });
        console.log(user, Username, email);
    }

  render(){
      let currentDisplay = '';


      if(this.state.isLoggedIn === false) {
          currentDisplay = <Login logUser={this.logUser} changeUsername={this.changeUsername}/>
      } else if(this.state.isLoggedIn  === true && this.state.isSubmitted === false) {
          currentDisplay = <form onSubmit={this.handleSurveySubmit}>
             <div className="card">
                 <h3 className="survey-title">Personnel Survey</h3>
                 <div className="survey-question">
                     <h3>Gender</h3>
                     <label className="check-container">
                         <input type="radio" name="answer1" value="M" onClick={this.answerSelected} /> Male
                     </label>
                     <label className="check-container">
                         <input type="radio" name="answer1" value="F" onClick={this.answerSelected} /> Female
                     </label>
                 </div>
                 <div className="survey-question">
                     <h3>Age range</h3>
                     <label className="check-container">
                         <input type="radio" name="answer2" value="< 18" onClick={this.answerSelected} /> <span>below 18</span>
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer2" value="> 18 to 25" onClick={this.answerSelected} /> 18 to 25
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer2" value="25 above" onClick={this.answerSelected} /> 25 above
                    </label>
                 </div>
                 <div className="survey-question">
                     <h3>Highest Level of Education</h3>
                     <label className="check-container">
                         <input type="radio" name="answer3" value="High School" onClick={this.answerSelected} /> High School
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer3" value="Associate Degree" onClick={this.answerSelected} /> Associate Degree
                    </label>
                     <label className="check-container">
                         <input type="radio" name="answer3" value="College Degree(Bsc)" onClick={this.answerSelected} /> College Degree(Bsc)
                    </label>
                     <label className="check-container">
                         <input type="radio" name="answer3" value="Masters" onClick={this.answerSelected} /> Masters
                    </label>
                 </div>
                 <div className="survey-question">
                     <h3>Interest</h3>
                     <label className="check-container">
                         <input type="radio" name="answer4" value="Technology" onClick={this.answerSelected} /> Technology
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer4" value="Business" onClick={this.answerSelected} /> Business
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer4" value="Arts and Music" onClick={this.answerSelected} /> Arts and Music
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer4" value="Sports" onClick={this.answerSelected} /> Sports
                    </label>
                 </div>
                 <div className="survey-question">
                     <h3>Job status</h3>
                     <label className="check-container">
                         <input type="radio" name="answer5" value="Employed" onClick={this.answerSelected} /> Employed
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer5" value="Unemployed" onClick={this.answerSelected} /> Unemployed
                    </label>
                    <label className="check-container">
                         <input type="radio" className="radio" name="answer5" value="Looking for job" onClick={this.answerSelected} /> Looking for job
                    </label>
                    <label className="check-container">
                         <input type="radio" className="radio" name="answer5" value="Student" onClick={this.answerSelected} /> Student
                    </label>
                 </div>
                 <input className="submitButton" type="submit"  value="submit"/>
             </div>
        </form>

     } else if (this.state.isSubmitted === true) {
        currentDisplay = <div>
            <h2>Thanks for taking this survey, {this.state.Username}</h2>
        </div>
     }

    return(
      <div>
         {currentDisplay}
      </div>
    );
  }
}

// TODO: validate survey entry before submission


export default Survey;
