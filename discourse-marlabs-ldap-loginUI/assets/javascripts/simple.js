$(document).ready(function(){
  var errorMessage = $("<div>").css("background-color", "#f2ab9a");
  var oldButton = $(".login-button");
  var loginButton = $("<button></button>");
  
  loginButton.html(oldButton.html());
  loginButton.attr("class", oldButton.attr("class"));
  
  oldButton.after(loginButton);
  oldButton.hide();
  $('.ember-view.d-header').css('z-index', 0);

  $(".login-button").click(function(event){
    event.preventDefault();
    $.ajax({
      'url' : '/auth/ldap',
      'type' : 'GET',
      'success' : function(data) {              
        $('<div id="dialogContainer"/>').html(data).dialog({
          modal: true,
          title: "Login to Continue",
          width: 400,
          height: 250});
        $('.ui-dialog-titlebar').css('background-color', '#0088cc');
        $(".ui-dialog-titlebar-close").html("X");
        $("#dialogContainer").prepend(errorMessage);
      },
      'error' : function(request,error)
      {
        alert("Error: Something went wrong");
      }
    });
  });


  $(document).on('click','#ldap-submit',function(event){
    errorMessage.hide().text("");

    $(".ui-dialog-title").html("Please Wait..");
      $.ajax({
        'url' : '/auth/ldap/callback',
        'type' : 'post',
        'data' : $("#ldap-form").serialize(),
        'success' : function(data) { 
          $(".ui-dialog-title").html("Redirecting..");
          location.reload();          
        },
        'error' : function(request,error)
        {
          errorMessage.show().text("Invalid Credentials");
          $(".ui-dialog-title").html("Login to Continue");
        }
    });
  })
});