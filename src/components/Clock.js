import React, {Component} from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);
      this.state = { clockNow : (new Date()).toLocaleString() }
  }
  render() {
    return ( <div>{this.state.clockNow}</div>
    )
  }
}
export default Clock;
