

import * as fs from 'fs';
import axios from 'axios';
export class Busquedas{
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        //TODO leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
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
                
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })); 
            
        } catch (error) {
            return [];
        }
    }

    async climaLugar (lat , lon ){

        try {
            //instancias axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsWeather
            })
            //resp extraer inf
            const resp = await instance.get();
            const {weather, main} = resp.data;
            // console.log(resp);

            return {
                desc:weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }


        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = '') {
         
        if( this.historial.includes(lugar.toLocaleLowerCase())){
            return
        }

         //Agregar duplicados
         this.historial.unshift( lugar.toLocaleLowerCase());

         //Grabar en DB
        this.guardarDB();
    }

    guardarDB() {
        const payLoad = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify(payLoad));
    }

    leerDB() {

    }


}

