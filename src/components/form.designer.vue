<template>
<el-row style="height: 100%;width:100%">
  <div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
      <div class="container-fluid">
        <a class="brand">
          <img src="static/favicon.png" style="margin: 6px;"> ZTE表单构建器 v0.0.1
          <span class="label">Beta</span>
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
    <div class="row-fluid" style="min-height: fill-available;">
      <div class="">
        <div class="sidebar-nav">
          <ul v-for="(item, index) in components" :key="item.id" class="nav nav-list accordion-group">
            <li class="nav-header">
              <i :class="item.icon"></i>{{item.label}}
              <div class="pull-right popover-info">
                <i class="icon-question-sign "></i>
                <div class="popover fade right">
                  <div class="arrow"></div>
                  <h3 class="popover-title">{{item.descriptionTitle}}</h3>
                  <div class="popover-content">{{item.description}}
                  </div>
                </div>
              </div>
            </li>
            <li class="boxes">
              <div v-for="(item_a, index_a) in item.list" :key="item_a.id" class="box box-element ui-draggable">
                <a href="#close" class="remove label label-important">
                  <i class="icon-remove icon-white"></i>删除</a>
                <span class="drag label" style="float: left; margin-left: 5px; position: relative">
                  <i :class="item_a.icon"></i> {{item_a.label}} <i class="icon-move"></i></span>
                <span class="configuration">
                  <!-- <button v-for="(item_a_a, index_a_a) in item_a.buttons" type="button" class="btn btn-mini" data-target="#editorModal" role="button" @click="onClickComponentButton(item_a_a)" @click="onClickComponentButton(item_a_a)">{{item_a_a.label}}</button> -->
                  <button v-for="(item_a_a, index_a_a) in item_a.buttons" :key="item_a_a.id" type="button" class="btn btn-mini" @click="onClickComponentButton(item_a_a, item_a)">{{item_a_a.label}}</button>
                  <span v-for="(item_a_b, index_a_b) in item_a.menus" :key="item_a_b.id" class="btn-group" style="width:auto;">
                    <div class="btn btn-mini dropdown-toggle" data-toggle="dropdown" >
                      {{item_a_b.label}}<span class="caret"></span>
                    </div>
                    <ul class="dropdown-menu">
                      <li v-for="(item_a_b_a, index_a_b_a) in item_a_b.elems" :key="item_a_b_a.id" class="active" @click="onClickComponentButton(item_a_b_a, item_a)">
                        <a>{{item_a_b_a}}</a>
                      </li>
                    </ul>
                  </span>
                </span>
                <div class="preview"></div>
                <div class="view" :ref="item_a.id">
                  <div class="vue-wrapper">
                    <div v-html="item_a.html"></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--/span-->
      <div class="demo ui-sortable lyrow" style="min-height: fill-available;">
        <div class="lyrow">
          <!--
          <a href="#close" class="remove label label-important">
            <i class="icon-remove icon-white"></i>删除
            </a>
          <span class="drag label">
            <i class="icon-move"></i>拖拽<  /span> -->
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
import "./form.designer.engine";
import components from "./components.menu.config";
export default {
  name: "form-designer",
  data() {
    return {
      components
    };
  },
  methods: {
    onClickComponentButton(item) {
      console.log(item);
    }
  },
  mounted() {
    const scope = this;
    this.components.forEach(e => {
      e.list.forEach(el => {
        const ref = scope.$refs[el.id];
      });
    });
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
  height: fill-available;
}
.sidebar-nav {
  text-align: left !important;
}
.operate-menu {
  display: block !important;
}
</style>
