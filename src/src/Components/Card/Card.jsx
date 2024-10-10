import './Card.css'

export default function Card ({title, description}) {
    return (
        <div className='card'>

            <div className="Head">
            <div className="title-">
                <h2>{title}</h2>
            </div>
        </div>
        <div className="description">
            <p>{description}</p>
        </div>

        </div>
        
    )

}