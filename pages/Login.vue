<template>
  <div class="Login_form">
    <div class="Login_error mb-4" v-show="errorState">
      <p class="text-red-900">Incorrect username or password</p>
    </div>
    <div class="Login-dialog">
      <form class="w-full" @submit.prevent="userLogin">
        <div>
          <label class="Login_field-label">Email</label>

          <input
            placeholder="Enter an email"
            class="Login_field"
            type="text"
            v-model="login.email"
          />
        </div>
        <div>
          <label class="Login_field-label">Password</label>

          <input
            class="Login_field"
            placeholder="Enter a password"
            type="password"
            v-model="login.password"
          />
        </div>
        <div class="mt-4">
          <button @click="userLogin" class="Login_btn" type="button">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      errorState: false,
    };
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        });
        this.$router.push('/');
      } catch (err) {
        console.log(err);
        this.errorState = true;
      }
    },
  },
};
</script>

<style>
.Login_error {
  background-color: rgb(248, 177, 177);
  border: 1px solid;
  padding: 8px;
}
.Login_btn {
  border: 1px solid;
  user-select: none;
  cursor: pointer;
  background-color: green;
  font-size: 16px;
  border-radius: 8px;
  padding: 5px 16px;
  color: white;
}
.Login-dialog {
  background-color: rgb(230, 230, 230);
  display: flex;
  width: 400px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 16px;
}

.Login_field {
  width: 100%;
  border-radius: 5px;
  background-color: #e8f0fe;
  height: 35px;
  font-size: 16px;
  border: none;
  margin: 2px;
  padding: 5px;
}
.Login_field-label {
  display: block;
  font-weight: bold;
}

.Login_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
