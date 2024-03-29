document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('userToken');
    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            // ใช้ Base64.decode จาก js-base64
            const payload = JSON.parse(Base64.decode(base64));

            // ตรวจสอบอายุโทเค็น
            const now = Date.now() / 1000;
            if (payload.exp < now) {
                localStorage.removeItem('userToken');
                window.location.href = '/login';
            } else {
                document.getElementById('username').textContent = payload.username;
                document.getElementById('email').textContent = payload.email;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            window.location.href = '/login';
        }
    } else {
        window.location.href = '/login';
    }
});

function logout() {
    localStorage.removeItem('userToken');
    window.location.href = '/login';
}