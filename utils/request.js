import {
  request
  }
   from './network.js'

const url = "http://127.0.0.1:10086"

 
export function getMeeting() {
  return request({
    url: url + "/meeting"
  })
}

export function getOneMeeting(id) {
  return request({
    url: url + "/meeting/"+id+""
  })
}


export function bind(name,phone) {
  return request({
    url: url + "/person",
    method: 'post',
    data: {
      pname: name,
      phone: phone
    }
  })
}

export function getface(str,mid,latitude,longitude) {
  console.log(mid)
  return request({
    url: "http://127.0.0.1:8080/face/search",
    method:'post',
    data:{
      mid:mid,
      imgStr:str,
      lat:latitude,
      long:longitude
    }
  })
}


