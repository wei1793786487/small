import {config} from "../settings/set"
import{request} from '../utils/network'

export function getBandInfo() {
  return request({
    url:  `${config.api_base_url}/vx/bandinfo`
  })
}