export default function install(Vue) {
    Object.defineProperty(Vue.prototype, '$openNotifyToDocCreate', {
        get() {
            return function() {
                return this.$vs.notify({
                    title: 'Документ готовится',
                    text: 'Подождите некоторое время',
                    color: 'dark',
                    icon: 'access_time'
                });
            }
        }
    });

    Object.defineProperty(Vue.prototype, '$openNotifyToDocCreated', {
        get() {
            return function(document) {
                return this.$vs.notify({
                    title: 'Документ '+ document.title +' готов',
                    text: 'Что бы скачать нажмите на это сообщение',
                    color: 'primary',
                    icon:'check_box',
                    fixed: true,
                    click: () => {
                        window.open(document.download_url);
                    }
                })
            }
        }
    });

    Object.defineProperty(Vue.prototype, '$genDocument', {
        get() {
            return function(supplyId, typeId) {
                    this.$openNotifyToDocCreate();

                    this.$http.get(window.API_URL + '/generate-document/' + supplyId + '/' + typeId)
                        .then((response) => {
                            if (response.data) {
                                this.$openNotifyToDocCreated(response.data.data);
                            } else {
                                this.resultSave = response.data.message;
                            }
                        });
                };
        },
    });

    Object.defineProperty(Vue.prototype, '$genDocumentManyTypes', {
        get() {
            return function(supplyId, types) {
                    this.$openNotifyToDocCreate();

                    this.$http.post(window.API_URL + '/generate-documents/' + supplyId, {'types': types})
                        .then((response) => {
                            if (response.data) {
                                this.$openNotifyToDocCreated(response.data.data);
                            } else {
                                this.resultSave = response.data.message;
                            }
                        });
                }
        },
    });
}
