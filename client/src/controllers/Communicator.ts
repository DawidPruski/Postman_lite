export class CommunicatorToClient {
    static SelectMethod() {
        const method = document.getElementById("methodSelect") as HTMLSelectElement;
        const sendMethod = document.getElementById("sendButton") as HTMLButtonElement;
        const inputUrl = document.getElementById("inputUrl") as HTMLInputElement;
        
        if (sendMethod) {
            sendMethod.addEventListener('click', () => {
                console.log("Method: " + method.value + " Url: " + inputUrl.value);
                
            })
        } else {
            console.error("Method select element not found");
        }
    }
}