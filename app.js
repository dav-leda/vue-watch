


const app = new Vue({
  
  el: "#app",

  data: {
    nombre: '',
    email: '',
    msg: {
      nombres: '',
      email: '',
      alert: false
    },
    apiRequests: 0
  },

  watch: {
    nombre: async function (input) {

      if (input && this.apiRequests <= 10) {
        
        this.apiRequests++;
        const nombres = await this.buscarNombres(input);      
        this.msg.nombres = nombres.length ? `Ya existe un usuario con ese nombre: ${nombres.join(', ')}.` : '✅️';
  
      } else {
        this.msg.nombres = 'Por favor vuelva a intentar en 10 minutos.';
      }
      if (!input) this.msg.nombres = '';
    } 
  },

  methods: {

    validateEmail() {
      
      const mailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      
      if (this.email && mailRegExp.test(this.email)) {
        this.msg.alert = false;
        this.msg.email = '✅️'
      } else {
        this.msg.alert = true;
        this.msg.email = 'Formato de e-mail inválido.';
      }
      if (!this.email) this.msg.email = '';
    },
    
    
    buscarNombres: async function (input) {

      const listaNombres = await this.fetchNombres();
       
      const nombresFilter = listaNombres.filter(nombreEnLista => {
        
        const listaMin = nombreEnLista.toLowerCase();
        const nombreMin = input.toLowerCase();
        return listaMin.substr(0, nombreMin.length) === nombreMin;
      })
      return nombresFilter
    },

    fetchNombres: async function () {
      
      const apiKey = 'xxxxxxxxxxxxxxxx';
      const urlMockApi = `https://${apiKey}.mockapi.io/api/nombres/`;
      const urlJson = './nombres.json';
    
      try {
    
        const nombres = await fetch(urlJson);
        const parseNombres = await nombres.json();
        return parseNombres.nombres;
    
      } catch (err) { console.log (err) }
    },
  }
})