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
import Navigation from './components/navigation/navViews/Navigation';
import StartPage from './components/StartPage';
import Calendar from './components/calendar/calendarViews/Calendar';
import Login from './components/user/userControllers/Login';
import Signup from './components/user/userControllers/Signup';
import Sidenav from './components/navigation/navViews/Sidenav';

interface Props {

}

interface States {
    user: any
    userID: string | null,
    sidenav: boolean,
    loading: boolean,
    tasks: object,
    howManyTasks: number
}


class App extends Component <Props, States> {

  state = {
    user: null,
    userID: null,
    sidenav: true,
    loading: true,
    tasks: [],
    howManyTasks: 0
  }

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
          let allTasksRemaining = [];

          for (let item in tasks) {
            tasksList.push({
              taskID: item,
              taskName: tasks[item].taskName,
              taskDate: tasks[item].taskDate,
              taskShortDate: tasks[item].taskShortDate,
              taskChecked: tasks[item].taskChecked
            });

            // push to array if task is before or today and not checked
            let todaysDate = moment().format('YYYYMMDD');
            if(moment(tasks[item].taskDate).isBefore(todaysDate) || moment(tasks[item].taskDate).isSame(todaysDate)){
              if(tasks[item].taskChecked === false){
                  allTasksRemaining.push({
                  taskChecked: tasks[item].taskChecked
                })
              }
            }
          }

          this.setState({
            tasks: tasksList,
            howManyTasks: allTasksRemaining.length
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
  addTask = (taskName: string, taskDate: string, taskShortDate: string, taskChecked: boolean) => {
    if(this.state.user == null){
      console.log('No user found')
    } else {
      const ref = firebase
      .database()
      .ref(`react-calendar/app/calendar/${this.state.userID}`);
      ref.push({
          taskName:taskName, 
          taskDate:taskDate, 
          taskShortDate:taskShortDate,
          taskChecked:taskChecked
      })
    }
  };


  // register user
  registerUser = (history: any) => {
      firebase
      .auth()
      .onAuthStateChanged(FirebaseUser => {
        this.setState({
          user: FirebaseUser,
          userID: FirebaseUser!.uid
        });
      history.push('/react-calendar/app/calendar');
    })
  };


  // log out 
  logOutUser = (e:any, history: any) => {
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
            <Container fluid className='body-container'>
                <Row>
                    {this.state.user && (<Col xs='3' className={this.state.sidenav ? 'sidenav-wrap is-active border-right' : 'sidenav-wrap not-active'}>
                        <Sidenav 
                          user={this.state.user}
                          tasks={this.state.tasks}
                          userID={this.state.userID}
                          sidenav={this.state.sidenav}
                          /> 
                    </Col>
                    )}
                    <Col>
                    <Navigation
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
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 2500));
}


export default App;
