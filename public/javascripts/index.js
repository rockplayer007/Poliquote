window.onload = function () {
    var credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials)
        $.ajax({
            url: window.location.href + "api/auth/login",
            type: "POST",
            data: credentials
        }).done(function () {
            ShowSnackbar("Welcome " + credentials.username);
        }).fail(function (data) {
            console.log(data);
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
}