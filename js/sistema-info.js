let template = Handlebars.compile(`
    {{#each grupo}}
        <h3>{{nomGrupo}}</h3>
        <div class="card-deck">
            {{#each host}}
                <div desUrl="{{desUrl}}" class="card bg-light">
                    <div class="card-body">
                        <h5 class="card-title">{{nomHost}}</h5>
                        <ul class="card-text">
                            <li>Obtendo informações</li>
                        </ul>
                    </div>
                </div>
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
        html += '<li>'+key+': '+status[key]+'</li>';
    }

    return html;
}

function checkStatus(obj){
    let url = $(obj).attr('desUrl');

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

        $(obj).find('.card-text').html(parse(info));
    }).fail(function (response, status, xhr) {
        $(obj).removeClass('bg-light');
        $(obj).removeClass('bg-success');
        $(obj).removeClass('text-white');

        $(obj).addClass('bg-danger');
        $(obj).addClass('text-white');

        $(obj).find('.card-text')
            .html('')
            .append('<li>'+status+': '+xhr+'</li>')
            .append(parse(response.responseJSON));
    }).always(function(){
        console.log("talkey");
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
