import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class LeftMenu extends Component {

  render() {
    const style = {
      display: 'inline-block',
      marginTop: '10px'
    };

    return (
      <div>
        <Paper style = {style}>
          <Menu>
            <MenuItem onClick = {this.props.todayTasks} primaryText="Сегодня" />
            <MenuItem onClick = {this.props.weekTasks} primaryText="На неделю" />
            <MenuItem onClick = {this.props.renderCalendar} primaryText="Календарь" />
            <MenuItem onClick ={this.props.logOut} primaryText="Выйти" />
          </Menu>
        </Paper>
      </div>
    )
  }
}
