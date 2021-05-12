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
        if(typeof status[key] === 'object'){
            html += key+':' + '<div style="padding-left: 10px">'+ parse(status[key]) + '</div>';
        }else{
            html += key+': '+status[key]+'<br>';
        }
    }

    return html;
}

function checkStatus(obj){
    let url = $(obj).attr('href');

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

        $(obj).find('.card-body').html(parse(info.content));
        $(obj).find('.badge').text(info.ping + " ms");
    }).fail(function (response, status, xhr) {
        $(obj).removeClass('bg-light');
        $(obj).removeClass('bg-success');
        $(obj).removeClass('text-white');

        $(obj).addClass('bg-danger');
        $(obj).addClass('text-white');

        $(obj).find('.card-body')
            .html('')
            .append(status+': '+xhr+'<br>')
            .append(parse(response.hasOwnProperty('responseJSON') ? response.responseJSON.content : ""));

        $(obj).find('.badge').text(response.hasOwnProperty('responseJSON') ? response.responseJSON.ping + " ms" : "-");
    }).always(function(){
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
