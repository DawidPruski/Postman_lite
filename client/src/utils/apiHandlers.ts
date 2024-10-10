import { AxiosResponse, AxiosError } from "axios";


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