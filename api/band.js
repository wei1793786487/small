import {config} from "../settings/set"
import{request} from '../utils/network'

export function bind(name,phone) {
  return request({
    url:  `${config.api_base_url}/vx/band`,
    method: 'post',
    data: {
      pname: name,
      phone: phone
    }
  })
}

export function hellow () {
  return request({
    url:  `${config.api_base_url}/vx`,
    method: 'delete',
  })
}


export function usernameStatus (name) {
  return request({
    url:  `${config.api_base_url}/vx/username`,
    method: 'get',
    data: {
      pname: name
    }
  })
}
