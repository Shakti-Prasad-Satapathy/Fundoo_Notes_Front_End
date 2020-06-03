//import {} from 'dotenv/config';
//import dotenv from 'dotenv'
//dotenv.config()
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import {browserHistory} from 'react-router';
import './App.css';
// import Header from './Components/Header/Header';
// import Footer from './Components/Footer/Footer';
import Login from './Components/Pages/Forms/Login';
import Registration from './Components/Pages/Forms/Registration';
import ResetPassword from './Components/Pages/Forms/ResetPassword';
// import AllNotes from './Components/Pages/Notes/Notes';
import AllNotes from './Components/Pages/Notes/Notes';
import Archive from './Components/Pages/Archive/GetAllArchive';
import Trash from './Components/Pages/Trash/ShowTrash';
import SearchNote from './Components/Header/Search';
import Rem from './Components/Pages/Reminder/Reminder';

import Asdxcghjjmm from './Components/Pages/Lables/RemoveLable';



// const App = () => {
 
function App(props) {
  return (
    <BrowserRouter >
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/allnotes" component={AllNotes} props={props} />
          <Route path="/archive" component={Archive} />
          <Route path="/trash" component={Trash} />
          <Route path="/searchNote" component={SearchNote} />
          <Route path="/rem" component={Rem} />
          <Route path="/asdxcghjjmm" component={Asdxcghjjmm} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
