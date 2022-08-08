import inquirer from 'inquirer';
import 'colors';
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {value: 1, name: `${`1.`.brightGreen} Buscar ciudad`}, 
            {value: 2, name: `${`2.`.brightGreen} Historial`}, 
            {value: 0, name: `${`0.`.brightGreen} Salir`}             
        ]
    }

];

const pausaInput = [{
    type: 'input',
    name: 'pausa',
    message: `\nPresione ${ 'ENTER'. brightRed} para continuar\n`
}]

const inquirerMenu = async() => {

    console.clear();
        console.log('============================='.green);
        console.log('   Seleccione una opción'.brightGreen.bold);
        console.log('=============================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async() => {
    // console.log('\n');
    await inquirer.prompt(pausaInput);    
}

const leerInput = async( mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value) {
                if( value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async ( lugares = []) => {

    const choices = lugares.map( (lugar, i) => {

        const idx = `${i + 1}.`.brightGreen;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.brightGreen + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices: choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async ( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.brightGreen;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;

};

export {
    inquirerMenu,
    pausa,
    leerInput, 
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}
