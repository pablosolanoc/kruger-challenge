import React from "react";
import logo from "./logo.svg";
import "./App.styles.tsx";
import { AppContainer, AppContent } from "./App.styles";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/Home.page";
import { appRoutes } from "constants/routes/routes";
import AdminPage from "pages/AdminPage/AdminPage.component";
import LoginPage from "pages/LoginPage/LoginPage.page";
import { useUser } from "context/user/useUser";
import EditEmployeePage from "pages/EditEmployeePage/EditEmployeePage.component";
import MyButton from "components/MyButton/MyButton.component";

function App() {
  const { user, isThereUserLoggedIn: loadLogin } = useUser();
  console.log(user);
  return (
    <AppContainer>
      <AppContent>
        <Routes>
          <Route path={appRoutes.homePage} element={<HomePage />}></Route>
          {/* <Route path={appRoutes.adminLogin} element={<LoginPage />}></Route>
          <Route path={appRoutes.employeeLogin} element={<LoginPage />}></Route> */}
          <Route path={appRoutes.admin} element={<AdminPage />}></Route>
          <Route
            path={appRoutes.employeeLogin}
            element={loadLogin ? <EditEmployeePage /> : <LoginPage />}
          ></Route>
        </Routes>
      </AppContent>
    </AppContainer>
  );
}

export default App;
