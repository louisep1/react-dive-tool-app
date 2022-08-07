import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/shared/NavBar'
import Footer from './components/shared/Footer'
import UserBtn from './components/shared/UserBtn'

import HomePage from './pages/HomePage';
import DiveLogPage from './pages/DiveLogPage';
import TravelPlannerPage from './pages/TravelPlannerPage';
import WeatherPage from './pages/WeatherPage';
import DiveMapPage from './pages/DiveMapPage';
import SignInUp from './pages/SignInUp';
import AccountPage from './pages/AccountPage';
// import ProtectedRoutes from './pages/ProtectedRoutes'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <UserBtn />
        <Routes>
          <Route path='' element={
            <HomePage />
          }>
          </Route>

          <Route path='/dive-log' element={
            <DiveLogPage />
          }>
          </Route>

          <Route path='/travel-planner' element={
            <TravelPlannerPage />
          }>
          </Route>

          <Route path='/weather' element={
            <WeatherPage />
          }>
          </Route>

          <Route path='/dive-map' element={<DiveMapPage />} />

          <Route path='/sign-in-up' element={<SignInUp />} />

          {/* <Route element={<ProtectedRoutes />}>
            <Route path='/sign-in-up' element={<SignInUp />} />
          </Route> */}



          <Route path='/account' element={<AccountPage />} />

        </Routes>
        <Footer />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
