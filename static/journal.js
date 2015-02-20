
$( document ).ready( function() {
  $("#edit_form").hide();
  

   $("#btn").click( function( event ) {
    event.preventDefault();
    add_post();
  });

  function add_post() {
    $.ajax({
      url: "/add",
      type: "POST",
      dataType: 'json',
      data: { "title": $("#title").val(), 'text': $("#text").val()},
      success: success
    });
  }


$("#btn_submit_edit").click( function( event ) {
    update_post();
  });

  function update_post() {
    var id = $("article").attr("id")
    $.ajax({
      url: "/edit",
      type: "POST",
      dataType: 'json',
      data: { "id": id, "title": $("#title").val(), "text": $("#text").val()},
      success: upd_success
    });
  }
  function upd_success( response ) {
    $("#btn_submit_edit").trigger('reset');
    var template = "<div class='detailForm'>"+
                    "<article id='{{id}}'>"+
                    "<h1 class='headingLink'>{{title}}</h1>"+
                    "<p><small>{{created}}</small></p>"+
                    "<div>{{{text}}}</br></br>"+
                    "<hr class='titleDivider'>"+
                    "</div></article></div>";
    var updated = Mustache.render(template, response);
    $(".edit_detail").after(updated);
    $(".edit_detail").hide('slow');
  }

$("#btn_edit_post").on("click", function() {
    $("#edit_detail").hide(1500);
    $("#edit_form").fadeIn(2500);
});
$("#btn_submit_edit").on("click", function() {
    $()
});
});
