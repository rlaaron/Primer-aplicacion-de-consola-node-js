const { rejects } = require("assert");
const { resolve } = require("path");

require("colors");


const mostrarMenu = () => {
    return new Promise( resolve =>{

        console.clear();
        console.log("===========================".green);
        console.log("   SELECIONE UNA OPCION    ".red);
        console.log("===========================\n".green);

        console.log(`${"1.".blue} Crear tarea`);
        console.log(`${"2.".blue} Listar tareas`);
        console.log(`${"3.".blue} Listar tareas completas`);
        console.log(`${"4.".blue} Listar  tareas pendientes`);
        console.log(`${"5.".blue} Completar tareas`);
        console.log(`${"6.".blue} Borar tarea`);
        console.log(`${"0.".blue} Salir \n`);

        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readLine.question("Selecione una opcion: ", (opt) => {
            readLine.close();
            resolve (opt);
        })


        })

    
}

const pausa = () => {

    return new Promise( resolve =>{
        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question(`\nPRESIONE ${ "ENTER".blue } PARA CONTINUAR\n`, (opt) => {
            readLine.close();
            resolve();
        })

    });   
}



module.exports = {
    mostrarMenu,
    pausa
}