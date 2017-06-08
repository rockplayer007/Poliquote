$("#loginForm").submit(function (event) {
    event.preventDefault();
    $.ajax({
        url: $("#loginForm").attr("action"),
        type: "POST",
        data: $("#loginForm").serialize()
    }).done(function () {
        ShowSnackbar("Succesfully logged in!");
        var username = $("#usernameBox").val();
        var password = $("#passwordBox").val();
        var credentials = { username: username, password: password };
        localStorage.setItem("credentials", JSON.stringify(credentials));
        window.location.href = window.location.href.replace("/login", "/");
    }).fail(function (data) {
        var status = "";
        switch (data.status) {
            case 400:
                status = "The password is not correct";
                break;
            case 404:
                status = "The username does not exist";
                break;
            case 500:
            default:
                status = "An error occurred, please try again";
                break;
        }
        ShowSnackbar(status);
    });
});