import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoritos: [],
    usuario: { }, 
    esFavorito: false, 
  },
  mutations: {
    agregarUsuarioFavorito(state){
      let usuario = state.favoritos.find( user => user.id.value === state.usuario.id.value)
      if(usuario){
        state.esFavorito = true;
        return;
      }{
        state.favoritos = [state.usuario,...state.favoritos]
      }
   },
   quitarUsuarioFavorito(state){

    state.favoritos.splice(0,1);
 }
  },
  actions: {
    agregarUsuarioFavoritoAction(context){
      context.commit('agregarUsuarioFavorito');
    },
    quitarUsuarioFavoritoAction(context){
     
      context.commit('quitarUsuarioFavorito');
    },
  },
  modules: {
  }
})
