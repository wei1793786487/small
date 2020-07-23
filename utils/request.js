

import{request} from './network'

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
    url: "https://www.hqgml.com/api/face/search",
    method:'post',
    data:{
      mid:mid,
      imgStr:str,
      lat:latitude,
      long:longitude
    }
  })
}


