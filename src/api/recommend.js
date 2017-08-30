import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

// import axios from 'axios'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uni: 0,
    needNewCode: 1,
    _: +new Date()
  })
  return jsonp(url, data, options)
}

export function getDiscList () {
  const url = 'http://39.108.86.208/interface/musicApp/getDiscList.php'
  const data = Object.assign({}, commonParams, {
    playform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'jsonp',
    g_tk: 632748615
  })
  return jsonp(url, data, options)
}

export function getSongList (disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    g_tk: 5381
  })
  // 经过调试，发现jsonp库的__jp开头的默认回调函数被对方接口限制，导致jsonpCallback返回的结果集无法正常解析，所以设置一下prefix，去掉__
  const opt = Object.assign({}, options, {
    prefix: 'jp'
  })
  return jsonp(url, data, opt)
}
