let template = Handlebars.compile(`
    {{#each grupo}}
        <h3>{{nomGrupo}}</h3>
        <div class="card-deck mb-3">
            {{#each host}}
                <a target="_blank" href="{{desUrl}}" class="card bg-light">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <strong>{{nomHost}}</strong>
                        <span class="badge badge-light">-</span>
                    </div>
                    <div class="card-body">
                        Obtendo informações
                    </div>
                </a>
            {{/each}}
        </div>
    {{/each}}
    `);

function parse(status){
    let html = "";

    if(!status){
        return html;
    }

    for(let key in status){
        html += key+': '+status[key]+'<br>';
    }

    return html;
}

function checkStatus(obj){
    let url = $(obj).attr('href');

    let initTime = (new Date()).getTime();

    $.ajax({
        "type": "GET",
        "dataType": "json",
        "url": "proxy.php?url=" + encodeURIComponent(url),
    }).done(function(info){
        $(obj).removeClass('bg-light');
        $(obj).removeClass('bg-danger');
        $(obj).removeClass('text-white');

        $(obj).addClass('bg-success');
        $(obj).addClass('text-white');

        $(obj).find('.card-body').html(parse(info));
    }).fail(function (response, status, xhr) {
        $(obj).removeClass('bg-light');
        $(obj).removeClass('bg-success');
        $(obj).removeClass('text-white');

        $(obj).addClass('bg-danger');
        $(obj).addClass('text-white');

        $(obj).find('.card-body')
            .html('')
            .append(status+': '+xhr+'<br>')
            .append(parse(response.responseJSON));
    }).always(function(){
        let totalTime = (new Date().getTime()) - initTime;

        $(obj).find('.badge').text(totalTime + " ms");

        window.setTimeout(function () {
            checkStatus(obj);
        }, 10000);
    });
}

$.ajax({
    "type": "GET",
    "dataType": "json",
    "url": "config.json"
}).done(function(data){
    $('#content').html(template(data));
    $('#content .card').each(function(){
        checkStatus($(this));
    });
});
