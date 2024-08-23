export class CommunicatorToClient {
    static SelectMethod() {
        const method = document.getElementById("methodSelect") as HTMLSelectElement;
        const sendMethod = document.getElementById("sendButton") as HTMLButtonElement;
        const inputUrl = document.getElementById("inputUrl") as HTMLInputElement;
        const logConsole = document.getElementById("logConsole") as HTMLLabelElement;
        
        if (sendMethod) {
            sendMethod.addEventListener('click', () => {
                const result: string = "Method: " + method.value + " URL: " + inputUrl.value;
                if (logConsole) {
                    logConsole.textContent = result;
                }
            });
        } else {
            console.error("Send button element not found");
        }
    }
}