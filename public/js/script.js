$(function() {
    console.log('connected-ed');

    $('#searchbar').on("keyup", event => {
        //referenced from https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
        //specifically the need for prevent default.
        event.preventDefault();
        if (event.keycode == 13) {
            window.alert("yes")
        }
    })

    $('#addToLibrary').submit(event => {

        event.preventDefault();
        const data = $('#addToLibrary').serialize();
        const trackId = $('#trackId').val();
        console.log(`Form data: ${data}`);
        console.log(`trackId: ${trackId}`)
        $.ajax({
            url: `/sounds/browse/${trackId}`,
            data: data,
            type: 'post',
            success: data => {
                console.log('response ', data);
                window.location.href = `/sounds/library`;

            },
            error: function(xhr, status, error) {

            }

        })

    })
    $('#updateAccount').submit(event => {

        event.preventDefault();
        const data = $('#updateAccount').serialize();
        console.log(`Form data: ${data}`);
        console.log(`userId: ${userId}`)
        $.ajax({
            url: `/sounds/account/edit`,
            data: data,
            type: 'put',
            success: data => {
                console.log('yes-response ', data);
                window.location.href = `/sounds/account`;

            },
            error: function(xhr, status, error) {

            }

        })

    })
})