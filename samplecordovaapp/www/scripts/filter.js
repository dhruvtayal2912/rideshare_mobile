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
        
        self.FetchFilteredData();
    });
}

filters.prototype.getAllFilters = function () {

    this.filterOptions.TravelFreq = $(".frequency:checked") ? $(".frequency:checked").val() : null;
    this.filterOptions.UserType = $(".userType:checked") ? $(".userType:checked").val() : null;
    this.filterOptions.Gender = $(".gender:checked") ? $(".gender:checked").val() : null;
    this.filterOptions.VehicleNo = $(".registration:checked") ? $(".registration:checked").val() : null;
    this.filterOptions.Radius = $('#radiusSlider').slider('getValue') ? $('#radiusSlider').slider('getValue').val() : null;
    this.filterOptions.HasParking = $("#parking").is(":checked") ? 1 : 0;
    if (this.filterOptions.Radius == "")
        this.filterOptions.Radius = 3;

    this.filterOptions.Email = localStorage["Email"];

}

filters.prototype.FetchFilteredData = function () {
    this.getAllFilters();
    // fetch the data from the API;
    appObj.getFilteredData(this.filterOptions);

}
