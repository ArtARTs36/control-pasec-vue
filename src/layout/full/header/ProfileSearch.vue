<template>
    <div>

    <vs-prompt
            @cancel="close"
            @accept="close"
            @close="close"
            :active.sync="isActive"
            accept-text="OK"
            cancel-text="Закрыть"
            title="Поиск пользователя"
    >
        <div class="con-exemple-prompt">
            Введите имя/фамилию/отчество/должность
            <vs-input v-model="query" style="width: 100%"
                      @keydown="searchProfiles"
                      @keyup="searchProfiles"
                      @keypress="searchProfiles"
            >

            </vs-input>

            <vs-list style="max-height: 400px; overflow-y: auto">
                <div v-for="profile in profiles">
                    <router-link tag="div" :to="{'name': 'Profile', 'params': {'id' : profile.id}}">
                    <div class="vs-list--item cursor-pointer">
                        <div class="vs-list--avatar">
                            <div class="con-vs-avatar null" style="background: rgb(195, 195, 195);">
                                <div class="con-img vs-avatar--con-img">
                                    <img :src="profile.avatar_url" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="list-titles">
                            <div class="vs-list--title">
                                {{ profile.family }}
                                {{ profile.name }}
                                {{ profile.patronymic }}
                            </div>

                            <div class="vs-list--subtitle">
                                {{ profile.position }}
                            </div>
                        </div>
                        <div class="vs-list--slot"></div></div>
                    </router-link>
                </div>
            </vs-list>
        </div>
    </vs-prompt>

    </div>
</template>

<script>
    export default {
        name: 'UserMessages',
        data: () => ({
            indexActive: 0,
            showToggle: false,
            query: '',
            profiles: [],
        }),

        props: [
            'isActive',
        ],

        methods: {
            close() {
                this.isActive = false;
                this.$emit('closeModal');
            },
            searchProfiles(e) {
                let query = e.target.value;
                if (!query) {
                    return;
                }

                let url = API_URL + '/profiles/search/' + query + '';

                this.$http.get(url)
                    .then(response => {
                        this.profiles = response.data.data;
                    });
            },
        }
    }
</script>
