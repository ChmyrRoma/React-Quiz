import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { ISelectedProps } from '../../bussiness/QuestionBlock/QuestionBlock';

interface IProps {
  isOpen: boolean;
  handleSelectOpen: () => void;
  selectOption: string;
  defaultValue: string;
  selectedValue: ISelectedProps[];
  handleSelect: (option: string, value: string) => void;
}

const CustomSelect: React.FC<IProps> = ({
 isOpen, handleSelectOpen, selectOption, defaultValue, selectedValue, handleSelect
}) => {
  return (
    <div
      onClick={handleSelectOpen}
      className="relative border outline-none w-full py-1 my-2 rounded-md hover:cursor-pointer"
    >
      <div className="flex justify-between items-center px-1">
        <p className="select-none">{selectOption || defaultValue}</p>
        {isOpen ? (
          <FontAwesomeIcon icon={faAngleUp} fontSize="small" />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} fontSize="small" />
        )}
      </div>
      {isOpen && (
        <div className="absolute border bg-white w-full h-content rounded-b z-10">
          {selectedValue.map((el, index) => (
            <div
              key={index}
              className="font-sans text-base p-1 hover:bg-blue-400 hover:text-white my-1"
              onClick={() => handleSelect(el.option, el.value)}
            >
              {el.option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
