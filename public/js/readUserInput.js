function validate(nextPage){
    $(function($http){
        var radioData = document.getElementsByTagName("input");
        // for (i = 0; i < radioData.length; i+=2)
        // {
        //     if (radioData[i].checked || radioData[i+1].checked)
        //     {
        //         continue;
        //     }
        //     alert("Please fill an answer for scenario " + radioData[i].value);
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
                "scenario" : radioData[i].value
            });
        } 

        var data2 = {
            answers2:[]
        };
        for (i = 0; i < radioData.length; i++)
        {
            data2.answers2.push({
                "videoName" : radioData[i].id, 
                "answer" : "triastera"
            });
        } 

        $http.get('/connectAndInsertAnswers', data2)
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