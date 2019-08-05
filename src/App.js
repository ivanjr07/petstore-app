import React, { Component } from 'react';
import './App.css';
import SideBar from './sidebar'

import PetStoreApp from './component/PetStoreApp';



// Containers
class App extends Component {
  render() {
    return (
	   <div id="App">
      <SideBar />
      <div className="container">
        <PetStoreApp />
      </div>
	  </div>
    );
  }
}

export default App;
