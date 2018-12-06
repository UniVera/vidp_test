function toggleAllCheckboxesToIndeterminate() {
    var checkboxes = document.getElementsByClassName("form-check-input");
    var lecturer_checked = false;
    var lang_checked = false;
    for (i = 0; i < checkboxes.length; i++) {
        if (String(checkboxes[i].id).indexOf('lecturer') !== -1){
            if (checkboxes[i].checked !== false) {
                lecturer_checked = true;
            }
        }
        else if (String(checkboxes[i].id).indexOf('lang') !== -1){
            if (checkboxes[i].checked !== false) {
                lang_checked = true;
            }
        }
    }
    if (!(lecturer_checked || lang_checked)){
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].readOnly = checkboxes[i].indeterminate = true;
        }
    } else {
        for (i = 0; i < checkboxes.length; i++) {
            if (String(checkboxes[i].id).indexOf('lecturer') !== -1 && !lecturer_checked){
                checkboxes[i].readOnly = checkboxes[i].indeterminate = true;
            }
            if (String(checkboxes[i].id).indexOf('lang') !== -1 && !lang_checked){
                checkboxes[i].readOnly = checkboxes[i].indeterminate = true;
            }
        }
    }
}

function toggle(checkbox) {
    if (checkbox.readOnly) {
        checkbox.checked = true;
        checkbox.readOnly = false;
    }
    else if (checkbox.checked){
        checkbox.readOnly = true;
        checkbox.indeterminate = true;
        checkbox.checked = false;
    }
}
