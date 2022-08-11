import 'dotenv/config';
// import express from 'express';
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import 'colors';
import { Busquedas } from "./models/busquedas.js";


const main = async () => {
    
    const busquedas = new Busquedas()
    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                
                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if( id === '0') continue;
                const lugarSel = lugares.find( l => l.id === id);
                
                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);
                
                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                // console.log(clima);

                //Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.brightGreen);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('El clima está:', clima.desc);

            break;
        
            case 2:
                busquedas.historial.forEach( (lugar, i) => {
                    const idx = `${i + 1}.`.brightGreen;
                    console.log(`${idx} ${lugar}`);
                })
            break;
        }        

        if(opt !== 0) await pausa();
        
    } while (opt !== 0);

}

main();