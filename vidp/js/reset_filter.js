function reset_filter() {
    var check_fields = document.getElementsByClassName('form-check-input');
    for (var i = 0; i < check_fields.length; i++) {
        check_fields[i].checked = false;
    }
    var control_fields = document.getElementsByTagName('select')
    for (var i = 0; i < control_fields.length; i++) {
        control_fields[i].value = "";
    }
    toggleAllCheckboxesToIndeterminate();
}