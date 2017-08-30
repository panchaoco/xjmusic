import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

export function getLyric (mid) {
  const url = 'http://39.108.86.208/interface/musicApp/getLyric.php'

  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 5381,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
