function error(msg) {
    $('#errorModal').modal({
        show: true
    })
}
function success(msg) {
    var elm = $("#toster");
    if (msg != '') {
        elm.text(msg);
    }
    elm.className = "show";
    setTimeout(function () {
        elm.className = elm.className.replace("show", "");
    }, 3000);
}
function loader(action) {
    if (action == 'start') {
        $(".loading").addClass("d-block");
    } else {
        $(".loading").removeClass("d-block");
    }
}
