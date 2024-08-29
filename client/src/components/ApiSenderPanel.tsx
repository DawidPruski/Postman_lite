import { useState } from 'react';
import axios from "axios";

export default function ApiSenderPanel({ updateLogs }: { updateLogs: (log: string) => void }) {
    const [selectedColor, setSelectedColor] = useState('green');
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://httpbin.org/get');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedColor(selectedOption.style.color);
        setMethod(event.target.value);
    };

    const handleSendClick = () => {
        const result = `Method: ${method} URL: ${url}`;

        axios.post('http://localhost:3000/api', { Method: method, URL: url })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));

        updateLogs(result);
    };

    return (
        <div className='sendPanel'>
            <select
                className="methodSelect"
                id="methodSelect"
                value={method}
                onChange={handleSelectChange}
                style={{ color: selectedColor }}
            >
                <option value="GET" style={{ color: 'green' }}>GET</option>
                <option value="POST" style={{ color: 'yellow' }}>POST</option>
                <option value="PUT" style={{ color: 'cyan' }}>PUT</option>
                <option value="DELETE" style={{ color: 'red' }}>DELETE</option>
                <option value="PATCH" style={{ color: 'white' }}>PATCH</option>
            </select>
            <input
                className="inputUrl"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                name="inputUrl"
                id="inputUrl"
            />
            <button
                className="sendButton"
                type="submit"
                id="sendButton"
                onClick={handleSendClick}
            >
                Send
            </button>
        </div>
    );
}