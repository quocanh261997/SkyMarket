$(document).ready(function () {
    $(".btn-primary").click(function () {
        $("#userError").hide();
        $("#affiliationError").hide();
        $("#commentError").hide();
        $("#carError").hide();
        $("#colorError").hide();
        var comment=$("#comment").val();
        if($("#user").val().length < 3){
            $("#userError").show();
        }
        else if($("#affiliation").val()===''){
            $("#affiliationError").show();
        }
        else if(comment.includes("<")&&comment.includes(">")&&comment.split(" ").length-1<=2){
            $("#commentError").show();
        }
        else if($("#car").val().length === 0){
            $("#carError").show();
        }
        else if($("#color").val()===''){
            $("#colorError").show();
        }
        else{
            var dataSent = {
                user: $("#user").val().trim(),
                affiliation: $("#affiliation").val(),
                comment: $("#comment").val(),
                car: $("#car").val(),
                color: $("#color").val()
            }
            postAPI(dataSent)
        }
    })

    const postAPI = data => {
        var data = $.post({
            url:
                "http://ceclnx01.cec.miamioh.edu/~castroa/cse383/homework08/form-ajax.php",
            data: data,
            success: function(data) {
                var user = data.user;
                var affil = data.affiliation;
                var comment = data.comment;
                var car = data.car;
                var color = data.color;
		console.log(data);
                $("form").hide();
                var table = $(
                    "<table id='res' class='table table-striped'>\
                    <thead>\
                    <tr><th scope='col'>Variable</th><th scope='col'>Value</th></tr>\
                    </thead>\
                    <tbody>\
                    <tr><td>User</td><td>" + user + "</td></tr>\
                    <tr><td>Affiliation</td><td>" + affil + "</td></tr>\
                    <tr><td>Comment</td><td>" + comment + "</td></tr>\
                    <tr><td>Car</td><td>" + car + "</td></tr>\
                    <tr><td>Color</td><td>" + color + "</td></tr>\
                    </tbody>\
                    </table>"
                );
                var button = $(
                    "<button type='button' class='btn btn-secondary' id='restore'>Restore</button>"
                );
                $(".container").append(table);
                $(".container").append(button);
                $("#restore").on("click", function() {
                    $("#res").remove();
                    $("form").show();
                    $(this).remove()
                })
            },
            error: function(err) {
                alert(
                    "Error. Please resubmit"
                )
            }
        })
    }
});
