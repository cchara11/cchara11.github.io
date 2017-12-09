function validate(nextPage){
    $(function($http){
        var radioData = document.getElementsByTagName("input");
        // for (i = 0; i < radioButtons.length; i+=2)
        // {
        //     if (radioButtons[i].checked || radioButtons[i+1].checked)
        //     {
        //         continue;
        //     }
        //     alert("Please fill an answer for scenario " + radioButtons[i].value);
        //     return;
        // }

        var data = {
            answers:[]
        };
        for (i = 0; i < radioData.length; i++)
        {
            data.answers.push({
                "videoName" : radioData[i].id, 
                "answer" : radioData[i].checked,
                "scenario" : radioData[i].value,
                "session" : ""
            });
        } 

        $http.get('/connectAndInsertAnswers', data)
            .success(
                function(success)
                {
                    console.log(success)
                })
            .error(
                function(error)
                {
                    console.log(error)
                });

        $("#renderPage").load(nextPage);
    });
}