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
    <p v-if="link">
        <div class="form-group">
            <vs-button color="success" style="width:100%" type="filled" @click="redirectToLink">
                {{ linkTitle }}
            </vs-button>
        </div>
    </p>
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
            'result', '', 'formErrors', 'backLink', 'title', 'link', 'linkTitle'
        ],

        methods: {
            closeModal() {
                this.$emit('closeModal');
            },
            redirectToLink()
            {
                this.$router.push(this.link);
                this.isOpenModalResult = false;
            },
        },
        mounted() {
            if (this.title === undefined) {
                this.title = 'Результат сохранения информации';
            }
        }
    }
</script>
