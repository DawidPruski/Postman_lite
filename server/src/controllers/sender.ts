import axios from "axios";

export class ApiSender {

    static Post(url: string, data: any) {
        axios({
            method: 'post',
            url: url,
            data: {
                data
            }
        })
    };

    static Get(url: string) {
        axios({
            method: 'get',
            url: url
        })
    };

    static Patch(url: string, data: any) {
        axios({
            method: 'patch',
            url: url,
            data: {
                data
            }
        })
    };

    static Delete(url: string) {
        axios({
            method: 'delete',
            url: url
        })
    };

    static printresult() {
        console.log();
    };
};

/* Na przyszłość może */
// import axios from "axios";

// export class ApiSender {

//     static async Post(url: string, data: any) {
//         try {
//             const response = await axios.post(url, data);
//             return response.data;
//         } catch (error) {
//             console.error("Error in Post request:", error);
//             throw error;
//         }
//     };

//     static async Get(url: string) {
//         try {
//             const response = await axios.get(url);
//             return response.data;
//         } catch (error) {
//             console.error("Error in Get request:", error);
//             throw error;
//         }
//     };

//     static async Patch(url: string, data: any) {
//         try {
//             const response = await axios.patch(url, data);
//             return response.data;
//         } catch (error) {
//             console.error("Error in Patch request:", error);
//             throw error;
//         }
//     };

//     static async Delete(url: string) {
//         try {
//             const response = await axios.delete(url);
//             return response.data;
//         } catch (error) {
//             console.error("Error in Delete request:", error);
//             throw error;
//         }
//     };
// }