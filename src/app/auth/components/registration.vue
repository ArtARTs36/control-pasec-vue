<script>
    /* eslint-disable no-undef */
    import { mapActions, mapState } from 'vuex';
    import { version } from '../../../../package.json';
    import ModalResult from "../../../components/based/ModalResult";
    import { http } from '@/plugins/http';

    export default {
        components: {
            ModalResult
        },
        data() {
            this.getRoles();

            let blankUser = {
                email: '',
                name: '',
                patronymic: '',
                family: '',
                password: '',
                role_id: '',
                gender: window.USER_GENDER_MALE,
            };

            let genders = [
                {
                    value: window.USER_GENDER_MALE,
                    text: 'Мужской',
                },
                {
                    value: window.USER_GENDER_FEMALE,
                    text: 'Женский',
                },
            ];

            return {
                version,
                error: false,
                isOpenModalResult: false,
                formErrors: [],
                roles: [],
                user: blankUser,
                resultAction: '',
                genders,
            };
        },
        computed: {
            ...mapState(['fetching']),
            submitText() {
                const value = 'Войти';
                return this.fetching ? '' : value;
            },
        },
        methods: {
            ...mapActions(['attemptLogin', 'setMessage']),

            getRoles() {
                http.get(API_URL + '/signup-roles')
                    .then(response => {
                        this.roles = response.data;
                    });
            },

            submit(event) {
                event.preventDefault();

                this.formErrors = [];
                if (!this.user.email) {
                    this.formErrors.push('Не указан адрес электронной почты');
                }

                if (!this.user.password) {
                    this.formErrors.push('Не указан пароль');
                }

                if (this.formErrors.length) {
                    this.isOpenModalResult = true;
                    return null;
                }

                http.post(API_URL + '/signup', this.user)
                    .then(response => {
                        this.resultAction = response.data.message;
                        this.isOpenModalResult = true;
                    })
                    .catch(e => {
                        this.resultAction = e.toString();
                        this.isOpenModalResult = true;
                    });
            },

            closeModalResult() {
                this.isOpenModalResult = false;
            }
        },
    };
</script>

<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <form class="login100-form validate-form" @submit="submit">
                        <span class="login100-form-title">
                        Регистрация
                        </span>

                    <vs-select
                            v-model="user.role_id"
                            style="width:100%"
                            autocomplete
                    >
                        <vs-select-item v-for="(unit, index) in roles"
                                        :value="unit.id"
                                        :text="unit.title"
                                        :key="index"
                        >
                        </vs-select-item>
                    </vs-select>

                    <br/>

                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" v-model="user.name" placeholder="Имя">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                          <i class="material-icons" aria-hidden="true">
                            face
                          </i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" v-model="user.patronymic" placeholder="Отчество">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                          <i class="material-icons" aria-hidden="true">
                            record_voice_over
                          </i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" v-model="user.family" placeholder="Фамилия">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                          <i class="material-icons" aria-hidden="true">
                            supervisor_account
                          </i>
                        </span>
                    </div>

                    <vs-select
                            v-model="user.gender"
                            style="width:100%"
                            autocomplete
                    >
                        <vs-select-item v-for="(unit, index) in genders"
                                        :value="unit.value"
                                        :text="unit.text"
                                        :key="index"
                        >
                        </vs-select-item>
                    </vs-select>

                    <br/>

                    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                        <input class="input100" type="text" v-model="user.email" placeholder="Адрес электронной почты">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                          <i class="material-icons" aria-hidden="true">
                            email
                          </i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" type="password" v-model="user.password" placeholder="Пароль">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                      <i class="material-icons" aria-hidden="true">
                        vpn_key
                      </i>
                    </span>
                    </div>

                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn">
                            Зарегистрироваться
                        </button>

                        <br/>
                        <br/>
                        <br/>

                        <router-link :to="{'name': 'AuthForm'}">
                            Назад
                        </router-link>
                    </div>
                </form>
            </div>
        </div>

        <ModalResult
                v-if="isOpenModalResult"
                @closeModal="closeModalResult"
                v-bind:form-errors="formErrors"
                title="Авторизация"
                v-bind:result="resultAction"
        />
    </div>

</template>

