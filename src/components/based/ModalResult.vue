<template lang="html">
    <vs-popup
            class="holamundo"
            :title="title"
            :active.sync="isOpenModalResult"
            @close="closeModal"
    >
    <p v-if="formErrors && formErrors.length">
        <vs-alert title="Пожалуйста исправьте указанные ошибки" active="true" color="danger" class="mb-3">
            <ul>
                <li v-for="error in formErrors">* {{ error }}</li>
            </ul>
        </vs-alert>
    </p>
    {{ result }}
    </vs-popup>
</template>

<script>
    export default {
        data() {
            return {
                isOpenModalResult: true
            }
        },

        props: [
            'result', '', 'formErrors', 'backLink', 'title'
        ],

        methods: {
            closeModal() {
                this.$emit('closeModal');
            }
        },
        mounted() {
            if (this.title === undefined) {
                this.title = 'Результат сохранения информации';
            }
        }
    }
</script>
