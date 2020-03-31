<template>


    <div class="wrapper profile-page">
        <div class="page-header clear-filter" filter-color="orange">
            <div class="page-header-image" data-parallax="true" style="background-image:url('https://images.unsplash.com/photo-1476984251899-8d7fdfc5c92c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3700&q=80');">
            </div>
            <div class="container">
                <div class="photo-container">
                    <img :src="profile.avatar_url"
                         class="profile-avatar"
                         alt="">
                </div>
                <h3 class="title h3">{{ profile.name }} {{ profile.family }}</h3>
                <p class="category">{{ profile.position }}</p>
                <div class="content">
                    <div class="social-description">
                        <h2 class="h2">26</h2>
                        <p>Comments</p>
                    </div>
                    <div class="social-description">
                        <h2 class="h2">26</h2>
                        <p>Comments</p>
                    </div>
                    <div class="social-description">
                        <h2 class="h2">{{ profile.days }}</h2>
                        <p>
                            {{ profile.days | decOfNum([
                                'День', 'Дня', 'Дней'
                            ]) }}
                            на портале
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="button-container">
                    <a class="profile_btn btn-primary btn-round btn-lg"
                       style="color:white"
                       @click="activePrompt = true"
                    >
                        Написать сообщение
                    </a>

<!--                    <a href="#button" class="profile_btn btn-default btn-round btn-lg btn-icon profile-link" rel="tooltip" title="Follow me on Twitter">-->
<!--                        <i class="fab fa-twitter"></i>-->
<!--                    </a>-->
<!--                    <a href="#button" class="profile_btn btn-default btn-round btn-lg btn-icon profile-link" rel="tooltip" title="Follow me on Instagram">-->
<!--                        <i class="fab fa-instagram"></i>-->
<!--                    </a>-->

                </div>

                <div>
                    <h3 class="title h3">
                        Обо мне

                        <i class="material-icons edit-btn cursor-pointer"
                           title="Редактировать"
                           @click="isEditAboutMe = !isEditAboutMe"
                           v-if="isCurrentUser"
                        >
                            edit
                        </i>
                    </h3>

                    <h5 class="description h5" v-if="isEditAboutMe">
                        <vs-textarea v-model="profile.about_me">

                        </vs-textarea>

                        <vs-button color="success" type="border" @click="updateAboutMe">
                            Сохранить
                        </vs-button>
                    </h5>

                    <h5 class="description h5" v-else>
                        {{
                            profile.about_me ? profile.about_me :
                            'Поле не заполнено'
                        }}
                    </h5>
                </div>

            </div>
        </div>

        <vs-prompt
                @cancel="newMessage.text=''"
                @accept="sendMessage"
                @close="close"
                :active.sync="activePrompt"
                accept-text="Отправить"
                cancel-text="Закрыть"
                :title="dialogTitle"
        >
            <div class="con-exemple-prompt">
                Введите сообщение
                <vs-textarea v-model="newMessage.text"/>
            </div>
        </vs-prompt>
    </div>
</template>

