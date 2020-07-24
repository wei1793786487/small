
import {config} from "../settings/url"
import{request} from '../utils/network'

export function getface(str,mid,latitude,longitude) {
  return request({
    url:  `${config.api_base_url}/face/search`,
    method:'post',
    data:{
      mid:mid,
      imgStr:str,
      lat:latitude,
      long:longitude
    }
  })
}


