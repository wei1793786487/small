import {config} from "../settings/url"
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
