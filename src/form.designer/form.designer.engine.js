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

const saveLayout = () => {
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
		for (i = layout.count; i < layout.list.length; i++)
			layout.list[i] = null;
		for (i = form.count; i < form.list.length; i++)
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
	//console.log(data);
	/*$.ajax({  
		type: "POST",  
		url: "/build/saveLayout",  
		data: { layout: $('.canvas').html() },  
		success: function(data) {
			//updateButtonsVisibility();
		}
	});*/
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
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
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
		$("body").removeClass("edit");
		$("body").addClass("devpreview sourcepreview");
		this.removeMenuClasses();
		$(event.currentTarget).addClass("active");
		return false;
	},
	saveContent() {
		alert("saveContent");
	},
	download() {
		alert("download");
	},
	saveHTML() {
		const scope = this;
		this.$http.post(`${this.appContextPath}templates`, {
			"createdBy": "test user",
			"creationDate": (new Date()).toISOString(),
			"cssfiles": "",
			"formTemplateGroupId": 0,
			"html": this.formDom.html(),
			"id": 0,
			"jsfiles": "",
			"lastUpdateDate": (new Date()).toISOString(),
			"lastUpdatedBy": "test user",
			"remark": "test",
			"status": 0,
			"version": "v0.0.1"
		}).then(
			success => {
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
		const e = $(".canvas").html();
		const el = scope.formDom.html()
		if (!scope.stopsave && (e != window.drawerHtml || el != window.formHtml)) {
			scope.stopsave++;
			window.drawerHtml = e;
			window.formHtml = e;
			saveLayout();
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
		$(".canvas .view .canvas-title").empty();
		layoutHistory = null;
		formHistory = null;
		if (supportstorage())
			localStorage.removeItem("layoutdata");
		localStorage.removeItem("formdata");
	},
	undoLayout() {
		let layout = layoutHistory;
		let form = formHistory;
		//console.log(data);
		if (layout && form) {
			if (layout.count < 2 || form.count < 2) return false;
			window.drawerHtml = layout.list[layout.count - 2];
			window.formHtml = form.list[form.count - 2];
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
		let layout = layoutHistory;
		let form = formHistory;
		if (layout && form) {
			if (layout.list[layout.count] && form.list[form.count]) {
				window.drawerHtml = layout.list[layout.count];
				window.formHtml = form.list[form.count];
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
			if (!$(".canvas .lyrow").length > 0) {
				scope.clearCanvas()
			}
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
				this.formDom = $(window.formHtml);
			};
		}
	},
	initContainer() {
		const scope = this;
		$(".canvas, .canvas .column").sortable({
			connectWith: ".column",
			opacity: .35,
			handle: ".drag",
			start: function (e, t) {
				if (!scope.startdrag) scope.stopsave++;
				scope.startdrag = 1;
			},
			stop: function (e, t) {
				// if(!_.startsWith(elementId, 'el-row') && !_.startsWith(elementId, 'el-col')){}
				var wrapper = $(".vue-wrapper", t.item).not(".loaded");
				scope.setVueDom(t.item);
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
			const elementName = element[0].localName;
			const elementId = element.attr('id') || `${elementName}-${Date.now() + _.uniqueId()}`;
			element.attr('id', elementId);
			$(".vue-wrapper", item).children().children().attr('id', elementId);
		}
		const containerId = item.parent().attr('id');
		if (!!containerId) {
			this.formDom.find(`#${containerId}`).append(element.clone());
		} else {
			this.formDom.append(element.clone());
		}
		window.formHtml = this.formDom.html();
	},
	loadVue(wrapper) {
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
			});
		} catch (e) {
			console.warn("组件初始化失败");
			throw e;
		}
	}
}