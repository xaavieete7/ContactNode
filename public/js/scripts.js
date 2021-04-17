$( document ).ready(function() {

    //Login / Register submits
    $( "#submit" ).on( "click", function() {

        var form_validation = true;

        if ($("#name").length) {

            if (!$("#name").val()) {
                $("#name").addClass('field-validation');
                $("#name").next('span').removeClass('cus-hidden');
                form_validation = false;

            } else {
                $("#name").removeClass('field-validation');
                $("#name").next('span').addClass('cus-hidden');
            }
        }

        if ($("#lastname").length) {

            if (!$("#lastname").val()) {
                $("#lastname").addClass('field-validation');
                $("#lastname").next('span').removeClass('cus-hidden');
                form_validation = false;

            } else {
                $("#lastname").removeClass('field-validation');
                $("#lastname").next('span').addClass('cus-hidden');
            }
        }

        if ($("#email").length) {

            if (!$("#email").val()) {
                $("#email").addClass('field-validation');
                $("#email").next('span').removeClass('cus-hidden');
                form_validation = false;

            } else {
                $("#email").removeClass('field-validation');
                $("#email").next('span').addClass('cus-hidden');
            }
        }

        if ($("#username").length) {

            if (!$("#username").val()) {
                $("#username").addClass('field-validation');
                $("#username").next('span').removeClass('cus-hidden');
                form_validation = false;

            } else {
                $("#username").removeClass('field-validation');
                $("#username").next('span').addClass('cus-hidden');
            }
        }

        if ($("#password").length) {

            if (!$("#password").val()) {
                $("#password").addClass('field-validation');
                $("#password").next('span').removeClass('cus-hidden');
                form_validation = false;

            } else {
                $("#password").removeClass('field-validation');
                $("#password").next('span').addClass('cus-hidden');
            }
        }

        if (form_validation) {
            $("#form").submit();
        }

    });


});