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
        <div class="mfs-prompts dropdown-menu" data-page="1" data-size="10" data-prompts-url="/channels" role="menu">
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

在mfs-prompts类的容器标签上，通过`data-prompts-url`来设置ajax请求的地址：

`data-prompts-url="url"`

这里需要后端的返回json格式的数据对象，其中`records`属性为数组，它的每一个数组项为一个对象，默认情况下，数组项的`id`属性对应选项key值，`name`属性对应选项展示值。

同样，你也可以通过下面的属性来自定义设置id: name各自对应的属性名称：

`data-id-key="id"`

`data-name-key="name"`

## 选项分页

在mfs-prompts类的容器标签上，通过`data-size`来设置一页选项的数量：

`data-size="10"`

若缺省，则默认为10。

通过`data-page`来设置页码：

`data-page="1"`

若缺省，则默认为1。

## 多选 OR 单选

默认情况下，插件开启的是单选功能。

若需要开启多选功能，可通过将`class="mfs"`的容器设置`data-multi-selected="1"`来实现。

## 新增选项

