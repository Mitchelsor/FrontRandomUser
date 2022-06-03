<template>
  <div class="mx-14">
    <v-row>
      <v-col md="1">
        
      </v-col>
      <v-col class="ml-16">
      
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col md="1"></v-col>
      <v-col md="10">
          <v-card>
            <v-card-text>
                <v-row>
                  
               <v-col md="6">
                  <v-btn text class="mb-2" @click="$router.push('/')" color="purple" dark small><v-icon>mdi-chevron-left</v-icon> Regresar</v-btn>
                  <v-img :src="imgSrc" height="250" width="100%" max-height="400"></v-img>
                   <v-row class="mt-3">
                  <v-col cols="12" align="center" justify="center" >
                    <h2 >{{$store.state.usuario.name.first}} {{$store.state.usuario.name.last}}</h2>
                    <h4 >{{$store.state.usuario.email}}</h4>
                    <v-btn v-if="!$store.state.esFavorito" color="purple" class="mt-4" depressed dark @click="agregarFavorito()">Añadir a Favoritos<v-icon style="color:yellow">mdi-star</v-icon></v-btn>
                    <v-btn v-if="$store.state.esFavorito" color="deep-orange" class="mt-4" depressed dark @click="quitarFavorito()">Quitar de Favoritos<v-icon style="color:yellow">mdi-star</v-icon></v-btn>
                     <v-btn class="ml-1 mt-4"    dark  elevation="0"  color="pink" @click="$router.push('/exportar-favoritos')"><v-icon style="color:white">mdi-playlist-star</v-icon></v-btn> 

                  </v-col>
                </v-row>
              </v-col >
  
                <v-col md="6" class="mb-7">
                   <v-btn text class="mb-2" disabled @click="$router.push('/')" color="purple" dark small></v-btn>

                  <div id='map' style='width: 100%; height: 250px;'></div>
                  <v-row class="mt-2">
                  <v-col cols="4" align="center" justify="center" ><v-icon >mdi-city</v-icon><h3 >Ciudad</h3> <p class="ml-1">{{$store.state.usuario.location.city}}</p></v-col>
                  <v-col cols="4" align="center" justify="center" ><v-icon >mdi-routes</v-icon><h3 >Calle</h3><p class="ml-2">{{$store.state.usuario.location.street.name}}-{{$store.state.usuario.location.street.number}}</p></v-col>
                  <v-col cols="4" align="center" justify="center"><v-icon >mdi-phone</v-icon><h3 >Teléfono</h3><p >{{$store.state.usuario.phone}}</p></v-col>
                </v-row> 

              </v-col>
          
          </v-row>
            </v-card-text>
          </v-card>

      </v-col>
      <v-col md="1"></v-col>
    </v-row>

         

     
</div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
   name: 'perfil',


    data: () => ({
      imagen: '',
      longitude: '-23',
      latitude: '23',
      
    }),
    created() {
 
    },
    mounted(){
     new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.$store.state.usuario.location.coordinates.longitude, this.$store.state.usuario.location.coordinates.latitude], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });
     
    },
    computed: {
      imgSrc(){
        return this.$store.state.usuario.picture.large
      }
    },
    methods:{
      agregarFavorito(){
        this.$store.state.esFavorito = true;
        console.log(this.$store.state.esFavorito);
        // this.$store.state.esFavorito = false;
        this.$store.dispatch('agregarUsuarioFavoritoAction');
        // console.log(this.$store.state.favoritos);
      },
      quitarFavorito(){
        this.$store.state.esFavorito = false;
        console.log(this.$store.state.esFavorito);
        this.$store.dispatch('quitarUsuarioFavoritoAction');
        // console.log(this.$store.state.favoritos);
      }
    }
}
</script>

<style scoped>
 
</style>