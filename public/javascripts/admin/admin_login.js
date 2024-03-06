//register
document.addEventListener('DOMContentLoaded', function () {
    //ล็อคอิน
    const loginBtn = document.getElementById('LoginSubmit');
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            const email = document.getElementById('LoginEmail').value;
            const password = document.getElementById('LoginPassword').value;

            if (email.trim() === '' || password.trim() === '') {
                showWarningAlert('คำเตือน!', 'กรุณากรอกอีเมลและรหัสผ่าน');
                return;
            }

            fetch('/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({ email, password }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem('adminToken', data.token);
                        window.location.href = '/admin';
                    } else {
                        // แสดงข้อผิดพลาด
                        showWarningAlert('ล็อคอินไม่สำเร็จ', data.message);
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }
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
