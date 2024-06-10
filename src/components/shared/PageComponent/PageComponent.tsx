import React from 'react';
import  { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  children: React.ReactNode
}

const PageComponent = ({ children }: IProps) => {
  return (
    <div>
      <div className="mb-2 text-slate-600 hover:text-slate-800 w-14">
        <Link to="/" className="flex items-center">
          <FontAwesomeIcon icon={faChevronLeft} fontSize="small" />
          <p className="ml-1">Back</p>
        </Link>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default PageComponent;
