$(document).ready(function () {
    loadLeaves();

    $("#leaveForm").submit(function (e) {
        e.preventDefault();

        let data = {
            UserId: $("#UserId").val(),
            LeaveType: $("#LeaveType").val(),
            FromDate: $("#FromDate").val(),
            ToDate: $("#ToDate").val(),
            Reason: $("#Reason").val()
        };

        $.ajax({
            url: "https://localhost:44376/api/Leave/apply",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (res) {
                Swal.fire("Success", res, "success");
                loadLeaves();
            },
            error: function (err) {
                Swal.fire("Error", err.responseText, "error");
            }
        });
    });
});

function loadLeaves() {
    $.get("https://localhost:44376/api/Leave/my-leaves/1", function (data) {
        let rows = "";
        data.forEach(l => {
            rows += `<tr>
                <td>${l.leaveType}</td>
                <td>${l.fromDate.split("T")[0]}</td>
                <td>${l.toDate.split("T")[0]}</td>
                <td>${l.status}</td>
                <td>${l.status === 'Pending' ? `<button class='btn btn-danger btn-sm' onclick='cancelLeave(${l.id})'>Cancel</button>` : ''}</td>
            </tr>`;
        });
        $("#leaveTable tbody").html(rows);
    });
}

function cancelLeave(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Cancel this leave?",
        icon: "warning",
        showCancelButton: true
    }).then(result => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:44376/api/Leave/cancel/" + id,
                method: "DELETE",
                success: function () {
                    Swal.fire("Cancelled!", "Your leave has been cancelled.", "success");
                    loadLeaves();
                }
            });
        }
    });
}
