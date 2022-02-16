require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, 
        pausa,
        leerinput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");


const main = async() => {
    
    let opt = "";
    const tareas = new Tareas();
    
    const tareasDB = leerDB();
    
    if ( tareasDB ) { //cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }
    
    
    do {
        //imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerinput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':
                //listar opcion
                tareas.listadoCompleto();
            break; 
            
            case '3':
                //operaciones completadas
                tareas.listadoTareasCompletadas(true);
            break;
            
            case '4':
                //operaciones incompletadas
                tareas.listadoTareasCompletadas(false);
            break;
                        
            case '5':
                //completado|pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
                                                            
            case '6':
                //borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0'){
                    //confirmar
                    const ok = await confirmar('Estas seguro?');
                    if ( ok ){
                        tareas.borrarTarea( id) ;
                        console.log('tarea borrada con exito');
                    }
                }
            break;  
        }


        guardarDB(tareas.listadoArr);

        await pausa();

    } while ( opt !== "0" );
        
    
    
}

main();
