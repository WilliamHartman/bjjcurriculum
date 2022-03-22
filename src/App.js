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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; 
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }; 

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      user: null,
      techniquesArr: techniques.techniques,
      displayPage: 'dashboard',
      updateInstructorModal: false,
      newInstructorEmail: cookies.get('newInstructorEmail') || '',
      instructorInfo: {username: ''}
    }  

    this.saveChanges = this.saveChanges.bind(this);
    this.changeDisplayPage = this.changeDisplayPage.bind(this);
    this.updateInstructor = this.updateInstructor.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.fetchTechniques = this.fetchTechniques.bind(this);
  }

  componentDidMount() { 
    const { cookies } = this.props;
    if(window.location.pathname.split('=')[0] === '/changeInstructor'){
      let newInstructorEmail = window.location.pathname.split('=')[1]

      cookies.set('newInstructorEmail', newInstructorEmail, { path: '/' });
      this.setState({ newInstructorEmail });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.auth0.isAuthenticated && this.props.auth0.isAuthenticated){
      axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getTechniques`, {user: this.props.auth0.user})
        .then((result) => {
          axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getStudents`, {user: this.props.auth0.user})
            .then((studentReturn) => {
              axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getUserByEmail`, {email: result.data[0].instructor})
                .then((instructorInfo) => {
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
                      username: result.data[0].username,
                    }, 
                    techniquesArr,
                    students: studentReturn.data,
                    instructorInfo: instructorInfo.data[0]
                  }, () => {
                    const { cookies } = this.props;
                    let newInstructorEmail = cookies.cookies.newInstructorEmail
                    if(newInstructorEmail){
                      if(newInstructorEmail.length > 0){
                        axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getUserByEmail`, {email: newInstructorEmail})
                          .then((newInstructorInfo) => {
                            this.setState({updateInstructorModal: true, newInstructorEmail, instructorInfo: newInstructorInfo.data[0]})
                            cookies.set('newInstructorEmail', '', { path: '/' });
                          })
                      }
                    }
                  })
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
          instructor: result.data[0].instructor,
          username: result.data[0].username
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
      axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getUserByEmail`, {email: newEmail})
        .then((newInstructorInfo) => {
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
            instructorInfo: newInstructorInfo.data[0]
          })
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
          instructor: result.data[0].instructor,
          username: result.data[0].username
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
        return <Profile user={this.state.user} techniquesArr={this.state.techniquesArr} updateInstructor={this.updateInstructor} updateUsername={this.updateUsername} instructorInfo={this.state.instructorInfo}/>
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
        <Dialog open={this.state.updateInstructorModal} onClose={()=>this.setState({updateInstructorModal: false})}>
                <DialogTitle>Change Instructor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.state.instructorInfo.username === '' ? 
                        `Are you sure you want to change your instructor's email address to ${this.state.newInstructorEmail}` :
                        `Are you sure you want to change your instructor to ${this.state.instructorInfo.username}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.setState({updateInstructorModal: false})}>No</Button>
                    <Button onClick={()=>{
                      this.updateInstructor(this.state.newInstructorEmail)
                      this.setState({updateInstructorModal: false})
                      }}>Yes
                    </Button>
                </DialogActions>
            </Dialog>
      </div>
    );
  }
}

export default withAuth0(withCookies(App));