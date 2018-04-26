$(function() {
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var newState = !$(this).data("neweat");

        var newBurgerState = {
            devoured: newState
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function() {
                console.log("Changed state to", newState);
                location.reload()
            }
        );
    });

    $("#get-burger-btn").on("click", function (event) {
        event.preventDefault();

        var newBurger = {
            burgerName: $("#burger").val(),
            devoured: $("[name=devoured]:checked").val()
        };
        console.log("About to ask for new burger", newBurger);


        $.ajax("/api/burgers", {
            type: "POST",
            data:newBurger
        }).then(
            function(res) {
                console.log("Created new burger", res);
                location.reload()
            }
        );
    });
});