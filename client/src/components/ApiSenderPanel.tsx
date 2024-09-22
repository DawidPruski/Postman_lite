import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";

export default function ApiSenderPanel() {
    const [selectedColor, setSelectedColor] = useState('green');
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://httpbin.org/get');
    // const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
    const [bodyContent, setBodyContent] = useState('');
    const [result, setResult] = useState<string>('');
    const [backgroundColor, setBackgroundColor] = useState('');

    // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSelectedFormat(event.target.value);
    // };

    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setBodyContent(newValue);
        // console.log(newValue);
    }


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedColor(selectedOption.style.color);
        setMethod(event.target.value);
    };

    function handleResponseAxios(response: AxiosResponse, startTime: number) {
        const responseTime = Date.now() - startTime;

        const headers = JSON.stringify(response.headers, null, 2);
        const config = JSON.stringify(response.config, null, 2);
        const data = JSON.stringify(response.data, null, 2);

        return `Method: ${method} URL: ${url}
        \nStatus: ${response.status} \nStatusText: ${response.statusText}
        \nResponse Time: ${responseTime}ms
        \nHeaders:\n${headers}
        \nData:\n${data}
        \nConfig: \n${config}`;
    };

    function handleErrorAxios(error: AxiosError, startTime: number) {
        const responseTime = Date.now() - startTime;

        const headers = error.response ? JSON.stringify(error.response.headers, null, 2) : 'N/A';
        const config = error.response ? JSON.stringify(error.response.config, null, 2) : 'N/A';
        const data = error.response ? JSON.stringify(error.response.data, null, 2) : 'N/A';

        return `Method: ${method} URL: ${url}
        \nStatus: ${error.response ? error.response.status : 'N/A'} 
        \nStatusText: ${error.response ? error.response.statusText : 'N/A'}
        \nResponse Time: ${responseTime}ms
        \nHeaders:\n${headers}
        \nData:\n${data}
        \nConfig: \n${config}`;
    };

    const handleSendClick = () => {
        const startTime = Date.now();
        let bodyJSON = {};  // Domyślnie pusty obiekt

        if (bodyContent.trim()) {  // Sprawdza, czy bodyContent nie jest pustym stringiem
            try {
                // Próbuj parsować bodyContent na JSON tylko wtedy, gdy nie jest pusty
                bodyJSON = JSON.parse(bodyContent);
            } catch (error) {
                console.error("Invalid JSON format in body content:", error);
                setResult("Invalid JSON format.");
                setBackgroundColor("rgba(255, 0, 0, 0.4)");
                return; // Zakończ funkcję, jeśli JSON jest niepoprawny
            }
        }

        const statusCode = (result: string) => {
            const match = result.match(/Status: (\d+)/);
            const statusCode: string = match ? match[1] : '';
            console.log(statusCode);

            switch (statusCode) {
                case "200":
                    setBackgroundColor('rgba(0, 255, 0, 0.2)');
                    setResult(result);
                    break;
                default:
                    setBackgroundColor("rgba(255, 0, 0, 0.4)");
                    setResult(result);
                    break;
            }
        }

        axios.post('https://endpoint-tester-web-tool-server.vercel.app/api', { Method: method, URL: url, BodyContent: bodyJSON }) //If u want deploy it localy change to http://localhost:3000
            .then(response => {
                const result = handleResponseAxios(response, startTime);
                statusCode(result)
            })
            .catch(error => {
                const result = handleErrorAxios(error, startTime);
                statusCode(result);
            });
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
            {/* <div className='checkboxContainer'>
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
            </div> */}
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
                    <pre style={{
                        backgroundColor: backgroundColor,
                        borderRadius: 8,
                        padding: 4,
                        margin: 0,
                        height: 'auto',
                        width: 'auto'
                    }}>
                        {result}
                    </pre>
                </ul>
            </div>
        </>
    );
}