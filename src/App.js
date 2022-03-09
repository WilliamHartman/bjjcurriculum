import React, { Component } from "react";
import './App.css';
import axios from 'axios';
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import Help from './components/Help/Help'
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
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.auth0.isAuthenticated && this.props.auth0.isAuthenticated){
      axios.post(`${process.env.REACT_APP_DEV_BACKEND}/api/getTechniques`, {user: this.props.auth0.user})
        .then((result) => {
          let techniquesArr = []
          for(let i=1; i<techniques.techniques.length+1; i++){
            let tempObj = techniques.techniques[i-1]
            let key = `c${i}`
            tempObj.progress = result.data[0][key]
            techniquesArr.push(tempObj)
          }
          this.setState({user: {...this.props.auth0.user, userID: result.data[0].user_id}, techniquesArr})
        })
    }
  }

  changeDisplayPage(newPage){
    if(newPage === 'logout'){
      console.log('logout clicked')
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

  router(){
    switch(this.state.displayPage){
      case 'dashboard': 
        return <Dashboard techniquesArr={this.state.techniquesArr} user={this.state.user} saveChanges={this.saveChanges}/>
      case 'help':
        return <Help/>
    }
  }

  render(){
    console.log(this.state.user)
    return (
      <div className="App">
        <Header login={this.login} changeDisplayPage={this.changeDisplayPage}/>
        {this.router()}
      </div>
    );
  }
}

export default withAuth0(App);