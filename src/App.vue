<template>
  <v-app>
    <v-app-bar
      app
      color="purple"
      dark
    >

  <v-col md="5"></v-col>
  <!-- <v-col>
    <v-btn class="ml-3"    dark  elevation="0"  color="blue" @click="$router.push('/')"><v-icon style="color:white">mdi-home</v-icon></v-btn> 
    <v-btn class="ml-1"    dark  elevation="0"  color="green" @click="$router.push('/exportar-favoritos')"><v-icon style="color:white">mdi-star</v-icon></v-btn> 
  </v-col> -->
     
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
