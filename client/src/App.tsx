import './App.css';
import ApiSenderPanel from './components/ApiSenderPanel';
import { useState } from 'react';

function App() {
    const [logs, setLogs] = useState<string[]>([]);

    const handleUpdateLogs = (newLog: string) => {
        setLogs(prevLogs => [newLog, ...prevLogs]);
    };

    return (
        <>
            <ApiSenderPanel updateLogs={handleUpdateLogs} />
            <div className='HistoryLog'>
                <ul id='logConsole'>
                    {logs.map((log, index) => (
                        <li key={index}>
                            <pre>{log}</pre>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;
