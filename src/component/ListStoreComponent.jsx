import React, { Component } from 'react';

import { CardDeck } from 'reactstrap';

import ItemCard from './ItemCard';
import PetDataService from '../service/PetDataService';

class ListStoreComponent extends Component {
	constructor(props) {
        super(props)
        this.state = {
            pets: [],
            message: null
        }

        this.refreshPets = this.refreshPets.bind(this)
		
    }
	componentDidMount() {
        this.refreshPets();
    }
	
    refreshPets() {
        PetDataService.retrieveAllPets()
            .then(
                response => {
                    console.log('response.data:'+response.data.data);
                    this.setState({ pets: response.data.data })
                }
            )
		 
    }
    render() {
		let petsCard;
    
		
      petsCard = Object.values(this.state.pets).map( pet => (
       

              <ItemCard 
                key={pet.idItem} 
                id={pet.idItem} 
                title={pet.description}
                price={pet.animalSpecies}
                description={pet.description}
                image={'/images/pets/'+ pet.idItem+'_pet.jpg'}
              />
        
        ) 
      )
   ;
	return ( 
        <CardDeck>
          {petsCard}
        </CardDeck>     
    );
    }
}

export default ListStoreComponent