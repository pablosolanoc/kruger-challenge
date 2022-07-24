import React from "react";
import logo from "./logo.svg";
import "./App.styles.tsx";
import { AppContainer, AppContent } from "./App.styles";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/Home.page";
import { appRoutes } from "constants/routes/routes";
import AdminPage from "pages/AdminPage/AdminPage.component";

function App() {
  return (
    <AppContainer>
      <AppContent>
        <Routes>
          <Route path={appRoutes.homePage} element={<HomePage />}></Route>
          {/* <Route path={appRoutes.adminLogin} element={<LoginPage />}></Route>
          <Route path={appRoutes.employeeLogin} element={<LoginPage />}></Route> */}
          <Route path={appRoutes.admin} element={<AdminPage />}></Route>
        </Routes>
      </AppContent>
    </AppContainer>
  );
}

export default App;
