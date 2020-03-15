import { http } from '@/plugins/http';

export const downloadTorg12 = function (supplyId) {
    return http.get(API_URL + '/supplies/' + supplyId +'/torg12');
};

export const downloadScores = async function (suppliesIds) {
    let url = API_URL + '/score-for-payments/check-document-of-many/';

    let options = {
        'supplies': suppliesIds
    };

    return http.post(url, options);
};

export const downloadOneTForm = async function (supplyId) {
    return http.get(API_URL + '/supplies/' + supplyId +'/oneTForm');
};
