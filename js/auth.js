const apiBase = "https://localhost:44376/api"; // your .NET Core API base URL

$("#signupForm").submit(function (e) {
  e.preventDefault();

  const user = {
    firstName: $("#FirstName").val(),
    username: $("#Username").val(),
    email: $("#Email").val(),
    password: $("#Password").val(),
    isAdmin: false
  };

  $.ajax({
    url: `${apiBase}/User/register`, // 👈 using apiBase
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function () {
      Swal.fire("Success", "Account created", "success").then(() => {
        window.location.href = "login.html";
      });
    },
    error: function (err) {
      Swal.fire("Error", err.responseText, "error");
    }
  });
});