<style>
    .profile_btn {
        border-width: 2px;
        font-weight: 400;
        font-size: 0.8571em;
        line-height: 1.35em;
        margin: 10px 1px;
        border: none;
        border-radius: 0.1875rem;
        padding: 11px 22px;
        cursor: pointer;
        background-color: #888888;
        color: #FFFFFF;
    }

    .profile_btn.btn-icon{
        height: 2.375rem;
        min-width: 2.375rem;
        width: 2.375rem;
        padding: 0;
        font-size: 0.9375rem;
        overflow: hidden;
        position: relative;
        line-height: normal;
    }

    .profile_btn.btn-icon.btn-lg {
        height: 3.6rem;
        min-width: 3.6rem;
        width: 3.6rem;
    }

    .profile_btn.btn-icon.btn-lg i.now-ui-icons,
    .profile_btn.btn-icon.btn-lg i.fab,
    .navbar .navbar-nav>a.profile_btn.btn-icon.btn-lg i.now-ui-icons,
    .navbar .navbar-nav>a.profile_btn.btn-icon.btn-lg i.fab {
        font-size: 1.325rem;
    }

    .profile_btn.btn-icon:not(.btn-footer) i.now-ui-icons,
    .profile_btn.btn-icon:not(.btn-footer) i.fab,
    .navbar .navbar-nav>a.profile_btn.btn-icon:not(.btn-footer) i.now-ui-icons,
    .navbar .navbar-nav>a.profile_btn.btn-icon:not(.btn-footer) i.fab {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-12px, -12px);
        line-height: 1.5626rem;
        width: 23px;
    }


    .btn-primary {
        background-color: #f96332;
        color: #FFFFFF;
    }

    .btn-primary:hover,
    .btn-primary:focus,
    .btn-primary:not(:disabled):not(.disabled):active,
    .btn-primary:not(:disabled):not(.disabled).active,
    .btn-primary:not(:disabled):not(.disabled):active:focus,
    .btn-primary:not(:disabled):not(.disabled).active:focus,
    .btn-primary:active:hover,
    .btn-primary.active:hover {
        background-color: #fa7a50;
        color: #FFFFFF;
        box-shadow: none;
    }

    .btn-primary:hover {
        box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.17);
    }

    .btn-primary:disabled,
    .btn-primary:disabled:hover,
    .btn-primary:disabled:focus,
    .btn-primary:disabled:active,
    .btn-primary:disabled.active,
    .btn-primary[disabled],
    .btn-primary[disabled]:hover,
    .btn-primary[disabled]:focus,
    .btn-primary[disabled]:active,
    .btn-primary[disabled].active {
        background-color: #f96332;
        border-color: #f96332;
    }

    .btn-round {
        border-width: 1px;
        border-radius: 30px !important;
        padding: 11px 23px;
    }

    .btn-lg {
        font-size: 1em;
        border-radius: 0.25rem;
        padding: 15px 48px;
    }

    .h2, .h3, .h4, .h5 {
        font-weight: 400;
    }

    .button-container a {
        color: #fff;
    }

    .h2 {
        font-size: 2.5em;
        margin-bottom: 30px;
    }

    .h3{
        font-size: 1.825em;
        margin-bottom: 30px;
        line-height: 1.4em;
    }

    .h4 {
        font-size: 1.5em;
        line-height: 1.45em;
        margin-top: 30px;
        margin-bottom: 15px;
    }

    .h4+.category,
    .h4.title+.category {
        margin-top: -5px;
    }

    .h5 {
        font-size: 1.3em;
        line-height: 1.4em;
        margin-bottom: 15px;
    }

    .h5.category {
        font-weight: 400;
    }

    p {
        line-height: 1.61em;
        font-weight: 300;
        font-size: 1.2em;
    }

    .title {
        font-weight: 700;
        padding-top: 30px;
    }

    .title+.category {
        margin-top: -25px;
    }

    .description {
        color: #9A9A9A;
        font-weight: 300;
    }

    .category {
        text-transform: capitalize;
        font-weight: 700;
        color: #9A9A9A;
    }

    .profile-page {
        color: #2c2c2c;
        font-size: 14px;
        font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
        overflow-x: hidden;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }

    img.profile-avatar {
        max-width: 100%;
        border-radius: 1px;
    }

    .profile-page .page-header {
        min-height: 550px;
    }

    .profile-page .photo-container {
        width: 123px;
        height: 123px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
    }

    .profile-page .title {
        text-align: center;
        margin-top: 30px;
    }

    .profile-page .description,
    .profile-page .category {
        text-align: center;
    }

    .profile-page h5.description {
        max-width: 700px;
        margin: 20px auto 75px;
    }

    .profile-page {
        margin-top: 30px;
    }

    .profile-page .content {
        max-width: 450px;
        margin: 0 auto;
    }

    .profile-page .content .social-description {
        display: inline-block;
        max-width: 150px;
        width: 145px;
        text-align: center;
        margin: 15px 0 0px;
    }

    .profile-page .content .social-description h2 {
        margin-bottom: 15px;
    }

    .profile-page .button-container {
        text-align: center;
        margin-top: -106px;
    }

    .profile-page .collections img {
        margin-bottom: 30px;
    }

    .profile-page {
        margin-top: 45px;
        padding-bottom: 50px;
    }

    .profile-page .page-header:before {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        display: block;
        left: 0;
        top: 0;
        content: "";
        background-color: rgba(0, 0, 0, 0.5);
    }

    .section {
        padding: 70px 0;
        position: relative;
        background: #FFFFFF;
    }

    .section .row+.category {
        margin-top: 15px;
    }

    .page-header {
        min-height: 100vh;
        max-height: 999px;
        padding: 0;
        color: #FFFFFF;
        position: relative;
        overflow: hidden;
    }

    .page-header>.content {
        margin-top: 12%;
        text-align: center;
        margin-bottom: 50px;
    }

    .page-header:before {
        background-color: rgba(0, 0, 0, 0.3);
    }

    .page-header>.container {
        z-index: 2;
        padding-top: 12vh;
        padding-bottom: 40px;
    }

    .page-header .page-header-image {
        position: absolute;
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    .page-header footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .page-header .container {
        height: 100%;
        z-index: 1;
        text-align: center;
        position: relative;
    }

    .page-header .category,
    .page-header .description {
        color: rgba(255, 255, 255, 0.8);
    }

    .page-header:after,
    .page-header:before {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        display: block;
        left: 0;
        top: 0;
        content: "";
    }

    .clear-filter:after,
    .clear-filter:before {
        display: none;
    }

    .clear-filter[filter-color="orange"] {
        background: rgba(44, 44, 44, 0.2);
        background: -webkit-linear-gradient(90deg, rgba(44, 44, 44, 0.2), rgba(224, 23, 3, 0.6));
        background: -o-linear-gradient(90deg, rgba(44, 44, 44, 0.2), rgba(224, 23, 3, 0.6));
        background: -moz-linear-gradient(90deg, rgba(44, 44, 44, 0.2), rgba(224, 23, 3, 0.6));
        background: linear-gradient(0deg, rgba(44, 44, 44, 0.2), rgba(224, 23, 3, 0.6));
    }

    .edit-btn {
        background: #eee; padding: 2px; border-radius: 2px;
    }

    .edit-btn:hover {
        background: #ccc;
    }
</style>


<script>
    import {mapGetters} from "vuex";
    import {currentUser} from "../../auth/vuex/getters";
    export default {
        name: "Profile",
        data: () => ({
            error: null,
            totalCount: null,
            maxCountEntriesForOnePage: 10,
            isLoadEntries: false,
            currentOffset: 0,
            currentPage: 1,
            isOpenModalResult: false,
            resultAction: '',
            totalPages: null,
            newMessage: {
                'text': null,
                'to_user_id' : null,
            },
            profile: {

            },
            activePrompt: false,
            isEditAboutMe: false,
        }),

        computed: {
            ...mapGetters([
                'currentUser', 'currentUserRoles',
            ]),
            isCurrentUser() {
                return this.profile.id === this.currentUser.id || this.currentUserRoles.includes(window.ROLE_ADMIN);
            },
            dialogTitle() {
                return 'Сообщение для: ' + this.profile.name + ' ' + this.profile.family;
            },
        },

        created() {
            this.loadDialog(this.$route.params.id);
        },

        methods: {
            loadDialog(profileId) {
                this.$http.get(window.API_URL + '/profiles/' + profileId)
                    .then(response => {
                        this.profile = response.data.data;

                        document.title = 'Профиль ' + this.profile.family + ' ' + this.profile.name;
                    })
                    .catch(e => {
                        this.error=e;
                    });
            },
            closeModalResult() {
                this.isOpenModalResult = false;
            },
            openModalResult(result) {
                this.isOpenModalResult = true;
                this.resultAction = result;
            },
            getAvatar(message) {
                if (message.is_my_user_author) {
                    return this.currentUser.avatar_url;
                }

                return this.profile.inter_user.avatar_url;
            },
            sendMessage() {
                this.newMessage.to_user_id = this.profile.id;

                this.$http.post(window.API_URL + '/dialog-messages/', this.newMessage)
                    .then(response => {
                        this.$messageSendNotify();
                    });
            },
            close() {
                this.newMessage.text = '';
            },
            updateAboutMe() {
                this.$http.put(window.API_URL + '/profiles/update-about-me', this.profile)
                    .then(response => {
                        this.$vs.notify({
                            title: 'Успех',
                            text: 'Информация сохранена',
                            color: 'success',
                            icon:'check_box',
                        })
                    });
            },
        }
    };
</script>
