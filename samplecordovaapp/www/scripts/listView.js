﻿var List = function (options) {
    if (options) {
        this.data = options.Result;
        console.log(this.data);
    }
}

List.prototype.init = function () {

}

List.prototype.render = function () {
    $("#listViewDv").html("");
    $("#listViewDv").show();
    $("#dvMap").hide();
    $("#userTemplate").tmpl(this.data).appendTo("#listViewDv");

}
