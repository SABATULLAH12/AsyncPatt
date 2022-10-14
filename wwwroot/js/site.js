// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(() => {

})

let showLoader = (flag) => {
    if (flag == true) {
        $('.transparentBackground').show();
        $('.loaderIcon').show();
    }
    else {
        $('.transparentBackground').hide();
        $('.loaderIcon').hide();
    }
}

var downloadPPT = () => {
    showLoader(true);
    $.ajax({
        url: 'https://localhost:44345/api/startwork',
        method: 'GET',
        async: true,
        success: function (response) {
            let map = {};
            let url = 'https://localhost:44345/api/status';
            let obj = setInterval(() => { pollStatus() }, 30000);

            let pollStatus = () => {
                $.ajax({
                    url: url + '/' + response.id,
                    method: 'GET',
                    async: true,
                    //data: JSON.stringify({ 'Guid': response.id }),
                    success: function (response) {
                        if (response.isCompleted) {
                            showLoader(false);
                            clearInterval(obj);
                            downloadFile(response.url);
                        }
                    }
                }
                )
            }
        }
    }
    )
}
let downloadFile = (path) => {
    window.location.href = 'https://localhost:44345/api/download?path=' + path;
    /*$.ajax({
        url: 'https://localhost:44345/api/download',
        method: 'GET',
        async: true,
        data: ({ 'path': path }),
        success: function (response) {
            if (response.isCompleted) {
                clearInterval(obj);
                downloadFile(path);
            }
        }
    })*/
}

