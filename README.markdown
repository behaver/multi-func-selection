# 多功能选择插件

## 介绍

本插件基于 JQuery 和 Bootstrap 进行开发。

{% highlight html %}
<div class="mfs" data-multi-selected="1" data-name="channel">
    <!-- 文本输入框 -->
    <div class="mfs-input-box">
        <input type="text" class="mfs-input"/>
        <div class="mfs-input-arrow dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
            <span class="loading"><img src="/packages/multi-func-selection/loading.gif" /></span>
        </div>
        <!-- 下拉提示容器 -->
        <div class="mfs-prompts  dropdown-menu" data-page="1" data-size="10" data-prompts-url="/channels" role="menu">
            <!-- 新增选项 -->
            <div class="mfs-prompts-add"><a href="#"><span class="glyphicon glyphicon-plus"></span>&nbsp;新增选项</a></div>
            <!-- 选项列表 -->
            <ul class="mfs-prompts-content"></ul>
            <!-- 分页按钮 -->
            <nav class="mfs-prompts-pagination"></nav>
        </div>
    </div>
</div>
{% endhighlight %}

## 通过Ajax请求下拉提示

## 多选 OR 单选

效果展示图

## 选项分页

效果展示图

## 新增选项

效果展示图