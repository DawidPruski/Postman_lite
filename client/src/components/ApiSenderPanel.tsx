import { useState } from 'react';

export default function ApiSenderPanel({ updateLogs }: { updateLogs: (log: string) => void }) {
    const [selectedColor, setSelectedColor] = useState('green');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedColor(selectedOption.style.color);
    };

    const handleSendClick = () => {
        const method = document.getElementById("methodSelect") as HTMLSelectElement;
        const inputUrl = document.getElementById("inputUrl") as HTMLInputElement;
        const result = `Method: ${method.value} URL: ${inputUrl.value}`;
        
        // Zamiast używać lokalnego stanu, bezpośrednio wywołujemy updateLogs
        updateLogs(result);
    };

    return (
        <div className='sendPanel'>
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
            <input className="inputUrl" type="text" name="inputUrl" id="inputUrl" defaultValue="http://localhost:8000/" />
            <button className="sendButton" type="submit" id="sendButton" onClick={handleSendClick}>Send</button>
        </div>
    );
}
