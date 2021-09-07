// import libaries 
import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route
 } from 'react-router-dom';
import firebase from './Firebase';
import moment from 'moment';
import 'moment/locale/sv'

// import components
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './components/navigation/Navigation';
import StartPage from './components/StartPage';
import Calendar from './components/calendar/calendarViews/Calendar';
import Login from './components/user/userControllers/Login';
import Signup from './components/user/userControllers/Signup';
import Sidenav from './components/navigation/navViews/Sidenav';


class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      userID: null, 
      sidenav: true, 
      loading: true
    };
  };


  componentDidMount() {

    demoAsyncCall().then(() => this.setState({ loading: false }));
    
    firebase
    .auth()
    .onAuthStateChanged(FirebaseUser => {
      if(FirebaseUser){
        this.setState({
          user: FirebaseUser,
          userID: FirebaseUser.uid
        });

        const tasksRef = firebase
          .database()
          .ref('react-calendar/app/calendar/' + FirebaseUser.uid);

        tasksRef.on('value', snapshot => {

          let tasks = snapshot.val();
          let tasksList = [];
          let noneCheckedTasks = [];

          for (let item in tasks) {
            tasksList.push({
              taskID: item,
              taskName: tasks[item].taskName,
              taskDate: tasks[item].taskDate,
              taskShortDate: tasks[item].taskShortDate,
              taskChecked: tasks[item].taskChecked
            });

            // check if task is checked or not, if not checked -> push to array
            if(tasks[item].taskChecked === false) {
              noneCheckedTasks.push({
                taskChecked: tasks[item].taskChecked
              })
            }
          }

          this.setState({
            tasks: tasksList,
            howManyTasks: noneCheckedTasks.length
          });
        })  
      } else {
        this.setState({ user: null });
      }
    });
  }

  // show or hide sidenav 
  showSidenav = () => {
    this.setState({
      sidenav : !this.state.sidenav
    })
  };


  // add task 
  addTask = (taskName, taskDate, taskShortDate, taskChecked) => {
    const ref = firebase
        .database()
        .ref(`react-calendar/app/calendar/${this.state.user.uid}`);
    ref.push({
      taskName:taskName, 
      taskDate:taskDate, 
      taskShortDate:taskShortDate,
      taskChecked:taskChecked
    })
  };



  // register user
  registerUser = (history) => {
      firebase
      .auth()
      .onAuthStateChanged(FirebaseUser => {
        this.setState({
          user: FirebaseUser,
          userID: FirebaseUser.uid
        });
      history.push('/react-calendar/app/calendar');
    })
  };


  // log out 
  logOutUser = (e, history) => {
      e.preventDefault();
      this.setState({
        user: null,
        userID: null
      });

      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('utloggad');
          console.log(this.state.user);
          history.push('/react-calendar');
      })
  };

  render() {

    const { loading } = this.state;

    if(loading) {
      return null;
    }

  return (
    <div className='App'>
        <Router>
            <Container fluid>
                <Row>
                    {this.state.user && (<Col xs={this.state.sidenav? '3' : '0'} className={this.state.sidenav ? 'sidenav-wrap is-active border-right' : 'sidenav-wrap not-active'}>
                        <Sidenav 
                          user={this.state.user}
                          tasks={this.state.tasks}
                          userID={this.state.userID}
                          todaysDate={this.state.todaysDate}
                          todaysDateDayAndMonth={this.state.todaysDateDayAndMonth}
                          toggleDropDown={this.toggleDropDown}
                          /> 
                    </Col>
                    )}
                    <Col>
                    <Navigation
                        path='/react-calendar/:app?/:app2?'
                        user={this.state.user}
                        logOutUser={this.logOutUser}
                        sidenav={this.state.sidenav}
                        showSidenav={this.showSidenav}
                        howManyTasks={this.state.howManyTasks}/> 
                    <Switch>
                      <Route 
                          exact path='/react-calendar'>
                          <StartPage
                              user={this.state.user}/> 
                      </Route>
                      <Route
                          path='/react-calendar/app/calendar'>
                          <Calendar 
                              addTask={this.addTask}
                              tasks={this.state.tasks}
                              userID={this.state.userID}/> 
                      </Route>
                      <Route 
                          path='/react-calendar/users/login'>
                          <Login /> 
                      </Route> 
                      <Route 
                          path='/react-calendar/users/signup'>
                          <Signup 
                              registerUser={this.registerUser}/> 
                      </Route> 
                    </Switch>
                    </Col>
                </Row>
            </Container>
         </Router>
    </div>
  );
}
}


function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}


export default App;
