import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

import CustomSelect from '../../shared/CustomSelect/CustomSelect';
import classNames from "classnames";

export interface ISelectedProps {
  option: string
  value: string
}

const answers = [
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

// const questions = [];


const CreateQuiz = () => {
  const [isCreateQuestion, setIsCreateQuestion] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [questions, setQuestions] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState<string>('');
  const [selectedValue] = useState<ISelectedProps[]>([
    { option: 'Ready answers', value: 'readyAnswers'},
    { option: 'An arbitrary input field', value: 'inputField' },
  ]);
  const [answersArr, setAnswersArr] = useState<string[]>(['']);
  const [questionsArr, setQuestionsArr] = useState<string[]>(['']);

  const handleCreateQuestion = () => setIsCreateQuestion(!isCreateQuestion);

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const createQuiz = () => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }

  const handleAnswer = () => {
    // questions.push({id: questions.length, question: value, answers: {}});
    setQuestions([...questions, {id: questions.length, question: value, answers: []}])
    setIsCreateQuestion(false);
  }

  const handleShow = () => setIsShow(!isShow);

  const addAnswer = (id: number, number: number) => {
    questions[id].answers.push({[`answer${number + 1}`]: answer});
    setIsShow(false);
  }

  const handleSelectOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  }

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectOption(event.target.innerText);
  }

  const onAddQuestion = () => {
    setQuestionsArr([...questionsArr, '']);
  }

  // const onQuestionChange = (index: number, value: string) => {
  //   const newAnswers = [...questionsArr];
  //   newAnswers[index] = value;
  //   setQuestionsArr(newAnswers);
  // };

  const onDeleteQuestion = (index: number) => {
    if (questionsArr.length > 1) {
      setQuestionsArr(questionsArr.filter((_, i) => i !== index));
    }
  };

  const onAddAnswer = () => {
    if (answersArr.length < 5) {
      setAnswersArr([...answersArr, '']);
    }
  }

  const onInputChange = (index: number, value: string) => {
    const newAnswers = [...answersArr];
    newAnswers[index] = value;
    setAnswersArr(newAnswers);
  };

  const onDeleteAnswer = (index: number) => {
    if (answersArr.length > 1) {
      setAnswersArr(answersArr.filter((_, i) => i !== index));
    }
  };


  return (
    <div className="flex flex-col items-center">
      <div className="pt-3 w-2/5 h-max ">
        <div className="mb-2 text-slate-600 hover:text-slate-800 w-14">
          <Link to="/" className="flex items-center">
            <FontAwesomeIcon icon={faChevronLeft} fontSize="small" />
            <p className="ml-1">Back</p>
          </Link>
        </div>
        <div>
          <input className="border outline-none w-4/5 py-2 px-1 my-2 rounded-md" placeholder="Enter title" />
          <button className="border ml-3 py-2 px-1 rounded-md bg-green-600 text-white w-24 hover:bg-green-700">Create Quiz</button>
        </div>
      </div>
      {questionsArr.map((element, index) => (
        <div className="shadow md:shadow p-3 w-2/5 h-max left-1/3 mt-3" key={index}>
          <div>
            <div>
              <div className="flex justify-between items-center">
                <p>Question {index + 1}</p>
                {questionsArr.length > 1 && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    fontSize="smaller"
                    className="ml-4 p-2 w-2.5 h-2.5 rounded-3xl bg-gray-400 hover:cursor-pointer text-white hover:bg-gray-500"
                    onClick={() => onDeleteQuestion(index)}
                  />
                )}
              </div>
              <input className="border outline-none w-full p-1 my-2 rounded-md" placeholder="Enter question" />
              <div>
                <p className="select-none">Response type</p>
                <CustomSelect
                  isOpen={isSelectOpen}
                  handleSelectOpen={handleSelectOpen}
                  selectValue={selectOption}
                  defaultValue={selectedValue[0].option}
                  selectedValue={selectedValue}
                  handleSelect={handleSelect}
                />
              </div>
              {answersArr.map((el, index) => (
                <div key={index}>
                  {selectOption !== 'An arbitrary input field' && (
                    <div className="flex px-3 items-center">
                      <input
                        className="border outline-none w-full p-1 my-2 rounded-md"
                        placeholder="Enter answer"
                        value={answer}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(index, e.target.value)}
                      />
                      {answersArr.length > 1 && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          fontSize="small"
                          className="ml-4 p-2 rounded-3xl bg-gray-400 hover:cursor-pointer text-white hover:bg-gray-500"
                          onClick={() => onDeleteAnswer(index)}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
              {selectOption !== 'An arbitrary input field' && (
                <div className="text-end">
                  <button
                    className={classNames(
                      "my-2 p-3 hover:cursor-pointer hover:bg-slate-200 bg-slate-100 rounded-md select-none",
                      {["enabled:opacity-65 bg-slate-800 text-white hover:bg-slate-800 hover:cursor-default"]: answersArr.length >= 5}
                    )}
                    onClick={onAddAnswer}
                  >
                    + Add Answer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        className="mt-5 p-3 hover:cursor-pointer hover:bg-slate-200 bg-slate-100 rounded-md select-none"
        onClick={onAddQuestion}
      >
        + Add next question
      </button>
    </div>
  )
}

export default CreateQuiz;

// <div>
//   {isCreateQuestion && (
//     <div>
//       <div>
//         <p>Text</p>
//         <input className="border" onChange={(event: ChangeEvent<HTMLInputElement>) => handleValue(event)} />
//       </div>
//       <div>
//         <button className="border my-2" onClick={handleAnswer}>Save</button>
//       </div>
//     </div>
//   )}
//   {questions.map((el, num) => (
//     <div key={el?.question}>
//       <p className="hover:bg-gray-200 w-60 cursor-pointer" onClick={handleShow}>{el?.question}</p>
//       {el.answers?.length ? (
//         <div>
//           <p>Answer ${1+1}</p>
//           {el.answers.map((element: ChangeEvent<HTMLInputElement>) => <p>{Object.values(element)}</p>)}
//         </div>
//       ) : null}
//       {isShow && (
//         <div>
//           <p>Add answer</p>
//           <input className="border outline-none" onChange={(e) => setAnswer(e.target.value)} />
//           <button className="border mt-2 w-14 hover:bg-gray-300" onClick={() => addAnswer(el?.id, num)}>Add</button>
//         </div>
//       )}
//     </div>
//   ))}
// </div>
