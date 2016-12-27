/**
 * easy-bootstrap工具类
 */
;
(function($) {

    /**
     * 生成组件flag
     */
    $.composeWidgetFlag = function() {
        var flag  = String(parseInt(Date.parse(new Date()) / 1000));
            flag += '_' + String(parseInt(Math.random() * 1000));
        return flag;
    };

    /**
     * storage工具
     */
    $.webStorage = {
        /**
         * 设置storage
         *
         * param string key     : 键
         * param string value   : 需要保存的值
         * param string type    : 保存的类型，默认为session（sessionStorage）
         * param int    expire  : 保存的时间，留空则永久保存
         *
         * return true;
         */
        set : function(key, value, type, expire) {
            var data = {};
            data['value'] = value;
            data['expire'] = parseInt(expire)? parseInt(expire) : 0;
            data['addtime'] = parseInt(Date.parse(new Date()) / 1000);
            var data_string = JSON.stringify(data);

            if (type == 'local') {
                window.localStorage.setItem(key, data_string);
            } else {
                window.sessionStorage.setItem(key, data_string);
            }

            return true;
        },
        /**
         * 获取值
         *
         * param string key     : 键
         * param string type    : 缓存类型，默认为session（sessionStorage）
         *
         * return string|false
         */
        get : function(key, type) {
            if (type == 'local') {
                var data_string = window.localStorage.getItem(key);
            } else {
                var data_string = window.sessionStorage.getItem(key);
            }
            if (!data_string) { return false; }

            // 无过期时间
            var data = JSON.parse(data_string);
            if (!data['expire']) { return data['value']; }

            // 有过期时间
            var expire  = parseInt(data['expire']);
            var addtime = parseInt(data['addtime']);
            var nowtime = parseInt(Date.parse(new Date()) / 1000);

            if (nowtime - addtime > expire) {
                // 清除缓存并返回false
                if (type == 'local') {
                    window.localStorage.removeItem(key);
                } else {
                    window.sessionStorage.removeItem(key);
                }
                return false;
            } else {
                return data['value'];
            }
        },
        /**
         * 删除值
         *
         * return true
         */
        remove: function(key, type) {
            if (type == 'local') {
                window.localStorage.removeItem(key);
            } else {
                window.sessionStorage.removeItem(key);
            }

            return true;
        }
    }

})(jQuery);