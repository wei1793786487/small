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




