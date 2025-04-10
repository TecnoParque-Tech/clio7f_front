import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { SurveyProvider } from "./SurveyContext";

import Navbar from "./components/Navbar";
import Presentation from "./containers/Presentation";
import InformedConsent from "./containers/InformedConsent";
import ListConsent from "./containers/ListConsent";
import Footer from "./components/Footer";
import Remember from "./containers/Remember";
import TextIntroductory from "./containers/TextIntroductory";
import SocioDemographic from "./containers/SocioDemographic";
import Tool from "./components/Tool";
import ToolLeader from "./containers/ToolLeader";
import ToolTeam from "./containers/ToolTeam";
import ToolOrganization from "./containers/ToolOrganization";
import ToolComunication from "./containers/ToolComunication";
import ToolEnvironment from "./containers/ToolEnvironment";
import ToolCompensation from "./containers/ToolCompensation";
import ToolBenefits from "./containers/ToolBenefits";
import ValidationCompany from "./containers/ValidationCompany";
import Acknowledgment from "./containers/Acknowledgment";
import PersonalInformation from "./containers/PersonalInformation";

import AdminLogin from "./components/AdminLogin";
import ExportAdmin from "./containers/ExportAdmin";
import AdminDashboard from "./components/AdminDashboard";
import AdminFileList from "./components/AdminFileList";
import AdminDataView from "./components/AdminDataView";

import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <SurveyProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/informedConsent" element={<><InformedConsent /><Footer /></>} />
          <Route path="/listConsent" element={<><ListConsent /><Footer /></>} />
          <Route path="/remember" element={<Remember />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/personalinformation" element={<PersonalInformation />} />
          <Route path="/sociodemographic" element={<SocioDemographic />} />
          <Route path="/tool" element={<Tool />} />
          <Route path="/toolleader" element={<ToolLeader />} />
          <Route path="/toolteam" element={<ToolTeam />} />
          <Route path="/toolorganization" element={<ToolOrganization />} />
          <Route path="/toolcomunication" element={<ToolComunication />} />
          <Route path="/toolenvironment" element={<ToolEnvironment />} />
          <Route path="/toolcompensation" element={<ToolCompensation />} />
          <Route path="/toolbenefits" element={<ToolBenefits />} />
          <Route path="/textintroductory" element={<TextIntroductory />} />
          <Route path="/acknowledgment" element={<Acknowledgment />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route index path="/" element={<ValidationCompany />} />
          <Route path="/admin-files" element={<AdminFileList />} />

          <Route
            path="/admin"
            element={
              isAdmin
                ? <ExportAdmin onLogout={() => setIsAdmin(false)} />
                : <AdminLogin onLogin={() => setIsAdmin(true)} />
            }
          />

          <Route
            path="/admin-data"
            element={
              isAdmin
                ? <AdminDataView />
                : <AdminLogin onLogin={() => setIsAdmin(true)} />
            }
          />
        </Routes>
      </BrowserRouter>
    </SurveyProvider>
  );
}

export default App;
