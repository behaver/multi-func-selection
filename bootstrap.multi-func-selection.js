/**
 * 请求下拉提示内容
 * @return {[type]} [description]
 */
var mfsRequestPrompts = function (event) {
    // 获取组件根容器
    var wrap = $(event.target).parents('.mfs');
    var prompts = wrap.find('.mfs-prompts');

    var url = prompts.attr('data-prompts-url');
    var page = 1;
    if (prompts.attr('data-page') === undefined) prompts.attr('data-page', 1);
    else page = prompts.attr('data-page');

    var size = prompts.attr('data-size') ? prompts.attr('data-size') : 10;

    var data = {
        search: wrap.find('.mfs-input').val(), // 搜索名称
        page: page,
        size: size,
    };

    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: data,
        context: wrap,
        beforeSend: function() {
            this.find('.mfs-prompts').hide();
            this.find('.mfs-input-arrow .caret').hide();
            this.find('.mfs-input-arrow .loading').show();
        }
    })
    .done(mfsDisplayPrompts)
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        this.find('.mfs-prompts').show();
        this.find('.mfs-input-arrow .caret').show();
        this.find('.mfs-input-arrow .loading').hide();
    });
}

/**
 * 展示下拉提示内容
 * @return {[type]} [description]
 */
var mfsDisplayPrompts = function (msg) {

    var wrap = this;
    var prompts = wrap.find('.mfs-prompts');

    var dik = prompts.attr('data-id-key') ? prompts.attr('data-id-key') : 'id';
    var dnk = prompts.attr('data-name-key') ? prompts.attr('data-name-key') : 'name';

    /* 处理下拉列表内容 */
    var content = '';
    for (var i in msg.records) {
        var key = msg.records[i][dik];
        var value = msg.records[i][dnk];

        if (wrap.attr('data-multi-selected') && wrap.find('.mfs-multi-selected-display-item[data-key=' + key + ']').length) {
            content += '<li><a class="mfs-selected-item mfs-selected" href="' + key + '">' + value + '</a></li>';
        } else {
            content += '<li><a class="mfs-selected-item" href="' + key + '">' + value + '</a></li>';
        }
    }
    prompts.find('.mfs-prompts-content').html(content);

    /* 分页处理部分 */
    prompts.find('.mfs-prompts-pagination').hide();
    var pagination = $('<ul class="pagination pagination-sm">');
    // 页面总数
    var page_total = Math.ceil(msg.count / prompts.attr('data-size'));

    if (page_total > 1) { // 多于一页时展示分页按钮
        // 最多展示数字按钮数目
        var max_button = 5; 
        var current_page = parseInt(prompts.attr('data-page'));
        
        pagination.append('<li><a href="1">1</a></li>');

        for (var i = 1, j = Math.ceil(max_button / 2); i < j && j < max_button + 1; i++) {
            if (current_page - i >= 1) pagination.prepend('<li><a href="' + current_page - i + '">' + current_page - i + '</a></li>');
            else j++;
            if (current_page + i <= page_total) pagination.append('<li><a href="' + current_page + i + '">' + current_page + i + '</a></li>');
            else j++;
        }
        pagination.prepend('<li><a href="1">&laquo;</a></li>').append('<li><a href="' + page_total + '">&raquo;</a></li>');
        prompts.find('.mfs-prompts-pagination').html(pagination).show();
    }
}

/**
 * 单选触发
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var mfsSelected = function (event) {
    event.preventDefault();

    // 相关容器获取
    var selectedA = $(event.currentTarget);
    var wrap = selectedA.parents('.mfs');
    
    // 选中元素的键值
    var sKey = selectedA.attr('href');
    var sValue = selectedA.text();

    var iName = wrap.attr('data-name');
    var inputBox = wrap.find('.mfs-input-box');

    // 填写选择选项的名称到input展示
    inputBox.find('.mfs-input').val(sValue);
    // 建立hidden input传输选择选项的值
    var hiddenInput = inputBox.find('.mfs-hidden-input');
    if (hiddenInput.length) hiddenInput.attr({'value': sKey, 'name': iName});
    else inputBox.append('<input class="mfs-hidden-input" type="hidden" name="' + iName + '" value="' + sKey + '"/>');
}

/**
 * 取消单选触发
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var mfsUnselected = function (event) {
    $(event.currentTarget).parents('.mfs').find('.mfs-hidden-input').attr('value', '');
}

/**
 * 添加已经选中的多选展示
 * @return {[type]} [description]
 */
