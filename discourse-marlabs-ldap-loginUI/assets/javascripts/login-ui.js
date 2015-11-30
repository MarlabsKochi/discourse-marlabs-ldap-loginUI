$(document).ready(function(){
  $('#discourse-modal').on('shown.bs.modal', function() {
    $("#discourse-modal").find("*").removeClass("ember-view");
    $( ".modal-footer" ).find( "button" ).removeAttr("data-ember-action");
    $("#login-buttons").css("display", "none");
    $("#forgot-password-link").css("display", "none");
    $("#login-account-name").unbind().keyup(function(e){
      if (e.keyCode === 13){
        submitLoginForm();
      }
    });
    $("#login-account-password").unbind().keyup(function(e){
      if (e.keyCode === 13){
        submitLoginForm();
      }
    });
  })

  $(document).on('click',function(event, loginModal){
    if($(event.currentTarget.activeElement).find("i").hasClass("fa fa-unlock") && $(event.currentTarget.activeElement).text().trim() === "Log In"){
      submitLoginForm()
    }
  })

  function submitLoginForm(){
    $("#modal-alert").addClass("alert alert-info").text("Please wait..").css("display", "block")
      $.ajax({
        'url' : '/auth/ldap/callback',
        'type' : 'post',
        'data' :{username : $("#login-account-name").val(), 
                 password : $("#login-account-password").val()},
        'success' : function(data, textStatus, xhr) { 
          $("#modal-alert").text("Success!.Redirecting..");
          location.reload();          
        },
        'error' : function(request,error)
        {
          $("#modal-alert").removeClass("alert-info").addClass("alert-error").text("Incorrect Username or Password");
        }
    });
  }
 
});