import { http } from '@/plugins/http';

export const downloadScores = async function (suppliesIds) {
    let url = API_URL + '/score-for-payments/check-document-of-many/';

    let options = {
        'supplies': suppliesIds
    };

    return http.post(url, options);
};
