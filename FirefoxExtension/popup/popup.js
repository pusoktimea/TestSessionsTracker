//when the extension is loaded, this function will hide the content of the session elements,
  //which has to be displayed just after click on the "Start Session" button. 
  $(document ).ready(function(){
    $('#session').hide();

      
  //when "Start Session" button is clicked the function will show the session elements
  //and hide the div with the informations about area charter tester and environment 

    $(function() {
      $('#startSessionButton').click(function(){
        $('#session').show();
        $('#generalInfo').hide();
        
      });
    });


    //navigate between textboxes after starting the session,using up-down arrows
   var first_element=$("#textboxes li:first-child");
   var last_element=$("#textboxes li:last-child");

   

  $('.target').keydown(function(e){
    if (e.keyCode !== 39 && e.keyCode !== 37) {
      return;
    }


    var current_div=$("#textboxes li:visible");
    var current_function=current_div.attr("data-function");

    if (e.keyCode == 39) { 
      current_div = current_div.next();
      if(current_div.length === 0) {
        current_div = first_element;
      }
    } else if(e.keyCode == 37){
      current_div = current_div.prev();
      if(current_div.length === 0) {
        current_div = last_element;
      }
    }

    var next_function=current_div.attr("data-function");
    $("#session").addClass(next_function).removeClass(current_function);

    current_div.find('input').val('').focus();
  });
//navigation ends

 });





    

