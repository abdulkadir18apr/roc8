import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import { Dashboard } from './pages/dashboard/dashboard';
import {PrivateRoute} from './components/PrivateRoute';
import Signup from './pages/login/Signup';
import { ChartView } from './pages/View/ChartView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

          <Route path='/dashboard' element={
            <PrivateRoute>
            <Dashboard />
            </PrivateRoute>
          } />

          <Route path='/view/:chartId' element={
            <PrivateRoute>
            <ChartView />
            </PrivateRoute>
          } />
      </Routes>
    </div>
  );
}

export default App;
