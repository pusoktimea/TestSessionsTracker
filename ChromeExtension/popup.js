  //when the extension is loaded, this function will hide the content of the session elements,
  //which has to be displayed just after click on the "Start Session" button.
var remoteURL = "http://127.0.0.1:3000";

$(function() {
  var progressInterval;

  $('#generalInfo').hide();
  $('#session').hide();

  $.get(remoteURL + "/newsession", function(data) {
      showSession();
  }).fail(function() {
      hideSession();
  });

  //when "Start Session" button is clicked the function will show the session elements
  //and hide the div with the informations about area charter tester and environment

  $('#startSessionButton').click(function(){
    $('#generalInfo').hide();

    $.ajax(remoteURL + "/newsession", {
      data: JSON.stringify({
          area: $('#areaInput').val(),
          environment: $('#environmentInput').val(),
          charter: $('#charterInput').val(),
          tester: $('#testerInput').val(),
          duration: $('input[name="duration"]:checked', '#sessionDuration').val(),

      }),
      contentType: "application/json",
      type: "POST",
      success: function() {
          showSession();
      }
    }).fail(function() {
      alert("Error on sending data");
      //div pt a deriderctiona
    });
  });


    //navigate between textboxes after starting the session,using up-down arrows
   var first_element=$("#textboxes li:first-child");
   var last_element=$("#textboxes li:last-child");

   $('.target').keydown(function (e) {
     console.log(e.keyCode);

     if(e.keyCode == 13){
     //  $( "#target" ).submit();

       $.ajax(remoteURL + "/newitem",{
         data: JSON.stringify({
           type: $(this).attr("placeholder"),
           description: $(this).val(),
         }),
         contentType:"application/json",
         type: "POST",
         success: function() {
          $('.target').val('').focus();
         }
       }).fail(function() {
         alert("Error on sending data");
         //div pt a deriderctiona
       });
     }
   });

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

  $('#stopSessionButton').click(function(){
    	hideSession();

     $.ajax(remoteURL + "/updatesession",{
           type: 'POST',

       });
  });

  function showSession() {
    $('#session').show();
    $('#generalInfo').hide();

    clearInterval(progressInterval);
    progressInterval = setInterval(progress, 1000);
  }

  function hideSession() {
    $('#session').hide();
    $('#generalInfo').show();
    clearInterval(progressInterval);
  }

  function progress() {

       $.get(remoteURL + "/newsession", function(session){

         $("#progressBar").html("");

         for(i=0; i<session.items.length; i++) {
           var item = session.items[i];
           var nextItem = session.items[i+1];

           var startTime = (new Date(item.startTime)).getTime()/1000/60;
           var endTime = new Date();

           if(nextItem && nextItem.startTime) {
             endTime = new Date(nextItem.startTime);
           }
           endTime = endTime.getTime()/1000/60;

           var percent = ((endTime - startTime)/session.duration) * 100;
           var itemWidth = Math.round(percent * 100)/100;

           var $newDiv=$("<div class='itemProgress'/>" );

           $newDiv.css({
             width: itemWidth + "%"
           }).addClass(item.type);

           $("#progressBar").append($newDiv);
         }
       });









   }
//submit by pressing enter the input fields



//icons
// $(function(){
//   $("#input-setup").focus(function(){
//     $(".circle-icon").css("background","red");
//   })
//   .blur(function(){
//     $(this).css("background","transparent");
//   })
 });




//progress bar
// function progress(timeleft, timetotal, $element) {
//     var progressBarWidth = timeleft * $element.width() / timetotal;
//     $element.find('div').animate({ width: progressBarWidth }, 2500).html(timeleft + "");
//     if(timeleft > 0) {
//         setTimeout(function() {
//             progress(timeleft - 1, timetotal, $element);
//         }, 60000);
//     }
// };

// progress(60, 60, $('#progressBar'));


//   });
