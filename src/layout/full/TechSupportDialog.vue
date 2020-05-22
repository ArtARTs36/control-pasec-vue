<template lang="html">
    <vs-prompt
            @cancel="closeModal"
            @accept="sendMessage"
            @close="closeModal"
            :active.sync="isOpen"
            accept-text="Отправить"
            cancel-text="Закрыть"
            title="Написать обращение в техническую поддержку"
    >
        <div class="con-exemple-prompt">
            <vs-textarea label="Опишите Вашу проблему"
                         v-model="report.message"/>
        </div>
    </vs-prompt>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: true,
                report: {
                    'message': '',
                },
            }
        },

        methods: {
            closeModal() {
                this.report.message = '';
                this.$emit('closeModal');
            },
            sendMessage() {
                this.$http.post(window.API_TECH_SUPPORT_REPORTS_INDEX, this.report)
                    .then(response => {
                        this.$messageSendNotify();
                    }).finally(() => {
                        this.closeModal();
                    });
            },
        },
    }
</script>
