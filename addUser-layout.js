document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Lấy dữ liệu từ form
      const newUser = {
        code: document.getElementById("userCode").value.trim(),
        name: document.getElementById("username").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
        birthday: document.getElementById("birthday").value,
        status: document.querySelector("input[name='status']:checked").value,
        description: document.getElementById("description").value.trim()
      };

      // Kiểm tra cơ bản
      if (!newUser.code || !newUser.name || !newUser.email || !newUser.password || !newUser.birthday) {
        return alert("Vui lòng điền đầy đủ thông tin!");
      }
      if (!/\S+@\S+\.\S+/.test(newUser.email)) {
        return alert("Email không hợp lệ!");
      }
      if (newUser.password.length < 8) {
        return alert("Mật khẩu phải ít nhất 8 ký tự!");
      }

      // Lưu vào localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      alert("Thêm user mới thành công!");
      window.location.href = "user-dashboard.html"; // Chuyển về trang dashboard
    });
  });

  function goBack() {
    window.location.href = "user-dashboard.html";
  }