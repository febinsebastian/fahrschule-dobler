$(function () {
    var URL = 'https://febindrivingschool.000webhostapp.com/febin_driving_school_teacher/index.php/drivingSchool'
    var weekNumberOption = '<option value="">select week number</option>';
    for(var j=1;j<53;j++){
        var start = moment().day("Monday").week(j);
        var end = moment().day("Saturday").week(j);
        weekNumberOption += '<option value="'+ j +'">'+ j + ' - ' + start.format('MMM-DD-YYYY') +' to '+ end.format('MMM-DD-YYYY')+'</option>'
    }
    $('#weekNumber').append(weekNumberOption);
    $("#submitBtn").click(function () {
        var name = $("#studentName").val();
        var date = $("#myModal").attr("date");
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        var event = {
            id: new Date().getTime(),
            title: name,
            start: date + "T" + startTime,
            end: date + "T" + endTime,
            allDay: false
        };
        var eventsArray = [];
        if (localStorage.getItem("eventsArray"))
            eventsArray = JSON.parse(localStorage.getItem("eventsArray"));
        eventsArray.push(event);
        localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
        $('#calendar').fullCalendar("renderEvent", event);
        $("#myModal").modal('hide');
    });

    $("#deleteBtn").click(function () {
        if (confirm("Are you want to delete ?")) {
            var eventsArray = [];
            if (localStorage.getItem("eventsArray"))
                eventsArray = JSON.parse(localStorage.getItem("eventsArray"));
            var id = $("#myModal").attr("eventId");
            for (var i = 0; i < eventsArray.length; i++) {
                if (eventsArray[i]['id'] == id) {
                    eventsArray.splice(i, 1);
                    break;
                }
            };
            $('#calendar').fullCalendar("removeEvents", id);
            localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
            $("#myModal").modal('hide');
        }
    });
    $("#scheduleForm").on('submit', function(e) {
        e.preventDefault();
        var days = ['monday','tuesday','wednesday','thursday','friday','saturday'];
        var studentName = $( "#studentName option:selected" ).text(),
        weekNumber = $("#weekNumber").val(),
        frequency = $("#frequency").val(),
        studentId = $("#studentName").val(),
        time = $("#time").val(),
        data = {
            "student_id" : studentId,
            "student_name" : studentName,
        };
        data["2019_"+weekNumber] = {
            "frequency" : frequency,
            "time" : time
        }
        $('.card').each(function(i, element) {
            var counter = 1;
            data["2019_"+weekNumber][days[i]] = {};
            while(counter < 4){
                data["2019_"+weekNumber][days[i]]["start_time_slot_"+counter] = "";
                data["2019_"+weekNumber][days[i]]["end_time_slot_"+counter] = "";
                if($(element).find("#"+ days[i] +"_available_time_from_"+counter).length != 0){
                    data["2019_"+weekNumber][days[i]]["start_time_slot_"+counter] = $(element).find("#"+ days[i] +"_available_time_from_"+counter).val();
                }
                if($(element).find("#"+ days[i] +"_available_time_to_"+counter).length != 0){
                    data["2019_"+weekNumber][days[i]]["end_time_slot_"+counter] = $(element).find("#"+ days[i] +"_available_time_to_"+counter).val();
                }
                counter++;
            }
        });
        addSchedule(data);
    });
    
    $(".addNewIntervel").on('click', function(e){
        var days = ['monday','tuesday','wednesday','thursday','friday','saturday'];
        var day = $(this).prev().attr('day');
        var intervel = $(this).prev().attr('intervel');
        var i = days.indexOf(day);
        if(i != -1 && intervel < 3){
            intervel++;
            var labelFrom = '<div class="col-sm-6"><label for="'+days[i]+'_available_time_from_'+ intervel +'">From</label>',
            inputFrom = '<input type="time" class="form-control" id="'+ days[i] +'_available_time_from_'+ intervel +'" placeholder="Time"></div>',
            labelTo  = '<div class="col-sm-6"><label for="'+ days[i] +'_available_time_to_'+ intervel +'">To</label>',
            inputTo = '<input type="time" class="form-control" id="'+ days[i] +'_available_time_to_'+ intervel +'" placeholder="Time"></div>';
            
            var intervelElement = '<div class="form-group row" intervel="'+ intervel +'" day="'+ days[i] +'">'+ labelFrom + inputFrom + labelTo + inputTo +'</div>';
            $(this).prev().after(intervelElement);
        }
    });

    $("#weekNumber").change(function(){
       var weekNumber = $("#weekNumber").val();
       getSchedule("2019_"+weekNumber)
      });

    function addSchedule(data){
        //$.post(URL+'/student_preference',data, function(data){});
        $.ajax({
            url: URL+'/student_preference',
            type: 'POST',
            data: data,
            datatype: 'json',
            beforeSend: function(){
                loader("start");
            },
            success: function (data) { 
                
            },
            error: function (jqXHR, textStatus, errorThrown) { 

            },
            complete: function(){
                loader("stop");
                success("Student added successfully");
            }
        });
    }

    function getSchedule(param){
        $.get(URL+"/student_preferrences", function(data, status){
            console.log(data);
          });
    }
});