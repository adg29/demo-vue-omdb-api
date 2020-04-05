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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    props: ['id'],
    data() {
        return {
            singleMovie: ''
        }
    },
    mounted() {
        axios
            .get(`http://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_API_KEY}&i=${this.id}&Content-Type=application/json`)
            .then(response => {
                this.singleMovie = response.data
            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>

<style>
</style>