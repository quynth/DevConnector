import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';

if (localStorage.jwtToken) {
  //Set token to auth header
  setAuthToken(localStorage.jwtToken);

  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
