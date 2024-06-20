import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import QuestionBlock from '../QuestionBlock/QuestionBlock';

export interface IQuestion {
  question: string
  type: string
  answers: { [key: string]: string }[]
  correctAnswer: string
}

interface IQuiz {
  id: number
  title: string
  questions: IQuestion[]
}

interface IFormInput {
  title: string
}

export interface ICorrectAnswer {
  value: string
  status: boolean | null
}

const CreateQuiz = () => {
  const [questionsArr, setQuestionsArr] = useState<IQuestion[]>([
    { question: '', type: 'answer', answers: [{ answer1: '' }], correctAnswer: '' }
  ]);
  const [correctAnswers, setCorrectAnswers] = useState<ICorrectAnswer[]>([
    { value: '', status: null }
  ]);
  const [currentSelectType, setCurrentSelectType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoading) {
      navigate('/');
    }
  }, [() => onSubmit()]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const allCorrectAnswersSet = correctAnswers.every(answer => answer.status === true);
    if (!allCorrectAnswersSet && currentSelectType !== 'inputField') return;

    const newQuiz: IQuiz = {
      id: Date.now(),
      title: data.title,
      questions: questionsArr
    };

    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    existingQuizzes.push(newQuiz);
    localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));

    setValue('title', '');
    setQuestionsArr([{ question: '', type: 'answer', answers: [{ answer1: '' }], correctAnswer: '' }]);
    setCorrectAnswers([{ value: '', status: null }]);
    setIsLoading(true);
  };

  const onInputChange = (questionIndex: number, field: keyof IQuestion, value: string) => {
    const newQuestionsArr = [...questionsArr];
    newQuestionsArr[questionIndex][field] = value;
    setQuestionsArr(newQuestionsArr);
  };

  const onAddQuestion = () => {
    setQuestionsArr([
      ...questionsArr,
      { question: '', type: 'answer', answers: [{ answer1: '' }], correctAnswer: '' }
    ]);
    setCorrectAnswers([
      ...correctAnswers,
      { value: '', status: null }
    ]);
  };

  const onDeleteQuestion = (index: number) => {
    if (questionsArr.length > 1) {
      setQuestionsArr(questionsArr.filter((_, i) => i !== index));
    }
  };

  const onCorrectAnswerChange = (questionIndex: number, answer: ICorrectAnswer) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[questionIndex] = answer;
    setCorrectAnswers(newCorrectAnswers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center">
        <div className="pt-3 w-2/5 h-max">
          <div className="mb-2 text-slate-600 hover:text-slate-800 w-14">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faChevronLeft} fontSize="small" />
              <p className="ml-1">Back</p>
            </Link>
          </div>
          <div className="flex justify-between items-center w-full">
            <input
              className="border outline-none w-full py-2 px-1 my-2 rounded-md"
              placeholder="Enter title"
              {...register('title', { required: true })}
            />
            <button
              type="submit"
              className={classNames(
                "border mx-1 h-11 rounded-md w-32 select-none",
                {
                  "bg-green-600 hover:bg-green-700 text-white": !errors.title,
                  "disabled:opacity-75 bg-gray-200 cursor-default pointer-events-none": errors.title
                }
              )}
            >
              Create Quiz
            </button>
          </div>
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>
        {questionsArr.map((element, index) => (
          <QuestionBlock
            key={index}
            questionIndex={index}
            question={element}
            onQuestionChange={(field, value) => onInputChange(index, field, value)}
            questionsLength={questionsArr.length}
            onDeleteQuestion={() => onDeleteQuestion(index)}
            register={register}
            errors={errors}
            correctAnswer={correctAnswers[index]}
            setCorrectAnswer={(answer) => onCorrectAnswerChange(index, answer)}
            setCurrentSelectType={setCurrentSelectType}
          />
        ))}
        <button
          className="mt-5 p-3 hover:cursor-pointer hover:bg-slate-200 bg-slate-100 rounded-md select-none"
          type="button"
          onClick={onAddQuestion}
        >
          + Add next question
        </button>
      </div>
    </form>
  );
};

export default CreateQuiz;
