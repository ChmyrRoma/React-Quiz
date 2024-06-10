import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';



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
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState([]);

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

  const addAnswer = (id: number, number) => {
    questions[id].answers.push({[`answer${number + 1}`]: answer});
    setIsShow(false);
  }

  console.log(questions)

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
          <button className="border ml-3 py-2 px-1 rounded-md bg-green-600 text-white w-24">Create Quiz</button>
        </div>
      </div>
      <div className="shadow md:shadow p-3 w-2/5 h-max left-1/3 mt-3">
        <div>
          <div>
            <div>
              <p>Question 1</p>
              <input className="border outline-none w-full p-1 my-2 rounded-md" placeholder="Enter question" />
            </div>
            <div>
              {isCreateQuestion && (
                <div>
                  <div>
                    <p>Text</p>
                    <input className="border" onChange={(event) => handleValue(event)} />
                  </div>
                  <div>
                    <button className="border my-2" onClick={handleAnswer}>Save</button>
                  </div>
                </div>
              )}
              {questions.map((el, num) => (
                <div key={el?.question}>
                  <p className="hover:bg-gray-200 w-60 cursor-pointer" onClick={handleShow}>{el?.question}</p>
                  {el.answers?.length ? (
                    <div>
                      <p>Answer ${1+1}</p>
                      {el.answers.map(element => <p>{Object.values(element)}</p>)}
                    </div>
                  ) : null}
                  {isShow && (
                    <div>
                      <p>Add answer</p>
                      <input className="border outline-none" onChange={(e) => setAnswer(e.target.value)} />
                      <button className="border mt-2 w-14 hover:bg-gray-300" onClick={() => addAnswer(el?.id, num)}>Add</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQuiz;
