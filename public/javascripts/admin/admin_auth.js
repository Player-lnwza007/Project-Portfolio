document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            // ใช้ Base64.decode จาก js-base64
            const payload = JSON.parse(Base64.decode(base64));

            // ตรวจสอบอายุโทเค็น
            const now = Date.now() / 1000;
            if (payload.exp < now) {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
            } else {
                document.getElementById('username').textContent = payload.username;
                document.getElementById('email').textContent = payload.email;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            window.location.href = '/admin/login';
        }
    } else {
        window.location.href = '/admin/login';
    }
});

function logout() {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login'; // หรือไปยังหน้าอื่นที่คุณต้องการ
}
