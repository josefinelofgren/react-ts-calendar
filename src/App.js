// import libaries 
import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route
 } from 'react-router-dom';
import firebase from './Firebase';

// import components
import Navigation from './components/navigation/Navigation';
import StartPage from './components/StartPage';
import CalendarPage from './components/calendar/calendarViews/CalendarPage';
import Login from './components/user/userControllers/Login';
import Signup from './components/user/userControllers/Signup';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      userID: null, 
      sidenav: true, 
    };
  };

  componentDidMount() {
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
          .ref('app/calendar/' + FirebaseUser.uid);

        tasksRef.on('value', snapshot => {

          let tasks = snapshot.val();
          let tasksList = [];

          for (let item in tasks) {
            tasksList.push({
              taskID: item,
              taskName: tasks[item].taskName,
              taskDate: tasks[item].taskDate,
              taskShortDate: tasks[item].taskShortDate,
              taskChecked: tasks[item].taskChecked
            });
          }

          this.setState({
            tasks: tasksList,
            howManyTasks: tasksList.length
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
        .ref(`app/calendar/${this.state.user.uid}`);
    ref.push({
      taskName:taskName, 
      taskDate:taskDate, 
      taskShortDate:taskShortDate,
      taskChecked:taskChecked
    })

    console.log(taskName);
    console.log(taskDate);
    console.log(taskShortDate)
    console.log(taskChecked)
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
      history.push('/app/calendar');
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
          history.push('/');
      })
  };

  render() {

  return (
    <div className='App'>
      <Router>
        <Navigation
         path='/:app?/:app2?'
         user={this.state.user}
         logOutUser={this.logOutUser}
         sidenav={this.state.sidenav}
         showSidenav={this.showSidenav}
         howManyTasks={this.state.howManyTasks}/> 
        <Switch>
          <Route 
            exact path='/'
            component={StartPage}/> 
          <Route
            path='/app/calendar'>
              <CalendarPage 
                sidenav={this.state.sidenav}
                showSidenav={this.showSidenav}
                addTask={this.addTask}
                tasks={this.state.tasks}
                userID={this.state.userID}
                /> 
          </Route>
          
          <Route 
            path='/users/login'>
              <Login /> 
          </Route> 
          <Route 
            path='/users/signup'>
              <Signup registerUser={this.registerUser}/> 
          </Route> 
        </Switch>
      </Router>
    </div>
  );
}
}

export default App;
