;
(function($){

    var Searchbox = function(args, jqObject) {
        this._defaults = {
            width: 0,           // 组件宽度，单位px，默认0，`full`会占满整个父元素
            size: 'default',    // 组件大小，default默认，lg大，sm小
            prompt: '',         // 提示信息
            value: '',          // 默认值
            searcher: function(value, name) {console.log(arguments)},
        };

        this.init(args, jqObject);
    };

    /**
     * 初始化组件
     */
    Searchbox.prototype.init = function(args, jqObject) {
        this.flag = String(parseInt(Date.parse(new Date()) / 1000)) + '_' + String(parseInt(Math.random() * 1000));

        this._groupId = '_eb_searchbox_group_' + this.flag;
        this._btnId = '_eb_searchbox_btn_' + this.flag;
        this._options = $.extend(this._defaults, args);

        this.insertSearchboxBody(jqObject);
    };

    /**
     * 插入dom
     */
    Searchbox.prototype.insertSearchboxBody = function(jqObject) {
        var _this   = this;
        var size    = this._options.size;
        var width   = this._options.width;

        // input/btn size
        var _input_class    = 'form-control';
        var _btn_class      = 'btn btn-default'
        if (size != 'default') {
            _input_class += ' input-' + size;
            _btn_class += ' btn-' + size;
        }

        // width
        var _container_style = '';
        if (width != 'full' && parseInt(width)) {
            _container_style = 'style="width:'+String(width)+'px;"';
        }

        var prompt = this._options.prompt;
        jqObject.attr('placeholder', prompt).attr('type', 'text').addClass(_input_class);

        var _span  = '<span class="input-group-btn">';
            _span += '<a href="javascript:void(0);" class="'+_btn_class+'" type="button" id="'+this._btnId+'">';
            _span += '<span class="glyphicon glyphicon-search"></span></a></span>';

        var _jq_span = $(_span);
        _jq_span.on('click', function() {
            var _value = jqObject.val();
            var _name = jqObject.attr('name');
            _this._options.searcher(_value, _name);
        });

        jqObject.wrap('<div id="'+this._groupId+'" class="input-group" '+_container_style+'/>').after(_jq_span);
    };

    /**
     * 获取Searchbox中的值
     */
    Searchbox.prototype.getValue = function() {
        var jqObject = arguments[1];
        return jqObject.val();
    }

    $.fn.extend({
        searchbox: function() {
            if (!this.Searchbox) {
                this.Searchbox = new Searchbox(arguments[0], this);
                return this;
            } else {
                var _funcName = arguments[0];
                if (typeof(this.Searchbox[_funcName]) != 'function') {
                    console.log('searchbox doesn\'t have function called \''+_funcName+'\'');
                    return false;
                } else {
                    return this.Searchbox[_funcName](arguments[1], this);
                }
            }
        }
    });

})(jQuery);