$(document).ready(function () {
    loadAdminLeaves();
});

function loadAdminLeaves() {
    $.get("https://localhost:44376/api/Leave/all", function (data) {
        let rows = "";
        data.forEach(l => {
            rows += `<tr>
                <td>${l.username}</td>
                <td>${l.leaveType}</td>
                <td>${l.fromDate.split("T")[0]}</td>
                <td>${l.toDate.split("T")[0]}</td>
                <td>${l.status}</td>
                <td>
                    ${l.status === "Pending" ? `
                        <button class='btn btn-success btn-sm' onclick='updateStatus(${l.id}, "Approved")'>Approve</button>
                        <button class='btn btn-danger btn-sm' onclick='updateStatus(${l.id}, "Rejected")'>Reject</button>
                    ` : ''}
                </td>
            </tr>`;
        });
        $("#adminLeaveTable tbody").html(rows);
    });
}

function updateStatus(id, status) {
    Swal.fire({
        title: `Add remarks for ${status}?`,
        input: 'text',
        showCancelButton: true
    }).then(result => {
        if (result.isConfirmed) {
            $.ajax({
                url: `https://localhost:44376/api/Leave/update-status/${id}?status=${status}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(result.value),
                success: function () {
                    Swal.fire("Updated", `Leave ${status.toLowerCase()} successfully`, "success");
                    loadAdminLeaves();
                }
            });
        }
    });
}
