import uuid from 'uuid/v4';
import fire from '../fire';


export default class TaskManager {

  constructor() {
    this.db = fire.database();
  }

  init() {
    return this.db.ref('/tasks').once('value')
      .then( (snapshot) => {
        const tasksDb = snapshot.val() || {};
        this.tasks = Object.values(tasksDb);
      });
  }

  getTasks() {
    return this.tasks;
  }

  validateTask(title) {
    if (title === '') {
      throw new Error ("Введите задачу");
    }
    const isDuplicate = this.tasks.some((task) => {
      return task.title === title;
    });
    if (isDuplicate) {
      throw new Error ("Такая задача существует");
    }
  }

  addTask(title) {
    return new Promise ((resolve, reject ) => {
        try {
        this.validateTask(title);
      } catch (err) {
        return reject(err);
      }

      const newTask = {
        id: uuid(),
        title: title,
        createdAt : (new Date()).getTime()
      };

      return this.db.ref(`/tasks/${newTask.id}`).set(newTask)
        .then( () => {
          this.tasks.push(newTask);
          return resolve();
        });
    });
  }

  deleteTask(id) {
    return this.db.ref(`/tasks/${id}`).remove()
      .then( () =>  {
        const index = this.tasks.findIndex( (task) =>  task.id === id );
        this.tasks.splice(index, 1);
      });
  }

  toggleTask(id) {
    return this.db.ref(`/tasks/${id}`).once('value')
      .then( (snapshot) => {
        const isdone = (snapshot.val() && snapshot.val().isdone) || false;
        const updatedAt = (new Date()).getTime();
        return this.db.ref(`tasks/${id}`).update({
          isdone : !isdone ,
          updatedAt : updatedAt
        })
          .then( () => {
            const tasks = this.tasks;
            const index = tasks.findIndex( (task)=> task.id === id);

            tasks[index].isdone = !isdone;
            tasks[index].updatedAt = updatedAt;
          });
      });
  }


  multiplyDelete(ids) {
    const updates = {};
    ids.forEach ( (id) => {
      updates[`/tasks/${id}`] = null;
    });

    return this.db.ref().update(updates)
      .then( () => {
        this.tasks = this.tasks.filter( task =>! ids.has(task.id) );
      });
  }

}
