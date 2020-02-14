const axios = require('axios').default

export default {
  
  state: {
    status: 0,
    urlColps: 'http://192.168.1.92:8989/api/v1/documents/150934436/layers/88FF6A34-0690-472C-86C4-838E855955C5/variants/',
    urlTretes: 'http://192.168.1.92:8989/api/v1/documents/150934436/layers/F74FC7F4-3EFE-4AD3-872E-EB793B5E3007/variants/',
    variantsColps: [],
    variantsTretes: [],
    info: null,
    infoUrl: 'http://192.168.1.92:8989/api/v1/documents/150934436/layers',
    online: false,
    error: null
  },
  getters: {
    getUrlColps: state=>  {
      return state.urlColps
    },
    getUrlTretes: state=>  {
      return state.urlTretes
    },
    getVariantsColps: state=> {
      return state.variantsColps
    },
    getVariantsTretes: state=> {
      return state.variantsTretes
    },
    getStatus: state => {
      return state.status
    }
  },
  mutations: {
    setState(context, estado) {
      context.status = estado
    },
    setStatus(context, payload) {
      context.status = payload
    },
    updateVariantsColps(context, payload) {
      context.variantsColps.push(payload)
    },
    updateVariantsTretes(context, payload) {
      context.variantsTretes.push(payload)
    },
    conexion(context, payload) {
      context.online = payload
    }
  },
  actions: {
    updateVariants: ({commit, state}) => {
      axios.get(state.infoUrl)
      .then(() => {
        axios.get(state.urlColps)
        .then(res => {
          commit('setStatus', res.status)
          if(res.status == 200) {
            res.data.data.forEach(item => {
            commit('updateVariantsColps', item.id)
            })
          }
        })
        axios.get(state.urlTretes)
        .then(res => {
          commit('setStatus', res.status)
          if(res.status == 200) {
            //console.log(res.data.data[1].attributes.name)
            res.data.data.forEach(item => {
            commit('updateVariantsTretes', item.id)
            })
          }
        })
        commit('conexion', true)
      })
      .catch(() => {
        commit('conexion', false)
      })  
    }
  }
}