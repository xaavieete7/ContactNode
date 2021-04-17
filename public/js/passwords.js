jQuery( document ).ready(function($) {

    //apply
    $("#table-list").SetEditable({
        $addButton: $('#but_add'),
        onBeforeDelete: function($row) { deleteRow($row) },
        onEdit: function($row) { editRow($row) }
    });
    $('#add').click(function() {
        (async () => {
            const { value: formValues } = await Swal.fire({
                title: 'Add password',
                showDenyButton: true,
                confirmButtonText: `Add`,
                denyButtonText: `Cancel`,
                html:
                    '<div class="swal2-label-container"><span class="swal2-input-label">Site url</span></div>' +
                    '<input type="url" id="swal-input1" class="swal2-input">' +
                    '<div class="swal2-label-container"><span class="swal2-input-label">Username</span></div>' +
                    '<input type="text" id="swal-input2" class="swal2-input">' +
                    '<div class="swal2-label-container"><span class="swal2-input-label">Password</span></div>' +
                    '<input type="password" id="swal-input3" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value
                    ]
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    if (result.value) {
                        rowAddNew('table-list', [result.value[0],result.value[1],result.value[2]]);

                        $.ajax({
                            url: "/addpassword",
                            method: "POST",
                            data: ({
                               url:  result.value[0],
                               username: result.value[1],
                               password: result.value[2]
                            }),
                            success: function(result){
                                if (result.success) {
                                    Swal.fire({
                                        text: 'Password added successfully',
                                        timer: 3000,
                                        toast: true,
                                        position: 'top-end',
                                        showCancelButton: false,
                                        showConfirmButton: false
                                    });
                                }
                            }
                        });
                    }
                }
            });

        })();
    });

    function deleteRow($row) {

        Swal.fire({
            title: 'Sure want to delete the password?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                var values = {};

                $($row.find('td')).each(function( index ) {
                    console.log( index + ": " + $( this ).text() );
                    values[index] = $( this ).text();
                });

                $.ajax({
                    url: "/deletepassword",
                    method: "POST",
                    data: ({
                        url:  values[0],
                        username: values[1],
                        password: values[2]
                    }),
                    success: function(result){
                        if (result.success) {
                            Swal.fire({
                                text: 'Password removed successfully',
                                timer: 3000,
                                toast: true,
                                position: 'top-end',
                                showCancelButton: false,
                                showConfirmButton: false
                            });
                        }
                    }
                });

                $row.remove();
            }
        });
    }

    function editRow($row) {

        var values = {};
        $($row.find('td')).each(function( index ) {
            console.log( index + ": " + $( this ).text() );
            values[index] = $( this ).text();
        });

        $.ajax({
            url: "/editpassword",
            method: "POST",
            data: ({
                url:  values[0],
                username: values[1],
                password: values[2]
            }),
            success: function(result){
                if (result.success) {
                    Swal.fire({
                        text: 'Password updated successfully',
                        timer: 3000,
                        toast: true,
                        position: 'top-end',
                        showCancelButton: false,
                        showConfirmButton: false
                    });
                }
            }
        });
    }
});
