import axios, { AxiosResponse, AxiosError } from "axios";

const apiBaseUrl = process.env.NODE_ENV === 'production'
    ? 'https://endpoint-tester-web-tool-server.vercel.app'
    : 'http://localhost:3000';

export async function apiSender(method: string, url: string, bodyContent: string, setResult: (result: string) => void, setBackgroundColor: (color: string) => void) {
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

    try {
        const response = await axios.post(`${apiBaseUrl}/api`, {
            Method: method,
            URL: url,
            BodyContent: bodyJSON
        });
        const result = handleResponseAxios(response, startTime, method, url);
        statusCode(result, setResult, setBackgroundColor);
    } catch (error) {
        const result = handleErrorAxios(error as AxiosError, startTime, method, url);
        statusCode(result, setResult, setBackgroundColor);
    }
}

function statusCode(result: string, setResult: (result: string) => void, setBackgroundColor: (color: string) => void) {
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


export function handleResponseAxios(response: AxiosResponse, startTime: number, method: string, url: string) {
    const responseTime = Date.now() - startTime;

    const headers = JSON.stringify(response.headers, null, 2);
    const config = JSON.stringify(response.config, null, 2);
    const data = JSON.stringify(response.data, null, 2);

    return `Method: ${method} URL: ${url}
    \nStatus: ${response.status} \nStatusText: ${response.statusText}
    \nResponse Time: ${responseTime}ms
    \nHeaders:\n${headers}
    \nData:\n${data}
    \nConfig: \n${config}`;
};

export function handleErrorAxios(error: AxiosError, startTime: number, method: string, url: string) {
    const responseTime = Date.now() - startTime;

    const headers = error.response ? JSON.stringify(error.response.headers, null, 2) : 'N/A';
    const config = error.response ? JSON.stringify(error.response.config, null, 2) : 'N/A';
    const data = error.response ? JSON.stringify(error.response.data, null, 2) : 'N/A';

    return `Method: ${method} URL: ${url}
    \nStatus: ${error.response ? error.response.status : 'N/A'} 
    \nStatusText: ${error.response ? error.response.statusText : 'N/A'}
    \nResponse Time: ${responseTime}ms
    \nHeaders:\n${headers}
    \nData:\n${data}
    \nConfig: \n${config}`;
};