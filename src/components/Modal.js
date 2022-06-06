import React from 'react'

export default function Modal({isCorrect, turn, solution}) {

    const refreshPage = () =>{
        window.location.reload();
    }
    
    return (
        <div className='modal'>
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className='solution'>The Word is: {solution}</p>
                    <p>You've found the solution in {turn} guess(es) :D</p>
                    <button onClick={refreshPage}>Play Again</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Oh No!</h1>
                    <p className='solution'>The Word is: {solution}</p>
                    <p>Better luck next time :)</p>
                    <button onClick={refreshPage}>Play Again</button>
                </div>
            )}
        </div>
  )
}
