import React, { useState } from 'react';
import FormGenerator from './FormGenerator';
import GeneratedForm from './GeneratedForm';

const Home = () => {
  const fields = [];

  return (
    <div className="flex flex-col md:flex-row w-full bg-background-light dark:bg-background-dark">
      {/* Left: FormGenerator */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        <div className="w-full">
          <FormGenerator />
        </div>
      </div>
      {/* Right: GeneratedForm */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-0 bg-gray-50 dark:bg-gray-900">
        <div className="w-full">
          <GeneratedForm fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default Home;
