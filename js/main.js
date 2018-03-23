$(document).ready(function () {
    searchBtn();
});

function searchBtn() {
    $(document).on("click", ".btn", function (event) {
        $(".amiibo-content").empty();
        event.preventDefault();
        let userio = $("#search").val();
        $.ajax({
            url: "http://www.amiiboapi.com/api/amiibo/?character=" + userio,
            method: "GET",
            dataType: "json"
        }).done(function (response) {
            getData(response.amiibo);
        });
    });
};


function getData(data) {
    loadData(data);
  
}

function loadData(array) {
    for (var x = 0; x < array.length; x++) {
        var html = formatHtml(array[x]);
        console.log(html);
        appendTo(html);
    }
}

function formatHtml(amiibo) {
    var amiiboSeries = amiibo.amiiboSeries;
    var character = amiibo.character;
    var series = amiibo.gameSeries;
    var pic = amiibo.image;
    var name = amiibo.name;

    var r = amiibo.release;
    var releaseAu = r.au;
    var releaseEu = r.eu;
    var releasejp = r.jp;
    var releaseNa = r.na;
    return `
            <div class="row amiibo">
                <div class="col amiibo-pic">
                    <img src="${pic}" alt="${name}">
                </div>
                <div class="col amiibo-info">
                    <table>
                        
                            <tr>
                                <th>Name</th>
                                <th>Series</th>
                                <th>Release dates</th>
                            </tr>
                        
                        <tbody>
                            <tr>
                                <td><b>${name}</b></td>
                                <td>${series}</td>
                                <td><b>AU</b>  ${releaseAu}  <b>AU</b>  ${releaseEu}  <b>JP</b>  ${releasejp}  <b>NA</b>  ${releaseNa} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
      `;
}

function appendTo(html) {
    $(".amiibo-content").append(html);
}

function data() {
    return testData.amiibo;
}
