function ShowSnackbar(message) {
    var snackbarContainer = document.getElementById('status-snackbar');
    var data = { message: message };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};