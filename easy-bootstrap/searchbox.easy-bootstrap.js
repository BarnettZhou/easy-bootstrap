;
(function($){

    var Searchbox = function(args, jqObject) {
        this._defaults = {
            width: 0,       // 组件宽度，单位px，默认0
            height: 0,      // 组件高度，单位px，默认0
            prompt: '',     // 提示信息
            value: '',      // 默认值
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
        var _this = this;
        // set width
        // todo...

        var prompt = this._options.prompt;
        jqObject.attr('placeholder', prompt).attr('type', 'text').addClass('form-control');

        var _span  = '<span class="input-group-btn">';
            _span += '<a href="javascript:void(0);" class="btn btn-default" type="button" id="'+this._btnId+'">';
            _span += '<span class="glyphicon glyphicon-search"></span></a></span>';

        var _jq_span = $(_span);
        _jq_span.on('click', function() {
            var _value = jqObject.val();
            var _name = jqObject.attr('name');
            _this._options.searcher(_value, _name);
        });

        jqObject.wrap('<div id="'+this._groupId+'" class="input-group" />').after(_jq_span);
    };

    $.fn.extend({
        searchbox: function() {
            if (!this.Searchbox) {
                this.Searchbox = new Searchbox(arguments[0], this);
                return this;
            } else {
                var _funcName = arguments[0];
                if (typeof(this.Combobox[_funcName]) != 'function') {
                    console.log('searchbox doesn\'t have function called \''+_funcName+'\'');
                    return false;
                } else {
                    return this.Combobox[_funcName](arguments[1], this);
                }
            }
        }
    });

})(jQuery);