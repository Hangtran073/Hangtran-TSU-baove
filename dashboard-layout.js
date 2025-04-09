let defaultUsers = [];
for (let i = 1; i <= 100; i++) {
    defaultUsers.push({
        code: "TR" + i.toString().padStart(3, '0'),                             //chuyển i thành chuỗi và đảm bảo nó có ít nhất 3 kí tự và bổ sung các số 0 ở đầu
        name: "User " + i,
        email: "user" + i + "@email.com",
        role: Math.random() < 0.5 ? "ADMIN" : "USER",                              //tạo số ngẫu nhien từ 0 đến 1, nếu ngẫu nhiên nhỏ hơn 0.55
        birthday:
            `${1980 + Math.floor(Math.random() * 21)}-` +                          // tạo năm sinh ngẫu nhiên từ 1980 đến 2000
            `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-` +     //tạo tháng sinh ngẫu nhiên từ 1 đến 12 , và cộng thêm 1 để khi nhân cho 0 sẽ cộng thêm 1, Math.floor : làm tròn  số xuống dưới đến số nguyên gần nhấtnhất
            `${String(Math.floor(Math.random() * 31) + 1).padStart(2, '0')}`,       //padStart(): bảo đảm tháng và ngày có 2 chữ sốsố
        status: Math.random() < 0.5 ? "Active" : "Deactivate"
    });
}

let storedUsers = JSON.parse(localStorage.getItem("users")) || []; //lấy dữ liệu trong trình duyệt với khóa users, .JON.parse để chuyển thành mảng, nếu không có dữ liệu trả về mảng rỗng[]
let users = [...defaultUsers, ...storedUsers];                   //kết hơp danh sách người dùng mặt định và người dùng lưu trong localStoragelocalStorage
let currentPage = 1;                                               //gán trang hiện tại là 1 nghĩa là trang đầu tiên
let usersPerPage = 5;                                             // mỗi trang hiển thị 5 người dùng
let filteredUsers = [...users];                                     //tạo ra bản sao của mảng users , để sau này có thể lọc(tìm kiếm, sắp xếp..) mà không lam thay đổi mảng gốc

function renderTable() {                                               //hiển thị dữ liệu người dùng lên bảng html và cập nhập phân trang
    const tableBody = document.getElementById("userTable");            //lấy phần tử có id của phần <tbody></tbody>
    tableBody.innerHTML = "";                                         // giúp xóa hết nội dung cũ của bảng để chuẩn bị cho việc chèn dữ liệu mới

    // tính toán chỉ số bắt đầu và kết thúc cho phân trang
    let start = (currentPage - 1) * usersPerPage;
    let end = start + usersPerPage;                                         //end là chỉ số kết thuc, bằng chỉ số đầu cộng với số lượng người dùng mỗi trangtrang
    let paginatedUsers = filteredUsers.slice(start, end);                    //cắt mảng filteredUser để lấy ra những người dùng thuộc trang hiện tạitại

    // duyệt qua từng phần tử trong mảng bằng forEachforEach

    paginatedUsers.forEach((user, index) => {
        let row = `<tr>
        <td>${user.code}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.birthday}</td>
        <td class="${user.status === 'Active' ? 'status-active' : 'status-inactive'}">${user.status}</td>
        <td>
          <span class="action-icons" onclick="deleteUser(${index})"><img src="./assets/delete-icon.png"></span>
          <span class="action-icons" onclick="editUser(${index})">✏️</span>
          
        </td>
      </tr>`;
        tableBody.innerHTML += row;                        //mỗi dòng html được thêm vào bảng 
    });

    renderPagination();                               //cập nhập phần phân trang
}

