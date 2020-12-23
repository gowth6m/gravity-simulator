
$(document).ready(function(){
    // Hide the pause button
    $("#btn-pause").hide();

    $("#btn-run").click(function(){
    // Show pause button and hide simulation settings
        $("#simulation-settings").hide();
        $("#btn-pause").show();
        $("#simulationCanvas").css({"width": "100vw", "height": "100vh", "top": "0", "margin-top": "0"});

        createParticles();
    });

    // Hide pause button and show simulation settings
    $("#btn-pause").click(function(){
        $("#simulation-settings").show();
        $("#btn-pause").hide();
        $("#simulationCanvas").css({"width": "80vw", "height": "80vh", "top": "50%", "margin-top": "-40vh"});
    });
  });