<template>
    <vs-dropdown vs-custom-content vs-trigger-click left class="cursor-pointer pr-2 pl-2">
        <a class="text-white-dark" href="#">
            <vs-avatar :badge="currentUser.messages_unread_count"
                       color="primary" icon="mail_outline"
                       v-if="currentUser.messages"
            />
            <vs-avatar color="primary" icon="mail_outline"
                       v-else
            />
        </a>

        <vs-dropdown-menu style="width:20%">
            <vs-list style="overflow-y: auto;max-height:300px" v-if="currentUser.messages.length > 0">
                <div v-for="item in currentUser.messages">
                    <div class="vs-list--header vs-header-list-primary">
                        <div class="list-titles">
                            <div class="vs-list--title">
                                <vs-checkbox class="justify-content-start"
                                             v-model="item.is_read"
                                             :disabled="item.is_read"
                                             @change="read(item)"
                                             @click="read(item)"
                                >
                                    {{ item.from }}
                                </vs-checkbox>
                            </div>
                        </div>
                    </div>

                    <vs-list-item :subtitle="item.text">
                    </vs-list-item>
                </div>
            </vs-list>
            <div v-else>
                Нет сообщений
            </div>
        </vs-dropdown-menu>
    </vs-dropdown>
</template>

<script>
    import { http } from '@/plugins/http';
    import {mapGetters} from "vuex";
    export default {
        name: 'UserMessages',
        data: () => ({
            indexActive: 0,
            showToggle: false,
        }),
        computed: {
            ...mapGetters([
                'currentUser',
            ]),
        },
        methods: {
            read(notification) {
                const URL = window.API_URL + `/dialog-messages/${notification.id}/read`;

                http.put(URL).then(
                    response => {
                        notification = response.data;
                        this.currentUser.messages_unread_count--;
                    }
                );
            }
        }
    }
</script>
