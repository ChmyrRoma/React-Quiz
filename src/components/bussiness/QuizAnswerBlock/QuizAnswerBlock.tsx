import React, { ChangeEvent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface IQuizAnswersBlockProps {
  questionIndex: number
  answerIndex: number
  answerKey: string
  answer: string
  answersLength: number
  onInputChange: (value: string, index: number) => void
  onDeleteAnswer: (index: number) => void
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}

const QuizAnswersBlock: React.FC<IQuizAnswersBlockProps> = ({
  questionIndex, answerIndex, answerKey, answer, onInputChange, onDeleteAnswer, answersLength,
  register, errors
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value, answerIndex);
  };

  return (
    <div>
      <div className="flex px-3 items-center">
        <input
          className="border outline-none w-full p-1 my-2 rounded-md"
          placeholder="Enter answer"
          value={answer || ''}
          {...register(`questions.${questionIndex}.answers.${answerIndex}.${answerKey}`, { required: true })}
          onChange={handleChange}
        />
        {answersLength > 1 && (
          <FontAwesomeIcon
            icon={faTrash}
            fontSize="small"
            className="ml-4 p-2 rounded-3xl bg-gray-400 hover:cursor-pointer text-white hover:bg-gray-500"
            onClick={() => onDeleteAnswer(answerIndex)}
          />
        )}
      </div>
      {errors?.questions?.[questionIndex]?.answers?.[answerIndex]?.[answerKey] && <p className="text-red-500">Answer is required</p>}
    </div>
  );
};

export default QuizAnswersBlock;
