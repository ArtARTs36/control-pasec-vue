<template>
    <div>
        <States/>
        <vs-row vs-justify="center">
            <vs-col type="flex" vs-justify="center" vs-align="center" vs-sm="12" vs-lg="12" vs-xs="12">
                <vs-card class="cardx">
                    <div slot="header">
                        <h4>
                            Курсы валют
                        </h4>
                    </div>
                    <div>
                        <SalesIncome/>
                    </div>
                </vs-card>

            </vs-col>

            <vs-col vs-lg="12">
                <vs-card>
                    <div slot="header">
                        <h4>Самые продаваемые продукты</h4>
                    </div>
                    <TopProducts/>
                </vs-card>
            </vs-col>
        </vs-row>
        <Blogs/>
    </div>
</template>

<script>
    import SalesSummary from './components/dashboard/SalesSummary.vue';
    import SalesIncome from './components/dashboard/SalesIncome.vue';
    import TopProducts from './components/dashboard/TopProducts.vue';
    import States from './components/dashboard/States.vue';
    import Blogs from './components/dashboard/Blogs.vue';

    export default {
        name: 'StarterPage',
        components: {
            SalesSummary,
            SalesIncome,
            TopProducts,
            States,
            Blogs
        }
    }
</script>
