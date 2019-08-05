import React, { Component } from 'react';
import ListPetStoreComponent from './ListPetStoreComponent';
import ListStoreComponent from './ListStoreComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PetDetailsComponent from './PetDetailsComponent';

class PetStoreApp extends Component {
    render() {
        return (
		      
			  
			  
			   <Router>
                <>
                    <h1>Mascotas app</h1>
                    <Switch>
                        <Route path="/" exact component={ListPetStoreComponent} />
                        <Route path="/pets" exact component={ListPetStoreComponent} />
                        <Route path="/pets/:id" component={PetDetailsComponent} />
						<Route path="/store" exact component={ListStoreComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default PetStoreApp