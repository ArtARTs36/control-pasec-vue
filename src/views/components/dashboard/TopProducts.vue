<template>
<div class="table-responsive">
<table class="table v-middle border">
    <thead>
        <tr class="">
            <th class="border-top-0">Товар</th>
            <th class="border-top-0">Количество</th>
            <th class="border-top-0">Сумма</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in products">
            <td>
                <div class="d-flex align-items-center">
                    <div class="mr-2"><vs-avatar :color="colors[index]" :text="item.name" /></div>
                    <div class="">
                        <h5 class="m-b-0">{{ item.name }}</h5>
                    </div>
                </div>
            </td>
            <td>{{ item.quantities }}</td>
            <td>
                <h5 class="m-b-0">{{ item.currency.symbol }} {{ item.prices }}</h5>
            </td>
        </tr>
    </tbody>
</table>
</div>
</template>
<script>
export default {
    name: "TopProducts",

    data() {
        return {
            'products': null,
            'colors': [
                'primary', 'danger', 'success', 'warning'
            ]
        }
    },

    methods: {
        loadProducts() {
            this.$http.get(API_PRODUCTS_INDEX + '/top-chart')
                .then(response => {
                    this.products = response.data;
                });
        },
    },

    created() {
        this.loadProducts();
    }
}
</script>
