import { useEffect, useState } from 'react';
import './App.css'
import { CommunicatorToClient } from './controllers/Communicator'

function App() {
    const [selectedColor, setSelectedColor] = useState('green');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedColor(selectedOption.style.color);
    };

    useEffect(() => {
        CommunicatorToClient.SelectMethod();
    }, []);

    return (
        <>
            <select
                className="methodSelect"
                id="methodSelect"
                onChange={handleSelectChange}
                style={{ color: selectedColor }}
            >
                <option value="GET" style={{ color: 'green' }}>GET</option>
                <option value="POST" style={{ color: 'yellow' }}>POST</option>
                <option value="PUT" style={{ color: 'cyan' }}>PUT</option>
                <option value="DELETE" style={{ color: 'red' }}>DELETE</option>
                <option value="PATCH" style={{ color: 'white' }}>PATCH</option>
            </select>
            <input className="inputUrl" type="text" name="inputUrl" id="inputUrl" defaultValue="http://localhost:8000/"/>
            <button className="sendButton" type="submit" id="sendButton">Send</button>
        </>
    )
}

export default App