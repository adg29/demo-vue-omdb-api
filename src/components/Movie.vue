<template>
    <v-container v-if="loading">
        <div class="text-xs-center">
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
                <v-img
                    :src="singleMovie.Poster"
                    aspect-ratio="2"
                ></v-img>
                <v-card-title primary-title>
                    <div>
                    <h2 class="headline mb-0">{{singleMovie.Title}}-{{singleMovie.Year}}</h2>
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
                <pre>
                    {{JSON.stringify(singleMovie, null, 5)}}
                </pre>
                <div class="text-xs-center">
                    <v-dialog
                        v-model="dialog"
                        width="500"
                    >
                        <template v-slot:activator="{ on }">
                        <v-btn
                            color="green"
                            dark
                            id="ratings"
                            v-on="on"
                        >
                            View Ratings
                        </v-btn>
                        </template>
                        <v-card>
                            <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                            >
                                Ratings
                            </v-card-title>
                            <v-card-text>
                                <table style="width:100%" border="1" >
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
                </div>
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
            loading: true,
            ratings: ''
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