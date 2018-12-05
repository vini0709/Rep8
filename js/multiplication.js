/*
  File: /~vini0709/Rep8/multiplication.js
  91.461 GUI Programming I  Assignment# 8:  Using the jQuery UI Slider and Tab Widgets
  Vinishaben Patel, Umass Lowell Computer Science, Vinishaben_Patel@student.uml.edu
  Copyright (c) 2018 by Vinishaben Patel. All rights reserved.
  updated by VP on December 4, 2018 at 10:00 PM
  Description:  this web page use javascript to create dynamic multiplication table from the user's input
*/
"use strict";

$().ready(function(){

  $('#frm').validate({
    // validation rules
    rules : {

      sMultiplier : {
        required: true,
        number: true,
        range: [-10, 10]
      } ,

      eMultiplier : {
        required: true,
        number: true,
        range: [-10, 10]
      } ,

      sMultiplicand : {
        required: true,
        number: true,
        range: [-10, 10]
      } ,

      eMultiplicand : {
        required: true,
        number: true,
        range: [-10, 10]
      }

    }, // ends rules

    // error messages
    messages: {

      sMultiplier : {
        required : function() {
          return " Starting multiplier is required." ;
        } ,
        range : function() {
          return "Enter number between -10 t0 10";
        },
        number : function() {
          return "Please enter valid number" ;
        }
      } ,//sMultiplier

      eMultiplier : {
        required : function() {
          return "Ending multiplier is required." ;
        } ,
        range : function() {
          return "Enter number between -10 to 10";
        },
        number : function() {
          return "Please enter valid number" ;
        }
      }, //eMultiplier

      sMultiplicand : {
        required : function() {
          return "Starting multiplicand is required." ;
        },
        range : function() {
          return "Enter number between -10 to 10";
        },
        number : function() {
          return "Please enter valid number" ;
        }
      } ,//sMultiplicand

      eMultiplicand : {
        required : function() {
          return "Ending multiplicand is required." ;
        },
        range: function() {
          return "Enter number between -10 to 10";
        },
        number : function() {
          return "Please enter valid number" ;
        },
      } //eMultiplicand

    },// messages

    success: function(label) {
      label.addClass("valid");
    },
  }); // ends validate

  /* adopted from https://stackoverflow.com/questions/46778307/slick-jquery-ui-slider-from-input-text-change */
  /*if slider value change updates input value */
  $("#sliderXBegin").slider({
    min: -10,
    max: 10,
    value : $("#xBegin").val(),
    slide: function(e, ui) {
      $("#xBegin").val(ui.value);
      if ($("#frm").valid()) createTable();
    }
  });
  /*if slider value change updates input value */
  $("#sliderXEnd").slider({
    min: -10,
    max: 10,
    value : $("#xEnding").val(),
    slide: function(e, ui) {
      $("#xEnding").val(ui.value);
      if ($("#frm").valid()) createTable();
    }
  });
  /*if slider value change updates input value */
  $("#sliderYBegin").slider({
    min: -10,
    max: 10,
    value : $("#yBegin").val(),
    slide: function(e, ui) {
      $("#yBegin").val(ui.value);
      if ($("#frm").valid()) createTable();
    }
  });
  /*if slider value change updates input value */
  $("#sliderYEnd").slider({
    min: -10,
    max: 10,
    value : $("#yEnding").val(),
    slide: function(e, ui) {
      $("#yEnding").val(ui.value);
      if ($("#frm").valid()) createTable();
    }
  });

  /* syntax adopted from https://stackoverflow.com/questions/12795307/jquery-ui-slider-change-value-of-slider-when-changed-in-input-field */
  /*if input value change updates slider value */
  $("#xBegin").change(function() {
    $("#sliderXBegin").slider("value", $(this).val());
    if ($("#frm").valid()) createTable();
  });
  /*if input value change updates slider value */
  $("#xEnding").change(function() {
    $("#sliderXEnd").slider("value", $(this).val());
    if ($("#frm").valid()) createTable();
  });
  /*if input value change updates slider value */
  $("#yBegin").change(function() {
    $("#sliderYBegin").slider("value", $(this).val());
    if ($("#frm").valid()) createTable();
  });
  /*if input value change updates slider value */
  $("#yEnding").change(function() {
    $("#sliderYEnd").slider("value", $(this).val());
    if ($("#frm").valid()) createTable();
  });

  $('#btn1').on("click", function () {
    if ($("#frm").valid() == false) {
      /* to remove table if old table exists */
      if (document.getElementById("table").hasChildNodes()){
        document.getElementById("table").innerHTML = "";
      }
      return; // if form is not valid prevent from submitting form
    }
    else {
      createTable();
    } //else
  }); // btn

  if(!($('ul').hasChildNodes)){
    $('#myTabs').hide();  // initially hide the div created to store tabs
  }

  $("#myTabs").tabs();
  var num_tabs = 0;
  $('#btn1.tab').on("click", function () {
    if ($("#frm").valid()){ // when save table button clicked, check whether form is valid or not,
      createTab();           // only when form is validated, user can save the table in tab
    }
  });

  /* removes tab by index */
  $("#remove").click(function() {
    var i = parseInt($("#indexNum").val());
    /* syntax adopted from https://stackoverflow.com/questions/21709989/no-such-method-remove-for-tabs-widget-instance */
    $("#myTabs").find( ".ui-tabs-nav li:eq("+i+")" ).remove();
    $("#myTabs").tabs( "refresh" );
  });


  function createTable(){
    if (document.getElementById("table").hasChildNodes()){
      document.getElementById("table").innerHTML = "";
    }
    var sMultiplier = $('#xBegin').val();
    var eMultiplier = $('#xEnding').val();
    var sMultiplicand = $('#yBegin').val();
    var eMultiplicand = $('#yEnding').val();

    var start_row = sMultiplier;
    var start_column = sMultiplicand;
    var end_row = eMultiplier;
    var end_column = eMultiplicand;

    // handles Minimum < Maximum
    if(parseInt(sMultiplier) > parseInt(eMultiplier))
    {
      start_row = eMultiplier;
      end_row = sMultiplier;
    }

    // handles Minimum < Maximum
    if(parseInt(sMultiplicand) > parseInt(eMultiplicand))
    {
      start_column = eMultiplicand;
      end_column = sMultiplicand;
    }

    // create table
    var table =  document.createElement("TABLE");
    // set id for table
    table.setAttribute("id", "myTable");
    // append table to it's placeholder in html
    document.getElementById("table").appendChild(table);

    var i;
    var j;
    var r;
    var s;

    for(i = start_column - 1,  r = 0;  i <= end_column;  i++, r++) {

      var row = table.insertRow(r);

      for(j = start_row - 1,  s = 0; j <= end_row; j++, s++) {

        var cell = row.insertCell(s);

        /* multiplier row*/
        if (r === 0 && s > 0) {
          cell.innerHTML = j;
        }

        /* multiplicand column */
        else if (s === 0 && r > 0) {
          cell.innerHTML = i;
        }

        /* multiplication of corresponding entries */
        else if (s > 0 && r > 0) {
          cell.innerHTML = i * j;
        }

      } // inner for loop end

    }  // outer for loop end

  } // createTable end

  function createTab(){
    num_tabs++;
    $("div#myTabs ul").append("<li><a href='#tab" + num_tabs + "'>Tab" + num_tabs + "</a></li>");
    var t = $('#myTable');
    var d = "<div id='tab" + num_tabs + "'></div>";
    $("div#myTabs").append(d);
    $('div #tab'+num_tabs).append($('#myTable'));
    $('#myTabs').show();
    $("div#myTabs").tabs("refresh");
  } // createTab end
}); // ready end
