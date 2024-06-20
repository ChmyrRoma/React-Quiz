import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import CustomSelect from '../../shared/CustomSelect/CustomSelect';
import QuizAnswersBlock from '../QuizAnswerBlock/QuizAnswerBlock';
import { ICorrectAnswer, IQuestion } from '../CreateQuiz/CreateQuiz';

interface IQuestionBlockProps {
  questionIndex: number
  question: IQuestion
  onQuestionChange: (field: keyof IQuestion, value: string) => void
  questionsLength: number
  onDeleteQuestion: () => void
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  correctAnswer: ICorrectAnswer;
  setCorrectAnswer: (value: ICorrectAnswer) => void;
  setCurrentSelectType: (type: string) => void
}

export interface ISelectedProps {
  option: string
  value: string
}

const QuestionBlock: React.FC<IQuestionBlockProps> = ({
  questionIndex, question, onQuestionChange, questionsLength, onDeleteQuestion,
  register, errors, correctAnswer, setCorrectAnswer, setCurrentSelectType
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState<string>(question.type);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
  const [selectedArr] = useState<ISelectedProps[]>([
    { option: 'An arbitrary input field', value: 'inputField' },
    { option: 'Ready answers', value: 'answer' }
  ]);

  useEffect(() => {
    const answerType = question.type === 'answer' ? 'Ready answers' : question.type === 'inputField' ? 'An arbitrary input field' : 'Ready answers';
    setSelectOption(answerType);
  }, [() => {
    question.type;
    question.answers;
    handleSelect();
  }]);

  useEffect(() => {
    setCurrentSelectType(question.type);
  }, [question.type]);

  const handleSelectOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelect = (option: string, value: string) => {
    setSelectOption(value);
    setIsSelectOpen(false);
    if (value === 'inputField') {
      onQuestionChange('answers', []);
      setCorrectAnswer({ value: '', status: null });
    } else if (question.answers.length === 0) {
      onQuestionChange('answers', [{ answer1: '' }]);
    }
    onQuestionChange('type', value);
  };

  const handleSelectCorrectAnswer = (value: React.MouseEvent<HTMLDivElement>) => {
    const answerValue = value.target?.value;
    if (!answerValue) {
      setCorrectAnswer({ value: 'You cannot select an empty field', status: false });
      onQuestionChange('correctAnswer', '');
      setIsCorrectAnswer(false);
      return;
    }
    onQuestionChange('correctAnswer', answerValue);
    setCorrectAnswer({ value: `You choose the correct answer: ${answerValue}`, status: true });
    setIsCorrectAnswer(false);
  };

  const onAddAnswer = () => {
    const answerNumber = `answer${question.answers.length + 1}`;
    if (question.answers.length < 5) {
      onQuestionChange('answers', [...question.answers, { [answerNumber]: '' }]);
    }
  };

  const onInputChange = (answerIndex: number, value: string) => {
    const answerKey = `answer${answerIndex + 1}`;
    const newAnswers = question.answers.map((answer, index) =>
      index === answerIndex ? { [answerKey]: value } : answer
    );
    onQuestionChange('answers', newAnswers);
  };

  const onDeleteAnswer = (answerIndex: number) => {
    if (question.answers.length > 1) {
      const newAnswers = question.answers.filter((_, i) => i !== answerIndex);
      const updatedAnswers = newAnswers.map((answer, index) => ({ [`answer${index + 1}`]: Object.values(answer)[0] }));
      onQuestionChange('answers', updatedAnswers);
    }
  };

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange('question', e.target.value);
  };

  return (
    <div className="shadow md:shadow p-3 w-2/5 h-max left-1/3 mt-3">
      <div>
        <div className="flex justify-between items-center">
          <p>Question {questionIndex + 1}</p>
          {questionsLength > 1 && (
            <FontAwesomeIcon
              icon={faTrash}
              fontSize="smaller"
              className="ml-4 p-2 w-2.5 h-2.5 rounded-3xl bg-gray-400 hover:cursor-pointer text-white hover:bg-gray-500"
              onClick={onDeleteQuestion}
            />
          )}
        </div>
        <input
          className="border outline-none w-full p-1 my-2 rounded-md"
          placeholder="Enter question"
          {...register(`questions.${questionIndex}.question`, { required: true })}
          value={question.question}
          onChange={handleValue}
        />
        {errors?.questions?.[questionIndex]?.question && <p className="text-red-500">Question is required</p>}
        <div>
          <p className="select-none">Response type</p>
          <CustomSelect
            isOpen={isSelectOpen}
            handleSelectOpen={handleSelectOpen}
            selectOption={selectOption}
            defaultValue={selectedArr[1].option}
            selectedValue={selectedArr}
            handleSelect={(option, value) => handleSelect(option, value)}
          />
        </div>
        {question.type !== 'inputField' && (
          <>
            {question.answers.map((answerObj, answerIndex) => {
              const answerKey = `answer${answerIndex + 1}`;
              return (
                <QuizAnswersBlock
                  key={answerIndex}
                  questionIndex={questionIndex}
                  answerIndex={answerIndex}
                  answerKey={answerKey}
                  answer={answerObj[answerKey]}
                  answersLength={question.answers.length}
                  isCorrectAnswer={isCorrectAnswer}
                  register={register}
                  errors={errors}
                  onInputChange={(value) => onInputChange(answerIndex, value)}
                  onDeleteAnswer={() => onDeleteAnswer(answerIndex)}
                  handleSelect={handleSelectCorrectAnswer}
                />
              );
            })}
            <div className={classNames("my-3 py-2", {["border-t"]: !isCorrectAnswer})}>
              {!isCorrectAnswer && (
                <div
                  className="text-center my-2 hover:cursor-pointer py-1 hover:bg-slate-200 bg-slate-100 rounded-md"
                  onClick={() => setIsCorrectAnswer(!isCorrectAnswer)}
                >
                  {correctAnswer.status ? 'Change correct answer' : 'Select correct answer'}
                </div>
              )}
              <div
                className={classNames(
                  {["text-red-400"]: !correctAnswer.status},
                  {["text-green-500"]: correctAnswer.status}
                )}
              >
                {correctAnswer.value}
              </div>
            </div>
            <div className="text-end">
              <button
                onClick={onAddAnswer}
                className={classNames(
                  "my-2 p-3 rounded-md select-none",
                  { ["hover:cursor-pointer hover:bg-slate-200 bg-slate-100"]: question.answers.length < 5 },
                  { ["disabled:opacity-75 bg-gray-200 cursor-default pointer-events-none"]: question.answers.length >= 5 }
                )}
              >
                + Add Answer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionBlock;
