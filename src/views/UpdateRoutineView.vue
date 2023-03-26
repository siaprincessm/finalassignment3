<template>
    <NavBar />

    <div class="p-5">
        <div class="card">
            <div class="card-header">
                <span>Create Routine</span>
            </div>
            <div class="card-body">

                <div class="mt-2">
                    <label>Main Goal:</label>
                    <select class="form-select" v-model="input.mainGoal" aria-label="main-goal">
                        <option value="Loose Fat">Loose Fat</option>
                        <option value="Build Muscle">Build Muscle</option>
                    </select>
                </div>
                <div class="mt-2">
                    <label>Workout Type:</label>
                    <select class="form-select" v-model="input.workoutType" aria-label="workout-type">
                        <option value="Single Muscle Group">Single Muscle Group</option>
                        <option value="Full Body">Full Body</option>
                        <option value="Cardio">Cardio</option>
                    </select>
                </div>
                <div class="mt-2">
                    <label>Equipments Needed: (separate with comma)</label>
                    <input type="text" class="form-control" v-model="input.equipmentsNeeded" />
                </div>
                <div class="mt-2">
                    <label>Intensity:</label>
                    <select class="form-select" v-model="input.intensity" aria-label="main-goal">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div class="mt-2">
                    <label>Duration in Minutes:</label>
                    <input type="number" class="form-control" min="1" v-model="input.durationInMinutes" />
                </div>

                <div class="mt-2 p-2 border rounded-2">

                    <label>Exercises</label>

                    <div v-for="exercise in input.exercises" :key="exercise">
                        <div class="m-3">
                            <div class="m-2">
                                <label>Name:</label>
                                <input type="text" class="form-control" v-model="exercise.name" />
                            </div>
                            <div class="m-2">
                                <label>Sets:</label>
                                <input type="number" class="form-control" min="1" v-model="exercise.set" />
                            </div>
                            <div class="m-2">
                                <label>Repetitions:</label>
                                <input type="number" class="form-control" min="1" v-model="exercise.repetitions" />
                            </div>
                        <hr/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-footer d-flex justify-content-end">
                <button type="button" class="btn btn-primary" v-on:click="updateRoutine()">Update</button>
            </div>
        </div>


    </div>
</template>

<script>

import axios from 'axios';
import { useRoute } from 'vue-router'
import NavBar from '../components/NavBarComponent'

export default {
    name: 'UpdateRoutineView',
    components: {
        NavBar
    },
    mounted: function () {
        const route = useRoute();
        this.userType = localStorage.getItem("type")

        axios.get(process.env.VUE_APP_API_URL + '/routines/' + route.params.id, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
            .then(response => {
                console.log(response);
                this.input = {
                    mainGoal: response.data.mainGoal,
                    workoutType: response.data.workoutType,
                    intensity: response.data.intensity,
                    equipmentsNeeded: response.data.equipmentsNeeded.join(','),
                    durationInMinutes: response.data.durationInMinutes,
                    exercises: response.data.exercises
                };
            },
                () => alert('Unable to update routine.'));
    },
    data() {
        return {
            input: {
                
            }
        }
    },
    setup: function() {
        const route = useRoute();
        return { id: route.params.id }
    },
    methods: {
        addExercise() {
            this.input.exercises.push({
                name: "",
                set: 1,
                repetitions: 1
            });
        },
        removeExercise() {
            if (this.input.exercises.length > 1) {
                this.input.exercises.pop();
            }
        },
        updateRoutine() {

            
        const route = useRoute();
        console.log(route);

            axios.put(process.env.VUE_APP_API_URL + '/routines/' + this.id, {
                    mainGoal: this.input.mainGoal,
                    workoutType: this.input.workoutType,
                    intensity: this.input.intensity,
                    equipmentsNeeded: this.input.equipmentsNeeded.split(','),
                    durationInMinutes: this.input.durationInMinutes,
                    exercises: this.input.exercises
                }, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
                })
                    .then(() => {
                        alert('Routine updated successfully')
                    },
                        () => alert('Failed to create routine'));
        }
    }
}
</script>
