import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css';
import ListClientComponent from './components/ListClientComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateClientComponent from './components/CreateClientComponent';
import UpdateClientComponent from './components/UpdateClientComponent';
import CreateKaskoComponent from './components/CreateKaskoComponent';
import Popup from './components/Popup';
import OfferComponent from './components/OfferComponent';
import CreateHomeComponent from './components/CreateHomeComponent';
import OfferHomeComponent from './components/OfferHomeComponent';


function App() {
 
  return (
    <div  >
      <Router>
      <HeaderComponent/>
      <div className="container" >
      <Routes>
                
                <Route  exact path="/"   element={<ListClientComponent/>} >
                </Route>
                <Route  path="/clients"  element={<ListClientComponent/>}>
                </Route>
                <Route  path="/add-client"  element={<CreateClientComponent/>}>
                </Route>
                <Route  path="/edit-client/:id"  element={<UpdateClientComponent/>}>
                </Route>
                <Route  path="/add-kasko/:id"  element={<CreateKaskoComponent/>}>
                </Route>
               <Route path="/offer-kasko/:id" element={<OfferComponent/>}>
               </Route>
               <Route  path="/add-home/:id"  element={<CreateHomeComponent/>}>
                </Route>
                <Route path="/offer-home/:id" element={<OfferHomeComponent/>}>
               </Route>

                

                
                
      </Routes>

    
      </div>
      
      </Router>
    </div>
  );
}

export default App;
