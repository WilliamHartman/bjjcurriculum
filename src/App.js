import React, { Component } from "react";
import './App.css';
import axios from 'axios';
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'
import Help from './components/Help/Help'
import Students from './components/Students/Students'
import About from './components/About/About'
import Donate from './components/Donate/Donate'
import { withAuth0 } from "@auth0/auth0-react";
import techniques from "./assets/techniques";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      techniquesArr: techniques.techniques,
      displayPage: 'dashboard'
    }  

    this.saveChanges = this.saveChanges.bind(this);
    this.changeDisplayPage = this.changeDisplayPage.bind(this);
    this.updateInstructor = this.updateInstructor.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.fetchTechniques = this.fetchTechniques.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.auth0.isAuthenticated && this.props.auth0.isAuthenticated){
      axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getTechniques`, {user: this.props.auth0.user})
        .then((result) => {
          axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getStudents`, {user: this.props.auth0.user})
            .then((studentReturn) => {

              let techniquesArr = []
              for(let i=1; i<techniques.techniques.length+1; i++){
                let tempObj = techniques.techniques[i-1]
                let key = `c${i}`
                tempObj.progress = result.data[0][key]
                techniquesArr.push(tempObj)
              }
              
              this.setState({
                user: {
                  ...this.props.auth0.user, 
                  userID: result.data[0].user_id,
                  admin: result.data[0].admin_status,
                  createdDate: result.data[0].created_on,
                  lastLoginDate: result.data[0].last_login,
                  instructor: result.data[0].instructor,
                  username: result.data[0].username
                }, 
                techniquesArr,
                students: studentReturn.data
              })
            })
        })
    }
  }

  fetchTechniques(){
    axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getTechniques`, {user: this.props.auth0.user})
    .then((result) => {
      let techniquesArr = []
      for(let i=1; i<techniques.techniques.length+1; i++){
        let tempObj = techniques.techniques[i-1]
        let key = `c${i}`
        tempObj.progress = result.data[0][key]
        techniquesArr.push(tempObj)
      }
      this.setState({
        user: {
          ...this.props.auth0.user, 
          userID: result.data[0].user_id,
          admin: result.data[0].admin_status,
          createdDate: result.data[0].created_on,
          lastLoginDate: result.data[0].last_login,
          instructor: result.data[0].instructor
        }, 
        techniquesArr
      })
    })
  }

  changeDisplayPage(newPage){
    if(newPage === 'logout'){
      this.setState({displayPage: 'dashboard', user: null, techniques: techniques.techniques})
    } else {
      this.setState({displayPage: newPage})
    }
  }

  saveChanges(newTechniques){
    axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/updateTechniques`, {user: this.state.user, newTechniques})
      .then((result) => {
        let techniquesArr = []
          for(let i=1; i<techniques.techniques.length+1; i++){
            let tempObj = techniques.techniques[i-1]
            let key = `c${i}`
            tempObj.progress = result.data[0][key]
            techniquesArr.push(tempObj)
          }
          this.setState({techniquesArr})
      })
  }

  updateInstructor(newEmail){
    axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/updateInstructor`, {userID: this.state.user.userID, newEmail}).then((result)=>{
      let techniquesArr = []
      for(let i=1; i<techniques.techniques.length+1; i++){
        let tempObj = techniques.techniques[i-1]
        let key = `c${i}`
        tempObj.progress = result.data[0][key]
        techniquesArr.push(tempObj)
      }
      this.setState({
        user: {
          ...this.props.auth0.user, 
          userID: result.data[0].user_id,
          admin: result.data[0].admin_status,
          createdDate: result.data[0].created_on,
          lastLoginDate: result.data[0].last_login,
          instructor: result.data[0].instructor
        }, 
        techniquesArr
      })
    })
  }

  updateUsername(newUsername){
    axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/updateUsername`, {userID: this.state.user.userID, newUsername}).then((result)=>{
      let techniquesArr = []
      for(let i=1; i<techniques.techniques.length+1; i++){
        let tempObj = techniques.techniques[i-1]
        let key = `c${i}`
        tempObj.progress = result.data[0][key]
        techniquesArr.push(tempObj)
      }
      this.setState({
        user: {
          ...this.props.auth0.user, 
          userID: result.data[0].user_id,
          admin: result.data[0].admin_status,
          createdDate: result.data[0].created_on,
          lastLoginDate: result.data[0].last_login,
          instructor: result.data[0].instructor
        }, 
        techniquesArr
      })
    })
  }

  router(){
    switch(this.state.displayPage){
      case 'dashboard': 
        return <Dashboard techniquesArr={this.state.techniquesArr} user={this.state.user} saveChanges={this.saveChanges}/>
      case 'help':
        return <Help/>
      case 'profile':
        return <Profile user={this.state.user} techniquesArr={this.state.techniquesArr} updateInstructor={this.updateInstructor} updateUsername={this.updateUsername}/>
      case 'students':
        return <Students user={this.state.user} students={this.state.students}/>
      case 'about':
        return <About user={this.state.user} />
      case 'donate':
        return <Donate user={this.state.user} />
    }
  }

  render(){
    return (
      <div className="App">
        <Header login={this.login} changeDisplayPage={this.changeDisplayPage}/>
        {this.router()}
      </div>
    );
  }
}

export default withAuth0(App);