import React from 'react';
import logo from './logo.svg';
import './App.styles.tsx';
import { AppContainer, AppContent } from './App.styles';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/Home.page';


function App() {
  return (
    <AppContainer>
      <AppContent>
        <Routes>
          <Route path="/" element={<HomePage/>}>
          </Route>
        </Routes>
      </AppContent>
    </AppContainer>
  );
}

export default App;
