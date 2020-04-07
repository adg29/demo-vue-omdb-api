<template>
    <v-container v-if="loading">
        <div class="text-center">
            <v-progress-circular
            indeterminate
            :size="150"
            :width="8"
            color="green">
            </v-progress-circular>
        </div>
    </v-container>
    <v-container v-else>
        <v-layout wrap>
            <v-flex xs12 mr-1 ml-1>
                <v-card>
                <v-card-title primary-title>
                <h1 class="">{{singleMovie.Title}} ({{singleMovie.Year}})</h1>
                </v-card-title>
                <v-img
                    :src="singleMovie.Poster"
                    aspect-ratio="2"
                    contain
                ></v-img>
                <v-card-title secondary-title>
                    <div>
                    <p>{{ singleMovie.Plot}} </p>
                    <h3>Genre:</h3> {{singleMovie.Genre}}
                    <h3>Actors:</h3> {{singleMovie.Actors}}
                    <h4>Awards:</h4> {{singleMovie.Awards}}
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn text color="green" @click="back">back</v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <v-row class="text-center ma-6" justify="space-around">
                    <v-btn
                        color="green"
                        dark
                        @click="dialogMetadata = true"
                    >
                        View Metadata
                    </v-btn>
                    <v-dialog
                        v-model="dialogMetadata"
                        scrollable
                        transition="dialog-bottom-transition"
                        @keydown.escape="dialogMetadata = false"
                    >
                        <v-card>
                            <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                            >
                                Metadata
                            </v-card-title>
                            <v-card-text>
                            <pre>{{JSON.stringify(singleMovie, null, 5)}}</pre>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <v-btn
                        color="green"
                        dark
                        id="ratings"
                        @click="dialog = true"
                    >
                        View Ratings
                    </v-btn>
                    <v-dialog
                        v-model="dialog"
                        transition="dialog-bottom-transition"
                        @keydown.escape="dialog = false"
                    >
                        <v-card>
                            <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                            >
                                Ratings
                            </v-card-title>
                            <v-card-text>
                                <table style="width:80%; margin: 10%;" border="1">
                                    <tr>
                                        <th>Source</th>
                                        <th>Ratings</th>
                                    </tr>
                                    <tr v-for="(rating, index) in this.ratings" :key="index">
                                        <td align="center">{{rating.Source}}</td>
                                        <td align="center">{{rating.Value}}</td>
                                    </tr>
                                </table>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                            >
                                OK
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import movieApi from '@/services/MovieApi'
export default {
    props: ['id'],
    data() {
        return {
            singleMovie: '',
            dialog: false,
            dialogMetadata: false,
            loading: true,
            ratings: '',
        }
    },
    mounted() {
        movieApi.fetchSingleMovie(this.id)
            .then(response => {
                this.loading = false
                this.singleMovie = response
                this.ratings = this.singleMovie.Ratings
                this.ratings.forEach(r => {
                    r.Value = parseFloat(r.Value.split(/\/|%/)[0])
                    r.Value = r.Value <= 10 ? r.Value/2 : r.Value/20
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        back() {
            this.$router.push('/')
        }
    }
}
</script>

<style>
</style>