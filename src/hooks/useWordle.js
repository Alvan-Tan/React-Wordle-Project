import { useState } from "react"

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
    const [errMsg, setErrMsg] = useState('');
    
    const formatGuess = () =>{
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter)=>{
            return {key:letter, color:"grey"}
        })

        formattedGuess.forEach((l, i) =>{
            if (solutionArray[i] === l.key){
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        })

        formattedGuess.forEach((l,i)=>{
            if (solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) =>{
        if (currentGuess === solution){
            setIsCorrect(true);
        }
        setGuesses(prevGuesses=>{
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory(prevHistory=>{
            return [...prevHistory, currentGuess];
        })
        setTurn(prevTurn => {
            return prevTurn + 1;
        })
        setUsedKeys((prevUsedKeys)=>{
            let newKeys = {...prevUsedKeys};

            formattedGuess.forEach((l)=>{
                const currentColor = newKeys[l.key];

                if (l.color === 'green'){
                    newKeys[l.key] = 'green';
                    return
                }

                if (l.color === 'yellow' && currentColor !== 'green'){
                    newKeys[l.key] = 'yellow';
                    return
                }
                if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                    newKeys[l.key] = 'grey';
                    return
                }
            })
            return newKeys;
        });

        setCurrentGuess('');
    }

    const handleKeyUp = ({key}) =>{
        if(key === 'Enter'){
            setErrMsg('');
            if(turn > 5){
                setErrMsg('The game has ended!');
                return
            }
            if(history.includes(currentGuess)){
                setErrMsg('You have already guessed this word!');
                return
            }
            if (currentGuess.length !== 5){
                setErrMsg('Please guess a 5 letter word!');
                return
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if(key === "Backspace"){
            setCurrentGuess((prev)=>prev.slice(0,-1))
            return
        }

        if(/^[A-Za-z]$/.test(key)){
            if (currentGuess.length < 5){
                setCurrentGuess((prev)=>prev + key)
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp, errMsg};
}
 
export default useWordle;