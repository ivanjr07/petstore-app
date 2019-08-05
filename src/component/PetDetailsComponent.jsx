import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PetDataService from '../service/PetDataService';

class PetDetailsComponent extends Component {
	constructor(props) {
        super(props)

        this.state = {
            idItem: parseInt(this.props.match.params.id),
            description: '',
			name : '',
			animalSpecies:'',
			unitCost:'',
			age: '',
			image:null
			
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
		 this.onChange = this.onChange.bind(this)

	}
	
	componentDidMount() {

        console.log(this.state.idItem)

        // eslint-disable-next-line
        if (this.state.idItem == -1) {
            return
        }
		
        PetDataService.retrievePet(this.state.idItem)
            .then(response => this.setState({
                description: response.data.data.description,
				name : response.data.data.name,
				animalSpecies: response.data.data.animalSpecies,
				unitCost:response.data.data.unitCost,
				age:response.data.data.age
            }))
    }
	onChange(e) {
    this.setState({image:e.target.files[0]})
  }
	validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'La descripcion es requerida'
        } 
		 if (!values.name) {
            errors.name = 'El nombre es requerido'
        } 
        return errors

    }
	
	 onSubmit(values) {
        
       
		const formData = new FormData();
		formData.append('imageUpload', this.state.image);
		formData.append('idItem', this.state.idItem);
		formData.append('description', values.description);
		formData.append('name', values.name);
		formData.append('animalSpecies', values.animalSpecies);
		formData.append('age', values.age);
		
		
		console.log(formData);
        if (this.state.idItem === -1) {
			console.log('Saving')
            PetDataService.createPet( formData)
                .then(() => this.props.history.push('/pets'))
        } else {
            PetDataService.updatePet( formData)
                .then(() => this.props.history.push('/pets'))
        }

        
    }

	
	render() {

        let { age,unitCost,name,animalSpecies,description, idItem } = this.state

        return (
            <div>
                <h3>Mascota</h3>
                <div className="container">
                    <Formik
                        initialValues={{ idItem, description,name,animalSpecies,unitCost,age }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form className="uploader">
                                    
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="number" name="idItem" disabled />
                                    </fieldset>
									 <ErrorMessage name="name" component="div"
                                        className="alert alert-warning" />
									<fieldset className="form-group">
                                        <label>Nombre</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
									<ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Descripcion</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
									<fieldset className="form-group">
                                        <label>Especie</label>
                                        <Field className="form-control" type="text" name="animalSpecies" />
                                    </fieldset>
									<fieldset className="form-group">
                                        <label>Edad</label>
                                        <Field className="form-control" type="number" name="age" />
                                    </fieldset>
									<fieldset className="form-group">
                                        <label>Costo</label>
                                        <Field className="form-control" type="number" name="unitCost" />
                                    </fieldset>
									<fieldset className="form-group">
                                        <label>Imagen:</label>
                                        <input  className="form-control" type="file" name="image" onChange={this.onChange} />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Guardar</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }

}

export default PetDetailsComponent