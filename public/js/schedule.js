
$(function () {
    var student = {"status":true,"data":[{"id":"2","name":"Jerin","email":"jerinjoshy1@gmail.com","mobile":"9567376700"},{"id":"3","name":"Febin","email":"febin@gmail.com","mobile":"123456789"},{"id":"4","name":"dfwd","email":"febinchemperi@gmail.com","mobile":"9916799370"},{"id":"5","name":"ewew","email":"sd@www.dd","mobile":"2323232332"},{"id":"6","name":"sd","email":"febines12@gmail.com","mobile":"1234567890"},{"id":"7","name":"febnin","email":"fsdd@ksklf.jf","mobile":"9848574565"},{"id":"8","name":"sd","email":"febinchemperi@gmail.com","mobile":"1111111111"}]};

    function createDataList(){
        var student_list = student.data;
        var student_list_table = '';
        for(var i=0;i<student_list.length;i++){
            student_list_table +=  '<option value="'+ student_list[i].id +'">'+ student_list[i].name +'</option>'
        }
        $("#studentName").html(student_list_table);
    }
    createDataList();
})