var mfsAddMultiSelected = function (event) {
    event.preventDefault();
    event.stopPropagation();

    // 相关容器获取
    var selectedA = $(event.currentTarget);
    var wrap = selectedA.parents('.mfs');
    
    // 选中元素的键值
    var sKey = selectedA.attr('href');
    var sValue = selectedA.text();

    var displayBox = wrap.find('.mfs-multi-selected-display-box');
    if (displayBox.length == 0) displayBox = $('<ul class="mfs-multi-selected-display-box"></ul>').appendTo(wrap);
    var iName = wrap.attr('data-name') + '[]';

    displayBox.append('<li class="mfs-multi-selected-display-item" data-key="' + sKey + '">\
        <span class="mfs-multi-selected-item-name">' + sValue + '</span>\
        <a href="#" class="mfs-multi-selected-item-del">×</a>\
        <input name="' + iName + '" type="hidden" value="' + sKey + '">\
    </li>');
    selectedA.addClass('mfs-selected');
}

/**
 * 删除已经选中的多选展示
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var mfsDelMultiSelected = function (event) {
    event.preventDefault();

    var delA = $(event.currentTarget);

    if (delA.hasClass('mfs-selected')) { // 再次点击取消处理
        event.stopPropagation();
        delA.parents('.mfs').find('.mfs-multi-selected-display-item[data-key=' + delA.attr('href') + ']').remove();
        delA.removeClass('mfs-selected');
    } else {
        delA.parents('.mfs-multi-selected-display-item').remove();
    }
}

jQuery(document).ready(function($) {

    /* 绑定下拉箭头点击事件 */
    $('.mfs-input-box').on('click', '.mfs-input-arrow', mfsRequestPrompts);

    /* 文本框获得焦点或内容改变事件 */
    $('.mfs-input-box').on('keydown', '.mfs-input', mfsRequestPrompts);
    $('.mfs-input-box').on('focus', '.mfs-input', function(e) {
        if ($(e.currentTarget).val()) mfsRequestPrompts(e);
    });

    // 点击外部下拉提示消失 - 事件绑定
    $(document).click(function(event) {
        $('.mfs-prompts').hide();
    });
    $('.mfs-prompts-add, .mfs-prompts-pagination').click(function(event) {
        event.stopPropagation();
    });

    // 分页点击 - 事件绑定
    $('.mfs-prompts-pagination').on('click', 'a', function(event) {
        event.preventDefault();
        /* Act on the event */
        var pA = $(event.currentTarget);
        var page = pA.attr('href');
        pA.parents('.mfs-prompts').attr('data-page', page);

        mfsRequestPrompts(event);
    });

    // 多选增加 - 事件绑定
    $('.mfs[data-multi-selected] .mfs-prompts-content').on('click', '.mfs-selected-item:not(.mfs-selected)', mfsAddMultiSelected);

    // 多选删除 - 事件绑定
    $('.mfs[data-multi-selected] .mfs-prompts-content').on('click', '.mfs-selected', mfsDelMultiSelected);
    $('.mfs[data-multi-selected]').on('click', '.mfs-multi-selected-item-del', mfsDelMultiSelected);

    // 单选选定 - 事件绑定
    $('.mfs:not([data-multi-selected]) .mfs-prompts-content').on('click', '.mfs-selected-item', mfsSelected);
    // 单选取消 - 事件绑定
    $('.mfs:not([data-multi-selected])').on('keydown', '.mfs-input', mfsUnselected);
});