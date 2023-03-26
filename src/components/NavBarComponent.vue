<template>
    
    <nav class="navbar bg-primary navbar-expand-lg bg-body-tertiary text-white">
      <div class="container-fluid">
        <a class="navbar-brand text-white" href="#">Go-Gym</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <!-- v-if="userType == 'coach'" -->
            <li class="nav-item">
          <a class="nav-link text-white" href="#" v-on:click="navigate('routines')">Routines</a>
        </li>
        <li v-if="input.userType == 'coach'" class="nav-item">
          <a class="nav-link text-white" href="#" v-on:click="navigate('createRoutine')">Create Routine</a>
        </li>
        <li v-if="input.userType == 'coach'" class="nav-item">
          <a class="nav-link text-white" href="#" v-on:click="navigate('createUser')">Create User</a>
        </li>


          </ul>
          <div>
            <div class="dropdown-center">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{this.input.nickName}}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" v-on:click="signOut()">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

</template>


<script>

export default {
    name: 'NavBar',
    data() {
        return {
            input: {
              username: "",
              userType: localStorage.getItem('type'),
              nickName: localStorage.getItem('LoggedInUserNickName')
            }
        }
    },
    methods: {
        signOut() {
            localStorage.removeItem('LoggedInUser');
                        this.$router.replace({ name: "login" });
        },
        navigate(location) {
            switch(location) {
                case 'routines':
                    this.$router.replace({ name: "routines" });
                    break;
                case 'createRoutine':
                    this.$router.replace({ name: "createRoutine" });
                    break;
                case 'createUser':
                    this.$router.replace({ name: "createUser" });
                    break;
            }
        }
    }
}
</script>
