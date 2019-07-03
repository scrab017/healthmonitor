var  function_container = {};
var nfhsPlotEnable = 0;

function plotDynamiCPlot(state, cat){
    
    $("#index_tabs").hide();
    $("#non_index_tabs").hide();
    $("#nfhs_selection").show();
    
    currentCategoryPlot = cat;
    console.log(currentCategoryPlot);
    
    //Check the the category val in id selecetd
    if(currentCategoryPlot.indexOf("fe") != -1){
        $("#ma").prop("checked",false);
        $("#fe").prop("checked",true);
        console.log("Updated True");
        
        $("#pw").prop("disabled",true);
        $("#npw").prop("disabled",true);
    }else{
        $("#fe").prop("checked",false);
    }
    if(currentCategoryPlot.indexOf("ma") != -1){
        $("#fe").prop("checked",false);
        $("#ma").prop("checked",true);
        
        $("#pw").prop("disabled",true);
        $("#npw").prop("disabled",true);
    }else{
        $("#ma").prop("checked",false);
    }
    
    if(currentCategoryPlot.indexOf("ru") != -1){
        $("#ur").prop("checked",false);
        $("#ru").prop("checked",true);
    }else{
        $("#ru").prop("checked",false);
    }
    if(currentCategoryPlot.indexOf("ur") != -1){
        $("#ru").prop("checked",false);
        $("#ur").prop("checked",true);
    }else{
        $("#ur").prop("checked",false);
    }
    
    if(currentCategoryPlot.indexOf("pw") != -1){
        $("#pw").prop("disabled",false);
        $("#npw").prop("disabled",false);
        
        $("#npw").prop("checked",false);
        $("#pw").prop("checked",true);
        $("#ma").prop("disabled",true);
        $("#fe").prop("disabled",true);
    }else{
        $("#pw").prop("checked",false);
        $("#ma").prop("disabled",false);
        $("#fe").prop("disabled",false);
    }
    if(currentCategoryPlot.indexOf("npw") != -1){
        $("#pw").prop("disabled",false);
        $("#npw").prop("disabled",false);
        
        $("#pw").prop("checked",false);
        $("#npw").prop("checked",true);
        $("#ma").prop("disabled",true);
        $("#fe").prop("disabled",true);
    }else{
        $("#npw").prop("checked",false);
         $("#ma").prop("disabled",false);
        $("#fe").prop("disabled",false);
    }
    
    nfhsPlotEnable = 1;
    console.log(state);
    currentStatePlot = "India";
    
    //console.log("This is to be plotted !!!",cat);
    function_container.categoryselect(currentStatePlot, currentCategoryPlot);
}


(function(window, document, $, undefined){
    
    //map variables
var NavigateData = null;
var stateNameData ,Map = null;
var fontSize = 9;
var marginTop_dataLabel = 530;  
var marginLeft_dataLabel = 120;
var legendBox, legendLabel, legendHead,canvas,outlineMap,STATEDistrictName;
var firstLoad = 0;
    


/*To optimize map plotting for district map*/
var IndiaDistrictCanvas = null , IndiaDistrictOutlineMap = null;
    
/*To optimize map plotting for state map*/
var IndiaStateCanvas = null , IndiaStateOutlineMap = null;
    
var tableCheck = {
    districtTable : 0,
    stateTable : 0,
    qualityTable : 0,
    HMISTable : 0
}    
    
var plotCheck = {
    PHC_AVL : 0,
    SC_AVL : 0,
    CHC_AVL : 0,
    SC_ACCESSIBILITY : 0,
    PHC_ACCESSIBILITY : 0,
    CHC_ACCESSIBILITY : 0,
    POPULATION_UPDATE : 0
}
    
var StateMap = null;
var last_selected_opt = null;

var caveat_string_AP = "*The data shown is for Andhra Pradesh and Telangana combined";
var caveat_string_JSY = "*JSY : Janani Suraksha Yojana"

var infoBoxPopulationFontRatio = 2.3;
    
var lastAccess = null;

    
$(".top_nav").on('click',function(){
    if(lastAccess == null ){
        lastAccess = d3.select(this);
    }else{
        lastAccess.style('background','#FFCF1A');
        lastAccess = d3.select(this);
    }
    d3.select(this).style('background','#FFFFFF');
})

fontSize = 9*(window.innerWidth)/screen.width



var stateAPIData = null,STATEDistrictTopo=null,SaveData=null;

var MainHeading = d3.select('#main-head');

//Variables for dynamic Variable input and Map plot
var currentStatePlot = "India", currentCategoryPlot = "SC_AVL",apiVAR,plotVar;

//For Navigation control
//Adding/Removing the dropdown for state/India
var SCDrop = d3.select("#state-variable-sc");
var PHCDrop = d3.select("#state-variable-phc");
var CHCDrop = d3.select("#state-variable-chc");

//For disabling the Sub,Primary, Community centers link when in State Map, as they need to be used for drop downs here
var SCIndiaShortage = d3.select("#India-SC-shortage");
var PHCIndiaShortage = d3.select("#India-PHC-shortage");
var CHCIndiaShortage = d3.select("#India-CHC-shortage");


//Function to fetch the data from the search query link
var user_id=null,session_token = null;

var typeVar = 'SC';

//This is to re-structure the infromation box
$("#sub-info").addClass("col-border");
//$("#sub-info-box").show();

//To show the tabs on category nav and switch when the Index comes
$("#non_index_tabs").show();

/*$("#purchase").on('click',function(){
    window.location.href = "../webProduct/pricing.text?"+(window.location.search).substring(1);
})*/

var mySelectedVar;

var NFHS_DICTIONARY;
//Creating the dropdown for the NFHS category 
    
var data, rowObject, list = "";
d3.csv('./assets/data/nfhs_dictionary.csv',function(err,data){
            var sample = "Say fuck it!!!";
            if(err){
            } 
            else{
               //console.log("NFHS Data : ",data);
                NFHS_DICTIONARY = data;
                //console.log(NFHS_DICTIONARY)
                for( var i=0;i< 73;i++){

                        

                      list   += '<li >'
                                + '<a id="'+ NFHS_DICTIONARY[i].id +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+currentStatePlot+"','"+ NFHS_DICTIONARY[i].id+ "'"+')">'
                                    + NFHS_DICTIONARY[i].Name
                                + '</a>'    
                            + '</li>';

                }
                $("#nfhs_dropdown_list_1").html(list);

                //console.log(list);
                list = "";

                for( var i=73;i< 120;i++){

                      list   += '<li>'
                                + '<a id="'+ NFHS_DICTIONARY[i].id +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+currentStatePlot+"','"+ NFHS_DICTIONARY[i].id+ "'"+')">'
                                    + NFHS_DICTIONARY[i].Name
                                + '</a>'
                            + '</li>';

                }
                $("#nfhs_dropdown_list_2").html(list);

                //console.log(list);
                list = "";

                for( var i=120;i< NFHS_DICTIONARY.length;i++){

                      list   += '<li>'
                                + '<a id="'+ NFHS_DICTIONARY[i].id +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+currentStatePlot+"','"+ NFHS_DICTIONARY[i].id+ "'"+')">'
                                    + NFHS_DICTIONARY[i].Name
                                + '</a>'
                            + '</li>';

                }
                $("#nfhs_dropdown_list_3").html(list);

                //console.log(list);
                list = "";
            }
        });
    
var updatedCategoryPlot = "";
    
$("#ma").on('click',function(){
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("fe","ma");
        //console.log(currentCategoryPlot);
    }
});
    
$("#fe").on('click',function(){
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("ma","fe");
        //console.log(currentCategoryPlot);
    }
});
    
$("#ru").on('click',function(){
    if(currentCategoryPlot.indexOf( "ru" ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("ur","ru");
        console.log(updatedCategoryPlot);
    }
    
    /*if(currentCategoryPlot.indexOf( "rural" ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("urban","rural");
        console.log(updatedCategoryPlot);
    }*/
    
});
    
$("#ur").on('click',function(){
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("ru","ur");
        console.log(updatedCategoryPlot);
    }
    
    /*if(currentCategoryPlot.indexOf( "urban" ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("rural","urban");
        console.log(updatedCategoryPlot);
    }*/
    
});
    
$("#pw").on('click',function(){
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("npw","pw");
        //console.log(currentCategoryPlot);
    }
});
    
$("#npw").on('click',function(){
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("pw","npw");
        //console.log(currentCategoryPlot);
    }
});
    
/*$(".NFSH_CHECKBOX").on('click',function(){
    console.log(currentCategoryPlot);
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already plotted ");
    }
    
    console.log($(this).attr('id'));
}) */

//***************************NFHS Smart Search********************************/
$("#selection_done").on('click',function(){
    
    console.log(updatedCategoryPlot);
    
    if(PlotCategory[updatedCategoryPlot] == undefined){
        console.log("Not Avaiable");
        updatedCategoryPlot = currentCategoryPlot;
        plotDynamiCPlot(currentStatePlot, currentCategoryPlot);
    }else{
        currentCategoryPlot = updatedCategoryPlot;
        plotDynamiCPlot(currentStatePlot, currentCategoryPlot);
    }
    
    //categoryDropDownSelect(currentStatePlot, currentCategoryPlot);
})
$("#search_nfhs_ad").on('keyup',function(){
    //73, 120
    list = "";
    var filter = $(this).val().toUpperCase();
    console.log(filter);
    
    for( var i=0;i< 73;i++){
        if(NFHS_DICTIONARY[i].Name.toUpperCase().indexOf(filter) != -1){
            list   += '<li >'
                            + '<a id="'+ NFHS_DICTIONARY[i].id +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+currentStatePlot+"','"+ NFHS_DICTIONARY[i].id+ "'"+')">'
                                + NFHS_DICTIONARY[i].Name
                            + '</a>'    
                        + '</li>';
        }
    }
    $("#nfhs_dropdown_list_1").html(list);
})
$("#search_nfhs_d").on('keyup',function(){
    //73, 120
    list = "";
    var filter = $(this).val().toUpperCase();
    console.log(filter);
    
    for( var i=73;i< 120;i++){
        if(NFHS_DICTIONARY[i].Name.toUpperCase().indexOf(filter) != -1){
            list   += '<li >'
                            + '<a id="'+ NFHS_DICTIONARY[i].id +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+currentStatePlot+"','"+ NFHS_DICTIONARY[i].id+ "'"+')">'
                                + NFHS_DICTIONARY[i].Name
                            + '</a>'    
                        + '</li>';
        }
    }
    $("#nfhs_dropdown_list_2").html(list);
})
$("#search_nfhs_c").on('keyup',function(){
    //73, 120
    list = "";
    var filter = $(this).val().toUpperCase();
    console.log(filter);
    
    for( var i=120;i< NFHS_DICTIONARY.length;i++){
        if(NFHS_DICTIONARY[i].Name.toUpperCase().indexOf(filter) != -1){
            list   += '<li >'
                            + '<a id="'+ NFHS_DICTIONARY[i].id +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+currentStatePlot+"','"+ NFHS_DICTIONARY[i].id+ "'"+')">'
                                + NFHS_DICTIONARY[i].Name
                            + '</a>'    
                        + '</li>';
        }
    }
    $("#nfhs_dropdown_list_3").html(list);
})
//***************************NFHS Smart Search********************************/
    
//Hover functonality on "State" dropdowns
$("#StateDrop").on('mouseover',function(){
   
    $(this).trigger('click')
})

