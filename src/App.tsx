import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout/MainLayout';
import MainPage from './components/pages/MainPage/MainPage';
import QuizPage from './components/pages/QuizPage/QuizPage';
import CreateQuizPage from './components/pages/CreateQuizPage/CreateQuizPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
