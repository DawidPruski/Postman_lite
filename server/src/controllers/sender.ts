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