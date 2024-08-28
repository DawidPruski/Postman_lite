import './App.css';
import ApiSenderPanel from './components/ApiSenderPanel';
import { useState } from 'react';

function App() {
    const [logs, setLogs] = useState<string[]>([]);

    const handleUpdateLogs = (newLog: string) => {
        setLogs(prevLogs => [...prevLogs, newLog]);
    };

    return (
        <>
            <ApiSenderPanel updateLogs={handleUpdateLogs} />
            <div className='HistoryLog'>
                <ul id='logConsole'>
                    {logs.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;
