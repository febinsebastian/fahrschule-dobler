$(function() {
    $("#submitBtn").click(function() {
        var name = $("#studentName").val();
        var date = $("#myModal").attr("date");
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        var event =  {
            id     : new Date().getTime(),
            title  : name,
            start  : date+"T"+startTime,
            end    : date+"T"+endTime,
            allDay : false
        };
        var eventsArray = [];
        if(localStorage.getItem("eventsArray"))
            eventsArray = JSON.parse(localStorage.getItem("eventsArray"));
        eventsArray.push(event);
        localStorage.setItem("eventsArray",JSON.stringify(eventsArray));
        $('#calendar').fullCalendar("renderEvent",event);
        $("#myModal").modal('hide');
      });

      $("#deleteBtn").click(function(){
          if(confirm("Are you want to delete ?")){
            var eventsArray = [];
            if(localStorage.getItem("eventsArray"))
                eventsArray = JSON.parse(localStorage.getItem("eventsArray"));
            var id = $("#myModal").attr("eventId");
            for(var i = 0; i<eventsArray.length; i++){
                if(eventsArray[i]['id'] == id){
                    eventsArray.splice(i, 1);
                    break;
                }
            };
            $('#calendar').fullCalendar("removeEvents",id);
            localStorage.setItem("eventsArray",JSON.stringify(eventsArray));
            $("#myModal").modal('hide');
          }
      });
});