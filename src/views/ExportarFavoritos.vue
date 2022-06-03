<template>
  <div>
    <v-row class="mt-7">
      <v-container class="borde">
        <v-row>
          <v-btn
           v-if="$store.state.favoritos.length > 0"
            text
            class="mb-2"
            @click="$router.push('/perfil')"
            color="purple"
            dark
            small
            ><v-icon>mdi-chevron-left</v-icon> Regresar</v-btn
          >
          <v-btn
            v-if="$store.state.favoritos.length == 0"
            text
            class="mb-2"
            @click="$router.push('/')"
            color="purple"
            dark
            small
            ><v-icon>mdi-chevron-left</v-icon> Regresar</v-btn
          >
          
        </v-row>
        <v-col>
          <table>
            <tr>
              <th style="width: 70px">Género</th>
              <th style="width: 150px">Nombre</th>
              <th style="width: 240px">Email</th>
              <th style="width: 110px">Nacionalidad</th>
              <th style="width: 140px">Fecha Nacimiento</th>
              <th style="width: 120px">Fecha Registro</th>
          
            </tr>
            <tr v-for="(user, index) in $store.state.favoritos" :key="index">
              <td>{{ user.gender | genero }}</td>
              <td>
                <span>{{ user.name.first }} {{ user.name.last }}</span>
              </td>
              <td>
                <span
                  style="width: 10px !important; margin-right: 20px !important"
                  >{{ user.email }}</span
                >
              </td>
              <td><span style="margin-left: 30px"></span>{{ user.nat }}</td>
              <td>{{ user.dob.date | date }}</td>
              <td>{{ user.registered.date | date }}</td>
      
            </tr>
          </table>
        </v-col>
        <v-row>
          <v-col md="3" class="ml-3">
            <v-btn
              color="blue"
              text
              class="ml-4"
              @click="crearLista = true"
              dark
              >Crear lista de favoritos
            </v-btn>
          </v-col>

          <v-col md="3" class="ml-n3">
            <v-form ref="form" v-model="formularioValido" lazy-validation>
              <v-row>
                <v-col>
                  <v-text-field
                    
                    v-model="nickname"
                    :rules="[rules.required, rules.counter]"
                    placeholder="Ingrese el nickname de la lista"
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
                <v-col md="1" class="">
                  <v-btn
                    @click="guardarLista"
                    :disabled="!formularioValido"
                    class=""
                    color="green"
                    dark
                    ><v-icon>mdi-content-save</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
        
          </v-col>

          <v-col md="3" class="ml-16">
            <v-btn
              v-if="$store.state.favoritos.length > 0"
              color="pink"
              justify="center"
              align="center"
              dark
              @click="exportTableToCSV('members.csv')"
              >Exportar <v-icon class="ml-2">mdi-export</v-icon></v-btn
            >
          </v-col>

          
        </v-row>
      </v-container>
    </v-row>
  
    <v-row class="mt-10 mx-10">
      
      <v-col
        cols="12"
        md="3"
        v-for="(lista, index) in listaFavoritos"
        :key="index"
      >
        <v-card color="purple darken-3" dark @click="verLista(lista)">
          <v-card-text>
            <v-row>
              <v-col cols="10">
                <h4>Nickname</h4>
                <h2 style="color: #fff" class="mt-1">
                  {{ lista.nickname | capitalizeAll }}
                </h2>
              </v-col>
              <v-col cols="2"
                ><div class="badge">
                  {{ lista.favoritos.length }}
                </div></v-col
              >
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="mt-n9 btn-ver-lista pointer">Ver lista</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="modalConfirmacionGuardado" width="300">
      <v-card>
        <v-toolbar color="pink darken-3" dark height="10"></v-toolbar>
        <v-card-text class="mt-4" justify="center" align="center">
          <h2 style="color: #4c068e">La lista se ha guardado correctamente</h2>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="alertaFavoriosVacio" width="300">
      <v-card>
        <v-toolbar color="grey darken-3" dark height="40"></v-toolbar>
        <v-card-text class="mt-4" justify="center" align="center">
          <h2 style="color: purple">No puede guardar una lista vacia</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" dark @click="alertaFavoriosVacio = false"
            >Aceptar</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PruebaHome",

  data: () => ({
    users: [],
    dataApi: [],
    nickname: "",
    crearLista: false,
    formularioValido: true,
    alertaFavoriosVacio: false,
    listaFavoritos: [],
    modalConfirmacionGuardado: false,
    rules: {
      required: (value) => !!value || "El nickmane es obligatorio.",
      counter: (value) => value.length <= 17 || "Maximo 17 Caracteres",
      
    },
  }),

  mounted() {
    this.users = this.$store.state.favoritos;
    this.mostrarListaFavoritos();
  },

  methods: {
    exportarUsuario(user) {
      this.$store.state.usuario = user;
      this.$router.push("/perfil");
    },

    activarCampoCrearLista() {
      this.crearLista = true;
    },

    cargarUsuarios() {
      this.users = this.dataApi;
    },

    verLista(lista){
      this.$store.state.favoritos = lista.favoritos;
    },

    guardarLista() {

      // Validar que el usuario no este vacio al guardar la lista de favoritos
      if (this.$store.state.favoritos.length == 0) {
        this.alertaFavoriosVacio = true;
        return;
      }
      // Objeto a guardar
      let data = {
        nickname: this.nickname,
        favoritos: this.$store.state.favoritos,
      };

      // Petición post
      this.axios
        .post("http://localhost:3000/api/favoritos", data)
        .then((res) => {
          this.modalConfirmacionGuardado = true;
          console.log(res);
          this.mostrarListaFavoritos();
          setTimeout(() => {
            this.modalConfirmacionGuardado = false;
          }, 1500);
        });

      this.limpiarTabla();
    },



    mostrarListaFavoritos() {
      this.axios.get("http://localhost:3000/api/favoritos").then((res) => {
        this.listaFavoritos = res.data.listas;
        console.log(this.listaFavoritos);
      });
    },

    limpiarTabla() {
      this.$store.state.favoritos = [];
    },

    // Funciones para exportar a CSV
    exportTableToCSV(filename) {
      var csv = [];
      var rows = document.querySelectorAll("table tr");

      for (var i = 0; i < rows.length; i++) {
        var row = [],
          cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

        csv.push(row.join(","));
      }

      // Download CSV file
      this.downloadCSV(csv.join("n"), filename);
    },
    downloadCSV(csv, filename) {
      var csvFile;
      var downloadLink;

      // CSV file
      csvFile = new Blob([csv], { type: "text/csv" });

      // Download link
      downloadLink = document.createElement("a");

      // File name
      downloadLink.download = filename;

      // Create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);

      // Hide download link
      downloadLink.style.display = "none";

      // Add the link to DOM
      document.body.appendChild(downloadLink);

      // Click download link
      downloadLink.click();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");

strong {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
}

h2 {
  font-family: "Montserrat", sans-serif;
}

.btn-ver-lista {
  font-family: "Poppins", sans-serif;
  color: rgb(229, 255, 0);
}

.badge {
  background: rgb(255, 17, 223);
  border-radius: 100%;
  width: 30px;
  height: 25px;
  /* align-items: center; */
  text-align: center;

  vertical-align: center;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}

.font,
label {
  font-family: "Poppins", sans-serif;
  color: black;
  font-size: 14px;
}

.pointer {
  cursor: pointer;
}

.borde {
  border: 2px solid rgb(232, 140, 250);
  padding: 20px;
  border-radius: 8px;
}

/* Table */
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(233, 49, 233);
}

thead th:nth-child(1) {
  width: 30%;
}

tr {
  margin-top: 0px;
  border: 1px solid rgb(112, 169, 255);
  padding: 128px !important;
}

th {
  text-align: left;
  color: #4679bd;
}

th,
td {
  padding: 10px;
  font-family: "Poppins", sans-serif;
}
</style>
