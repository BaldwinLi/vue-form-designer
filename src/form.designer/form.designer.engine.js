let layoutHistory;
let formHistory;

window.drawerHtml = $(".canvas").html();
window.formHtml = '';

const supportstorage = () => {
	if (typeof window.localStorage == 'object')
		return true;
	else
		return false;
}

const downloadLayout = () => {

	$.ajax({
		type: "POST",
		url: "/build/downloadLayout",
		data: {
			layout: $('#download-layout').html()
		},
		success: function (data) {
			window.location.href = '/build/download';
		}
	});
}

const handleAccordionIds = () => {
	var e = $(".canvas #myAccordion");
	var t = randomNumber();
	var n = "accordion-" + t;
	var r;
	e.attr("id", n);
	e.find(".accordion-group").each(function (e, t) {
		r = "accordion-element-" + randomNumber();
		$(t).find(".accordion-toggle").each(function (e, t) {
			$(t).attr("data-parent", "#" + n);
			$(t).attr("href", "#" + r)
		});
		$(t).find(".accordion-body").each(function (e, t) {
			$(t).attr("id", r)
		})
	})
}

const handleCarouselIds = () => {
	var e = $(".canvas #myCarousel");
	var t = randomNumber();
	var n = "carousel-" + t;
	e.attr("id", n);
	e.find(".carousel-indicators li").each(function (e, t) {
		$(t).attr("data-target", "#" + n)
	});
	e.find(".left").attr("href", "#" + n);
	e.find(".right").attr("href", "#" + n)
}

const handleModalIds = () => {
	var e = $(".canvas #myModalLink");
	var t = randomNumber();
	var n = "modal-container-" + t;
	var r = "modal-" + t;
	e.attr("id", r);
	e.attr("href", "#" + n);
	e.next().attr("id", n)
}

const handleTabsIds = () => {
	var e = $(".canvas #myTabs");
	var t = randomNumber();
	var n = "tabs-" + t;
	e.attr("id", n);
	e.find(".tab-pane").each(function (e, t) {
		var n = $(t).attr("id");
		var r = "panel-" + randomNumber();
		$(t).attr("id", r);
		$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
	})
}

const randomNumber = () => {
	return randomFromInterval(1, 1e6)
}

const randomFromInterval = (e, t) => {
	return Math.floor(Math.random() * (t - e + 1) + e)
}

