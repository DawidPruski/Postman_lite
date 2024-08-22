export class CommunicatorToClient {
    static SelectMethod() {
        const method = document.getElementById("method") as HTMLSelectElement;
        if (method) {
            console.log(method.value);
        } else {
            console.error("Method select element not found");
        }
    }
}