import { useEffect } from 'react';
import { CommunicatorToClient } from '../controllers/Communicator';

export default function HistoryPanel() {
    useEffect(() => {
        CommunicatorToClient.SelectMethod();
    }, []);

    return (
        <div className="historyPanel">
            <label id="logConsole"></label>
        </div>
    );
}