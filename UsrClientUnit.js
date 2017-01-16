//
//JS Client Module 
//
define("UsrClientUnit", ['ext-base', 'terrasoft', 'ServiceHelper'], function(Ext, Terasoft, ServiceHelper) {
	var getView = function() {
		var config = {
			id: "VisualModuleView",
			selectors: {
				wrapEl: "#VisualModuleView"
			},
			items: [
				{
					className: "Terrasoft.TextEdit",
					value: {
						bindTo: "inputDate"
					}
				},
				{
					className: "Terrasoft.TextEdit",
					value: {
						bindTo: "comboBox"
					}
				},
				{
					className: "Terrasoft.MemoEdit",
					value: {
						bindTo: "result"
					}
				},
				{
					className: "Terrasoft.Button",
					caption: "БАХНУТЬ",
					click: {
						bindTo: "onServiceButtonClick"
					}
				}
			]
		};
		return Ext.create("Terrasoft.Container", config);
	};
	var getViewModel = function() {
		var config = {
			values: {
				result: "",
				inputDate: "",
				comboBox: ""
			},
			methods: {
				onServiceButtonClick: function() {
					this.set("result", "");
					var date = Date.parse(this.get("inputDate"));
					if (isNaN(date))
					{
						this.showInformationDialog("Неверный формат даты");
						return;
					}
					date = date / 3600000;
					var val = this.get("comboBox");
					var serviceData = {
						inputDate: date.toString(),
						comboBox: val.toString()
					};
					
					
				ServiceHelper.callService("CustomConfigurationService", "GetCurs", 
					function(response) {
						var result = JSON.parse(response.GetCursResult);
						//var message = ("Курс = " + result);
						this.set("result", result);
					}, serviceData, this);
				}
			}
		};
		return Ext.create("Terrasoft.BaseViewModel", config);
	};
	return {
		render: function(renderTo) {
			var view = getView();
			var viewModel = getViewModel();
			view.bind(viewModel);
			view.render(renderTo);
		}
	};
});
