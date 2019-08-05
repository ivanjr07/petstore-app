import axios from 'axios'


const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/petStore/
`

class PetDataService {

    retrieveAllPets() {
        return axios.post(`${INSTRUCTOR_API_URL}ApiListener/findItems.action`);
    }
	
	 retrievePet(idItem) {
        //console.log('executed service')
		let item ={
			idItem :idItem
		}
        return axios.post(`${INSTRUCTOR_API_URL}ApiListener/findItemById.action`,item);
    }

    deletePet(idItem) {
		let item ={
			idItem :idItem
		}
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}ApiListener/deleteItem.action`,item);
    }

    updatePet(item) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}ApiListener/updateForm.action`, item);
    }

    createPet(item) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}ApiListener/saveForm.action`, item,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }
}

export default new PetDataService()