;
(function($){

    var Progressbar = function(args, jqObject) {
        this._defaults = {
            width: 0,           // 宽度，默认填满整个父元素
            height: 0,          // 高度，默认采用bootstrap高度
            value: 0,           // 百分比值
            onChange: function(newValue, oldValue) {},
        };

        this.init(args, jqObject);
    }

    /**
     * 私有方法
     */
    private_function = {
        // 处理值
        parseValue: function(value) {
            var _value = parseInt(value);
            if (_value >= 100) {
                _value = 100;
            } else if (_value <= 0) {
                _value = 0
            }
            return _value;
        }
    }

    /**
     * 初始化组件
     */
    Progressbar.prototype.init = function(args, jqObject) {
        jqObject.addClass('progress');

        this.flag = String(parseInt(Date.parse(new Date()) / 1000)) + '_' + String(parseInt(Math.random() * 1000));
        this._options = $.extend(this._defaults, args);
        this._options.value = private_function.parseValue(this._options.value);

        this.insertProgressbarBody(jqObject);
    }

    /**
     * 插入dom
     */
    Progressbar.prototype.insertProgressbarBody = function(jqObject) {
        var value = String(this._options.value);
        // 组件宽度
        var width = this._options.width;
        if (width != 'full' && parseInt(width)) {
            jqObject.css({width: String(width) + 'px'});
        }

        var _progress  = '<div class="progress-bar" role="progressbar" id="_eb_progressbar_' + this.flag + '"';
            _progress += ' aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" ';
            _progress += 'style="width: '+value+'%;min-width: 20px;">'+value+'%</div>';
        jqObject.append(_progress);
    }

    /**
     * 获取进度条的进度值
     */
    Progressbar.prototype.getValue = function() {
        return this._options.value;
    }

    /**
     * 设置进度条的进度值
     */
    Progressbar.prototype.setValue = function(value, jqObject) {
        var oldValue = this._options.value;
        var _value = private_function.parseValue(value);
        var _text = String(_value) + '%'
        this._options.value = _value;
        $('#_eb_progressbar_' + this.flag).css({width: _text}).html(_text);

        // 用户回调
        this._options.onChange(_value, oldValue);
        return jqObject;
    }

    /**
     * 获取设置值
     */
    Progressbar.prototype.options = function() {
        return this._options;
    }

    $.fn.extend({
        progressbar: function() {
            if (!this.Progressbar) {
                this.Progressbar = new Progressbar(arguments[0], this);
                return this;
            } else {
                var _funcName = arguments[0];
                if (typeof(this.Progressbar[_funcName]) != 'function') {
                    console.log('searchbox doesn\'t have function called \''+_funcName+'\'');
                    return false;
                } else {
                    return this.Progressbar[_funcName](arguments[1], this);
                }
            }
        }
    });

})(jQuery);