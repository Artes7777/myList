import fire from '../../fire';
import uuid from 'uuid/v4';
import {validateTask} from '../../helpers';
import {numberValue} from '../../consts';

export const SET_TASKS = 'SET_TASKS';
export const SET_TASK = 'SET_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASKS = 'DELETE_TASKS';


const db = fire.database();

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks
})

export const setTask = (newTask) => ({
  type: SET_TASK,
  payload: newTask
})

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id
})

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task
})

export const deleteTasks = (ids) => ({
  type: DELETE_TASKS,
  payload: ids
})



export const thunkCreatorInit = () => {
  return (dispatch) => {
    return db.ref('/tasks').orderByChild("createdAt").once('value')
      .then((snapshot) => {
        const tasks = [];
        snapshot.forEach( (child) => {
          tasks.push(child.val());
          });
        dispatch(setTasks(tasks));
      })
      .catch( (err) => {
        console.log(err);
      });
  }
}

export const thunkCreatorAddTask = (title, date) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        validateTask(title, date);
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

      return db.ref(`/tasks/${newTask.id}`).set(newTask)
        .then(() => {
          dispatch(setTask(newTask));
          return resolve();
        });
    });
  }
}

export const thunkCreatorDeleteTask = (id) => {
  return(dispatch) => {
    return db.ref(`/tasks/${id}`).remove()
      .then(() => {
        dispatch(deleteTask(id));
      });
  }
}

export const thunkCreatorToggleTask = (id) => {
  return(dispatch) => {
    return db.ref(`/tasks/${id}`).once('value')
      .then((snapshot) => {
        const task = snapshot.val();
        const isdone = (task && task.isdone) || false;
        const updatedAt = (new Date()).getTime();
        return db.ref(`tasks/${id}`).update({
          isdone: !isdone,
          updatedAt,
        })
          .then(() => {
            task.isdone = !isdone;
            task.updatedAt = updatedAt;
            dispatch(updateTask(task));
          });
      });
  }
}

export const thunkCreatorDeleteTasks = (ids) => {
  return(dispatch) => {
    const updates = {};
    ids.forEach((id) => {
      updates[`/tasks/${id}`] = null;
    });

    return db.ref().update(updates)
    .then(() => {
      dispatch(deleteTasks(ids));
    });
  }
}

export const thunkCreatorChangePriority = (id, priority) => {
  return(dispatch) => {
    return db.ref(`/tasks/${id}`).once('value')
    .then((snapshot) => {
      const task = snapshot.val();
      return db.ref(`tasks/${id}`).update({
        numberValue : priority
      })
      .then(() => {
        task.numberValue =  priority;
        dispatch(updateTask(task));
      });
    });
  }
}
