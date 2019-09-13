import React, { Component } from 'react';
import List from './List.js';
import Input from './input.js';
import Filters from './Filters';
import TaskManager from './TaskManager';
import MultiplyAct from './MultiplyAct.js';
import DatePick from './DatePicker.js';
import LeftMenu from './LeftMenu.js';
import fire from "../fire";
import Peca from "../peca.png";
import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.auth = fire.auth();
    this.state = {
      tasks : [],
      filter : 'all',
      selected : new Set(),
      isSelectedAll: false,
      date: new Date(),
      todayOrCalendar : null,
  };
    this.taskManager = new TaskManager();
  }

  componentDidMount(){
    return this.taskManager.init()
      .then( () => {
        this.setState({tasks : this.taskManager.getTasks()});
      })
    .catch( (err) => {
      console.log(err);
    });
  }

   logOut = () => {
      fire.auth().signOut()
     .then(() => {
       this.props.history.push("/auth")
     })
   }


  onChange = date => this.setState({ date })

  setFilter = (value) => {
    this.setState({filter : value });
  }

  todayTasks = () => {
    const today = new Date();
    this.setState({date : today});
    this.setState({todayOrCalendar : "today"})
  }

  weekTasks = () => {
    this.setState({date : null});
    this.setState({todayOrCalendar : "today"})
  }

  renderCalendar = () => {
    const today = new Date();
    this.setState({date : today});
    this.setState({todayOrCalendar : "calendar"})
  }

  toggleTask = (id) => {
    return this.taskManager.toggleTask(id)
      .then( () => {
        this.setState({tasks : this.taskManager.getTasks()});
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  addTask = (title) => {
    const date = this.state.date;
    return this.taskManager.addTask(title, date)
      .then( () => {
        this.setState ({
          tasks : this.taskManager.getTasks()
        });
      })
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }

  validateAllDeleteCheckbox = () => {
    const {selected} = this.state;
    if (selected.size < 1) {
      this.setState({ isSelectedAll : false });
    }
  }

  deleteTask = (id) => {
    const selected = this.state.selected;
    return this.taskManager.deleteTask(id)
      .then( () => {
        selected.delete(id);
        this.setState({ tasks: this.taskManager.getTasks(),
                        selected: selected});
        this.validateAllDeleteCheckbox();
      })
     .catch( (err) => {
       console.log(err);
     });
  }

  isSelectedInFilter = () => {
    const ids = this.state.selected;
    return this.state.tasks.some( (task) => {
      return ids.has(task.id) && this.isTaskInFilter(task) && this.isTaskInDate(task) ;
    });
  }

  multiplyDeleteTasks = () => {
    const ids = this.state.selected;
    const filteredIds = new Set();
    this.state.tasks.forEach( (task) => {
      if (ids.has(task.id) && this.isTaskInFilter(task) && this.isTaskInDate(task)) {
        filteredIds.add(task.id);
        ids.delete(task.id);
      }
    });
    return  this.taskManager.multiplyDelete(filteredIds)
    .then( () => {
      this.setState({ tasks: this.taskManager.getTasks(),
                      selected : ids });
      this.validateAllDeleteCheckbox();
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  selectAll = (select) => {
    const {tasks, selected} = this.state;

    tasks.forEach ( (task) => {
      if (select) {
        selected.add(task.id);
      }
      else {
        selected.delete(task.id);
      }
    });

    this.setState({ selected: selected });
  }

  selectTask = (id, checked) => {
    const {selected} = this.state;

    if (checked) {
      selected.add(id);
    }
    else {
      selected.delete(id);
    }
    this.setState({ selected: selected});
  }

  toggleSelect = (isInputChecked) => {
    this.setState({ isSelectedAll : isInputChecked });
    this.selectAll(isInputChecked)
  }

  isTaskInFilter = (task) => {
    switch(this.state.filter) {
      case "all" :
        return true;
      case "completed" :
        return task.isdone;
      case "incompleted" :
        return !task.isdone;
      default:
        return true;
    }
  }

  isTaskInDate = (task) => {
    if  (moment(this.state.date).isSame(moment(task.onDateTask), 'day') )   {
    return moment(task.onDateTask).calendar();

    }
    else if (this.state.date === null &&
      moment(task.onDateTask).isAfter(moment().subtract(1, 'days')) &&
      moment(task.onDateTask).isBefore(moment().add(6, 'days')) ) {
        return  (moment(task.onDateTask).calendar()) ;
    }
  }



  filterTasks = () => {
    return ( this.state.tasks.filter(this.isTaskInDate).filter(this.isTaskInFilter) )
  }

  groupTasks = () => {
    if (this.state.date === null) {

    }
  }


  addNumberValue = (id, priority) => {
    return this.taskManager.addNumberValue(id, priority)
      .then( () => {
        this.setState({tasks : this.taskManager.getTasks()});
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  displayUserName = () => {
    if (this.auth.currentUser != null) {
      return this.auth.currentUser.displayName
    }
  }

  render() {
    console.log(this.auth.currentUser);

    const { tasks, filter, selected, date, isSelectedAll, todayOrCalendar } = this.state;
    const filteredTasks = this.filterTasks();

    const isTaskEmpty = tasks.length < 1;
    const isSelectedEmpty = this.state.selected.size < 1;

    return (
      <div id = "Wrapper">
      <div>
      <LeftMenu
      weekTasks = {this.weekTasks}
      todayTasks = {this.todayTasks}
      renderCalendar = {this.renderCalendar}
      logOut = {this.logOut}
      />
      </div>
      <div id = "appContainer">
        <h1>Список задач</h1>
        <Input
          addTask = {this.addTask}
        />

        {
          !isTaskEmpty ?
            <MultiplyAct
              toggleSelect = {this.toggleSelect}
              multiplyDeleteTask = {this.multiplyDeleteTasks}
              isSelectedAll = {isSelectedAll}
              isSelectedEmpty = {isSelectedEmpty}
              isSelectedInFilter = {this.isSelectedInFilter()}
            />
            : null
        }

        <DatePick
          onChange = {this.onChange}
          date = {date}
          todayOrCalendar = {todayOrCalendar}
          isTaskEmpty = {isTaskEmpty}
        />

        <List
          tasks = {filteredTasks}
          date = {date}
          selected = {selected}
          deleteTask = {this.deleteTask}
          toggleTask = {this.toggleTask}
          selectTask = {this.selectTask}
          addNumberValue = {this.addNumberValue}
        />

        <Filters
          filter = {filter}
          setFilter = {this.setFilter}
        />

      </div>
      <div>
      <ListItem
        style = {{marginTop : "10px"}}
        leftAvatar = {
         <Avatar
           src={Peca}
         />
        }
       >{ this.displayUserName()}
       </ListItem>
      </div>
      </div>
    )
  }
}

export default App;
