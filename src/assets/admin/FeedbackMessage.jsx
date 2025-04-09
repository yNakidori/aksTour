import React from "react";

const FeedbackMessage = ({ success, error }) => {
  return (
    <>
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <span className="material-icons mr-2">check_circle</span>
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <span className="material-icons mr-2">error</span>
          {error}
        </div>
      )}
    </>
  );
};

export default FeedbackMessage;
