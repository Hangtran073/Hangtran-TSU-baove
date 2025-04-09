//ghi nhớ email khi người dùng đăng nhập

document.addEventListener("DOMContentLoaded", function () {  //đảm bảo toàn bộ nội dung trang Html đã được tải xong
    let savedEmail = localStorage.getItem("email");       //lấy địa chỉ email đã được lưu trước đóđó
    if (savedEmail) {                                    //kiểm tra xem có dữ liệu email đã được lưu hay không
        document.getElementById("inputEmail").value = savedEmail;    //nếu có email được lưu thì gán nó vào ô input 
        document.getElementById("rememberMe").checked = true;    //đồng thời checkbox có id=rememberMe sẽ được đánh dấu tích sẵn
    }

    document.getElementById("loginForm").addEventListener("submit", validateForm);  // sau đó gán sự kiện cho form đăng nhậpnhập
});

function validateForm(event) {
    event.preventDefault();

    let email = document.getElementById("inputEmail").value.trim();
    let password = document.getElementById("inputPassword").value.trim();
    let errorMessage = document.getElementById("error-message");
    let errorText = document.getElementById("error-text");
    let successMessage = document.getElementById("success");
    let rememberMe = document.getElementById("rememberMe").checked;



    // Reset lỗi và thông báo
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    errorText.innerText = "";

    let isValid = true;

    // Kiểm tra email hợp lệ
    if (!email) {                    //!email: nếu ô email bị bỏ trống(chưa nhập gì)
        errorText.innerText = "Email không được để trống.";   //thì hiển thị dòng lỗi"""
        errorMessage.style.display = "flex";                  //và hiện khung thông báo lỗilỗi
        isValid = false;                                 //gán isValid=false để báo rằng form này không hợp lệ, không cho gửi.
    } else if (!/\S+@\S+\.\S+/.test(email)) {            //nếu người dùng có nhập email, nhưng định dạng sai chuẩn
        errorText.innerText = "Email không hợp lệ.";   
        errorMessage.style.display = "flex";
        isValid = false;
    }

    //kiểm tra Username


    // Kiểm tra mật khẩu hợp lệ
    let hasLowerCase = /[a-z]/.test(password);    //kiểm tra có ít nhất một chữ thường hay không
    let hasUpperCase = /[A-Z]/.test(password);    // có ít nhất một chữ hoa
    let hasNumber = /\d/.test(password);          // có ít nhất một số
    let isValidLength = password.length >= 8;     // kiểm tra độ dài ít nhất 8 kí tựtự

    if (!password) {
        errorText.innerText = "Mật khẩu không được để trống.";
        errorMessage.style.display = "flex";
        isValid = false;
    } else if (!(hasLowerCase && hasUpperCase && hasNumber && isValidLength)) {
        errorText.innerText = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!";
        errorMessage.style.display = "flex";
        isValid = false;
    }

    //kiểm tra email hoặc mật khẩu, nếu không tồn tại cảnh báo lỗi

    let storeEmail = localStorage.getItem('email');  //lấy dữ liệu đã lưu trước đó(sau khi ghi nhớ)
    let storePassword = localStorage.getItem('password');

    if (!storeEmail || !storePassword) {
        errorText.innerText = "Dữ liệu không tồn tại! Vui lòng thử lại";
        errorMessage.style.display = "flex";
        isValid = false;
    } else if(email!==storeEmail || password!==storePassword){
        errorText.innerText = "Email hoặc mật khẩu không đúng!";
        errorMessage.style.display = "flex";
        isValid = false;
    }


    // Nếu hợp lệ, xử lý đăng nhập
    if (isValid) {                                   
        if (rememberMe) {                             //nếu chọn ghi nhớ thì
            localStorage.setItem("email", email);    //lưu email đã nhập vào localStorage
        } else {
            localStorage.removeItem("email");        // nếu không chọn ghi nhớ thì xóa email khỏi localStorage
        }

        successMessage.style.display = "flex";    // hiển thị thông báo thành công
        successMessage.style.opacity = "1";      // đặt độ mờ của thông báo là 1 để hiện thị rõ ràng

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
            window.location.href = "dashboard-layout.html";  //sau 2s trang sẽ chuyển hướng đến Url
        }, 2000);
    }
}

function closeError() {
    document.getElementById("error-message").style.display = "none";
}

document.getElementById("showSignUp").addEventListener("click", function () {
    console.log("click");
    window.location.href = "sign-up-layout.html";
})