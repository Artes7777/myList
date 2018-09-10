import uuid from 'uuid/v4';


export default class TaskManager {

  init() {
    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);
    if (!tasks) {
      tasks =  [];
    }
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  addTask(title) {
    let newTask = {
      id: uuid(),
      title: title,
      createdAt : (new Date()).getTime()
    };
    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(id){
    return new Promise( (resolve, reject) => {
      let index = this.tasks.findIndex( (task) => {
        return task.id === id;
      })
        this.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return resolve();
      });
  }

  toggleTask(id) {
    return new Promise( (resolve, reject) => {
      let tasks = this.tasks;
      let index = tasks.findIndex( (task)=> {
        return task.id === id;
      });

      tasks[index].isdone = !tasks[index].isdone;
      tasks[index].updatedAt = (new Date()).getTime();

      localStorage.setItem('tasks', JSON.stringify(tasks));
      return resolve();
    });
  }


  multiplyDelete(ids) {
    this.tasks = this.tasks.filter( task =>! ids.has(task.id) );

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
