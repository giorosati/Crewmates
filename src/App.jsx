import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadCrewmembers from './pages/ReadCrewmembers'
import CreateCrewmember from './pages/CreateCrewmember'
import EditCrewmember from './pages/EditCrewmember'
import ViewCrewmember from './pages/ViewCrewmember'
import { Link } from 'react-router-dom'


const App = () => {
  
  // const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

  // sample crewmembers (kept for reference)
  // const crewmembers = [
  //   {'id':'1', 'name': 'Cartwheel in Chelsea 🤸🏽‍♀️', 'rank':'Harvey Milian', 'details': descr},
  //   {'id':'2', 'name': 'Love Lock in Paris 🔒', 'rank':'Beauford Delaney', 'details':descr},
  //   {'id':'3', 'name': 'Wear Pink on Fridays 🎀', 'rank':'Onika Tonya', 'details':descr},
  //   {'id':'4', 'name': 'Adopt a Dog 🐶', 'rank':'Denise Michelle', 'details':descr},
  // ]


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadCrewmembers />
    },
    {
      path:"/edit/:id",
      element: <EditCrewmember />
    },
      {
        path: "/view/:id",
        element: <ViewCrewmember />
      },
      {
        path: "/crewmate/:id",
        element: <ViewCrewmember />
      },
      {
        path: "/crewmates/:id",
        element: <ViewCrewmember />
      },
    {
      path:"/new",
      element: <CreateCrewmember />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>Crewmembers</h1>
        <Link to="/"><button className="headerBtn"> List Crewmembers 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Add Crewmember ➕ </button></Link>
      </div>
        {element}
    </div>

  )
}

export default App
