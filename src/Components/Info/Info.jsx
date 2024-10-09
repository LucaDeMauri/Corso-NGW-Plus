import './Info.css'

export default function Info ({code, symbol, rate}) {
    return (
        <div className="Info">
            <div className="symbol-rate-container">
                <h2 className="pr symbol">{symbol}</h2>
                <h2 className="pr rate">{rate}</h2>
            </div>
            <p className="pr code">{code}</p>
        </div>
    )
}

