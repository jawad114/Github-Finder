import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Home from './component/pages/Home';
import About from './component/pages/About';
import NotFound from './component/pages/NotFound';
import { GithubProvider } from './component/context/github/GithubContext';
import { AlertProvider } from './component/context/alert/AlertContext';
import Alert from './component/layout/Alert';
import User from './component/users/User';
function App() {
  return (
    <GithubProvider>
    <AlertProvider>
    <Router>
    <div className='flex flex-col justify-between h-screen'>
      <Navbar/>
      <main className='container mx-auto px-3 pb-12'>
      <Alert/>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/about' Component={About}/>
        <Route path='/user/:login' Component={User}/>
        <Route path='notfound' Component={NotFound}/>
        <Route path='/*' Component={NotFound}/>
      </Routes>
      </main>
      <Footer/>
    </div>
    </Router>
    </AlertProvider>
    </GithubProvider>
    
  );
}

export default App;
