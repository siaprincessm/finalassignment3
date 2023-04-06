<template>
    <NavBar />

    <div class="p-5">
        <div class="card mb-3">
            <div class="card-header">
                <span>Search</span>
            </div>
            <div class="card-body d-flex flex-wrap">
                <div class="p-2 col-sm-3">
                    <label>Main Goal:</label>
                    <select class="form-select" v-model="input.mainGoal" aria-label="main-goal">
                        <option value=""></option>
                        <option value="Loose Fat">Loose Fat</option>
                        <option value="Build Muscle">Build Muscle</option>
                    </select>
                </div>
                <div class="p-2 col-sm-3">
                    <label>Workout Type:</label>
                    <select class="form-select" v-model="input.workoutType" aria-label="workout-type">
                        <option value=""></option>
                        <option value="Single Muscle Group">Single Muscle Group</option>
                        <option value="Full Body">Full Body</option>
                        <option value="Cardio">Cardio</option>
                    </select>
                </div>
                <div class="p-2 col-sm-3">
                    <label>Intensity:</label>
                    <select class="form-select" v-model="input.intensity" aria-label="main-goal">
                        <option value=""></option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div class="p-2 col-sm-3">
                    <label>Duration in Minutes:</label>
                    <input type="number" class="form-control" min="0" v-model="input.durationInMinutes" />
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-danger" @click="resetRoutinesSearch()">Reset</button>
                <button class="btn btn-primary ms-1" @click="searchRoutines()">Search</button>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span>Routines</span>
            </div>
            <div class="card-body">
                <div class="border p-2 rounded-2">
                    <table class="table striped">
                        <thead>
                            <th>
                                Main goal
                            </th>
                            <th>
                                Work out type
                            </th>
                            <th>
                                Intensity
                            </th>
                            <th>
                                Equipments Needed
                            </th>
                            <th>
                                Duration in Minutes
                            </th>
                            <th>
                                Exercises
                            </th>
                            <th>
                                Actions
                            </th>
                        </thead>
                        <tbody>
                            <tr v-for="routine in routines" :key="routine._id">
                                <td class="align-middle">{{ routine.mainGoal }}</td>
                                <td class="align-middle">{{ routine.workoutType }}</td>
                                <td class="align-middle">{{ routine.intensity }}</td>
                                <td class="align-middle">{{ routine.equipmentsNeeded?.join(", ") ?? "" }}</td>
                                <td class="align-middle">{{ routine.durationInMinutes }}</td>
                                <td class="align-middle">
                                    <div v-for="exercise in routine.exercises" :key="exercise">
                                        <span> {{ exercise.name }}, sets: {{ exercise.set }}, repetitions: {{ exercise.repetitions }} </span>
                                        <br/>
                                    </div>
                                </td>
                                <td class="align-middle">
                                    <button v-if="userType == 'coach'" class="btn btn-primary"
                                        @click="updateRoutine(routine._id)">Update</button>
                                    <button v-if="userType == 'coach'" class="ms-1 btn btn-danger"
                                        @click="deleteRoutine(routine._id)">Delete</button>
                                    <button class="ms-1 btn btn-primary"
                                        @click="viewRoutine(routine._id)">View</button>
                                    <button v-if="userType == 'gym-goer'" class="ms-1 btn btn-primary"
                                        @click="addComment(routine._id)">Comment</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBarComponent'

export default {
    name: 'RoutinesView',
    components: {
        NavBar
    },
    data() {
        return {
            routines: [],
            userType: '',
            input: {}
        }
    },
    methods: {
        deleteRoutine(routineId) {
            axios.delete(process.env.VUE_APP_API_URL + '/routines/' + routineId, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
                .then(() => {
                    alert("routine successfully deleted")

                    const routineToDelete = this.routines.findIndex((r) => r._id === routineId);
                    this.routines.splice(routineToDelete, 1);
                }, () => {
                    alert("failed to delete routine")
                });
        },
        updateRoutine(routineId) {
            this.$router.replace({ name: "updateRoutine", params: { id: routineId } });
        },
        searchRoutines() {

            let searchUrl = process.env.VUE_APP_API_URL + '/routines';

            var queryParams = [];

            if (this.input.mainGoal) {
                queryParams.push("mainGoal=" + this.input.mainGoal);
            }

            if (this.input.workoutType) {
                queryParams.push("workoutType=" + this.input.workoutType);
            }

            if (this.input.intensity) {
                queryParams.push("intensity=" + this.input.intensity);
            }

            if (this.input.durationInMinutes > 0) {
                queryParams.push("durationInMinutes=" + this.input.durationInMinutes);
            }

            if (queryParams.length > 0) {
                searchUrl = searchUrl + "?" + queryParams.join("&");
            }

            axios.get(searchUrl, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
                .then(response => {
                    console.log(response);
                    this.routines = response.data;
                },
                    err => console.log(err));
        },
        addComment(routineId) {
            this.$router.replace({ name: "addCommentToRoutine", params: { id: routineId } });
        },
        viewRoutine(routineId) {
            this.$router.replace({ name: "viewRoutine", params: { id: routineId } });
        },
        resetRoutinesSearch() {
            this.input = {};
            this.searchRoutines();
        }
    },
    mounted: function () {

        this.userType = localStorage.getItem("type")

        axios.get(process.env.VUE_APP_API_URL + '/routines/all', { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
            .then(response => {
                console.log(response);
                this.routines = response.data;
            },
                err => console.log(err));
    }
}
</script>
