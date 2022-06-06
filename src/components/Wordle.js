import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import ErrorModal from './ErrorModal';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle( {solution} ) {
    const {currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys, errMsg} = useWordle(solution);
    const [showModal, setShowModal] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(()=>{
        console.log(solution);
        window.addEventListener('keyup', handleKeyUp);

        if(isCorrect){
            setTimeout(()=>setShowModal(true), 2000);
            window.removeEventListener('keyup', handleKeyUp);
        }

        if(turn>5){
            setTimeout(()=>setShowModal(true), 2000);
            window.removeEventListener('keyup', handleKeyUp);
        }

        if(errMsg!=''){
            setHasError(true);
        }
        else{
            setHasError(false);
        }

        return ()=>window.removeEventListener('keyup', handleKeyUp);
    }, [handleKeyUp, isCorrect, errMsg])


  return (
    <div>
        {hasError && <ErrorModal errMsg={errMsg}/>}
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    
    </div>
    
  )
}
