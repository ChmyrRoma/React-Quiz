import React from 'react';
import { Link } from 'react-router-dom';


interface IProps {
  title: string
  questionLength: number
}

const QuizContainer = ({ title, questionLength }: IProps) => {
  return (
    <Link to="/quiz" className="mt-5 m-2 w-80 h-60 border shadow hover:cursor-pointer">
      <div className="p-5">
        <p className="text-center font-serif text-2xl">{title}</p>
        <p className="text-center font-serif mt-5">Questions: {questionLength}</p>
      </div>
    </Link>
  )
}

export default QuizContainer;
