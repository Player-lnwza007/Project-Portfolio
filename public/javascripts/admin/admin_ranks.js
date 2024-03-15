function addRank() {
    const rankname = document.getElementById('NameRanks').value;
    const select_page1 = document.getElementById('select_page1').checked ? 'Y' : 'N';
    const select_page2 = document.getElementById('select_page2').checked ? 'Y' : 'N';
    const select_page3 = document.getElementById('select_page3').checked ? 'Y' : 'N';
    
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
            $("#addRank").modal("hide");

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
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="page1Checkbox-${rank.id}" ${rank.page1 ? 'checked' : ''} onchange="updatePage('page1', ${rank.id}, this.checked)" disabled/>
                            </div>
                        </td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="page2Checkbox-${rank.id}" ${rank.page2 ? 'checked' : ''} onchange="updatePage('page2', ${rank.id}, this.checked)" disabled/>
                            </div>
                        </td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="page3Checkbox-${rank.id}" ${rank.page3 ? 'checked' : ''} onchange="updatePage('page3', ${rank.id}, this.checked)" disabled/>
                            </div>
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editRank" onclick="editRank(${rank.id})">แก้ไข</button>
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
            document.getElementById('editPage1').checked = (data.page1 === 1);
            document.getElementById('editPage2').checked = (data.page2 === 1);
            document.getElementById('editPage3').checked = (data.page3 === 1);

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
    const page1 = document.getElementById('editPage1').checked ? 'Y' : 'N';
    const page2 = document.getElementById('editPage2').checked ? 'Y' : 'N';
    const page3 = document.getElementById('editPage3').checked ? 'Y' : 'N';

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

