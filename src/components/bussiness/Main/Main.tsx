import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchQuiz from '../SearchQuiz/SearchQuiz';
import QuizContainer from '../QuizContainer/QuizContainer';


interface IQuestions {
  question: string
  type: string
  answers: string[]
  correctAnswer: string
}

interface IProps {
  id: number
  questions: IQuestions
  title: string
}



const Main = () => {
  const [quizzes] = useState<IProps[]>(JSON.parse(localStorage.getItem('quizzes')) || []);

  return (
    <div>
      <SearchQuiz />
      <div className="flex justify-end mt-10">
        <Link to="/create-quiz">
          <button className="p-2 hover:bg-slate-200 bg-slate-100 rounded-md select-none font-serif">Create Quiz</button>
        </Link>
      </div>
      <hr className="mt-3" />
      <div className="flex flex-wrap">
        {quizzes.length ? (
          quizzes.map(el => (
            <QuizContainer key={el.id} title={el.title} questionLength={el?.questions?.length}  />
          ))
        ) : (
          <div className="absolute text-center right-1/3 left-1/3 top-1/2">
            <h2 className="text-xl font-sans">Add first quiz</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Main;

