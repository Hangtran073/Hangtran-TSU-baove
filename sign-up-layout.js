

function validateForm(event) {
    event.preventDefault();

    let email = document.getElementById("inputEmail").value.trim();
    let username = document.getElementById("inputUsername").value.trim();
    let password = document.getElementById("inputPassword").value.trim();
    let errorMessage = document.getElementById("error-message");
    let errorText = document.getElementById("error-text");
    let successMessage = document.getElementById("success");



    // Reset lỗi và thông báo
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    errorText.innerText = "";

    let isValid = true;

    // Kiểm tra email hợp lệ
    if (!email) {
        errorText.innerText = "Email không được để trống.";
        errorMessage.style.display = "flex";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errorText.innerText = "Email không hợp lệ.";
        errorMessage.style.display = "flex";
        isValid = false;
    }

    //kiểm tra Username
    if (username === "") {
        errorText.innerText = "Username không được để trống.";
        errorMessage.style.display = "flex";
        isValid = false;
    }


    // Kiểm tra mật khẩu hợp lệ
    let hasLowerCase = /[a-z]/.test(password);
    let hasUpperCase = /[A-Z]/.test(password);
    let hasNumber = /\d/.test(password);
    let isValidLength = password.length >= 8;

    if (!password) {
        errorText.innerText = "Mật khẩu không được để trống.";
        errorMessage.style.display = "flex";
        isValid = false;
    } else if (!(hasLowerCase && hasUpperCase && hasNumber && isValidLength)) {
        errorText.innerText = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!";
        errorMessage.style.display = "flex";
        isValid = false;
    }

    // Nếu hợp lệ, xử lý đăng nhập
    if (isValid) {
        localStorage.setItem("email",email);
        localStorage.setItem("password",password);
        successMessage.style.display = "flex";
        successMessage.style.opacity = "1";

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
            window.location.href = "sign-in-layout.html"
        }, 2000);
    }
}


function closeError() {
    document.getElementById("error-message").style.display = "none";
}



document.getElementById("showSignIn").addEventListener("click", function () {
    console.log("click");
    window.location.href = "sign-in-layout.html";
})