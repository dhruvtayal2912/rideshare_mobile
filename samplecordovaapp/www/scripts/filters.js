var filters = function (options) {

    this.filterOptions = {};
    this.init();
    this.initEvents();

}
filters.prototype.init = function () {
    this.$btnSearch = $("#btnSearch");
}

filters.prototype.initEvents = function () {
    var self = this;
    this.$btnSearch.on("click", function () {
    	debugger;
        self.FetchFilteredData();
    });
}

filters.prototype.getAllFilters = function () {
	
	this.filterOptions.TravelFreq = $(".frequency:checked") ? $(".frequency:checked").val() : null;
	this.filterOptions.UserType = $(".userType:checked") ? $(".userType:checked").val() : null;
	this.filterOptions.VehicleNo = $(".registration:checked") ? $(".registration:checked").val() : null;
	this.filterOptions.Radius = $('.sl').slider('getValue') ? $('.sl').slider('getValue').val() : null;

}

filters.prototype.FetchFilteredData = function () {
	this.getAllFilters();
	debugger;
	// fetch the data from the API;
	appObj.getFilteredData(this.filterOptions);
	// create map object from the api result pass it to Map
//	var mapOptions = {}; 
//	var map = new Map();
	//Map.RenderMap();
}

var obj = new filters();