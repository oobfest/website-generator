let axios = require('axios')
let limax = require('limax')

function getActs() {
  return axios.get('https://app.oobfest.com/api/submissions/get-valid-acts')
}

function getWorkshops() {
  return axios.get('https://app.oobfest.com/api/workshops/public/')
}

axios
  .all([getActs(), getWorkshops()])
  .then(axios.spread((actsResponse, workshopsResponse)=> {
    let acts = actsResponse.data
    let workshops = workshopsResponse.data
    let routes = []

    routes.push({ route: '/lineup/', payload: acts })
    routes.push({ route: '/workshops/', payload: workshops })
    
    routes.concat(
      acts.map((act)=> {
        return { route: '/act/' + act.domain, payload: act }
      })
    )
    
    routes.concat(
      workshops.map((workshop)=> {
        return { route: '/workshop/' + limax(workshop.name), payload: workshop }
      })
    )

    console.log(routes)
  }))


// OLD

          routes.push({route: '/lineup/', payload: acts})
          routes.push({route: '/workshops/', payload: workshops})
          
          for(let act of acts) {
            routes.push({route: '/act/' + act.domain, payload: act})
          }
