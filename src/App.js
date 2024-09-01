import React, { useRef, useEffect, useState } from 'react';
import Formulaire from './componant/Formulaire';
import Message from './componant/Message';
import './App.css';
import './animation.css';
import { useParams } from 'react-router-dom';
// Firebase
import { database, ref, onValue, set } from './base';
//animation
import { CSSTransition , TransitionGroup } from 'react-transition-group';





function App() {
  const [messages, setMessages] = useState([]);
  const { pseudo } = useParams();
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const messageRef = ref(database, 'messages');

    
    const unsubscribe = onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, message]) => ({ id, ...message }));
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });


    return () => unsubscribe();
  }, []);


  const addMessage = (newMessage) => {
    const newMessageRef = ref(database, `messages/${Date.now()}`); // Use timestamp as unique ID
    set(newMessageRef, { ...newMessage, pseudo })
      .then(() => console.log('Message ajouté'))
      .catch(error => console.error('Erreur lors de l\'ajout du message:', error));
  };

  // Scroll to the bottom of messages when they update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to check if the message is from the current user
  const isUser = (messagePseudo) => {
    return messagePseudo === pseudo;
  };

  return (
    <div className="box">
      <div>
        <TransitionGroup className='message'>
          {messages.map(msg => (
            <CSSTransition key={msg.id} classNames='fade' timeout={2000}>
                    <Message 
                    pseudo={msg.pseudo}
                    message={msg.message}
                    isUser={isUser} // Pass the function itself
                  />
            </CSSTransition>
          ))}
          <div ref={messagesEndRef} /> 
        </TransitionGroup>
      </div>
      <Formulaire addMessage={addMessage} pseudo={pseudo} />
    </div>
  );
}

export default App;
