<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          href="/"
          text
        >
          <span class="mr-2">OMDb Api</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-flex xs12 sm6 md3>
        <v-text-field
          label='Movie Name'
          v-model='searchString'
          @keydown.enter="searchMovie"
         >
        </v-text-field>
      </v-flex>

      <v-btn
        text
        :disabled="!dataAvailable"
        @click="searchMovie"
      >
        <span class="mr-2">Search</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view>
      </router-view>
    </v-content>

    <v-bottom-navigation
      :value="activeBtn"
      color="purple lighten-1"
      app="true"
    >

       <v-btn
        href="https://github.com/adg29/demo-movie-app"
        target="_blank"
        text
      >
        <span class="mr-2">Github Repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>   
    </v-bottom-navigation>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    searchString: ''
  }),
  methods: {
    searchMovie() {
      this.$router.push(`/search/${this.searchString}`)
      this.searchString = ''
    }
  },
  computed: {
    dataAvailable() {
      return this.searchString !== null && this.searchString !== ''
    }
  }
};
</script>
