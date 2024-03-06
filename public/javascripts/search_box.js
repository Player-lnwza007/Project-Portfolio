document.addEventListener('DOMContentLoaded', function() {
    // Filter table rows based on search query
    document.getElementById('searchBox').addEventListener('keyup', function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var tableRows = document.querySelectorAll('#dataTable tbody tr');

        tableRows.forEach(function(row) {
            var cells = row.querySelectorAll('td');
            var found = false;
            cells.forEach(function(cell) {
                if (cell.textContent.toLowerCase().includes(searchQuery)) {
                    found = true;
                }
            });
            if (found) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});