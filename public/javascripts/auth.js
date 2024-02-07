document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('userToken');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        document.getElementById('username').textContent = payload.username;
        document.getElementById('email').textContent = payload.email;
    } else {
        window.location.href = '/login';
    }
    console.log('ppppp'+token)
});

