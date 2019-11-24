function disableDropdown(dropdown) {
    var dropdowns = document.getElementsByClassName("form-control responsive");
    var value;
    if (dropdown.value !== '') {
        value = true;
    } else {
        value = false;
    }
    for (i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== dropdown.id) {
            dropdowns[i].disabled = value;
            dropdowns[i].selectedIndex = "0"
        }
    }
}