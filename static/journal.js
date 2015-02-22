
$( document ).ready( function() {
  $("#edit_form").hide();

  function add_post() {
    $.ajax({
      url: "/add",
      type: "POST",
      dataType: 'json',
      data: { "title": $("#title").val(), 'text': $("#text").val()},
      success: success
    });
  }

  $("#btn").click( function( event ) {
    event.preventDefault();
    add_post();
  });

  function upd_success( response ) {
    var template = "<div class='detailForm'>"+
                    "<article id='{{id}}'>"+
                    "<h1 class='headingLink'>{{title}}</h1>"+
                    "<p><small>{{created}}</small></p>"+
                    "<div>{{{text}}}</br></br>"+
      "<button class='btn edit_post'>Edit Post</button>"+
                    "</div></article></div>";
    var updated = Mustache.render(template, response);
    $("#edit_detail").html(updated);
    $("#edit_form").hide(100);
    $("#edit_detail").fadeIn(100);


  }

  function update_post() {
    var id = $("article").attr("id");
    $.ajax({
      url: "/edit",
      type: "POST",
      dataType: 'json',
      data: { "id": id, "title": $("#title").val(), "text": $("#text").val()},
      success: upd_success
    });
  }

  $("button.submit_edit").click( function( event ) {
    event.preventDefault();
    update_post();
  });

  $("button.edit_post").on("click", function() {
    $("#edit_detail").hide(1500);
    $("#edit_form").fadeIn(2500);
  });
});