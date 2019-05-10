$(function () {
    var URL = 'https://febindrivingschool.000webhostapp.com/febin_driving_school_teacher/index.php/drivingSchool'
    var weekNumberOption = '<option value="">select week number</option>';
    var daysWithCaps = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var days = ['monday','tuesday','wednesday','thursday','friday','saturday'];
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
        var studentName = $( "#studentName option:selected" ).text(),
        weekNumber = $("#weekNumber").val(),
        frequency = $("#frequency").val(),
        studentId = $("#studentName").val(),
        time = $("#time").val(),
        data = {};
        data[studentId] = {};
        data[studentId]["2019-"+weekNumber] = {
            "frequency" : frequency,
            "time" : time
        }
        $('.card').each(function(i, element) {
            var counter = 1;
            data[studentId]["2019-"+weekNumber][daysWithCaps[i]] = {};
            while(counter < 4){
                data[studentId]["2019-"+weekNumber][daysWithCaps[i]]["start_time_slot_"+counter] = "";
                data[studentId]["2019-"+weekNumber][daysWithCaps[i]]["end_time_slot_"+counter] = "";
                if($(element).find("#"+ days[i] +"_available_time_from_"+counter).length != 0){
                    data[studentId]["2019-"+weekNumber][daysWithCaps[i]]["start_time_slot_"+counter] = $(element).find("#"+ days[i] +"_available_time_from_"+counter).val();
                }
                if($(element).find("#"+ days[i] +"_available_time_to_"+counter).length != 0){
                    data[studentId]["2019-"+weekNumber][daysWithCaps[i]]["end_time_slot_"+counter] = $(element).find("#"+ days[i] +"_available_time_to_"+counter).val();
                }
                counter++;
            }
        });
        addSchedule(data,"2019_"+weekNumber);
    });
    
    $(".addNewIntervel").on('click', function(e){
        const day = $(this).prev().attr('day');
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
       getSchedule("2019-"+weekNumber);
    });
    $("#studentName").change(function(){
        var weekNumber = $("#weekNumber").val();
        var studentId = $("#studentName").val();
        if(weekNumber)
            getSchedule("2019-"+weekNumber, studentId);
     });

    $("#schedule").click(function(){
        var weekNumber = $("#weekNumber").val();
        calculateSchedule("2019-"+weekNumber);
    });

    function updateTable(data, week){
        var res = week.split("-");
        week = res[0]+"_"+res[1];
        var table = '';
        var day = 0;
        var result;
        for(var i=0;i<data.length;i++){
            day = 0;
            table += `<tr><td>`+ data[i]['student_name'] +`</td>`
            while(day < 6){
                if(data[i][week] && data[i][week][daysWithCaps[day]]){
                    result = data[i][week][daysWithCaps[day]];
                    table += `<td><div>`+result['start_time_slot_1'] + '-' +result['end_time_slot_1'] +
                            `</div><div>`+ result['start_time_slot_2'] + '-' +result['end_time_slot_2'] +
                            `</div><div>`+ result['start_time_slot_3'] + '-' +result['end_time_slot_3'] +
                            `</div></td>`
                }else{
                    table += "<td></td>"
                }
                day++;
            }  
            table += '</tr>';
        }
        $("#scheduleTable tbody").html(table);
    }
    function updateSchedule(data, week){
        var res = week.split("-");
        week = res[0]+"_"+res[1];
        var day = 0;
        $('.card').each(function(i, element) {
            const day = $(this).find(".card-title").text();
           for(var j=1;j<4;j++){
               if(data[0][week][day]["start_time_slot_"+Number(j+1)]){
                   $(this).find(".addNewIntervel").click();
               }
                $("#"+ days[i] +"_available_time_from_"+j).val(data[0][week][day]["start_time_slot_"+j]);
                $("#"+ days[i] +"_available_time_to_"+j).val(data[0][week][day]["end_time_slot_"+j]);
           }
        });
    }

    function addSchedule(data, week){
        //console.log(JSON.stringify(data));
        var param = {
            data: JSON.stringify(data)
        }
        $.ajax({
            url: URL+'/student_preference',
            type: 'POST',
            data: param,
            datatype: 'json',
            beforeSend: function(){
                loader("start");
            },
            success: function (data) { 
                getSchedule(week);
            },
            error: function (jqXHR, textStatus, errorThrown) { 

            },
            complete: function(){
                loader("stop");
                success("Schedule added successfully");
            }
        });
    }

    function getSchedule(weekNumber,studentId){
        var param = weekNumber;
        if(studentId)
            param += "/"+studentId;
        $.ajax({
            url: URL+"/student_preferrences/"+param,
            type: 'GET',
            datatype: 'json',
            beforeSend: function(){
                loader("start");
            },
            success: function (data) {
                if(studentId && data["data"].length > 0)
                    updateSchedule(data["data"],weekNumber)
                else
                    updateTable(data["data"],weekNumber);
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: function(){
                loader("stop");
            }
        });
    }

    function calculateSchedule(weekNumber){
        var param = {
            week_number: weekNumber
        }
        $.ajax({
            url: URL+'/shuffle',
            type: 'POST',
            data: param,
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
                success("Scheduled successfully");
            }
        });
    }
});