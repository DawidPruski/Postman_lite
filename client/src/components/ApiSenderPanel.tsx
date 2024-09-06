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
        const startTime = Date.now();

        axios.post('http://localhost:3000/api', { Method: method, URL: url })
            .then(response => {
                const responseTime = Date.now() - startTime;

                const headers = JSON.stringify(response.headers, null, 2);
                const config = JSON.stringify(response.config, null, 2);
                const data = JSON.stringify(response.data, null, 2);

                const result = `Method: ${method} URL: ${url}
                    \nStatus: ${response.status} \nStatusText: ${response.statusText}
                    \nResponse Time: ${responseTime}ms
                    \nHeaders:\n${headers}
                    \nConfig:\n${config}
                    \nData:\n${data}`;

                updateLogs(result);
            })
            .catch(error => {
                const responseTime = Date.now() - startTime;

                const headers = error.response ? JSON.stringify(error.response.headers, null, 2) : 'N/A';
                const config = error.response ? JSON.stringify(error.response.config, null, 2) : 'N/A';
                const data = error.response ? JSON.stringify(error.response.data, null, 2) : 'N/A';

                const result = `Method: ${method} URL: ${url}
                    \nStatus: ${error.response ? error.response.status : 'N/A'} 
                    \nStatusText: ${error.response ? error.response.statusText : 'N/A'}
                    \nResponse Time: ${responseTime}ms
                    \nHeaders:\n${headers}
                    \nConfig:\n${config}
                    \nData:\n${data}`;

                updateLogs(result);
            });
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