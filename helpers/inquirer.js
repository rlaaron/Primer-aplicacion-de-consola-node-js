const inquire = require("inquirer");
require ("colors");

const preguntas = [
    {
        type: "list",
        name: "Opciones",
        messege: "¿Que desea hacer?",
        choices: [
            {
                value: "1",
                name: `${"1".blue}.Crear tarea`
            },
            {
                value: "2",
                name: `${"2".blue}.Listar tareas`
            },
            {
                value: "3",
                name: `${"3".blue}.Listar tareas completas`
            },
            {
                value: "4",
                name: `${"4".blue}.Listar  tareas pendientes`
            },
            {
                value: "5",
                name: `${"5".blue}.Completar tareas`
            },
            {
                value: "6",
                name: `${"6".blue}.Borar tarea`
            },
            {
                value: "0",
                name: `${"0".blue}.Salir`
            },
            
        ]
    }
];



const inquirerMenu = async() =>{

    console.clear();
    console.log("===========================".green);
    console.log("   SELECIONE UNA OPCION    ".red);
    console.log("===========================\n".green);

    const { Opciones } = await inquire.prompt(preguntas);
    return Opciones;


}

const pausa = async() => {

    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${ "ENTER".red } para continuar`
        }
    ];

    console.log("\n");
    await inquire.prompt(question);
    
}

const leerinput = async( message ) => {

    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate( value ) {
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor'; 
                }
                return true;
            }
        }
    ];

    const { desc } = await inquire.prompt(question);
    return desc;
}


const listadoTareasBorrar = async( tareas =  [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar '
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices 
        }
    ]

    const { id } = await inquire.prompt(preguntas);
    return id;
}


const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message 
        }
    ];

    const {ok} = await inquire.prompt(question);
    return ok;
}


const mostrarListadoChecklist = async( tareas =  [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices 
        }
    ]

    const { ids } = await inquire.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerinput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
