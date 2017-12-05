export default [{
    name: 'basic',
    label: '基础组件',
    icon: 'icon-plus icon-white',
    descriptionTitle: '说明',
    description: '提供页面基础组件，包括：布局行、布局列、布局容器、按钮',
    list: [
    //     {
    //     id: 'el-row',
    //     label: '布局行',
    //     icon: 'el-icon-info',
    //     html: `<el-row :gutter="10" class="column ui-sortable lyrow"></el-row>`,
    //     buttons: [{
    //         id: 'setting',
    //         label: '设置'
    //     }]
    // }, 
    // {
    //     id: 'el-col',
    //     label: '布局列',
    //     icon: 'el-icon-info',
    //     html: `<el-col class="column ui-sortable lyrow"></el-col>`,
    //     buttons: [{
    //         id: 'setting',
    //         label: '设置'
    //     }]
    //     // menus: [{
    //     //     id: 'offset',
    //     //     label: '列间隔'
    //     // }]
    // },
    //  {
    //     id: 'el-container',
    //     label: '布局容器',
    //     icon: 'el-icon-info',
    //     html: `
    //     <el-container>
    //     <el-header>Header</el-header>
    //     <el-container>
    //       <el-aside width="200px">Aside</el-aside>
    //       <el-main>Main</el-main>
    //     </el-container>
    //   </el-container>
    //   `,
    //     buttons: [{
    //         id: 'setting',
    //         label: '设置'
    //     }]
    //     // menus: [{
    //     //     id: 'offset',
    //     //     label: '列间隔'
    //     // }]
    // }, 
    {
        id: 'el-button',
        label: '按钮',
        icon: 'el-icon-info',
        html: `<el-button>按钮</el-button>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }]
}, {
    name: 'form',
    label: '表单组件',
    icon: 'icon-plus icon-white',
    descriptionTitle: '说明',
    description: '提供表单组件，包括：表单、单选框、多选框、输入框、选择器、计数器、级联选择器、开关、滑块、时间选择器、日期选择器、日期时间选择器、上传、评分、颜色选择器、穿梭框',
    list: [
    //     {
    //     id: 'el-form',
    //     label: '表单',
    //     icon: 'el-icon-info',
    //     html: `
    //     <el-form></<el-form>
    //                    `,
    //     buttons: [{
    //         id: 'setting',
    //         label: '设置'
    //     }]
    // },
     {
        id: 'el-input',
        label: '输入框',
        icon: 'el-icon-info',
        html: `<el-input placeholder="请输入内容"></el-input>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-radio',
        label: '单选框',
        icon: 'el-icon-info',
        html: `<el-radio label="1">备选项</el-radio>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-checkbox',
        label: '多选框',
        icon: 'el-icon-info',
        html: `<el-checkbox>备选项</el-checkbox>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-input-number',
        label: '计数器',
        icon: 'el-icon-info',
        html: `
        <el-input-number>
        </el-input-number>
        `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-select',
        label: '选择器',
        icon: 'el-icon-info',
        html: `<el-select v-model="value" placeholder="请选择">
                        <el-option>
                        </el-option>
                       </el-select>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-cascader',
        label: '级联选择器',
        icon: 'el-icon-info',
        html: `
              <el-cascader>
              </el-cascader>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-switch',
        label: '开关',
        icon: 'el-icon-info',
        html: `
                <el-switch>
                </el-switch>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-slider',
        label: '滑块',
        icon: 'el-icon-info',
        html: `
                <el-slider>
                </el-slider>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-time-select',
        label: '时间选择器',
        icon: 'el-icon-info',
        html: `
        <el-time-select 
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="选择时间">
      </el-time-select>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-date-picker',
        label: '日期选择器',
        icon: 'el-icon-info',
        html: `
        <el-date-picker
        type="date"
        placeholder="选择日期">
      </el-date-picker>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-upload',
        label: '文件上传',
        icon: 'el-icon-info',
        html: `
        <el-upload
        multiple
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-rate',
        label: '评分',
        icon: 'el-icon-info',
        html: `
        <el-rate v-model="value1"></el-rate>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-color-picker',
        label: '颜色选择器',
        icon: 'el-icon-info',
        html: `
        <el-color-picker></el-color-picker>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-transfer',
        label: '数据穿梭框',
        icon: 'el-icon-info',
        html: `
        <el-transfer></el-transfer>
                       `,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }]
}, {
    name: 'data',
    label: '数据组件',
    icon: 'icon-plus icon-white',
    descriptionTitle: '说明',
    description: '提供数据显示组件，包括：表格、标签、进度条、树形控件、分页器、标记',
    list: [{
        id: 'el-table',
        label: '表格',
        icon: 'el-icon-info',
        html: `<el-table
        :data="[{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-tag',
        label: '标签',
        icon: 'el-icon-info',
        html: `<el-tag>标签</el-tag>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-progress',
        label: '进度条',
        icon: 'el-icon-info',
        html: `<el-progress :percentage="0"></el-progress>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-tree',
        label: '树形控件',
        icon: 'el-icon-info',
        html: `<el-tree :data="[{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }]"></el-tree>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-pagination',
        label: '分页器',
        icon: 'el-icon-info',
        html: `<el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }, {
        id: 'el-badge',
        label: '标记',
        icon: 'el-icon-info',
        html: `<el-badge :value="12" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>`,
        buttons: [{
            id: 'setting',
            label: '设置'
        }]
    }]
}];