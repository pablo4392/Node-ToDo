// en este modelo estamos listando todas las tareas que vayamos creando en la aplicación
require('colors');
const Task = require("./task");

class Tasks {

    _list = {};

    // convertimos el objeto de listado en un array
    get listArray () {
        const list = [];
        Object.keys(this._list).forEach(key => list.push( this._list[key] ))

        return list
    }

    constructor() {
        this._list = {};
    }

    deleteTask(id = '') {

        if(this._list[id]){
            delete this._list[id];
        }

    }

    loadTaskFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    //funcion para crear tarea (opcion 1 de la aplicacion)
    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    //funcion para visualizar el listado de tareas (opcion 3 en la aplicacion)
    listComplete(){
        console.log();

        this.listArray.forEach((task, index) => {
            const i = `${index+1}.`.brightGreen;
            const {desc, completeAt } = task;
            const state = (completeAt)
                    ? ' Done '.brightWhite.bgGreen
                    : ' Pending '.brightWhite.bgRed;

            console.log(`${i} ${desc} :: ${state}`)
        })
    }

    //Esta funcion activara las opciones 4 y 5 de la aplicacion 
    listPendingCompleted( completed = true) {
        console.log();

        let index = 0
        this.listArray.forEach(task => {

            const {desc, completeAt } = task;
            const state = (completeAt)
                    ? ' Done '.brightWhite.bgGreen
                    : ' Pending '.brightWhite.bgRed;

            if(completed){
                if(completeAt){
                    index += 1;
                    console.log(`${(index+'.').brightGreen} ${desc} :: ${(completeAt).brightYellow}`)
                }
            } else {
                if(!completeAt){
                    index += 1,
                    console.log(`${(index+'.').brightGreen} ${desc} :: ${state}`)
                }
            }
        })
    }

    toggleCompleted(ids = []) {

        ids.forEach( id => {
            const task = this._list[id];

            if(!task.completeAt){
                task.completeAt = new Date().toISOString();
            }
        });

        this.listArray.forEach( task => {

            if(!ids.includes(task.id)){
                this._list[task.id].completeAt = null;
            }
        })

    }

}

module.exports = Tasks