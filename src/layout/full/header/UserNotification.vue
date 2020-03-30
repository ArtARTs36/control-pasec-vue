<template>
    <vs-dropdown vs-custom-content vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
        <a class="text-white-dark" href="#">
            <vs-avatar :badge="currentUser.notifications_unread_count"
                       color="primary" icon="notifications"
                       v-if="currentUser.notifications"
            />
            <vs-avatar color="primary" icon="notifications"
                       v-else
            />
        </a>

        <vs-dropdown-menu style="width:20%">
            <vs-list style="overflow-y: auto;max-height:300px">
                <div v-for="(item, index) in currentUser.notifications">
                    <div class="vs-list--header vs-header-list-primary">
                        <div class="list-titles">
                            <div class="vs-list--title">
                                <vs-checkbox class="justify-content-start"
                                             v-model="item.is_read"
                                             :disabled="item.is_read"
                                             @click="read(item)"
                                >
                                    Уведомление #{{ item.id }}
                                </vs-checkbox>
                            </div>
                        </div>
                    </div>

                    <vs-list-item :subtitle="item.message">
                    </vs-list-item>

                    <router-link :to="nextActions[index][0]">
                        <vs-button color="green" style="width:100%">
                           {{ nextActions[index][1] }}
                        </vs-button>
                    </router-link>
                </div>
            </vs-list>
        </vs-dropdown-menu>
    </vs-dropdown>
</template>

<script>
    import { http } from '@/plugins/http';
    import {mapGetters} from "vuex";
    export default {
        name: 'UserNotification',
        data: () => ({
            indexActive: 0,
            showToggle: false,
        }),
        computed: {
            ...mapGetters([
                'currentUser',
            ]),
            nextActions() {
                let actions = [];
                for (let i = 0; i < this.currentUser.notifications.length; i++) {
                    actions.push(
                        this.nextActionData(this.currentUser.notifications[i])
                    )
                }

                return actions;
            }
        },
        methods: {
            nextActionData(notification) {
                let link = '';
                let title = '';

                switch (notification.type.name) {
                    case window.USER_NOTIFICATION_TYPE_USER_REGISTERED:
                        link = `/users/${notification.about_model_id}/edit`;
                        title = 'Перейти к пользователю';
                        break;
                }

                return [
                    link,
                    title,
                ]
            },

            read(notification) {
                const URL = API_URL + `/user-notifications/${notification.id}/read`;

                http.put(URL).then(
                    response => {
                        notification = response.data;
                        this.currentUser.notifications_unread_count--;
                    }
                );
            }
        }
    }
</script>
