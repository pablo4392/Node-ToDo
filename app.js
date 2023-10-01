require('colors');
const { inquirerMenu, 
        pause,
        readInput,
        listTasksToDelete,
        confirm,
        showListChecklist
     } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if( tasksDB ){
        tasks.loadTaskFromArray(tasksDB);
    }

    //con este "do while" lo unico que hacemos es mostrar el menu hasta que el usuario muestre la opcion 0 de salida
    do{
        //utilizamos "await" ya que la funcion "showMenu" retorna una promesa
        opt = await inquirerMenu();
        
        //este switch nos permite controlar la opciones mostradas en la pantalla que se generan por medio del inquirer
        switch (opt) {
            case '1': //Crear tarea
                const desc = await readInput('Description: ');
                tasks.createTask(desc);
            break;

            case '2': //Listar tareas
                tasks.listComplete();
            break;

            case '3': //Listar tareas completadas
                tasks.listPendingCompleted(true);
            break;

            case '4': //Listar tareas pendientes
                tasks.listPendingCompleted(false);
            break;

            case '5': //Completar tareas
                const ids = await showListChecklist( tasks.listArray);
                tasks.toggleCompleted(ids);
            break;

            case '6': //Eliminar tareas
                const id = await listTasksToDelete(tasks.listArray);
                if(id !== '0'){
                    const ok = await confirm('Are you sure?');
                    if(ok) {
                        tasks.deleteTask(id);
                        console.log('Task has been deleted')
                    }
                }
            break;
        }

        saveDB(tasks.listArray)
        
        await pause();

    } while(opt !== '0');


}

main()