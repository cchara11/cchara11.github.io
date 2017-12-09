function validate(nextPage){
    $(function($http){
        var radioButtons = document.getElementsByTagName("input");
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
        for (i = 0; i < radioButtons.length; i++)
        {
            data.answers.push({
                "videoName" : radioButtons[i].id, 
                "answer" : radioButtons[i].checked,
                "scenario" : radioButtons[i].value,
                "session" : ""
            });
        }

        $http.post('/connectAndInsertAnswers', data)
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