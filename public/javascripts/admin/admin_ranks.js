
function addRank() {
    const rankname = document.getElementById('NameRanks').value;
    const select_page1 = document.getElementById('select_page1').value;
    const select_page2 = document.getElementById('select_page2').value;
    const select_page3 = document.getElementById('select_page3').value;
    fetch('/addRank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rankname, select_page1, select_page2, select_page3 }),
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // แปลงคำตอบเป็น JSON ถ้าสถานะการตอบกลับเป็น OK
            } else {
                throw new Error('Server responded with an error');
            }
        })
        .then(data => {
            // Clear input fields
            document.getElementById('NameRanks').value = '';
            document.getElementById('select_page1').value = 'N';
            document.getElementById('select_page2').value = 'N';
            document.getElementById('select_page3').value = 'N';

            // Close modal
            document.querySelector('.btn-close').click();

            // Fetch and update table
            fetchRanks();
        })
        .catch(error => {
            console.error('Error adding rank:', error);
            showWarningAlert('Error', error.message);
        });
}

function fetchRanks() {
    fetch('/getRanks')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('.datatables-basic tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            if (data.length === 0) {
                tableBody.innerHTML = `<tr class="no-data"><td colspan="6">ไม่มีข้อมูล</td></tr>`;
            } else {
                data.forEach((rank, index) => {
                    const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${rank.rankname}</td>
                        <td>${rank.page1 ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</td>
                        <td>${rank.page2 ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</td>
                        <td>${rank.page3 ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal"
                            data-bs-target="#editRank" onclick="editRank(${rank.id})">แก้ไข</button>
                        </td>
                    </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching ranks:', error);
        });
}


function editRank(id) {
    console.log(id)
    fetch(`/getRankById/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('editRankName').value = data.rankname;
            document.getElementById('editPage1').value = data.page1 ? 'Y' : 'N';
            document.getElementById('editPage2').value = data.page2 ? 'Y' : 'N';
            document.getElementById('editPage3').value = data.page3 ? 'Y' : 'N';

            // Store the current rank ID in a hidden input or a global variable
            document.getElementById('editForm').setAttribute('data-current-id', id);

            // Open the modal
            $("#editRank").modal("show");
        })
        .catch(error => {
            console.error('Error fetching rank:', error);
        });
}

function updateRank() {
    const id = document.getElementById('editForm').getAttribute('data-current-id');
    const rankname = document.getElementById('editRankName').value;
    const page1 = document.getElementById('editPage1').value;
    const page2 = document.getElementById('editPage2').value;
    const page3 = document.getElementById('editPage3').value;

    fetch(`/updateRank/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rankname, page1, page2, page3 }),
    })
    .then(() => {
        // Close the modal
        $("#editRank").modal("hide");

        // Refresh the table
        fetchRanks();
    })
    .catch(error => {
        console.error('Error updating rank:', error);
    });
}


function deleteRank() {
    const id = document.getElementById('editForm').getAttribute('data-current-id');
    showWarningAlert('คำเตือน!', 'คุณต้องการลบ?')
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`/deleteRank/${id}`, { method: 'DELETE' })
                    .then(() => {
                        // รีเฟรชข้อมูลในตาราง
                        fetchRanks();
                        $("#editRank").modal("hide");
                    })
                    .catch(error => {
                        console.error('Error deleting rank:', error);
                    });
            }
        });
}


document.addEventListener('DOMContentLoaded', fetchRanks);

function showWarningAlert(title, text) {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ปิด',
        customClass: {
            confirmButton: 'btn btn-danger me-1',
            cancelButton: 'btn btn-outline-secondary me-1'
        },
        buttonsStyling: false
    });
}

