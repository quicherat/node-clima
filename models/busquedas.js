
// import * as axios from 'axios';
import axios from 'axios';
export class Busquedas{
    historial = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        //TODO leer DB si existe
    }

    async ciudad( lugar = ''){

        try {
            // petición http
            // console.log('ciudad', lugar);
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/vancouver.json?proximity=ip&language=es&access_token=pk.eyJ1IjoicXVpY2hlcmF0IiwiYSI6ImNsNmp1M2h2NjIxamsza3BzY2VuMmp4cmYifQ.8c9p1BbfWFfe-_LmMOokNw');
            console.log(resp.data);
    
            return []; //retorna las ciudades
            
        } catch (error) {
            return [];
        }
    }
}

