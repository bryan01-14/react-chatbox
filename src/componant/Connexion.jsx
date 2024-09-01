import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

export default function Connexion () {
    //1.state
    const [personne , setPersonne] = useState({
        pseudo:'',
        goTochat:false
    })

    //2.manipulation du state
    const handleChange = (event) =>{
        const value = event.target.value;
        setPersonne((prevPersonne) =>({
             ...prevPersonne,
             pseudo:value
        }))
    }

   
    const handleSubmit =(event) => {
        event.preventDefault();
        setPersonne(prevPersonne =>({
            ...prevPersonne,
            goTochat : true
        }))
    }

    //redirection sur une autre page 
    const navigate = useNavigate();

    useEffect(() => {
        if(personne.goTochat){
            navigate(`/pseudo/${personne.pseudo}`)
        }
    },[personne.pseudo , personne.goTochat , navigate])


    //3.affichage (render)
    return (
        
        <div className='connexionBox'>
            <form className='connexion' onSubmit={handleSubmit}>
                <input 
                   value={personne.pseudo} 
                   type="text" 
                   placeholder="pseudo" 
                   required 
                   onChange={handleChange}
                />

                <button type='submit'>GO</button>
            </form>
        </div>
    )
}