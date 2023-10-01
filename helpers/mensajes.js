//Esta solo es una opcion para hacer el menu manualmente, sin embargo se remplazara por "inquirer"

require('colors');

const showMenu = () => {

    //manejamos el codigo a manera de promesa para poder recibir la respuesta del usuario 
    return new Promise(resolve => {

        console.clear();
        console.log('======================'.rainbow);
        console.log('       To do app '.brightBlue);
        console.log('======================\n'.rainbow);

        console.log(`${'1'.brightGreen}. Create task`);
        console.log(`${'2'.brightGreen}. List tasks`);
        console.log(`${'3'.brightGreen}. List completed tasks`);
        console.log(`${'4'.brightGreen}. List pending tasks`);
        console.log(`${'5'.brightGreen}. Complete task(s)`);
        console.log(`${'6'.brightGreen}. Delete task`);
        console.log(`${'7'.brightGreen}. Exit\n`);
        
        //esto nos permitira que el usuario pueda interactuar con la aplicación 
        //la libreria de readline pertenece a node 
        const readline = require('readline').createInterface({
            output: process.stdout,
            input: process.stdin
        });

        readline.question('Choice an option: ', (opt) => {
            readline.close();
            resolve(opt) //la promesa se resolvera cuando el usuario ingresealgun dato 
        })
    })
}

// con esta funcion realizamos una pausa para que el usuario 
const pause = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            output: process.stdout,
            input: process.stdin
        });
    
        readline.question(`Press ${'INTRO'.bgGreen} to continue`, (opt) => {
            readline.close();
            resolve();
        })  
    })
}


module.exports = {
    showMenu,
    pause
}