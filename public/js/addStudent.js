$(function () {
    const URL = 'https://febindrivingschool.000webhostapp.com/febin_driving_school_teacher/index.php/drivingSchool';
    //var student = {"status":true,"data":[{"id":"2","name":"Jerin","email":"jerinjoshy1@gmail.com","mobile":"9567376700"},{"id":"3","name":"Febin","email":"febin@gmail.com","mobile":"123456789"},{"id":"4","name":"dfwd","email":"febinchemperi@gmail.com","mobile":"9916799370"},{"id":"5","name":"ewew","email":"sd@www.dd","mobile":"2323232332"},{"id":"6","name":"sd","email":"febines12@gmail.com","mobile":"1234567890"},{"id":"7","name":"febnin","email":"fsdd@ksklf.jf","mobile":"9848574565"},{"id":"8","name":"sd","email":"febinchemperi@gmail.com","mobile":"1111111111"}]};
    updateList();
    
    //Onclick on the Add Student Button following function will execute
    $('#addStudent').on('click', function(e) {
        e.preventDefault();
        var studentName = $("#studentName").val(),
        email = $("#email").val(),
        mobile = $("#mobile").val(),
        data = {
            "name": studentName,
            "email": email,
            "mobile":mobile
        };
        addStudend(data);
    });
    //Onclick on the Edit Button following function will execute
    $(".editStudent").on("click", function(e){
        e.preventDefault();
        var studentObj = JSON.parse($(this).attr('studentObj'));
        $("#studentName").val(studentObj.name);
        $("#email").val(studentObj.email);
        $("#mobile").val(studentObj.mobile);
    })
    //Onclick on the Delete Button following function will execute
    $(".deleteStudent").on("click", function(e){
        e.preventDefault();
        
    })
    // API call to add the student
    function addStudend(data){
        $.ajax({
            url: URL+'/create_student',
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
                loadStudendList();
            }
        });
    }

    function loadStudendList(){
        $.ajax({
            url: URL+'/student_list',
            type: 'GET',
            datatype: 'json',
            beforeSend: function(){
                loader("start");
            },
            success: function (data) { 
                console.log(data);
                updateList(data);
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

    function updateList(student){
        var student_list = student.data;
        var student_list_table = '';
        for(var i=0;i<student_list.length;i++){
            student_list_table +=  `<tr student_id="`+ student_list[i].id +`">
            <td>`+ student_list[i].name +`</td>
            <td>`+ student_list[i].email +`</td>
            <td><button class="btn btn-primary editStudent"  studentObj='` + JSON.stringify(student_list[i]) + `'>Edit</button></td>
            <td><button class="btn btn-danger deleteStudent" >Delete</button></td>
          </tr>`
        }
        $(".student_table tbody").html(student_list_table);
       
    }
});