//เพิ่มผู้ใช้ใหม่
function addUser() {
    const rankId = document.getElementById('UserRank').value;
    const prefix = document.getElementById('UserPrefix').value;
    const username = document.getElementById('RegisterUsername').value;
    const lastname = document.getElementById('RegisterLastname').value;
    const email = document.getElementById('RegisterEmail').value;
    const password = document.getElementById('RegisterPassword').value;
    const confirmpassword = document.getElementById('ConfirmRegisterPassword').value;
    const fileInput = document.getElementById('profile_upload');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('rank_id', rankId);
    formData.append('prefix', prefix);
    formData.append('username', username);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('user_image', file);

    fetch('/addUser', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Clear form fields
            document.getElementById('UserRank').value = '';
            document.getElementById('UserPrefix').value = '';
            document.getElementById('RegisterUsername').value = '';
            document.getElementById('RegisterLastname').value = '';
            document.getElementById('RegisterEmail').value = '';
            document.getElementById('RegisterPassword').value = '';
            document.getElementById('profile_upload').value = '';

            // Close modal
            $("#addUserForm").modal("hide");

            // Refresh user list or do any other necessary actions
            // fetchUsers();
        } else {
            throw new Error('Failed to add user');
        }
    })
    .catch(error => {
        console.error('Error adding user:', error);
    });
}

//ดึงข้อมูลมาแสดงในตาราง
function fetchUsers() {
    fetch('/getUsers')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('.datatables-basic tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            if (data.length === 0) {
                tableBody.innerHTML = `<tr class="no-data"><td colspan="6">ไม่มีข้อมูล</td></tr>`;
            } else {
                data.forEach((user, index) => {
                    const row = `
                      <tr>
                        <td>${index + 1}</td>
                        <td>${user.rank}</td>
                        <td>${user.prefix}</td>
                        <td>${user.username}  ${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>
                          <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal"
                            data-bs-target="#editUser" onclick="editUser(${user.id})">แก้ไข</button>
                        </td>
                      </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}
// ดึงข้อมูลตำแหน่งลงใน option ตำแหน่ง
document.addEventListener('DOMContentLoaded', function () {
    fetch('/getRanksName')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('UserRank');
            data.forEach(rank => {
                const option = document.createElement('option');
                option.value = rank.id;
                option.textContent = rank.rankname;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching ranks:', error);
        });
});

//แสดงรูปภาพจากไฟล์
document.getElementById('profile_upload').addEventListener('change', function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('profile_img');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});
document.getElementById('edit_profile_upload').addEventListener('change', function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('edit_profile_img');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

function showWarningAlert(title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    });
}