function renderPagination() {
    const paginationDiv = document.getElementById("pagination");                         // lấy phần tử chứa phân trang
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);                     //tính tổng số trang
    //tạo nút chuyển trang bên trái, nếu đang ở trang đầu tiên, nút sẽ vô hiệu hóahóa
    paginationDiv.innerHTML = `<button onclick="changePage(-1)" ${currentPage === 1 ? "disabled" : ""}>❮</button>`;


    //tạo nút cho các trang
    //duyệt từ trang 1 đến trang cuối cùng
    //i===1: luôn hiển thị nút cho trang đầu tiên,
    //i===totalPages: luôn hiển thị nút cho trang cuối cùng,
    //(i >= currentPage - 2 && i <= currentPage + 2): hiển thị nút cho các trang nằm trong khoảng từ 2 trang trước đến 2 trang sau trang hiện tạitại

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationDiv.innerHTML += `<button onclick="goToPage(${i})" ${i === currentPage ? "style='background: #3498db;'" : ""}>${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {                       //nếu trang cách trang hiện tại 3 đơn vị về bên trái hoặc 3 đơn vị về bên phảiphải
            paginationDiv.innerHTML += `<span>...</span>`;                                //hiển thị dấu cho các khoảng cách giữa trangtrang
        }
    }

    paginationDiv.innerHTML += `<button onclick="changePage(1)" ${currentPage === totalPages ? "disabled" : ""}>❯</button>`;  //tạo nút chuyển trang bên phải
}

function changePage(step) {    //thay đổi trang hiện tại dựa trên bước nhảy
    currentPage += step;     // cộng thêm giá trị step(có thể là -1 hoặc 1)
    renderTable();   // gọi hàm để cập nhập lại bảng theo trang mới
}

function goToPage(page) {
    currentPage = page;  //gán giá trị của page cho currentPage
    renderTable();
}



function editUser(index) {
    // Kiểm tra xem mảng filteredUsers có tồn tại và là một mảng không
    if (!Array.isArray(filteredUsers)) {
        alert("Danh sách người dùng không tồn tại!");
        return;
    }

    // Kiểm tra chỉ số hợp lệ
    if (index < 0 || index >= filteredUsers.length) {
        alert("Chỉ số người dùng không hợp lệ!");
        return;
    }

    // Lấy thông tin user từ mảng filteredUsers
    const user = filteredUsers[index];

    // Lưu thông tin user vào localStorage với key "editUser"
    localStorage.setItem("editUser", JSON.stringify(user));

    // Chuyển hướng đến trang chỉnh sửa user
    window.location.href = "editUser-layout.html";
}



function deleteUser(index) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
        filteredUsers.splice(index, 1);                                                        //nếu đồng ý , xóa người dùng khỏi mảng bẳng splice
        localStorage.setItem("users", JSON.stringify(filteredUsers.filter(user => !user.code.startsWith("TR0"))));  //cập nhật lại dữ liệu trong local sau khi loại bỏ các phần tử có mã bắt đầu bằng "TROTRO"
        if ((currentPage - 1) * usersPerPage >= filteredUsers.length) {
            currentPage = Math.max(1, currentPage - 1);                                       // kiểm tra nếu trang hiện tại không còn dữ liệu(do xóa quá nhiều người dùng), thì điều chỉnh currentPage sao cho không bị vượt quá số trang có dữ liệu.
        }
        renderTable();                                                  // gọi render để cập nhật lại giao diện bảngbảng
    }
}

function searchUser() {
    const keyword = document.getElementById("searchBox").value.toLowerCase();  //lấy giá trị tìm kiếm từ o input có id=searchBox và chuyển về chữ  thường để so sánh không phân biẹt hoa thường
    filteredUsers = users.filter(user => user.name.toLowerCase().includes(keyword));  //lọc mảng users( toàn bộ người dùng) dựa trên người dùng có chứa từ khóa tìm kiếm
    currentPage = 1;  // đặt currentPage về 1 để hiện thị kết quả tìm kiếm từ trang đầu tiên
    renderTable();  //cập nhập lại bảng
}

document.addEventListener("DOMContentLoaded", renderTable); //đảm bảo rằng hàm renderTable() được gọi ngay khi trang web tải xongxong