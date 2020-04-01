<template>
    <vs-row vs-justify="center">
        <vs-card>
            <div slot="header">
                <h4>Список товаров</h4>
            </div>

            <div class="table-responsive">
                <table class="table v-middle border">
                    <thead>
                    <tr class="">
                        <th class="border-top-0">#</th>
                        <th class="border-top-0">Наименование</th>
                        <th class="border-top-0">Для документов</th>
                        <th class="border-top-0">Размер</th>
                        <th class="border-top-0">ГОСТ</th>
                        <th class="border-top-0">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in products">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.name_for_document}}</td>
                        <td>{{ item.size }} {{ item.size_of_unit.short_name}}</td>
                        <td>{{ item.gos_standard.name}}</td>
                        <td>
                            <a href="#" style="color:red" @click="removeProduct(item.id)" title="Удалить товар">
                                <i class="material-icons">
                                    delete_forever
                                </i>
                            </a>

                            <router-link :to="{ name: 'ProductEdit', params: { id: item.id }}">
                                <i class="material-icons" title="Редактировать">
                                    edit
                                </i>
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <vs-pagination
                    color="#f91f43"
                    :total="totalPages"
                    v-model="currentPage"
                    prev-icon="arrow_back" next-icon="arrow_forward"
                    @change="loadProducts"
            ></vs-pagination>
        </vs-card>
    </vs-row>
</template>

<script>
    export default {
        name: "ProductList",
        data: () => ({
            products: [],
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            totalPages: null,
        }),


        created() {
            this.loadProducts(1);

            document.title = 'Список товаров';
        },

        methods: {
            loadProducts(page) {
                if (page === undefined) {
                    page = this.currentPage;
                }

                const URL = API_URL + '/products/page-' + page;

                this.$http.get(URL)
                    .then(response => {
                        this.products = response.data.data;
                        this.totalCount = response.data.total;
                        this.isLoadEntries = true;

                        this.currentPage = page;
                        this.totalPages = response.data.last_page;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            refreshProducts(page) {
                this.loadProducts(page);
            },
            removeProduct(id) {
                this.$http.delete(API_URL + '/products/' + id)
                    .then(response => {
                        this.openModalResult('Контрагент удален!');
                        this.refreshProducts();
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            openModalResult(result) {
                this.isOpenModalResult = true;
                this.resultAction = result;
            }
        }
    };
</script>
