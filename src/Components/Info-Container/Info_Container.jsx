import './Info_Container.css';

export default function Info_Container({ children, updateDate }) {
    const currentDate = new Date().toLocaleDateString(); // Ottieni la data corrente

    return (
        <div className="Info_Container">
            <h2 className="title">Bitcoin Price Index</h2> 
            <div className="children-container">
                {children} 
            </div>
            <div className="date">
                <p>last update: {updateDate}</p> 
            </div>
        </div>
    );
}
