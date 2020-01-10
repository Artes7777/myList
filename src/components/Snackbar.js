import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import {setSnackbarClose} from '../store/snackbar/actions';
import {connect} from "react-redux";

class SnackbarComponent extends Component {

  render() {
    return (

      <Snackbar
        open={this.props.open}
        message = {this.props.error}
        autoHideDuration={4000}
        onRequestClose={this.props.setSnackbarClose}
      />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.snackbar.error,
    open: state.snackbar.open

  }
}

const mapDispatchToProps = {
setSnackbarClose
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarComponent)
