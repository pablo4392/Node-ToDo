// El modelo de esta clase nos permitira dara los siguientes tributos a cada tarea que nosotros creemos en la palicacion
const { v4: uuidv4 } = require('uuid');

class Task {

    id='';
    desc='';
    completeAt = null;

    constructor( desc ) {

        this.id = uuidv4();
        this.desc = desc;
        this.completeAt = null;

    }

}

module.exports = Task