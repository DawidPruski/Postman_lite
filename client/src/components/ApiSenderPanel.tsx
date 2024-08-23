import { useState } from 'react';

export default function ApiSenderPanel() {
    const [selectedColor, setSelectedColor] = useState('green');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedColor(selectedOption.style.color);
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
            <button className="sendButton" type="submit" id="sendButton">Send</button>
        </div>
    )
}