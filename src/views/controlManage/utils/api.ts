import request from '@/api/request'

/**
 * @method 获取控件库列表（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function getLibList (params1, params2):any {
  return request({
    url: '/control/queryByPage?pageNo=' + params2.pageNo + '&pageSize=' + params2.pageSize,
    method: 'post',
    // headers: {
    //   'Content-type': 'application/x-www-form-urlencoded'
    // },
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params: params1
  })
}

/**
 * @method 新增控件库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function addLibItem (params) {
  return request({
    url: '/control',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params
  })
}

/**
 * @method 删除控件库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function delLibItem (id) {
  return request({
    url: '/control/delete/' + id,
    method: 'delete'
  })
}

/**
 * @method 启用停用控件库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function changeLibStatus (params) {
  return request({
    url: '/control/updateFlag?ids=' + params.ids + '&flag=' + params.flag,
    method: 'post'
  })
}

/**
 * @method 获取控件详情信息（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function getLibDetail (id) {
  return request({
    url: '/control/get/' + id,
    method: 'get'
  })
}

/**
 * @method 获取控件列表（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function getControlList (params1, params2) {
  return request({
    url: '/control-attribute/queryByPage?pageNo=' + params2.pageNo + '&pageSize=' + params2.pageSize,
    method: 'post',
    // headers: {
    //   'Content-type': 'application/x-www-form-urlencoded'
    // },
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params: params1
  })
}

/**
 * @method 新增控件（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function addControlItem (params) {
  return request({
    url: '/control-attribute',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    paramsType: 'json',
    params
  })
}

/**
 * @method 删除控件（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function delControlItem (params) {
  return request({
    url: '/control-attribute/delete',
    method: 'delete',
    params
  })
}

/**
 * @method 启用停用控件库（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function changeControlStatus (params) {
  return request({
    url: '/control-attribute/updateFlag?ids=' + params.ids + '&flag=' + params.flag,
    method: 'post'
  })
}

/**
 * @method 获取控件详情信息（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function getControlDetail (id) {
  return request({
    url: '/control-attribute/get/' + id,
    method: 'get'
  })
}

/**
 * @method 获取控件库列表所有数据（后端-谢信聪）
 * @param {}
 * @return
 * @date 2019/11/5
*/
export function getAllLib (params) {
  return request({
    url: '/control/getAllList',
    method: 'get',
    params
  })
}

/**
 * @method 表格demo添加数据（后端-张俊培）
 * @param {}
 * @return
 * @date 2019/5/24
 */
export function addList (params) {
  return request({
    url: '/api/values',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    method: 'post',
    params
  }, false)
}
