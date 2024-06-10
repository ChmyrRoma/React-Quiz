import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import PageComponent from '../../shared/PageComponent/PageComponent';


const Quiz = () => {
  return (
    <PageComponent>
      <div className="border p-3">
        <p className="text-2xl font-serif text-center">React Quiz</p>
        <p className="text-lg mt-3">Question 1 of 25:</p>
        <p className="mt-3 font-serif text-lg">What is the correct command to create a new React project?</p>
        <div className="mt-8">
          <div className="flex mt-1 py-2 bg-gray-300 items-center">
            <input className="ml-3" type="checkbox" />
            <p className="ml-3">npx create react-app</p>
          </div>
          <div className="flex mt-1 py-2 bg-gray-300 items-center">
            <input className="ml-3" type="checkbox" />
            <p className="ml-3">npx create react-app</p>
          </div>
          <div className="flex mt-1 py-2 bg-gray-300 items-center">
            <input className="ml-3" type="checkbox" />
            <p className="ml-3">npx create react-app</p>
          </div>
          <div className="flex mt-1 py-2 bg-gray-300 items-center">
            <input className="ml-3" type="checkbox" />
            <p className="ml-3">npx create react-app</p>
          </div>
          <div className="flex mt-1 py-2 bg-gray-300 items-center">
            <input className="ml-3" type="checkbox" />
            <p className="ml-3">npx create react-app</p>
          </div>
        </div>
        <p className="text-end my-3">0:25</p>
        <button className="flex w-24 h-10 bg-green-600 text-white rounded-md items-center justify-center hover:bg-green-700">
          <p className="mr-1">Next</p>
          <FontAwesomeIcon icon={faChevronRight} fontSize="small" />
        </button>
      </div>
    </PageComponent>
  )
}

export default Quiz;
