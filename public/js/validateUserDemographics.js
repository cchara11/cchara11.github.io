function validate(nextPage){
    $(function($http){
        var ageGroup = document.getElementById("age");
        var gender = document.getElementById("gender");
        var education = document.getElementById("education");

        if (ageGroup.value === "")
        {
            alert("Please provide your age group");
            return;
        }

        if (gender.value === "")
        {
            alert("Please provide your gender");
            return;
        }

        if (education.value === "")
        {
            alert("Please provide your education level");
            return;
        }

        var data = {
            demographics:[]
        };
        data.demographics.push({
            "ageGroup" : ageGroup.value, 
            "gender" : gender.value,
            "education" : education.value
        });

        $http.get('/connectAndInsertDemographics', data)
            .success(
                function(success)
                {
                    console.log(success);
                })
            .error(
                function(error)
                {
                    console.log(error);
                });

        $("#renderPage").load(nextPage);
    });
}