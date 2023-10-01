const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1'.brightGreen}. Create task`
            },
            {
                value: '2',
                name: `${'2'.brightGreen}. List tasks`
            },
            {
                value: '3',
                name: `${'3'.brightGreen}. List completed tasks`
            },
            {
                value: '4',
                name: `${'4'.brightGreen}. List pending tasks`
            },
            {
                value: '5',
                name: `${'5'.brightGreen}. Complete task(s)`
            },
            {
                value: '6',
                name: `${'6'.brightGreen}. Delete task`
            },
            {
                value: '0',
                name: `${'0'.brightGreen}. Exit`
            }
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('======================'.rainbow);
    console.log('       To do app '.brightBlue);
    console.log('======================\n'.rainbow);

    let {option} = await inquirer.prompt(questions)

    return option
}

const pause = async() => {

    const intro = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${' INTRO '.bgBlue} to continue`
        }
    ];

    console.log('\n')
    await inquirer.prompt(intro);
}

const readInput = async( message ) => {

    const read = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0){
                    return 'Prease, enter a value '
                }

                return true
            }
        }
    ];

    const {desc} = await inquirer.prompt(read);
    return desc
}

//utilizaremos esta funcion para listar las tareas creadas y posteriormente eliminarlas
const listTasksToDelete = async (tasks = []) => {
    const choices = tasks.map((task, idx) => {
        const i = `${idx + 1}.`.brightRed;

        return{
            value: task.id,
            name: `${i} ${task.desc}`
        }
    });

    //esto solo sera una opcion de apoyo para cancelar el menu de borrado 
    choices.unshift({
        value: '0',
        name: '0. Cancelar'.yellow
    });

    const questionToDelete = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questionToDelete);

    return id;
}

const confirm = async(message) => {

    const confirmQuestion = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(confirmQuestion);

    return ok

}

const showListChecklist = async (tasks = []) => {

    const choices = tasks.map((task, idx) => {
        const i = `${idx + 1}.`.brightRed;

        return{
            value: task.id,
            name: `${i} ${task.desc}`,
            checked: task.completeAt ? true : false
        }
    });
    
    const checklistQuestion = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'You have selected',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(checklistQuestion);

    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    confirm,
    showListChecklist
};
