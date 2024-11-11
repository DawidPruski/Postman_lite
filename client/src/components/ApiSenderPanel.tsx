import { useState } from 'react';
import { apiSender } from '../utils/apiHandlers'

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

    const handleSendClick = async () => {

        await apiSender(method, url, bodyContent, setResult, setBackgroundColor);

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
                API Tester
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
            <div className='HistoryLog' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#353535',
                borderRadius: '8px',
                height: '100%',
                boxSizing: 'border-box',
            }}>
                <ul id='logConsole' style={{
                    margin: 0,
                    padding: '16px',
                    backgroundColor: backgroundColor,
                    borderRadius: '8px',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                }}>
                    <pre style={{
                        fontFamily: 'inherit'
                    }}>
                        {result}
                    </pre>
                </ul>
            </div>
        </>
    );
}