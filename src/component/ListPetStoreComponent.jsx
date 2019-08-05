import React, { Component } from 'react';
import PetDataService from '../service/PetDataService';

class ListPetStoreComponent extends Component {
	constructor(props) {
        super(props)
        this.state = {
            pets: [],
            message: null
        }
		this.deletePetClicked = this.deletePetClicked.bind(this)
        this.refreshPets = this.refreshPets.bind(this)
		this.addPEtClicked = this.addPEtClicked.bind(this)
		this.updatePetClicked = this.updatePetClicked.bind(this)
    }
	componentDidMount() {
        this.refreshPets();
    }
	deletePetClicked(id) {
        PetDataService.deletePet( id)
            .then(
                response => {
                    this.setState({ message: `Registro  ${id} eliminado exitosamente` })
                    this.refreshPets()
                }
            )

    }
	addPEtClicked() {
    this.props.history.push(`/pets/-1`)
	}
	updatePetClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/pets/${id}`)
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
        return (
            <div className="container">
                <h3>Listado de mascotas</h3>
				{this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Descripcion</th>
								<th>Especie</th>
								<th>Edad</th>
								<th>Precio</th>
								<th>Borrar</th>
								<th>Actualizar</th>
                            </tr>
                        </thead>
                        <tbody>
                             {
                                this.state.pets.map(
                                    pet =>
                                        <tr key={pet.idItem}>
                                            <td>{pet.idItem}</td>
                                            <td>{pet.description}</td>
											<td>{pet.animalSpecies}</td>
											<td>{pet.age}</td>
											<td>{pet.unitCost}</td>
											<td><button className="btn btn-warning" onClick={() => this.deletePetClicked(pet.idItem)}>Borrar</button></td>
											<td><button className="btn btn-success" onClick={() => this.updatePetClicked(pet.idItem)}>Actualizar</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
					 <div className="row">
                        <button className="btn btn-success" onClick={this.addPEtClicked}>+ Mascota</button>
                    </div>
                </div>
            </div>
			
			
        )
    }
}

export default ListPetStoreComponent