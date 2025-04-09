// Hàm chuyển hướng về trang Dashboard
function goBack() {
    window.location.href = "dashboard-layout.html";
}

// Khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    // Lấy thông tin user cần chỉnh sửa từ localStorage
    const editUser = JSON.parse(localStorage.getItem("editUser"));

    if (!editUser) {
        alert("Không tìm thấy user để chỉnh sửa!");
        return goBack();
    }

    // Điền dữ liệu của user lên form
    document.getElementById("userCode").value = editUser.code || "";
    document.getElementById("username").value = editUser.name || "";
    document.getElementById("email").value = editUser.email || "";
    document.getElementById("role").value = editUser.role || "USER";
    document.getElementById("birthday").value = editUser.birthday || "";
    document.getElementById("description").value = editUser.description || "";

    // Chọn radio status phù hợp
    if (editUser.status === "Active") {
        document.querySelector("input[name='status'][value='Active']").checked = true;
    } else {
        document.querySelector("input[name='status'][value='Deactivate']").checked = true;
    }

    // Xử lý khi bấm nút "Save" trên form
    document.getElementById("editForm").addEventListener("submit", (e) => {
        e.preventDefault();

        // Lấy danh sách user từ localStorage
        let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Tìm user cũ trong mảng dựa trên mã code
        const index = storedUsers.findIndex(u => String(u.code) === String(editUser.code));
        if (index === -1) {
            alert("User không tồn tại trong danh sách!");
            return goBack();
        }

        // Lấy giá trị mới từ form và cập nhật vào user
        const updatedName = document.getElementById("username").value.trim();
        const updatedEmail = document.getElementById("email").value.trim();
        const updatedRole = document.getElementById("role").value;
        const updatedBirthday = document.getElementById("birthday").value;
        const updatedStatus = document.querySelector("input[name='status']:checked").value;
        const updatedDescription = document.getElementById("description").value.trim();
        const newPassword = document.getElementById("password").value;

        // Kiểm tra các trường cơ bản không được để trống
        if (!updatedName || !updatedEmail) {
            return alert("Username và Email không được để trống!");
        }
        // Kiểm tra định dạng email
        if (!/\S+@\S+\.\S+/.test(updatedEmail)) {
            return alert("Email không hợp lệ!");
        }

        // Cập nhật thông tin vào user
        storedUsers[index].name = updatedName;
        storedUsers[index].email = updatedEmail;
        storedUsers[index].role = updatedRole;
        storedUsers[index].birthday = updatedBirthday;
        storedUsers[index].status = updatedStatus;
        storedUsers[index].description = updatedDescription;

        // Nếu có nhập mật khẩu mới thì kiểm tra và cập nhật
        if (newPassword) {
            if (newPassword.length < 8) {
                return alert("Mật khẩu phải ít nhất 8 ký tự!");
            }
            storedUsers[index].password = newPassword;
        }

        // Ghi đè lại danh sách user vào localStorage
        localStorage.setItem("users", JSON.stringify(storedUsers));

        // Xoá user đang edit khỏi localStorage (không bắt buộc nhưng giúp tránh lỗi khi load lại)
        localStorage.removeItem("editUser");

        alert("Cập nhật thông tin user thành công!");
        goBack();
    });
});