$(document).ready(function(){

    var Note_Length,BPM,BPMe,time=0,timeout,i=0,press=0;

    function getTime()
    {
        Note_Length = $("#Note_Length").prop('selectedIndex');
        BPM = parseInt($("#bpm").val());
        BPMe = parseInt($("#bpme").val());
        return ((60/BPM)/Math.pow(2,Note_Length))*1000;
    }

    function controlsInit() {

      $(".beat").click(function() {
        switch (this.className) {
          case "beat":
            this.className="beat accent";
            break;
          case "beat accent":
            this.className="beat rest";
            break;
          case "beat rest":
            this.className="beat";
            break;
        }
      });

    }

    $(window).keypress(function(e)
    {
      e.which === 32?(press==0?start():stop()):null;
    });

    $(window).keydown(function(e)
    {
      switch (e.which)
      {
        case 37:
          $("#bpme").get(0).value--;
          BPMEChange($("#bpme"));
          break;

        case 38:
          $("#bpm").get(0).value++;
          break;

        case 39:
          $("#bpme").get(0).value++;
          BPMEChange($("#bpme"));
          break;

        case 40:
          $("#bpm").get(0).value--;
          break;
        }
      });

    function start()
    {
      $(".stop,.start").toggle();
      metronome();
      press=1;
    }

    function stop()
    {
      clearTimeout(timeout);
      $(".stop,.start").toggle();
      $(".beat").css("color","white");
      i=0;
      press=0;
    }

    function BPMEChange(BPMEelement)
    {
      $("#beatholder").html("");

      for(var i=1;i<=BPMEelement.val();i++)
      {
        $("#beatholder").append("<li class=\"beat\"><h1>"+i+"</h1></li>");
      }

      document.getElementsByClassName("beat")[0].className = "beat accent";

      controlsInit();
    }

    function metronome()
    {
        var snare = new Audio("snare.wav");
        var kick = new Audio("kick.wav");
        var beat = document.getElementsByClassName("beat")[i];

        beat.style.color = "#333333";

        switch(beat.className)
        {
            case "beat accent":
              kick.play();
              break;
            case "beat rest":
              break;
            default:
              snare.play();
        }
        i==BPMe-1?i=0:i++;
        timeout = setTimeout(function() {
            beat.style.color = "white";
            metronome();
        }, getTime());

    }

    $(".start").click(function(){
      start();
    })

    $(".stop").click(function(){
      stop();
    })

    $(".tap").click(function(){
      var t = new Date();
      var bpmtap = Math.floor(60000/(t.getTime()-time));
      bpmtap<=400?$("#bpm").val(bpmtap):$("#bpm").val(400);
      time = t;
    });

    $('#bpme').bind('input',function(){
        BPMEChange($(this));
    });

    controlsInit();

});
