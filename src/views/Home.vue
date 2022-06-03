<template>
    <div>
        <v-row class="mt-2  ml-3">
            <v-col md="2" class="ml-16">
                <label >Género</label>
                <v-autocomplete outlined dense item-text="text" @change="filtrarPorGenero" hide-details v-model="generoSeleccionado" :items="generos"></v-autocomplete>
            </v-col>
             <v-col md="2" class="ml-16">
                 <label >Nacionalidad</label>
                <v-autocomplete outlined dense item-text="text" hide-details v-model="nacionalidadSeleccionada" @change="filtrarPorNacionalidad" :items="nacionalidades"></v-autocomplete>
            </v-col>
            <v-col md="2" class="ml-16">
                 <label >Edad</label>
                <v-text-field type="number" @keyup.native.enter="filtrarPorEdad" @click:append-outer="filtrarPorEdad" append-outer-icon="mdi-magnify" outlined dense hide-details v-model="edadSeleccionada" ></v-text-field>
            </v-col>
            <v-col md="3">
                  <v-btn @click="cargarUsuarios" class="mx-2 mt-6" block dark color="purple lighten-2">Buscar usuarios <v-icon dark class="ml-4"> mdi-magnify
                    </v-icon>
                    </v-btn>
            </v-col>
          
        </v-row>
        <v-row class="mt-7">
            <v-container  class="borde">
                        <v-row class="mb-2">
                        
                             <v-col md="1">
                                <strong>Género</strong>
                            </v-col>
                            <v-col md="2">
                                 <strong>Nombre</strong>
                            </v-col>
                            <v-col md="3">
                                 <strong>Email</strong>
                            </v-col>
                            <v-col md="1">
                                 <strong>Nac.</strong>
                            </v-col>
                            <v-col md="2">
                                 <strong>Fecha de nacimiento</strong>
                            </v-col>
                            <v-col md="2">
                                 <strong>Fecha de registro</strong>
                            </v-col>
                             <v-col md="1">
                                 <strong>Ver</strong>
                            </v-col>
                            <v-col cols="12" class="mt-n3 mb-1">
                                <hr color="#D1AAFF">
                            </v-col>
                        </v-row>
                        <v-row v-for="(user,index) in users" :key="index" class="mt-n4" >
                            <!-- <v-col md="1" class="mr-n12">{{index}}</v-col> -->
                            <v-col md="1"> <span class="font">{{user.gender | genero}}</span> </v-col>
                            <v-col md="2"> <span class="font">{{ user.name.first}} {{user.name.last}}</span> </v-col>
                            <v-col md="3"> <span class="font">{{ user.email}}</span> </v-col>
                            <v-col md="1"> <span class="font">{{ user.nat}}</span></v-col>
                            <v-col md="2 "> <span class="font">{{ user.dob.date | date}}</span></v-col>
                            <v-col md="2"> <span class="font">{{ user.registered.date | date}}</span></v-col>
                            <v-col md="1" @click="verUsuario(user)" class="pointer"><v-icon >mdi-eye</v-icon></v-col>
                        </v-row>
                       
            </v-container>
        </v-row>
        <v-row class="mt-2">
           <v-spacer class="mt-15"></v-spacer>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'PruebaHome',

    data: () => ({
        users: [],
        edades: [],
        nacionalidades: [ 
            { text: "AU" }, 
            { text: "BR" }, 
            { text: "CA" },
            { text: "CH" }, 
            { text: "DE" }, 
            { text: "DK" }, 
            { text: "ES" }, 
            { text: "FI" }, 
            { text: "FR" },
            { text: "GB" }, 
            { text: "IE" },
            { text: "IR" }, 
            { text: "NO" }, 
            { text: "NL" }, 
            { text: "NZ" }, 
            { text: "TR" }, 
            { text: "US" },
        ],
        generos: [
            { text: 'male', id: '1' },
            { text: 'female', id: '2' },
        ],
        generoSeleccionado: '',
        nacionalidadSeleccionada: '',
        edadSeleccionada: '',
        dataApi: [],
    }),

    created() {
        this.axios.get('https://randomuser.me/api/?results=10').then( (res) => {
            this.dataApi = res.data.results;   
            this.users = this.dataApi;
          
        });
      


    },

    methods: {
        verUsuario(user){
           
            // console.log( this.$store.state.usuarioPerfil);
            this.$store.state.usuario = user;

             let usuario = this.$store.state.favoritos.find( element=> element.cell === this.$store.state.usuario.cell)
            if(usuario){
                console.log('existe usuario');
                console.log(this.$store.state.usuario.name.first);
                console.log(this.$store.state.usuario);
                console.log(this.$store.state.usuario.id.value);
                this.$store.state.esFavorito = true;                
            }else{
                console.log('No existe usuario');
                this.$store.state.esFavorito = false;     
            }

        
            this.$router.push('/perfil');
        },

        filtrarPorGenero(){
            this.cargarUsuarios();
            let generos= this.users.filter( user => user.gender == this.generoSeleccionado ) ; 
            this.users = generos;
              
        },

        filtrarPorNacionalidad(){
            this.cargarUsuarios();
            let nacionalidades= this.users.filter( user => user.nat == this.nacionalidadSeleccionada ) ;
            this.users = nacionalidades;  
        },
        
         filtrarPorEdad(){
            this.cargarUsuarios();
            this.edades = [];
            Number(this.edadSeleccionada);

            for (let index = 0; index < this.users.length; index++) {

           
               if(this.users[index].dob.age == this.edadSeleccionada){
                   console.log(index, 'Es igual la edad', this.users[index]);
                   this.edades.push(this.users[index]);
               }else{
                   console.log('No existe usuario con esa edad');
               }
               
            }

               this.users = this.edades;
        },

        cargarUsuarios(){
            this.users = this.dataApi;     
        }, 

    },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

    strong{
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
    }

    .font, label{
        font-family: 'Poppins', sans-serif;
        color: black;
        font-size: 14px;
    }

    .table{
        border: 1px solid #000;
        padding: 3px 5px;
    }
    .pointer{
        cursor: pointer;
    }

    .borde{
        border: 2px solid rgb(232, 140, 250);
        padding: 20px;
        border-radius: 8px;
    }

 

</style>