import {config} from "../settings/url"
import{request} from '../utils/network'

export function getBandInfo() {
  return request({
    url:  `${config.api_base_url}/vx/band`
  })
}