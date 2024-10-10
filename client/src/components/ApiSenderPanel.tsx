import { useState } from 'react';
import { handleErrorAxios, handleResponseAxios } from '../utils/apiHandlers'
import axios from "axios";

export default function ApiSenderPanel() {
    const [selectedColor, setSelectedColor] = useState('green');
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://httpbin.org/get');
    const [bodyContent, setBodyContent] = useState('');
    const [result, setResult] = useState<string>('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setBodyContent(newValue);
    }


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedColor(selectedOption.style.color);
        setMethod(event.target.value);
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

        const apiBaseUrl = process.env.NODE_ENV === 'production'
            ? 'https://endpoint-tester-web-tool-server.vercel.app'
            : 'http://localhost:3000';

        axios.post(`${apiBaseUrl}/api`, {
            Method: method,
            URL: url,
            BodyContent: bodyJSON
        })
            .then(response => {
                const result = handleResponseAxios(response, startTime, method, url);
                statusCode(result)
            })
            .catch(error => {
                const result = handleErrorAxios(error, startTime, method, url);
                statusCode(result);
            });
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap" rel="stylesheet"></link>
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '70px',
                    fontFamily: 'Rubik Bubbles'
                }}>
                EndpointTester
            </h1>
            <div className='sendPanel'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50px',
                    margin: '20px'
                }}>
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
            </div >
            < div className='bodyContainer'
                style={{
                    margin: 20
                }}>
                <textarea className='bodyTextArea'
                    value={bodyContent}
                    placeholder='Body goes here...'
                    onChange={handleBodyChange}
                    maxLength={1000}
                    minLength={1000}
                />
            </div >
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