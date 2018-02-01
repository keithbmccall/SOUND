$(function() {
    console.log('connected-ed');

    $('#addToLibrary').submit(event => {
        event.preventDefault();

        const addConfirmation = $('#add-success');
        const hurray = $('<h4>').text('New Track Added');
        // const goBack = window.history.back;
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
                addConfirmation.append(hurray);
                window.setTimeout(() => { window.history.back() }, 1500);

            },
            error: function(xhr, status, error) {
                //error taken from beer app
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
    $('#deleteFromLibrary').submit(event => {
        console.log("DELETE STARTED")
        event.preventDefault();
        const data = $('#deleteFromLibrary').serialize();
        const songId = $('#songId').val();
        console.log('songId:', songId)
        const trackId = $('#trackId').val();

        console.log(data);
        $.ajax({
            url: `/sounds/library/${trackId}`,
            data: data,
            type: "DELETE",
            success: data => {
                console.log("deleted: ", data);
                window.location.href = `/sounds/library`;
            },
            error: function(xhr, status, error) {

            }
        })
    })
    $('#addToComments').submit(event => {
        event.preventDefault();

        // const goBack = window.history.back;
        const data = $('#addToComments').serialize();
        const trackId = $('#trackId').val();
        console.log(`Form data: ${data}`);
        console.log(`trackId: ${trackId}`)
        $.ajax({
            url: `/sounds/library/${trackId}`,
            data: data,
            type: 'put',
            success: data => {
                console.log('~~~~comment added ', data);
                window.location.href = `/sounds/library/${trackId}`;

            },
            error: function(xhr, status, error) {
                //error taken from beer app
            }

        })

    })
})