<style scoped="scoped">
    @font-face {
        font-family: Poppins-Regular;
        src: url('/assets/auth-form/fonts/poppins/Poppins-Regular.ttf');
    }

    @font-face {
        font-family: Poppins-Bold;
        src: url('/assets/auth-form/fonts/poppins/Poppins-Bold.ttf');
    }

    @font-face {
        font-family: Poppins-Medium;
        src: url('/assets/auth-form/fonts/poppins/Poppins-Medium.ttf');
    }

    @font-face {
        font-family: Montserrat-Bold;
        src: url('/assets/auth-form/fonts/montserrat/Montserrat-Bold.ttf');
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container-login100 {
        font-family: Poppins-Regular, sans-serif;
    }

    a {
        font-family: Poppins-Regular;
        font-size: 14px;
        line-height: 1.7;
        color: #666666;
        margin: 0;
        transition: all 0.4s;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
    }

    a:focus {
        outline: none !important;
    }

    a:hover {
        text-decoration: none;
        color: #57b846;
    }

    h1,h2,h3,h4,h5,h6 {
        margin: 0;
    }

    p {
        font-size: 14px;
        line-height: 1.7;
        color: #666666;
        margin: 0px;
    }

    ul, li {
        margin: 0px;
        list-style-type: none;
    }

    input, textarea {
        outline: none;
        border: none;
    }

    textarea:focus, input:focus {
        border-color: transparent !important;
    }

    input:focus::-webkit-input-placeholder { color:transparent; }
    input:focus:-moz-placeholder { color:transparent; }
    input:focus::-moz-placeholder { color:transparent; }
    input:focus:-ms-input-placeholder { color:transparent; }

    textarea:focus::-webkit-input-placeholder { color:transparent; }
    textarea:focus:-moz-placeholder { color:transparent; }
    textarea:focus::-moz-placeholder { color:transparent; }
    textarea:focus:-ms-input-placeholder { color:transparent; }

    input::-webkit-input-placeholder { color: #999999; }
    input:-moz-placeholder { color: #999999; }
    input::-moz-placeholder { color: #999999; }
    input:-ms-input-placeholder { color: #999999; }

    textarea::-webkit-input-placeholder { color: #999999; }
    textarea:-moz-placeholder { color: #999999; }
    textarea::-moz-placeholder { color: #999999; }
    textarea:-ms-input-placeholder { color: #999999; }

    button {
        outline: none !important;
        border: none;
        background: transparent;
    }

    button:hover {
        cursor: pointer;
    }

    iframe {
        border: none !important;
    }

    .limiter {
        width: 100%;
        margin: 0 auto;
    }

    .container-login100 {
        width: 100%;
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background: #9053c7;
        background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
        background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
        background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
        background: linear-gradient(-135deg, #c850c0, #4158d0);
    }

    .wrap-login100 {
        background: #fff;
        border-radius: 10px;
        overflow: hidden;

        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 177px 130px 33px 95px;
    }

    .login100-pic {
        width: 316px;
    }

    .login100-pic img {
        max-width: 100%;
    }

    .login100-form-title {
        font-family: Poppins-Bold;
        font-size: 24px;
        color: #333333;
        line-height: 1.2;
        text-align: center;

        width: 100%;
        display: block;
        padding-bottom: 54px;
    }

    .wrap-input100 {
        position: relative;
        width: 100%;
        z-index: 1;
        margin-bottom: 10px;
    }

    .input100 {
        font-family: Poppins-Medium;
        font-size: 15px;
        line-height: 1.5;
        color: #666666;

        display: block;
        width: 100%;
        background: #e6e6e6;
        height: 50px;
        border-radius: 25px;
        padding: 0 30px 0 68px;
    }

    .focus-input100 {
        display: block;
        position: absolute;
        border-radius: 25px;
        bottom: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 0px 0px;
        color: rgba(87,184,70, 0.8);
    }

    .input100:focus + .focus-input100 {
        -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
        animation: anim-shadow 0.5s ease-in-out forwards;
    }

    @-webkit-keyframes anim-shadow {
        to {
            box-shadow: 0px 0px 70px 25px;
            opacity: 0;
        }
    }

    @keyframes anim-shadow {
        to {
            box-shadow: 0px 0px 70px 25px;
            opacity: 0;
        }
    }

    .symbol-input100 {
        font-size: 15px;

        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        position: absolute;
        border-radius: 25px;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-left: 35px;
        pointer-events: none;
        color: #666666;

        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    .input100:focus + .focus-input100 + .symbol-input100 {
        color: #57b846;
        padding-left: 28px;
    }

    .container-login100-form-btn {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 20px;
    }

    .login100-form-btn {
        font-family: Montserrat-Bold;
        font-size: 15px;
        line-height: 1.5;
        color: #fff;
        text-transform: uppercase;

        width: 100%;
        height: 50px;
        border-radius: 25px;
        background: #57b846;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 25px;

        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    .login100-form-btn:hover {
        background: #333333;
    }

    @media (max-width: 992px) {
        .wrap-login100 {
            padding: 177px 90px 33px 85px;
        }

        .login100-pic {
            width: 35%;
        }
    }

    @media (max-width: 768px) {
        .wrap-login100 {
            padding: 100px 80px 33px 80px;
        }

        .login100-form {
            width: 100%;
        }
    }

    .validate-input {
        position: relative;
    }
</style>
