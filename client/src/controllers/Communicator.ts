export class CommunicatorToClient {
    static SelectMethod(updateLogs: (logs: string[]) => void) {
        const method = document.getElementById("methodSelect") as HTMLSelectElement;
        const sendMethod = document.getElementById("sendButton") as HTMLButtonElement;
        const inputUrl = document.getElementById("inputUrl") as HTMLInputElement;
        const containerHistory: string[] = [];

        if (sendMethod) {
            sendMethod.addEventListener('click', () => {
                const result: string = "Method: " + method.value + " URL: " + inputUrl.value;
                containerHistory.push(result);
                updateLogs([...containerHistory]);
            });
        } else {
            console.error("Send button element not found");
        }
    }
}