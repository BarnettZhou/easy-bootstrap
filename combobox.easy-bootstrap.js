;
(function($){

    var Combobox = function(args, jqObject) {
        this._defaults = {
            width: 0,               // 组件宽度，单位px
            btnSize: 'default',     // 按钮大小，lg、sm、xs或留空（default）
            valueField: 'value',    // 值的字段
            textField: 'text',      // 显示文字的字段
            data: [],               // 本地加载的数据
            onSelect: function(record) {},
        };

        this._btn_id        = '_eb_combobox_btn_' + this.flag;
        this._ul_id         = '_eb_combobox_ul_' + this.flag;
        this._base_style    = '';
        this._selectedRow   = {};
        this._value_record  = {};
        this.init(args, jqObject);
    }

    var _dropdown_option = {
        'default':  { caret_margin: '10%',  font_size: '14px', },
        'lg':       { caret_margin: '10%',  font_size: '14px', },
        'sm':       { caret_margin: '7%',   font_size: '12px', },
        'xs':       { caret_margin: '7%',   font_size: '12px', },
    }

    /**
     * 初始化插件
     */
    Combobox.prototype.init = function(args, jqObject) {
        this.flag = String(parseInt(Date.parse(new Date()) / 1000)) + '_' + String(parseInt(Math.random() * 1000));
        this._options = $.extend(this._defaults, args);

        this.insertComboboxBody(jqObject);
    }

    /**
     * 插入dom，绑定数据与事件
     */
    Combobox.prototype.insertComboboxBody = function(jqObject) {
        var data            = this._options.data;
        var valueField      = this._options.valueField;
        var textField       = this._options.textField;

        this._base_style = '';
        if (this._options.width) {
            this._base_style += 'min-width:' + String(this._options.width) + 'px;';
        }

        // 按钮大小，默认default
        if (!this._options.btnSize) { this._options.btnSize = 'default'; }

        var _jq_ul = this.composeDropdownList();

        // 按钮部分
        var _btn_class = 'btn btn-default dropdown-toggle';
        if (this._options.btnSize && this._options.btnSize != 'default') {
            _btn_class += ' btn-' + this._options.btnSize;
        }
        var _btn_html  = '<a class="'+_btn_class+'" type="button" id="'+this._btn_id+'" data-toggle="dropdown" style="'+this._base_style+'">';
            _btn_html += '<span class="dropdown-text pull-left">'+this._selectedRow[textField];
            _btn_html += '</span><span class="caret pull-right" style="margin-top:'+_dropdown_option[this._options.btnSize]['caret_margin']+';"></span></a>';

        jqObject.attr('hidden', 'true')
            .wrap('<div class="dropdown" />')
            .before(_btn_html)
            .before(_jq_ul);
    }

    /**
     * 生成列表dom（不插入）
     */
    Combobox.prototype.composeDropdownList = function() {
        var data    = this._options.data;
        var _this   = this;

        // 默认选中的record
        if (data[0]) {
            this._selectedRow = data[0];
        } else {
            this._selectedRow = {};
            this._selectedRow[this._options.textField]    = '';
            this._selectedRow[this._options.valueField]   = '';
        }

        if (data.length) {
            var _jq_ul = $('<ul class="dropdown-menu" role="menu" aria-labelledby="'+this._btn_id+'" id="'+this._ul_id+'" style="'+this._base_style+'"></ul>');
        } else {
            var _jq_ul = '';
        }

        for (key in data) {
            this._value_record[data[key][this._options.valueField]] = data[key];
            var _li_html  = '<li role="presentation">';
                _li_html += '<a role="menuitem" tabindex="-1" href="#" ';
                _li_html += 'style="font-size:'+_dropdown_option[this._options.btnSize]['font_size']+';">';
                _li_html += data[key][this._options.textField]+'</a></li>';
            var _jq_li = $(_li_html);
            _jq_li.data('record', data[key])    // 绑定数据
                .on('click', function() {       // 绑定点击事件
                    $('#'+_this._btn_id + ' > .dropdown-text').html($(this).data('record')[_this._options.textField]);
                    _this._selectedRow = $(this).data('record');
                    // 用户设置的回调
                    _this._options.onSelect($(this).data('record'));
                })
                .appendTo(_jq_ul);              // 插入dom
            // 默认选项
            if (data[key]['selected']) {
                this._selectedRow = data[key];
            }
        }

        return _jq_ul;
    }

    /**
     * 加载本地列表数据
     */
    Combobox.prototype.loadData = function(data, jqObject) {
        this._options.data = data;
        $('#'+this._ul_id).remove();

        var _jq_ul = this.composeDropdownList();
        $('#'+this._btn_id+'>.dropdown-text')
            .html(this._selectedRow[this._options.textField])
            .parent().after(_jq_ul);

        return jqObject;
    }

    /**
     * 获取当前Combobox的值
     */
    Combobox.prototype.getValue = function() {
        return this._selectedRow[this._options.valueField];
    }

    /**
     * 设置Combobox的值
     */
    Combobox.prototype.setValue = function(value, jqObject) {
        this._selectedRow = this._value_record[value];
        var _text = this._selectedRow[this._options.textField];
        $('#'+this._btn_id+' > .dropdown-text').html(_text);

        return jqObject;
    }

    /**
     * 返回加载的数据
     */
    Combobox.prototype.getData = function() {
        return this._options.data;
    }

    /**
     * 返回选项
     */
    Combobox.prototype.options = function() {
        return this._options;
    }

    $.fn.extend({
        combobox: function() {
            if (!this.Combobox) {
                this.Combobox = new Combobox(arguments[0], this);
                return this;
            } else {
                var _funcName = arguments[0];
                if (typeof(this.Combobox[_funcName]) != 'function') {
                    console.log('combobox doesn\'t have function called \''+_funcName+'\'');
                    return false;
                } else {
                    return this.Combobox[_funcName](arguments[1], this);
                }
            }
        }
    });

})(jQuery);