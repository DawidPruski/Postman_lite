import { useEffect, useState } from 'react';
import { CommunicatorToClient } from '../controllers/Communicator';

export default function HistoryPanel() {
    const [logs, setLogs] = useState<string[]>([]);


    useEffect(() => {
        CommunicatorToClient.SelectMethod(setLogs);
    }, []);

    return (
        <div className="historyPanel">
            <ul id='logConsole'>
                {logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </div>
    );
}