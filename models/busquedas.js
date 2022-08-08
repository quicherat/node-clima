
// import * as axios from 'axios';
import axios from 'axios';
export class Busquedas{
    historial = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        //TODO leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1IjoicXVpY2hlcmF0IiwiYSI6ImNsNmp1M2h2NjIxamsza3BzY2VuMmp4cmYifQ.8c9p1BbfWFfe-_LmMOokNw',
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = ''){

        try {
            // petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();           
            console.log(resp.data);
    
            return []; //retorna las ciudades
            
        } catch (error) {
            return [];
        }
    }
}

