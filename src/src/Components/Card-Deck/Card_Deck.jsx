import './Card_Deck.css'

export default function Card_Deck ({ children }) {

    return(
        <div className="card-deck">
            {children}
        </div>
    )
    
}