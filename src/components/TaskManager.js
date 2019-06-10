import uuid from 'uuid/v4';
import fire from '../fire';
import {numberValue} from '../consts';

export default class TaskManager {
  constructor() {
    this.db = fire.database();
  }

  init() {
    return this.db.ref('/tasks').orderByChild("createdAt").once('value')
      .then((snapshot) => {
        this.tasks = [];
        snapshot.forEach( (child) => {
          this.tasks.push(child.val());
        });
      });
  }

  getTasks() {
    return this.tasks;
  }

  validateTask(title, date) {
    if (title === '') {
      throw new Error('Введите задачу');
    }
    if (date === null) {
      throw new Error('Выберите дату')
    }
  }

  addTask(title, date) {
    return new Promise((resolve, reject) => {
      try {
        this.validateTask(title, date);
      } catch (err) {
        return reject(err);
      }

      const newTask = {
        id: uuid(),
        title,
        onDateTask : date.getTime(),
        createdAt: (new Date()).getTime(),
        numberValue: numberValue.normal,
      };

      return this.db.ref(`/tasks/${newTask.id}`).set(newTask)
        .then(() => {
          this.tasks.push(newTask);
          return resolve();
        });
    });
  }

  deleteTask(id) {
    return this.db.ref(`/tasks/${id}`).remove()
      .then(() => {
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(index, 1);
      });
  }

  toggleTask(id) {
    return this.db.ref(`/tasks/${id}`).once('value')
      .then((snapshot) => {
        const isdone = (snapshot.val() && snapshot.val().isdone) || false;
        const updatedAt = (new Date()).getTime();
        return this.db.ref(`tasks/${id}`).update({
          isdone: !isdone,
          updatedAt,
        })
          .then(() => {
            const tasks = this.tasks;
            const index = tasks.findIndex(task => task.id === id);

            tasks[index].isdone = !isdone;
            tasks[index].updatedAt = updatedAt;
          });
      });
  }


  multiplyDelete(ids) {
    const updates = {};
    ids.forEach((id) => {
      updates[`/tasks/${id}`] = null;
    });

    return this.db.ref().update(updates)
      .then(() => {
        this.tasks = this.tasks.filter(task => !ids.has(task.id));
      });
  }

  addNumberValue(id, priority) {
    return this.db.ref(`/tasks/${id}`).once('value')
    .then((snapshot) => {

      return this.db.ref(`tasks/${id}`).update({
        numberValue : priority
      })
      .then(() => {
        const tasks = this.tasks;
        const index = tasks.findIndex(task => task.id === id);

        tasks[index].numberValue =  priority;
      });
    });
  }

}
