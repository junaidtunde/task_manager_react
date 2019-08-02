import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

// Import Components
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import AdminLogin from './components/admin/auth/AdminLogin'
import Dashboard from './components/admin/dashboard/Dashboard'
import Test from './components/Test'

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/test" component={Test} />
          <Route exact path="**" component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App