const configurationElm = (e, t) => {
	$(".canvas").delegate(".configuration > a", "click", function (e) {
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
	$(".canvas").delegate(".configuration .dropdown-menu a", "click", function (e) {
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = "";
		t.find("a").each(function () {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}

const changeStructure = (e, t) => {
	$("#download-layout ." + e).removeClass(e).addClass(t)
}

const cleanHtml = (e) => {
	$(e).parent().append($(e).children().html())
}

// const initWrapperDrag = (wrapper) => {
// 	wrapper.each(function(){
// 		var outerhtml = $(
// 		'<div class="box box-element ui-draggable"style=" position: relative; opacity: 1;">'+
// 			'<a href="#close"class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a>'+
// 			'<span class="drag label"><i class="icon-move"></i>拖动</span>'+
// 			'<span class="configuration"><button type="button"class="btn btn-mini"data-target="#propertyModal"role="button"data-toggle="modal">属性</button></span>'+
// 			'<div class="view"></div>'+
// 		'</div>');
// 		outerhtml.insertAfter(this);
// 		$(this).appendTo(outerhtml.find('.view'));
// 	});
// }

export default {
	onClickComponentButton(itemId, component, event) {
		currenteditor = $(event.currentTarget)
			.parent()
			.parent()
			.find(".view");
	},
	edit(event) {
		// $("body").removeClass("devpreview sourcepreview");
		// $("body").addClass("edit");
		const scope = this;
		if (window.drawerHtml) {
			$(".canvas").empty().html(window.drawerHtml);
		} else {
			$(".canvas").empty().html(`
			<div class="lyrow">
				<div class="preview"></div>
				<div class="view">
					<div class="span12 canvas-title column ui-sortable" style="height: -webkit-fill-available">
					</div>
				</div>
			  </div>
			`);
		}
		this.initContainer();
		$("body").css("min-height", $(window).height() - 90);
		$(".canvas").css("min-height", $(window).height() - 160);
		$(".sidebar-nav .lyrow").draggable({
			connectToSortable: ".canvas",
			helper: "clone",
			handle: ".drag",
			start: function (e, t) {
				if (!scope.startdrag) scope.stopsave++;
				scope.startdrag = 1;
			},
			drag: function (e, t) {
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
			stop: function (e, t) {
				$(".canvas .column").sortable({
					opacity: 0.35,
					connectWith: ".column",
					start: function (e, t) {
						if (!scope.startdrag) scope.stopsave++;
						scope.startdrag = 1;
					},
					stop: function (e, t) {
						scope.setVueDom(t.item, true);
						// scope.loadVue(wrapper, true);
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
			start: function (e, t) {
				if (!scope.startdrag) scope.stopsave++;
				scope.startdrag = 1;
			},
			drag: function (e, t) {
				t.helper.width("100%");
			},
			stop: function () {
				scope.handleJsIds();
				if (scope.stopsave > 0) scope.stopsave--;
				scope.startdrag = 0;
			}
		});

		this.removeElm();
		this.initAddColButtonEvent();
		this.gridSystemGenerator();
		return false;
	},
	devPreview() {
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		this.removeMenuClasses();
		$(event.currentTarget).addClass("active");
		return false;
	},
	sourcePreview(event) {
		// $("body").removeClass("edit");
		// $("body").addClass("devpreview sourcepreview");
		// this.removeMenuClasses();
		// $(event.currentTarget).addClass("active");
		$(".canvas").empty().css({ 'padding-top': '2rem' }).html(window.formHtml);
		new Vue({
			el: $(".canvas")[0]
		});
		return false;
	},
	saveHTML() {
		const scope = this;
		this.params.html = window.formHtml;
		this.params.version = 'v0.0.1';
		this.$http.post(`${this.appContextPath}templates`, this.params).then(
			success => {
				scope.params = success.data.bo;
				scope.handleSaveLayout();
				scope.$message.success('保存成功');
			},
			error => {
				scope.$message.error('保存失败');
			}
		);

	},
	clearHTML() {
		this.clearCanvas();
	},
	showComponents(event) {
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(event.currentTarget).next().slideDown();
		// this.showName = name;
	},
	undo() {
		this.stopsave++;
		if (this.undoLayout()) this.initContainer();
		this.stopsave--;
	},
	redo() {
		this.stopsave++;
		if (this.redoLayout()) this.initContainer();
		this.stopsave--;
	},
	handleSaveLayout() {
		const scope = this;
		const canvas = window.drawerHtml;
		const form = scope.formDom[0].outerHTML;
		if (!scope.stopsave) {
			scope.stopsave++;
			window.drawerHtml = canvas;
			window.formHtml = form;
			scope.saveLayout();
			scope.stopsave--;
		}
	},
	downloadHtmlLayout() {
		$.ajax({
			type: "POST",
			url: "/build/downloadLayout",
			data: {
				layout: $('#download-layout').html()
			},
			success: function (data) {
				window.location.href = '/build/downloadHtml';
			}
		});
	},
	clearCanvas() {
		if ($(".canvas .view .canvas-title").length > 0) $(".canvas .view .canvas-title").empty();
		else $(".canvas").empty();
		layoutHistory = null;
		formHistory = null;
		window.drawerHtml = '';
		window.formHtml = '';
		this.formDom.empty();
		if (supportstorage()) {
			localStorage.removeItem("layoutdata");
			localStorage.removeItem("formdata");
		}
	},
	undoLayout() {
		if ($(".canvas .view .canvas-title").length === 0) return;
		let layout = layoutHistory;
		let form = formHistory;
		//console.log(data);
		if (layout && form) {
			if (layout.count < 2 || form.count < 2) {
				$(".canvas .view .canvas-title").empty();
				return false;
			}
			window.drawerHtml = layout.list[layout.count - 2];
			window.formHtml = form.list[form.count - 2];
			this.formDom = $(`
			<el-main style="line-height: 50px; overflow-y: scroll;"></el-main>
			`).append(window.formHtml);
			layout.count--;
			form.count--;
			$('.canvas').html(window.drawerHtml);
			if (supportstorage()) {
				localStorage.setItem("layoutdata", JSON.stringify(layout));
				localStorage.setItem("formdata", JSON.stringify(form));
			}
			return true;
		}
		return false;
	},
	redoLayout() {
		if ($(".canvas .view .canvas-title").length === 0) return;
		let layout = layoutHistory;
		let form = formHistory;
		if (layout && form) {
			if (layout.list[layout.count] && form.list[form.count]) {
				window.drawerHtml = layout.list[layout.count];
				window.formHtml = form.list[form.count];
				this.formDom = $(`
				<el-main style="line-height: 50px; overflow-y: scroll;"></el-main>
				`).append(window.formHtml);
				layout.count++;
				form.count++;
				$('.canvas').html(window.drawerHtml);
				if (supportstorage()) {
					localStorage.setItem("layoutdata", JSON.stringify(layout));
					localStorage.setItem("formdata", JSON.stringify(form));
				}
				return true;
			}
		}
		return false;
	},
	handleJsIds() {
		handleModalIds();
		handleAccordionIds();
		handleCarouselIds();
		handleTabsIds()
	},
	gridSystemGenerator() {
		$(".lyrow .preview input").bind("keyup", function () {
			var e = 0;
			var t = "";
			var n = $(this).val().split(" ", 12);
			$.each(n, function (n, r) {
				e = e + parseInt(r);
				t += '<div class="span' + r + ' column"></div>'
			});
			if (e == 12) {
				$(this).parent().next().children().html(t);
				$(this).parent().prev().show()
			} else {
				$(this).parent().prev().hide()
			}
		})
	},
	removeElm() {
		const scope = this;
		$(".canvas").delegate(".remove", "click", function (e) {
			$(this).parent().remove();
			const elemId = $(this).parent().children('.view').children('.vue-wrapper').children().children().attr('id');
			scope.formDom.find('#' + elemId).remove();
			window.formHtml = scope.formDom[0].outerHTML;
			if (!$(".canvas .lyrow").length > 0) {
				scope.clearCanvas();
			}
			scope.saveLayout();
		});
	},
	initAddColButtonEvent() {
		const scope = this;
		$(".canvas").delegate(".add-col-button", "click", function (e) {
			scope.addCol(e);
		});
	},
	removeMenuClasses() {
		$("#menu-layoutit li button").removeClass("active");
	},
	restoreData() {
		if (supportstorage()) {
			layoutHistory = JSON.parse(localStorage.getItem("layoutdata"));
			formHistory = JSON.parse(localStorage.getItem("formdata"));
			if (!layoutHistory || !formHistory) return false;
			window.drawerHtml = layoutHistory.list[layoutHistory.count - 1];
			window.formHtml = formHistory.list[formHistory.count - 1];
			if (window.drawerHtml && window.formHtml) {
				$(".canvas").html(window.drawerHtml);
				this.formDom = $(`
				<el-main style="line-height: 50px; overflow-y: scroll;"></el-main>
				`).append(window.formHtml);
			};
		}
	},
	initContainer() {
		const scope = this;
		$(".canvas,.canvas .column").sortable({
			connectWith: ".column",
			opacity: .35,
			handle: ".drag",
			start: function (e, t) {
				if (!scope.startdrag) scope.stopsave++;
				scope.startdrag = 1;
			},
			stop: function (e, t) {
				// if(!_.startsWith(elementId, 'el-row') && !_.startsWith(elementId, 'el-col')){}
				if (t.item.parent().not('.column').length > 0) {
					t.item.remove();
					return;
				}
				var wrapper = $(".vue-wrapper", t.item).not(".loaded");
				scope.setVueDom(t.item, wrapper.length === 0);
				scope.loadVue(wrapper);
				if (scope.stopsave > 0) scope.stopsave--;
				scope.startdrag = 0;
			}
		});
		configurationElm();
	},
	setVueDom(item, isReset) {
		const element = isReset ? $(".vue-wrapper", item).children().children() : $(".vue-wrapper", item).children().children().clone();
		if (!isReset) {
			const elementName = (element[0] && element[0].localName) || '';
			if (elementName === 'el-col') {
				$(element).attr(':span', '12');
			}
			const elementId = element.attr('id') || `${elementName}-${Date.now() + _.uniqueId()}`;
			element.attr('id', elementId);
			$(".vue-wrapper", item).children().children().attr('id', elementId);
			element.removeClass();
		}
		const containerId = item.parent().attr('id');

		const _element = isReset ? this.formDom.find('#' + element.attr('id')) : element;
		if (!!containerId) {
			if (item.next().length > 0) {
				const nextId = $(".vue-wrapper", item.next()).children().children().attr('id');
				this.formDom.find(`#${nextId}`).before(_element);
			} else {
				this.formDom.find(`#${containerId}`).append(_element);
			}
		} else {
			this.formDom.append(_element);
		}
		window.drawerHtml = $(".canvas").html();
		window.formHtml = this.formDom[0].outerHTML;
	},
	loadVue(wrapper) {
		const scope = this;
		try {
			$.each(wrapper, function (i, wrapperdom) {
				const elementId = $(wrapperdom).children().children().attr('id');
				const wrapperModel = new Vue({
					el: wrapperdom
				});
				$(wrapperModel.$el).children().children().attr('id', elementId);
				$(wrapperModel.$el).addClass('loaded');
				// if(['el-row', 'el-col'].some(e => {
				// 	return wrapperModel.$el.children[0].children[0].className.indexOf(e)>-1;
				// })){
				// 	var outerhtml = $(`
				// 	<div class="row-fluid clearfix"></div>
				// 	`);
				// 	outerhtml.insertAfter(wrapperModel.$el);
				// 	$(wrapperModel.$el).appendTo(outerhtml);
				// }
				$(wrapperModel.$el).find('.el-col').attr('style', 'float: none;')
				setTimeout(() => {
					window.drawerHtml = $(".canvas").html();
					window.formHtml = scope.formDom[0].outerHTML;
					scope.saveLayout();
				});
			});
		} catch (e) {
			console.warn("组件初始化失败");
			throw e;
		}
	},
	addProperty() {
		$('#addProperty').append(`<div class="col-sm-4"><label>key:</label></div>
				  <div class="col-sm-8"><input type="text" name="propName"/></div>
				  <div class="col-sm-4"><label>value:</label></div>
				  <div class="col-sm-8"><textarea name="propVal"></textarea></div>`);
	},
	addRow() {
		const scope = this;
		// 	<span class="drag label" style="margin-left: 5px; position: relative">
		// 	<i class="el-icon-info"></i> 布局行 <i class="icon-move"></i>
		// </span>
		const rowDom = $(`
		<div class="lyrow ui-draggable">
		<a class="remove label label-important" style="padding: 0;float: right;">
			<i class="icon-remove icon-white"></i>
		</a>
		<span class="configuration" style="margin-left: 1rem;">
			<button class="el-button el-button--mini el-button--success is-plain is-round add-col-button" type="button"><i class="el-icon-plus"></i>增加列</button>
		</span>
	  	<span class="configuration" style="margin-left: 1rem;">
	  		<a type="button" class="btn btn-mini" style="padding: 0;">
		  		<i class="el-icon-setting"></i>
	  		</a>
	  	</span>
		<div class="preview"></div>
		<div class="view" :ref="item_a.id">
		  <div class="vue-wrapper">
			  <div>
			  	<el-row :gutter="10" id="el-row-${Date.now() + _.uniqueId()}" class="row-container ui-sortable lyrow"></el-row>
			  </div>
		  </div>
		</div>
	  </div>
		`);
		$(".canvas .view .canvas-title").append(rowDom);
		const wrapper = $(".vue-wrapper", rowDom).not(".loaded");
		this.setVueDom(rowDom);
		this.loadVue(wrapper);
		if (scope.stopsave > 0) scope.stopsave--;
		scope.startdrag = 0;
	},
	addCol(event) {
		const scope = this;
		const colDom = $(`
		<div class="lyrow ui-draggable" style="width: 48%; margin: 1%; display: inline-block; height: auto">
			<a class="remove label label-important" style="padding: 0;float: right;">
				<i class="icon-remove icon-white"></i>
			</a>
			  <span class="configuration" style="margin-left: 1rem;">
				  <a type="button" class="btn btn-mini" style="padding: 0;">
					  <i class="el-icon-setting"></i>
				  </a>
			  </span>
			<div class="preview"></div>
			<div class="view" :ref="item_a.id">
			  <div class="vue-wrapper">
				  <div>
				  <el-col class="column ui-sortable lyrow" id="el-col-${Date.now() + _.uniqueId()}"></el-col>
				  </div>
			  </div>
			</div>
		  </div>
			`);
		const selectRowId = $(event.currentTarget).parent().parent().find('.el-row').attr('id');
		$('#' + selectRowId).append(colDom);
		const wrapper = $(".vue-wrapper", colDom).not(".loaded");
		this.setVueDom(colDom);
		this.loadVue(wrapper);
		$(".canvas .column").sortable({
			opacity: 0.35,
			connectWith: ".column",
			start: function (e, t) {
				if (!scope.startdrag) scope.stopsave++;
				scope.startdrag = 1;
			},
			stop: function (e, t) {
				scope.setVueDom(t.item, true);
				scope.saveLayout();
				if (scope.stopsave > 0) scope.stopsave--;
				scope.startdrag = 0;
			}
		});
		if (scope.stopsave > 0) scope.stopsave--;
		scope.startdrag = 0;
	},
	saveLayout() {
		var layout = layoutHistory;
		var form = formHistory;
		if (!layout || !form) {
			layout = {};
			layout.count = 0;
			layout.list = [];
			form = {};
			form.count = 0;
			form.list = [];
		}
		if (layout.list.length > layout.count || form.list.length > form.count) {
			for (let i = layout.count; i < layout.list.length; i++)
				layout.list[i] = null;
			for (let i = form.count; i < form.list.length; i++)
				form.list[i] = null;
		}
		layout.list[layout.count] = window.drawerHtml;
		layout.count++;
		form.list[form.count] = window.formHtml;
		form.count++;
		if (supportstorage()) {
			localStorage.setItem("layoutdata", JSON.stringify(layout));
			localStorage.setItem("formdata", JSON.stringify(form));
		}
		layoutHistory = layout;
		formHistory = form;
	},
	inputprop(id, key, value) {
		if ('name' == key) {
			this.formDom.find('#' + id).attr('v-model', 'form.' + value);
		} else {
			this.formDom.find('#' + id).attr(key, value);
		}
	},
	PublishForm() {
		if (this.params.id !== -1) {
			window.open('http://localhost:8080/#/showView?templateId=' + this.params.id);
		} else {
			this.$alert('你还未保存该表单。', '提示', {
				confirmButtonText: '确定',
				callback: action => {
					this.$message({
						type: 'warning',
						message: '已取消发布。'
					});
				}
			});
		}

	}
}