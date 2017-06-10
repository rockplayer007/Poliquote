var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

window.onload = function () {
    var credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials)
        $.ajax({
            url: window.location.href + "api/auth/login",
            type: "POST",
            data: credentials
        }).done(function () {
            ShowSnackbar("Welcome " + credentials.username);
            $("#userBox").show();
            $("#loginBox").hide();
            $("#user-txt").text(credentials.username);
        }).fail(function (data) {
            switch (data.status) {
                case 500:
                default:
                    ShowSnackbar("An error occurred, please try again");
                    break;
                case 400:
                case 404:
                    window.location.href += "login";
            }
        });
    else {
        $("#userBox").hide();
        $("#loginBox").show();
    }
    getQuotes();
}

function checkCredentials() {
    var credentials = JSON.parse(localStorage.getItem("credentials"));
    if (!credentials) {
        ShowSnackbar("Your credentials are not correct, log in again");
        logout();
        return null;
    }
    return credentials;
}

function showDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function addQuote() {
    var c = checkCredentials();
    if (c) {
        var quote = { name: $("#name").val().toLowerCase(), subject: $("#subject").val().toLowerCase(), school: $("#school").val().toLowerCase(), quote: $("#quote").val().toLowerCase() };
        var data = { username: c.username, password: c.password, post: JSON.stringify(quote) };
        $.ajax({
            url: window.location.href + "api/posts/addpost",
            type: "POST",
            data: data
        }).done(function () {
            ShowSnackbar("Succesfully added your quote!");
            dialog.close();
            location.reload();
        }).fail(function (data) {
            var status = "";
            switch (data.status) {
                case 400:
                    status = "Your credentials are not correct, log in again";
                    logout();
                    break;
                case 500:
                default:
                    status = "An error occurred, please try again";
                    break;
            }
            ShowSnackbar(status);
        });
    }
}

function getQuotes() {
    var options = null;
    $.get(window.location.href + "api/posts/getposts", options, function (data, status, xhr) {
        switch (xhr.status) {
            case 200:
                for (i in data) {
                    $("#quotes-grid").loadTemplate("../templates/quote.html", data[i], { prepend: true });
                }    
                break;
            default:
                //Show an error message    
                break;
        }
    });
}

function logout() {
    localStorage.removeItem("credentials");
    location.reload();
}