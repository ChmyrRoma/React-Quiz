import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { ISelectedProps } from '../../bussiness/CreateQuiz/CreateQuiz';

interface IProps {
  isOpen: boolean
  handleSelectOpen: () => void
  selectValue: string
  defaultValue: string
  selectedValue: ISelectedProps[]
  handleSelect: (event: React.MouseEvent<HTMLDivElement>) => void
}


const CustomSelect = ({ isOpen, handleSelectOpen, selectValue, defaultValue, selectedValue, handleSelect}: IProps) => {
  return (
    <div
      onClick={handleSelectOpen}
      className="relative border outline-none w-full py-1 my-2 rounded-md hover:cursor-pointer"
    >
      <div className="flex justify-between items-center px-1">
        <p className="select-none">{selectValue || defaultValue}</p>
        {isOpen ? (
          <FontAwesomeIcon icon={faAngleUp} fontSize="small" />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} fontSize="small" />
        )}
      </div>
      {isOpen && (
        <div className="absolute border bg-white w-full h-content rounded-b">
          {selectedValue.map(el => (
            <div
              key={el.value}
              className="font-sans text-base p-1 hover:bg-blue-400 hover:text-white my-1"
              onClick={(event) => handleSelect(event)}
            >
              {el.option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect;
