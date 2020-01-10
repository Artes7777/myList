import React, { Component } from 'react';
import List from './List.js';
import Input from './input.js';
import Filters from './Filters';
import MultiplyAct from './MultiplyAct.js';
import DatePick from './DatePicker.js';
import LeftMenu from './LeftMenu.js';
import MyCalendar from './Calendar';
import fire from "../fire";
import Peca from "../peca.png";
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import {connect} from "react-redux";
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import {thunkCreatorInit} from '../store/app/actions';
import {showTodayTasks, setDailyTasks, setCalendarTasks, showWeekTasks} from '../store/date/actions';
import Media from 'react-media'

class App extends Component {
  constructor (props) {
    super (props);
    this.auth = fire.auth();
  }

  componentDidMount(){
    this.props.thunkCreatorInit()
  }

   logOut = () => {
      fire.auth().signOut()
     .then(() => {
       this.props.history.push("/auth")
     })
   }

  displayUserName = () => {
    if (this.auth.currentUser != null) {
      return this.auth.currentUser.displayName
    }
  }

  todayTasks = () => {
    this.props.showTodayTasks()
    this.props.setDailyTasks()
  }

  weekTasks = () => {
    this.props.showWeekTasks()
    this.props.setDailyTasks()
  }

  renderCalendar = () => {
    this.props.showTodayTasks()
    this.props.setCalendarTasks()
  }

  render() {

    const isTaskEmpty = this.props.tasks.length < 1;


    return (
      <div id = "WrapperApp">
        <div id = "Leftmenu">
          <LeftMenu logOut = {this.logOut} />
        </div>
        <div id = "appContainer">
          <h1>Список задач</h1>
          <Input/>
          <Media query = "(max-width : 730px)">
          {matches => {
            return matches ?
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            >
            <MenuItem onClick = {this.todayTasks} primaryText="Сегодня" />
            <MenuItem onClick = {this.weekTasks} primaryText="На неделю" />
            <MenuItem onClick ={this.logOut} primaryText="Выйти"/>
            </IconMenu> :
            null
          }}
          </Media>
          {!isTaskEmpty ? <MultiplyAct/> : null}
          {this.props.todayOrCalendar === "today" ? <DatePick /> : null}
          <List/>
          <Filters/>
        </div>
        <div id = "Calendar">
        <div className = 'AvaName'>
            <ListItem
              style = {{height: '80px'}}
              leftAvatar = { <Avatar size={60} src={Peca}/> }
            />
            <div className = 'Username'>{this.displayUserName()}</div>
        </div>
          {this.props.todayOrCalendar === "calendar" ? <MyCalendar /> : null}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  thunkCreatorInit,
  showTodayTasks,
  setDailyTasks,
  setCalendarTasks,
  showWeekTasks
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
    todayOrCalendar: state.date.todayOrCalendar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
