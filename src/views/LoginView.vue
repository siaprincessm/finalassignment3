<template>
    <div class=" h-100 d-flex flex-column">
        <div class="flex-fill"></div>
        <div class="d-flex">
            <div class="col-sm-3"> </div>
            <div class="d-flex col-sm-6 justify-content-around">
                <div class="col-sm-9 d-flex flex-column">
                    <div class="mt-3">
                        <label class="form-label mb-0" for="username">Username</label>
                        <input class="form-control" type="text" id="username" name="username" v-model="input.username"
                            placeholder="Username" />
                    </div>
                    <div class="mt-3">
                        <label class="form-label mb-0" for="password">Password</label>
                        <input class="form-control" type="password" id="password" name="password"
                            v-model="input.password" placeholder="Password" />
                    </div>
                    <button type="button" class="btn btn-primary mt-5" v-on:click="login()">Login</button>
                </div>
            </div>
            <div class="col-sm-3"> </div>
        </div>

        <div class="flex-fill"></div>
    </div>

</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode'

export default {
    name: 'LoginView',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            if (this.input.username != "" && this.input.password != "") {

                axios.post(process.env.VUE_APP_API_URL + '/login', {
                    email: this.input.username,
                    password: this.input.password
                })
                    .then(response => {
                        localStorage.setItem('LoggedInUser', this.input.username);

                        // get the access token from the response
                        localStorage.setItem('access_token', response.data.accessToken);

                        // parse the token to get the user type
                        const tokenClaims = VueJwtDecode.decode(response.data.accessToken);
                        
                        localStorage.setItem('type', tokenClaims.type);
                        
                        let nickName = "User";
                        if(tokenClaims.nickName) {
                            nickName = tokenClaims.nickName;
                        }
                        localStorage.setItem('LoggedInUserNickName', nickName);

                        this.$router.replace({ name: "routines" });
                    }, () => {
                        alert("The username and / or password is incorrect");
                    });
            } else {
                alert("A username and password must be present");
            }
        }
    }
}
</script>
