<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <h2>
                    {{singleMovie.Title}}
                </h2>
                <pre>
                    {{JSON.stringify(singleMovie, null, 5)}}
                </pre>
                <div class="text-xs-center">
                    <v-dialog
                        v-model="dialog"
                        width="500"
                    >
                        <v-btn
                            slot="activator"
                            color="green"
                            dark
                        >
                            View Ratings
                        </v-btn>
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
                                flat
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
                this.singleMovie = response
            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>

<style>
</style>