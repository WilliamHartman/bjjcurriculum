import React, { Component } from "react";
import './App.css';
import axios from 'axios';
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import { withAuth0 } from "@auth0/auth0-react";
import techniques from "./assets/techniques";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      techniquesArr: techniques.techniques
    }  
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.auth0.isAuthenticated && this.props.auth0.isAuthenticated){
      axios.post(`http://localhost:8082/api/getTechniques`, {user: this.props.auth0.user})
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

  saveChanges(newTechniques){
    console.log(newTechniques)
    axios.post(`http://localhost:8082/api/updateTechniques`, {user: this.state.user, newTechniques})
      .then((result) => {
        console.log(result)
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

  render(){
    console.log(this.state.user)
    return (
      <div className="App">
        <Header login={this.login}/>
        <Dashboard techniquesArr={this.state.techniquesArr} user={this.state.user} saveChanges={this.saveChanges}/>
      </div>
    );
  }
}

export default withAuth0(App);