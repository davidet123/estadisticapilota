const axios = require('axios').default
import db from '@/firebase/init.js'

export default {
  
  state: {
    status: 0,
    url: 'http://192.168.1.93:8989',
    document: null,
    layer:  '88FF6A34-0690-472C-86C4-838E855955C5',
    /* urlColps: 'http://192.168.1.92:8989/api/v1/documents/150934436/layers/88FF6A34-0690-472C-86C4-838E855955C5/variants/', */
    urlColps: null,
    urlTretes: null,
    urlCanvis: null,
    urlDurada: null,
    urlTravessa: null,
    urlEntrevista: null,
    variantsColps: [],
    variantsTretes: [],
    variantsCanvis: [],
    variantsDurada: [],
    variantsTravessa: [],
    variantsEntrevista: [],
    info: null,
    infoUrl: 'http://192.168.1.93:8989/api/v1/documents/150934436/layers',
    online: false,
    error: null,
    infoLive: null,
    live: false
  },
  getters: {
    getUrl: state => {
      return state.url
    },
    getDocument: state => {
      return state.document
    },
    getLayerColps: state => {
      return state.urlColps
    },
    getLayerTretes: state => {
      return state.urlTretes
    },
    getLayerCanvis: state => {
      return state.urlCanvis
    },
    getLayerDurada: state => {
      return state.urlDurada
    },
    getLayerTravessa: state => {
      return state.urlTravessa
    },
    getLayerEntrevista: state => {
      return state.urlEntrevista
    },
    getUrlColps: state=>  {
      return state.url + '/api/v1/documents/' + state.document + '/layers/' + state.urlColps + '/variants/'
    },
    getUrlTretes: state=>  {
      return state.url + '/api/v1/documents/' + state.document + '/layers/' + state.urlTretes + '/variants/'
    },
    getUrlCanvis: state=>  {
      return state.url + '/api/v1/documents/' + state.document + '/layers/' + state.urlCanvis + '/variants/'
    },
    getUrlDurada: state=>  {
      return state.url + '/api/v1/documents/' + state.document + '/layers/' + state.urlDurada + '/variants/'
    },
    getUrlTravessa: state=>  {
      return state.url + '/api/v1/documents/' + state.document + '/layers/' + state.urlTravessa + '/variants/'
    },
    getUrlEntrevista: state=>  {
      return state.url + '/api/v1/documents/' + state.document + '/layers/' + state.urlEntrevista+ '/variants/'
    },
    getVariantsColps: state=> {
      return state.variantsColps
    },
    getVariantsTretes: state=> {
      return state.variantsTretes
    },
    getVariantsCanvis: state=> {
      return state.variantsCanvis
    },
    getVariantsDurada: state=> {
      return state.variantsDurada
    },
    getVariantsTravessa: state=> {
      return state.variantsTravessa
    },
    getVariantsEntrevista: state=> {
      return state.variantsEntrevista
    },
    getStatus: state => {
      return state.status
    },
    info: state => {
      /* http://localhost:8989/api/v1/documents */
      /* return state.url + '/api/v1/documents/' + state.document + '/layers/' */
      return state.url + '/api/v1/documents/'
    },
    getLayers: state => {
      return state.url + '/api/v1/documents/' + state.document + '/layers/'
    },
    getInfoLive: state => {
      return state.infoLive
    },
    getLive: state => {
      return state.live
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
      context.variantsColps = []
      context.variantsColps = payload

    },
    updateVariantsTretes(context, payload) {
      context.variantsTretes = []
      context.variantsTretes = payload
    },
    updateVariantsCanvis(context, payload) {
      context.variantsCanvis = []
      context.variantsCanvis = payload
    },
    updateVariantsDurada(context, payload) {
      context.variantsDurada = []
      context.variantsDurada = payload
    },
    updateVariantsTravessa(context, payload) {
      context.variantsTravessa = []
      context.variantsTravessa = payload
    },
    updateVariantsEntrevista(context, payload) {
      context.variantsEntrevista = []
      context.variantsEntrevista = payload
    },
    conexion(context, payload) {
      context.online = payload
    }, 
    setInfo(context, payload) {
      context.infoLive = payload
    },
    setDocument(context, payload) {
      //console.log(payload)
      context.document = payload[0].id
      /* context.infoLive =  */
    },
    setLayerColps(context, payload) {
      context.urlColps = payload
    },
    setLayerTretes(context, payload) {
      context.urlTretes = payload
    },
    setLayerCanvis(context, payload) {
      context.urlCanvis = payload
    },
    setLayerDurada(context, payload) {
      context.urlDurada = payload
    },
    setLayerTravessa(context, payload) {
      context.urlTravessa = payload
    },
    setLayerUrl(context, payload) {
      context.url = payload
    },
    setLayerEntrevista(context, payload) {
      context.urlEntrevista = payload
    },
    clear(context) {
      context.variantsColps = []
      context.variantsTretes = []
      context.variantsCanvis = []
      context.variantsDurada = []
      context.variantsTravessa = []
      context.variantsEntrevista = []
    },
    updateLayersDB(context, payload) {
      let c = context
      c.live = payload.live
      c.document = payload.documento
      c.url = payload.url
      c.urlCanvis = payload.urlCanvis
      c.urlDurada = payload.urlDurada
      c.urlTravessa = payload.urlTravessa
      c.urlTretes = payload.urlTretes
      c.urlColps = payload.urlColps
      c.urlEntrevista = payload.urlEntrevista

    },
    live(context, payload) {
      context.live = payload
    }
  },
  actions: {
    conectar: ({dispatch, commit, getters}) => {
      axios.get(getters.info)
      .then((res) => {
        commit('setStatus', res.status)
        commit('setDocument', res.data.data)
      })
      .then(() => {
        axios.get(getters.getLayers)
        .then(res => {
          commit('setInfo', res.data.data)
          dispatch('updateVariants')
        })
      })
      .then(() => {
        if (getters.getStatus == 200) {
          dispatch('actualizaDBmimo', {live: true})
        }
      })
    },
    desconectar({commit}, payload) {
      const up = db.collection('liveupdateDB').doc('Xq5yYIQaCKs2vuZ9S33a')
      up.update(payload)
      commit('live', false)
    },
    actualizaDBmimo: ({commit}, payload) => {
      if (payload.live == false) {
        commit('live', false)
      }
      const up = db.collection('liveupdateDB').doc('Xq5yYIQaCKs2vuZ9S33a')
      up.update(payload)
      
    },
    cambioLayerUrl: ({commit, dispatch}, payload) => {
      commit('setLayerUrl', payload)
      dispatch('actualizaDBmimo', {url: payload})
    },
    cambioLayerColps: ({getters, commit, dispatch}, payload) => {
      commit('setLayerColps', payload)
      dispatch('actualizaDBmimo', {urlColps: payload})
      axios.get(getters.getUrlColps)
      .then(res => {
        commit('updateVariantsColps', res.data.data)
      })
    },
    cambioLayerTretes: ({getters, commit, dispatch}, payload) => {
      commit('setLayerTretes', payload)
      dispatch('actualizaDBmimo', {urlTretes: payload})
      axios.get(getters.getUrlTretes)
      .then(res => {
        commit('updateVariantsTretes', res.data.data)
      })
    },
    cambioLayerCanvis: ({getters, commit, dispatch}, payload) => {
      commit('setLayerCanvis', payload)
      dispatch('actualizaDBmimo', {urlCanvis: payload})
      axios.get(getters.getUrlCanvis)
      .then(res => {
        commit('updateVariantsCanvis', res.data.data)
      })
    },
    cambioLayerDurada: ({getters, commit, dispatch}, payload) => {
      commit('setLayerDurada', payload)
      dispatch('actualizaDBmimo', {urlDurada: payload})
      axios.get(getters.getUrlDurada)
      .then(res => {
        commit('updateVariantsDurada', res.data.data)
      })
    },
    cambioLayerTravessa: ({getters, commit, dispatch}, payload) => {
      commit('setLayerTravessa', payload)
      dispatch('actualizaDBmimo', {urlTravessa: payload})
      axios.get(getters.getUrlTravessa)
      .then(res => {
        commit('updateVariantsTravessa', res.data.data)
      })
    },
    cambioLayerEntrevista: ({getters, commit, dispatch}, payload) => {
      commit('setLayerEntrevista', payload)
      dispatch('actualizaDBmimo', {urlEntrevista: payload})
      axios.get(getters.getUrlEntrevista)
      .then(res => {
        commit('updateVariantsEntrevista', res.data.data)
      })
    },
    updateVariants: ({getters, commit}) => {
      axios.get(getters.getUrlColps)
      .then(res => {
        commit('updateVariantsColps', res.data.data)
      })
      .then(() => {
        axios.get(getters.getUrlTretes)
        .then(res => {
          commit('updateVariantsTretes', res.data.data)
        })
      })
      .then(() => {
        axios.get(getters.getUrlCanvis)
        .then(res => {
          commit('updateVariantsCanvis', res.data.data)
        })
      })
      .then(() => {
        axios.get(getters.getUrlDurada)
        .then(res => {
          commit('updateVariantsDurada', res.data.data)
        })
      })
      .then(() => {
        axios.get(getters.getUrlTravessa)
        .then(res => {
          commit('updateVariantsTravessa', res.data.data)
        })
      })
      .then(() => {
        axios.get(getters.getUrlEntrevista)
        .then(res => {
          commit('updateVariantsEntrevista', res.data.data)
          //console.log(res.data.data)
        })
      })
    },
    updateDbMimo: ({commit}) => {
      db.collection('liveupdateDB').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'modified') {
            commit('updateLayersDB', change.doc.data())
          } else if(change.type === 'added' ) {
            commit('updateLayersDB', change.doc.data())
          }
        })
      })
      
    }





    /* updateVariants: ({commit, state}) => {
      console.log('update')
      axios.get(state.infoUrl)
      .then(() => {
        axios.get(state.urlColps)
        .then(res => {
          console.log(res.status)
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
    } */
  }
}