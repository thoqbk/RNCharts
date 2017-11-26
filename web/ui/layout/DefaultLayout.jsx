import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

class DefaultLayout extends Component {

  render() {
    return <div>
        <Header currentUser={this.props.currentUser}/>
        {this.props.children}
        <Footer />
      </div>
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(DefaultLayout);
