
$(function () {
    var URL = 'https://febindrivingschool.000webhostapp.com/febin_driving_school_teacher/index.php/drivingSchool'
    
    function createDataList(student){
        var student_list = student.data;
        var student_list_table = '<option value="">Select student</option>';
        for(var i=0;i<student_list.length;i++){
            student_list_table +=  '<option value="'+ student_list[i].id +'">'+ student_list[i].name +'</option>'
        }
        $("#studentName").html(student_list_table);
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
                createDataList(data);
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
    loadStudendList();
})