var PlotCategory = {
    //**********************NFHC NEW Variable DDITION*******//
    "anorexia_fe": {
        "reqVar": [{
            "v": "anorexia_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anorexia_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anorexia_ur_fe": {
        "reqVar": [{
            "v": "anorexia_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anorexia_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anorexia_ru_fe": {
        "reqVar": [{
            "v": "anorexia_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anorexia_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbmi_fe": {
        "reqVar": [{
            "v": "hbmi_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbmi_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbmi_ur_fe": {
        "reqVar": [{
            "v": "hbmi_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbmi_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbmi_ru_fe": {
        "reqVar": [{
            "v": "hbmi_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbmi_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "overweight_fe": {
        "reqVar": [{
            "v": "overweight_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "overweight_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "overweight_ur_fe": {
        "reqVar": [{
            "v": "overweight_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "overweight_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "overweight_ru_fe": {
        "reqVar": [{
            "v": "overweight_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "overweight_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "obese_fe": {
        "reqVar": [{
            "v": "obese_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "obese_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "obese_ur_fe": {
        "reqVar": [{
            "v": "obese_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "obese_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "obese_ru_fe": {
        "reqVar": [{
            "v": "obese_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "obese_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_fe": {
        "reqVar": [{
            "v": "hhemoglobin_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_ur_fe": {
        "reqVar": [{
            "v": "hhemoglobin_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_ru_fe": {
        "reqVar": [{
            "v": "hhemoglobin_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_fe": {
        "reqVar": [{
            "v": "anemia_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_ur_fe": {
        "reqVar": [{
            "v": "anemia_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_ru_fe": {
        "reqVar": [{
            "v": "anemia_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_fe": {
        "reqVar": [{
            "v": "highhemoglobin_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_ur_fe": {
        "reqVar": [{
            "v": "highhemoglobin_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_ru_fe": {
        "reqVar": [{
            "v": "highhemoglobin_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_pw": {
        "reqVar": [{
            "v": "hhemoglobin_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_ur_pw": {
        "reqVar": [{
            "v": "hhemoglobin_ur_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_ur_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_ru_pw": {
        "reqVar": [{
            "v": "hhemoglobin_ru_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_ru_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_pw": {
        "reqVar": [{
            "v": "anemia_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_ur_pw": {
        "reqVar": [{
            "v": "anemia_ur_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_ur_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_ru_pw": {
        "reqVar": [{
            "v": "anemia_ru_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_ru_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_pw": {
        "reqVar": [{
            "v": "highhemoglobin_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_ur_pw": {
        "reqVar": [{
            "v": "highhemoglobin_ur_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_ur_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_ru_pw": {
        "reqVar": [{
            "v": "highhemoglobin_ru_pw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_ru_pw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_npw": {
        "reqVar": [{
            "v": "hhemoglobin_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_ur_npw": {
        "reqVar": [{
            "v": "hhemoglobin_ur_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_ur_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hhemoglobin_ru_npw": {
        "reqVar": [{
            "v": "hhemoglobin_ru_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hhemoglobin_ru_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_npw": {
        "reqVar": [{
            "v": "anemia_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_ur_npw": {
        "reqVar": [{
            "v": "anemia_ur_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_ur_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "anemia_ru_npw": {
        "reqVar": [{
            "v": "anemia_ru_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "anemia_ru_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_npw": {
        "reqVar": [{
            "v": "highhemoglobin_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_ur_npw": {
        "reqVar": [{
            "v": "highhemoglobin_ur_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_ur_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highhemoglobin_ru_npw": {
        "reqVar": [{
            "v": "highhemoglobin_ru_npw"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highhemoglobin_ru_npw"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hglucose_fe": {
        "reqVar": [{
            "v": "hglucose_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hglucose_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hglucose_ur_fe": {
        "reqVar": [{
            "v": "hglucose_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hglucose_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hglucose_ru_fe": {
        "reqVar": [{
            "v": "hglucose_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hglucose_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highglucose_fe": {
        "reqVar": [{
            "v": "highglucose_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highglucose_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highglucose_ur_fe": {
        "reqVar": [{
            "v": "highglucose_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highglucose_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highglucose_ru_fe": {
        "reqVar": [{
            "v": "highglucose_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highglucose_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowglucose_fe": {
        "reqVar": [{
            "v": "lowglucose_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowglucose_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowglucose_ur_fe": {
        "reqVar": [{
            "v": "lowglucose_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowglucose_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowglucose_ru_fe": {
        "reqVar": [{
            "v": "lowglucose_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowglucose_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbp_fe": {
        "reqVar": [{
            "v": "hbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbp_ur_fe": {
        "reqVar": [{
            "v": "hbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbp_ru_fe": {
        "reqVar": [{
            "v": "hbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowbp_fe": {
        "reqVar": [{
            "v": "lowbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowbp_ur_fe": {
        "reqVar": [{
            "v": "lowbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowbp_ru_fe": {
        "reqVar": [{
            "v": "lowbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "elevatedbp_fe": {
        "reqVar": [{
            "v": "elevatedbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "elevatedbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "elevatedbp_ur_fe": {
        "reqVar": [{
            "v": "elevatedbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "elevatedbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "elevatedbp_ru_fe": {
        "reqVar": [{
            "v": "elevatedbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "elevatedbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highbp_fe": {
        "reqVar": [{
            "v": "highbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highbp_ur_fe": {
        "reqVar": [{
            "v": "highbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highbp_ru_fe": {
        "reqVar": [{
            "v": "highbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "severebp_fe": {
        "reqVar": [{
            "v": "severebp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "severebp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "severebp_ur_fe": {
        "reqVar": [{
            "v": "severebp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "severebp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "severebp_ru_fe": {
        "reqVar": [{
            "v": "severebp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "severebp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highcuffbp_fe": {
        "reqVar": [{
            "v": "highcuffbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highcuffbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highcuffbp_ur_fe": {
        "reqVar": [{
            "v": "highcuffbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highcuffbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highcuffbp_ru_fe": {
        "reqVar": [{
            "v": "highcuffbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highcuffbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hcuffbp_fe": {
        "reqVar": [{
            "v": "hcuffbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hcuffbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hcuffbp_ur_fe": {
        "reqVar": [{
            "v": "hcuffbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hcuffbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hcuffbp_ru_fe": {
        "reqVar": [{
            "v": "hcuffbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hcuffbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowcuffbp_fe": {
        "reqVar": [{
            "v": "lowcuffbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowcuffbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowcuffbp_ur_fe": {
        "reqVar": [{
            "v": "lowcuffbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowcuffbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowcuffbp_ru_fe": {
        "reqVar": [{
            "v": "lowcuffbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowcuffbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "cancer_fe": {
        "reqVar": [{
            "v": "cancer_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "cancer_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "cancer_fe_urban": {
        "reqVar": [{
            "v": "cancer_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "cancer_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "cancer_fe_rural": {
        "reqVar": [{
            "v": "cancer_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "cancer_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_cancer_fe": {
        "reqVar": [{
            "v": "treated_cancer_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_cancer_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_cancer_fe_urban": {
        "reqVar": [{
            "v": "treated_cancer_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_cancer_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_cancer_fe_rural": {
        "reqVar": [{
            "v": "treated_cancer_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_cancer_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_cancer_fe": {
        "reqVar": [{
            "v": "dk_cancer_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_cancer_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_cancer_fe_urban": {
        "reqVar": [{
            "v": "dk_cancer_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_cancer_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_cancer_fe_rural": {
        "reqVar": [{
            "v": "dk_cancer_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_cancer_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "asthma_fe": {
        "reqVar": [{
            "v": "asthma_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "asthma_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "asthma_fe_urban": {
        "reqVar": [{
            "v": "asthma_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "asthma_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "asthma_fe_rural": {
        "reqVar": [{
            "v": "asthma_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "asthma_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_asthma_fe": {
        "reqVar": [{
            "v": "treated_asthma_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_asthma_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_asthma_fe_urban": {
        "reqVar": [{
            "v": "treated_asthma_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_asthma_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_asthma_fe_rural": {
        "reqVar": [{
            "v": "treated_asthma_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_asthma_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_asthma_fe": {
        "reqVar": [{
            "v": "dk_asthma_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_asthma_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_asthma_fe_urban": {
        "reqVar": [{
            "v": "dk_asthma_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_asthma_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_asthma_fe_rural": {
        "reqVar": [{
            "v": "dk_asthma_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_asthma_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "diabetes_fe": {
        "reqVar": [{
            "v": "diabetes_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "diabetes_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "diabetes_fe_urban": {
        "reqVar": [{
            "v": "diabetes_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "diabetes_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "diabetes_fe_rural": {
        "reqVar": [{
            "v": "diabetes_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "diabetes_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_diabetes_fe": {
        "reqVar": [{
            "v": "treated_diabetes_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_diabetes_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_diabetes_fe_urban": {
        "reqVar": [{
            "v": "treated_diabetes_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_diabetes_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_diabetes_fe_rural": {
        "reqVar": [{
            "v": "treated_diabetes_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_diabetes_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_diabetes_fe": {
        "reqVar": [{
            "v": "dk_diabetes_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_diabetes_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_diabetes_fe_urban": {
        "reqVar": [{
            "v": "dk_diabetes_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_diabetes_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_diabetes_fe_rural": {
        "reqVar": [{
            "v": "dk_diabetes_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_diabetes_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "thyroid_fe": {
        "reqVar": [{
            "v": "thyroid_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "thyroid_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "thyroid_fe_urban": {
        "reqVar": [{
            "v": "thyroid_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "thyroid_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "thyroid_fe_rural": {
        "reqVar": [{
            "v": "thyroid_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "thyroid_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_thyroid_fe": {
        "reqVar": [{
            "v": "treated_thyroid_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_thyroid_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_thyroid_fe_urban": {
        "reqVar": [{
            "v": "treated_thyroid_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_thyroid_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_thyroid_fe_rural": {
        "reqVar": [{
            "v": "treated_thyroid_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_thyroid_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_thyroid": {
        "reqVar": [{
            "v": "dk_thyroid"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_thyroid"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_thyroid_urban": {
        "reqVar": [{
            "v": "dk_thyroid_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_thyroid_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_thyroid_rural": {
        "reqVar": [{
            "v": "dk_thyroid_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_thyroid_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "heart_fe": {
        "reqVar": [{
            "v": "heart_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "heart_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "heart_fe_urban": {
        "reqVar": [{
            "v": "heart_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "heart_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "heart_fe_rural": {
        "reqVar": [{
            "v": "heart_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "heart_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_heart_fe": {
        "reqVar": [{
            "v": "treated_heart_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_heart_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_heart_fe_urban": {
        "reqVar": [{
            "v": "treated_heart_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_heart_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_heart_fe_rural": {
        "reqVar": [{
            "v": "treated_heart_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_heart_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_heart_fe": {
        "reqVar": [{
            "v": "dk_heart_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_heart_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_heart_fe_urban": {
        "reqVar": [{
            "v": "dk_heart_fe_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_heart_fe_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_heart_fe_rural": {
        "reqVar": [{
            "v": "dk_heart_fe_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_heart_fe_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "sum_bp_fe": {
        "reqVar": [{
            "v": "sum_bp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "sum_bp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_hbp_fe": {
        "reqVar": [{
            "v": "ad_hbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_hbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_lowbp_fe": {
        "reqVar": [{
            "v": "ad_lowbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_lowbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_elevatedbp_fe": {
        "reqVar": [{
            "v": "ad_elevatedbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_elevatedbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_highbp_fe": {
        "reqVar": [{
            "v": "ad_highbp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_highbp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "adseverebp_fe": {
        "reqVar": [{
            "v": "adseverebp_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "adseverebp_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "sum_bp_ur_fe": {
        "reqVar": [{
            "v": "sum_bp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "sum_bp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_hbp_ur_fe": {
        "reqVar": [{
            "v": "ad_hbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_hbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_lowbp_ur_fe": {
        "reqVar": [{
            "v": "ad_lowbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_lowbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_elevatedbp_ur_fe": {
        "reqVar": [{
            "v": "ad_elevatedbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_elevatedbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_highbp_ur_fe": {
        "reqVar": [{
            "v": "ad_highbp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_highbp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "adseverebp_ur_fe": {
        "reqVar": [{
            "v": "adseverebp_ur_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "adseverebp_ur_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "sum_bp_ru_fe": {
        "reqVar": [{
            "v": "sum_bp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "sum_bp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_hbp_ru_fe": {
        "reqVar": [{
            "v": "ad_hbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_hbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_lowbp_ru_fe": {
        "reqVar": [{
            "v": "ad_lowbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_lowbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_elevatedbp_ru_fe": {
        "reqVar": [{
            "v": "ad_elevatedbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_elevatedbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_highbp_ru_fe": {
        "reqVar": [{
            "v": "ad_highbp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_highbp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "adseverebp_ru_fe": {
        "reqVar": [{
            "v": "adseverebp_ru_fe"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "adseverebp_ru_fe"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hglucose_ma": {
        "reqVar": [{
            "v": "hglucose_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hglucose_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hglucose_ur_ma": {
        "reqVar": [{
            "v": "hglucose_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hglucose_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hglucose_ru_ma": {
        "reqVar": [{
            "v": "hglucose_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hglucose_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highglucose_ma": {
        "reqVar": [{
            "v": "highglucose_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highglucose_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highglucose_ur_ma": {
        "reqVar": [{
            "v": "highglucose_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highglucose_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highglucose_ru_ma": {
        "reqVar": [{
            "v": "highglucose_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highglucose_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowglucose_ma": {
        "reqVar": [{
            "v": "lowglucose_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowglucose_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowglucose_ur_ma": {
        "reqVar": [{
            "v": "lowglucose_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowglucose_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowglucose_ru_ma": {
        "reqVar": [{
            "v": "lowglucose_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowglucose_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbp_ma": {
        "reqVar": [{
            "v": "hbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbp_ur_ma": {
        "reqVar": [{
            "v": "hbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hbp_ru_ma": {
        "reqVar": [{
            "v": "hbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowbp_ma": {
        "reqVar": [{
            "v": "lowbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowbp_ur_ma": {
        "reqVar": [{
            "v": "lowbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowbp_ru_ma": {
        "reqVar": [{
            "v": "lowbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "elevatedbp_ma": {
        "reqVar": [{
            "v": "elevatedbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "elevatedbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "elevatedbp_ur_ma": {
        "reqVar": [{
            "v": "elevatedbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "elevatedbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "elevatedbp_ru_ma": {
        "reqVar": [{
            "v": "elevatedbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "elevatedbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highbp_ma": {
        "reqVar": [{
            "v": "highbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highbp_ur_ma": {
        "reqVar": [{
            "v": "highbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highbp_ru_ma": {
        "reqVar": [{
            "v": "highbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "severebp_ma": {
        "reqVar": [{
            "v": "severebp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "severebp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "severebp_ur_ma": {
        "reqVar": [{
            "v": "severebp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "severebp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "severebp_ru_ma": {
        "reqVar": [{
            "v": "severebp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "severebp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highcuffbp_ma": {
        "reqVar": [{
            "v": "highcuffbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highcuffbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highcuffbp_ur_ma": {
        "reqVar": [{
            "v": "highcuffbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highcuffbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "highcuffbp_ru_ma": {
        "reqVar": [{
            "v": "highcuffbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "highcuffbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hcuffbp_ma": {
        "reqVar": [{
            "v": "hcuffbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hcuffbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hcuffbp_ur_ma": {
        "reqVar": [{
            "v": "hcuffbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hcuffbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "hcuffbp_ru_ma": {
        "reqVar": [{
            "v": "hcuffbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "hcuffbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowcuffbp_ma": {
        "reqVar": [{
            "v": "lowcuffbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowcuffbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowcuffbp_ur_ma": {
        "reqVar": [{
            "v": "lowcuffbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowcuffbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "lowcuffbp_ru_ma": {
        "reqVar": [{
            "v": "lowcuffbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "lowcuffbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "cancer_ma": {
        "reqVar": [{
            "v": "cancer_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "cancer_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "cancer_ma_urban": {
        "reqVar": [{
            "v": "cancer_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "cancer_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "cancer_ma_rural": {
        "reqVar": [{
            "v": "cancer_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "cancer_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_cancer_ma": {
        "reqVar": [{
            "v": "treated_cancer_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_cancer_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_cancer_ma_urban": {
        "reqVar": [{
            "v": "treated_cancer_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_cancer_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_cancer_ma_rural": {
        "reqVar": [{
            "v": "treated_cancer_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_cancer_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_cancer_ma": {
        "reqVar": [{
            "v": "dk_cancer_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_cancer_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_cancer_ma_urban": {
        "reqVar": [{
            "v": "dk_cancer_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_cancer_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_cancer_ma_rural": {
        "reqVar": [{
            "v": "dk_cancer_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_cancer_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "asthma_ma": {
        "reqVar": [{
            "v": "asthma_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "asthma_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "asthma_ma_urban": {
        "reqVar": [{
            "v": "asthma_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "asthma_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "asthma_ma_rural": {
        "reqVar": [{
            "v": "asthma_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "asthma_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_asthma_ma": {
        "reqVar": [{
            "v": "treated_asthma_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_asthma_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_asthma_ma_urban": {
        "reqVar": [{
            "v": "treated_asthma_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_asthma_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_asthma_ma_rural": {
        "reqVar": [{
            "v": "treated_asthma_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_asthma_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_asthma_ma": {
        "reqVar": [{
            "v": "dk_asthma_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_asthma_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_asthma_ma_urban": {
        "reqVar": [{
            "v": "dk_asthma_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_asthma_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_asthma_ma_rural": {
        "reqVar": [{
            "v": "dk_asthma_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_asthma_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "diabetes_ma": {
        "reqVar": [{
            "v": "diabetes_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "diabetes_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "diabetes_ma_urban": {
        "reqVar": [{
            "v": "diabetes_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "diabetes_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "diabetes_ma_rural": {
        "reqVar": [{
            "v": "diabetes_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "diabetes_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_diabetes_ma": {
        "reqVar": [{
            "v": "treated_diabetes_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_diabetes_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_diabetes_ma_urban": {
        "reqVar": [{
            "v": "treated_diabetes_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_diabetes_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_diabetes_ma_rural": {
        "reqVar": [{
            "v": "treated_diabetes_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_diabetes_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_diabetes_ma": {
        "reqVar": [{
            "v": "dk_diabetes_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_diabetes_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_diabetes_ma_urban": {
        "reqVar": [{
            "v": "dk_diabetes_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_diabetes_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_diabetes_ma_rural": {
        "reqVar": [{
            "v": "dk_diabetes_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_diabetes_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "thyroid_ma": {
        "reqVar": [{
            "v": "thyroid_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "thyroid_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "thyroid_ma_urban": {
        "reqVar": [{
            "v": "thyroid_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "thyroid_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "thyroid_ma_rural": {
        "reqVar": [{
            "v": "thyroid_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "thyroid_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_thyroid_ma": {
        "reqVar": [{
            "v": "treated_thyroid_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_thyroid_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_thyroid_ma_urban": {
        "reqVar": [{
            "v": "treated_thyroid_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_thyroid_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_thyroid_ma_rural": {
        "reqVar": [{
            "v": "treated_thyroid_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_thyroid_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "heart_ma": {
        "reqVar": [{
            "v": "heart_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "heart_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "heart_ma_urban": {
        "reqVar": [{
            "v": "heart_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "heart_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "heart_ma_rural": {
        "reqVar": [{
            "v": "heart_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "heart_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_heart_ma": {
        "reqVar": [{
            "v": "treated_heart_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_heart_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_heart_ma_urban": {
        "reqVar": [{
            "v": "treated_heart_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_heart_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "treated_heart_ma_rural": {
        "reqVar": [{
            "v": "treated_heart_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "treated_heart_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_heart_ma": {
        "reqVar": [{
            "v": "dk_heart_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_heart_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_heart_ma_urban": {
        "reqVar": [{
            "v": "dk_heart_ma_urban"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_heart_ma_urban"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "dk_heart_ma_rural": {
        "reqVar": [{
            "v": "dk_heart_ma_rural"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "dk_heart_ma_rural"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "sum_bp_ma": {
        "reqVar": [{
            "v": "sum_bp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "sum_bp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_hbp_ma": {
        "reqVar": [{
            "v": "ad_hbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_hbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_lowbp_ma": {
        "reqVar": [{
            "v": "ad_lowbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_lowbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_elevatedbp_ma": {
        "reqVar": [{
            "v": "ad_elevatedbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_elevatedbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_highbp_ma": {
        "reqVar": [{
            "v": "ad_highbp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_highbp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "adseverebp_ma": {
        "reqVar": [{
            "v": "adseverebp_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "adseverebp_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "sum_bp_ur_ma": {
        "reqVar": [{
            "v": "sum_bp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "sum_bp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_hbp_ur_ma": {
        "reqVar": [{
            "v": "ad_hbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_hbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_lowbp_ur_ma": {
        "reqVar": [{
            "v": "ad_lowbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_lowbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_elevatedbp_ur_ma": {
        "reqVar": [{
            "v": "ad_elevatedbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_elevatedbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_highbp_ur_ma": {
        "reqVar": [{
            "v": "ad_highbp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_highbp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "adseverebp_ur_ma": {
        "reqVar": [{
            "v": "adseverebp_ur_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "adseverebp_ur_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "sum_bp_ru_ma": {
        "reqVar": [{
            "v": "sum_bp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "sum_bp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_hbp_ru_ma": {
        "reqVar": [{
            "v": "ad_hbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_hbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_lowbp_ru_ma": {
        "reqVar": [{
            "v": "ad_lowbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_lowbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_elevatedbp_ru_ma": {
        "reqVar": [{
            "v": "ad_elevatedbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_elevatedbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "ad_highbp_ru_ma": {
        "reqVar": [{
            "v": "ad_highbp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "ad_highbp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    "adseverebp_ru_ma": {
        "reqVar": [{
            "v": "adseverebp_ru_ma"
        }, {
            "v": "var4"
        }, {
            "v": "var14"
        }, {
            "v": "n_urban_pop"
        }, {
            "v": "n_rural_pop"
        }, {
            "v": "n_rural_tr_pop"
        }],
        "plotVar": {
            "v": "adseverebp_ru_ma"
        },
        "denom_head": "Total Population",
        "num_head": "Total Rural Population",
        "plotType": "percent"
    },
    
    //**********************NFHC NEW Variable DDITION*******//

    p_jsy_anc : {
        reqVar : [
            {v : "p_jsy_anc"},
            {v : "var4"},
            {v : "var8"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_jsy_anc"
        },
        denom_head : "Total ANC Registrations",
        num_head : "Total JSY Registrations",
        plotType : "percent"
    },
    p_1trimester_anc : {
        reqVar : [
            {v : "p_1trimester_anc"},
            {v : "var4"},
            {v : "var6"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_1trimester_anc"
        },
        denom_head : "Total ANC Registrations",
        num_head : "Pregnant Women Registered in First Trimester",
        plotType : "percent"
    },
    p_3chkups_anc : {
        reqVar : [
            {v : "p_3chkups_anc"},
            {v : "var4"},
            {v : "var14"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_3chkups_anc"
        },
        denom_head : "Total ANC Registrations",
        num_head : "Pregnant Women Receiving 3 ANC Checkups",
        plotType : "percent"
    },
    p_100ifa_anc : {
        reqVar : [
            {v : "p_100ifa_anc"},
            {v : "var4"},
            {v : "var22"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_100ifa_anc"
        },
        denom_head : "Total ANC Registrations",
        num_head : "Pregnant Women Given 100 IFA",
        plotType : "percent"
    },
    p_inst_delivery : {
        reqVar : [
            {v : "p_inst_delivery"},
            {v : "var56"},
            {v : "var52"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_inst_delivery"
        },
        denom_head : "Total Reported Deliveries",
        num_head : "Institutional Deliveries",
        plotType : "percent"
    },
    p_safe_delivery : {
        reqVar : [
            {v : "p_safe_delivery"},
            {v : "var56"},
            {v : "safe_delivery_16_17"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_safe_delivery"
        },
        denom_head : "Total Reported Deliveries",
        num_head : "Total Safe Deliveries",
        plotType : "percent"
    },
    p_w48h_chkup_delivery : {
        reqVar : [
            {v : "p_w48h_chkup_delivery"},
            {v : "var56"},
            {v : "var82"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_w48h_chkup_delivery"
        },
        denom_head : "Total Reported Deliveries",
        num_head : "Post Partum Checkups within 48 hrs of Delivery",
        top_head : "Total Urban Population",
        plotType : "percent"
    },
    p_b48h14d_chkup_delivery : {
        reqVar : [
            {v : "p_b48h14d_chkup_delivery"},
            {v : "var56"},
            {v : "var84"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_b48h14d_chkup_delivery"
        },
        denom_head : "Total Reported Deliveries",
        num_head : "Post Partum Checkups from 48 hrs to 14 days of Delivery",
        top_head : "Total Urban Population",
        plotType : "percent"
    },
    p_tt2_anc : {
        reqVar : [
            {v : "p_tt2_anc"},
            {v : "var4"},
            {v : "var16"},
            {v : "n_urban_pop"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "p_tt2_anc"
        },
        denom_head : "Total ANC Registrations",
        num_head : "Pregnant Women received TT2 / Booster",
        top_head : "Total Urban Population",
        plotType : "percent"
    },
    SC_AVL : {
        reqVar :  [
            {v : "shortageSC"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"},
            {v : "desiredSC"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "shortageSC"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "DIST"
    },
    PHC_AVL : {
        reqVar : [
            {v : "shortagePHC"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"},
            {v : "desiredPHC"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "shortagePHC"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "DIST"
    },
    CHC_AVL : {
        reqVar :  [
            {v : "shortageCHC"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"},
            {v : "desiredCHC"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "shortageCHC"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "DIST"
    },
    SC_ACCESSIBILITY : {
        reqVar : [
            {v : "p_within5_SC"},
            {v : "n_villages"},
            {v : "SC_0"},
            {v : "SC_5"},
            {v : "SC_5_10"},
            {v : "SC_m_10"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "p_within5_SC"
        },
        denom_head : "Total Number of Villages",
        num_head : "Villages with access",
        top_head : "Total Urban Population",
        plotType : "percent"
    },
    PHC_ACCESSIBILITY : {
        reqVar : [
            {v : "p_within5_PHC"},
            {v : "n_villages"},
            {v : "PHC_0"},
            {v : "PHC_5"},
            {v : "PHC_5_10"},
            {v : "PHC_m_10"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "p_within5_PHC"
        },
        denom_head : "Total Number of Villages",
        num_head : "Villages with access",
        top_head : "Total Urban Population",
        plotType : "percent"
    },
    CHC_ACCESSIBILITY : {
        reqVar : [
            {v : "p_within10_CHC"},
            {v : "n_villages"},
            {v : "CHC_0"},
            {v : "CHC_5"},
            {v : "CHC_5_10"},
            {v : "CHC_m_10"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "p_within10_CHC"
        },
        denom_head : "Total Number of Villages",
        num_head : "Villages with access",
        top_head : "Total Urban Population",
        plotType : "percent"
    },
    SDH_AVL : {
        reqVar :  [
            {v : "totalSDH"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "totalSDH"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "NON_COMP"
    },
    DH_AVL : {
        reqVar :  [
            {v : "totalDH"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"},
            {v : "n_urban_pop"}
        ],
        plotVar : {
            v : "totalDH"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "NON_COMP"
    },
    CHC_QUALITY : {
        reqVar :  [
             {v : "chc_xray"},
             {v : "chc_radio"},
             {v : "chc_q_sply_doc"},
             {v : "chc_q_doc_in_q"},
             {v : "chc_ref_t"},
             {v : "chc_allop"},
             {v : "chc_ayush"},
             {v : "chc_func_lab"},
             {v : "chc_ot"},
             {v : "chc_lbr_room"},
             {v : "chc_new_born"},
             {v : "chc_30bed"},
             {v : "chc_total_spl"},
             {v : "chc_gen_duty"},
             {v : "phc_chc_pharma"},
             {v : "phc_chc_lab_tech"},
             {v : "phc_chc_nurse"}
        ],
        num : "chc_xray",
        hr : ['chc_total_spl','chc_gen_duty','phc_chc_pharma','phc_chc_lab_tech','phc_chc_nurse','chc_radio'],
        hr_label : ['All Specialists','General Duty Medical Officer','Pharmacists in PHC & CHC','Lab Technicians in PHC & CHC',' Nursing Staff in PHC & CHC','Shortage of Radiographers'],
        supply : ['chc_allop','chc_ayush'],
        supply_label : ['Allopathic Drugs for Common Ailments','AYUSH Drugs for Common Ailments'],
        infra : ['chc_xray','chc_q_sply_doc','chc_q_doc_in_q','chc_ref_t','chc_lbr_room','chc_new_born','chc_30bed','chc_ot','chc_func_lab'],
        infra_label : ['Functioning X-Ray Machines','Quarters for Specialits Doctors','Specialist Doctors Living in Quarters','Referal Transport Available','Functioning Labour Rooms','New Born Care Corners','at least 30 Beds','Functional Operational Theatres','Functional Labs'],
        plotVar : {
            v : "chc_xray"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "NON_COMP_QUALITY"
    },
    SC_QUALITY : {
        reqVar :  [
             {v : "sc_anm_q"},
             {v : "sc_anm_liv_q"},
             {v : "sc_reg_wtr"},
             {v : "sc_ele_sply"},
             {v : "sc_all_wth_r"},
             {v : "sc_health_f_work"},
             {v : "sc_health_m_work"}
        ],
        num : "sc_anm_q",
        hr : ['sc_health_f_work','sc_health_m_work'],
        hr_label : ['Female Health Workers/AMC','Male Health Workers/AMC'],
        infra : ['sc_anm_q','sc_anm_liv_q','sc_reg_wtr','sc_ele_sply','sc_all_wth_r'],
        infra_label : ['Without ANM Quarters','Without ANM living in ANM Quarters','Without Water Supply','Without Electricity Supply','Without All-Weather Road'],
        supply : [],
        supply_label : [],
        plotVar : {
            v : "sc_anm_q"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "NON_COMP_QUALITY"
    },
    PHC_QUALITY : {
        reqVar :  [
             {v : "phc_lbr_room"},
             {v : "phc_ot"},
             {v : "phc_4bed"},
             {v : "phc_ele_sply"},
             {v : "phc_reg_wtr"},
             {v : "phc_all_wth_road"},
             {v : "phc_comp"},
             {v : "phc_ref_trans"},
             {v : "phc_ayush"},
             {v : "phc_f_ass"},
             {v : "phc_m_ass"},
             {v : "phc_doc"},
             {v : "phc_lac_tech"},
             {v : "phc_pharma"},
             {v : "phc_lady_doc"},
             {v : "phc_chc_pharma"},
             {v : "phc_chc_lab_tech"},
             {v : "phc_chc_nurse"}
        ],
        num : "phc_ot",
        hr : ['phc_lac_tech','phc_pharma','phc_lady_doc','phc_f_ass','phc_m_ass','phc_doc'],
        hr_label : ['% of PHCs without Lab Technicians','% of PHCs without Pharmacists ','% of PHCs without Lady Doctors','Shortage of Female Health Assistance','Shortage of Male Health Assistance','Shortage of Doctors'],
        infra : ['phc_lbr_room','phc_ot','phc_4bed','phc_ele_sply','phc_reg_wtr','phc_all_wth_road','phc_comp','phc_ref_trans','phc_ayush'],
        infra_label : ['Without Labour Rooms','Without Operation Theatres','Without atleast 4 beds','Without Electricity Supply','Without Regular Water Supply','Without All Weather Road','Without Computers','Without Referral Transport','Without AYUSH Facility'],
        supply : [],
        supply_label : [],
        plotVar : {
            v : "phc_ot"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "NON_COMP_QUALITY"
    },
    SDH_QUALITY : {
        reqVar :  [
             {v : "sdh_doc"},
             {v : "sdh_para"},
        ],
        
        hr : ['sdh_doc','sdh_para'],
        hr_label : ['Doctors','Para Medics'],
        infra : [],
        infra_label : [],
        supply : [],
        supply_label : [],
        plotVar : {
            v : "sdh_doc"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "NON_COMP_QUALITY"
    },
    DH_QUALITY : {
        reqVar :  [
             {v : "dh_doc"},
             {v : "dh_para"},
        ],
        hr : ['dh_doc','dh_para'],
        hr_label : ['Doctors','Para Medics'],
        infra : [],
        infra_label : [],
        supply : [],
        supply_label : [],
        plotVar : {
            v : "dh_doc"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "NON_COMP_QUALITY"
    },
    QUALITY_INDEX : {
        reqVar :  [
            {v : "totalDH"},
            {v : "n_rural_pop"},
            {v : "n_rural_tr_pop"}
        ],
        plotVar : {
            v : "quality"
        },
        denom_head : "Total Rural Population",
        num_head : "Total Rural Tribal Population",
        top_head : "Total Urban Population",
        plotType : "QUALITY_INDEX"
    }
}

var plotVarDef = {
    
    //********************NFHS Data plot******************//
   
    "anorexia_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anorexia Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anorexia_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anorexia Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anorexia_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anorexia Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbmi_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy BMI Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbmi_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy BMI Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbmi_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy BMI Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "overweight_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Overweight BMI Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "overweight_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Overweight BMI Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "overweight_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Overweight BMI Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "obese_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Obese BMI Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "obese_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Obese Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "obese_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Obese Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemolgobin Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_ur_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Urban Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_ru_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Rural Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_ur_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Urban Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_ru_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Rural Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_ur_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Urban Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_ru_pw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Rural Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_ur_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Urban Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hhemoglobin_ru_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Hemoglobin Rural Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_ur_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Urban Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "anemia_ru_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Anemia Rural Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_ur_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Urban Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highhemoglobin_ru_npw": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Hemoglobin Rural Non-Pregnant Woman",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hglucose_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Glucose Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hglucose_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Glucose Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hglucose_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Glucose Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highglucose_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Glucose Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highglucose_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Glucose Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highglucose_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Glucose Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowglucose_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Glucose Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowglucose_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Glucose Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowglucose_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Glucose Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Blood Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Blood Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Blood Pressure Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Blood Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Blood Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Blood Pressure Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "elevatedbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Elevated Blood Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "elevatedbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Elevated Blood Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "elevatedbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Elevated Blood Pressure Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Blood Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Blood pressure urban female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "high blood pressure Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "severebp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Severe Blood Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "severebp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Severe Blood Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "severebp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Severe Blood Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highcuffbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Cuff Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highcuffbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Cuff Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highcuffbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Cuff Pressure Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hcuffbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Cuff Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hcuffbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Cuff Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hcuffbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Cuff Pressure Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowcuffbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Cuff Pressure Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowcuffbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Cuff Pressure Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowcuffbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Cuff Pressure Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "cancer_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Cancer Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "cancer_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Cancer Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "cancer_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Cancer Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_cancer_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Cancer Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_cancer_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Cancer Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_cancer_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Cancer Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_cancer_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Cancer Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_cancer_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Cancer Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_cancer_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Cancer Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "asthma_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Asthma Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "asthma_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Asthma Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "asthma_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Asthma Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_asthma_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Asthma Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_asthma_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Asthma Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_asthma_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Asthma Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_asthma_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Asthma Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_asthma_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Asthma Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_asthma_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Asthma Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "diabetes_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Diabetes Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "diabetes_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Diabetes Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "diabetes_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Diabetes Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_diabetes_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Diabetes Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_diabetes_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Diabetes Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_diabetes_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Diabetes Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_diabetes_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Diabetes Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_diabetes_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Diabetes Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_diabetes_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Diabetes Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "thyroid_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Thyroid Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "thyroid_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Thyroid Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "thyroid_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Thyroid Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_thyroid_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Thyroid Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_thyroid_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Thyroid Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_thyroid_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Thyroid Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_thyroid": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Thyroid Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_thyroid_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Thyroid Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_thyroid_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Thyroid Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "heart_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Heart Disease Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "heart_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Heart Disease Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "heart_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Heart Disease Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_heart_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Heart Disease Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_heart_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Heart Disease Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_heart_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Heart Disease Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_heart_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Heart Disease Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_heart_fe_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Heart Disease Urban Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_heart_fe_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Heart Disease Rural Female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "sum_bp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Sum of non-cuff BP categories for females",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_hbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted healthy blood pressure female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_lowbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted low blood pressure female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_elevatedbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted elevated blood pressure female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_highbp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted high blood pressure female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "adseverebp_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted severe blood pressure female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "sum_bp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Sum of non-cuff BP categories for urban females",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_hbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted healthy blood pressure urban female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_lowbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted low blood pressure urban female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_elevatedbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted elevated blood pressure urban female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_highbp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted high blood pressure urban female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "adseverebp_ur_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted severe blood pressure urban female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "sum_bp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Sum of non-cuff BP categories for rural females",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_hbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted healthy blood pressure rural female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_lowbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted low blood pressure rural female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_elevatedbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted elevated blood pressure rural female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_highbp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted high blood pressure rural female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "adseverebp_ru_fe": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted severe blood pressure rural female",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hglucose_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Glucose Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hglucose_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Glucose Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hglucose_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Glucose Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highglucose_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Glucose Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highglucose_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Glucose Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highglucose_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Glucose Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowglucose_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Glucose Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowglucose_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Glucose Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowglucose_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Glucose Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Blood Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Blood Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Blood Pressure Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Blood Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Blood Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Blood Pressure Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "elevatedbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Elevated Blood Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "elevatedbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Elevated Blood Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "elevatedbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Elevated Blood Pressure Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Blood Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Blood pressure urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "high blood pressure Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "severebp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Severe Blood Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "severebp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Severe Blood Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "severebp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Severe Blood Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highcuffbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Cuff Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highcuffbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Cuff Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "highcuffbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "High Cuff Pressure Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hcuffbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Cuff Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hcuffbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Cuff Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "hcuffbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Healthy Cuff Pressure Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowcuffbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Cuff Pressure Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowcuffbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Cuff Pressure Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "lowcuffbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Low Cuff Pressure Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "cancer_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Cancer Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "cancer_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Cancer Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "cancer_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Cancer Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_cancer_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Cancer Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_cancer_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Cancer Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_cancer_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Cancer Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_cancer_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Cancer Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_cancer_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Cancer Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_cancer_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Cancer Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "asthma_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Asthma Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "asthma_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Asthma Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "asthma_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Asthma Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_asthma_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Asthma Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_asthma_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Asthma Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_asthma_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Asthma Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_asthma_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Asthma Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_asthma_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Asthma Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_asthma_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Asthma Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "diabetes_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Diabetes Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "diabetes_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Diabetes Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "diabetes_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Diabetes Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_diabetes_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Diabetes Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_diabetes_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Diabetes Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_diabetes_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Diabetes Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_diabetes_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Diabetes Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_diabetes_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Diabetes Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_diabetes_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Diabetes Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "thyroid_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Thyroid Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "thyroid_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Thyroid Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "thyroid_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Thyroid Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_thyroid_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Thyroid Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_thyroid_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Thyroid Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_thyroid_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Thyroid Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "heart_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Heart Disease Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "heart_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Heart Disease Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "heart_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Heart Disease Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_heart_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Heart Disease Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_heart_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Heart Disease Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "treated_heart_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Treated Heart Disease Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_heart_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Heart Disease Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_heart_ma_urban": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Heart Disease Urban Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "dk_heart_ma_rural": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Don�t Know Heart Disease Rural Male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "sum_bp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Sum of non-cuff BP categories for males",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_hbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted healthy blood pressure male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_lowbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted low blood pressure male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_elevatedbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted elevated blood pressure male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_highbp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted high blood pressure male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "adseverebp_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted severe blood pressure male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "sum_bp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Sum of non-cuff BP categories for urban males",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_hbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted healthy blood pressure urban male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_lowbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted low blood pressure urban male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_elevatedbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted elevated blood pressure urban male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_highbp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted high blood pressure urban male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "adseverebp_ur_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted severe blood pressure urban male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "sum_bp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Sum of non-cuff BP categories for rural males",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_hbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted healthy blood pressure rural male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_lowbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted low blood pressure rural male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_elevatedbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted elevated blood pressure rural male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "ad_highbp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted high blood pressure rural male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    "adseverebp_ru_ma": {
        "limit": {
            "l1": {
                "l": 0,
                "r": 0.25,
                "c": "#045A8D",
                "head": ""
            },
            "l2": {
                "l": 0.26,
                "r": 0.5,
                "c": "#2B8CBE",
                "head": ""
            },
            "l3": {
                "l": 0.51,
                "r": 0.75,
                "c": "#FFC107",
                "head": ""
            },
            "l4": {
                "l": 0.75,
                "r": 1,
                "c": "#E65100",
                "head": ""
            }
        },
        "description": {
            "main_head": "Adjusted severe blood pressure rural male",
            "category_head": "% of District Hospitals",
            "leg_head": "",
            "desc": ""
        }
    },
    //*******************NFHS data plot***************//
    "chc_xray" : {
        limit : {
        },
        description : {
            main_head : "Public Health Infrastructure Quality for Community Health Centre",
            category_head : "Shortage in Community Health Centre",
            leg_head : "",
            desc : ""
        }
    },
    "sc_anm_q" : {
        limit : {
        },
        description : {
            main_head : "Public Health Infrastructure Quality for Sub Centre",
            category_head : "Shortage in Sub Centre",
            leg_head : "",
            desc : ""
        }
    },
    "phc_ot" : {
        limit : {
        },
        description : {
            main_head : "Public Health Infrastructure Quality for Primary Health Centre",
            category_head : "",
            leg_head : "",
            desc : ""
        }
    },
    "sdh_doc" : {
        limit : {
        },
        description : {
            main_head : "Public Health Infrastructure Quality for Sub Divisional Hospitals",
            category_head : "Shortage in Sub Divisional Hospitals",
            leg_head : "",
            desc : ""
        }
    },
    "dh_doc" : {
        limit : {
        },
        description : {
            main_head : "Public Health Infrastructure Quality for District Hospitals",
            category_head : "Shortage in District Hospitals",
            leg_head : "",
            desc : ""
        }
    },
   "quality" : {
       limit : {
            l1 : {
                l : 1, r : 5 , c : "#045A8D" , head : ""
            },
            l2 : {
                l : 6, r : 10 , c : "#2B8CBE" , head : ""
            }, 
            l3 : {
                l : 11, r : 15 , c : "#FFC107" , head : ""
            },
            l4 : {
                l : 16, r : 21 , c : "#E65100" , head : ""
            }
        },
        description : {
            main_head : "Health Infrastructure Index",
            category_head : "% of District Hospitals",
            leg_head : "",
            desc : ""
        }
    },
    "SMALL_STATE" : {
       limit : {
            l1 : {
                l : 1, r : 2 , c : "#045A8D" , head : ""
            },
            l2 : {
                l : 3, r : 4 , c : "#2B8CBE" , head : ""
            }, 
            l3 : {
                l : 5, r : 7 , c : "#FFC107" , head : ""
            },
            l4 : {
                l : 8, r : 9 , c : "#E65100" , head : ""
            }
        },
        description : {
            main_head : "Health Infrastructure Index",
            category_head : "% of District Hospitals",
            leg_head : "",
            desc : ""
        }
    },
    "UT_STATE" : {
       limit : {
            l1 : {
                l : 1, r : 1 , c : "#045A8D" , head : ""
            },
            l2 : {
                l : 2, r : 3 , c : "#2B8CBE" , head : ""
            }, 
            l3 : {
                l : 4, r : 5 , c : "#FFC107" , head : ""
            },
            l4 : {
                l : 6, r : 6 , c : "#E65100" , head : ""
            }
        },
        description : {
            main_head : "Health Infrastructure Index",
            category_head : "% of District Hospitals",
            leg_head : "",
            desc : ""
        }
    },
    "p_jsy_anc" : {
        limit : {
            l1 : {
                l : 99, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 92, r : 99 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 55, r : 91 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 55 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "JSY to total ANC registrations",
            category_head : "",
            leg_head : "",
            desc : "Defines the Percentage of the Institiutional Deliveries"
        }
    },
    "p_1trimester_anc" : {
        limit : {
            l1 : {
                l : 85, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 72, r : 85 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 56, r : 71 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 56 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "First trimester registrations to total ANC registrations",
            category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the Institiutional deliveries"
        }
    },
    "p_3chkups_anc" : {
        limit : {
            l1 : {
                l : 93, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 85, r : 93 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 71, r : 84 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 71 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "Pregnant women received 3 ANC check-ups to total ANC registrations",
             category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the 3 ANC checkups"
        }
    },
    "p_100ifa_anc" : {
        limit : {
            l1 : {
                l : 92, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 85, r : 92 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 72, r : 84 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 72 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "Pregnant women given 100 IFA to total ANC registrations",
            category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the 3 ANC checkups"
        }
    },
    "p_inst_delivery" : {
        limit : {
            l1 : {
                l : 99, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 96, r : 99 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 85, r : 95 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 85 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "Institutional deliveries to total reported deliveries",
             category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the 3 ANC checkups"
        }
    },
    "p_safe_delivery" : {
        limit : {
            l1 : {
                l : 99, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 98, r : 99 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 89, r : 97 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 89 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "Safe deliveries to total reported deliveries",
            category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the 3 ANC checkups"
        }
    },
    "p_w48h_chkup_delivery" : {
        limit : {
            l1 : {
                l : 92, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 81, r : 92 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 65, r : 80 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 65 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "Post-Partum check-up in <48 hrs of delivery to total reported deliveries",
            category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the 3 ANC checkups"
        }
    },
    "p_b48h14d_chkup_delivery" : {
        limit : {
            l1 : {
                l : 92, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 62, r : 92 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 39, r : 61 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 39 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "Post-Partum check-up within 2-14 days to total reported deliveries",
            category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the 3 ANC checkups"
        }
    },
    "p_tt2_anc" : {
        limit : {
            l1 : {
                l : 93, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 88, r : 93 , c : "#2B8CBE" , head : "Above average"
            }, 
            l3 : {
                l : 78, r : 87 , c : "#FFC107" , head : "Below average"
            },
            l4 : {
                l : 0, r : 78 , c : "#E65100" , head : "Low"
            }
        },
        description : {
            main_head : "Pregnant women received TT2 or Booster to total ANC registrations",
             category_head : "",
            leg_head : "",
            desc : "Defines the percentage of the 3 ANC checkups"
        }
    },
    "shortageSC" : {
        limit : {
            l1 : {
                l : 0, r : 25 , c : "#045A8D" , head : 'Large Surplus'
            },
            l2 : {
                l : 25, r : 50 , c : "#2B8CBE" , head : "Surplus"
            },
            l3 : {
                l : 51, r : 75 , c : "#E65100" , head : "Shortage"
            },
            l4 : {
                l : 75, r : 100 , c : "#FFC107" , head : "Extreme Shortage"
            }   
        },
        description : {
            main_head : "Availability of Sub Centres",
             category_head : "",
            leg_head : "",
            desc : "Map to show the distribution of the sub centres across districts in state"
        }
    },"shortagePHC" : {
        limit : {
            l1 : {
                l : 0, r : 25 , c : "#045A8D" , head : 'Large Surplus'
            },
            l2 : {
                l : 25, r : 50 , c : "#2B8CBE" , head : "Surplus"
            },
            l3 : {
                l : 51, r : 75 , c : "#E65100" , head : "Shortage"
            },
            l4 : {
                l : 75, r : 100 , c : "#FFC107" , head : "Extreme Shortage"
            }   
        },
        description : {
            main_head : "Availability of Primary Health Centres",
             category_head : "",
            leg_head : "",
            desc : "Map to show the distribution of the Primary Health centres across districts in state"
        }
    },"shortageCHC" : {
       limit : {
            l1 : {
                l : 0, r : 25 , c : "#045A8D" , head : 'Large Surplus'
            },
            l2 : {
                l : 25, r : 50 , c : "#2B8CBE" , head : "Surplus"
            },
            l3 : {
                l : 51, r : 75 , c : "#E65100" , head : "Shortage"
            },
            l4 : {
                l : 75, r : 100 , c : "#FFC107" , head : "Extreme Shortage"
            }   
        },
        description : {
            main_head : "Availability of Community Health Centres",
            category_head : "",
            leg_head : "",
            desc : "Map to show the distribution of the Community Health centres across districts in state"
        }
    },
    "p_within5_SC" : {
        limit : {
            l1 : {
                l : 71, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 53, r : 71 , c : "#2B8CBE" ,head : "Above average"
            },
            l3 : {
                l : 40, r : 52 , c : "#FFC107" ,head : "Below average"
            },
            l4 : {
                l : 0, r : 40 , c : "#E65100" , head : "Low"
            }   
        },
        description : {
            main_head : "Villages with Access to Sub Centre within 5 km",
            category_head : "",
            leg_head : "",
            desc : "Map to show the accessibility of SC across districts"
        }
    },
    "p_within5_PHC" : {
       limit : {
            l1 : {
                l : 36, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 27, r : 36 , c : "#2B8CBE" ,head : "Above average"
            },
            l3 : {
                l : 18, r : 26 , c : "#FFC107" ,head : "Below average"
            },
            l4 : {
                l : 0, r : 18 , c : "#E65100" , head : "Low"
            }   
        },
        description : {
            main_head : "Villages with Access to Primary Health Centre within 5 km",
            category_head : "",
            leg_head : "",
            desc : "Map to show the accessibility of PHC across districts"
        }
    },
    "p_within10_CHC" : {
      limit : {
            l1 : {
                l : 59, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 43, r : 59 , c : "#2B8CBE" ,head : "Above average"
            },
            l3 : {
                l : 27, r : 42 , c : "#FFC107" ,head : "Below average"
            },
            l4 : {
                l : 0, r : 27 , c : "#E65100" , head : "Low"
            }   
        },
        description : {
            main_head : "Villages with Access to Community Health Centre within 10 km",
            category_head : "",
            leg_head : "",
            desc : "Map to show the accessibility of CHC across districts"
        }
    },
    "totalSDH" : {
      limit : {
            l1 : {
                l : 59, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 43, r : 59 , c : "#2B8CBE" ,head : "Above average"
            },
            l3 : {
                l : 27, r : 42 , c : "#FFC107" ,head : "Below average"
            },
            l4 : {
                l : 0, r : 27 , c : "#E65100" , head : "Low"
            }   
        },
        description : {
            main_head : "Availability of Sub Divisional Hospitals",
            category_head : "",
            leg_head : "",
            desc : ""
        }
    },
    "totalDH" : {
      limit : {
            l1 : {
                l : 59, r : 100 , c : "#045A8D" , head : "High"
            },
            l2 : {
                l : 43, r : 59 , c : "#2B8CBE" ,head : "Above average"
            },
            l3 : {
                l : 27, r : 42 , c : "#FFC107" ,head : "Below average"
            },
            l4 : {
                l : 0, r : 27 , c : "#E65100" , head : "Low"
            }   
        },
        description : {
            main_head : "Availability of District Hospitals",
            category_head : "",
            leg_head : "",
            desc : ""
        }
    }
}

var StateCodeObject = {
 "A & N Islands" : 35,
 "Andaman & Nicobar Island" : 35,
 "Andhra Pradesh" :  37,
 "Arunanchal Pradesh" : 12,
 "Arunachal Pradesh" : 12,
 "Assam"  : 18,
 "Bihar"  : 10,
 "Chandigarh"  : 04,
 "Chhattisgarh" : 22,
 "Dadra & Nagar Haveli" : 26,
 "Daman & Diu" : 25,
 "NCT of Delhi" :  07,
 "Delhi" :  07,
 "Goa" : 30 ,
 "Gujarat" :24 ,
 "Haryana" : 06 ,
 "Himachal Pradesh" :  02 ,
 "Jammu & Kashmir"  : 01 ,
 "Jharkhand"  : 20 ,
 "Karnataka" :  29 ,
 "Kerala" :  32 ,
 "Lakshadweep" :  31 ,
 "Madhya Pradesh" :  23 ,
 "Maharashtra" :  27 ,
 "Manipur" :  14 ,
 "Meghalaya" :  17 ,
 "Mizoram" :  15 ,
 "Nagaland"  : 13 ,
 "Odisha" : 21 ,
 "Pondicherry"  : 34 ,
 "Punjab" :  03 ,
 "Rajasthan" : 08 ,
 "Sikkim" :  11 ,
 "Tamil Nadu" :  33 ,
 "Telangana" :  36,
 "Tripura" :  16 ,
 "Uttar Pradesh" :  09 ,
 "Uttarakhand"  : 05 ,
 "West Bengal" :  19,
 "Puducherry" : 35
}

plotMap(2)
function plotMap(geoCode,stateCode,MapCode){
    
    /*cleanup the area for the new map to be plotted*/
    MainHeading.text("Generating Map ...")
    d3.select("#legHead").text('');
    if(Map) Map.remove();
    if(canvas) canvas.remove();
    if(legendHead) legendHead.text("")
    d3.select('#CHC-LABEL').text("")
    if(outlineMap) outlineMap.remove();
    
    
    if(geoCode == 1){
        
        createNewIndiaMap();
    }else if(geoCode ==2){
        
        if(stateCode == null || MapCode == null)
        {
            generateStates("India",'PHC_AVL');
        }else{
            
            generateStates(stateCode,MapCode);
        }
    }
}

//loading the file that stores geoMercator(geolocation) and CSV file link for various states
d3.json('./assets/json/loadstate.json',function(err,data){
    if(err){
           } 
    else{
       NavigateData = data;
      }
});


function generateStates(stateCallCode,mapCallCode){

        //Defining the variables for loading the file
        var STATE;
        var DATA_FILE_LOCATION;
        var GEOM_WIDTH_R;
        var GEOM_HEIGHT_R;
        var GEOM_SCALE_R;
        var FUNCTION_CALLL;
    
        var stateFont = 9;
        var StandardHeight = 140;
    
        //Changing the functionalities for the state and India map
        SCDrop.style('visibility','visible')
        PHCDrop.style('visibility','visible')
        CHCDrop.style('visibility','visible')
        SCIndiaShortage.on('click',function(){})
        PHCIndiaShortage.on('click',function(){})
        CHCIndiaShortage.on('click',function(){})
        SCIndiaShortage.on('mouseover',function(){
            
            $(this).trigger('click')
        })
        PHCIndiaShortage.on('mouseover',function(){
            
          $(this).trigger('click')
        })
        CHCIndiaShortage.on('mouseover',function(){
            
          $(this).trigger('click')
        })
        /***************************/

    
        $(".STATE_DROPDOWN_SELECT").on('click',function(){
            
            stateDropDownSelect($(this).attr('id'));
        })
    
        function stateDropDownSelect(regionSelected){
            MainHeading.text("Generating Map ...");
             $("#legHead").hide()
            
             //This is to re-structure the infromation box
            if(currentCategoryPlot.substr(currentCategoryPlot.indexOf("_")+1) == 'QUALITY'){
                $("#sub-info").removeClass("col-border");
                $("#sub-info").hide();
                $("#sub-info-q").show();
            }else{
                $("#sub-info").addClass("col-border");
                $("#sub-info").show();
                $("#sub-info-q").hide();
            }
            
            $("#sub-info").addClass("col-border");
            $("#sub-info").show();
            $("#sub-info-q").hide();
            
            //Changing the size of the No.of Hospital
            InfoExistingLabel.style("font-size","15px")
            InfoExisting.style("font-size","20px")
            
            //Hiding the comming soon if data present
            $("#comming_soon").hide();
            
            currentStatePlot = regionSelected;
            hideXtra()
            if(currentStatePlot == 'India' && PlotCategory[currentCategoryPlot].plotType == "NON_COMP_QUALITY"){
                
                //District Maps not available right now for any Quality
                //So Nothing here
                MainHeading.text("Generating Map ...")
                currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1)+"AVL"
                $("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide()
                
            }else if(currentStatePlot == 'India' && currentCategoryPlot.substr(currentCategoryPlot.indexOf("_")+1) == 'QUALITY'){
                
                //District Maps not available right now for any Quality
                //So Nothing here
                MainHeading.text("Generating Map ...")
                
                currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1)+"AVL"
                $("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide()
                //createState(currentStatePlot,currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1)+"AVL"); 
               
            }else if(currentCategoryPlot == "QUALITY_INDEX"){
                     
                $("#legends").show();
                
            }else if(regionSelected == 'India'){
                
                $("#tooltip-area").show();
                $("#table-area").hide(); 
                $("#legends").show();
                
                $("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide()
                
                MainHeading.text("Generating Map ...")
                
                create('India',FUNCTION_CALLL)
            }else{
                
                $("#HR").show()
                $("#INFRA").show()
                $("#SUPPLY").show()
                
                $("#tooltip-area").show();
                $("#table-area").hide(); 
                $("#legends").show();
                
                MainHeading.text("Generating Map ...")
                createState(currentStatePlot,currentCategoryPlot);  
                if(currentStatePlot == 'Andhra Pradesh'){
                    var info = d3.select("#INFO-CAVEAT").text();
                    if(info.indexOf(caveat_string_AP) == -1){
                        d3.select("#INFO-CAVEAT").text(info +" " + caveat_string_AP);
                    }
                }else{
                    var info = d3.select("#INFO-CAVEAT").text();
                    d3.select("#INFO-CAVEAT").text(info + "");
                }
                
            }    
           
            createState(currentStatePlot,currentCategoryPlot); 
        }
    
        $(".CATEGORY_DROPDOWN_SELECT").on('click',function(){
            categoryDropDownSelect(currentStatePlot,$(this).attr('id'));
        })
      
        function categoryDropDownSelect(currentStatePlot,categoryDorpDownSelected){
            
            
            
            MainHeading.text("Generating Map ...");
            $("#legHead").hide()
            
            $("#sub-info").addClass("col-border");
            $("#sub-info").show();
            $("#sub-info-q").hide();
            
            
            
            //This is to re-structure the infromation box
            if(currentCategoryPlot.substr(currentCategoryPlot.indexOf("_")+1) == 'QUALITY'){
                $("#sub-info").hide();
                $("#sub-info").removeClass("col-border");
                $("#sub-info-q").show();
                $("#legends").hide();
            }else{
               $("#sub-info").show();
                $("#sub-info").addClass("col-border");
                $("#sub-info-q").hide();
                $("#legends").show();
            }
            
           
            
            //Changing the size of the No.of Hospital
            InfoExistingLabel.style("font-size","15px")
            InfoExisting.style("font-size","20px")
            
            //Hiding the comming soon if data present
            $("#comming_soon").hide();
            
            
            currentCategoryPlot = categoryDorpDownSelected;
            hideXtra();
            $("#legends").show();
            
            if($(this).attr('name') == 'MET_CARE'){
                $(".SUB_CATEGORY_DROPDOWN_SELECT").hide();
            }else if($(this).attr('name') == 'QLTY_INDX'){
                $("#legends").show();
                
            }
            else{
                
                $(".SUB_CATEGORY_DROPDOWN_SELECT").show();
                if(currentCategoryPlot == 'SDH_AVL' || currentCategoryPlot == 'DH_AVL'){
                    $("#ACCESSIBILITY").hide()
                }
                else{
                    $("#ACCESSIBILITY").show()
                }
            }
            
            if(currentCategoryPlot == 'p_jsy_anc'){
                
                    $("#tooltip-area").show();
                    $("#table-area").hide();  
                    $("#legends").show();
                
                    MainHeading.text("Generating Map ...")
                    
                    var info = d3.select("#INFO-CAVEAT").text();
                    if(info.indexOf(caveat_string_JSY) == -1){
                        d3.select("#INFO-CAVEAT").text(info +" " + caveat_string_JSY);
                    }
            }else if(currentStatePlot == 'India' && (currentCategoryPlot == 'SDH_AVL' || currentCategoryPlot == 'DH_AVL') ){

                        MainHeading.text("Generating Map ...")
                      
                        currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1)+"AVL"
                        $("#HR").hide()
                        $("#INFRA").hide()
                        $("#SUPPLY").hide()
                       

                    }else if(PlotCategory[currentCategoryPlot].plotType == "QUALITY_INDEX"){
                    $("#tooltip-area").hide();
                    $("#table-area").show();
                    $("#legends").hide();
                
                    MainHeading.text("Generating Map ...")
                    var info = d3.select("#INFO-CAVEAT").text();
                    d3.select("#INFO-CAVEAT").text(info + "");
            }else{
                
                   
                
                    $("#tooltip-area").show();
                    $("#table-area").hide();
                    $("#legends").show();
                
                    MainHeading.text("Generating Map ...")
                    var info = d3.select("#INFO-CAVEAT").text();
                    d3.select("#INFO-CAVEAT").text(info + "");
            }
            
            if(currentCategoryPlot == "QUALITY_INDEX"){
                $("#index_tabs").show();
                $("#non_index_tabs").hide();
            }else{
                $("#index_tabs").hide();
                $("#non_index_tabs").show();
            }
            
            if(currentStatePlot == 'Andhra Pradesh'){
                    var info = d3.select("#INFO-CAVEAT").text();
                    if(info.indexOf(caveat_string_AP) == -1){
                        d3.select("#INFO-CAVEAT").text(info +" " + caveat_string_AP);
                    }
            }else{
                var info = d3.select("#INFO-CAVEAT").text();
                d3.select("#INFO-CAVEAT").text(info + "");
            }
            
            
            createState(currentStatePlot,currentCategoryPlot); 
           
        }
      
        function_container.categoryselect = function(state,category){
            categoryDropDownSelect(state,category);
        }
    
        $(".SUB_CATEGORY_DROPDOWN_SELECT").on('click',function(){
            
            subCategoryDropDown($(this).attr('id'));

        })
    
        function subCategoryDropDown(subCategoryDropDownSelect){
            MainHeading.text("Generating Map ...");
            //Hiding the comming soon if data present
            $("#comming_soon").hide();
            
            
            /*if(last_selected_opt != null){
                d3.select("#"+last_selected_opt).style('text-decoration','none')
            }
            d3.select("#"+subCategoryDropDownSelect).style('text-decoration','underline')
            last_selected_opt = subCategoryDropDownSelect;*/
            
            //Changing the size of the No.of Hospital
            InfoExistingLabel.style("font-size","15px");
            InfoExisting.style("font-size","20px");
            
            
            if( subCategoryDropDownSelect == 'AVL' || subCategoryDropDownSelect == 'ACCESSIBILITY'){
                currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1) +subCategoryDropDownSelect;
            }else{
                currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1) +"QUALITY";
                typeVar = subCategoryDropDownSelect;
            }
            
            hideXtra();
           
            
            if(currentStatePlot == 'India' && PlotCategory[currentCategoryPlot].plotType == "NON_COMP_QUALITY"){
                
                //District Maps not available right now for any Quality
                //So Nothing here
                
            }else{
                
                $("#tooltip-area").show();
                $("#table-area").hide();
                $("#legends").show();

                MainHeading.text("Generating Map ...")
                var info = d3.select("#INFO-CAVEAT").text();
                d3.select("#INFO-CAVEAT").text(info + "");
            }
            
            //This is to re-structure the infromation box
            if(currentCategoryPlot.substr(currentCategoryPlot.indexOf("_")+1) == 'QUALITY'){
                $("#sub-info").hide();
                $("#sub-info").removeClass("col-border");
                $("#sub-info-q").show();
                $("#legends").hide();
            }else{
               $("#sub-info").show();
                $("#sub-info").addClass("col-border");
                $("#sub-info-q").hide();
                $("#legends").show();
            }
            
            if(currentStatePlot == 'Andhra Pradesh'){
                var info = d3.select("#INFO-CAVEAT").text();
                if(info.indexOf(caveat_string_AP) == -1){
                        d3.select("#INFO-CAVEAT").text(info +" " + caveat_string_AP);
                }
                $("#INFO-CAVEAT").show()
            }else{
                var info = d3.select("#INFO-CAVEAT").text();
                d3.select("#INFO-CAVEAT").text(info + "");
                 $("#INFO-CAVEAT").hide()
            }
            
            createState(currentStatePlot,currentCategoryPlot); 
            
        }
    
        // Handeling the Index select
        $(".INDEX_CATEGORY_DROPDOWN_SELECT").on('click',function(){
            
                IndexDropDownSelect( $(this).attr('id') );
        })
    
       function IndexDropDownSelect( indexDropdownSelect ){
                MainHeading.text("Generating Map ...");
            
                  //Change for Index Show up
                 
                  $("#non_index_tabs").hide();
                  $("#tooltip-area").hide();
                  $("#table-area").show();
                  $("#legends").hide();

                  
                  var info = d3.select("#INFO-CAVEAT").text();
                  d3.select("#INFO-CAVEAT").text(info + "");
                     
                  index_plot = indexDropdownSelect;
                  
                     
                if(indexDropdownSelect == 'INFRA_INDEX'){
                    MainHeading.text("Generating Map ...")
                    $("#index_tabs").show();
                    $("#legends").show();     
                    $("#table-area").show();
                    var info = d3.select("#INFO-CAVEAT").text();
                    d3.select("#INFO-CAVEAT").text(info + "");

                    $("#main-head").text("Health Infrastructure Index : INDIA")
                    

                }else if(indexDropdownSelect == 'MET_INDEX'){
                    MainHeading.text("Generating Map ...")
                    $("#legends").hide();
                    $("#table-area").hide();
                    $("#index_tabs").hide();
                    //outlineMap.style('fill','#74A9CF')
                    $("#main-head").text("Maternal Health Index : INDIA")

                }else if(indexDropdownSelect == 'CHILD_CARE_INDEX'){
                    MainHeading.text("Generating Map ...")
                    $("#legends").hide();
                    $("#table-area").hide();
                    $("#index_tabs").hide();    
                    //outlineMap.style('fill','#74A9CF')
                    $("#main-head").text("Child Health Index : INDIA")

                }else if(indexDropdownSelect == 'COMM_DIS_INDEX'){
                    MainHeading.text("Generating Map ...")
                    
                    $("#legends").hide();
                    $("#table-area").hide();
                    $("#index_tabs").hide();
                    //outlineMap.style('fill','#74A9CF')

                   MainHeading.text("Communicable Disease Index")

                }else if(indexDropdownSelect == 'NON_COMM_DIS_INDEX'){

                    MainHeading.text("Generating Map ...")
                    $("#legends").hide();
                    $("#table-area").hide();
                    $("#index_tabs").hide();
                    //outlineMap.style('fill','#74A9CF')
                    $("#main-head").text("Non Communicable Diseases Index : INDIA")

                }else if(indexDropdownSelect == 'GEN_INDEX'){

                    MainHeading.text("Generating Map ...")
                    $("#legends").hide();
                    $("#table-area").hide();
                    $("#index_tabs").hide();
                    //outlineMap.style('fill','#74A9CF')
                    $("#main-head").text("General Health Index : INDIA")
                }
           
                currentStatePlot = 'India_state';
                currentCategoryPlot = 'QUALITY_INDEX';
                createState(currentStatePlot,currentCategoryPlot);
           
       }

    
       if(stateCallCode == null){
           createState("Assam",'PHC_AVL');
       }else{
           createState(stateCallCode,mapCallCode);
       }
    
        //To enable only single click on the India Map button
        $("#IndiaBtn").attr("disabled", false);
        d3.select("#IndiaBtn").on('click',function(){
            
            plotMap(1);
            $(this).attr("disabled", true);
        })

       function createState(stateCall,functionCall){
            
            if(NavigateData!=null){
                
                     
                     
                     STATE = stateCall;
                     if(stateCall == 'India_state'){
                         STATE = 'India';
                     }
                     DATA_FILE_LOCATION = NavigateData[STATE].DATA_FILE_LOCATION;
                     GEOM_WIDTH_R = NavigateData[STATE].GEOM_WIDTH_R.m1*NavigateData[STATE].GEOM_WIDTH_R.m2;
                     GEOM_HEIGHT_R = NavigateData[STATE].GEOM_HEIGHT_R.m1*NavigateData[STATE].GEOM_HEIGHT_R.m2;
                     GEOM_SCALE_R = NavigateData[STATE].GEOM_SCALE_R.m1*NavigateData[STATE].GEOM_SCALE_R.m2;
                     FUNCTION_CALLL = currentCategoryPlot;

                     if(canvas) canvas.remove();
                     canvas = null;
                     if(outlineMap) outlineMap.remove();
                     outlineMap = null;
                     if(STATEDistrictName) STATEDistrictName.remove();
                     STATEDistrictName = null;
                     
                     create(stateCall,FUNCTION_CALLL);
             }else{
                     STATE = currentStatePlot;
                     DATA_FILE_LOCATION = 'data/as.csv';
                     GEOM_WIDTH_R = 8*2.27/2;
                     GEOM_HEIGHT_R = 4*(2.49)/2;
                     GEOM_SCALE_R = 5.2*(1.140);
                     FUNCTION_CALLL = currentCategoryPlot;

                     if(canvas) canvas.remove();
                     canvas = null;
                     if(outlineMap) outlineMap.remove();
                     outlineMap = null;
                     if(STATEDistrictName) STATEDistrictName.remove();
                     STATEDistrictName = null
                     create(stateCall,FUNCTION_CALLL);
             }
             
        }
        var current = function(){};
        var prevWidth = null , prevHeight = null;
        var margin = {
            top : 10,
            bottom : 10,
            left : 10,
            right : 10
        }
        
        var width = parseInt(d3.select('#chart-area').style('width'))
            width = width - margin.left - margin.right;
        prevWidth = width;
        var mapRatio = 0.62;
        var height = width*mapRatio;
        prevHeight = height;
        
        var tooltipArea = d3.select("#tooltip-area")
                            tooltipArea.style('height',height+'px');
                            $("#tooltip-area").show()
        var dataTable = d3.select("#table-area").style('height',height+'px');
                            dataTable.style('height',height+'px');
        $("#legends").show();

        var projectionState,pathState;
        
        var legendsData = d3.select("#legends");
        legendsData.style('visibility','hidden')
        
        
        
        //Setting the map navigation
        var SCSTATEInfo = d3.select("#STATE-SC-shortage");
        var PHCSTATEInfo = d3.select("#STATE-PHC-shortage");
        var CHCSTATEInfo = d3.select("#STATE-CHC-shortage");
        
        var SCSTATEInfo16 = d3.select("#STATE-SC-shortage_2016");
        var PHCSTATEInfo16 = d3.select("#STATE-PHC-shortage_2016");
        var CHCSTATEInfo16 = d3.select("#STATE-CHC-shortage_2016");
        
        var SCSTATEAccess = d3.select("#STATE-SC-access");
        var PHCSTATEAccess  = d3.select("#STATE-PHC-access");
        var CHCSTATEAccess  = d3.select("#STATE-CHC-access");
        
        var InfoStateName = d3.select("#STATE-HEAD");
        var InfoRuralPopulation = d3.select("#RURAL-POPULATION");
        var InfoUrbanPopulation = d3.select("#URBAN-POPULATION");
        var InfoUrbanPopulationHead = d3.select("#URBP");
        var InfoRuralTribalPopulation = d3.select("#RURAL-TRIBAL-POPULATION");
        var InfoHealthCategoryName = d3.select("#CATEGORY-HEAD");
        var InfoExisting = d3.select("#EXISTING");
        var InfoRequired = d3.select("#REQUIRED");
        var InfoShortage = d3.select("#SHORTAGE");
        InfoShortage.style("background","#fff")
        var InfoShortageLabel = d3.select("#SHORTAGE-LABEL");
        var InfoExistingLabel = d3.select("#EXISTING-LABLE");
        var InfoRequiredLabel = d3.select("#REQUIRED-LABLE");

        
        
        
        //Defining the legends
        var color_SHC_shortage_STATE_2011 = ['#045A8D','#2B8CBE','#FFC107','#E65100']
        var label_SHC_shortage_STATE_2011 = ['Large Surplus (30-150)','Surplus (0-29)','Shortage (1-150)','Extreme Shortage ( >150)'];
        
        var color_PHC_shortage_STATE_2011 = ['#045A8D','#2B8CBE','#FFC107','#E65100'];
        var label_PHC_shortage_STATE_2011 = ['Large Surplus (10-35)','Surplus (0-9)','Shortage (1-40)','Extreme Shortage ( >40)'];
            
        var color_CHC_shortage_STATE_2011 = ['#045A8D','#2B8CBE','#FFC107','#E65100'];
        var label_CHC_shortage_STATE_2011 = ['Large Surplus (100-220)','Surplus (0-99)','Shortage (1-5)','Extreme Shortage ( >5)'];
        
        var colorAccessSubCenter_STATE_gt_5km = ['#E65100','#FFC107','#2B8CBE','#045A8D','#fff'];
        var LabelAccessSubCenter_STATE_gt_5km = ['< 25','26-50','51-60','>60','No Data'];
        
        var colorAccessPHC_STATE_gt_5km = ['#E65100','#FFC107','#2B8CBE','#045A8D','#fff'];
        var LabelAccessPHC_STATE_gt_5km = ['< 25','26-50','51-60','>60','No Data'];
        
        var colorAccessCHC_STATE_gt_5km = ['#E65100','#FFC107','#2B8CBE','#045A8D','#fff'];
        var LabelAccessCHC_STATE_gt_5km = ['< 25','26-50','51-60','>60','No Data'];
    
        function create(stateNameCall,categoryCall){
           
        stateAPIData = null,STATEDistrictTopo=null;
           
        
           
        /*Reframing the colors*/
        if(InfoExisting) InfoExisting.style('color','black')
        if(InfoRequired) InfoRequired.style('color','black')
        if(InfoShortage) InfoShortage.style('color','black')
            
        
        
        apiVAR = [];
        //Creating the data_vars for the API
        PlotCategory[categoryCall].reqVar.forEach(function(d){
           
            var obj = {
                "data_var" : d.v
            }
            apiVAR.push(obj)
        })
        
       
        
        plotVar = PlotCategory[categoryCall].plotVar;
        
        if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
           
            //Asynchronous download of the data :: District TopoJson ; APICallData 
            d3.json('./assets/geojson/indianewmaptopo.json',function(error,data){
                
                STATEDistrictTopo = data;
                callReady();
            })
            
        }else if(stateNameCall == 'India_state' || PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){

                  
            d3.json('./assets/geojson/indianewmaptopo.json',function(error,data){

                STATEDistrictTopo = data;
                callReady();
            })

       }else{
            
            //Asynchronous download of the data :: District TopoJson ; APICallData 
            d3.json('./assets/geojson/2011_dist_topojson.json',function(error,data){
                
                STATEDistrictTopo = data;
                callReady();
            })
            
        }
           
        //Initiating the API call to get the plotting data
        if( PlotCategory[categoryCall].plotType == "QUALITY_INDEX" ){
              stateAPIData = null;
              //To include hmis.csv
            
               if(tableCheck.HMISTable == 0){
                  tableCheck.HMISTable = 1;
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS HMIS; SELECT * INTO HMIS FROM CSV("assets/data/hmis.csv")';
               }else{
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS HMIS;';
               }
              alasql
              .promise(sqlCreate)
              .then(function(res){
                
                    alasql.promise('SELECT * FROM HMIS ORDER BY RANKING ASC').then(function(resultData){
                        //console.log("This is the data from alasql : ",resultData[2]);
                        stateAPIData = resultData;
                        callReady();
                        
                    }).catch(function(err){
                        //console.log('error:', err);
                    })
                  
              }).catch(function(err){
                   //console.log('error:', err);
              });
            
              /*$.ajax({
              type: 'POST',
              url: 'https://mycol.io:8080/index',
              withCredentials:true,
              data: {},
              dataType: "json",
              success: function(resultData) { 
                  
                  if(resultData.status == 'success'){
                      console.log("This is the data from API : ",(resultData.message)[2]);
                      stateAPIData = resultData.message;
                      callReady();
                  }else{
                     
                  }
              },
              error: function(){}})*/
           
        }else if(stateNameCall == 'India_state' || PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
            stateAPIData = null;
            //Here to use : stateWiseData.csv and quality file
            if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
               if(tableCheck.qualityTable == 0){
                  tableCheck.qualityTable = 1;
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS quality; SELECT * INTO quality FROM CSV("assets/data/quality.csv")';
               }else{
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS quality;';
               }
              //To include quality.csv
              //Corresponding to https://mycol.io:8080/stateWiseData
              alasql
                  .promise(sqlCreate)
                  .then(function(res){

                        /*Make query from apiVAR query*/
                        //Query container
                        var query = "SELECT ST_NM ";

                        //Prepare the variable set
                        apiVAR.forEach(function(d){
                            query += " , " + d.data_var;
                        })

                        //Update the data location
                        if(stateNameCall == 'India_state'){
                            query += " FROM quality";
                        }else{
                            query += " FROM quality WHERE ST_CD = "+StateCodeObject[stateNameCall];
                        }

                        //Call the next query to populate
                        alasql.promise(query).then(function(resultData){
                            //console.log("This is the data from alasql : ",resultData[2]);
                            stateAPIData = resultData;
                            callReady();

                        }).catch(function(err){
                            //console.log('error:', err);
                        })

                  }).catch(function(err){
                       //console.log('error:', err);
                  });
            }else{
                  var sqlCreate = '';
                  if(tableCheck.stateTable == 0){
                      tableCheck.stateTable = 1;
                      sqlCreate = 'CREATE TABLE IF NOT EXISTS stateWiseData; SELECT * INTO stateWiseData FROM CSV("assets/data/stateWiseData.csv")';
                  }else{
                      sqlCreate = 'CREATE TABLE IF NOT EXISTS stateWiseData;';
                  } 
                
                 //To include stateVaiablesData.csv
                 // Corresponding to https://mycol.io:8080/stateWiseData
                  alasql
                      .promise(sqlCreate)
                      .then(function(res){

                            /*Make query from apiVAR query*/
                            //Query container
                            var query = "SELECT ST_NM ";

                            //Prepare the variable set
                            apiVAR.forEach(function(d){
                                query += " , " + d.data_var;
                            })

                            //Update the data location
                            if(stateNameCall == 'India_state'){
                                query += " FROM stateWiseData";
                            }else{
                                query += " FROM stateWiseData WHERE state_code = "+StateCodeObject[stateNameCall];
                            }

                            //Call the next query to populate
                            alasql.promise(query).then(function(resultData){
                                //console.log("This is the data from alasql : ",resultData[2]);
                                stateAPIData = resultData;
                                callReady();

                            }).catch(function(err){
                                //console.log('error:', err);
                            })

                      }).catch(function(err){
                           //console.log('error:', err);
                      });
            }
            
            /*var link = "https://mycol.io:8080/stateWiseData";
            if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
                link = "https://mycol.io:8080/qualityData";
            }else{
                link = "https://mycol.io:8080/stateWiseData";
            }
            
            $.ajax({
              type: 'POST',
              url: link,
              data: {var_data:JSON.stringify(apiVAR),ST_CD:(stateNameCall == 'India_state')?-1:StateCodeObject[stateNameCall]},
              withCredentials:true,
              dataType: "json",
              success: function(resultData) { 
                  
                  if(resultData.status == 'success'){
                      stateAPIData = resultData.message;
                      callReady();
                  }else{
                     
                  }
              },
              error: function(){}})*/
            
        }else{
            stateAPIData = null;
              //To include stateVaiablesData.csv
              var sqlCreate = '';
              if(tableCheck.districtTable == 0){
                  tableCheck.districtTable = 1;
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS datafile; SELECT * INTO datafile FROM CSV("assets/data/datafile.csv")';
              }else{
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS datafile;';
              }
              /* tableCheck = {
                    districtTable : 0,
                    stateTable : 0,
                    qualityTable : 0,
                    HMISTable : 0
              }   */
            
              alasql
              .promise(sqlCreate)
              .then(function(res){
                  
                    /*Make query from apiVAR query*/
                    //Query container
                    var query = "SELECT DISTRICT ";

                    //Prepare the variable set
                    apiVAR.forEach(function(d){
                        query += " , " + d.data_var;
                    })
                  
                    //Update the data location
                    if(stateNameCall == 'India'){
                        query += " FROM datafile";
                    }else if(StateCodeObject[stateNameCall] == 37){
                        query += " FROM datafile WHERE state_code IN (36,37)";
                    }
                    else{
                        query += " FROM datafile WHERE state_code = "+StateCodeObject[stateNameCall];
                    }
                  
                    //Call the next query to populate
                    alasql.promise(query).then(function(resultData){
                        //console.log("This is the data from alasql : ",resultData[2]);
                        stateAPIData = resultData;
                         console.log("Tetsing value : ",stateAPIData);
                        //console.log("Query : ",query);
                        //console.log("Data Collection : ",stateAPIData.length);
                        callReady();
                        
                    }).catch(function(err){
                        //console.log('error:', err);
                    })
                  
              }).catch(function(err){
                   //console.log('error:', err);
              });
            
             /*$.ajax({
              type: 'POST',
              url: "https://mycol.io:8080/stateVaiablesData",
              data: {state_code:(stateNameCall == 'India'?'*':StateCodeObject[stateNameCall]),var_data:JSON.stringify(apiVAR)},
              withCredentials:true,
              dataType: "json",
              success: function(resultData) { 
                  
                  if(resultData.status == 'success'){
                      //console.log("This is the data from API : ",(resultData.message)[2]);
                      //stateAPIData = resultData.message;
                      //callReady();
                  }else{
                     
                  }
              },
              error: function(){}})*/
        }
       
        
        /*This function was created to ensure that only when TopoJSON (cordinates for map plot) and PlotData(API call) has been downloaded
          The Plotting functions will be called as both of the above are asynchronous*/
           
        function callReady(){
            
            if(stateAPIData!=null && STATEDistrictTopo!=null){
                if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY" || stateNameCall == 'India_state' || PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){
                    if(canvas) canvas.remove();
                    
                    qualityPlots(STATEDistrictTopo,stateAPIData);
                }else if(stateNameCall == 'India'){
                    if(canvas) canvas.remove();
                        PlotIndia(STATEDistrictTopo,stateAPIData);
                }else{
                    if(canvas) canvas.remove();
                    PlotStates(STATEDistrictTopo,stateAPIData);
                }
            }
        }
        
        //This is to inform the user, that MAP for Andhra Pradesha and Telengana are combined together
            if(currentStatePlot == 'Andhra Pradesh'){
                var info = d3.select("#INFO-CAVEAT").text();
                d3.select("#INFO-CAVEAT").text(info +"   *The data shown is for Andhra Pradesh and Telangana combined");
            }else{
                d3.select("#INFO-CAVEAT").text("")
            } 
            if(currentCategoryPlot == 'p_jsy_anc'){
                var info = d3.select("#INFO-CAVEAT").text();
                d3.select("#INFO-CAVEAT").text(info + " *JSY : Janani Suraksha Yojana");
            }else{
                d3.select("#INFO-CAVEAT").text("")
            }
        
		function PlotStates(STATEDistrictTopo,stateAPIData){
            
           /*var TotalSC2011,TotalSC2016, DesiredSC, TotalPHC2011,TotalPHC2016=0, DesiredPHC=0, TotalCHC2011,TotalCHC2016, DesiredCHC;*/
           var TotalRuralPop = 0, TotalRuralTribalPop = 0,TotalUrbanPopulation = 0,Total = 0, Desired = 0,TotalInfoVillage = 0,TotalPopulation = 0;
           
           //Variables for data Mapping
           var STATEDistrict,dataValue;
            
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#chart-area").show();
            $("#backdrop-image").hide();    
            
           /*QuickFix : To adjust the margin between map and legends for StateWise and IndiaWise map*/
           d3.select("#leg_id").style('margin-top','0');
            
           //Consolidating the STATE data in one file
           STATEDistrictTopo.objects['2011_Dist'].geometries.forEach(function(d,i){
               
                var ST_NM = STATE;
                if(STATE.toUpperCase() == 'NCT OF DELHI'){
                   
                }if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                    STATE == 'ARUNACHAL PRADESH'
                }
                if(d.properties.ST_NM != ST_NM)
                {
                    delete STATEDistrictTopo.objects['2011_Dist'].geometries[i];
                }else{
                    STATEDistrict = d.properties.DISTRICT;
                    
                    if( d.properties.DISTRICT == 'Bangalore'){
                        d.properties.DISTRICT = 'Bengaluru';
                    }if( d.properties.DISTRICT == 'Bangalore Rural'){
                        d.properties.DISTRICT = 'Bengaluru Rural';
                    }if( d.properties.DISTRICT == 'Darjiling'){
                        d.properties.DISTRICT = 'Darjeeling';
                    }if(d.properties.DISTRICT == 'Y.S.R'){
                        d.properties.DISTRICT = "YSR Kadapa"
                    }if(d.properties.DISTRICT == 'Ganganagar'){
                        d.properties.DISTRICT = "Sri Ganganagar"
                    }if(d.properties.DISTRICT == 'Jhunjhunun'){
                        d.properties.DISTRICT = "Jhunjhunu";
                    }if(d.properties.DISTRICT == 'Dohad'){
                        d.properties.DISTRICT = "Dahod";
                    }
                    
                    stateAPIData.forEach(function(d2){
                        if(d2.DISTRICT == STATEDistrict)
                                {
                                    //Loading the variables specified in the plotVar category list
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        d.properties[prop] = d2[prop];
                                    })
                                    
                                    d.properties.n_total_pop = d2.n_rural_pop +d2.n_rural_tr_pop +d2.n_urban_pop;
                                
                                    if(categoryCall == "PHC_AVL"){
                                        Total += parseInt(d2.desiredPHC) - parseInt(d2.shortagePHC);
                                        Desired += parseInt(d2.desiredPHC);
                                    }else if(categoryCall == "SC_AVL"){
                                        Total += parseInt(d2.desiredSC) - parseInt(d2.shortageSC);
                                        Desired += parseInt(d2.desiredSC);
                                    }else if(categoryCall == "CHC_AVL"){
                                        Total += parseInt(d2.desiredCHC) - parseInt(d2.shortageCHC);
                                        Desired += parseInt(d2.desiredCHC);
                                    }else if(PlotCategory[categoryCall].plotType == "NON_COMP"){
                                        Total += parseInt(d2[PlotCategory[categoryCall].reqVar[0].v]);
                                    }
                                    
                                    //Collecting the relevent data
                                    if(categoryCall == "SC_ACCESSIBILITY" || categoryCall == "PHC_ACCESSIBILITY"){
                                        TotalRuralPop += parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]);
                                        
                                        TotalRuralTribalPop += parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]);
                                        
                                        TotalInfoVillage += parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]);
                                    }else if(categoryCall == "CHC_ACCESSIBILITY"){
                                         TotalRuralPop += parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]);
                                        
                                        TotalRuralTribalPop += parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]);
                                        
                                        TotalInfoVillage += parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]) + parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]);
                                    }else{
                                        TotalRuralPop += parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]);
                                        TotalRuralTribalPop += parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]);
                                        TotalUrbanPopulation += parseInt(d2.n_urban_pop);
                                        TotalPopulation += parseInt(d.properties.n_total_pop);
                                    }
                                    
                                }
                        })
                }
            })
            
            $("#DENOMINATOR").text(PlotCategory[categoryCall].denom_head)
            $("#NUMERATOR").text(PlotCategory[categoryCall].num_head)
            
          
            
            //This data is required for plotting
            projectionState = d3.geo.mercator()
                             .translate([-width*GEOM_WIDTH_R, height*GEOM_HEIGHT_R])
                             .scale([width*GEOM_SCALE_R]);
            pathState = d3.geo.path().projection(projectionState);
            
            d3.select(window).on('resize',function(){
                if(prevHeight < height){
                    
                     {fontSize = 10*(height/prevHeight);}
                    
                 }else if(prevHeight > height){
                     
                      {fontSize = 10*(height/prevHeight);}
                 }else if(prevWidth < width){
                     
                     {fontSize = 10*(width/prevWidth);}
                 }else if(prevWidth > width){
                     
                      {fontSize = 10*(width/prevWidth);}
                 }
            width = parseInt(d3.select('#chart-area').style('width'))
            width = width - margin.left - margin.right;
            height = width*mapRatio;
                
            createState(currentStatePlot,currentCategoryPlot);
            
            })
            
        
        if(PlotCategory[categoryCall].plotType == "DIST"){
           dynamicPlot(); 
        }else if(PlotCategory[categoryCall].plotType == "NON_COMP"){
            dynamicPlotNonComp();   
        }else{
            dynamicPlotPercentage();
        }
        
    
            
        var infoDataMargin_left = 120;
        var infoDataMargin_top = 140;
        
            
        //Plotting the main data map
            
        function dynamicPlot()
            {
                var sht = apiVAR[0].data_var
                var dsr = apiVAR[3].data_var
                
                
                
                if(STATE.toUpperCase() == 'NCT OF DELHI'){
                   STATE == 'DELHI'
                }if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                    STATE == 'ARUNACHAL PRADESH'
                }
                
                
                $("#sub-info").addClass("col-border");
                $("#sub-info").show();
                $("#sub-info-q").hide();
               
                
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
               
                legendsData.style('visibility','visible')
                
                canvas = d3.select('#chart-area').append('svg')
                    .attr('height',height)
                    .attr('width',width)
                    .style('background',"#fff")
                
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide();
                    if(STATE == "Andhra Pradesh"){
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                        // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        InfoStateName.text("Delhi".toUpperCase())
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                        InfoStateName.text(STATE.toUpperCase())
                    }
                
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                
                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation))
                InfoUrbanPopulationHead.text("Total Urban Population")
                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                InfoRequired.text(numberWithCommas(Desired))
                InfoExisting.text(numberWithCommas(Total))
                InfoRequiredLabel.text("Required")
                InfoExistingLabel.text("Existing")
                InfoRequired.style('background','#A5B3A4')
                InfoExisting.style('background','#BFDFF1')
                if(Desired - Total > 0){
                    
                    InfoShortageLabel.text("Shortage (%)")
                    if(Desired == 0)
                    {
                        InfoShortage.text("");
                    }else if(Total == 0){
                        InfoShortage.text("Data not available");
                    }else{
                        //Changing the formula to {(Existing - Desired) / Desired}
                        InfoShortage.text(((Desired-Total)*100/Desired).toFixed(0)+"%")
                    }
                    
                    InfoExisting
                      .transition()
                      .duration(200)
                      .style('width',function(){
                        
                        return (140*Total/Desired) + 'px';
                    })
                    InfoRequired
                      .transition()
                      .duration(200)
                      .style('width',function(){
                         return (140) + 'px';
                    })
                    InfoShortage.style('color','#D96331')
                }else{
                    InfoShortageLabel.text("Surplus (%)")
                    if(Desired == 0)
                    {
                        InfoShortage.text("");
                    }else if(isNaN((Total-Desired)/Desired))
                    {
                        InfoShortage.text("NA")

                    }else{
                        //Changing the formula to {(Existing - Desired) / Desired}
                        InfoShortage.text(((Total-Desired)*100/Desired).toFixed(0)+"%")
                    }
                    
                    InfoRequired
                      .transition()
                      .duration(200)
                      .style('width',function(){
                        
                         return (140*Desired/Total) + 'px';
                    })
                    InfoExisting
                      .transition()
                      .duration(200)
                      .style('width',function(){
                        return (140) + 'px';
                    })
                    InfoShortage.style('color','#460')
                }
                
              var centered,zoomState=0;
              var g = canvas.append("g");
              
                outlineMap = g.append("g")
                        .selectAll("path")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter()
                        .append("path")
                        .attr("d", pathState)
                        .attr("class", "states")
                        .attr('stroke-width', 1)    
                        .attr('stroke', 'white')
                
                outlineMap.style('fill',function(d,i){
                    if(d == undefined || d.properties[sht] == undefined || d.properties[dsr]==undefined){
                        /*if(STATE == 'Andhra Pradesh' || STATE == 'Telangana'){
                            return "#FFF";
                        }*/
                        return color_PHC_shortage_STATE_2011[4];
                    }
                    else{ /*if(d.properties[sht]<=-30){
                        */
                        if(d.properties[sht] > 0){
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) <= 25){
                                
                                return plotVarDef[plotVar.v].limit.l4.c;
                            }else{
                                return plotVarDef[plotVar.v].limit.l3.c;
                            }
                        }
                        else if(d.properties[sht] <= 0){
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return plotVarDef[plotVar.v].limit.l2.c;
                            }else{
                                return plotVarDef[plotVar.v].limit.l1.c;
                            } 
                        }
                    }
                 })
                .on('click',function(d){
                        
                  })
               .on('mouseover',function(d){
                
                d3.select(this).style('opacity',"0.6")
                    if(STATE == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                         MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        //InfoStateName.text("Delhi".toUpperCase())
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + STATE)
                        //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                    }
                    
                    if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                         
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoUrbanPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                        InfoRequiredLabel.text("Required")
                        InfoExistingLabel.text("Existing")
                        InfoRequired.style('background','#A5B3A4')
                        InfoExisting.style('background','#BFDFF1')
                        
                        InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                        InfoRuralTribalPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[2].v]))
                        InfoUrbanPopulation.text(numberWithCommas(d.properties.n_urban_pop));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoRequired.text(numberWithCommas(d.properties[dsr]))
                        InfoExisting.text(numberWithCommas( d.properties[dsr] - d.properties[sht]))
                        if(d.properties[sht] > 0){
                            InfoShortageLabel.text("Shortage (%)")
                            if(d.properties[dsr] == 0)
                            {
                                InfoShortage.text("");
                            }else if(isNaN((d.properties[sht])*100/(d.properties[dsr])))
                            {
                                InfoShortage.text("NA")

                            }else{
                                //Changing the formula to {(Existing - Desired) / Desired}
                                InfoShortage.text(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0)+"%")
                            }
                            
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                 return (140) + 'px';
                            })

                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140*(d.properties[dsr] - d.properties[sht])/d.properties[dsr]) + 'px';
                            })

                            InfoShortage.style('color','#D96331')
                        }else{
                            
                            InfoShortageLabel.text("Surplus (%)")
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(d.properties[dsr] == 0)
                            {
                                InfoShortage.text("");
                            }else if(isNaN((d.properties[sht]*-1)*100/(d.properties[dsr])))
                            {
                                InfoShortage.text("NA")

                            }else{
                                
                                InfoShortage.text(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0)+"%")
                            }
                             InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140) + 'px';
                            })
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                 return (140*d.properties[dsr]/(d.properties[dsr] - d.properties[sht])) + 'px';
                            })

                            InfoShortage.style('color','#460')
                        }
                    }
                 }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select(this).style('opacity',"1")
                    
                        InfoRequiredLabel.text("Required")
                        InfoExistingLabel.text("Existing")
                        InfoRequired.style('background','#A5B3A4')
                        InfoExisting.style('background','#BFDFF1')
                    
                            if(STATE == "Andhra Pradesh"){
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                        // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        InfoStateName.text("Delhi".toUpperCase())
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                        InfoStateName.text(STATE.toUpperCase())
                    }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoRequired.text(numberWithCommas(Desired))
                        InfoExisting.text(numberWithCommas(Total))
                        if(Desired - Total > 0){
                            
                            InfoShortageLabel.text("Shortage (%)")
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }else if(isNaN((Desired-Total)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Desired-Total)*100/Desired).toFixed(0)+"%")
                            }
                            
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                return (140*Total/Desired) + 'px';
                            })
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                 return (140) + 'px';
                            })
                            InfoShortage.style('color','#D96331')
                        }else{
                            InfoShortageLabel.text("Surplus (%)")
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }else if(isNaN((Total-Desired)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Total-Desired)*100/Desired).toFixed(0)+"%")
                            }
                            
                            
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                 return (140*Desired/Total) + 'px';
                            })
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140) + 'px';
                            })
                            InfoShortage.style('color','#460')
                        }
                     })

                
                    //d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                    d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                    d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                    d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                    d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                    d3.select("#d1").text("> 25%");
                    d3.select("#d2").text("0 - 25%");
                    d3.select("#d3").text("0 - 25%");
                    d3.select("#d4").text("> 25%");
         }
      
        function dynamicPlotPercentage()
            {
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
           
                  {
                        canvas = d3.select('#chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                        .attr('width',width)
                   }
                
                $("#sub-info").addClass("col-border");
                $("#sub-info").show();
                $("#sub-info-q").hide();
                
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide()  
                if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                    if(STATE == "Andhra Pradesh"){
                         //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                         //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        InfoStateName.text("Delhi".toUpperCase())
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + STATE)
                        InfoStateName.text(STATE.toUpperCase())
                    }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text("");
                        InfoUrbanPopulationHead.text("")
                        InfoHealthCategoryName.text("")                        
                        InfoExisting.text("")
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }else{
                            if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                 //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalPopulation));
                        InfoUrbanPopulationHead.text("Total Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*(TotalRuralTribalPop/TotalRuralPop)*100)+'px';
                        })
                       
                        InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("Percent")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }
                       
                  var g = canvas.append("g");
                  var centered,zoomState=0;
                   outlineMap = g.append("g")
                        .selectAll("path")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter()
                        .append("path")
                        .attr("d", pathState)
                        .attr("class", "states")
                        .attr('stroke-width', 1)
                        .attr('stroke', 'white')
                  
             
                
                   outlineMap.attr('stroke-width', 1)
                      .attr('stroke', 'white')
                      .style('fill',function(d,i){

                       if(d == undefined || d.properties[plotVar.v]== undefined){
                            return '#445'//colorAccessSubCenter_STATE_gt_5km[4];
                        }
                        else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l4.l && d.properties[plotVar.v].toFixed(0)<plotVarDef[plotVar.v].limit.l4.r){
                            return plotVarDef[plotVar.v].limit.l4.c;
                        }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l3.l && d.properties[plotVar.v].toFixed(0) <=plotVarDef[plotVar.v].limit.l3.r){
                            return plotVarDef[plotVar.v].limit.l3.c;
                        }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l2.l && d.properties[plotVar.v].toFixed(0)<=plotVarDef[plotVar.v].limit.l2.r){
                            return plotVarDef[plotVar.v].limit.l2.c;
                        }else if(d.properties[plotVar.v].toFixed(0) >plotVarDef[plotVar.v].limit.l1.l ){
                            return plotVarDef[plotVar.v].limit.l1.c;
                        }else{
                            return '#000'
                        }
                     })
                   .on('mouseover',function(d){
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                //InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                            }
                  
                    
                    d3.select(this).style('opacity',"0.6")
                      if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                            if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                            }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                                InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                            }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                                InfoStateName.text("District : " + "Jhunjhunu");
                            }else{
                                InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                            }
                            if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within5_PHC' || plotVar.v == 'p_within10_CHC'){  
                                InfoUrbanPopulation.text("")
                            }else{
                                InfoUrbanPopulation.text("NA")
                            }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")
                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                       
                          
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                          
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within5_PHC'){  
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])))
                            
                        InfoExistingLabel.text("Percent*");
                         $("#CAVEAT_ROW").show()   
                         d3.select("#CAVEAT").text("*Based on Census 2011 sample size of "+((parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[5].v]))/parseFloat(d.properties[PlotCategory[categoryCall].reqVar[1].v])*100).toFixed(0)+"% villages");
                            
                        }else if(plotVar.v == 'p_within10_CHC'){
                            
                        InfoExistingLabel.text("Percent*")
                         $("#CAVEAT_ROW").show();     
                         d3.select("#CAVEAT").text("*Based on Census 2011 sample size of "+((parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[5].v]))/parseFloat(d.properties[PlotCategory[categoryCall].reqVar[1].v])*100).toFixed(0)+"% villages");
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])))
                            
                        }else{
                            
                        InfoExistingLabel.text("Percent")
                            
                         InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                        }
                          
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                             InfoUrbanPopulation.text("");
                             InfoUrbanPopulationHead.text("")
                        }else{
                             InfoUrbanPopulation.text(numberWithCommas(d.properties.n_total_pop));
                             InfoUrbanPopulationHead.text("Total Population")
                        }
                            
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*d.properties[plotVar.v])+'px';
                        })
                       
                        InfoExisting.text(parseFloat(d.properties[plotVar.v]).toFixed(0)+"%")
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        
                         
                    
                       
                      }
                }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select("#CAVEAT").text("")
                    $("#CAVEAT_ROW").hide();
                    d3.select(this).style('opacity',"1")
                       if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                 //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoUrbanPopulation.text("");
                                InfoUrbanPopulationHead.text("")
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text("")                        
                                InfoExisting.text("")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }else{
                                  if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                 //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                                InfoExisting
                                      .transition()
                                      .duration(200)
                                      .style('width',function(){
                                        return (1.40*(TotalRuralTribalPop/TotalRuralPop)*100)+'px';
                                })

                                InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")

                                InfoUrbanPopulation.text(numberWithCommas(TotalPopulation));
                                InfoUrbanPopulationHead.text("Total Population")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#BFDFF1')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("Percent")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }
                   
                })

                d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                if(plotVarDef[plotVar.v].limit.l1.r == 100){
                    d3.select("#d4").text("< "+plotVarDef[plotVar.v].limit.l4.r+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("> " + plotVarDef[plotVar.v].limit.l1.l+"%");
                }else{
                    d3.select("#d4").text("> "+ plotVarDef[plotVar.v].limit.l4.l+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("< "+ plotVarDef[plotVar.v].limit.l1.r+"%");
                }
        }
            
       function dynamicPlotNonComp()
        {
            
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
             
            
               
                $("#legends").hide()
                
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
           
                  {
                        canvas = d3.select('#chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                        .attr('width',width)
                   }
            
                $("#sub-info").show();
                $("#sub-info").addClass("col-border");
                $("#sub-info-q").hide();
            
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide()  
                if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                            if(STATE.toUpperCase() == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text("");
                        InfoUrbanPopulationHead.text("")
                        InfoHealthCategoryName.text("")                        
                        InfoExisting.text("")
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }else{
                            if(STATE.toUpperCase() == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                    
                        InfoExistingLabel.style("font-size","20px")
                        InfoExisting.style("font-size","30px")
                       
                        InfoExisting.text(Total)
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("No. of Hospitals")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }
                       
                  var g = canvas.append("g");
                  var centered,zoomState=0;
                   outlineMap = g.append("g")
                        .selectAll("path")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter()
                        .append("path")
                        .attr("d", pathState)
                        .attr("class", "states")
                        .attr('stroke-width', 1)
                        .attr('stroke', 'white')
                        .style('fill',function(d){
                            if(d==undefined){
                                return "#000";
                            }else{
                                return "#74A9CF"
                            }
                        })
                  
             
                
              outlineMap/*.attr('stroke-width', 1)
                  .attr('stroke', 'white')
                  .style('fill',function(d,i){
                        
                   if(d == undefined || d.properties[plotVar.v]== undefined){
                        return '#445'//colorAccessSubCenter_STATE_gt_5km[4];
                    }
                    else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l4.l && d.properties[plotVar.v].toFixed(0)<plotVarDef[plotVar.v].limit.l4.r){
                        return plotVarDef[plotVar.v].limit.l4.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l3.l && d.properties[plotVar.v].toFixed(0) <=plotVarDef[plotVar.v].limit.l3.r){
                        return plotVarDef[plotVar.v].limit.l3.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l2.l && d.properties[plotVar.v].toFixed(0)<=plotVarDef[plotVar.v].limit.l2.r){
                        return plotVarDef[plotVar.v].limit.l2.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >plotVarDef[plotVar.v].limit.l1.l ){
                        return plotVarDef[plotVar.v].limit.l1.c;
                    }else{
                        return '#000'
                    }
                 })*/
               .on('mouseover',function(d){
                    if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        //InfoStateName.text("Delhi".toUpperCase())
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                        //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                    }
                  
                    if(plotVar.v != 'p_within5_SC' || plotVar.v != 'p_within10_CHC' || plotVar.v != 'p_within5_PHC'){
                        InfoUrbanPopulation.text(numberWithCommas(d.properties.n_urban_pop));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                     }
                  
                    d3.select(this).style('opacity',"0.6")
                       if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[1].v]==undefined){
                        
                             if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoUrbanPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                          
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                       
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                            
                        InfoExistingLabel.text("No. of Hospitals")
                          
                          
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*d.properties[plotVar.v])+'px';
                        })
                       
                        InfoExisting.text(parseFloat(d.properties[plotVar.v]))
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        
                       
                      }
                }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select("#CAVEAT").text("")
                    $("#CAVEAT_ROW").hide()  
                    d3.select(this).style('opacity',"1")
                       if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                             if(STATE.toUpperCase() == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text("")                        
                                InfoExisting.text("")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }else{
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                            
                                InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                                InfoUrbanPopulationHead.text("Total Urban Population")
                            
                                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                               
                                InfoExisting.text(Total)

                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("No. of Hospitals")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }
                   
                })

                d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                if(plotVarDef[plotVar.v].limit.l1.r == 100){
                    d3.select("#d4").text("< "+plotVarDef[plotVar.v].limit.l4.r+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("> " + plotVarDef[plotVar.v].limit.l1.l+"%");
                }else{
                    d3.select("#d4").text("> "+ plotVarDef[plotVar.v].limit.l4.l+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("< "+ plotVarDef[plotVar.v].limit.l1.r+"%");
                }
        }
            
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }  
    }
           
    function PlotIndia(STATEDistrictTopo,stateAPIData){
            
           /*QuickFix : To adjust the margin between map and legends for StateWise and IndiaWise map*/
           d3.select("#leg_id").style('margin-top','0');
        
           var TotalRuralPop = 0, TotalRuralTribalPop = 0,TotalUrbanPopulation = 0,Total = 0, Desired = 0,TotalInfoVillage = 0,TotalPopulation = 0;
        
            var count = 0;
        
           //Variables for data filling
           var STATEDistrict,dataValue;
            
           MainHeading.text("Generating India Map ... ")
          
           //Consolidating the STATE data in one file
     
           if( IndiaDistrictOutlineMap == null){
            
            //console.log("ADDING TO TOPO JSON");
               
             STATEDistrictTopo.objects['2011_Dist'].geometries.forEach(function(d,i){
               
               
                    STATEDistrict = d.properties.DISTRICT;
                    
                    stateAPIData.forEach(function(d2){
                        if(d2.DISTRICT == STATEDistrict)
                                {
                                    //console.log(d2.DISTRICT);
                                    count++;
                                    
                                    if( d.properties.DISTRICT == 'Bangalore'){
                                        d.properties.DISTRICT = 'Bengaluru';
                                    }if( d.properties.DISTRICT == 'Bangalore Rural'){
                                        d.properties.DISTRICT = 'Bengaluru Rural';
                                    }if( d.properties.DISTRICT == 'Darjiling'){
                                        d.properties.DISTRICT = 'Darjeeling';
                                    }if(d.properties.DISTRICT == 'Y.S.R'){
                                        d.properties.DISTRICT = "YSR Kadapa"
                                    }if(d.properties.DISTRICT == 'Ganganagar'){
                                        d.properties.DISTRICT = "Sri Ganganagar"
                                    }if(d.properties.DISTRICT == 'Jhunjhunun'){
                                        d.properties.DISTRICT = "Jhunjhunu";
                                    }if(d.properties.DISTRICT == 'Dohad'){
                                        d.properties.DISTRICT = "Dahod";
                                    }

                                    //Loading the variables specified in the plotVar category list
                                    //console.log(apiVAR);
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        d.properties[prop] = d2[prop];
                                    })
                                    /* plotCheck = {
                                        PHC_AVL : 0,
                                        SC_AVL : 0,
                                        CHC_AVL : 0,
                                        SC_ACCESSIBILITY : 0,
                                        PHC_ACCESSIBILITY : 0,
                                        CHC_ACCESSIBILITY : 0
                                    }*/
                                    if(categoryCall == "PHC_AVL" && plotCheck.PHC_AVL == 0){
                                        //plotCheck.PHC_AVL = 1;
                                        Total += (isNaN(parseInt(d2.desiredPHC))?0:parseInt(d2.desiredPHC)) - (isNaN(parseInt(d2.shortagePHC))?0:parseInt(d2.shortagePHC));
                                        Desired += (isNaN(parseInt(d2.desiredPHC))?0:parseInt(d2.desiredPHC));
                                        
                                    }else if(categoryCall == "SC_AVL" && plotCheck.SC_AVL == 0){
                                        //plotCheck.SC_AVL = 1;
                                        Total += (isNaN(parseInt(d2.desiredSC))?0:parseInt(d2.desiredSC)) - (isNaN(parseInt(d2.shortageSC))?0:parseInt(d2.shortageSC));
                                        Desired += (isNaN(parseInt(d2.desiredSC))?0:parseInt(d2.desiredSC));
                                      
                                    }else if(categoryCall == "CHC_AVL"  && plotCheck.CHC_AVL == 0){
                                        //plotCheck.CHC_AVL = 1;
                                        Total += (isNaN(parseInt(d2.desiredCHC))?0:parseInt(d2.desiredCHC)) - (isNaN(parseInt(d2.shortageCHC))?0:parseInt(d2.shortageCHC));
                                        Desired += (isNaN(parseInt(d2.desiredCHC))?0:parseInt(d2.desiredCHC));
                                        
                                    }
                                    
                                    
                                     d.properties.n_urban_pop = (isNaN(parseInt(d2.n_urban_pop))?0:parseInt(d2.n_urban_pop))
                                     d.properties.n_total_pop = (isNaN(parseInt(d2.n_urban_pop))?0:parseInt(d2.n_urban_pop)) + (isNaN(parseInt(d2.n_rural_pop))?0:parseInt(d2.n_rural_pop)) + (isNaN(parseInt(d2.n_rural_tr_pop))?0:parseInt(d2.n_rural_tr_pop));
                                 
                                    
                                    
                                    
                                    if((categoryCall == "SC_ACCESSIBILITY" && plotCheck.SC_ACCESSIBILITY == 0) || (categoryCall == "PHC_ACCESSIBILITY" && plotCheck.PHC_ACCESSIBILITY == 0))
                                    {
                                        if(categoryCall == "SC_ACCESSIBILITY"){
                                            //plotCheck.SC_ACCESSIBILITY = 1;
                                        }else if(categoryCall == "PHC_ACCESSIBILITY"){
                                            //plotCheck.PHC_ACCESSIBILITY = 1;
                                        }                                        
                                        
                                        TotalRuralPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]));
                                        
                                        TotalRuralTribalPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]));
                                        
                                        TotalInfoVillage += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[4].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]));
                                        
                                        
                                        
                                    }else if(categoryCall == "CHC_ACCESSIBILITY" && plotCheck.CHC_ACCESSIBILITY == 0){
                                        
                                        //plotCheck.CHC_ACCESSIBILITY = 1;
                                        TotalRuralPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]));
                                       
                                        TotalRuralTribalPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]));
                                        
                                        TotalInfoVillage += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[4].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]));
                                        
                                        
                                        
                                    }else{
                                         
                                        TotalRuralPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]));
                                        TotalRuralTribalPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]));
                                        
                                    }
                                    
                                    
                                    TotalUrbanPopulation += (isNaN(parseInt(d2.n_urban_pop))?0:parseInt(d2.n_urban_pop));
                                    TotalPopulation += (isNaN(parseInt(d.properties.n_total_pop))?0:parseInt(d.properties.n_total_pop));
                                }
                        })
                
            })
               
           }else{
               
                $("#India-district-chart-area").show();
                $("#India-state-chart-area").hide();
                $("#chart-area").hide();
                $("#backdrop-image").hide();
               
                TotalRuralPop = 0;
                TotalRuralTribalPop= 0;
                TotalUrbanPopulation= 0;
                Total= 0;
                Desired= 0;
                TotalInfoVillage= 0;
                TotalPopulation= 0;

               //console.log("ADDING TO MAP DATA");
               
               //console.log("State API data length : ",stateAPIData.length);
               
               IndiaDistrictOutlineMap.style('fill',function(d,i){
               
                   STATEDistrict = d.properties.DISTRICT;
                   //console.log("DIST Idetified at MAP : ",STATEDistrict)
                    //This is required as their is a diffenece in the name of district in stateAPI and TopoJson
                    if( d.properties.DISTRICT == 'Bengaluru'){
                        d.properties.DISTRICT = 'Bangalore';
                    }if( d.properties.DISTRICT == 'Bengaluru Rural'){
                        d.properties.DISTRICT = 'Bangalore Rural';
                    }if( d.properties.DISTRICT == 'Darjeeling'){
                        d.properties.DISTRICT = 'Darjiling';
                    }if(d.properties.DISTRICT == 'YSR Kadapa'){
                        d.properties.DISTRICT = "Y.S.R"
                    }if(d.properties.DISTRICT == 'Sri Ganganagar'){
                        d.properties.DISTRICT = "Ganganagar"
                    }if(d.properties.DISTRICT == 'Jhunjhunu'){
                        d.properties.DISTRICT = "Jhunjhunun";
                    }if(d.properties.DISTRICT == 'Dahod'){
                        d.properties.DISTRICT = "Dohad";
                    }
                     
                   
                    stateAPIData.forEach(function(d2){
                        if(d2.DISTRICT == STATEDistrict)
                                {
                                    //console.log("DIST Idetified at API : ",d2.DISTRICT)
                                    count++; 
                                      
                                    if( d.properties.DISTRICT == 'Bangalore'){
                                        d.properties.DISTRICT = 'Bengaluru';
                                    }if( d.properties.DISTRICT == 'Bangalore Rural'){
                                        d.properties.DISTRICT = 'Bengaluru Rural';
                                    }if( d.properties.DISTRICT == 'Darjiling'){
                                        d.properties.DISTRICT = 'Darjeeling';
                                    }if(d.properties.DISTRICT == 'Y.S.R'){
                                        d.properties.DISTRICT = "YSR Kadapa"
                                    }if(d.properties.DISTRICT == 'Ganganagar'){
                                        d.properties.DISTRICT = "Sri Ganganagar"
                                    }if(d.properties.DISTRICT == 'Jhunjhunun'){
                                        d.properties.DISTRICT = "Jhunjhunu";
                                    }if(d.properties.DISTRICT == 'Dohad'){
                                        d.properties.DISTRICT = "Dahod";
                                    }

                                    //Loading the variables specified in the plotVar category list
                                   
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        
                                        if(d.properties[prop] == undefined){
                                            d.properties[prop] = d2[prop];
                                        }
                                        
                                    })
                                 
                                    if(categoryCall == "PHC_AVL" && plotCheck.PHC_AVL == 0){
                                        //plotCheck.PHC_AVL = 1;
                                        
                                        Total += (isNaN(parseInt(d2.desiredPHC))?0:parseInt(d2.desiredPHC)) - (isNaN(parseInt(d2.shortagePHC))?0:parseInt(d2.shortagePHC));
                                        Desired += (isNaN(parseInt(d2.desiredPHC))?0:parseInt(d2.desiredPHC));
                                        
                                    }else if(categoryCall == "SC_AVL" && plotCheck.SC_AVL == 0){
                                        //plotCheck.SC_AVL = 1;
                                        Total += (isNaN(parseInt(d2.desiredSC))?0:parseInt(d2.desiredSC)) - (isNaN(parseInt(d2.shortageSC))?0:parseInt(d2.shortageSC));
                                        Desired += (isNaN(parseInt(d2.desiredSC))?0:parseInt(d2.desiredSC));
                                      
                                    }else if(categoryCall == "CHC_AVL"  && plotCheck.CHC_AVL == 0){
                                        //plotCheck.CHC_AVL = 1;
                                        Total += (isNaN(parseInt(d2.desiredCHC))?0:parseInt(d2.desiredCHC)) - (isNaN(parseInt(d2.shortageCHC))?0:parseInt(d2.shortageCHC));
                                        Desired += (isNaN(parseInt(d2.desiredCHC))?0:parseInt(d2.desiredCHC));
                                        
                                    }
                                    
                                     /* d.properties.n_urban_pop = (isNaN(parseInt(d2.n_urban_pop))?0:parseInt(d2.n_urban_pop))
                                        d.properties.n_total_pop = (isNaN(parseInt(d2.n_urban_pop))?0:parseInt(d2.n_urban_pop)) + (isNaN(parseInt(d2.n_rural_pop))?0:parseInt(d2.n_rural_pop)) + (isNaN(parseInt(d2.n_rural_tr_pop))?0:parseInt(d2.n_rural_tr_pop));*/
                                 
                                    
                                    if((categoryCall == "SC_ACCESSIBILITY" && plotCheck.SC_ACCESSIBILITY == 0) || (categoryCall == "PHC_ACCESSIBILITY" && plotCheck.PHC_ACCESSIBILITY == 0))
                                    {
                                        //plotCheck.SC_ACCESSIBILITY = 1;
                                        //plotCheck.PHC_ACCESSIBILITY = 1;
                                        
                                        TotalRuralPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]));
                                        
                                        TotalRuralTribalPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]));
                                        
                                        TotalInfoVillage += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[4].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]));
                                        
                                    }else if(categoryCall == "CHC_ACCESSIBILITY" && plotCheck.CHC_ACCESSIBILITY == 0){
                                        
                                        //plotCheck.CHC_ACCESSIBILITY = 1;
                                        
                                        TotalRuralPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]));
                                       
                                        TotalRuralTribalPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]));
                                        
                                        TotalInfoVillage += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[3].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[3].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[4].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[4].v])) + (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[5].v]));
                                        
                                    }else{
                                         
                                        TotalRuralPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[1].v]));
                                        TotalRuralTribalPop += (isNaN(parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]))?0:parseInt(d2[PlotCategory[categoryCall].reqVar[2].v]));
                                        
                                    }
                                    
                                    TotalUrbanPopulation += (isNaN(parseInt(d2.n_urban_pop))?0:parseInt(d2.n_urban_pop));
                                    TotalPopulation += (isNaN(parseInt(d.properties.n_total_pop))?0:parseInt(d.properties.n_total_pop));
                                    
                                    //console.log("TotalUrbanPopulation : ",TotalUrbanPopulation);
                                }
                        })
                
                })
               
           }
          
            
      
            if(IndiaDistrictOutlineMap != null){
               
                /*IndiaDistrictOutlineMap.style('fill',function(d,i){
                    //console.log("Val: ",d);
                    d.properties.author = "Akash Chandra";
                })
                
                IndiaDistrictOutlineMap.style('fill',function(d,i){
                    console.log("Val: ",d);
                    //d.author = "Akash Chandra";
                })*/
                
                //console.log("Checking MAP ",IndiaDistrictOutlineMap);
                //console.log("Checking the TopoJSON Dataset ",STATEDistrictTopo);
            }
            
            
            $("#DENOMINATOR").text(PlotCategory[categoryCall].denom_head)
            $("#NUMERATOR").text(PlotCategory[categoryCall].num_head)
            
            
        
           d3.select(window).on('resize',function(){
                if(prevHeight < height){
                    
                     {fontSize = 10*(   height/prevHeight);}
                    
                 }else if(prevHeight > height){
                     
                      {fontSize = 10*(height/prevHeight);}
                 }else if(prevWidth < width){
                     
                     {fontSize = 10*(width/prevWidth);}
                 }else if(prevWidth > width){
                     
                      {fontSize = 10*(width/prevWidth);}
                 }
            width = parseInt(d3.select('#chart-area').style('width'))
            width = width - margin.left - margin.right;
            height = width*mapRatio;
                
            createState(currentStatePlot,currentCategoryPlot);
            
            })
        
        console.log();
        
        if(PlotCategory[categoryCall].plotType == "DIST"){
           dynamicPlot(); 
        }else{
            dynamicPlotPercentage();
        }
        
        function dynamicPlot()
        {
                var sht = apiVAR[0].data_var
                var dsr = apiVAR[3].data_var
                
                //$("#backdrop-sample").attr('src','assets/images/avlSubCen.png');
                
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
               
                $("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide()
                
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
               
                legendsData.style('visibility','visible')
                
                //IndiaDistrictCanvas
                //IndiaDistrictOutlineMap
                if(IndiaDistrictCanvas == null){
                    
                    IndiaDistrictCanvas = d3.select('#India-district-chart-area').append('svg')
                        //.attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                        .attr('height',width*.65)
                    
                }else{
                    
                }
                
                
                var projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide()  
                InfoStateName.text("INDIA".toUpperCase())
                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                InfoUrbanPopulationHead.text("Total Urban Population")
                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                InfoRequired.text(numberWithCommas(Desired))
                InfoExisting.text(numberWithCommas(Total))
                InfoRequiredLabel.text("Required")
                InfoExistingLabel.text("Existing")
                InfoRequired.style('background','#A5B3A4')
                InfoExisting.style('background','#BFDFF1')
                if(Desired - Total > 0){
                    //Changing the formula to {(Existing - Desired) / Desired}
                    InfoShortageLabel.text("Shortage (%)")
                    if(Desired == 0)
                    {
                        InfoShortage.text("");
                    }
                    else if(isNaN((Desired-Total)*100/Desired))
                    {
                        InfoShortage.text("NA")

                    }else{
                        InfoShortage.text(((Desired-Total)*100/Desired).toFixed(0)+"%")
                    }
                    
                    InfoExisting
                      .transition()
                      .duration(200)
                      .style('width',function(){
                        
                        return (140*Total/Desired) + 'px';
                    })
                    InfoRequired
                      .transition()
                      .duration(200)
                      .style('width',function(){
                         return (140) + 'px';
                    })
                    InfoShortage.style('color','#D96331')
                }else{
                    InfoShortageLabel.text("Surplus (%)")
                    //Changing the formula to {(Existing - Desired) / Desired}
                    if(Desired == 0)
                    {
                        InfoShortage.text("");
                    }
                    else if(isNaN((Total-Desired)*100/Desired))
                    {
                        InfoShortage.text("NA")

                    }else{
                        InfoShortage.text(((Total-Desired)*100/Desired).toFixed(0)+"%")
                    }
                    
                    
                    InfoRequired
                      .transition()
                      .duration(200)
                      .style('width',function(){
                        
                         return (140*Desired/Total) + 'px';
                    })
                    InfoExisting
                      .transition()
                      .duration(200)
                      .style('width',function(){
                        return (140) + 'px';
                    })
                    InfoShortage.style('color','#460')
                    
                }
                
              var centered,zoomState=0;
              
                
              setTimeout(function() {
                  
                  if(IndiaDistrictOutlineMap == null){
                      
                       var g = IndiaDistrictCanvas.append("g");
                       IndiaDistrictOutlineMap = g.append("g")
                        .selectAll("path")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter()
                        .append("path")
                        .attr("d", pathState)
                        .attr("class", "states")
                        .attr('stroke-width', 0.2)
                        .attr('stroke', 'white')
                      
                  }else{
                      
                  }
                   
                
                IndiaDistrictOutlineMap.style('fill',function(d,i){
                    
                    //console.log("Reinitated Coloring");
                    
                    if(firstLoad == 0){
                        firstLoad = 1;
                        $("#India-district-chart-area").show();
                        $("#India-state-chart-area").hide();
                        $("#chart-area").hide();
                        $("#backdrop-image").hide();
                    }
                   
                    
                    if(d == undefined || d.properties[plotVar.v]== undefined){
                        return color_PHC_shortage_STATE_2011[4];
                    }
                    else{ 
                        //Changing the formula to {(Existing - Desired) / Desired}
                        if(d.properties[sht] > 0){
                            if(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return plotVarDef[plotVar.v].limit.l4.c;
                            }else{
                                return plotVarDef[plotVar.v].limit.l3.c;
                            }
                        }
                        else if(d.properties[sht] <= 0){
                            if(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return plotVarDef[plotVar.v].limit.l2.c;
                            }else{
                                return plotVarDef[plotVar.v].limit.l1.c;
                            } 
                        }
                    }
                 })
                .on('click',function(d){
                        
                  })
               .on('mouseover',function(d){
                
                d3.select(this).style('opacity',"0.6")
                
                    if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else 
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        //InfoStateName.text("Delhi".toUpperCase())
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                        //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                    }
                    
                     if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                         
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoUrbanPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined){
                          
                        InfoRequiredLabel.text("Required")
                        InfoExistingLabel.text("Existing")
                        InfoRequired.style('background','#A5B3A4')
                        InfoExisting.style('background','#BFDFF1')
                    
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                        InfoRuralTribalPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[2].v]))
                        InfoUrbanPopulation.text(numberWithCommas(d.properties.n_urban_pop));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoRequired.text(numberWithCommas(d.properties[dsr]))
                        InfoExisting.text(numberWithCommas( d.properties[dsr] - d.properties[sht]))
                        if(d.properties[sht] > 0){
                            InfoShortageLabel.text("Shortage (%)")
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(d.properties[dsr] == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((d.properties[sht])*100/(d.properties[dsr])))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0)+"%")
                            }
                            
                            
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                 return (140) + 'px';
                            })

                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                return (140*(d.properties[dsr] - d.properties[sht])/d.properties[dsr]) + 'px';
                            })

                            InfoShortage.style('color','#D96331')
                        }else{
                            
                            InfoShortageLabel.text("Surplus %")
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(d.properties[dsr] == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((d.properties[sht]*-1)*100/(d.properties[dsr])))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0)+"%")
                            }
                            
                            
                             InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140) + 'px';
                            })
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                 return (140*d.properties[dsr]/(d.properties[dsr] - d.properties[sht])) + 'px';
                            })

                            InfoShortage.style('color','#460')
                        }
                    }
                 }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select(this).style('opacity',"1")
                    
                        InfoRequiredLabel.text("Required")
                        InfoExistingLabel.text("Existing")
                        InfoRequired.style('background','#A5B3A4')
                        InfoExisting.style('background','#BFDFF1')
                    
                        InfoStateName.text("INDIA")
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoRequired.text(numberWithCommas(Desired))
                        InfoExisting.text(numberWithCommas(Total))
                        if(Desired - Total > 0){
                            
                            InfoShortageLabel.text("Shortage (%)")
                            //Changing the formula to {(Existing - Desired) / Desired}
                            if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((Desired-Total)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Desired-Total)*100/Desired).toFixed(0)+"%")
                            }
                            
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                return (140*Total/Desired) + 'px';
                            })
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                 return (140) + 'px';
                            })
                            InfoShortage.style('color','#D96331')
                        }else{
                            //Changing the formula to {(Existing - Desired) / Desired}
                            InfoShortageLabel.text("Surplus (%)")
                            if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((Total-Desired)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Total-Desired)*100/Desired).toFixed(0)+"%")
                            }
                            
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                 return (140*Desired/Total) + 'px';
                            })
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140) + 'px';
                            })
                            InfoShortage.style('color','#460')
                        }
                     })

              }, 400);
              

                    //d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                    d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                    d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                    d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                    d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                    d3.select("#d1").text("> 25%");
                    d3.select("#d2").text("0 - 25%");
                    d3.select("#d3").text("0 - 25%");
                    d3.select("#d4").text("> 25%");
         }
        
         function dynamicPlotPercentage()
            {
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                
                MainHeading.text(plotVarDef[plotVar.v].description.main_head +" : INDIA")
                
                $("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide()
                
                legendsData.style('visibility','visible')
                
                if(IndiaDistrictCanvas == null){
                    
                    IndiaDistrictCanvas = d3.select('#India-district-chart-area').append('svg')
                        //.attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                        .attr('height',width*.65)
                    
                }else{
                    
                }
                
                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                 d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide()  
                if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                        InfoStateName.text("INDIA".toUpperCase())
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text("");
                        InfoUrbanPopulationHead.text("")
                        InfoHealthCategoryName.text("")                        
                        InfoExisting.text("")
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }else{
                        InfoStateName.text("INDIA".toUpperCase())
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalPopulation));
                        InfoUrbanPopulationHead.text("Total Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*(TotalRuralTribalPop/TotalRuralPop)*100)+'px';
                        })
                       
                        InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("Percent")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        $(".SUB_CATEGORY_DROPDOWN_SELECT").hide();  
                }
                
                
              var centered,zoomState=0;
              
                if(IndiaDistrictOutlineMap == null){
                      
                   var g = IndiaDistrictCanvas.append("g");
                   IndiaDistrictOutlineMap = g.append("g")
                    .selectAll("path")
                    .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                    .enter()
                    .append("path")
                    .attr("d", pathState)
                    .attr("class", "states")
                    .attr('stroke-width', 0.2)
                    .attr('stroke', 'white')
                      
                  }else{
                      
                  }
                
                if(currentCategoryPlot == 'SDH_AVL' || currentCategoryPlot == 'DH_AVL'){
                      IndiaDistrictOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',"BFDFF1")
                }else{
                     IndiaDistrictOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',function(d,i){
                           if(d == undefined || d.properties[plotVar.v] == undefined){
                                return '#000'//colorAccessSubCenter_STATE_gt_5km[4];
                            }
                            else if( parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l4.l && parseFloat(d.properties[plotVar.v])<plotVarDef[plotVar.v].limit.l4.r){
                                return plotVarDef[plotVar.v].limit.l4.c;
                            }else if(parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l3.l && parseFloat(d.properties[plotVar.v]) <=plotVarDef[plotVar.v].limit.l3.r){
                                return plotVarDef[plotVar.v].limit.l3.c;
                            }else if(parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l2.l && parseFloat(d.properties[plotVar.v])<=plotVarDef[plotVar.v].limit.l2.r){
                                return plotVarDef[plotVar.v].limit.l2.c;
                            }else if(parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l1.l ){
                                return plotVarDef[plotVar.v].limit.l1.c;
                            }else{
                                return '#000'
                            }
                         })
                }
                 
                IndiaDistrictOutlineMap.on('click',function(d){
                        
                })
               .on('mouseover',function(d){
                    
                    //console.log("This is heading : ",plotVarDef[plotVar.v].description.main_head);
                    
                    if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else 
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        //InfoStateName.text("Delhi".toUpperCase())
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                        //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                    }
                    d3.select(this).style('opacity',"0.6")
                    
                     if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                         
                           if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within5_PHC' || plotVar.v == 'p_within10_CHC'){  
                                InfoUrbanPopulation.text("")
                            }else{
                                InfoUrbanPopulation.text("NA")
                            }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            
                            InfoUrbanPopulationHead.text("")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within5_PHC'){  
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])))
                            
                        InfoExistingLabel.text("Percent*");
                            
                        }else if(plotVar.v == 'p_within10_CHC'){
                            
                        InfoExistingLabel.text("Percent*")
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])))
                            
                        }else{
                            
                        InfoExistingLabel.text("Percent")
                            
                         InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                        }
                          
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*d.properties[plotVar.v])+'px';
                        })
                       
                        InfoExisting.text(parseFloat(d.properties[plotVar.v]*100).toFixed(0)+"%")
                          
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                            InfoUrbanPopulation.text("");
                            InfoUrbanPopulationHead.text("")
                        }else{
                            InfoUrbanPopulation.text(numberWithCommas(d.properties.n_total_pop));
                            InfoUrbanPopulationHead.text("Total Population")
                        }
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                          
                        /* Caveats discription here !!! */
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within5_PHC'){  
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])))
                            
                        InfoExistingLabel.text("Percent*");
                         $("#CAVEAT_ROW").show()   
                         d3.select("#CAVEAT").text("*Based on Census 2011 sample size of "+((parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[5].v]))/parseFloat(d.properties[PlotCategory[categoryCall].reqVar[1].v])*100).toFixed(0)+"% villages");
                            
                        }else if(plotVar.v == 'p_within10_CHC'){
                            
                        InfoExistingLabel.text("Percent*")
                         $("#CAVEAT_ROW").show();     
                         d3.select("#CAVEAT").text("*Based on Census 2011 sample size of "+((parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[5].v]))/parseFloat(d.properties[PlotCategory[categoryCall].reqVar[1].v])*100).toFixed(0)+"% villages");
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])))
                            
                        }else{
                            
                         InfoExistingLabel.text("Percent")
                            
                         InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                        }  
                          
                        $("#CAVEAT_ROW").show()  
                        if(currentCategoryPlot == "SDH_AVL" || currentCategoryPlot == "DH_AVL"){
                            $("#legends").hide()
                        }
                        
                      }
                }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select(this).style('opacity',"1")
                     
                         d3.select("#CAVEAT").text("")
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                                InfoStateName.text("INDIA".toUpperCase())
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoUrbanPopulation.text("");
                                InfoUrbanPopulationHead.text("")
                                InfoHealthCategoryName.text("")                        
                                InfoExisting.text("")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }else{
                                InfoStateName.text("INDIA".toUpperCase())
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoUrbanPopulation.text(numberWithCommas(TotalPopulation));
                                InfoUrbanPopulationHead.text("Total Population")
                                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                                InfoExisting
                                      .transition()
                                      .duration(200)
                                      .style('width',function(){
                                        return (1.40*(TotalRuralTribalPop/TotalRuralPop)*100)+'px';
                                })

                                InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")

                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#BFDFF1')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("Percent")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }
                   
                })
                
                if(currentCategoryPlot == "SDH_AVL" || currentCategoryPlot == "DH_AVL"){
                    $("#legends").hide()
                }else{
                }
                
                    d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                    d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                    d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                    d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                    d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                if(nfhsPlotEnable == 1){
                    d3.select("#d4").text("< "+(plotVarDef[plotVar.v].limit.l4.r * 100)+"%");
                    d3.select("#d3").text( (plotVarDef[plotVar.v].limit.l3.l*100)+"% - "+ (plotVarDef[plotVar.v].limit.l3.r*100)+"%");
                    d3.select("#d2").text( (plotVarDef[plotVar.v].limit.l2.l*100)+"% - "+ (plotVarDef[plotVar.v].limit.l2.r*100)+"%");
                    d3.select("#d1").text("> " + (plotVarDef[plotVar.v].limit.l1.l*100)+"%");
                }else if(plotVarDef[plotVar.v].limit.l1.r == 100){
                    d3.select("#d4").text("< "+plotVarDef[plotVar.v].limit.l4.r+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("> " + plotVarDef[plotVar.v].limit.l1.l+"%");
                }else{
                    d3.select("#d4").text("> "+ plotVarDef[plotVar.v].limit.l4.l+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("< "+ plotVarDef[plotVar.v].limit.l1.r+"%");
                }
         }
        
        function dynamicPlotNonComp()
           {
               
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
               
                
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
               
                if(IndiaDistrictCanvas == null){
                    
                    IndiaDistrictCanvas = d3.select('#India-district-chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                    
                }else{
                    
                }
                
                $("#CAVEAT_ROW").hide();
                d3.select("#CAVEAT").text("")
                if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                         if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text("");
                        InfoUrbanPopulationHead.text("")
                        InfoHealthCategoryName.text("")                        
                        InfoExisting.text("")
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }else{
                         if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                       
                        InfoExistingLabel.style("font-size","20px")
                        InfoExisting.style("font-size","30px")
                    
                        InfoExisting.text(Total)
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("No. of Hospitals")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }
                 
                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
               
                var centered,zoomState=0;
                var pathState = d3.geo.path().projection(projectionState);
            
                 if(IndiaDistrictOutlineMap == null){
                      
                       var g = IndiaDistrictCanvas.append("g");
                       IndiaDistrictOutlineMap = g.append("g")
                        .selectAll("path")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter()
                        .append("path")
                        .attr("d", pathState)
                        .attr("class", "states")
                        .attr('stroke-width', 0.2)
                        .attr('stroke', 'white')
                        .style('fill','#74A9CF')
                      
                  }else{
                      
                  }
                 
              IndiaDistrictOutlineMap/*.attr('stroke-width', 1)
                  .attr('stroke', 'white')
                  .style('fill',function(d,i){
                        
                   if(d == undefined || d.properties[plotVar.v]== undefined){
                        return '#445'//colorAccessSubCenter_STATE_gt_5km[4];
                    }
                    else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l4.l && d.properties[plotVar.v].toFixed(0)<plotVarDef[plotVar.v].limit.l4.r){
                        return plotVarDef[plotVar.v].limit.l4.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l3.l && d.properties[plotVar.v].toFixed(0) <=plotVarDef[plotVar.v].limit.l3.r){
                        return plotVarDef[plotVar.v].limit.l3.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l2.l && d.properties[plotVar.v].toFixed(0)<=plotVarDef[plotVar.v].limit.l2.r){
                        return plotVarDef[plotVar.v].limit.l2.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >plotVarDef[plotVar.v].limit.l1.l ){
                        return plotVarDef[plotVar.v].limit.l1.c;
                    }else{
                        return '#000'
                    }
                 })*/
               .on('mouseover',function(d){
                   if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        //InfoStateName.text("Delhi".toUpperCase())
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                        //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                    }
                  
                    
                    d3.select(this).style('opacity',"0.6")
                       if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoUrbanPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                        if(plotVar.v != 'p_within5_SC' || plotVar.v != 'p_within10_CHC' || plotVar.v != 'p_within5_PHC'){
                            InfoUrbanPopulation.text(d.properties.n_urban_pop);
                            InfoUrbanPopulationHead.text("Total Urban Population")
                        }
                          
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                          
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                       
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                            
                        InfoExistingLabel.text("No. of Hospitals")  
                          
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*d.properties[plotVar.v])+'px';
                        })
                       
                        InfoExisting.text(parseFloat(d.properties[plotVar.v]))
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                      }
                }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select("#CAVEAT").text("")
                    $("#CAVEAT_ROW").hide()
                    d3.select(this).style('opacity',"1")
                       if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text("")                        
                                InfoExisting.text("")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }else{
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                                InfoUrbanPopulationHead.text("Total Urban Population")
                                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                               
                                InfoExisting.text(Total)

                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("No. of Hospitals")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }
                   
                })

                d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                if(plotVarDef[plotVar.v].limit.l1.r == 100){
                    d3.select("#d4").text("< "+plotVarDef[plotVar.v].limit.l4.r+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("> " + plotVarDef[plotVar.v].limit.l1.l+"%");
                }else{
                    d3.select("#d4").text("> "+ plotVarDef[plotVar.v].limit.l4.l+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("< "+ plotVarDef[plotVar.v].limit.l1.r+"%");
                }
        }
        
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }  
    }   
           
   function qualityPlots(STATEDistrictTopo,stateAPIData){
       
           MainHeading.text("Generating Map...")
       
           /*var TotalSC2011,TotalSC2016, DesiredSC, TotalPHC2011,TotalPHC2016=0, DesiredPHC=0, TotalCHC2011,TotalCHC2016, DesiredCHC;*/
           var TotalRuralPop = 0, TotalRuralTribalPop = 0,TotalUrbanPopulation = 0,Total = 0, Desired = 0,TotalInfoVillage = 0,TotalPopulation = 0;
           
           var myQObj = null;
           //Variables for data filling
           var STATEDistrict,dataValue;
       
           /*QuickFix : To adjust the margin between map and legends for StateWise and IndiaWise map*/
           d3.select("#leg_id").style('margin-top','1.5%');
       
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").show();
            $("#chart-area").hide();
            $("#backdrop-image").hide(); 

           if(PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){

              if(IndiaStateOutlineMap != null){
                  
                  IndiaStateOutlineMap.style('fill',function(d,i){
                      
                      //To be filled only if not present
                      if( d.properties.TYPE == undefined || d.properties.RANKING == undefined){
                          stateAPIData.forEach(function(d2,i)
                          {
                             if(StateCodeObject[d.properties.ST_NM] == d2.ST_CD){
                             d.properties.TYPE = d2.TYPE;
                             d.properties.ST_CD =    d2.ST_CD;
                             d.properties.RANKING = d2.RANKING;
                             d.properties.HQNI = d2.HQNI;
                             d.properties.HQLI = d2.HQLI;
                             d.properties.HII = d2.HII;}

                          })
                      }
                          
                  })
                  
              }else{
                     
                   STATEDistrictTopo.objects.Admin2.geometries.forEach(function(d,i){

                         stateAPIData.forEach(function(d2,i)
                          {
                             if(StateCodeObject[d.properties.ST_NM] == d2.ST_CD){
                             d.properties.TYPE = d2.TYPE;
                             d.properties.ST_CD = d2.ST_CD;
                             d.properties.RANKING = d2.RANKING;
                             d.properties.HQNI = d2.HQNI;
                             d.properties.HQLI = d2.HQLI;
                             d.properties.HII = d2.HII;}

                          })

                    })
              }

           }else if(PlotCategory[categoryCall].plotType == "NON_COMP" && stateNameCall == 'India_state'){
               
               if(IndiaStateOutlineMap != null){
                   
                   IndiaStateOutlineMap.style('fill',function(d,i){
                       
                        stateAPIData.forEach(function(d2,i)
                          {
                             if(d.properties.ST_NM == d2.ST_NM){
                                 
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        d.properties[prop] = d2[prop];
                                    })
                                 TotalUrbanPopulation += d2.n_urban_pop;
                                 TotalRuralPop += d2.n_rural_pop;
                                 TotalRuralTribalPop += d2.n_rural_tr_pop;
                                 Total += parseInt(d2[PlotCategory[categoryCall].reqVar[0].v]);
                             }
                             
                          })
                       
                   })
                   
               }else{
                   
                   STATEDistrictTopo.objects.Admin2.geometries.forEach(function(d,i){
                       
                         stateAPIData.forEach(function(d2,i)
                          {
                             if(d.properties.ST_NM == d2.ST_NM){
                                 
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        d.properties[prop] = d2[prop];
                                    })
                                 TotalUrbanPopulation += d2.n_urban_pop;
                                 TotalRuralPop += d2.n_rural_pop;
                                 TotalRuralTribalPop += d2.n_rural_tr_pop;
                                 Total += parseInt(d2[PlotCategory[categoryCall].reqVar[0].v]);
                             }
                             
                          })
                   
                  })
                   
               }
               
           }else if(stateNameCall == 'India'){
               
           }else if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY" && stateNameCall != 'India_state'){
               
               if(IndiaStateOutlineMap != null){
                   
                   IndiaStateOutlineMap.style('fill',function(d,i){
                       
                       if(STATE == 'Andhra Pradesh'){
                       
                       if(d.properties.ST_NM == 'Andhra Pradesh' || d.properties.ST_NM == 'Telangana'){
                       
                         stateAPIData.forEach(function(d2,i)
                          {
                            //Loading the variables specified in the plotVar category list
                            apiVAR.forEach(function(pv){
                                prop = pv.data_var;
                                d.properties[prop] = d2[prop];
                            })
                          })
                        
                       }else{

                           delete STATEDistrictTopo.objects.Admin2.geometries[i];
                       }
                       
                   }else{
                       
                       if(d.properties.ST_NM == STATE ){
                       
                         stateAPIData.forEach(function(d2,i)
                          {
                            //Loading the variables specified in the plotVar category list
                            apiVAR.forEach(function(pv){
                                prop = pv.data_var;
                                d.properties[prop] = d2[prop];
                            })
                          })
                        
                       }else{

                           delete STATEDistrictTopo.objects.Admin2.geometries[i];
                       }
                       
                   }
                       
                 })
                   
               }else{
                
                   STATEDistrictTopo.objects.Admin2.geometries.forEach(function(d,i){
                   
                   if(STATE == 'Andhra Pradesh'){
                       
                       if(d.properties.ST_NM == 'Andhra Pradesh' || d.properties.ST_NM == 'Telangana'){
                       
                         stateAPIData.forEach(function(d2,i)
                          {
                            //Loading the variables specified in the plotVar category list
                            apiVAR.forEach(function(pv){
                                prop = pv.data_var;
                                d.properties[prop] = d2[prop];
                            })
                          })
                        
                       }else{

                           delete STATEDistrictTopo.objects.Admin2.geometries[i];
                       }
                       
                   }else{
                       
                       if(d.properties.ST_NM == STATE ){
                       
                         stateAPIData.forEach(function(d2,i)
                          {
                            //Loading the variables specified in the plotVar category list
                            apiVAR.forEach(function(pv){
                                prop = pv.data_var;
                                d.properties[prop] = d2[prop];
                            })
                          })
                        
                       }else{

                           delete STATEDistrictTopo.objects.Admin2.geometries[i];
                       }
                       
                   }
               })
                   
             }
               
               
               
           }else if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY" && stateNameCall == 'India_state'){
               
               if(IndiaStateOutlineMap != null ){
                   IndiaStateOutlineMap.style('fill',function(d,i){
                      stateAPIData.forEach(function(d2,i)
                            {  if(d2.ST_NM == 'All India'){
                                myQObj = d2;
                             }
                             if(d.properties.ST_NM == d2.ST_NM){
                                 
                                   //Loading the variables specified in the plotVar category list
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        d.properties[prop] = d2[prop];
                                    })
                             }
                             
                      })
                  })
               }else{
                   STATEDistrictTopo.objects.Admin2.geometries.forEach(function(d,i){
                  
                   //if(d.properties.ST_NM == STATE || (d.properties.ST_NM == "Andhra Pradesh" || d.properties.ST_NM == "Telangana")){
                        
                         stateAPIData.forEach(function(d2,i)
                          {  if(d2.ST_NM == 'All India'){
                                myQObj = d2;
                             }
                             if(d.properties.ST_NM == d2.ST_NM){
                                 
                                   //Loading the variables specified in the plotVar category list
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        d.properties[prop] = d2[prop];
                                    })
                             }
                             
                          })
                   })
               }
               
               
               
               
           }else if(stateNameCall == 'India_state'){
               
               if(IndiaStateOutlineMap != null){
                   
                   IndiaStateOutlineMap.style('fill',function(d,i){
                      var StateName = d.properties.ST_NM;
                       stateAPIData.forEach(function(d2,i)
                       {
                           if(d2.ST_NM == StateName){
                            //Loading the variables specified in the plotVar category list
                            apiVAR.forEach(function(pv){
                                prop = pv.data_var;
                                d.properties[prop] = d2[prop];
                            })

                            d.properties.n_urban_pop = d2.n_urban_pop;
                            d.properties.n_total_pop = d2.n_urban_pop + d2.n_rural_pop + d2.n_rural_tr_pop;

                            if(categoryCall == "PHC_AVL"){
                                Total += d2.desiredPHC - d2.shortagePHC;
                                Desired += d2.desiredPHC;
                            }else if(categoryCall == "SC_AVL"){
                                Total += d2.desiredSC - d2.shortageSC;
                                Desired += d2.desiredSC;
                            }else if(categoryCall == "CHC_AVL"){
                                Total += d2.desiredCHC - d2.shortageCHC;
                                Desired += d2.desiredCHC;
                            }

                            if(categoryCall == "SC_ACCESSIBILITY" || categoryCall == "PHC_ACCESSIBILITY"){
                                TotalRuralPop += d2[PlotCategory[categoryCall].reqVar[1].v];

                                TotalRuralTribalPop += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v];

                                TotalInfoVillage += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v] + d2[PlotCategory[categoryCall].reqVar[4].v] + d2[PlotCategory[categoryCall].reqVar[5].v];
                            }else if(categoryCall == "CHC_ACCESSIBILITY"){
                                 TotalRuralPop += d2[PlotCategory[categoryCall].reqVar[1].v];

                                TotalRuralTribalPop += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v] + d2[PlotCategory[categoryCall].reqVar[4].v];

                                TotalInfoVillage += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v] + d2[PlotCategory[categoryCall].reqVar[4].v] + d2[PlotCategory[categoryCall].reqVar[5].v];
                            }else{
                                TotalRuralPop += d2[PlotCategory[categoryCall].reqVar[1].v];
                                TotalRuralTribalPop += d2[PlotCategory[categoryCall].reqVar[2].v];

                            }
                            TotalUrbanPopulation += d2.n_urban_pop;
                            TotalPopulation += d.properties.n_total_pop;
                          }
                        })                     
                       
                   })
                   
               }else{
                   
                       STATEDistrictTopo.objects.Admin2.geometries.forEach(function(d,i){
                       var StateName = d.properties.ST_NM;
                       stateAPIData.forEach(function(d2,i)
                       {
                           if(d2.ST_NM == StateName){
                            //Loading the variables specified in the plotVar category list
                            apiVAR.forEach(function(pv){
                                prop = pv.data_var;
                                d.properties[prop] = d2[prop];
                            })

                            d.properties.n_urban_pop = d2.n_urban_pop;
                            d.properties.n_total_pop = d2.n_urban_pop + d2.n_rural_pop + d2.n_rural_tr_pop;

                            if(categoryCall == "PHC_AVL"){
                                Total += d2.desiredPHC - d2.shortagePHC;
                                Desired += d2.desiredPHC;
                            }else if(categoryCall == "SC_AVL"){
                                Total += d2.desiredSC - d2.shortageSC;
                                Desired += d2.desiredSC;
                            }else if(categoryCall == "CHC_AVL"){
                                Total += d2.desiredCHC - d2.shortageCHC;
                                Desired += d2.desiredCHC;
                            }

                            if(categoryCall == "SC_ACCESSIBILITY" || categoryCall == "PHC_ACCESSIBILITY"){
                                TotalRuralPop += d2[PlotCategory[categoryCall].reqVar[1].v];

                                TotalRuralTribalPop += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v];

                                TotalInfoVillage += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v] + d2[PlotCategory[categoryCall].reqVar[4].v] + d2[PlotCategory[categoryCall].reqVar[5].v];
                            }else if(categoryCall == "CHC_ACCESSIBILITY"){
                                 TotalRuralPop += d2[PlotCategory[categoryCall].reqVar[1].v];

                                TotalRuralTribalPop += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v] + d2[PlotCategory[categoryCall].reqVar[4].v];

                                TotalInfoVillage += d2[PlotCategory[categoryCall].reqVar[2].v] + d2[PlotCategory[categoryCall].reqVar[3].v] + d2[PlotCategory[categoryCall].reqVar[4].v] + d2[PlotCategory[categoryCall].reqVar[5].v];
                            }else{
                                TotalRuralPop += d2[PlotCategory[categoryCall].reqVar[1].v];
                                TotalRuralTribalPop += d2[PlotCategory[categoryCall].reqVar[2].v];

                            }
                            TotalUrbanPopulation += d2.n_urban_pop;
                            TotalPopulation += d.properties.n_total_pop;
                          }
                        })
                   })
                   
               }
               
           }else{
             //Consolidating the STATE data in one file

                 if(IndiaStateOutlineMap != null){
                     
                     IndiaStateOutlineMap.style('fill',function(d,i){

                        var ST_NM = STATE;
                        if(d.properties.ST_NM != ST_NM)
                        {
                            delete STATEDistrictTopo.objects['2011_Dist'].geometries[i];
                        }else{

                        }
                         
                     })
                     
                 }else{
                     STATEDistrictTopo.objects['2011_Dist'].geometries.forEach(function(d,i){

                        var ST_NM = STATE;
                        if(d.properties.ST_NM != ST_NM)
                        {
                            delete STATEDistrictTopo.objects['2011_Dist'].geometries[i];
                        }else{

                        }
                     })
                 }
                
            }
       
           d3.select(window).on('resize',function(){
                if(prevHeight < height){
                    
                     {fontSize = 10*(   height/prevHeight);}
                    
                 }else if(prevHeight > height){
                     
                      {fontSize = 10*(height/prevHeight);}
                 }else if(prevWidth < width){
                     
                     {fontSize = 10*(width/prevWidth);}
                 }else if(prevWidth > width){
                     
                      {fontSize = 10*(width/prevWidth);}
                 }
            width = parseInt(d3.select('#chart-area').style('width'))
            width = width - margin.left - margin.right;
            height = width*mapRatio;
                
            createState(currentStatePlot,currentCategoryPlot);
            
            })
       
       
       
        if(IndiaStateOutlineMap != null){
           //console.log("State Map : ",IndiaStateOutlineMap);
            IndiaStateOutlineMap.style('fill',function(d,i){
                console.log("ARR : ",d.properties);
            })
           //console.log("State API data : ",STATEDistrictTopo);
        }
        
        InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
        InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
        InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
            
        if(stateNameCall == 'India_state' && PlotCategory[categoryCall].plotType == "DIST"){
            dynamicPlotINDIA_Comp()     
        }else if(stateNameCall == 'India_state' && PlotCategory[categoryCall].plotType == "percent"){
            dynamicPlotINDIA_Percentage()     
        }else if(stateNameCall == 'India_state' && PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
            dynamicPlot_INDIA_NON_COMP_QUALITY()   
        }else if(PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){
            dynamicPlot_HMIS_INDEX()   
        }else if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY" && stateNameCall != 'India_state'){
            dynamicPlot_STATE_NON_COMP_QUALITY();
        }else if(PlotCategory[categoryCall].plotType == "NON_COMP" && stateNameCall == 'India_state'){
            dynamicPlotINDIA_NON_COMP();
        }else{
            dynamicPlotSTATES();
        }
   
        var infoDataMargin_left = 120;
        var infoDataMargin_top = 140;
       
        //Plotting the main data map
        function dynamicPlotINDIA_Comp()
            {
                var sht = apiVAR[0].data_var
                var dsr = apiVAR[3].data_var
                
                $("#DENOMINATOR").text(PlotCategory[categoryCall].denom_head)
                $("#NUMERATOR").text(PlotCategory[categoryCall].num_head)
                
                //$("#ACCESSIBILITY").show();
                $("#AVL").show();
                
                projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                pathState = d3.geo.path().projection(projectionState);
                
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                InfoStateName.text("INDIA".toUpperCase())
                InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                InfoUrbanPopulationHead.text("Total Urban Population")
                
                        InfoRequiredLabel.text("Required")
                        InfoExistingLabel.text("Existing")
                        InfoRequired.style('background','#A5B3A4')
                        InfoExisting.style('background','#BFDFF1')
                    
                         
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoRequired.text(numberWithCommas(Desired))
                        InfoExisting.text(numberWithCommas(Total))
                        if(Desired - Total > 0){
                            //Changing the formula to {(Existing - Desired) / Desired}
                            InfoShortageLabel.text("Shortage (%)")
                            
                            if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((Desired-Total)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Desired-Total)*100/Desired).toFixed(0)+"%")
                            }
                            
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                return (140*Total/Desired) + 'px';
                            })
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                 return (140) + 'px';
                            })
                            InfoShortage.style('color','#D96331')
                        }else{
                            //Changing the formula to {(Existing - Desired) / Desired}
                            InfoShortageLabel.text("Surplus (%)")
                            
                            if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((Total-Desired)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Total-Desired)*100/Desired).toFixed(0)+"%")
                            }
                            
                            
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                 return (140*Desired/Total) + 'px';
                            })
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140) + 'px';
                            })
                            InfoShortage.style('color','#460')
                        }
                
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"white")
                }else{
                    //Do nothing!!!
                }
                
                var g = IndiaStateCanvas.append("g");
                
                if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                }else{
                        
                }
                
                
                IndiaStateOutlineMap.on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")
                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                    })
                .on('click',function(d){
                      if(d.properties.ST_NM != 'Telangana'){
                            currentStatePlot = d.properties.ST_NM;
                            createState(d.properties.ST_NM,currentCategoryPlot);   
                      }
                })
                
            
              stateNameData = g.append("g")
                        .selectAll("text")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter()
                        .append("text")
                        .attr("d", pathState)
                        .attr("class", "statesNames")
                        .text(function(d){
                            if(d != undefined)
                                {
                                    return d.properties.ST_NM;
                                }
                         })
                       .attr("transform", function(d) { 
                            var centroid = pathState.centroid(d);
                            if(d.properties.ST_NM == 'Daman & Diu')
                            {
                                    return "translate(" + (centroid[0]-42) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'Punjab')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'West Bengal')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Jammu & Kashmir')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Madhya Pradesh')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Maharashtra')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Karnataka')
                            {
                            return "translate(" + (centroid[0]-30) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Andhra Pradesh')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Kerala')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Bihar')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Uttar Pradesh')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Jharkhand')
                            {
                            return "translate(" + (centroid[0]-17) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Arunanchal Pradesh')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Assam')
                            {
                            return "translate(" + (centroid[0]-40) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Meghalaya')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Nagaland')
                            {
                            return "translate(" + (centroid[0]+3) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Manipur')
                            {
                            return "translate(" + (centroid[0]) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Tripura')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Mizoram')
                            {
                            return "translate(" + (centroid[0]+2) + "," + (centroid[1]) + ")"
                            }
                            return "translate(" + (centroid[0]-15) + "," + centroid[1] + ")"
                        })
                        .attr("font-family", "helvetica")
                        .attr("font-size", (fontSize-3)+"px")
                        .attr("font-style", "bold")
                        .attr("fill", "black")
                
                
                    IndiaStateOutlineMap.style('fill',function(d,i){
                    if(d == undefined || d.properties[sht] == undefined || d.properties[dsr]==undefined){
                        /*if(STATE == 'Andhra Pradesh' || STATE == 'Telangana'){
                            return "#FFF";
                        }*/
                        return color_PHC_shortage_STATE_2011[4];
                    }
                    else{ 
                        //Changing the formula to {(Existing - Desired) / Desired}
                        if(d.properties[sht] > 0){
                            if(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) <= 25){
                                
                                return plotVarDef[plotVar.v].limit.l4.c;
                            }else{
                                return plotVarDef[plotVar.v].limit.l3.c;
                            }
                        }
                        else if(d.properties[sht] <= 0){
                            if(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return plotVarDef[plotVar.v].limit.l2.c;
                            }else{
                                return plotVarDef[plotVar.v].limit.l1.c;
                            } 
                        }
                    }
                 })
               .on('mouseover',function(d){
                
                d3.select(this).style('opacity',"0.6")
                    if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                        //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                    }else
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                        //InfoStateName.text("Delhi".toUpperCase())
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                        //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                        //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                    }
                    
                    if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                             if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoUrbanPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                        InfoRequiredLabel.text("Required")
                        InfoExistingLabel.text("Existing")
                        InfoRequired.style('background','#A5B3A4')
                        InfoExisting.style('background','#BFDFF1')
                    
                        {
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(d.properties.ST_NM.toUpperCase())
                            }
                            //InfoStateName.text(d.properties.ST_NM.toUpperCase());
                        }
                        
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                        InfoRuralTribalPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[2].v]))
                        InfoUrbanPopulation.text(numberWithCommas(d.properties.n_urban_pop));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoRequired.text(numberWithCommas(d.properties[dsr]))
                        InfoExisting.text(numberWithCommas( d.properties[dsr] - d.properties[sht]))
                        if(d.properties[sht] > 0){
                            InfoShortageLabel.text("Shortage (%)")
                             //Changing the formula to {(Existing - Desired) / Desired}
                            if(d.properties[dsr] == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((d.properties[sht])*100/(d.properties[dsr])))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0)+"%")
                            }
                            
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                 return (140) + 'px';
                            })

                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140*(d.properties[dsr] - d.properties[sht])/d.properties[dsr]) + 'px';
                            })

                            InfoShortage.style('color','#D96331')
                        }else{
                             //Changing the formula to {(Existing - Desired) / Desired}
                            InfoShortageLabel.text("Surplus (%)")
                            if(d.properties[dsr] == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((d.properties[sht]*-1)*100/(d.properties[dsr])))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0)+"%")
                            }
                            
                             InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140) + 'px';
                            })
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                 return (140*d.properties[dsr]/(d.properties[dsr] - d.properties[sht])) + 'px';
                            })

                            InfoShortage.style('color','#460')
                        }
                    }
                 }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select(this).style('opacity',"1")
                    
                        InfoRequiredLabel.text("Required")
                        InfoExistingLabel.text("Existing")
                        InfoRequired.style('background','#A5B3A4')
                        InfoExisting.style('background','#BFDFF1')
                    
                         if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else 
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoRequired.text(numberWithCommas(Desired))
                        InfoExisting.text(numberWithCommas(Total))
                        if(Desired - Total > 0){
                             //Changing the formula to {(Existing - Desired) / Desired}
                            InfoShortageLabel.text("Shortage (%)")
                            
                            if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((Desired-Total)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Desired-Total)*100/Desired).toFixed(0)+"%")
                            }
                            
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                return (140*Total/Desired) + 'px';
                            })
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                 return (140) + 'px';
                            })
                            InfoShortage.style('color','#D96331')
                        }else{
                            InfoShortageLabel.text("Surplus (%)")
                             //Changing the formula to {(Existing - Desired) / Desired}
                             if(Desired == 0)
                            {
                                InfoShortage.text("");
                            }
                            else if(isNaN((Total-Desired)*100/Desired))
                            {
                                InfoShortage.text("NA")

                            }else{
                                InfoShortage.text(((Total-Desired)*100/Desired).toFixed(0)+"%")
                            }
                            
                            
                            InfoRequired
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                
                                 return (140*Desired/Total) + 'px';
                            })
                            InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (140) + 'px';
                            })
                            InfoShortage.style('color','#460')
                        }
                     })

                    //d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                    d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                    d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                    d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                    d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                    d3.select("#d1").text("> 25%");
                    d3.select("#d2").text("0 - 25%");
                    d3.select("#d3").text("0 - 25%");
                    d3.select("#d4").text("> 25%");
        }
       
       
      function dynamicPlotINDIA_NON_COMP()
      { 
          $("#legends").hide();
          
          MainHeading.text(plotVarDef[plotVar.v].description.main_head +" : INDIA")
          
          $("#AVL").show();
               
               
                legendsData.style('visibility','visible')
          
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                       .attr('width',width)
                        .style('background',"#fff")
                        .attr('height',width*.65)
                }else{
                    //Do Nothing
                }
                
                
                
                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                 $("#CAVEAT_ROW").hide()
                 d3.select("#CAVEAT").text("")
                 
                InfoStateName.text("INDIA")
                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                InfoUrbanPopulationHead.text("Total Urban Population")
                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)

                //InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")
                InfoExisting.text(Total)
                InfoRequired.text("")
                InfoRequired.style('background','#fff')
                InfoExisting.style('background','#fff')
                InfoRequiredLabel.text("")
                InfoExistingLabel.text("No. of Hospitals")
                InfoShortageLabel.text("")
                InfoShortage.text("")
                
                
                
              var centered,zoomState=0;
              var g = IndiaStateCanvas.append("g");
          
              if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
              }else{
                    //Do Nothing
              }
              
             IndiaStateOutlineMap.on('mouseover',function(d){
                        d3.select(this).style('opacity',"0.7")
                        })
                    .on('mouseout',function(){
                        d3.select(this).style('opacity',"1")
                        })
                    .on('click',function(d){
                          if(d.properties.ST_NM != 'Telangana'){
                            currentStatePlot = d.properties.ST_NM;
                            createState(d.properties.ST_NM,currentCategoryPlot);   
                          }
                    })
                
            
              stateNameData = g.append("g")
                        .selectAll("text")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter()
                        .append("text")
                        .attr("d", pathState)
                        .attr("class", "statesNames")
                        .text(function(d){
                            if(d != undefined)
                                {
                                    return d.properties.ST_NM;
                                }
                         })
                       .attr("transform", function(d) { 
                            var centroid = pathState.centroid(d);
                            if(d.properties.ST_NM == 'Daman & Diu')
                            {
                                    return "translate(" + (centroid[0]-42) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'Punjab')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'West Bengal')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Jammu & Kashmir')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Madhya Pradesh')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Maharashtra')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Karnataka')
                            {
                            return "translate(" + (centroid[0]-30) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Andhra Pradesh')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Kerala')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Bihar')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Uttar Pradesh')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Jharkhand')
                            {
                            return "translate(" + (centroid[0]-17) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Arunanchal Pradesh')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Assam')
                            {
                            return "translate(" + (centroid[0]-40) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Meghalaya')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Nagaland')
                            {
                            return "translate(" + (centroid[0]+3) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Manipur')
                            {
                            return "translate(" + (centroid[0]) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Tripura')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Mizoram')
                            {
                            return "translate(" + (centroid[0]+2) + "," + (centroid[1]) + ")"
                            }
                            return "translate(" + (centroid[0]-15) + "," + centroid[1] + ")"
                        })
                        .attr("font-family", "helvetica")
                        .attr("font-size", (fontSize-3)+"px")
                        .attr("font-style", "bold")
                        .attr("fill", "black")
                       .on('mouseover',function(d){
                  
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI'){
                                 MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                //InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                            }
                    //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +d.properties.ST_NM)
                    d3.select(this).style('opacity',"0.6")
                     if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI'){
                                 //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(d.properties.ST_NM.toUpperCase())
                            }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                          if(d.properties.ST_NM == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI'){
                                 //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(d.properties.ST_NM.toUpperCase())
                            }
                          
                        //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                       
                         InfoExistingLabel.text("No. of Hospitals")
                            
                         InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                            
                         InfoUrbanPopulation.text(numberWithCommas(d.properties.n_urban_pop));
                         InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                       
                        InfoExisting.text(d.properties[PlotCategory[categoryCall].reqVar[0].v])
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                       
                      }
                }).on('mouseout',function(d){
                     MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                     d3.select(this).style('opacity',"1")
                         $("#CAVEAT_ROW").hide()
                         d3.select("#CAVEAT").text("")
                        
                         if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                       
                        InfoExisting.text(Total)

                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("No. of Hospitals")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        
                   
                })
                 
               IndiaStateOutlineMap.on('mouseover',function(d){
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                //InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                            }
                   
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +d.properties.ST_NM)
                    d3.select(this).style('opacity',"0.6")
                     if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                            }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoUrbanPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                           if(d.properties.ST_NM == "Andhra Pradesh"){
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                            }
                          
                        InfoStateName.text(d.properties.ST_NM.toUpperCase())
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                       
                        InfoExistingLabel.text("No. of Hospitals")
                            
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                            
                        InfoUrbanPopulation.text(numberWithCommas(d.properties.n_urban_pop));
                         InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                       
                        InfoExisting.text(d.properties[PlotCategory[categoryCall].reqVar[0].v])
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                       
                      }
                }).on('mouseout',function(d){
                     MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                     d3.select(this).style('opacity',"1")
                         $("#CAVEAT_ROW").hide()
                         d3.select("#CAVEAT").text("")
                        
                         if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalUrbanPopulation));
                        InfoUrbanPopulationHead.text("Total Urban Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                       
                        InfoExisting.text(Total)

                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("No. of Hospitals")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        
                   
                })
         }
       
       
       
      function dynamicPlotINDIA_Percentage()
      { 
          MainHeading.text(plotVarDef[plotVar.v].description.main_head +" : INDIA")
               
           legendsData.style('visibility','visible')
          
                //$("#ACCESSIBILITY").show();
                $("#AVL").show();
          
            $("#DENOMINATOR").text(PlotCategory[categoryCall].denom_head)
            $("#NUMERATOR").text(PlotCategory[categoryCall].num_head)
                
          
            if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                       .attr('width',width)
                       .style('background',"#fff")
                       .attr('height',width*.65)
            }else{

            }
          
                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                 $("#CAVEAT_ROW").hide()
                 d3.select("#CAVEAT").text("")
                
                InfoStateName.text("INDIA".toUpperCase())
          
                if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                        
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text("");
                        InfoUrbanPopulationHead.text("")
                        InfoHealthCategoryName.text("")                        
                        InfoExisting.text("")
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }else{
                       
                        InfoStateName.text("INDIA".toUpperCase())
                        InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                        InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                        InfoUrbanPopulation.text(numberWithCommas(TotalPopulation));
                        InfoUrbanPopulationHead.text("Total Population")
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*(TotalRuralTribalPop/TotalRuralPop)*100)+'px';
                        })
                       
                        InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("Percent")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                }
                
                
              var centered,zoomState=0;
              var g = IndiaStateCanvas.append("g");
          
               if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                }else{
                        
                }
              
            
          
            IndiaStateOutlineMap.on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")
                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                    })
                .on('click',function(d){
                      if(d.properties.ST_NM != 'Telangana'){
                        currentStatePlot = d.properties.ST_NM;
                        createState(d.properties.ST_NM,currentCategoryPlot);   
                      }
                })
                
            
              stateNameData = g.append("g")
                        .selectAll("text")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter()
                        .append("text")
                        .attr("d", pathState)
                        .attr("class", "statesNames")
                        .text(function(d){
                            if(d != undefined)
                                {
                                    return d.properties.ST_NM;
                                }
                         })
                       .attr("transform", function(d) { 
                            var centroid = pathState.centroid(d);
                            if(d.properties.ST_NM == 'Daman & Diu')
                            {
                                    return "translate(" + (centroid[0]-42) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'Punjab')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'West Bengal')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Jammu & Kashmir')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Madhya Pradesh')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Maharashtra')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Karnataka')
                            {
                            return "translate(" + (centroid[0]-30) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Andhra Pradesh')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Kerala')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Bihar')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Uttar Pradesh')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Jharkhand')
                            {
                            return "translate(" + (centroid[0]-17) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Arunanchal Pradesh')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Assam')
                            {
                            return "translate(" + (centroid[0]-40) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Meghalaya')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Nagaland')
                            {
                            return "translate(" + (centroid[0]+3) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Manipur')
                            {
                            return "translate(" + (centroid[0]) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Tripura')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Mizoram')
                            {
                            return "translate(" + (centroid[0]+2) + "," + (centroid[1]) + ")"
                            }
                            return "translate(" + (centroid[0]-15) + "," + centroid[1] + ")"
                        })
                        .attr("font-family", "helvetica")
                        .attr("font-size", (fontSize-3)+"px")
                        .attr("font-style", "bold")
                        .attr("fill", "black")
                        .on('mouseover',function(d){
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                            MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Andhra Pradesh *")
                            }
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                    MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Delhi")
                            }if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                    MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Arunachal Pradesh")
                            }else{
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                            }
                            d3.select(this).style('opacity',"0.6")
                         if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                             if(d.properties.ST_NM == "Andhra Pradesh"){
                                    InfoStateName.text("Andhra Pradesh*".toUpperCase())
                                }
                                if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                        InfoStateName.text("Delhi".toUpperCase())
                                }if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                        InfoStateName.text("Arunachal Pradesh".toUpperCase())
                                }else{
                                    InfoStateName.text(d.properties.ST_NM.toUpperCase())
                                }
                             
                            
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                    InfoStateName.text("Andhra Pradesh*".toUpperCase())
                                }
                                if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                        InfoStateName.text("Delhi".toUpperCase())
                                }if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                        InfoStateName.text("Arunachal Pradesh".toUpperCase())
                                }else{
                                    InfoStateName.text(d.properties.ST_NM.toUpperCase())
                                }
                             
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within5_PHC'){  
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])))
                            
                        InfoExistingLabel.text("Percent*");
                            
                        }else if(plotVar.v == 'p_within10_CHC'){
                            
                        InfoExistingLabel.text("Percent*")
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])))
                            
                        }else{
                            
                         InfoExistingLabel.text("Percent")
                            
                         InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                            
                        InfoUrbanPopulation.text(numberWithCommas(d.properties.n_total_pop));
                        InfoUrbanPopulationHead.text("Total Population")
                            
                        }
                          
                          
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*d.properties[plotVar.v])+'px';
                        })
                       
                        InfoExisting.text(parseFloat(d.properties[plotVar.v]).toFixed(0)+"%")
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                          
                      
                      }
                }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select(this).style('opacity',"1")
                     
                         $("#CAVEAT_ROW").hide()
                         d3.select("#CAVEAT").text("")
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                                InfoStateName.text("INDIA".toUpperCase())
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoUrbanPopulation.text("");
                                InfoUrbanPopulationHead.text("")
                                InfoHealthCategoryName.text("")                        
                                InfoExisting.text("")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }else{
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                                InfoUrbanPopulation.text(numberWithCommas(TotalPopulation));
                                InfoUrbanPopulationHead.text("Total Population")
                                InfoExisting
                                      .transition()
                                      .duration(200)
                                      .style('width',function(){
                                        return (1.40*(TotalRuralTribalPop/TotalRuralPop)*100)+'px';
                                })

                                InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")

                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#BFDFF1')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("Percent")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }
                   
                })
          
                
               IndiaStateOutlineMap
                  .attr('stroke', 'white')
                  .style('fill',function(d,i){
                        
                   if(d == undefined || d.properties[plotVar.v] == undefined){
                        return '#445'//colorAccessSubCenter_STATE_gt_5km[4];
                    }
                    else if(d.properties[plotVar.v].toFixed(0) >= plotVarDef[plotVar.v].limit.l4.l && d.properties[plotVar.v].toFixed(0)<= plotVarDef[plotVar.v].limit.l4.r){
                        return plotVarDef[plotVar.v].limit.l4.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l3.l && d.properties[plotVar.v].toFixed(0) <=plotVarDef[plotVar.v].limit.l3.r){
                        return plotVarDef[plotVar.v].limit.l3.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l2.l && d.properties[plotVar.v].toFixed(0)<=plotVarDef[plotVar.v].limit.l2.r){
                        return plotVarDef[plotVar.v].limit.l2.c;
                    }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l1.l ){
                        return plotVarDef[plotVar.v].limit.l1.c;
                    }else{
                        return '#000'
                    }
                 })
                 .on('mouseover',function(d){
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                            MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Andhra Pradesh *")
                            }
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                    MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Delhi")
                            }if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                    MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Arunachal Pradesh")
                            }else{
                                MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                            }
                            d3.select(this).style('opacity',"0.6")
                         if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                             if(d.properties.ST_NM == "Andhra Pradesh"){
                                    InfoStateName.text("Andhra Pradesh*".toUpperCase())
                                }
                                if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                        InfoStateName.text("Delhi".toUpperCase())
                                }if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                        InfoStateName.text("Arunachal Pradesh".toUpperCase())
                                }else{
                                    InfoStateName.text(d.properties.ST_NM.toUpperCase())
                                }
                             
                            
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                    InfoStateName.text("Andhra Pradesh*".toUpperCase())
                                }
                                if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                        InfoStateName.text("Delhi".toUpperCase())
                                }if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                        InfoStateName.text("Arunachal Pradesh".toUpperCase())
                                }else{
                                    InfoStateName.text(d.properties.ST_NM.toUpperCase())
                                }
                             
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within5_PHC'){  
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])))
                            
                        InfoExistingLabel.text("Percent*");
                            
                        }else if(plotVar.v == 'p_within10_CHC'){
                            
                        InfoExistingLabel.text("Percent*")
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[3].v])+parseFloat(d.properties[PlotCategory[categoryCall].reqVar[4].v])))
                            
                        }else{
                            
                         InfoExistingLabel.text("Percent")
                            
                         InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                            
                        InfoUrbanPopulation.text(numberWithCommas(d.properties.n_total_pop));
                        InfoUrbanPopulationHead.text("Total Population")
                            
                        }
                          
                          
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*d.properties[plotVar.v])+'px';
                        })
                       
                        InfoExisting.text(parseFloat(d.properties[plotVar.v]).toFixed(0)+"%")
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")

                      }
                   }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select(this).style('opacity',"1")
                     
                         $("#CAVEAT_ROW").hide()
                         d3.select("#CAVEAT").text("")
                        if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                                InfoStateName.text("INDIA".toUpperCase())
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoUrbanPopulation.text("");
                                InfoUrbanPopulationHead.text("")
                                InfoHealthCategoryName.text("")                        
                                InfoExisting.text("")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }else{
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                                InfoUrbanPopulation.text(numberWithCommas(TotalPopulation));
                                InfoUrbanPopulationHead.text("Total Population")
                                InfoExisting
                                      .transition()
                                      .duration(200)
                                      .style('width',function(){
                                        return (1.40*(TotalRuralTribalPop/TotalRuralPop)*100)+'px';
                                })

                                InfoExisting.text((TotalRuralTribalPop/TotalRuralPop*100).toFixed(0)+"%")

                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#BFDFF1')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("Percent")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }
                   
                  })

                if(currentCategoryPlot == "SDH_AVL" || currentCategoryPlot == "DH_AVL"){
                    $("#legends").hide()
                }
                
                    d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                    d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                    d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                    d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                    d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                if(plotVarDef[plotVar.v].limit.l1.r == 100){
                    d3.select("#d4").text("< "+plotVarDef[plotVar.v].limit.l4.r+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("> " + plotVarDef[plotVar.v].limit.l1.l+"%");
                }else{
                    d3.select("#d4").text("> "+ plotVarDef[plotVar.v].limit.l4.l+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("< "+ plotVarDef[plotVar.v].limit.l1.r+"%");
                }
         }
       
            
        //Plotting the main data map
        function dynamicPlot_INDIA_NON_COMP_QUALITY()
            {
                
                //$("#ACCESSIBILITY").show();
                $("#AVL").show();
                
                
                if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                   STATE == 'DELHI'
                }if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                    STATE == 'ARUNACHAL PRADESH'
                }
                
                hideXtra();
                if(typeVar == 'HR'){
                    InfoStateName.text("Human Resources")
                    displayHR(myQObj);
                }else if(typeVar == 'INFRA'){
                    InfoStateName.text("Infrastructure")
                    displayINFRA(myQObj);
                }else if(typeVar == 'SUPPLY'){
                    InfoStateName.text("Supply")
                    displaySUPPLY(myQObj);
                }
                
                projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                pathState = d3.geo.path().projection(projectionState);
                
                
           
                
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"white")
                }else{
                    
                }
                
             
                var g = IndiaStateCanvas.append("g");
                
                if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                }else{
                        
                }
                
              
                
             IndiaStateOutlineMap.attr('stroke', 'white')
                .on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")
                        if(typeVar == 'HR'){
                        InfoStateName.text("Human Resources : " + d.properties.ST_NM)
                        displayHR(d.properties);
                        }else if(typeVar == 'INFRA'){
                            InfoStateName.text("Infrastructure : " + d.properties.ST_NM)
                            displayINFRA(d.properties);
                        }else if(typeVar == 'SUPPLY'){
                            InfoStateName.text("Supply : " + d.properties.ST_NM)
                            displaySUPPLY(d.properties);
                        }
                    
                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                        if(typeVar == 'HR'){
                        InfoStateName.text("Human Resources")
                        displayHR(myQObj);
                        }else if(typeVar == 'INFRA'){
                            InfoStateName.text("Infrastructure")
                            displayINFRA(myQObj);
                        }else if(typeVar == 'SUPPLY'){
                            InfoStateName.text("Supply")
                            displaySUPPLY(myQObj);
                        }
                    })
                .on('click',function(d){
                    
                    if(d.properties.ST_NM != 'Telangana'){
                        currentStatePlot = d.properties.ST_NM;
                        createState(d.properties.ST_NM,currentCategoryPlot);   
                    }
                })
                
            
            stateNameData = g.append("g")
                        .selectAll("text")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter()
                        .append("text")
                        .attr("d", pathState)
                        .attr("class", "statesNames")
                        .text(function(d){
                            if(d != undefined)
                                {
                                   
                                    if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                            return "Delhi";
                                    }if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                            return "Arunachal Pradesh";
                                    }else{
                                        return d.properties.ST_NM;
                                    }
                                    
                                }
                         })
                       .attr("transform", function(d) { 
                            var centroid = pathState.centroid(d);
                            if(d.properties.ST_NM == 'Daman & Diu')
                            {
                                    return "translate(" + (centroid[0]-42) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'Punjab')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'West Bengal')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Jammu & Kashmir')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Madhya Pradesh')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Maharashtra')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Karnataka')
                            {
                            return "translate(" + (centroid[0]-30) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Andhra Pradesh')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Kerala')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Bihar')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Uttar Pradesh')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Jharkhand')
                            {
                            return "translate(" + (centroid[0]-17) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Arunanchal Pradesh')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Assam')
                            {
                            return "translate(" + (centroid[0]-40) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Meghalaya')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Nagaland')
                            {
                            return "translate(" + (centroid[0]+3) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Manipur')
                            {
                            return "translate(" + (centroid[0]) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Tripura')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Mizoram')
                            {
                            return "translate(" + (centroid[0]+2) + "," + (centroid[1]) + ")"
                            }
                            return "translate(" + (centroid[0]-15) + "," + centroid[1] + ")"
                        })
                        .attr("font-family", "helvetica")
                        .attr("font-size", (fontSize-3)+"px")
                        .attr("font-style", "bold")
                        .attr("fill", "black")
                        .on('mouseover',function(d){
                            d3.select(this).style('opacity',"0.7")
                                
                                if(typeVar == 'HR'){
                               InfoStateName.text("Human Resources")
                                displayHR(d.properties);
                                }else if(typeVar == 'INFRA'){
                                    InfoStateName.text("Infrastructure")
                                    displayINFRA(d.properties);
                                }else if(typeVar == 'SUPPLY'){
                                    InfoStateName.text("Supply")
                                    displaySUPPLY(d.properties);
                                }

                            })
                        .on('mouseout',function(){
                            d3.select(this).style('opacity',"1")
                                if(typeVar == 'HR'){
                                InfoStateName.text("Human Resources")
                                displayHR(myQObj);
                                }else if(typeVar == 'INFRA'){
                                    InfoStateName.text("Infrastructure")
                                    displayINFRA(myQObj);
                                }else if(typeVar == 'SUPPLY'){
                                    InfoStateName.text("Supply")
                                    displaySUPPLY(myQObj);
                                }
                            })
                        .on('click',function(d){
                            
                            if(d.properties.ST_NM != 'Telangana'){
                                currentStatePlot = d.properties.ST_NM;
                                createState(d.properties.ST_NM,currentCategoryPlot);   
                            }
                        })
                
             function displayHR(d){
                    
                  if(PlotCategory[categoryCall].hr.length == 0){
                      InfoHealthCategoryName.text("Data Not Available")
                  }else{    
                      InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                  }
                
                  for(var i = 0 ; i < PlotCategory[categoryCall].hr.length ; i++){
                    var var_name = PlotCategory[categoryCall].hr[i];
                   
                        
                        $("#LABEL_"+(i+1)).show();
                        $("#VALUE_"+(i+1)).show();
                        d3.select("#LABEL_"+(i+1)).text(PlotCategory[categoryCall].hr_label[i])
                         if(d[var_name] == null){
                            d3.select("#VALUE_"+(i+1)).text("NA")
                            d3.select("#VALUE_"+(i+1)).style('color','black')
                        }else{
                            
                            if((1-d[var_name]) >= 0){
                                d3.select("#VALUE_"+(i+1)).text(((1-d[var_name])*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','#D96331')
                            }else{
                                d3.select("#VALUE_"+(i+1)).text(((d[var_name]-1)*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','green')
                         }
                     }
                  }
                
                }
           
               function displayINFRA(d){
                   
                  if(PlotCategory[categoryCall].infra.length == 0){
                      InfoHealthCategoryName.text("Data Not Available")
                  }else{
                      InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                  }
                   
                   
                if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                   STATE == 'DELHI'
                }if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                    STATE == 'ARUNACHAL PRADESH'
                }
                   
                 for(var i = 0 ; i < PlotCategory[categoryCall].infra.length ; i++){
                    var var_name = PlotCategory[categoryCall].infra[i];
                   
                        
                        $("#LABEL_"+(i+1)).show();
                        $("#VALUE_"+(i+1)).show();
                        d3.select("#LABEL_"+(i+1)).text(PlotCategory[categoryCall].infra_label[i])
                         if(d[var_name] == null){
                            d3.select("#VALUE_"+(i+1)).text("NA")
                            d3.select("#VALUE_"+(i+1)).style('color','black')
                        }else{
                            
                            if((1-d[var_name]) >= 0){
                                d3.select("#VALUE_"+(i+1)).text(((1-d[var_name])*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','#D96331')
                            }else{
                                d3.select("#VALUE_"+(i+1)).text(((d[var_name]-1)*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','green')
                            }
                      }
                  }
                }
           
                function displaySUPPLY(d){
                    
                  if(PlotCategory[categoryCall].supply.length == 0){
                      InfoHealthCategoryName.text("Data Not Available")
                  }else{
                      InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                  } 
                    
                  for(var i = 0 ; i < PlotCategory[categoryCall].supply.length ; i++){
                    var var_name = PlotCategory[categoryCall].supply[i];
                    
                        $("#LABEL_"+(i+1)).show();
                        $("#VALUE_"+(i+1)).show();
                        d3.select("#LABEL_"+(i+1)).text(PlotCategory[categoryCall].supply_label[i])
                         if(d[var_name] == null){
                            d3.select("#VALUE_"+(i+1)).text("NA")
                            d3.select("#VALUE_"+(i+1)).style('color','black')
                        }else{
                            
                            if((1-d[var_name]) >= 0){
                                d3.select("#VALUE_"+(i+1)).text(((1-d[var_name])*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','#D96331')
                            }else{
                                d3.select("#VALUE_"+(i+1)).text(((d[var_name]-1)*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','green')
                            }
                     }
                }
            }
        }
       
       //Plotting the State map
       function dynamicPlotSTATES()
            {
                
                if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                   STATE == 'DELHI'
                }if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                    STATE == 'ARUNACHAL PRADESH'
                }
                
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                
                projectionState = d3.geo.mercator()
                              .translate([-width*GEOM_WIDTH_R, height*GEOM_HEIGHT_R])
                              .scale([width*GEOM_SCALE_R]);
                pathState = d3.geo.path().projection(projectionState);
           
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                            .attr('height',height)
                            .attr('width',width)
                            .style('background',"white")
                }else{
                    
                }
               
                    
             
                var g = IndiaStateCanvas.append("g");
                
                if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                }else{
                        
                }
                
                IndiaStateOutlineMap.attr('stroke', 'white')
                
                .on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")

                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                    })
        }
       
       function dynamicPlot_STATE_NON_COMP_QUALITY(){
           
                //$("#ACCESSIBILITY").show();
                $("#AVL").show();
               
                projectionState = d3.geo.mercator()
                              .translate([-width*GEOM_WIDTH_R, height*GEOM_HEIGHT_R])
                              .scale([width*GEOM_SCALE_R]);
                pathState = d3.geo.path().projection(projectionState);
           
                
           
                if(typeVar == 'HR'){
                    InfoStateName.text("Human Resources")
                }else if(typeVar == 'INFRA'){
                    InfoStateName.text("Infrastructure")
                }else if(typeVar == 'SUPPLY'){
                    InfoStateName.text("Supply")
                }
                
                InfoRuralPopulation.text(stateAPIData[0].n_rural_pop)
                InfoRuralTribalPopulation.text(stateAPIData[0].n_rural_tr_pop)
           
           
                //InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                //Showing the data in the side cloumn
                if(typeVar == 'HR'){
                    displayHR();
                }else if(typeVar == 'INFRA'){
                    displayINFRA();
                }else if(typeVar == 'SUPPLY'){
                    displaySUPPLY();
                }
           
           
                changeinfoStructure();
                function changeinfoStructure(){
                    $("#sub-info").removeClass("col-border");
                    //$("#sub-info-box").hide();
                }
           
                InfoExisting.style('background','#fff')
           
                function displayHR(){
                  hideXtra();  
                  if(PlotCategory[categoryCall].hr.length == 0){
                      InfoHealthCategoryName.text("Data Not Available")
                  }else{    
                      InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                  }
                    
                  for(var i = 0 ; i < PlotCategory[categoryCall].hr.length ; i++){
                    var var_name = PlotCategory[categoryCall].hr[i];
                    
                        $("#LABEL_"+(i+1)).show();
                        $("#VALUE_"+(i+1)).show();
                        d3.select("#LABEL_"+(i+1)).text(PlotCategory[categoryCall].hr_label[i])
                         if(stateAPIData[0][var_name] == null){
                            d3.select("#VALUE_"+(i+1)).text("NA")
                            d3.select("#VALUE_"+(i+1)).style('color','black')
                        }else{
                            
                            if((1-stateAPIData[0][var_name]) >= 0){
                                d3.select("#VALUE_"+(i+1)).text(((1-stateAPIData[0][var_name])*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','#D96331')
                            }else{
                                d3.select("#VALUE_"+(i+1)).text(((stateAPIData[0][var_name]-1)*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','green')
                            }
                        }
                    
                  }
                 
                }
           
               function displayINFRA(){
                  hideXtra(); 
                  if(PlotCategory[categoryCall].infra.length == 0){
                      InfoHealthCategoryName.text("Data Not Available")
                  }else{
                      InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                  }
                   
                   for(var i = 0 ; i < PlotCategory[categoryCall].infra.length ; i++){
                    var var_name = PlotCategory[categoryCall].infra[i];
                    
                        
                        $("#LABEL_"+(i+1)).show();
                        $("#VALUE_"+(i+1)).show();
                        d3.select("#LABEL_"+(i+1)).text(PlotCategory[categoryCall].infra_label[i])
                         if(stateAPIData[0][var_name] == null){
                            d3.select("#VALUE_"+(i+1)).text("NA")
                            d3.select("#VALUE_"+(i+1)).style('color','black')
                        }else{
                            
                            if((1-stateAPIData[0][var_name]) >= 0){
                                d3.select("#VALUE_"+(i+1)).text(((1-stateAPIData[0][var_name])*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','#D96331')
                            }else{
                                d3.select("#VALUE_"+(i+1)).text(((stateAPIData[0][var_name]-1)*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','green')
                            }
                        }
                    
                  }
                }
           
                function displaySUPPLY(){
                  hideXtra();  
                  if(PlotCategory[categoryCall].supply.length == 0){
                      InfoHealthCategoryName.text("Data Not Available")
                  }else{
                      InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                  } 
                    
                  for(var i = 0 ; i < PlotCategory[categoryCall].supply.length ; i++){
                    var var_name = PlotCategory[categoryCall].supply[i];
                        
                        $("#LABEL_"+(i+1)).show();
                        $("#VALUE_"+(i+1)).show();
                        d3.select("#LABEL_"+(i+1)).text(PlotCategory[categoryCall].supply_label[i])
                         if(stateAPIData[0][var_name] == null){
                            d3.select("#VALUE_"+(i+1)).text("NA")
                            d3.select("#VALUE_"+(i+1)).style('color','black')
                        }else{
                            
                            if((1-stateAPIData[0][var_name]) >= 0){
                                d3.select("#VALUE_"+(i+1)).text(((1-stateAPIData[0][var_name])*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','#D96331')
                            }else{
                                d3.select("#VALUE_"+(i+1)).text(((stateAPIData[0][var_name]-1)*100).toFixed(1)+"%")
                                d3.select("#VALUE_"+(i+1)).style('color','green')
                            }
                        }
                    
                  }
                }
                
                var clickID = d3.select("#HR");
                d3.select("#HR").on('click',function(){
                    
                    hideXtra();
                    displayHR()
                    clickID = d3.select(this)
                    
                })
                d3.select("#INFRA").on('click',function(){
                    
                    hideXtra();
                    displayINFRA()
                    clickID = d3.select(this)
                })
                d3.select("#SUPPLY").on('click',function(){
                    
                    hideXtra();
                    displaySUPPLY()
                    clickID = d3.select(this)
                })
               
                
               
                if(STATE == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Andhra Pradesh *")
                    }else
                    if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                            MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Delhi")
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                            MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Arunachal Pradesh")
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + STATE)
                    }
               
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                            .attr('height',height)
                            .attr('width',width)
                            .style('background',"white")
                }else{
                    
                }
                    
             
                var g = IndiaStateCanvas.append("g");
               
               if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                }else{
                        
                }
           
                IndiaStateOutlineMap.on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")
                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                    })
                .on('click',function(d){
                    
                    /*if(d.properties.ST_NM != 'Telangana'){
                        currentStatePlot = d.properties.ST_NM;
                        createState(d.properties.ST_NM,currentCategoryPlot);   
                    }*/
                })
        }
            
       function dynamicPlotNonComp()
            {
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                            .attr('height',height)
                            .attr('width',width)
                            .style('background',"#fff")
                            .attr('width',width)
                }else{
                    
                }
                      
               
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide()
                
              var g = IndiaStateCanvas.append("g");
                
              var centered,zoomState=0;
                
                if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.append("g")
                        .selectAll("path")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter()
                        .append("path")
                        .attr("d", pathState)
                        .attr("class", "states")
                        .attr('stroke-width', 1)
                        .attr('stroke', 'white')
                        .style('fill','#74A9CF')
                }else{
                        
                }
             
             MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                
              IndiaStateOutlineMap
               .on('mouseover',function(d){
                    if(STATE == "Andhra Pradesh"){
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Andhra Pradesh *")
                    }else
                    if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                            MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Delhi")
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                            MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + "Arunachal Pradesh")
                    }else{
                        MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + STATE)
                    }
                  
                    
                    d3.select(this).style('opacity',"0.6")
                       if(d == undefined || d.properties[PlotCategory[categoryCall].reqVar[0].v] ==undefined ){
                        
                             if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                            InfoRuralPopulation.text("NA")
                            InfoRuralTribalPopulation.text("NA")
                            InfoHealthCategoryName.text("")
                            InfoExisting.text("")

                            InfoRequired.text("")
                            InfoRequired.style('background','#fff')
                            InfoExisting.style('background','#fff')
                            InfoRequiredLabel.text("")
                            InfoExistingLabel.text("")
                            InfoShortageLabel.text("")
                            InfoShortage.text("")
                      }else if(d != undefined ){
                          
                        if(d.properties.DISTRICT.toUpperCase() == 'Y.S.R'){
                            InfoStateName.text("District : " + "YSR Kadapa")
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Ganganagar'){
                            InfoStateName.text("District : " + "Sri "+d.properties.DISTRICT.toUpperCase());
                        }else if(d.properties.DISTRICT.toUpperCase() == 'Jhunjhunun'){
                            InfoStateName.text("District : " + "Jhunjhunu");
                        }else{
                            InfoStateName.text("District : " + d.properties.DISTRICT.toUpperCase());
                        }
                          
                        InfoRuralPopulation.text(numberWithCommas(d.properties[PlotCategory[categoryCall].reqVar[1].v]))
                       
                        InfoRuralTribalPopulation.text(numberWithCommas(parseFloat(d.properties[PlotCategory[categoryCall].reqVar[2].v])))
                            
                        InfoExistingLabel.text("No. of Hospitals")
                          
                          
                        InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                        InfoExisting
                              .transition()
                              .duration(200)
                              .style('width',function(){
                                return (1.40*d.properties[plotVar.v])+'px';
                        })
                       
                        InfoExisting.text(parseFloat(d.properties[plotVar.v]))
                        
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#fff')
                        InfoRequiredLabel.text("")
                        
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        
                       
                      }
                }).on('mouseout',function(d){
                    MainHeading.text(plotVarDef[plotVar.v].description.main_head)
                    d3.select("#CAVEAT").text("")
                    $("#CAVEAT_ROW").hide()
                    d3.select(this).style('opacity',"1")
                       if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC'){
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text("")                        
                                InfoExisting.text("")
                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }else{
                                 if(STATE == "Andhra Pradesh"){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                                InfoStateName.text("Andhra Pradesh*".toUpperCase())
                            }else
                            if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                                // MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                                InfoStateName.text("Delhi".toUpperCase())
                            }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                                InfoStateName.text("Arunachal Pradesh".toUpperCase())
                            }else{
                                //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " + d.properties.ST_NM)
                                InfoStateName.text(STATE.toUpperCase())
                            }
                                InfoRuralPopulation.text(numberWithCommas(TotalRuralPop))
                                InfoRuralTribalPopulation.text(numberWithCommas(TotalRuralTribalPop))
                                InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                               
                                InfoExisting.text(Total)

                                InfoRequired.text("")
                                InfoRequired.style('background','#fff')
                                InfoExisting.style('background','#fff')
                                InfoRequiredLabel.text("")
                                InfoExistingLabel.text("No. of Hospitals")
                                InfoShortageLabel.text("")
                                InfoShortage.text("")
                        }
                   
                })

                d3.select("#legHead").text(plotVarDef[plotVar.v].description.leg_head);
                d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);
                
                if(plotVarDef[plotVar.v].limit.l1.r == 100){
                    d3.select("#d4").text("< "+plotVarDef[plotVar.v].limit.l4.r+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("> " + plotVarDef[plotVar.v].limit.l1.l+"%");
                }else{
                    d3.select("#d4").text("> "+ plotVarDef[plotVar.v].limit.l4.l+"%");
                    d3.select("#d3").text(plotVarDef[plotVar.v].limit.l3.l+"% - "+ plotVarDef[plotVar.v].limit.l3.r+"%");
                    d3.select("#d2").text(plotVarDef[plotVar.v].limit.l2.l+"% - "+ plotVarDef[plotVar.v].limit.l2.r+"%");
                    d3.select("#d1").text("< "+ plotVarDef[plotVar.v].limit.l1.r+"%");
                }
        }
       
        //Plotting the HMIS Indexes map
        function dynamicPlot_HMIS_INDEX()
            {
                var BIG = [],SMALL = [],UT = [];
                //Categorize the states
                stateAPIData.forEach(function(d){
                     if(d.TYPE == 'state'){
                         BIG.push(d.stateName);
                     }else if(d.TYPE == 'small'){
                         SMALL.push(d.stateName);
                     }else if(d.TYPE == 'UT'){
                         UT.push(d.stateName);
                     }
                })
                UT.push('Andaman & Nicobar Island');
                
                
                
                var prev_id = null,prev_id_C = null;
                $("#comming_soon").hide();

                projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                pathState = d3.geo.path().projection(projectionState);

                MainHeading.text("Health Infrastructure Index : INDIA")

                if(outlineMap)
                    {
                        outlineMap.remove();
                    }

                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                           .attr('height',height)
                            .attr('width',width)
                            .style('background',"white")
                }else{
                    
                }
                
                var g = IndiaStateCanvas.append("g");

                if(IndiaStateOutlineMap == null){
                    
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .attr('stroke', 'white')
                }else{
                        
                }

                IndiaStateOutlineMap .on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")

                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                    })
                .on('click',function(d){
                     
                })


                $('.INDEX_STATE_SELECT').on('click',function(){
                    //alert()
                    if($(this).attr('id') == 'BIG_STATE_INX'){
                        $("#index_data tr").remove()
                        makeTableBIG(stateAPIData)
                    }else if($(this).attr('id') == 'SMALL_STATE_INX'){
                        $("#index_data tr").remove()
                        makeTableSMALL(stateAPIData)
                    }else if($(this).attr('id') == 'UT_STATE_INX'){
                        $("#index_data tr").remove()
                        makeTableUT(stateAPIData)
                    }

                })


                function makeTableBIG(stateAPIData){
                    
                    var data = "";
                    $("#index_data").html(data)
                    stateAPIData.forEach(function(d){

                        if(d.TYPE == 'state'){
                            data += '<tr id="'+ StateCodeObject[d.stateName] +'_col" onclick="highlight()" style="font-size:10px;"><td class="col-xs-4" >'+ d.stateName +'</td><td class="col-xs-2" style="text-align:right">'+parseFloat(d.HQNI).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right">'+parseFloat(d.HQLI).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right">'+parseFloat(d.HII).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right;">'+d.RANKING+'</td></tr>'
                        }
                        
                        IndiaStateOutlineMap.style('fill',function(d,i){
                            if(d == undefined ){
                                return '#cbcbcb'
                            }else if(BIG.indexOf(d.properties.ST_NM) == -1){
                                return '#cbcbcb'
                            }else if(d.properties.ST_NM == 'Telangana'){
                                return plotVarDef[plotVar.v].limit.l3.c;
                            }else if(d.properties.RANKING >= plotVarDef[plotVar.v].limit.l4.l && d.properties.RANKING <= plotVarDef[plotVar.v].limit.l4.r){
                                return plotVarDef[plotVar.v].limit.l4.c;
                            }else if(d.properties.RANKING >=plotVarDef[plotVar.v].limit.l3.l && d.properties.RANKING <=plotVarDef[plotVar.v].limit.l3.r){
                                return plotVarDef[plotVar.v].limit.l3.c;
                            }else if(d.properties.RANKING >=plotVarDef[plotVar.v].limit.l2.l && d.properties.RANKING<=plotVarDef[plotVar.v].limit.l2.r){
                                return plotVarDef[plotVar.v].limit.l2.c;
                            }else if(d.properties.RANKING >= plotVarDef[plotVar.v].limit.l1.l ){
                                return plotVarDef[plotVar.v].limit.l1.c;
                            }else{
                                return '#000'
                            }
                         })

                    })

                    $("#legHead").show()
                    d3.select("#d1").text("1st - 5th");
                    d3.select("#d2").text("6th - 10th");
                    d3.select("#d3").text("11th - 15th");
                    d3.select("#d4").text("16th - 21st");
                    $("#index_data").append(data)
                    $("#table-area").show();
                }

                function makeTableSMALL(stateAPIData){
                    
                    var data = "";
                    $("#index_data").html(data)
                    stateAPIData.forEach(function(d){

                        if(d.TYPE == 'small'){
                            data += '<tr id="'+ StateCodeObject[d.stateName] +'_col" onclick="highlight()" style="font-size:10px;"><td class="col-xs-4">'+ d.stateName +'</td><td class="col-xs-2" style="text-align:right">'+parseFloat(d.HQNI).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right">'+parseFloat(d.HQLI).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right">'+parseFloat(d.HII).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right;">'+d.RANKING+'</td></tr>'
                        }

                    })
                    
                    IndiaStateOutlineMap.style('fill',function(d,i){
                        if(d == undefined ){
                            return '#cbcbcb'
                        }else if(SMALL.indexOf(d.properties.ST_NM) == -1){
                            return '#cbcbcb'
                        }else if(d.properties.RANKING >= plotVarDef['SMALL_STATE'].limit.l4.l && d.properties.RANKING <= plotVarDef['SMALL_STATE'].limit.l4.r){
                            return plotVarDef['SMALL_STATE'].limit.l4.c;
                        }else if(d.properties.RANKING >=plotVarDef['SMALL_STATE'].limit.l3.l && d.properties.RANKING <=plotVarDef['SMALL_STATE'].limit.l3.r){
                            return plotVarDef['SMALL_STATE'].limit.l3.c;
                        }else if(d.properties.RANKING >=plotVarDef['SMALL_STATE'].limit.l2.l && d.properties.RANKING<=plotVarDef['SMALL_STATE'].limit.l2.r){
                            return plotVarDef['SMALL_STATE'].limit.l2.c;
                        }else if(d.properties.RANKING >= plotVarDef['SMALL_STATE'].limit.l1.l ){
                            return plotVarDef['SMALL_STATE'].limit.l1.c;
                        }else{
                            return '#000'
                        }
                     })

                    $("#legHead").show()
                    d3.select("#d1").text("1st - 2nd");
                    d3.select("#d2").text("3rd - 4th");
                    d3.select("#d3").text("5th - 7th");
                    d3.select("#d4").text("8th - 9th");
                    $("#index_data").append(data)
                    $("#table-area").show();
                }

                function makeTableUT(stateAPIData){
                    
                    var data = "";
                    $("#index_data").html(data)
                    stateAPIData.forEach(function(d){

                        if(d.TYPE == 'UT'){
                            data += '<tr id="'+ StateCodeObject[d.stateName] +'_col" onclick="highlight()" style="font-size:10px;"><td class="col-xs-4">'+ d.stateName +'</td><td class="col-xs-2" style="text-align:right">'+parseFloat(d.HQNI).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right">'+parseFloat(d.HQLI).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right">'+parseFloat(d.HII).toFixed(2)+'</td><td class=" col-xs-2" style="text-align:right;">'+d.RANKING+'</td></tr>'
                        }

                    })
                    
                    IndiaStateOutlineMap.style('fill',function(d,i){
                        if(d == undefined ){
                            return '#cbcbcb'
                        }else if(UT.indexOf(d.properties.ST_NM) == -1){
                            return '#cbcbcb'
                        }else if(d.properties.RANKING >= plotVarDef['UT_STATE'].limit.l4.l && d.properties.RANKING <= plotVarDef['UT_STATE'].limit.l4.r){
                            return plotVarDef['UT_STATE'].limit.l4.c;
                        }else if(d.properties.RANKING >=plotVarDef['UT_STATE'].limit.l3.l && d.properties.RANKING <=plotVarDef['UT_STATE'].limit.l3.r){
                            return plotVarDef['UT_STATE'].limit.l3.c;
                        }else if(d.properties.RANKING >=plotVarDef['UT_STATE'].limit.l2.l && d.properties.RANKING<=plotVarDef['UT_STATE'].limit.l2.r){
                            return plotVarDef['UT_STATE'].limit.l2.c;
                        }else if(d.properties.RANKING >= plotVarDef['UT_STATE'].limit.l1.l ){
                            return plotVarDef['UT_STATE'].limit.l1.c;
                        }else{
                            return '#000'
                        }
                     })
                    $("#legHead").show()
                    d3.select("#d1").text("1st");
                    d3.select("#d2").text("2nd - 3rd");
                    d3.select("#d3").text("4th - 5th");
                    d3.select("#d4").text("6th");
                    $("#table-area").show();
                    $("#index_data").append(data)
                }
                
                var last_color=null, last_col_sel = null;

            if(index_plot == 'INFRA_INDEX'){

               
                $("#comming_soon").hide();
                $("#main-head").text("Health Infrastructure Index : INDIA")
                
                makeTableBIG(stateAPIData);
                
                
                
                $("#legends").show()
                d3.select("#l1").text(plotVarDef[plotVar.v].limit.l1.head);
                d3.select("#l2").text(plotVarDef[plotVar.v].limit.l2.head);
                d3.select("#l3").text(plotVarDef[plotVar.v].limit.l3.head);
                d3.select("#l4").text(plotVarDef[plotVar.v].limit.l4.head);


            }else if(index_plot == 'MET_INDEX'){

                $("#legends").hide();
                $("#legHead").hide();
                $("#table-area").hide();

                IndiaStateOutlineMap.style('fill','#74A9CF')
                $("#main-head").text("Maternal Health Index : INDIA")
                $("#comming_soon").show();

            }else if(index_plot == 'CHILD_CARE_INDEX'){

                $("#legends").hide();
                $("#legHead").hide();
                $("#table-area").hide();

                IndiaStateOutlineMap.style('fill','#74A9CF')
                $("#main-head").text("Child Health Index : INDIA")
                $("#comming_soon").show();

            }else if(index_plot == 'COMM_DIS_INDEX'){

                MainHeading.text("Communicable Disease Index")
                $("#legends").hide();
                $("#legHead").hide();
                $("#table-area").hide();


                IndiaStateOutlineMap.style('fill','#74A9CF')

                $("#main-head").text("Communicable Diseases Index : INDIA")
                $("#comming_soon").show();

            }else if(index_plot == 'NON_COMM_DIS_INDEX'){

                $("#legends").hide();
                $("#legHead").hide();
                $("#table-area").hide();

                IndiaStateOutlineMap.style('fill','#74A9CF')
                $("#main-head").text("Non Communicable Diseases Index : INDIA")
                $("#comming_soon").show();

            }else if(index_plot == 'GEN_INDEX'){

                $("#legends").hide();
                $("#legHead").hide();
                $("#table-area").hide();


                IndiaStateOutlineMap.style('fill','#74A9CF')
                $("#main-head").text("General Health Index : INDIA")
                $("#comming_soon").show();
             }

            stateNameData = g.append("g")
                        .selectAll("text")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter()
                        .append("text")
                        .attr("d", pathState)
                        .attr("class", "statesNames")
                        .text(function(d){
                            if(d != undefined)
                                {
                                    return d.properties.ST_NM;
                                }
                         })
                       .attr("transform", function(d) { 
                            var centroid = pathState.centroid(d);
                            if(d.properties.ST_NM == 'Daman & Diu')
                            {
                                    return "translate(" + (centroid[0]-42) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'Punjab')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]-5) + ")"
                            }else if(d.properties.ST_NM == 'West Bengal')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Jammu & Kashmir')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]+10) + ")"
                            }else if(d.properties.ST_NM == 'Madhya Pradesh')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Maharashtra')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Karnataka')
                            {
                            return "translate(" + (centroid[0]-30) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Andhra Pradesh')
                            {
                            return "translate(" + (centroid[0]-35) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Kerala')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+15) + ")"
                            }else if(d.properties.ST_NM == 'Bihar')
                            {
                            return "translate(" + (centroid[0]-5) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Uttar Pradesh')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Jharkhand')
                            {
                            return "translate(" + (centroid[0]-17) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Arunanchal Pradesh')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Assam')
                            {
                            return "translate(" + (centroid[0]-40) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Meghalaya')
                            {
                            return "translate(" + (centroid[0]-25) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Nagaland')
                            {
                            return "translate(" + (centroid[0]+3) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Manipur')
                            {
                            return "translate(" + (centroid[0]) + "," + (centroid[1]+5) + ")"
                            }else if(d.properties.ST_NM == 'Tripura')
                            {
                            return "translate(" + (centroid[0]-20) + "," + (centroid[1]) + ")"
                            }else if(d.properties.ST_NM == 'Mizoram')
                            {
                            return "translate(" + (centroid[0]+2) + "," + (centroid[1]) + ")"
                            }
                            else if(d.properties.ST_NM == 'Chandigarh')
                            {
                            return "translate(" + (centroid[0]-15) + "," + (centroid[1]+7) + ")"
                            }
                            return "translate(" + (centroid[0]-15) + "," + centroid[1] + ")"
                        })
                        .attr("font-family", "helvetica")
                        .attr("font-size", (fontSize-3)+"px")
                        .attr("font-style", "bold")
                        .attr("fill", "black")
                        .on('click',function(d){
                            

                        })


                }
            
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }  
    }       
  }
    function hideXtra(){
        InfoShortage.text("")
        InfoRequired.text("")
        InfoExisting.text("")
        InfoShortageLabel.text("")
        InfoRequiredLabel.text("")
        InfoExistingLabel.text("")
        for(var i=0;i<10;i++){
            $("#LABEL_"+(i+1)).hide();
            $("#VALUE_"+(i+1)).hide();
        }
    }
}
    
})(window, document, jQuery);