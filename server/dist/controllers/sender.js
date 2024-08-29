"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSender = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiSender {
    static Post(url, data) {
        (0, axios_1.default)({
            method: 'post',
            url: url,
            data: {
                data
            }
        });
    }
    ;
    static Get(url) {
        (0, axios_1.default)({
            method: 'get',
            url: url
        });
    }
    ;
    static Patch(url, data) {
        (0, axios_1.default)({
            method: 'patch',
            url: url,
            data: {
                data
            }
        });
    }
    ;
    static Delete(url) {
        (0, axios_1.default)({
            method: 'delete',
            url: url
        });
    }
    ;
    static printresult() {
        console.log();
    }
    ;
}
exports.ApiSender = ApiSender;
;
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
