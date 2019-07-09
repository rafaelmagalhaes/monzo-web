export default ({$axios, route, app}) => {
  if (localStorage.getItem('token')) { // set global Header Authorization if its in the localstorage
    $axios.onRequest(config => {
      config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    })
  }
}
