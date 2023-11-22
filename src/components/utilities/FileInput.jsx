// FileInput.js
import React from 'react';
import { Input, Button } from '@chakra-ui/react';

const FileInput = ({ onChange }) => {
  return (
    <div className="flex items-center">
      <Input
        type="file"
        display="none"
        onChange={onChange}
        id="file-input" // Associate the label with the input
      />
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Choose File
      </label>
    </div>
  );
};

export default FileInput;
