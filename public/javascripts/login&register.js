//register
document.getElementById('RegisterSubmit').addEventListener('click', async function () {
    const username = document.getElementById('RegisterUsername').value;
    const email = document.getElementById('RegisterEmail').value;
    const password = document.getElementById('RegisterPassword').value;
    const confirmPassword = document.getElementById('ConfirmRegisterPassword').value;

    // ตรวจสอบความว่างเปล่าของข้อมูล
    if (username.trim() === '') {
        showWarningAlert('คำเตือน!', 'กรุณากรอกชื่อผู้ใช้');
        return;
    }
    if (email.trim() === '') {
        showWarningAlert('คำเตือน!', 'กรุณากรอกอีเมล');
        return;
    }
    if (password.trim() === '') {
        showWarningAlert('คำเตือน!', 'กรุณากรอกรหัสผ่าน');
        return;
    }
    if (password.length < 8) {
        showWarningAlert('คำเตือน!', 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
        return;
    }
    if (password !== confirmPassword) {
        showWarningAlert('คำเตือน!', 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
        return;
    }

    // ตรวจสอบรูปแบบอีเมล
    if (!email.endsWith('@chandra.ac.th')) {
        showWarningAlert('คำเตือน!', 'กรุณาใช้อีเมลมหาวิทยาลัย');
        return;
    }

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => {
            if (response.ok) {
                return response.text(); // หรือ response.json()
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            });
        })
        .catch(error => {
            console.error('คำเตือน :', error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: error.toString(),
                icon: 'error',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            });
        });
});

//ล็อคอิน
document.getElementById('LoginSubmit').addEventListener('click', function () {
    const email = document.getElementById('LoginEmail').value;
    const password = document.getElementById('LoginPassword').value;

    if (email.trim() === '' || password.trim() === '') {
        showWarningAlert('คำเตือน!', 'กรุณากรอกอีเมลและรหัสผ่าน');
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/';
            } else {
                // แสดงข้อผิดพลาด
                showWarningAlert('ล็อคอินไม่สำเร็จ', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
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
