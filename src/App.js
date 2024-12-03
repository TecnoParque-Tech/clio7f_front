import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Presentation from './containers/Presentation';
import InformedConsent from './containers/InformedConsent';
import ListConsent from './containers/ListConsent';
import Footer from './components/Footer'; 
import Remember from './containers/Remember';
import TextIntroductory from './containers/TextIntroductory';
import SocioDemographic from './containers/SocioDemographic';
import Tool from './components/Tool';
import ToolLeader from './containers/ToolLeader';
import ToolTeam from './containers/ToolTeam';
import ToolOrganization from './containers/ToolOrganization';
import ToolComunication from './containers/ToolComunication';
import ToolEnvironment from './containers/ToolEnvironment';
import ToolCompensation from './containers/ToolCompensation';
import ToolBenefits from './containers/ToolBenefits';
import ValidationCompany from './containers/ValidationCompany';
import Acknowledgment from './containers/Acknowledgment';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/informedConsent" element={<><Navbar /><InformedConsent /><Footer /></>} />
        <Route path ="/listConsent" element={<><Navbar /><ListConsent /><Footer /></>} />
        <Route path ="/remember" element={<><Navbar /><Remember /></>} />
        <Route path ="/presentation" element={<><Navbar /><Presentation /> </>} />
        <Route path ="/sociodemographic" element={<><Navbar /><SocioDemographic /> </>} />
        <Route path ="/tool" element={<><Navbar /><Tool /> </>} />
        <Route path ="/toolleader" element={<><Navbar /><ToolLeader /> </>} />
        <Route path ="/toolteam" element={<><Navbar /><ToolTeam /> </>} />
        <Route path ="/toolorganization" element={<><Navbar /><ToolOrganization /> </>} />
        <Route path ="/toolcomunication" element={<><Navbar /><ToolComunication /> </>} />
        <Route path ="/toolenvironment" element={<><Navbar /><ToolEnvironment /> </>} />
        <Route path ="/toolcompensation" element={<><Navbar /><ToolCompensation /> </>} />
        <Route path ="/toolbenefits" element={<><Navbar /><ToolBenefits /> </>} />
        <Route path ="/textintroductory" element={<><Navbar /><TextIntroductory /> </>} />
        <Route path ="/acknowledgment" element={<><Navbar /><Acknowledgment /> </>} />


        <Route index path="/" element={<><Navbar /><ValidationCompany/> </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
