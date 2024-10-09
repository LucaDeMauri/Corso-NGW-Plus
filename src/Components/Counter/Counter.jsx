
import { useEffect,useState } from 'react'
import './Counter.css'

 
export default function Counter() {

    const [count, setCount] = useState(0) //usestate variabile
    const [showPopup, setShowPopup] = useState(false)

    const add = () => {
        setCount(count + 1)
    }

    const min = () => {
        setCount(count - 1)
    }

    const reset = () => {
        setCount(0)
    }

    useEffect(() => {
        if (count < 0) {
            setCount(0)
            setShowPopup(true)
        }

        if (count > 0) {
            setShowPopup(false)
        }
    }, [count])

    return (
        <div className="counter">
            <div className="title-Counter">
                <h3>Contatore</h3>
            </div>
            <h1>{count}</h1>
           
            <div className="btns">
                <button onClick={() => add()}>+</button>
                <button onClick={() => min()}>-</button>
                <button onClick={() => reset()}>Reset</button>
            </div>

            {showPopup && (
                <div className="popup">
                    <h3>Errore!</h3>
                    <p>Il contatore non può essere negativo</p>
                </div>
            )}
            
           
        </div>
    )
 
}