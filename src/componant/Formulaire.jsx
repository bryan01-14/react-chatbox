import { useState } from "react";

export default function Formulaire({ addMessage, pseudo }) {

   // 1. État pour le message
   const [message, setMessage] = useState('');

   // 2. Gestion des changements dans le textarea
   const handleChange = (event) => {
       setMessage(event.target.value);
   };

   // 3. Création du message et appel de la fonction addMessage
   const createMessage = () => {
       const newMessage = {
           pseudo,
           message
       };
       addMessage(newMessage);
       setMessage(''); // Réinitialiser le message après l'envoi
   };

   // 4. Gestion de la soumission du formulaire
   const handleSubmit = (event) => {
       event.preventDefault();
       createMessage();
   };

   const handleKey = (event) =>{
      if(event.key ==='Enter'){
           createMessage()
        }
   }

   // 5. Calcul du nombre de caractères restants
   const maxLength = 150;
   const remainingCharacters = maxLength - message.length;

   // 6. Affichage
   return (
       <form className='form' onSubmit={handleSubmit}>
           <textarea
               value={message}
               onChange={handleChange}
               required
               maxLength={maxLength}
               onKeyUp={handleKey}
               placeholder="Écrivez votre message ici..."
           />
           <div className='info'>
               {remainingCharacters} caractères restants
           </div>
           <button type='submit'>Envoyer !</button>
       </form>
   );
}
