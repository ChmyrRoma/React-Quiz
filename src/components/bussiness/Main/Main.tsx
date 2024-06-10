import React from 'react';
import { Link } from 'react-router-dom';

import SearchQuiz from '../SearchQuiz/SearchQuiz';
import QuizContainer from '../QuizContainer/QuizContainer';

const array = [
  {
    id: 0,
    title: 'React Quiz',
    questions: [
      {question: '', answer1: '', answer2: '', answer3: '', correctAnswer: ''},
      {question: '', answer1: '', answer2: '', answer3: '', correctAnswer: ''}
    ]
  },
  {
    id: 1,
    title: 'TypeScript Quiz',
    questions: [
      {question: '', answer1: '', answer2: '', answer3: '', correctAnswer: ''},
      {question: '', answer1: '', answer2: '', answer3: '', correctAnswer: ''},
      {question: '', answer1: '', answer2: '', answer3: '', correctAnswer: ''}
    ]
  },
]


const Main = () => {
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
        {array.map(el => (
          <QuizContainer key={el.id} title={el.title} questionLength={el.questions.length}  />
        ))}
      </div>
    </div>
  )
}

export default Main;

