<template>
<el-row style="height: 100%;width:100%">
  <div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
      <div class="container-fluid">
        <a class="brand">
          <img src="@/assets/img/favicon.png"> 表单构建器 v1.0
          <span class="label">BETA</span>
        </a>
        <div class="nav-collapse collapse operate-menu">
          <ul class="nav" id="menu-layoutit">
            <li class="divider-vertical"></li>
            <li>
              <div class="btn-group" data-toggle="buttons-radio">
                <button type="button" id="edit" class="btn btn-primary active">
                  <i class="icon-edit icon-white"></i>编辑</button>
                <button type="button" class="btn btn-primary" id="devpreview">
                  <i class="icon-eye-close icon-white"></i>布局编辑</button>
                <button type="button" class="btn btn-primary" id="sourcepreview">
                  <i class="icon-eye-open icon-white"></i>预览</button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-primary" data-target="#downloadModal" rel="/build/downloadModal" role="button" data-toggle="modal">
                  <i class="icon-chevron-down icon-white"></i>下载</button>
                <button class="btn btn-primary" href="/share/index" role="button" data-toggle="modal" data-target="#shareModal">
                  <i class="icon-share icon-white"></i>保存</button>
                <button class="btn btn-primary" href="#clear" id="clear">
                  <i class="icon-trash icon-white"></i>清空</button>
              </div>
              <div class="btn-group">
                <button class="btn btn-primary" href="#undo" id="undo">
                  <i class="icon-arrow-left icon-white"></i>撤销</button>
                <button class="btn btn-primary" href="#redo" id="redo">
                  <i class="icon-arrow-right icon-white"></i>重做</button>
              </div>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
    </div>
  </div>
  <div class="container-fix">
    <div class="row-fluid">
      <div class="">
        <div class="sidebar-nav">
          <ul class="nav nav-list accordion-group">
            <li class="nav-header">
              <i class="icon-plus icon-white"></i> 基本CSS
              <div class="pull-right popover-info">
                <i class="icon-question-sign "></i>
                <div class="popover fade right">
                  <div class="arrow"></div>
                  <h3 class="popover-title">帮助</h3>
                  <div class="popover-content">这里提供了一系列基本元素样式，你可以通过区块右上角的编辑按钮修改样式设置。
                  </div>
                </div>
              </div>
            </li>
            <li style="display: none;" class="boxes" id="elmBase">
              <div class="box box-element ui-draggable">
                <a href="#close" class="remove label label-important">
                  <i class="icon-remove icon-white"></i>删除</a>
                <span class="drag label">
                  <i class="icon-move"></i>拖动</span>
                <span class="configuration">
                  <button type="button" class="btn btn-mini" data-target="#editorModal" role="button" data-toggle="modal">编辑</button>
                  <span class="btn-group">
                    <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">对齐
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li class="active">
                        <a href="#" rel="">默认</a>
                      </li>
                      <li class="">
                        <a href="#" rel="text-left">靠左</a>
                      </li>
                      <li class="">
                        <a href="#" rel="text-center">居中</a>
                      </li>
                      <li class="">
                        <a href="#" rel="text-right">靠右</a>
                      </li>
                    </ul>
                  </span>
                  <span class="btn-group">
                    <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">标记
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li class="active">
                        <a href="#" rel="">默认</a>
                      </li>
                      <li class="">
                        <a href="#" rel="muted">禁用</a>
                      </li>
                      <li class="">
                        <a href="#" rel="text-warning">警告</a>
                      </li>
                      <li class="">
                        <a href="#" rel="text-error">错误</a>
                      </li>
                      <li class="">
                        <a href="#" rel="text-info">提示</a>
                      </li>
                      <li class="">
                        <a href="#" rel="text-success">成功</a>
                      </li>
                    </ul>
                  </span>
                </span>
                <div class="preview"><i class="el-icon-edit-outline"></i> 标题栏</div>
                <div class="view">
                  <h3 contenteditable="true">h3. 这是一套可视化布局系统.</h3>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--/span-->
      <div class="demo ui-sortable" style="min-height: 304px; ">
        <div class="lyrow">
          <a href="#close" class="remove label label-important">
            <i class="icon-remove icon-white"></i>删除</a>
          <span class="drag label">
            <i class="icon-move"></i>拖拽</span>
          <div class="preview">9 3</div>
          <div class="view">
            <div class="row-fluid clearfix">
              <div class="span12 column ui-sortable">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end demo -->
      <!--/span-->
      <div id="download-layout">
        <div class="container-fluid"></div>
      </div>
    </div>
    <!--/row-->
  </div>
  <!--/.fluid-container-->
  <div class="modal hide fade" role="dialog" id="editorModal">
    <div class="modal-header">
      <a class="close" data-dismiss="modal">×</a>
      <h3>编辑</h3>
    </div>
    <div class="modal-body">
      <p>
        <textarea id="contenteditor"></textarea>
      </p>
    </div>
    <div class="modal-footer">
      <a id="savecontent" class="btn btn-primary" data-dismiss="modal">保存</a>
      <a class="btn" data-dismiss="modal">关闭</a>
    </div>
  </div>
  <div class="modal hide fade" role="dialog" id="downloadModal">
    <div class="modal-header">
      <a class="close" data-dismiss="modal">×</a>
      <h3>下载</h3>
    </div>
    <div class="modal-body">
      <p>已在下面生成干净的HTML, 可以复制粘贴代码到你的项目.</p>
      <div class="btn-group">
        <button type="button" id="fluidPage" class="active btn btn-info">
          <i class="icon-fullscreen icon-white"></i> 自适应宽度</button>
        <button type="button" class="btn btn-info" id="fixedPage">
          <i class="icon-screenshot icon-white"></i> 固定宽度</button>
      </div>
      <br>
      <br>
      <p>
        <textarea></textarea>
      </p>
    </div>
    <div class="modal-footer">
      <a class="btn" data-dismiss="modal">关闭</a>
    </div>
  </div>
  <div class="modal hide fade" role="dialog" id="shareModal">
    <div class="modal-header">
      <a class="close" data-dismiss="modal">×</a>
      <h3>保存</h3>
    </div>
    <div class="modal-body">保存成功</div>
    <div class="modal-footer">
      <a class="btn" data-dismiss="modal">关闭</a>
    </div>
  </div>
</el-row>
</template>

<script>
import "@/libs/scripts";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fix {
  margin-left: 200px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
}
.sidebar-nav {
  text-align: left !important;
}
.operate-menu {
  display: block !important;
}
</style>
