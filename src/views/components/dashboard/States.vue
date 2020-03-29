<template>
    <vs-row v-if="stat !== null">
        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ stat.contragentsCount }}</h4>
                <span>
                    {{ stat.contragentsCount | decOfNum([
                        'Контрагент', 'Контрагента', 'Контрагентов'
                    ]) }}
                </span>
                <vs-divider icon="face" position="center" color="primary"></vs-divider>
            </vs-card>
        </vs-col>

        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ stat.suppliesCount }}</h4>
                <span>
                    {{ stat.suppliesCount | decOfNum([
                        'Поставка', 'Поставки', 'Поставок'
                    ]) }}
                </span>
                <vs-divider icon="shopping_cart" position="center" color="success"></vs-divider>
            </vs-card>
        </vs-col>

        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ stat.usersCount }}</h4>
                <span>
                    {{ stat.usersCount | decOfNum([
                        'Пользователь', 'Пользователя', 'Пользователей'
                    ]) }}
                </span>
                <vs-divider icon="face" position="center" color="danger"></vs-divider>
            </vs-card>
        </vs-col>

        <vs-col vs-lg="3" vs-xs="12">
            <vs-card>
                <h4 class="mb-1">{{ stat.externalNewsSourcesCount }}</h4>
                <span>
                    {{ stat.externalNewsSourcesCount | decOfNum([
                        'Источник', 'Источника', 'Источников'
                    ]) }}
                    Новостей
                </span>
                <vs-divider icon="menu_book" position="center"></vs-divider>
            </vs-card>
        </vs-col>
    </vs-row>
</template>
<script>
    export default {
        name: "States",

        data() {
            return {
                'stat': null
            }
        },

        created() {
            this.getGeneralStat();
        },

        methods: {
            getGeneralStat() {
                this.$axios.get(API_STAT_GENERAL)
                    .then(response => {
                        this.stat = response.data;
                    });
            }
        }
    }
</script>
