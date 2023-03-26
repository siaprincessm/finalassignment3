<template>
    <NavBar />

    <div class="p-5">
        <div class="card">
            <div class="card-header">
                <span>Comment on Routine</span>
            </div>
            <div class="card-body">

                <div class="mt-2">
                    <label>Main Goal:</label>
                    <span>{{ input.routine.mainGoal }}</span>
                </div>
                <div class="mt-2">
                    <label>Workout Type:</label>
                    <span>{{ input.routine.workoutType }}</span>
                </div>
                <div class="mt-2">
                    <label>Equipments Needed: </label>
                    <span>{{ equipmentsNeeded }}</span>
                </div>
                <div class="mt-2">
                    <label>Intensity:</label>
                    <span>{{ input.routine.intensity }}</span>
                </div>
                <div class="mt-2">
                    <label>Duration in Minutes:</label>
                    <span>{{ input.routine.durationInMinutes }}</span>
                </div>
                <div class="mt-2">

                    <label>Exercises:</label>

                    <div class="border rounded-2" v-for="exercise in input.routine.exercises" :key="exercise">
                        <div class="m-3">
                            <div class="m-2">
                                <label>Name:</label>
                                <span>{{ exercise.name }}</span>
                            </div>
                            <div class="m-2">
                                <label>Sets:</label>
                                <span>{{ exercise.set }}</span>
                            </div>
                            <div class="m-2">
                                <label>Repetitions:</label>
                                <span>{{ exercise.repetitions }}</span>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <label>Comments:</label>

                    <div class="border rounded-2" v-for="comment in input.comments" :key="comment">
                        <div class="m-3">
                            <div class="m-1">
                                <span>{{ comment.comment }}</span>
                            </div>
                            <div class="m-1">
                                <span>- {{ comment.name }}</span>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

                <div class="mt-2">

                    <div class="input-group">
                        <input v-model="input.comment" type="text" class="form-control" placeholder="Add comment">

                        <button type="button" class="btn btn-primary" v-on:click="addCommentToRoutine()">Add
                            Comment</button>

                    </div>


                </div>
            </div>

            <div class="card-footer d-flex justify-content-end">
                <button type="button" class="btn btn-danger" v-on:click="cancelComment()">Cancel</button>
            </div>
        </div>


    </div>
</template>

<script>

import axios from 'axios';
import { useRoute } from 'vue-router'
import NavBar from '../components/NavBarComponent'

export default {
    name: 'AddCommentToRoutineView',
    components: {
        NavBar
    },
    mounted: function () {
        const route = useRoute();
        this.userType = localStorage.getItem("type")

        axios.get(process.env.VUE_APP_API_URL + '/routines/' + route.params.id, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
            .then(response => {
                console.log(response);
                this.input.routine = {
                    mainGoal: response.data.mainGoal,
                    workoutType: response.data.workoutType,
                    intensity: response.data.intensity,
                    equipmentsNeeded: response.data.equipmentsNeeded.join(','),
                    durationInMinutes: response.data.durationInMinutes,
                    exercises: response.data.exercises
                };
            },
                () => alert('Unable to update routine.'));


        axios.get(process.env.VUE_APP_API_URL + '/routines/' + route.params.id + '/comments', { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
            .then(response => {
                this.input.comments = response.data;
            },
                () => alert('Unable to get routine comments.'));


    },
    data() {
        return {
            input: {
                comment: '',
                routine: {
                    mainGoal: "",
                    workoutType: "",
                    intensity: "",
                    equipmentsNeeded: [],
                    durationInMinutes: "",
                    exercises: ""
                },
                comments: []
            }
        }
    },
    setup: function () {
        const route = useRoute();
        return { id: route.params.id }
    },
    methods: {
        addCommentToRoutine() {
            var requestPayload = {
                comment: this.input.comment,
                name: localStorage.getItem('LoggedInUserNickName')
            };

            axios.post(process.env.VUE_APP_API_URL + '/routines/' + this.id + '/comments', {
                comment: this.input.comment,
                name: localStorage.getItem('LoggedInUserNickName')
            }, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
            })
                .then(() => {
                    this.input.comments.push(requestPayload);
                    alert('comment added successfully');
                    this.input.comment = "";
                },
                    () => alert('Failed to add comment to routine'));
        },
        cancelComment() {
            this.$router.replace({ name: "routines" });
        }
    }
}
</script>
