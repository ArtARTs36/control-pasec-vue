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
                      @keypress="searchProfiles"
            >

            </vs-input>

            <vs-list style="max-height: 400px; overflow-y: auto">
                <div v-for="profile in profiles" @click="openProfile(profile)">
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
                                <high-light v-bind:query="query" v-bind:given="profile.family">

                                </high-light>

                                &nbsp;

                                <high-light v-bind:query="query" v-bind:given="profile.name">

                                </high-light>

                                &nbsp;

                                <high-light v-bind:query="query" v-bind:given="profile.patronymic">

                                </high-light>
                            </div>

                            <div class="vs-list--subtitle">
                                <high-light v-bind:query="query" v-bind:given="profile.position">

                                </high-light>
                            </div>
                        </div>
                        <div class="vs-list--slot"></div></div>
                </div>
            </vs-list>
        </div>
    </vs-prompt>

    </div>
</template>

<script>
    import HighLight from '@/layout/full/HighLight.vue';
    export default {
        name: 'UserMessages',
        components: {
            HighLight,
        },
        data: () => ({
            indexActive: 0,
            showToggle: false,
            lastQuery: '',
            profiles: [],
            query: '',
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
                if (!query || query === '' || this.lastQuery === query) {
                    return;
                }

                this.lastQuery = query;

                let url = API_URL + '/profiles/search/' + query + '';

                this.$http.get(url)
                    .then(response => {
                        this.profiles = response.data.data;
                    });
            },
            openProfile(profile) {
                this.close();

                this.$router.push('/profile/' + profile.id);
            },
        }
    }
</script>
