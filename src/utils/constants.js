// 获取本地存储
export function getLocalStore(params) {
    return localStorage.getItem(params)
}
// 设置本地存储
export function setLocalStore(key, value) {
    localStorage.setItem(key, value)
}

export function jsNum(num) {
    let lenWindow = document.documentElement.clientWidth;
    let iWidth = lenWindow / 1920;
    let fs = num * iWidth;
    return fs;
}

export function random(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
}

// 处理url参数
export function getUrlParams(url) {
    var p = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paramObj = {};
    for (var i = 0; i < p.length; i++) {
        paramObj[p[i].substring(0, p[i].indexOf("="))] = p[i].substring(p[i].indexOf("=") + 1, p[i].length);
    }
    return paramObj
}
// 请求成功后提示
export function optionTip(code, msg, message, callBack) {
    if (code !== 0) {
        return
    }
    message.success(msg);
    callBack && callBack()
}

// 处理多个循环出来的表单数据
export function formatFormData(params) {
    let reg = /_\d+$/
    let obj = {}
    // eslint-disable-next-line no-unused-vars
    for (let key in params) {
        if (reg.test(key)) {
            let objKey = key.replace(reg, '')
            let index = key.replace(objKey, '')
            if (!obj[index]) {
                obj[index] = {}
            }
            obj[index][objKey] = params[key]
        }
    }
    return Object.keys(obj).map(key => obj[key])
}

