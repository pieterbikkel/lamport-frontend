import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/navbar/Nav';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Components from './pages/components/ComponentsDemo';
import AreaList from './pages/area-list/AreaList';
import AreaDetail from './pages/area-detail/AreaDetail';
import AreaEdit from './pages/area-edit/AreaEdit';
import LocationList from './pages/location-list/LocationList';
import LocationDetail from './pages/location-detail/LocationDetail';
import LocationEdit from './pages/location-edit/LocationEdit';
import Home from './pages/home/Home';
import FranchiseList from './pages/franchise-list/FranchiseList';
import FranchiseDetail from './pages/franchise-detail/FranchiseDetail';
import FranchiseEdit from './pages/franchise-edit/FranchiseEdit';
import GoalList from './pages/goal-list/GoalList';
import GoalDetail from './pages/goal-detail/GoalDetail';
import GoalEdit from './pages/goal-edit/GoalEdit';
import Login from './pages/login/Login';
import UserList from './pages/user-list/UserList';
import UserDetail from './pages/user-detail/UserDetail';
import Breadcrumb from './components/breadcrumb/Breadcrumb';
import UserEdit from './pages/user-edit/UserEdit';
import CommandEdit from './pages/command-edit/CommandEdit';
import QuestionEdit from './pages/question-edit/QuestionEdit';
import RoleList from './pages/role-list/RoleList';
import RoleDetail from './pages/role-detail/RoleDetail';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Nav/>
    <ToastContainer />
    <div className="page">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/components" element={<Components/>}/>
        <Route path="gebieden">
          <Route index element={<AreaList/>}/>
          <Route path=":id" element={<AreaDetail/>}/>
          <Route path="wijzigen/:id" element={<AreaEdit/>}/>
        </Route>
        <Route path="locaties">
          <Route index element={<LocationList />}/>
          <Route path=":id" element={<LocationDetail />}/>
          <Route path="wijzigen/:id" element={<LocationEdit />}/>
        </Route>
        <Route path="franchises">
          <Route index element={<FranchiseList />}/>
          <Route path=":id" element={<FranchiseDetail />}/>
          <Route path="wijzigen/:id" element={<FranchiseEdit />}/>
        </Route>
        <Route path="doelstellingen">
          <Route index element={<GoalList />}/>
          <Route path=":id" element={<GoalDetail />}/>
          <Route path="wijzigen/:id" element={<GoalEdit />}/>
        </Route>
        <Route path="gebruikers">
          <Route index element={<UserList />}/>
          <Route path="wijzigen/:id" element={<UserEdit />}/>
          <Route path=":id" element={<UserDetail />}/>
        </Route>
        <Route path="rollen">
          <Route index element={<RoleList />}/>
          {/* <Route path="wijzigen/:id" element={<UserEdit />}/> */}
          <Route path=":id" element={<RoleDetail />}/>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="commandos">
        {/* <Route index element={<CommandList />}/> */}
          {/* <Route path=":id" element={<CommandDetail />}/> */}
          <Route path="wijzigen/:id" element={<CommandEdit />}/>
        </Route>
        <Route path="vragen">
          {/* <Route index element={<QuestionList />}/> */}
          <Route path="wijzigen/:id" element={<QuestionEdit />}/>
          {/* <Route path=":id" element={<QuestionDetail />}/> */}
        </Route>
        <Route
        //todo 404
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h2>404 page not found</h2>
              <p>There's nothing here!</p>  
            </main>
          }
        />
        
      </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
