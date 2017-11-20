<template>
<div style="min-height: 660px; cursor: auto;" class="edit">
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
                <button type="button" @click="edit" :class="'btn btn-primary'">
                  <i class="icon-edit icon-white"></i>编辑</button>
                <button type="button" class="btn btn-primary" @edit="devPreview">
                  <i class="icon-eye-close icon-white"></i>布局编辑</button>
                <button type="button" class="btn btn-primary" @click="sourcePreview">
                  <i class="icon-eye-open icon-white"></i>预览</button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-primary" @click="download">
                  <i class="icon-chevron-down icon-white"></i>下载</button>
                <button class="btn btn-primary" @click="saveHTML">
                  <i class="icon-share icon-white"></i>保存</button>
                <button class="btn btn-primary" @click="clearHTML">
                  <i class="icon-trash icon-white"></i>清空</button>
              </div>
              <div class="btn-group">
                <button class="btn btn-primary" @click="undo">
                  <i class="icon-arrow-left icon-white"></i>撤销</button>
                <button class="btn btn-primary" @click="redo">
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
            <li class="nav-header" @click="showComponents">
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
              <div v-for="(item_a, index_a) in item.list" :key="item_a.id" class="lyrow ui-draggable">
                <a class="remove label label-important" style="padding: 0;float: right;">
                  <i class="icon-remove icon-white"></i></a>
                <span class="drag label" style="float: left; margin-left: 5px; position: relative">
                  <i :class="item_a.icon"></i> {{item_a.label}} <i class="icon-move"></i></span>
                <span class="configuration" style="float: left; margin-left: 1rem;">
                  <!-- <button v-for="(item_a_a, index_a_a) in item_a.buttons" type="button" class="btn btn-mini" data-target="#editorModal" role="button" @click="onClickComponentButton(item_a_a)" @click="onClickComponentButton(item_a_a)">{{item_a_a.label}}</button> -->
                  <a v-for="(item_a_a, index_a_a) in item_a.buttons" :key="item_a_a.id" type="button" class="btn btn-mini" style="padding: 0;" @click="onClickComponentButton(item_a_a, item_a, $event)">
                    <i v-if="item_a_a.id==='setting'" class="el-icon-setting"></i>
                    <i v-if="item_a_a.id!=='setting'">{{item_a_a.label}}</i></a>
                <!-- </span> -->
                  <span v-for="(item_a_b, index_a_b) in item_a.menus" :key="item_a_b.id" class="btn-group" style="width:auto;">
                    <div class="btn btn-mini dropdown-toggle" data-toggle="dropdown" >
                      {{item_a_b.label}}<span class="caret"></span>
                    </div>
                    <ul class="dropdown-menu">
                      <li v-for="(item_a_b_a, index_a_b_a) in item_a_b.elems" :key="item_a_b_a.id" class="active" @click="onClickComponentButton(item_a_b_a, item_a, $event)">
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
      <div class="canvas ui-sortable" style="min-height: -webkit-fill-available;">
        <div class="lyrow">
          <!-- <a href="#close" class="remove label label-important">
            <i class="icon-remove icon-white"></i>删除
            </a>
          <span class="drag label">
            <i class="icon-move"></i>拖拽</span> -->
          <div class="preview"></div>
          <div class="view">
            <!-- <div class="row-fluid clearfix"> -->
              <div class="span12 canvas-title column ui-sortable" style="height: -webkit-fill-available">
              </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- end canvas -->
      <!--/span-->
      <div id="download-layout">
        <div class="container-fluid"></div>
      </div>
    </div>
    <!--/row-->
  </div>
  <!--/.fluid-container-->
</div>
</template>

<script>
import { mapGetters } from "vuex";
import engine from "./form.designer.engine";
import components from "./components.menu.config";

let currenteditor;

export default {
  name: "form-designer",
  data() {
    return {
      // showName: "basic",
      stopsave: 0,
      startdrag: 0,
      components,
      formDom: $(`
				<el-container></el-container>
				`)
    };
  },
  computed: {
    ...mapGetters(["appContextPath"])
  },
  methods: {
    ...engine
  },
  created() {
    $(window).resize(function() {
      $("body").css("min-height", $(window).height() - 90);
      $(".canvas").css("min-height", $(window).height() - 160);
    });
  },
  mounted() {
    const scope = this;
    /**
 * 禁用ckeditor
 * CKEDITOR.disableAutoInline = true;
 *  var contenthandle = CKEDITOR.replace( 'contenteditor' ,{
 * language: 'zh-cn',
 * contentsCss: ['css/bootstrap-combined.min.css'],
 * allowedContent: true
 * });
 * var eText = currenteditor.html();
 * contenthandle.setData(eText);
 * currenteditor.html(contenthandle.getData());
 */
    this.components.forEach(e => {
      e.list &&
        e.list.forEach(el => {
          const ref = scope.$refs[el.id];
        });
    });
    this.restoreData();
    this.initContainer();
    $("body").css("min-height", $(window).height() - 90);
    $(".canvas").css("min-height", $(window).height() - 160);
    $(".sidebar-nav .lyrow").draggable({
      connectToSortable: ".canvas",
      helper: "clone",
      handle: ".drag",
      start: function(e, t) {
        if (!scope.startdrag) scope.stopsave++;
        scope.startdrag = 1;
      },
      drag: function(e, t) {
        if (
          t.helper
            .children(".view")
            .children(".vue-wrapper")
            .children("div")
            .children("el-col").length > 0
        ) {
          t.helper.width("23%");
          t.helper.css({
            margin: "1%"
          });
        } else {
          t.helper.width("100%");
        }
        t.helper.css({
          display: "inline-block",
          height: "auto"
        });
        // t.ihelper.float('left');
        // }
      },
      stop: function(e, t) {
        $(".canvas .column").sortable({
          opacity: 0.35,
          connectWith: ".column",
          start: function(e, t) {
            if (!scope.startdrag) scope.stopsave++;
            scope.startdrag = 1;
          },
          stop: function(e, t) {
            scope.setVueDom(t.item);
            scope.loadVue(wrapper, true);
            if (scope.stopsave > 0) scope.stopsave--;
            scope.startdrag = 0;
          }
        });
        if (scope.stopsave > 0) scope.stopsave--;
        scope.startdrag = 0;
      }
    });

    $(".sidebar-nav .box").draggable({
      connectToSortable: ".column",
      helper: "clone",
      handle: ".drag",
      start: function(e, t) {
        if (!scope.startdrag) scope.stopsave++;
        scope.startdrag = 1;
      },
      drag: function(e, t) {
        t.helper.width("100%");
      },
      stop: function() {
        scope.handleJsIds();
        if (scope.stopsave > 0) scope.stopsave--;
        scope.startdrag = 0;
      }
    });

    this.removeElm();
    this.gridSystemGenerator();

    document.onkeydown = function(e) {
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        if(ctrlKey && keyCode == 83) {
            scope.saveHTML();
        }
        e.preventDefault();
        return false;
    }
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
