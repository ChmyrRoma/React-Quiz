import React, { ChangeEvent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface IQuizAnswersBlockProps {
  questionIndex: number
  answerIndex: number
  answerKey: string
  answer: string
  answersLength: number
  isCorrectAnswer: boolean
  onInputChange: (value: string, index: number) => void
  onDeleteAnswer: (index: number) => void
  handleSelect: (value: React.MouseEvent<HTMLDivElement>) => void
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}

const QuizAnswersBlock: React.FC<IQuizAnswersBlockProps> = ({
  questionIndex, answerIndex, answerKey, answer, isCorrectAnswer, onInputChange, onDeleteAnswer, handleSelect,
  answersLength, register, errors
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value, answerIndex);
  };

  return (
    <div>
      <div
        onClick={(value) => isCorrectAnswer && handleSelect(value)}
        className={classNames(
        "flex px-3 items-center",
          {["group hover:bg-slate-100 hover:cursor-pointer input:bg-gray-300"]: isCorrectAnswer}
        )}
      >
        <input
          placeholder="Enter answer"
          value={answer || ''}
          {...register(`questions.${questionIndex}.answers.${answerIndex}.${answerKey}`, { required: true })}
          onChange={handleChange}
          readOnly={isCorrectAnswer}
          className={classNames(
            "border outline-none w-full p-1 my-2 rounded-md",
            {["group-hover:bg-slate-100 hover:cursor-pointer"]: isCorrectAnswer}
          )}
        />
        {answersLength > 1 && (
          <FontAwesomeIcon
            icon={faTrash}
            fontSize="small"
            onClick={() => !isCorrectAnswer && onDeleteAnswer(answerIndex)}
            className={classNames(
              "ml-4 p-2 rounded-3xl bg-gray-400 hover:cursor-pointer text-white hover:bg-gray-500",
              {["hover:bg-gray-400"]: isCorrectAnswer}
            )}
          />
        )}
      </div>
      {errors?.questions?.[questionIndex]?.answers?.[answerIndex]?.[answerKey] && <p className="text-red-500">Answer is required</p>}
    </div>
  );
};

export default QuizAnswersBlock;
