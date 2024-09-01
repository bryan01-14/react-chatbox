import React from 'react';

// Message component
export default function Message({ pseudo, message, isUser }) {
  // Check if the message is from the current user
  const userMessage = isUser(pseudo);

  return (
    <p className={userMessage ? 'user-message' : 'not-user-message'}>
      <strong>{pseudo}</strong> : <span>{message}</span>
    </p>
  );
}
