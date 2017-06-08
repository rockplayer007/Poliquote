$("#signupForm").submit(function (event) {
    event.preventDefault();
    var username = $("#usernameBox").val();
    var password = $("#passwordBox").val();
    if (username.indexOf(",") > -1)
        ShowSnackbar("The username can't contain the comma");
    else {
        var user = { username: username, password: password };
        $.ajax({
            url: $("#signupForm").attr("action"),
            type: "POST",
            data: user
        }).done(function () {
            ShowSnackbar("Succesfully signed up");
            var credentials = { username: username, password: password };
            localStorage.setItem("credentials", JSON.stringify(credentials));
            window.location.href = window.location.href.replace("/signup", "/");
        }).fail(function (data) {
            var status = "";
            switch (data.status) {
                case 400:
                    status = "The username is not available";
                    break;
                case 500:
                default:
                    status = "An error occurred, please try again";
                    break;
            }
            ShowSnackbar(status);
        });
    }
});