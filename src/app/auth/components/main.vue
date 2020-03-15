<script>
  /* eslint-disable no-undef */
  import { mapActions, mapState } from 'vuex';
  import { version } from '../../../../package.json';

  export default {
    data() {
      return {
        version,
        email: '',
        password: '',
        error: false,
        errorMessage: 'Ошибка',
        ie: false,
      };
    },
    watch: {
      login(val) {
        if (val.includes('@')) {
          this.error = true;
          this.errorMessage = 'Вводите только логин без указания домена';
        } else {
          this.error = false;
        }
      },
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

      submit() {
        this.error = false;
        const { email, password } = this;
        this.attemptLogin({ email: email.toLowerCase(), password })
          .then(() => {
            this.setMessage({ type: 'error', message: [] });
            this.$router.push(
              this.$route.query.redirect || { name: 'Home' },
            );
          })
          .catch(() => {
            this.error = true;
            this.errorMessage = 'Неверный логин или пароль';
          });
      },
    },
  };
</script>

<template>
  <div class="auth-wrapper">
    <div class="login">
      <div class="login__wrapper">
        <span class="login__header">Авторизация</span>
        <p class="login__error" v-bind:class="{ 'login__error--shown': error }">
          {{ errorMessage }}
        </p>

        <form @submit.prevent class="login__form">
          <div class="login__item">
            <input
              tabindex="0"
              id="email"
              type="text"
              v-model="email"
              class="login__input login__input--lower"
              name="email"
              autocapitalize="off"
              autocorrect="off"
              :class="{ 'login__input--error': error }"
              required
            />
            <label for="email" class="login__label">Логин</label>
          </div>

          <div class="login__item">
            <input
              tabindex="0"
              id="pass"
              type="password"
              v-model="password"
              class="login__input"
              name="password"
              v-bind:class="{ 'login__input--error': error }"
              required
            />
            <label for="pass" class="login__label">Пароль</label>
          </div>

          <input
            class="login__btn"
            @click="submit"
            type="submit"
            :value="submitText"
          />

          <div v-if="fetching" class="login__load">
            <div class="login__load-item login__load-item--first"></div>
            <div class="login__load-item login__load-item--second"></div>
            <div class="login__load-item login__load-item--third"></div>
          </div>
        </form>

    </div>
    </div>
    </div>
</template>
