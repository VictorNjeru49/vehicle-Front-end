// SomePage.tsx
import { AssignmentReturn } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row gap-5 my-7"
      >
        <AssignmentReturn/>
        Go Back
      </button>
      {/* Other content of the page */}
    </div>
  );
};

export default SomePage;
