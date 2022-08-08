import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js"
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
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);

                //Buscar los lugares

                //Seleccionar el lugar


                //Clima

                //Mostrar resultados
                console.log('\nInformación de la ciudad\n'.brightGreen);
                console.log('Ciudad:', );
                console.log('Lat:', );
                console.log('Lng:', );
                console.log('Temperatura:', );
                console.log('Mínima:', );
                console.log('Máxima:', );

                break;
        
            default:
                break;
        }        

        if(opt !== 0) await pausa();
        
    } while (opt !== 0);

}

main();