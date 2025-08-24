import React from "react";

const Message = ({ message }: { message: string }) => {
  return (
    <div>
      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        <span className="font-medium">Warning alert!</span> {message}
      </div>
    </div>
  );
};

export default Message;
