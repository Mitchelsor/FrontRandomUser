import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWl0Y2hlbHNvciIsImEiOiJja25oenBpaXkwdDBlMndwNWk2Ynd5dzlzIn0.2zQOtwK3BdCZobUcRANPRQ';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.filter('capitalizeAll', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.toLowerCase()
  .trim().split(' ').map( v => v[0].toUpperCase() + v.substr(1) ).join(' '); 
})

Vue.filter('genero', function (value) {
  if (!value) return ''
  if( value == 'male'){
    return 'M'
  }else{
    return 'F'
  }
})

Vue.filter('date', function (value) {
  if (!value) return ''
  value = value.substring(0, 10);
  return value
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
