document.getElementById('RegisterSubmit').addEventListener('click', async function () {
    const username = document.getElementById('RegisterUsername').value;
    const email = document.getElementById('RegisterEmail').value;
    const password = document.getElementById('RegisterPassword').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});