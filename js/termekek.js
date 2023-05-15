let itembox = $( "#itembox" );
let button = $( "#submit_b" );

$(document).ready(function() {
    getdata();
});

$("#search_form").submit((e) => {
    e.preventDefault();

    console.log("Küldés...");
    
    button.html("Folyamatban...");
    button.prop( "disabled", true);

    getdata();

    button.html("Keresés!");
    button.prop( "disabled", false);
  
});

function getdata()
{
    let name = $('input[id=name]').val();
    let desc = $('input[id=description]').val();
    let minprice = parseInt($('input[id=minprice]').val());
    let maxprice = parseInt($('input[id=maxprice]').val());

    if(isNaN(minprice))
        minprice = 0;
    if(isNaN(maxprice))
        maxprice = 1000000;

    
    $.ajax({
        crossDomain: true,
        url: "http://127.0.0.1:64209/?nev="+name+"&leiras="+desc+"&minar="+minprice+"&maxar="+maxprice,
        type: "GET",
        complete: function(data, status) {
          console.log(status);
          console.log(data);
          let widgets = "";
          if(status == "success")
          {
            jsondata = JSON.parse(data.responseText);
            console.log(jsondata);
            for(var k in jsondata) {
                widgets += '<div class="card mt-3 text-center shadow-sm border-warning mx-auto" style="max-width: 23em; min-height: 25em">'+
                '<div class="row">'+
                    '<div class="col-lg mt-1 mb-1">'+
                        '<img src="../img/'+jsondata[k].img+'" class="card-img">'+
                    '</div>'+
                    '<div class="col-lg mt-1 mb-1">'+
                        '<div class="card-body">'+
                            '<h5 class="card-title"><strong><span>'+jsondata[k].Nev+'</span></strong></h5>'+
                            '<p class="card-text text-muted">Cikkszám: <strong><span>'+jsondata[k].Cikkszam+'</span></strong></p>'+
                            '<p class="card-text text-muted">Ár: <strong><span>'+jsondata[k].Ar+'</span> Lei</strong></p>'+
                        '</div>'+
                        '<div class="card-footer bg-transparent border-0">'+
                            '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modal_'+jsondata[k].Cikkszam+'">Leírás</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="modal fade" id="modal_'+jsondata[k].Cikkszam+'" tabindex="-1" role="dialog" aria-labelledby="'+jsondata[k].Cikkszam+'" aria-hidden="true">'+
                    '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">'+
                                '<h5 class="modal-title" id="'+jsondata[k].Cikkszam+'_target">'+jsondata[k].Nev+'</h5>'+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                    '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>'+
                            '<div class="modal-body">'+
                                '<span>'+jsondata[k].Leiras+'</span>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-warning" data-dismiss="modal">Bezár</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            }
            itembox.html(widgets);
          }
          else
          {
            itembox.html("Hiba...");
          }
        }
      });
}
