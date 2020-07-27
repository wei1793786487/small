import {config} from "../settings/set"
import{request} from '../utils/network'

export function getMeeting() {
  return request({
    url:  `${config.api_base_url}/meeting/belong`
  })
}

export function getMeetingById(id) {
  return request({
    url:  `${config.api_base_url}/meeting/information/${id}`
  })
}