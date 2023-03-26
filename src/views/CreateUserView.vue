<template>
    <NavBar />
    <div class="p-5">
        <div class="card">
            <div class="card-header">
                <span>Create User</span>
            </div>
            <div class="card-body">
                <div>
                    <div class="mt-2">
                        <label class="form-label mb-0" for="username">Nick Name</label>
                        <input class="form-control" type="text" id="nickName" name="nickName" v-model="input.nickName"
                            placeholder="Nickname" />
                    </div>
                    <div class="mt-2">
                        <label class="form-label mb-0" for="username">Username</label>
                        <input class="form-control" type="text" id="username" name="username" v-model="input.username"
                            placeholder="Username" />
                    </div>
                    <div class="mt-2">
                        <label class="form-label mb-0" for="username">Password</label>
                        <input class="form-control" type="password" id="password" name="password" v-model="input.password"
                            placeholder="Password" />
                    </div>
                    <div class="mt-2">
                        <label class="form-label mb-0" for="username">Type</label>
                        <select class="form-select" v-model="input.type" aria-label="Default select example">
                            <option value="gym-goer">Gym goer</option>
                            <option value="coach">Coach</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="card-footer d-flex justify-content-end">
                    <button type="button" class="btn btn-primary" v-on:click="createUser()">Create</button>
            </div>
        </div>
    </div>




</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBarComponent'

export default {
    name: 'CreateUserView',
    components: {
        NavBar
    },
    data() {
        return {
            input: {
                nickName: "",
                username: "",
                password: "",
                type: ""
            }
        }
    },
    methods: {
        createUser() {
            if (this.input.username != "" && this.input.password != "" && this.input.type != "") {

                axios.post(process.env.VUE_APP_API_URL + '/users', {
                    email: this.input.username,
                    nickName: this.input.nickName,
                    password: this.input.password,
                    type: this.input.type
                })
                    .then(() => {
                        alert("user created");
                        this.email = "";
                        this.password = "";
                        this.nickName = "";
                        this.type = "";
                    }, () => {
                        alert("Failed to create user");
                    });
            } else {
                alert("A username and password must be present");
            }
        }
    }
}
</script>
