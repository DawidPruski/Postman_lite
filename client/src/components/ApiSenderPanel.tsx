import { useState } from 'react';
import axios from "axios";

export default function ApiSenderPanel() {
    const [selectedColor, setSelectedColor] = useState('green');
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://httpbin.org/get');
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
    const [bodyContent, setBodyContent] = useState('');
    const [result, setResult] = useState<string>('');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFormat(event.target.value);
    };

    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setBodyContent(newValue);
        console.log(newValue);
    }


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedColor(selectedOption.style.color);
        setMethod(event.target.value);
    };

    const handleSendClick = () => {
        const startTime = Date.now();

        if (bodyContent !== null) {
            axios.post('http://localhost:3000/api', { Method: method, URL: url, BodyContent: bodyContent })
                .then(response => {
                    const responseTime = Date.now() - startTime;

                    const headers = JSON.stringify(response.headers, null, 2);
                    // const config = JSON.stringify(response.config, null, 2);
                    const data = JSON.stringify(response.data, null, 2);

                    const result = `Method: ${method} URL: ${url}
                    \nStatus: ${response.status} \nStatusText: ${response.statusText}
                    \nResponse Time: ${responseTime}ms
                    \nHeaders:\n${headers}
                    \nData:\n${data}`;

                    setResult(result);
                })
                .catch(error => {
                    const responseTime = Date.now() - startTime;

                    const headers = error.response ? JSON.stringify(error.response.headers, null, 2) : 'N/A';
                    // const config = error.response ? JSON.stringify(error.response.config, null, 2) : 'N/A';
                    const data = error.response ? JSON.stringify(error.response.data, null, 2) : 'N/A';

                    const result = `Method: ${method} URL: ${url}
                    \nStatus: ${error.response ? error.response.status : 'N/A'} 
                    \nStatusText: ${error.response ? error.response.statusText : 'N/A'}
                    \nResponse Time: ${responseTime}ms
                    \nHeaders:\n${headers}
                    \nData:\n${data}`;

                    setResult(result);
                });
        } else {
            axios.post('http://localhost:3000/api', { Method: method, URL: url })
                .then(response => {
                    const responseTime = Date.now() - startTime;

                    const headers = JSON.stringify(response.headers, null, 2);
                    // const config = JSON.stringify(response.config, null, 2);
                    const data = JSON.stringify(response.data, null, 2);

                    const result = `Method: ${method} URL: ${url}
                    \nStatus: ${response.status} \nStatusText: ${response.statusText}
                    \nResponse Time: ${responseTime}ms
                    \nHeaders:\n${headers}
                    \nData:\n${data}`;

                    setResult(result);
                })
                .catch(error => {
                    const responseTime = Date.now() - startTime;

                    const headers = error.response ? JSON.stringify(error.response.headers, null, 2) : 'N/A';
                    // const config = error.response ? JSON.stringify(error.response.config, null, 2) : 'N/A';
                    const data = error.response ? JSON.stringify(error.response.data, null, 2) : 'N/A';

                    const result = `Method: ${method} URL: ${url}
                    \nStatus: ${error.response ? error.response.status : 'N/A'} 
                    \nStatusText: ${error.response ? error.response.statusText : 'N/A'}
                    \nResponse Time: ${responseTime}ms
                    \nHeaders:\n${headers}
                    \nData:\n${data}`;

                    setResult(result);
                });
        }
    };

    return (
        <>
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
            <div className='checkboxContainer'>
                <label htmlFor="JSON">JSON</label>
                <input
                    className='radioJSON'
                    type="radio"
                    name="format"
                    id="JSON"
                    value="JSON"
                    checked={selectedFormat === 'JSON'}
                    onChange={handleRadioChange}
                />
                <label htmlFor="XML">XML</label>
                <input
                    className='radioXML'
                    type="radio"
                    name="format"
                    id="XML"
                    value="XML"
                    checked={selectedFormat === 'XML'}
                    onChange={handleRadioChange}
                />
            </div>
            <div className='bodyContainer'>
                <textarea className='bodyTextArea'
                    value={bodyContent}
                    placeholder='Body goes here...'
                    onChange={handleBodyChange}
                    maxLength={1000}
                    minLength={1000}
                />
            </div>
            <div className='HistoryLog'>
                <ul id='logConsole'>
                    <pre>
                        {result}
                    </pre>
                </ul>
            </div>
        </>
    );
}