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
}

function logout() {
    localStorage.removeItem("credentials");
    location.reload();
}