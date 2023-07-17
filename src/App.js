import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

export default class App extends Component {
  state={
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <Router>
        <Navbar></Navbar>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
       />
        <div className="container my-3">
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="in" category="general"></News>}>
          </Route>
          <Route exact path="business" element={<News setProgress={this.setProgress} key="business" pageSize={6} country="in" category="business"></News>}></Route>
          <Route exact path="entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} country="in" category="entertainment"></News>}></Route>
          <Route exact path="health"  element={<News setProgress={this.setProgress}  key="health" pageSize={6} country="in" category="health"></News>}></Route>
          <Route exact path="science" element={<News setProgress={this.setProgress}  key="science" pageSize={6} country="in" category="science"></News>}></Route>
          <Route exact path="sports"  element={<News setProgress={this.setProgress}  key="sports" pageSize={6} country="in" category="sports"></News>}></Route>
          <Route exact path="technology"  element={<News setProgress={this.setProgress}  key="technology" pageSize={6} country="in" category="technology"></News>}></Route>
         
        </Routes>
        </div>
        </Router>
       
      </>
    )
  }
}
