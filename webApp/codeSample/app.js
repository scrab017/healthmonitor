
var  function_container = {};
var nfhsPlotEnable = 0;

/*  NFHS Data categorization  */

/* Exception to be added for NFHS*/
/*
    low_hemoglobin : anemia
*/

//Global definition for the legend
var continuousLegend;

//This defines the type of map to be plotted : 1 => condition Priority ; 2 => income prioroty
var conditionPriorityMap = 0;

var dataCollectSunBurst = {};

var sunBurstCollection = {};

var quartileTableCheck = 0;

var quartileTable = {
    q1 : 0,
    q2 : 0,
    q3 : 0,
    q4 : 0,
    q5 : 0
}

var nfhsDiseaseIdetifier = 0;

var mainCategoryIdentifier = "";

var catArr = ['fe','ma','ru','ur','npw','pw','all_gender','all_region','all_mat'];

var nfhsDivisionDescription = {
    fe : "Female",
    ma : "Male",
    all : "Both",
    ru : "Rural",
    ur : "Urban",
    elevated : "Elevated",
    h : "Healthy",
    hh : "High",
    l : "Low",
    hhhh : "Severe",
    dk : "Don't Know",
    hhh : "Elevated",
    p : "Normal",
    npw : "Non Pregnant Women",
    pw : "Pregnant Women",
    t : "Treated"
}

var nfhsPropertyDescription = {
    "ad_bp": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["h", "hhh",  "hh", "l", "hhhh"]
    },
    "asthma": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p", "dk", "t"]
    },
    "cancer": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p", "dk", "t"]
    },
    "diabetes": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p", "dk", "t"]
    },
    "heart": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p", "dk",  "t"]
    },
    "thyroid": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p", "dk",  "t"]
    },
    "bp": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["h", "hhh", "hh", "l", "hhhh"]
    },
    "bmi": {
        "gender": ["fe"],
        "region": ["all", "ru", "ur" ],
        "magnitude": ["h","l","hh","hhh"]
    },
    "cbp": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["h", "hh", "l"]
    },
    "sum_bp": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p"]
    },
    "glucose": {
        "gender": ["fe", "ma"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["h", "hh", "l"]
    },
    "hemoglobin": {
        "gender": ["fe", "npw", "pw"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["h", "hh", "l"]
    },
    "obese": {
        "gender": ["fe"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p"]
    },
    "overweight": {
        "gender": ["fe"],
        "region": ["all", "ru", "ur"],
        "magnitude": ["p"]
    }
}

var globalVariablePresent = {};

var dropDownDisease = {
    
}

var dropDownCondition = {
    "bmi" : "BMI",
    "hemoglobin": "Hemoglobin",
    "glucose" : "Glucose",
    "bp" : "Blood Pressure",
    "cbp" : "Cuff BP",
    "cancer" : "Cancer",
    "asthma" : "Asthma",
    "diabetes" : "Diabetes",
    "thyroid" : "Thyroid",
    "heart" : "Heart"
};

var districtCollection = ["Kupwara","Badgam","Leh (ladakh)","Kargil","Punch","Rajouri","Kathua","Baramula","Bandipora","Srinagar","Ganderbal","Pulwama","Shopian","Anantnag","Kulgam","Doda","Ramban","Kishtwar","Udhampur","Reasi","Jammu","Samba","Chamba","Kangra","Lahul Spiti","Kullu","Mandi","Hamirpur","Una","Bilaspur","Solan","Sirmaur","Shimla","Kinnaur","Gurdaspur","Kapurthala","Jalandhar","Hoshiarpur","Fatehgarh Sahib","Ludhiana","Moga","Firoszpur","Muktsar","Faridkot","Bathinda","Mansa","Patiala","Amritsar","Tarn Taran","Rupnagar","Sahibzada Ajit Singh Nagar","Sangrur","Barnala","Chandigarh","Uttarkashi","Chamoli","Rudraprayag","Tehri Garhwal","Dehradun","Garhwal","Pithoragarh","Bageshwar","Almora","Champawat","Nainital","Udham Singh Nagar","Hardwar","Panchkula","Ambala","Yamunanagar","Kurukshetra","Kaithal","Karnal","Panipat","Sonipat","Jind","Fatehabad","Sirsa","Hisar","Bhiwani","Rohtak","Jhajjar","Mahendragarh","Rewari","Gurgaon","Mewat","Faridabad","Palwal","North West","North","North East","East","Central","West","South West","South","Ganganagar","Hanumangarh","Bikaner","Churu","Jhunjhunun","Alwar","Bharatpur","Dhaulpur","Karauli","Sawai Madhopur","Dausa","Jaipur","Sikar","Nagaur","Jodhpur","Jaisalmer","Barmer","Jalor","Sirohi","Pali","Ajmer","Tonk","Bundi","Bhilwara","Rajsamand","Dungarpur","Banswara","Chittaurgarh","Kota","Baran","Jhalawar","Udaipur","Pratapgarh","Saharanpur","Muzaffarnagar","Bijnor","Moradabad","Rampur","Jyotiba Phule Nagar","Meerut","Bagpat","Ghaziabad","Gautam Buddha Nagar","Bulandshahar","Aligarh","Mahamaya Nagar","Mathura","Agra","Firozabad","Mainpuri","Budaun","Bareilly","Pilibhit","Shahjahanpur","Kheri","Sitapur","Hardoi","Unnav","Lucknow","Rae Bareli","Farrukhabad","Kannauj","Etawah","Auraiya","Kanpur Dehat","Kanpur Nagar","Jalaun","Jhansi","Lalitpur","Hamirpur","Mahoba","Banda","Chitrakoot","Fatehpur","Pratapgarh","Kaushambi","Allahabad","Barabanki","Faizabad","Ambedkar Nagar","Sultanpur","Bahraich","Shrawasti","Balrampur","Gonda","Siddharth Nagar","Basti","Sant Kabir Nagar","Mahrajganj","Gorakhpur","Kushinagar","Deoria","Azamgarh","Maunathbhanjan","Ballia","Jaunpur","Ghazipur","Chandauli","Varanasi","Sant Ravidas Nagar","Mirzapur","Sonbhadra","Etah","Kashi Ram Nagar","Pashchim Champaran","Purba Champaran","Sheohar","Sitamarhi","Madhubani","Supaul","Araria","Kishanganj","Purnia","Katihar","Madhepura","Saharsa","Darbhanga","Muzaffarpur","Gopalganj","Siwan","Saran","Vaishali","Samastipur","Begusarai","Khagaria","Bhagalpur","Banka","Munger","Lakhisarai","Sheikhpura","Nalanda","Patna","Bhojpur","Buxar","Kaimur Bhabua","Rohtas","Aurangabad","Gaya","Nawada","Jamui","Jehanabad","Arwal","North","West","South","East","Tawang","West Kameng","East Kameng","Papum Pare","Upper Subansiri","West Siang","East Siang","Upper Siang","Changlang","Tirap","Lower Subansiri","Kurung Kumey","Dibang Valley","Lower Dibang Valley","Lohit","Anjaw","Mon","Mokokchung","Zunheboto","Wokha","Dimapur","Phek","Tuensang","Longleng","Kiphire","Kohima","Peren","Senapati","Tamenglong","Churachandpur","Bishnupur","Thoubal","Imphal West","Imphal East","Ukhrul","Chandel","Mamit","Kolasib","Aizawl","Champhai","Serchhip","Lunglei","Lawngtlai","Saiha","West Tripura","South Tripura","Dhalai","North Tripura","West Garo Hills","East Garo Hills","South Garo Hills","West Khasi Hills","Ri Bhoi","East Khasi Hills","Jaintia Hills","Kokrajhar","Dhubri","Goalpara","Barpeta","Marigaon","Nagaon","Sonitpur","Lakhimpur","Dhemaji","Tinsukia","Dibrugarh","Sibsagar","Jorhat","Golaghat","Karbi Anglong","Dima Hasao","Cachar","Karimganj","Hailakandi","Bongaigaon","Chirang","Kamrup","Kamrup Metropolitan","Nalbari","Baksa","Darrang","Udalguri","Darjiling","Jalpaiguri","Koch Bihar","Uttar Dinajpur","Dakshin Dinajpur","Maldah","Murshidabad","Birbhum","Barddhaman","Nadia","North Twenty Four Parganas","Hugli","Bankura","Puruliya","Haora","Kolkata","South Twenty Four Parganas","Paschim Medinipur","Purba Medinipur","Garhwa","Chatra","Kodarma","Giridih","Deoghar","Godda","Sahibganj","Pakaur","Dhanbad","Bokaro","Lohardaga","Purbi Singhbhum","Palamu","Latehar","Hazaribagh","Ramgarh","Dumka","Jamtara","Ranchi","Khunti","Gumla","Simdega","Pashchimi Singhbhum","Saraikela","Bargarh","Jharsuguda","Sambalpur","Deogarh","Sundargarh","Keonjhar","Mayurbhanj","Baleshwar","Bhadrak","Kendrapara","Jagatsinghpur","Cuttack","Jajapur","Dhenkanal","Anugul","Nayagarh","Khordha","Puri","Ganjam","Gajapati","Kandhamal","Baudh","Sonapur","Balangir","Nuapada","Kalahandi","Rayagada","Nabarangapur","Koraput","Malkangiri","Koriya","Surguja","Jashpur","Raigarh","Korba","Janjgir Champa","Bilaspur","Kabeerdham","Rajnandgaon","Durg","Raipur","Mahasamund","Dhamtari","Uttar Bastar Kanker","Bastar","Narayanpur","Dakshin Bastar Dantewada","Bijapur","Sheopur","Morena","Bhind","Gwalior","Datia","Shivpuri","Tikamgarh","Chhatarpur","Panna","Sagar","Damoh","Satna","Rewa","Umaria","Neemuch","Mandsaur","Ratlam","Ujjain","Shajapur","Dewas","Dhar","Indore","Khargone","Barwani","Rajgarh","Vidisha","Bhopal","Sehore","Raisen","Betul","Harda","Hoshangabad","Katni","Jabalpur","Narsinghpur","Dindori","Mandla","Chhindwada","Seoni","Balaghat","Guna","Ashok Nagar","Shahdol","Anuppur","Sidhi","SINGRAULI","Jhabua","Alirajpur","Khandwa","Burhanpur","Kachchh","Banas Kantha","Patan","Mahesana","Sabar Kantha","Gandhinagar","Ahmedabad","Surendranagar","Rajkot","Jamnagar","Porbandar","Junagadh","Amreli","Bhavnagar","Anand","Kheda","Panch Mahals","Dahod","Vadodara","Narmada","Bharuch","The Dangs","Navsari","Valsad","Surat","Tapi","Diu","Daman","Dadra and Nagar Haveli","Nandurbar","Dhule","Jalgaon","Buldana","Akola","Washim","Amravati","Wardha","Nagpur","Bhandara","Gondiya","Gadchiroli","Chandrapur","Yavatmal","Nanded","Hingoli","Parbhani","Jalna","Aurangabad","Nashik","Thane","Brihan Mumbai","NA","Raigarh","Pune","Ahmednagar","Bid","Latur","Osmanabad","Solapur","Satara","Ratnagiri","Sindhudurg","Kolhapur","Sangli","Adilabad","Nizamabad","Karimnagar","Medak","Hyderabad","Rangareddy","Mahabubnagar","Nalgonda","Warangal","Khammam","Srikakulam","Vizianagaram","Vishakapatnam","East Godavari","West Godavari","Krishna","Guntur","Prakasam","Sri Potti Sriramulu Nellore","YSR Kadapa","Kurnool","Anantapur","Chittoor","Belgaum","Bagalkote","Bijapur","Bidar","Raichur","Koppal","Gadag","Dharwad","Uttara Kannada","Haveri","Bellary","Chitradurga","Davanagere","Shimoga","Udupi","Chikmagalur","Tumkur","Bangalore","Mandya","Hassan","Dakshina Kannada","Kodagu","Mysore","Chamrajnagar","Gulbarga","Yadgir","Kolar","Chikkaballapur","Bangalore Rural","Ramanagar","North Goa","South Goa","Lakshadweep","Kasaragod","Kannur","Wayanad","Kozhikode","Malappuram","Palakkad","Thrissur","Ernakulam","Idukki","Kottayam","Alappuzha","Pathanamthitta","Kollam","Thiruvananthapuram","Thiruvallur","Chennai","Kancheepuram","Vellore","Tiruvanamalai","Viluppuram","Salem","Namakkal","Erode","The Nilgiris","Dindigul","Karur","Tiruchirappalli","Perambalur","Ariyalur","Cuddalore","Nagapattinam","Thiruvarur","Thanjavur","Pudukkottai","Sivaganga","Madurai","Theni","Virudhunagar","Ramanathapuram","Thoothukudi","Tirunelveli","Kanniyakumari","Dharmapuri","Krishnagiri","Coimbatore","Tirupur","Yanam","Pondicherry","Mahe","Karaikal","Nicobar","North and Middle Andaman","South Andaman","India"];

var stateCollection = ["Jammu & Kashmir","Himachal Pradesh","Punjab","Chandigarh","Uttarakhand","Haryana","Delhi","Rajasthan","Uttar Pradesh","Bihar","Sikkim","Arunachal Pradesh","Nagaland","Manipur","Mizoram","Tripura","Meghalaya","Assam","West Bengal","Jharkhand","Odisha","Chhattisgarh","Madhya Pradesh","Gujarat","Daman & Diu","Dadra & Nagar Haveli","Maharashtra","NA","Telangana","Andhra Pradesh","Karnataka","Goa","Lakshadweep","Kerala","Tamil Nadu","Puducherry","A & N Islands","India"];

var plotSpecificDist = {};

function getDist(district){
    console.log("This is selected : "+district);
    plotSpecificDist.selctedDistrict(district);
}

function getState(state){
    console.log("This is selected : "+state);
    plotSpecificDist.selectedState(state);
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
    HMISTable : 0,
    //Table for district level condition file
    CONDITION_D : 0,
    //Table for state level condition file
    CONDITION_S : 0,
    //Table for nation level condition file
    CONDITION_N : 0,
    //Table for district level income file
    INCOME_D : 0,
    //Table for state level income file
    INCOME_S : 0,
    //Table for nation level income file
    INCOME_N : 0,
    //Table for state level disease file
    DISEASE_S : 0,
    //Table for nation level disease file
    DISEASE_N : 0
    
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



/*$("#purchase").on('click',function(){
    window.location.href = "../webProduct/pricing.text?"+(window.location.search).substring(1);
})*/

var mySelectedVar;

var NFHS_DICTIONARY;

//Creating and loading the dropdown for the NFHS category 
var data, rowObject, list = "" , list2 = "";
/*d3.csv('./assets/data/nfhs/nfhsdictionary.csv',function(err,data){
    var sample = "";
    if(err){
    } 
    else{
       //console.log("NFHS Data : ",data);
        NFHS_DICTIONARY = data;
        //console.log(NFHS_DICTIONARY)

        for(var prop in dropDownDisease){
            if(dropDownDisease.hasOwnProperty(prop)){
                list   += '<li >'
                            + '<a id="'+ prop +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+nfshRegionIdentifier[prop]+"','"+ prop+"','"+ "1" +"'"+')">'
                                + dropDownDisease[prop]
                            + '</a>'    
                        + '</li>';
            }
        }
        $("#nfhs_dropdown_list_2").html(list);

        list = "";

        for(var prop in dropDownCondition){
            if(dropDownCondition.hasOwnProperty(prop)){
                list   += '<li >'
                            + '<a id="'+ prop +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+nfshRegionIdentifier[prop]+"','"+ prop+"','"+ "0" +"'"+')">'
                                + dropDownCondition[prop]
                            + '</a>'    
                        + '</li>';
            }
        }
        $("#nfhs_dropdown_list_1").html(list);
    }
});*/
    
var updatedCategoryPlot = "";
    
var nfshRegionIdentifier = { 
    ad_bp : "D",
    asthma : "S",
    cancer : "S",
    diabetes : "S",
    heart : "S",
    thyroid : "S",
    bp : "D",
    bmi : "D",
    cbp : "D",
    sum_bp : "D",
    glucose : "D",
    hemoglobin : "D",
    obese : "D",
    overweight : "D"
};
    
var nfshCategoryIdentifier = { 
  bmi: [ 'ur', 'fe', 'ru' ,'all_region'],
  hemoglobin: [ 'ur','fe','pw','ru', 'npw' , 'all_mat' , 'all_region'], 
  glucose: [ 'fe', 'ur', 'ru', 'ma', 'all_gender' , 'all_region'],
  bp: [ 'ur', 'fe', 'ma', 'ru' ,'all_gender' , 'all_region'],
  cbp: [  'fe', 'ur', 'ma', 'ru' ,'all_gender' , 'all_region'],
  cancer: [ 'fe', 'ur', 'ma', 'ur'  ,'all_gender' , 'all_region'],
  asthma: [ 'fe', 'ur', 'ma', 'ur','all_gender' , 'all_region' ],
  thyroid: [ 'fe', 'ur', 'ma', 'ur' ,'all_gender' , 'all_region'],
  diabetes : ['fe','ma','ru','ur','all_gender' , 'all_region'],
  heart: [ 'fe', 'ur', 'ma', 'ur' ,'all_gender' , 'all_region'],
  sum_bp: ['fe', 'ur', 'ma', 'ru' ,'all_gender' , 'all_region'],
  ad_bp: [ 'fe', 'ur', 'ma', 'ru' ,'all_gender' , 'all_region'] 
};
    
$(".NFHS_CONDITION_DROPDOWN_SELECT").on('click',function(){
    
    //Also change the radio selection
    $("#nfhs_cond").attr("checked",false);
    $("#nfhs_inc").attr("checked",true);
    
    console.log( $(this).attr('id') );
    console.log( $(this).attr('name') );
    console.log( nfshRegionIdentifier[$(this).attr('id')] );
    plotDynamiCPlot( nfshRegionIdentifier[$(this).attr('id')] , $(this).attr('id') , $(this).attr('name'))
})
$(".NFHS_DISEASE_DROPDOWN_SELECT").on('click',function(){
    
    //Also change the radio selection
    $("#nfhs_cond").attr("checked",true);
    $("#nfhs_inc").attr("checked",false);
    
    console.log( $(this).attr('id') );
    console.log( $(this).attr('name') );
    plotDynamiCPlot( nfshRegionIdentifier[$(this).attr('id')] , $(this).attr('id') , $(this).attr('name'))
})

//Change the header to smart search option
$("#main-head-box").on('click',function(){
    if(conditionPriorityMap == 1 ){
        $("#main-head-box").hide();
        $("#state_district_selection_box").show();
        $("#district_smart_search").val("");
        
        if( nfhsDiseaseIdetifier == "DISEASE"  ){
           $("#district_smart_search").attr("placeholder","Enter state name...");
        }else{
           $("#district_smart_search").attr("placeholder","Enter district name...");
        }
    }
})
$("#alternate_state_select").on('click',function(){
    if(conditionPriorityMap == 1 ){
        $("#main-head-box").hide();
        $("#state_district_selection_box").show();
        $("#district_smart_search").val("");

        if( nfhsDiseaseIdetifier == "DISEASE"  ){
           $("#district_smart_search").attr("placeholder","Enter state name...");
        }else{
           $("#district_smart_search").attr("placeholder","Enter district name...");
        }
    }
})
$("#alternate_header_select").on('click',function(){
    $("#main-head-box").show();
    $("#state_district_selection_box").hide();
})
    
//Defining the magnitude based change in the variable
$(".MAGNITUDE_HEADER").on('click',function(){
           $("#nfhs_map_legend").hide();
           $("#nfhs_info_box_legend").hide();
            var newPlotVar = "";
            if($(this).attr('value') == 1){
                if( globalVariablePresent.low != undefined ){
                    newPlotVar = globalVariablePresent.low;
                }else{
                    newPlotVar = globalVariablePresent.present;
                }
            }else if($(this).attr('value') == 2){
                if( globalVariablePresent.healthy != undefined ){
                    newPlotVar = globalVariablePresent.healthy;
                }else{
                    newPlotVar = globalVariablePresent.dont_know;
                }   
            }else if($(this).attr('value') == 3){
                if( globalVariablePresent.high != undefined ){
                    newPlotVar = globalVariablePresent.high;
                }else{
                    newPlotVar = globalVariablePresent.treated;
                }   
            }else if($(this).attr('value') == 4){
                newPlotVar = globalVariablePresent.elevated;
            }else if($(this).attr('value') == 5){
               newPlotVar = globalVariablePresent.severe;
            }
            //Now begin the plotting of the file
            currentCategoryPlot = newPlotVar;
            console.log( "Check this iteration ",newPlotVar );
        
            //This will initiate the loader before the map comes
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#chart-area").hide();
            $("#loader_screen").show();
            setTimeout(function(){
                function_container.categoryselect(currentStatePlot, currentCategoryPlot);
            },
            500);
});
    
// Function :: This is to disable the radio options that are not availble
// BUG :: This function is working but on hover it does on show the 
function disableUnavailableOpt(selection){
    
    console.log("Selection  Identified : " + selection );
    catArr.forEach(function(d){
        
        if( nfshCategoryIdentifier[selection].indexOf( d ) != -1 ){
            $("#"+d).prop("disbaled",false);
        }else{
            $("#"+d).prop("disbaled",true);
        }
    })
  
}


// This is main function call to plot the NFHS variables
// The default plots that need to be taken are
// Gender : Female
// Region : All if available else Rural
// Maternity : Pregnant 
function plotDynamiCPlot(state, cat , diseaseFlag){
    
    //Define the selection of the nfhs variable
    nfhsPlotEnable = 1;

    console.log("Selected State : " + state);
    console.log("Selected Category : " + cat);
    console.log("Selected Type : " + diseaseFlag);
    
    //This to keep the main category intact even when the magnitude changes
    // Eg. for h_glucose_all_ma : the mainCategoryIdentifier = glucose
    mainCategoryIdentifier = cat;

    //Prevent the radio selection based on the mainCategoryIdentifeir
    disableUnavailableOpt(cat);
    
    currentCategoryPlot = cat;
    
    /* Preparing the variable */
    /**************************/
    
    //Set region
    if( nfhsPropertyDescription[cat].region.indexOf("all") != -1 ){
        currentCategoryPlot = currentCategoryPlot+"_"+"all";
    }else{
        currentCategoryPlot = currentCategoryPlot+"_"+nfhsPropertyDescription[cat].region[0];
    }
    
    console.log("Category with region : "+currentCategoryPlot);
    
    //Set gender 
    if( nfhsPropertyDescription[cat].gender.indexOf("ma") != -1 ){
        currentCategoryPlot = currentCategoryPlot+"_"+"ma";
    }else{
        currentCategoryPlot = currentCategoryPlot+"_"+nfhsPropertyDescription[cat].gender[0];
    }
    
    console.log("Category with Gender : "+currentCategoryPlot);
    
    //Set magnitude
    currentCategoryPlot = nfhsPropertyDescription[cat].magnitude[0] +"_" +currentCategoryPlot;
    console.log("Category with Gender : "+currentCategoryPlot);
    
    //Check if pregnant and Non Pregnant options are available
    if( nfhsPropertyDescription[cat].gender.indexOf("pw") != -1 ){
        $("#maternity_select").show();
        $("#gender_select").hide();
    }else{
        $("#maternity_select").hide();
        $("#gender_select").show();
    }
    
    /* Preparing the Selection category */
    /************************************/
    
    //Showing the radio selection tabs on top
    $("#index_tabs").hide();
    $("#non_index_tabs").hide();
    if( nfhsPlotEnable == 1){
        $("#nfhs_selection").show();
    }
    
    //Changing the information box on the right
    $("#tooltip-area").hide();
    $("#nfhs_sunburst").show();
    
    //Defining the plot region
    if( state == "D" ){
        currentStatePlot = "India";
    }else if( state == "S" ){
        currentStatePlot = "India_state";
    }
    
    //Set Disease identifier 
    nfhsDiseaseIdetifier = diseaseFlag;
    console.log(currentCategoryPlot);
    
    //Once currentCategoryPlot prepared now show the radio selection for selected one
    var categoryPlotSampleArry = currentCategoryPlot.split("_");
    catArr.forEach(function(d){
        if( categoryPlotSampleArry.indexOf( d ) != -1){
            $("#"+d).prop("checked",true);
        }else{
            $("#"+d).prop("checked",false);
        }
    })
    
    if( categoryPlotSampleArry[2] == 'all' ){
        $("#all_region").prop("checked",true);
    }else{
        $("#"+categoryPlotSampleArry[2]).prop("checked",true);
    }
    
    if( categoryPlotSampleArry[3] == 'all' ){
        $("#all_gender").prop("checked",true);
    }else{
        $("#"+categoryPlotSampleArry[3]).prop("checked",true);
    }
    
    //Now begin the plotting of the file
    function_container.categoryselect(currentStatePlot, currentCategoryPlot);
}


// Function : This is to change the maps based on radio selection
// Bugs : No Yet working properly
$(".NFHS_RADIO_SELECT").on('click',function(){
    var sampleName = "";
    var sampleArr = [];
    
    //Hide all the legends
    $("#nfhs_map_legend").hide();
    $("#nfhs_info_box_legend").hide();
    
    //If radio select is region
    if( $(this).attr("name") == "region"){
        
        console.log( $(this).attr("value") );
        
        if( nfhsPropertyDescription[mainCategoryIdentifier].region.indexOf( $(this).attr("value") ) != -1 ){
            
            sampleArr = currentCategoryPlot.split("_");
            sampleArr[ sampleArr.length - 2 ] = $(this).attr("value");
            
            for( var  i = 0 ; i < sampleArr.length ; i++ ){
                sampleName += sampleArr[i]+"_";
            }
            
            currentCategoryPlot = sampleName.substring(0, sampleName.length-1);
            console.log(currentCategoryPlot);
            
            //Now begin the plotting of the file
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#chart-area").hide();
            $("#loader_screen").show();
            setTimeout(function(){
                function_container.categoryselect(currentStatePlot, currentCategoryPlot);
            },
            500);
            
        }else{
            //Hide all the legends
            $("#nfhs_map_legend").show();
            $("#nfhs_info_box_legend").show();
            console.log($(this).attr("value") +" is not available for " + mainCategoryIdentifier);
            $("#snackbar").addClass('show');
            $("#snackbar").text( $(this).attr("text") +" is not available for " + dropDownCondition[mainCategoryIdentifier] );
            setTimeout(function(){  $("#snackbar").removeClass('show');   }, 3000);
        }
        
    }else if( $(this).attr("name") == "gender" ){
             
       //console.log( $(this).attr("id") );
        
        if( nfhsPropertyDescription[mainCategoryIdentifier].gender.indexOf( $(this).attr("value") ) != -1 ){
            
            sampleArr = currentCategoryPlot.split("_");
            sampleArr[ sampleArr.length - 1 ] = $(this).attr("value");
            
            for( var  i = 0 ; i < sampleArr.length ; i++ ){
                sampleName += sampleArr[i]+"_";
            }
            
            currentCategoryPlot = sampleName.substring(0, sampleName.length-1);
            console.log(currentCategoryPlot);
            
            //Now begin the plotting of the file
            //Now begin the plotting of the file
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#chart-area").hide();
            $("#loader_screen").show();
            setTimeout(function(){
                function_container.categoryselect(currentStatePlot, currentCategoryPlot);
            },
            500);
            
        }else{
            
            $("#nfhs_map_legend").show();
            $("#nfhs_info_box_legend").show();
            
            //Change the checkbox
            $("#"+$(this).attr("value")).prop('checked',false);
            $("#"+currentCategoryPlot.split("_")[3]).prop('checked',true);
            //Show message for non availability
            console.log($(this).attr("value") +" is not available for " + mainCategoryIdentifier);
            $("#snackbar").addClass('show');
            $("#snackbar").text( $(this).attr("text") +" is not available for " + dropDownCondition[mainCategoryIdentifier] );
            setTimeout(function(){  $("#snackbar").removeClass('show');   }, 3000);
        }
        
        
    }else if( $(this).attr("name") == "maternity" ){
        
         if( nfhsPropertyDescription[mainCategoryIdentifier].gender.indexOf( $(this).attr("value") ) != -1 ){
            
            sampleArr = currentCategoryPlot.split("_");
            sampleArr[ sampleArr.length - 1 ] = $(this).attr("value");
            
            for( var  i = 0 ; i < sampleArr.length ; i++ ){
                sampleName += sampleArr[i]+"_";
            }
            
            currentCategoryPlot = sampleName.substring(0, sampleName.length-1);
            console.log(currentCategoryPlot);
             
            //Now begin the plotting of the file
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#chart-area").hide();
            $("#loader_screen").show();
            setTimeout(function(){
                function_container.categoryselect(currentStatePlot, currentCategoryPlot);
            },
            500);
        }else{
            
            $("#nfhs_map_legend").show();
            $("#nfhs_info_box_legend").show();
            
            //Change the checkbox
            //Show message for non availability
            console.log($(this).attr("value") +" is not available for " + mainCategoryIdentifier);$("#snackbar").addClass('show');
            $("#snackbar").text( $(this).attr("text") +" is not available for " + dropDownCondition[mainCategoryIdentifier] );
            setTimeout(function(){  $("#snackbar").removeClass('show');   }, 3000);
        }
        
    }else if( $(this).attr("name") == "division" ){
          conditionPriorityMap = $(this).attr("value");
        
          if( $(this).attr("value") == "0" && currentStatePlot == "India_state"){
              
             //console.log("Income distribution is not available for diseases");
             $("#snackbar").addClass('show');
             $("#snackbar").text( "Income distribution is not available for diseases" );
             setTimeout(function(){  $("#snackbar").removeClass('show');   }, 3000);
              
             conditionPriorityMap = 1;
             $("#nfhs_cond").prop("checked",true);
             $("#nfhs_inc").prop("checked",false);
              
          }else{
              
            $("#nfhs_map_legend").show();
            $("#nfhs_info_box_legend").show();
              
            //Now begin the plotting of the file
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#chart-area").hide();
            $("#loader_screen").show();
            setTimeout(function(){
                function_container.categoryselect(currentStatePlot, currentCategoryPlot);
            },
            500);
          }
    }
    
})
    
/*$("#ma").on('click',function(){
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
    
});
    
$("#ur").on('click',function(){
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already There!!!")
    }else{
        updatedCategoryPlot = currentCategoryPlot.replace("ru","ur");
        console.log(updatedCategoryPlot);
    }
    
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
});*/
    
/*$(".NFSH_CHECKBOX").on('click',function(){
    console.log(currentCategoryPlot);
    if(currentCategoryPlot.indexOf( $(this).attr('id') ) != -1){
        console.log("Already plotted ");
    }
    
    console.log($(this).attr('id'));
}) */

//***************************NFHS Smart Search********************************/
$("#selection_done").on('click',function(){
    
    /*if(PlotCategory[updatedCategoryPlot] == undefined){
        console.log("Not Avaiable");
        updatedCategoryPlot = currentCategoryPlot;
        plotDynamiCPlot(currentStatePlot, currentCategoryPlot);
    }else{
        currentCategoryPlot = updatedCategoryPlot;
        plotDynamiCPlot(currentStatePlot, currentCategoryPlot);
    }*/
    //plotDynamiCPlot("India", currentCategoryPlot , null)
    function_container.categoryselect(currentStatePlot, currentCategoryPlot);
})
$("#search_nfhs_ad").on('keyup',function(){
    list = "";
    var filter = $(this).val().toUpperCase();
    console.log(filter);
    for( var prop in dropDownCondition){
        if( dropDownCondition.hasOwnProperty(prop) ){
            if( dropDownCondition[prop].toUpperCase().indexOf( filter ) != -1 ){
                 list     += '<li>'
                                + '<a id="'+ prop +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+"India"+"','"+ prop+ "'"+')">'
                                    + dropDownCondition[prop]
                                + '</a>'    
                            + '</li>';
            }
        }
    }
    $("#nfhs_dropdown_list_1").html(list);
})
$("#search_nfhs_d").on('keyup',function(){
    list = "";
    var filter = $(this).val().toUpperCase();
    console.log(filter);
    for( var prop in dropDownDisease){
        if( dropDownDisease.hasOwnProperty(prop) ){
            if( dropDownDisease[prop].toUpperCase().indexOf( filter ) != -1 ){
                 list     += '<li>'
                                + '<a id="'+ prop +'" style="text-decoration:none;" onclick="plotDynamiCPlot('+"'"+"India"+"','"+ prop+ "'"+')">'
                                    + dropDownDisease[prop]
                                + '</a>'    
                            + '</li>';
            }
        }
    }
    $("#nfhs_dropdown_list_2").html(list);
})

//***************************NFHS Smart Search********************************/
    
//Hover functonality on "State" dropdowns
$("#StateDrop").on('mouseover',function(){
   
    $(this).trigger('click')
})

//Get PlotVar
var PlotCategory = {
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
//Load the plot vars from the NFHS
d3.json('./analysis/nfhs2Sample.json',function(err,data){
    if(err){
        console.log(err);
    } 
    else{
       for( var prop in data ){
        if( data.hasOwnProperty(prop) ){
            PlotCategory[ prop ] = data[prop];
        }
       }
       console.log("Updated PotCat : ", PlotCategory);
    }
});

//Load the plot vars definition from the NFHS
d3.json('./analysis/nfhsSample.json',function(err,data){
    if(err){
        console.log(err);
    } 
    else{
       for( var prop in data ){
        if( data.hasOwnProperty(prop) ){
            plotVarDef[ prop ] = data[prop];
        }
       }
       console.log("Updated PlotDef : ", plotVarDef);
    }
});

//To show the tabs on category nav and switch when the Index comes
//$("#non_index_tabs").show();

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
            nfhsPlotEnable = 0;
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
            nfhsPlotEnable = 0;
            $("#nfhs_selection").hide();
            
             $("#tooltip-area").show();
             $("#nfhs_sunburst").hide();
            
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
            
            if(nfhsPlotEnable == 1 ){
                 $("#tooltip-area").hide();
                 $("#nfhs_sunburst").show();
            }
            
            createState(currentStatePlot,currentCategoryPlot); 
           
        }
      
        function_container.categoryselect = function(state,category){
            categoryDropDownSelect(state,category);
        }
    
        $(".SUB_CATEGORY_DROPDOWN_SELECT").on('click',function(){
            nfhsPlotEnable = 0;
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
           if( d != undefined ){
                var obj = {
                    "data_var" : d.v
                }
                apiVAR.push(obj)
           }
        })
        console.log( " Check API : " ,apiVAR);
            
        //Plotting the dynamic legend
            
            /*var w = 250, h = 50;
            
            $("#cont_legend_head").html("");
            
            console.log("Check axis : ",d3);
            
            var key = d3.select("#India-district-chart-area")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              //.attr("margin-left", 50);

            var legend = key.append("defs")
              .append("svg:linearGradient")
              .attr("id", "gradient")
              .attr("x1", "0%")
              .attr("y1", "100%")
              .attr("x2", "100%")
              .attr("y2", "100%")
              .attr("spreadMethod", "pad");

            legend.append("stop")
              .attr("offset", "0%")
              .attr("stop-color", "#f7fcf0")
              .attr("stop-opacity", 1);

            legend.append("stop")
              .attr("offset", "33%")
              .attr("stop-color", "#bae4bc")
              .attr("stop-opacity", 1);

            legend.append("stop")
              .attr("offset", "66%")
              .attr("stop-color", "#7bccc4")
              .attr("stop-opacity", 1);

            legend.append("stop")
              .attr("offset", "100%")
              .attr("stop-color", "#084081")
              .attr("stop-opacity", 1);

            key.append("rect")
              .attr("width", w)
              .attr("height", h - 30)
              .style("fill", "url(#gradient)")
              .attr("transform", "translate(0,10)");

            var y = d3.scale.linear()
              .range([300, 0])
              .domain([68, 12]);

            var yAxis = d3.svg.axis().scale(y)
                        .orient("left").ticks(5);

            key.append("g")
              .attr("class", "y axis")
              .attr("transform", "translate(0,30)")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("axis title");*/
        
        //---------------------------
        
        // NFHS COLLECTION VARIABLE :: Initiate Datafile collection
        var tableTYPE = "" , tableTYPENation = "" , tableINCOME = "" , tableINCOMENation = "" ;
        var sqlTYPE = "" , sqlTYPENation = "" , sqlINCOME = "" , sqlINCOMENation = "" ;
        var dataTYPE = "" , dataTYPENation = "" , dataINCOME = "" , dataINCOMENation = "" ;
            
        plotVar = PlotCategory[categoryCall].plotVar;
            
        if( PlotCategory[categoryCall].plotType == "nfhs_percent" ){
            
            console.log(" NFHS Rounting done right!!! ");
            if( stateNameCall == "India_state" ){
                console.log(" Getting states map ");
                //Asynchronous download of the data :: District TopoJson ; APICallData 
                d3.json('./assets/geojson/indianewmaptopo.json',function(error,data){
                    
                    STATEDistrictTopo = data;
                    callReady();
                })
                
            }else if( stateNameCall == "India" ){
                console.log(" Getting district map ");
                d3.json('./assets/geojson/2011_dist_topojson.json',function(error,data){
                    STATEDistrictTopo = data;
                    callReady();
                })
            }
            
        }else if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
           
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
        if( PlotCategory[categoryCall].plotType == "nfhs_percent" ){
            
            //Here 3 tyope of files need to be collected 
            // 1). Collect the Data file for all the magnitude possible
            // 2). Collect the income district/state file for all the magnitude possible
            // 3). Collect the nation files for all the magnitude data
            
            var checkDataCollect = 0
            
            console.log("NFHS Data Collection initiated ");
            
            //Function :  To get all the magnitude values for the selecetd catgory
            //BUG : 3 more categories are getting added 
            nfhsPropertyDescription[mainCategoryIdentifier].magnitude.forEach(function(d,i){
            
                    sampleName = "";
                    sampleAr = categoryCall.split("_");
                
                    //To check if the names are being used without magnitude
                    sampleAr[0] = d;
                    for( var i=0;i<sampleAr.length ;i++ ){
                        sampleName += sampleAr[i]+"_";
                    }
                    if( sampleName.substr(0,sampleName.length-1) != currentCategoryPlot ){
                         apiVAR.push( {data_var: sampleName.substr(0,sampleName.length-1)} );
                    }
            })
            
            console.log("Collected Magnitude Data: ",apiVAR);
           
            if( nfhsDiseaseIdetifier == "CONDITION" &&  stateNameCall == "India"){
                
                tableTYPE = "CONDITION_D";
                tableTYPENation = "CONDITION_N";
                tableINCOME = "INCOME_D";
                tableINCOMENation = "INCOME_N";
                
            }else if(nfhsDiseaseIdetifier == "CONDITION" &&  stateNameCall == "India_state"){
                
                tableTYPE = "CONDITION_S";
                tableTYPENation = "CONDITION_N";
                tableINCOME = "INCOME_S";
                tableINCOMENation = "INCOME_N";
                
            }else if(nfhsDiseaseIdetifier == "DISEASE" &&  stateNameCall == "India_state"){
                
                tableTYPE = "DISEASE_S";
                tableTYPENation = "DISEASE_N";
                tableINCOME = "INCOME_S";
                tableINCOMENation = "INCOME_N";
                
            }else if(nfhsDiseaseIdetifier == "DISEASE" &&  stateNameCall == "India"){
                
                tableTYPE = "DISEASE_N";
                tableTYPENation = "DISEASE_N";
                tableINCOME = "INCOME_N";
                tableINCOMENation = "INCOME_N";
                
            }
            
            //Defining Tables calls
            
            //For Local Disease/Condition
            if(tableCheck[tableTYPE] == 0){
                  tableCheck[tableTYPE] = 1;
                  sqlTYPE = 'CREATE TABLE IF NOT EXISTS '+tableTYPE+' ; SELECT * INTO '+tableTYPE+' FROM CSV("assets/data/nfhsAssets/'+tableTYPE+'.csv")';
            }else{
              sqlTYPE = 'CREATE TABLE IF NOT EXISTS '+ tableTYPE +';';
            }

            //For Nation Disease/Condition
            if(tableCheck[tableTYPENation] == 0){
                  tableCheck[tableTYPENation] = 1;
                  sqlTYPENation = 'CREATE TABLE IF NOT EXISTS '+ tableTYPENation +'; SELECT * INTO '+ tableTYPENation +' FROM CSV("assets/data/nfhsAssets/'+ tableTYPENation +'.csv")';
            }else{
              sqlTYPENation = 'CREATE TABLE IF NOT EXISTS '+ tableTYPENation +';';
            }

            //For Local Income
            if(tableCheck[tableINCOME] == 0){
                  tableCheck[tableINCOME] = 1;
                  sqlINCOME = 'CREATE TABLE IF NOT EXISTS ' + tableINCOME + '; SELECT * INTO ' + tableINCOME + ' FROM CSV("assets/data/nfhsAssets/' + tableINCOME + '.csv")';
            }else{
              sqlINCOME = 'CREATE TABLE IF NOT EXISTS ' + tableINCOME + ';';
            }

            //For Nation income
            if(tableCheck[tableINCOMENation] == 0){
                  tableCheck[tableINCOMENation] = 1;
                  sqlINCOMENation = 'CREATE TABLE IF NOT EXISTS '+tableINCOMENation+'; SELECT * INTO '+tableINCOMENation+' FROM CSV("assets/data/nfhsAssets/'+tableINCOMENation+'.csv")';
            }else{
              sqlINCOMENation = 'CREATE TABLE IF NOT EXISTS '+tableINCOMENation+';';
            }
            
            //Prepare apiVAR collection
            
            nfhsPropertyDescription[mainCategoryIdentifier].magnitude.forEach(function(d){
                var obj = {
                    "data_var" : d.v
                }
                apiVAR.push(obj)
            })
            
            console.log("Collected API Var :",apiVAR);
            
            //For Local Disease/Condition
             alasql
                  .promise(sqlTYPE)
                  .then(function(res){

                    /*Make query from apiVAR query*/
                    //Query container
                    var query = "SELECT ST_NM , ST_CEN_CD ";
                    if(stateNameCall == 'India'){
                       query = "SELECT ST_NM , ST_CEN_CD , DISTRICT , DT_CEN_CD ";
                    }

                    //Prepare the variable set
                    apiVAR.forEach(function(d){
                        if ( d.data_var != undefined ){
                            query += " , " + d.data_var;
                        } 
                    })

                    //Update the data location
                    query += " FROM "+tableTYPE;

                    //Call the next query to populate
                    alasql.promise(query).then(function(resultData){
                        
                        dataTYPE = resultData;
                        console.log("DATA COLLECTION FOR LOCAL :",dataTYPE);
                        callReady();  
                       
                    }).catch(function(err){
                        //console.log('error:', err);
                    })

              }).catch(function(err){
                   //console.log('error:', err);
              });
            
            //For Nation Disease/Condition
             alasql
                  .promise(sqlTYPENation)
                  .then(function(res){

                    /*Make query from apiVAR query*/
                    //Query container
                    var query = "SELECT nation ";
                   
                    //Prepare the variable set
                    apiVAR.forEach(function(d){
                        if ( d.data_var != undefined ){
                            query += " , " + d.data_var;
                        } 
                    })

                    //Update the data location
                    query += " FROM "+tableTYPENation;

                    //Call the next query to populate
                    alasql.promise(query).then(function(resultData){
                        
                        dataTYPENation = resultData;
                        console.log("DATA COLLECTION FOR NATION :",dataTYPENation);
                        callReady();  
                       
                    }).catch(function(err){
                        //console.log('error:', err);
                    })

              }).catch(function(err){
                   //console.log('error:', err);
              });
            
            //For Local Income/Condition
             alasql
                  .promise(sqlINCOME)
                  .then(function(res){

                    /*Make query from apiVAR query*/
                    //Query container
                    var query = "SELECT ST_NM , ST_CEN_CD ";
                    if(stateNameCall == 'India'){
                       query = "SELECT ST_NM , ST_CEN_CD , DISTRICT , DT_CEN_CD ";
                    }
                   
                    //Prepare the variable set
                    apiVAR.forEach(function(d){
                       for( var j = 1 ; j <= 5  ; j++ ){
                           if ( d.data_var != undefined ){
                                query += " , " + d.data_var + '_Q'+j+'_'+ ( stateNameCall == 'India'?'district' : 'state' )  ;
                            }
                        }
                    })

                    //Update the data location
                    query += " FROM "+tableINCOME;

                    //Call the next query to populate
                    alasql.promise(query).then(function(resultData){
                        
                        dataINCOME = resultData;
                        console.log("INCOME COLLECTION FOR LOCAL :",dataINCOME);
                        callReady();  
                       
                    }).catch(function(err){
                        //console.log('error:', err);
                    })

              }).catch(function(err){
                   //console.log('error:', err);
              });
            
              //For Nation Income/Condition
              alasql
                  .promise(sqlINCOMENation)
                  .then(function(res){

                    /*Make query from apiVAR query*/
                    //Query container
                    var query = "SELECT nation ";
                   
                    //Prepare the variable set
                    apiVAR.forEach(function(d){
                        
                        for( var j = 1 ; j <= 5  ; j++ ){
                            if ( d.data_var != undefined ){
                                query += " , " + d.data_var + '_Q'+j+'_nation';
                            }
                        }
                        
                    })

                    //Update the data location
                    query += " FROM "+tableINCOMENation;

                    //Call the next query to populate
                    alasql.promise(query).then(function(resultData){
                        
                        dataINCOMENation = resultData;
                        console.log("INCOME COLLECTION FOR NATION :",dataINCOMENation);
                        callReady();  
                       
                    }).catch(function(err){
                        //console.log('error:', err);
                    })

              }).catch(function(err){
                   //console.log('error:', err);
              });
            
        }else if( PlotCategory[categoryCall].plotType == "QUALITY_INDEX" ){
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
            
        }
       
        
        /*This function was created to ensure that only when TopoJSON (cordinates for map plot) and PlotData(API call) has been downloaded
          The Plotting functions will be called as both of the above are asynchronous*/
           
        function callReady(){
            
            if( PlotCategory[categoryCall].plotType == "nfhs_percent" ){
                
                if( dataTYPE != "" && dataTYPENation != "" && dataINCOME != "" && dataINCOMENation != "" && STATEDistrictTopo!=null){
                      if(canvas) canvas.remove();
                      
                        
                      PlotNFHSPlots(STATEDistrictTopo,stateAPIData,dataTYPE,dataTYPENation,dataINCOME,dataINCOMENation); 
                }
                
            }else if(stateAPIData!=null && STATEDistrictTopo!=null){
                if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY" || stateNameCall == 'India_state' ||       PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){
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
            $("#backdrop-image").hide();  
            $("#chart-area").show();
             
            
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
            
    function PlotNFHSPlots(STATEDistrictTopo,stateAPIData,dataTYPE,dataTYPENation,dataINCOME,dataINCOMENation){
        
           console.log(" NFHS data download setup !!! ");
           $("#non_index_tabs").hide();
        
           $("#nfhs_quartile_legend").show();
            
           /*QuickFix : To adjust the margin between map and legends for StateWise and IndiaWise map*/
           d3.select("#leg_id").style('margin-top','0');
        
         
           // $("#nfhs_legend_1").remove();
          
           //Now here the local and national level data needs to be added into the topojson files
        
           var TotalRuralPop = 0, TotalRuralTribalPop = 0,TotalUrbanPopulation = 0,Total = 0, Desired = 0,TotalInfoVillage = 0,TotalPopulation = 0;
        
            var count = 0;
        
           //Variables for data filling
           var STATEDistrict,dataValue;
        
           //Getting the quartile values
           var quartileDataLocal = []; 
           //var quartileDataNation = []; 
           var quartileValuesLocal = []; 
           //var quartileValueNation = []; 
            
           MainHeading.text("Generating India Map ... ")
          
           //Consolidating the STATE data in one file
     
           //if( IndiaDistrictOutlineMap == null){
        
            console.log("REGION TYPE : ", currentStatePlot );
           
            if(stateNameCall == "India"){
                
                    $("#India-district-chart-area").hide();
                    $("#India-state-chart-area").hide();
                    $("#chart-area").show();
                    $("#backdrop-image").hide();
                
                STATEDistrictTopo.objects['2011_Dist'].geometries.forEach(function(d,i){
                 
                        STATEDistrict = d.properties.DISTRICT;

                        dataTYPE.forEach(function(d2){
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

                                        if(d2[currentCategoryPlot] != 'NA'  ){
                                            quartileDataLocal.push( d2[currentCategoryPlot] );
                                        }
                                        
                                        apiVAR.forEach(function(pv){
                                            prop = pv.data_var;
                                            d.properties[prop] = d2[prop];
                                        })

                                }
                        })
                    
                       dataINCOME.forEach(function(d2){
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

                                        /*apiVAR.forEach(function(pv){
                                            prop = pv.data_var;
                                            d.properties[prop] = d2[prop];
                                            
                                        })*/
                                        var dataVar = "";
                                        apiVAR.forEach(function(d4){
                                           for( var j = 1 ; j <= 5  ; j++ ){
                                               if ( d4.data_var != undefined ){
                                                    dataVar = d4.data_var + '_Q'+j+'_'+ ( stateNameCall == 'India'?'district' : 'state' );
                                                    d.properties[dataVar] = d2[dataVar];
                                                }
                                            }
                                        })
                                }
                        })
                    
                })
                
            }else if(stateNameCall == "India_state"){
                
                      /*if(stateNameCall == 'India'){
                           
                      }else{
                            
                      }*/
                
                    $("#India-district-chart-area").hide();
                    $("#India-state-chart-area").show();
                    $("#chart-area").hide();
                    $("#backdrop-image").hide();
                
                
                console.log("STATE MAP : ",STATEDistrictTopo.objects.Admin2.geometries);
                
                STATEDistrictTopo.objects.Admin2.geometries.forEach(function(d,i){

                     dataTYPE.forEach(function(d2,i)
                      {
                         if(StateCodeObject[d.properties.ST_NM] == d2.ST_CEN_CD)
                         {
                             
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

                                if(d2[currentCategoryPlot] != 'NA'  ){
                                    quartileDataLocal.push( d2[currentCategoryPlot] );
                                }
                             
                                apiVAR.forEach(function(pv){
                                    prop = pv.data_var;
                                    d.properties[prop] = d2[prop];
                                })
                             
                         }

                      })
                    
                      dataINCOME.forEach(function(d2){
                            if(StateCodeObject[d.properties.ST_NM] == d2.ST_CEN_CD)
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

                                        /*apiVAR.forEach(function(pv){
                                            prop = pv.data_var;
                                            d.properties[prop] = d2[prop];
                                            
                                        })*/
                                        var dataVar = "";
                                        apiVAR.forEach(function(d4){
                                           for( var j = 1 ; j <= 5  ; j++ ){
                                               if ( d4.data_var != undefined ){
                                                    dataVar = d4.data_var + '_Q'+j+'_'+ ( stateNameCall == 'India'?'district' : 'state' );
                                                    d.properties[dataVar] = d2[dataVar];
                                                }
                                            }
                                        })
                                }
                        })

                })
                
            } 
             
               
           /*}else{
               
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
                                    
                                }
                        })
                
                })
               
           }*/
        
           console.log("NFHS UPDATED MAP : ",STATEDistrictTopo); 
           //$("#DENOMINATOR").text(PlotCategory[categoryCall].denom_head)
           //$("#NUMERATOR").text(PlotCategory[categoryCall].num_head)
        
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
        
        
        
        
        if(stateNameCall == "India"){
            //Changes to implement
            //1). 
            //2). Information Box visibility to change.
            //3). Map to change accordingly
            //4). Information Box legend to change 
            //5). Map legend to change
            if(conditionPriorityMap == 1 ){
                //Map Change
                dynamicPlotPercentage();
                $("#quintile_container").hide();
                $("#sunburst").show();
                $("#nfhs_health_legend").hide();
                $("#nfhs_quartile_legend").show();
                $("#legend_Header").show();
                $("#nfhs_legend_1").show();

            }else{
                //Map Change
                dynamicPlotQuintilePercentage();
                $("#quintile_container").show();
                $("#sunburst").hide();
                $("#nfhs_health_legend").show();
                $("#nfhs_quartile_legend").hide();
                $("#legend_Header").hide();
                $("#nfhs_legend_1").hide();
            }
        }else if(stateNameCall == "India_state"){
            //dynamicPlotPercentageStates();
            dynamicPlotINDIA_Comp();
            $("#quintile_container").hide();
            $("#sunburst").show();
            $("#nfhs_health_legend").hide();
            $("#nfhs_quartile_legend").show();
            $("#legend_Header").show();
            $("#nfhs_legend_1").show();
            
        }
        
        //this check if the map has been enabled
        var checkEnabled = 0;
        
        var magnitudeVariation = {
            low : 1,
            healthy : 2,
            high : 3,
            elevated : 4,
            sereve : 5,
            present : 1,
            dont_know : 2,
            treated : 3
        }
        /*var magnitudeVariation = {
            low : 1,
            healthy : 2,
            high : 3,
            elevated : 4,
            sereve : 5,
            present : 3,
            dont_know : 1,
            treated : 2
        }*/
        var namingVar = {
            low : "Low",
            healthy : "Healthy",
            high : "Healthy",
            elevated : "Elevated",
            sereve : "Severe",
            present : "Present",
            dont_know : "Don't Know",
            treated : "Treated"
        }
        
        //This will hide the loader screen when map is ready to be plotted
        $("#loader_screen").hide();
        
        function quartileBounds(_sample){
            // find the median as you did
            var _median = math.median(_sample)

            // split the data by the median
            var _firstHalf = _sample.filter(function(f){ return f < _median })
            var _secondHalf = _sample.filter(function(f){ return f >= _median })

            // find the medians for each split
            var _25percent = math.median(_firstHalf);
            var _75percent = math.median(_secondHalf);

            var _50percent = _median;
            var _100percent = math.max(_secondHalf);

            // this will be the upper bounds for each quartile
            return [_25percent, _50percent, _75percent, _100percent];
        }
        
        console.log( "Quintile data collected : ",quartileDataLocal );
        //console.log("These are the quartile values : ", quartileBounds([7,18,33,32,10,30,77,40,135,30,121,36,26,28,60,80,17,288,114])); 
        
        function plotSunBurst(dataFile , nJson){
            
            $("#sunburst").html("");
            $("#nfhs_legend").html("");
            
            var colorB = ["#98e38e","#80c6a7","#ef7f7f","#f4c274","#4f9cb4"];
            var color = ["#80c6a7","#4f9cb4",'#045A8D','#2B8CBE',"#FFC0CB"];

            
            console.log(dataFile);
            var selectedMag = "Healthy";
            if( currentCategoryPlot[0] == "l" ){
                selectedMag = "Low";
            }else if(currentCategoryPlot[1] == "h"){
                selectedMag = "High";
            }else if(currentCategoryPlot[0] == "h"){
                selectedMag = "Healthy";
            }
            
            
            //Add the legend
            var leg = "";
          
            leg += '<div class="col-sm-2"></div>';
            leg += '<div style="background:'+ colorB[0] +';height:10px;width:10px;float:left;margin-top:.8%;"></div><div style="font-size:12px;" class="col-sm-2">'+ "Healthy" +'</div>';
            leg += '<div style="background:'+ colorB[1] +';height:10px;width:10px;float:left;margin-top:.8%;"></div><div style="font-size:12px;" class="col-sm-2">'+ "High" +'</div>';
            leg += '<div style="background:'+ colorB[2] +';height:10px;width:10px;float:left;margin-top:.8%;"></div><div style="font-size:12px;" class="col-sm-2">'+ "Low" +'</div>';
            
            $("#nfhs_legend").html(leg);
            leg = "";
            
                var width = 430,
                    height = 430,
                    radius = Math.min(width-30, height-30) / 2;

                var x = d3.scale.linear()
                    .range([0, 2 * Math.PI]);

                var y = d3.scale.linear()
                    .range([0, radius]);

                //var color = d3.scale.category20c();

                
                var svg = d3.select("#sunburst").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

                var partition = d3.layout.partition()
                    .value(function(d) { return d.size; });

                var arc = d3.svg.arc()
                    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
                    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
                    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
                    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });


                var g = svg.selectAll("g")
                      .data(partition.nodes(nJson))
                      .enter().append("g");

                  var path = g.append("path")
                    .style("stroke", "#fff")
                    .style("cursor", "pointer")
                    .attr("d", arc)
                    //.style("fill", function(d) { return color((d.children ? d : d.parent).name); })
                    .style('opacity',function(d,i){
                        if( i == 0 ){
                           return "0"; 
                        }
                         return "1";
                         /*if( d.name == "Healthy" || d.name == "High" || d.name == "Low"){
                             return "1";
                         }else if( d.parent != undefined  &&  d.parent.name == selectedMag ){
                             return "0.4";
                         }    else{
                             return "0";
                         }*/
                      })
                      .style("fill", function(d,i) { 
                          
                          var iterator = 0;
                          dataFile.children.forEach(function(mVar,j){
                              console.log("MVar : ",mVar);
                              iterator = j;
                              //return colorB[j];
                          });
                          return colorB[iterator];
                          
                          /*var MagIndex = 0;
                          
                          if( "Healthy" == selectedMag ){
                                MagIndex = 0;
                          }else if( "High" == selectedMag ){
                                MagIndex = 1;   
                          }else if( "Low" == selectedMag ){
                                MagIndex = 2;   
                          }
                          
                          if( d.name == "Healthy" ){
                              return  colorB[0];
                          }else if(d.name == "High"){
                              return  colorB[1];
                          }else if(d.name == "Low"){
                              return  colorB[2];
                          }else if(d.parent != undefined  &&  d.parent.name == selectedMag){
                              return  colorB[MagIndex];
                          }else{
                              return  color[i%5];
                          }*/
                         
                      })
                      .style("fill-rule", "evenodd")
                      .on("mouseover",function(d){
                          
                          var total = ( dataFile.children[0].size + dataFile.children[1].size + dataFile.children[2].size ) 
                          
                          console.log( "Check Data file " + total  );
                          
                          var MagIndex = 0;
                          
                          if( nJson.children[0].name == selectedMag ){
                                MagIndex = 0;
                          }else if( nJson.children[1].name == selectedMag ){
                                MagIndex = 1;   
                          }else{
                                MagIndex = 2;   
                          }
                          
                          //console.log(d);
                          
                          if( d.name == selectedMag ){
                              $("#q1").text(  (nJson.children[MagIndex].children[0].size*100 ).toFixed(1) + "%" );
                              $("#q2").text(  (nJson.children[MagIndex].children[1].size*100 ).toFixed(1) + "%" );
                              $("#q3").text(  (nJson.children[MagIndex].children[2].size*100 ).toFixed(1) + "%" );
                              $("#q4").text(  (nJson.children[MagIndex].children[3].size*100 ).toFixed(1) + "%" );
                              $("#q5").text(  (nJson.children[MagIndex].children[4].size*100 ).toFixed(1) + "%" );

                              //console.log(d3.event.pageX);
                              //console.log(d3.event.pageY);
                              var tooltip = $('#tooltip');
                              tooltip.show();
                              d3.select('#tooltip').style("left", (d3.event.pageX ) + "px")   
                              d3.select('#tooltip').style("top", (d3.event.pageY - 120) + "px")
                          }
                         
                      })
                      .on('mouseout',function(){
                          $('#tooltip').hide();
                      })
                      .on("click", function(d,i){
                          
                          //
                          
                          //making a new plot function variable
                          var sample = currentCategoryPlot.split("_");
                          if( d.name == "Healthy"){
                              sample[0] = "h";
                          }else if(d.name == "High"){
                              sample[0] = "hh";
                          }else if(d.name == "Low"){
                              sample[0] = "l";
                          }
                          
                          var updatedArray = "";
                          sample.forEach(function(d,i){
                              if( i!= 3 ){
                                  updatedArray += d+"_";
                              }else{
                                  updatedArray += d;
                              }
                          });
                          
                          if(checkEnabled == 0 ){
                              //console.log("Updated Array : ", updatedArray);
                              currentCategoryPlot = updatedArray;
                              function_container.categoryselect(currentStatePlot, currentCategoryPlot);
                          }
                          
                          
                          console.log( "Check name " ,d.name );
                          if( d.name == "Healthy" || d.name == "High" || d.name == "Low"   ){
                              selectedMag = d.name;
                          }
                          
                          path.style("fill", function(d,i) { 
                              console.log("Data "+i+" : ",d);
                              
                               var MagIndex = 0;

                                  if( "Healthy" == selectedMag ){
                                        MagIndex = 0;
                                  }else if( "High" == selectedMag ){
                                        MagIndex = 1;   
                                  }else if( "Low" == selectedMag ){
                                        MagIndex = 2;   
                                  }

                              if( d.name == "Healthy" ){
                                  return  colorB[0];
                              }else if(d.name == "High"){
                                  return  colorB[1];
                              }else if(d.name == "Low"){
                                  return  colorB[2];
                              }else if(d.parent != undefined  &&  d.parent.name == selectedMag){
                                  return  colorB[MagIndex];
                              }else{
                                  return  color[i%5];
                              }

                          })
                          .style('opacity',function(d,i){
                        
                             if( d.name == "Healthy" || d.name == "High" || d.name == "Low" || d.name == "Elevated" || d.name == "Severe" || d.name == "Don't Know"  || d.name == "Normal Treated"){
                                 return "1";
                             }else if( d.parent != undefined  &&  d.parent.name == selectedMag ){
                                 return "0.4";
                             }    else{
                                 return "0";
                             }
                          }).transition().duration(750)
                          
                         text.text(function(d,i) { 
                            if( d.name == "Healthy" || d.name == "High" || d.name == "Low" || d.name == "Elevated" || d.name == "Severe" || d.name == "Don't Know"  || d.name == "Normal Treated"){
                                 return d.name;
                             }else if( d.parent != undefined  &&  d.parent.name == selectedMag ){
                                 return d.name;
                             }    else{
                                 return "";
                             }

                         })
                      });

                  var text = g.append("text")

                    .attr("transform", function(d,i) { return "rotate(" + computeTextRotation(d,i) + ")"; })
                    /*.attr("transform", function(d,i) { 
                        //return "translate(" + (centroid[0]+3) + "," + (centroid[1]) + ")"
                    })*/
                    .attr("x", function(d) { return y(d.y); })
                    .attr("dx", function(d,i){
                        if( i == 0){
                            return "-35";
                        }else{
                            return "6";
                        }
                     }) // margin
                    .attr("dy", ".25em") // vertical-align
                    .attr("font-family", "helvetica")
                    .attr("font-size", function(d,i){
                        if( i == 0 ){
                            return "27px";
                        }else{
                            return "10px";
                        }
                    })
                    .attr("font-style", "bold")
                    .attr("fill", "black")
                    .text(function(d,i) {
                        /*if( d.name == "Glucose"){
                            dataFile.children.forEach(function(k){
                                if( k.name == "h_glucose_all_ma" ){
                                    return (k.size*100).toFixed(2);
                                }else if( k.name == "hh_glucose_all_ma" ){
                                    //return (k.size*100).toFixed(2);
                                }else{
                                    //return (k.size*100).toFixed(2);
                                }
                            })
                        }*/
                         if( i == 0 ){
                             var index = 0;
                             dataFile.children.forEach( function(d2,ind){
                                 if( d2.name == "h_glucose_all_ma"){
                                    index = ind;
                                 }
                             } )
                             
                             
                        return  (dataFile.children[index].size*100).toFixed(1) + "%";
                             /*dataFile.children.forEach(function(k){
                                 console.log("Data file: ",k);
                                 if( k.name == "h_glucose_all_ma" ){
                                     return "Healthy : 30%";
                                 }
                            })*/
                            //return "Healthy : 30%";
                         }else if( d.name == "Healthy" || d.name == "High" || d.name == "Low"){
                             return d.name;
                         }else if( d.parent != undefined  &&  d.parent.name == "Healthy" ){
                             return d.name;
                         }    else{
                             return "";
                         }

                    });
               
                  /*function click(d) {
                    // fade out all text elements
                    text.transition().attr("opacity", 0);

                    path.transition()
                      .duration(750)
                      .attrTween("d", arcTween(d))
                      .each("end", function(e, i) {
                          // check if the animated element's data e lies within the visible angle span given in d
                          if (e.x >= d.x && e.x < (d.x + d.dx)) {
                            // get a selection of the associated text element
                            var arcText = d3.select(this.parentNode).select("text");
                            // fade in the text element and recalculate positions
                            arcText.transition().duration(750)
                              .attr("opacity", 1)
                              .attr("transform", function(d,i) { return "rotate(" + computeTextRotation(d,i) + ")" })
                              .attr("x", function(d) { return y(d.y); });
                          }
                      });
                  }*/

                d3.select(self.frameElement).style("height", height + "px");

                // Interpolate the scales!
                function arcTween(d) {
                  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                      yd = d3.interpolate(y.domain(), [d.y, 1]),
                      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                  return function(d, i) {
                    return i
                        ? function(t) { return arc(d); }
                        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
                  };
                }

                function computeTextRotation(d,i) {
                    if( i == 0 ){
                        return 0;
                    }else{
                        return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
                    }

                }
        }
        
        function plotQuintuleBars(dataCollection , varPresent , typeOfData){
            
            
            
            console.log("Data for quintile bars : ",dataCollection);
            console.log("Data for quintile bars meta : ",varPresent);
            
            if( typeOfData == null ){
                typeOfData = (stateNameCall=="India")? "district" : "state"
            }
            
            //to check for the lower 2
            if( varPresent["severe"] != undefined ){
                $("#quintile_bar_1_5").show()
                $("#quintile_bar_2_5").show()
                $("#quintile_bar_3_5").show()
                $("#quintile_bar_4_5").show()
                $("#quintile_bar_5_5").show()
                
                $("#quintile_without_severe").hide();
                $("#quintile_with_severe").show();
                
            }else{
                $("#quintile_bar_1_5").hide()
                $("#quintile_bar_2_5").hide()
                $("#quintile_bar_3_5").hide()
                $("#quintile_bar_4_5").hide()
                $("#quintile_bar_5_5").hide()
                
                $("#quintile_without_severe").show();
                $("#quintile_with_severe").hide();
            }
            
            if( varPresent["elevated"] != undefined ){
                $("#quintile_bar_1_4").show()
                $("#quintile_bar_2_4").show()
                $("#quintile_bar_3_4").show()
                $("#quintile_bar_4_4").show()
                $("#quintile_bar_5_4").show()
                
                $("#quintile_without_severe").hide();
                $("#quintile_with_severe").show();
                
            }else{
                $("#quintile_bar_1_4").hide()
                $("#quintile_bar_2_4").hide()
                $("#quintile_bar_3_4").hide()
                $("#quintile_bar_4_4").hide()
                $("#quintile_bar_5_4").hide()
                
                $("#quintile_without_severe").show();
                $("#quintile_with_severe").hide();
            }
            
         
            //quintile_bar_5_1
            for( var q = 1; q<=5 ; q++ ){
                
                for( var prop in varPresent ){
                if( varPresent.hasOwnProperty(prop) ){
                    if(varPresent[prop] !== null ){
                        var magNum = 1;
                        
                        if( prop == "low" || prop == "present" ){
                                 magNum = 1;
                        }else if(prop == "healthy" || prop == "dont_know" ){
                                 magNum = 2;  
                        }else if(prop == "high" || prop == "treated"){
                                 magNum = 3;  
                        }else if(prop == "elevate"){
                                 magNum = 4;  
                        }else if(prop == "sereve"){
                                 magNum = 5; 
                        }
                        
                        d3.select("#quintile_bar_"+q+"_"+magNum)
                            .style('width',function(){
                                
                                    if( dataCollection[varPresent[prop] + "_Q"+q+"_"+ typeOfData] == undefined ){
                                            return 0 +'%';
                                    }else{
                                        return ( parseFloat(dataCollection[ varPresent[prop] + "_Q"+q+"_"+ typeOfData ])*100 ).toFixed(1) + '%';
                                    }
                            })
                            .text(function(d,i){
                                    if( dataCollection[varPresent[prop] + "_Q"+q+"_"+ typeOfData] == undefined ){
                                            return 0 +'%';
                                    }else{
                                        return ( parseFloat(dataCollection[ varPresent[prop] + "_Q"+q+"_"+ typeOfData ])*100 ).toFixed(1) + '%';
                                    }
                            })
                      }
                   }
                }
            }
            
        }
        
        function plotContinuousLegend(rangeArr, colorArr){
                
                //Clear the existing div
                //$("#nfhs_legend_1").remove();
                
                if( continuousLegend ){
                    continuousLegend.remove();
                }
            
                $("#legend_Header").text("Population Distribution (in Percentage)");
            
                var w = 360, h = 40;

                continuousLegend = d3.select("#nfhs_legend_1").append("svg").attr("width", w).attr("height", h);

                var legend = continuousLegend.append("defs")
                .append("svg:linearGradient")
                      .attr("id", "gradient")
                      .attr("x1", "0%")
                      .attr("y1", "100%")
                      .attr("x2", "100%")
                      .attr("y2", "100%")
                      .attr("spreadMethod", "pad");

                legend.append("stop")
                      .attr("offset", "0%")
                      .attr("stop-color", colorArr[0])
                      .attr("stop-opacity", 1);

                legend.append("stop")
                      .attr("offset", "25%")
                      .attr("stop-color", colorArr[1])
                      .attr("stop-opacity", 1);

                legend.append("stop")
                      .attr("offset", "50%")
                      .attr("stop-color", colorArr[2])
                      .attr("stop-opacity", 1);

                legend.append("stop")
                      .attr("offset", "75%")
                      .attr("stop-color", colorArr[3])
                      .attr("stop-opacity", 1);
            
                legend.append("stop")
                      .attr("offset", "100%")
                      .attr("stop-color", colorArr[4])
                      .attr("stop-opacity", 1);

                continuousLegend.append("rect")
                      .attr("width", w)
                      .attr("height", h - 30)
                      .style("fill", "url(#gradient)")
                      .attr("transform", "translate(40,10)");

                var y = d3.scale.linear()
                        .range([300, 0])
                        .domain([(parseFloat(quartileValuesLocal[3])*100).toFixed(0) ,0 ]  );

                var yAxis = d3.svg.axis()
                            .scale(y)
                            .tickSize(0)
                            .ticks(3)
                            .orient("bottom");

                continuousLegend.append("g")
                    //.attr("class", "y axis")
                    .attr("transform", "translate(51,20)")
                    .call(yAxis)
                    .append("text")
                    .attr("width", w)
                    .attr("transform", "rotate(-90)")
                    .attr("y", 30)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    //.text("axis title");
            
        }
        
        function plotQuintileGraphs( dataCollection , varPresent){
            
            console.log("This is the data for quintile graphs : ",dataCollection);
            console.log("This is variable desc : ",varPresent);
            
            //Applying the details on the values
            for( var prop in varPresent ){
                if( varPresent.hasOwnProperty(prop) ){
                    if(varPresent[prop] !== null ){
                        
                        //console.log( "This is selected : ",plotVarDef[varPresent[prop]].description.main_head );
                        $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[varPresent[prop]].description.main_head);
                        $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataCollection[varPresent[prop]])*100)).toFixed(1) + " %" );
                        
                        for( var i = 1; i<=5 ; i++){
                            d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                              //.transition()
                              //.duration(100)
                              .style('width',function(){
                                
                                    if( dataCollection[varPresent[prop] + "_Q"+i+"_"+ ( stateNameCall=="India"? "district" : "state")] == undefined ){
                                            return 0 +'%';
                                    }else{
                                        return ( parseFloat(dataCollection[ varPresent[prop] + "_Q"+i+"_"+ ( stateNameCall=="India"? "district" : "state") ])*100 ).toFixed(1) + '%';
                                    }
                            })
                        }
                    }
                }
              }
            
              $(".QUINTILE_DIVISION").on('mouseover',function(){
                  var magVar = "healthy"
                  if( $(this).attr('value') == "1" ){
                      
                      if( varPresent.low != undefined ){
                          magVar = "low";
                      }else{
                          magVar = "present";
                      }
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ ( stateNameCall=="India"? "district" : "state") ])*100 ).toFixed(1) + '%'  );
                      }
                  }else if( $(this).attr('value') == "2" ){
                      
                      if( varPresent.healthy != undefined ){
                          magVar = "healthy";
                      }else{
                          magVar = "dont_know";
                      }
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ ( stateNameCall=="India"? "district" : "state") ])*100 ).toFixed(1) + '%'  );
                      }
                  }else if( $(this).attr('value') == "3" ){

                      if( varPresent.high != undefined ){
                          magVar = "high";
                      }else{
                          magVar = "treated";
                      }
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ ( stateNameCall=="India"? "district" : "state") ])*100 ).toFixed(1) + '%'  );
                      }
                  }else if( $(this).attr('value') == "4" ){
                      
                      magVar = "elevated";
                      
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ ( stateNameCall=="India"? "district" : "state") ])*100 ).toFixed(1) + '%'  );
                      }
                  }else if( $(this).attr('value') == "5" ){
                      
                      magVar = "severe";
                      
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ ( stateNameCall=="India"? "district" : "state") ])*100 ).toFixed(1) + '%'  );
                      }
                  }
                  
                  var tooltip = $('#tooltip');
                      tooltip.show();
                      d3.select('#tooltip').style("left", (event.clientX ) + "px")   
                      d3.select('#tooltip').style("top", (event.clientY - 120) + "px")
                  
              }).on('mouseout',function(){
                  var tooltip = $('#tooltip');
                      tooltip.hide();
              })
            
        }
        
        function dynamicPlotPercentage()
        {
                //Defining the data on the information box
                
               
                $("#main_nfhs_cat_head").text(dropDownCondition[mainCategoryIdentifier]);
            
                //Change the pointer back to auto
                d3.select("body").attr('style', 'cursor:auto');
                
                MainHeading.text("INDIA")
                
                //Show nfhs selection option
                $("#nfhs_selection").show();
            
                quartileValuesLocal = quartileBounds(quartileDataLocal)
                console.log( "Quintile data values : ", quartileValuesLocal);
            
                var colorArrayLow = ["#ffdecc","#ffbc99","#ff9b66","#ff7933","#ff6513"];
                var colorArrayHigh = ["#ffe0e3","#ffa2aa","#ff6270","#ff1b2f","#ff0016"];
                var colorArrayHealthy = ["#e5f7e0","#b6e8a9","#7dd666","#39c015","#27ba00"];
                var colorArrayElevated = ["#ffcce4","#ff99c9","#ff66ae","#ff3393","#ff0078"];
                var colorArraySevere = ["#ffccfe","#ff99fe","#ff66fd","#ff33fd","#ff00fc"];
                
                var currentColorArray = ["#FEE9EB","#FDE0E1","#FA8E94","#F83539","#F82714"];
            
                if(currentCategoryPlot.split("_")[0] == "l" || currentCategoryPlot.split("_")[0] == "p"){
                         currentColorArray = colorArrayLow;
                }else if(currentCategoryPlot.split("_")[0] == "h" || currentCategoryPlot.split("_")[0] == "dk"){
                         currentColorArray = colorArrayHealthy;
                }else if(currentCategoryPlot.split("_")[0] == "hh" || currentCategoryPlot.split("_")[0] == "t" ){
                         currentColorArray = colorArrayHigh;
                }else if(currentCategoryPlot.split("_")[0] == "hhh" ){
                         currentColorArray = colorArrayElevated;
                }else if(currentCategoryPlot.split("_")[0] == "hhhh" ){
                         currentColorArray = colorArraySevere;
                }   
              
                var linearScale = d3.scale.linear()
                              .domain(
                                  [
                                      0, 
                                      parseFloat(quartileValuesLocal[0])*100,
                                      parseFloat(quartileValuesLocal[1])*100,
                                      parseFloat(quartileValuesLocal[2])*100,
                                      parseFloat(quartileValuesLocal[3])*100
                                  ]
                              )
                              .range(currentColorArray);
            
                var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
                var rangeArr = [0,50]
                
                //Getting the legend
                plotContinuousLegend(rangeArr, currentColorArray);
            
                //legendsData.style('visibility','visible')
           
                canvas = d3.select('#chart-area').append('svg')
                        //.attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                        .attr('height',width*.65)
                
                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide();
                
                var centered,zoomState=0;
              
                var g = canvas.append("g");
                IndiaDistrictOutlineMap = g.append("g")
                    .selectAll("path")
                    .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                    .enter()
                    .append("path")
                    .attr("d", pathState)
                    .attr("class", "states")
                    .attr('stroke-width', 0)
                    .attr('stroke', 'white')
                    .attr('style', 'cursor:pointer')
            
                IndiaDistrictOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',function(d,i){
                           if(d == undefined || d.properties[plotVar.v] == undefined){
                                return '#000'//colorAccessSubCenter_STATE_gt_5km[4];
                            }else{
                                return linearScale(parseFloat( d.properties[plotVar.v]*100 ) );
                            } 
                         })
            
                console.log("Current Plot Variable : ",plotVar.v);
            
               //Show the legends
               $("#nfhs_map_legend").show();
               $("#nfhs_info_box_legend").show();
            
                var variablePresent = {
                    low : null,
                    healthy : null,
                    high : null,
                    elevated : null,
                    severe : null,
                    present : null,
                    dont_know : null,
                    treated : null
                }
                var magnitudeVariation = {
                    low : 1,
                    healthy : 2,
                    high : 3,
                    elevated : 4,
                    severe : 5,
                    present : 1,
                    dont_know : 2,
                    treated : 3
                }
            
                //Get the apoVar listing
                apiVAR.forEach(function(d2,i){

                    if(d2.data_var != undefined){

                        //Condition 
                        if( d2.data_var.split("_")[0] == "l"){
                            variablePresent.low = d2.data_var;
                        }else if(d2.data_var.split("_")[0] == "h"){
                            variablePresent.healthy = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hh"){
                            variablePresent.high = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hhh"){
                            variablePresent.elevated = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hhhh"){
                            variablePresent.severe = d2.data_var;     
                        }
                        //Disease 
                        else if(d2.data_var.split("_")[0] == "p"){
                            variablePresent.present = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "dk"){
                            variablePresent.dont_know = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "t"){
                            variablePresent.treated = d2.data_var;     
                        }
                    }
                });
            
                globalVariablePresent = variablePresent;
            
                //Change the vsisbility of the Information box divs
                if( variablePresent.low == null && variablePresent.present == null ){
                    $("#magnitude_1_div").hide();
                    $("#magnitude_head_1").hide();
                    $("#c1").hide();
                }else{
                    $("#magnitude_1_div").show();
                    $("#magnitude_head_1").show();
                    $("#c1").show();
                    
                    //Change the headers
                    $("#magnitude_head_1").text( variablePresent.low != null?"Low":"Present" )
                }

                if( variablePresent.healthy == null && variablePresent.dont_know == null ){
                    $("#magnitude_2_div").hide();
                    $("#magnitude_head_2").hide();
                    $("#c2").hide();
                }else{
                    $("#magnitude_2_div").show();
                    $("#magnitude_head_2").show();
                    $("#c2").show();
                    
                    //Change the headers
                    $("#magnitude_head_2").text( variablePresent.healthy != null?"Healthy":"Don't Know" )
                }

                if( variablePresent.high == null && variablePresent.treated == null){
                    $("#magnitude_3_div").hidw();
                    $("#magnitude_head_3").hide();
                    $("#c3").hide();
                }else{
                    $("#magnitude_3_div").show();
                    $("#magnitude_head_3").show();
                    $("#c3").show();
                    
                    //Change the headers
                    $("#magnitude_head_3").text( variablePresent.high != null?"High":"Treated" )
                }

                if( variablePresent.elevated == null ){
                    $("#magnitude_4_div").hide();
                    $("#magnitude_head_4").hide();
                    $("#c4").hide();
                }else{
                    $("#magnitude_4_div").show();
                    $("#magnitude_head_4").show();
                    $("#c4").show();
                    
                    //Change the headers
                    $("#magnitude_head_4").text( "Elevated" )
                }

                if( variablePresent.severe == null ){
                    $("#magnitude_5_div").hide();
                    $("#magnitude_head_5").hide();
                    $("#c5").hide();
                }else{
                    $("#magnitude_5_div").show();
                    $("#magnitude_head_5").show();
                    $("#c5").show();
                    
                    //Change the headers
                    $("#magnitude_head_5").text( "Severe" )
                }
            
                //Initial data setup
                console.log("Data type naton ",dataTYPENation);
                console.log("Data income naton ",dataINCOMENation);
                console.log(magnitudeVariation);
                for( var prop in variablePresent ){
                    if( variablePresent.hasOwnProperty(prop) ){
                        if(variablePresent[prop] !== null ){
                            
                            $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[variablePresent[prop]].description.main_head);
                            $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + " %" );

                            for( var i = 1; i<=5 ; i++){
                                d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                                  //.transition()
                                  //.duration(100)
                                  .style('width',function(){

                                        if( dataINCOMENation[0][variablePresent[prop] + "_Q"+i+"_nation"] == undefined ){
                                                return 0 +'%';
                                        }else{
                                            return ( parseFloat(dataINCOMENation[0][ variablePresent[prop] + "_Q"+i+"_nation" ])*100 ).toFixed(1) + '%';
                                        }
                                })
                            }
                        }
                    }
                  }
              
                $("#district_smart_search").on( 'keyup',function(){
                    var filter = $(this).val().toUpperCase();
                    var list = "";
                    console.log(filter);
                    
                    var serachList = $("#district_smart_search_result");
                    console.log( serachList )
                    
                    districtCollection.forEach(function(d){
                        if(d.toUpperCase().indexOf(filter) != -1 ){
                           list += '<li><a class="DISTRICT_DROP display_c" onclick="getDist(' + "'" +d+ "'" +')" name="'+ d +'" style="cursor:pointer;">'+d+'</a></li>';
                        }
                    })

                    $("#district_smart_search_result").html(list);
                 })
                
                
                plotSpecificDist.selctedDistrict = function(district){
                    console.log("This is function call for "+ district + " in plotNFHS.");
                    //if(checkEnabled == 0){
                     
                          if( district == "India" ){
                              IndiaDistrictOutlineMap
                              .attr('stroke', 'white')
                              .style('fill',function(d2,i){
                                   if(d2 == undefined || d2.properties[plotVar.v] == undefined){
                                        return '#000'//colorAccessSubCenter_STATE_gt_5km[4];
                                    }else{
                                        return linearScale(parseFloat( d2.properties[plotVar.v]*100 ) );
                                    } 
                                 })

                              $("#main-head-box").show();
                              $("#state_district_selection_box").hide();
                              $("#main-head").text(district);
                              $("#district_smart_search").text(district);
                              checkEnabled = 0;
                          }else{
                              IndiaDistrictOutlineMap
                              .attr('stroke', 'white')
                              .style('fill',function(d2){
                                    if( district == d2.properties.DISTRICT ){
                                          console.log("Selecetd district cordinate : ",d2.geometry.coordinates[0][0]);
                                        
                                          console.log("Centroid : "+pathState.centroid(d2)[0].toFixed(0) + "|" + pathState.centroid(d2)[1].toFixed(0));
                                            //Show magnitude table only when the cursor stops
                                            var tooltip = $('#mapTooltip');
                                            tooltip.show();
                                            $("#mapToolTipDist").text(d2.properties.DISTRICT);
                                            $("#mapToolTipState").text(d2.properties.ST_NM);
                                            d3.select('#mapTooltip').style("left", (pathState.centroid(d2)[0]) + "px")   
                                            d3.select('#mapTooltip').style("top", (pathState.centroid(d2)[1]+70) + "px")
                                            //d3.select('#mapTooltip').style("top", (d2.geometry.coordinates[0][0][1]) + "px")
                                            //d3.select('#mapTooltip').style("left", (d2.geometry.coordinates[0][0][0]) + "px")
                                        
                                          plotQuintileGraphs( d2.properties , variablePresent);
                                          $("#magnitudeTable").show()
                                        return linearScale(parseFloat( d2.properties[plotVar.v]*100 ) );
                                    }else{
                                        return "#eee";
                                    }
                              })

                              $("#main-head-box").show();
                              $("#state_district_selection_box").hide();
                              $("#main-head").text(district);
                              $("#district_smart_search").text(district );
                              checkEnabled = 1;
                          }
                    
                          
                    
                }
                
                //Remove all the arrow
                $(".arrow_indicator").hide();
            
                //Remove the highlight class
                for( var i=1;i<=5;i++ ){
                    $("#magnitude_"+ i +"_sub_div").attr('style',"color:#000;");
                    $("#magnitude_"+ i +"_name").removeClass("magnitude_highlight");
                }
                
                //Updating the header colors
                if(currentCategoryPlot.split("_")[0] == "l" || currentCategoryPlot.split("_")[0] == "p" ){
                         $("#magnitude_1_sub_div").attr('style',"color:"+colorArrayLow[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayLow[4]);
                         $("#arrow_1").css("color",colorArrayLow[4]);
                         $("#magnitude_1_name").addClass("magnitude_highlight");
                         $("#arrow_1").show();
                }else if(currentCategoryPlot.split("_")[0] == "h" || currentCategoryPlot.split("_")[0] == "dk" ){
                         $("#magnitude_2_sub_div").attr('style',"color:"+colorArrayHealthy[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayHealthy[4]);
                         $("#arrow_2").css("color",colorArrayHealthy[4]);
                         $("#magnitude_2_name").addClass("magnitude_highlight");
                         $("#arrow_2").show();
                }else if(currentCategoryPlot.split("_")[0] == "hh" || currentCategoryPlot.split("_")[0] == "t" ){
                         $("#magnitude_3_sub_div").attr('style',"color:"+colorArrayHigh[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayHigh[4]);
                         $("#arrow_3").css("color",colorArrayHigh[4]);
                         $("#magnitude_3_name").addClass("magnitude_highlight");
                         $("#arrow_3").show();
                }else if(currentCategoryPlot.split("_")[0] == "hhh" ){
                         $("#magnitude_4_sub_div").attr('style',"color:"+colorArrayElevated[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayElevated[4]);
                         $("#arrow_4").css("color",colorArrayElevated[4]);
                         $("#magnitude_4_name").addClass("magnitude_highlight");
                         $("#arrow_4").show();
                }else if(currentCategoryPlot.split("_")[0] == "hhhh" ){
                         $("#magnitude_5_sub_div").attr('style',"color:"+colorArraySevere[4])
                         $("#chart-area").css("border-right","2px solid "+colorArraySevere[4]);
                         $("#arrow_5").css("color",colorArraySevere[4]);
                         $("#magnitude_5_name").addClass("magnitude_highlight");
                         $("#arrow_5").show();
                }
               
   
                
                console.log(" Variable present ",variablePresent);
                 
                IndiaDistrictOutlineMap
                   .on('mouseover',function(d){
                    
                      if( checkEnabled == 0 ){
                          
                          
                        console.log( d.properties.DISTRICT + " : " + d.properties.h_glucose_all_ma );
                        console.log( d.properties.DISTRICT + " : " + d.properties.h_glucose_all_ma );
                          
                        if( variablePresent.low == null && variablePresent.present == null ){
                        }else{
                            $("#c1").text((d.properties[variablePresent.low!=null?variablePresent.low:variablePresent.present] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.healthy == null && variablePresent.dont_know == null ){
                        }else{
                           $("#c2").text((d.properties[variablePresent.healthy!=null?variablePresent.healthy:variablePresent.dont_know] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.high == null && variablePresent.treated == null){
                        }else{
                            $("#c3").text((d.properties[variablePresent.high!=null?variablePresent.high:variablePresent.treated] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.elevated == null ){
                        }else{
                             $("#c4").text((d.properties[ variablePresent.elevated ] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.severe == null ){
                        }else{
                            $("#c5").text((d.properties[ variablePresent.severe ] *100 ).toFixed(1) + "%" );
                        }
                       
                        $("#mapToolTipDist").text(d.properties.DISTRICT);
                        $("#mapToolTipState").text(d.properties.ST_NM);

                        var tooltip = $('#mapTooltip');
                        tooltip.show();
                        d3.select('#mapTooltip').style("left", (d3.event.pageX ) + "px")   
                        d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")
                          
                        console.log(d3.event.pageX + " : " + d3.event.pageY) 
                    
                        d3.select(this).style('opacity',"0.6");
                          
                        //This will plot the quintile row graphs 
                        plotQuintileGraphs( d.properties , variablePresent );

                        if(d.properties.ST_NM == "Andhra Pradesh"){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                            MainHeading.text( d.properties.DISTRICT +" (Andhra Pradesh*)")
                            //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                        }else 
                        if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                             //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                             MainHeading.text( d.properties.DISTRICT +" (Delhi)")
                            //InfoStateName.text("Delhi".toUpperCase())
                        }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                            MainHeading.text( d.properties.DISTRICT +" (Arunachal Pradesh)")
                            //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                        }else{
                            MainHeading.text( d.properties.DISTRICT +" (" + d.properties.ST_NM +")")
                            //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                        }
                    }
                    
                }).on('mouseout',function(d){
                    
                    
                    
                    if( checkEnabled == 0 ){
                        
                        MainHeading.text("INDIA")
                        d3.select(this).style('opacity',"1")
                        var tooltip = $('#mapTooltip');
                        tooltip.hide();
                        
                        for( var prop in variablePresent ){
                        if( variablePresent.hasOwnProperty(prop) ){
                            if(variablePresent[prop] !== null ){

                                $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[variablePresent[prop]].description.main_head);
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + " %" );

                                for( var i = 1; i<=5 ; i++){
                                    d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                                      //.transition()
                                      //.duration(100)
                                      .style('width',function(){

                                            if( dataINCOMENation[0][variablePresent[prop] + "_Q"+i+"_nation"] == undefined ){
                                                    return 0 +'%';
                                            }else{
                                                return ( parseFloat(dataINCOMENation[0][ variablePresent[prop] + "_Q"+i+"_nation" ])*100 ).toFixed(1) + '%';
                                            }
                                    })
                                }
                            }
                        }
                      }
                        
                    }
                   
                })
                .on('click',function(d){
                   
                    if(checkEnabled == 0){
                          
                          IndiaDistrictOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',function(d2){
                                if( d.properties.DISTRICT == d2.properties.DISTRICT ){
                                    return linearScale(parseFloat( d2.properties[plotVar.v]*100 ) );
                                }else{
                                    return "#eee";
                                }
                          })
                          //Show magnitude table only when the cursor stops
                          d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")
                          $("#magnitudeTable").show()
                        
                          //This will plot the quintile row graphs 
                          plotQuintileGraphs( d.properties , variablePresent );
                        
                          checkEnabled = 1;
                          $("#district_smart_search").text(d2.properties.DISTRICT );
                        
                    }else if(checkEnabled == 1){
                        
                          IndiaDistrictOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',function(d,i){
                           if(d == undefined || d.properties[plotVar.v] == undefined){
                                return '#000';
                            }else{
                                return linearScale(parseFloat( d.properties[plotVar.v]*100 ) );
                            } 
                         })
                        //Hide magnitude table only when the cursor moves
                        d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")
                        d3.select("#mapTooltip").style('height',"35px")
                        $("#magnitudeTable").hide()
                        checkEnabled = 0;
                        canvas.attr('style', 'cursor:auto')
                        $("#district_smart_search").text("India" );
                    }
                    
                })
            
               /**/
              
         }
        
        //To change the legends 
        //To change the infromation box
        //To change the information box legend
        function dynamicPlotQuintilePercentage()
        {
                //Defining the data on the information box
                $("#main_nfhs_cat_head").text(dropDownCondition[mainCategoryIdentifier]);
            
                //Change the pointer back to auto
                d3.select("body").attr('style', 'cursor:auto');
            
                console.log("Data for overall nation : ",dataTYPENation);
                
                MainHeading.text("INDIA")
                
                //Show nfhs selection option
                $("#nfhs_selection").show();
            
                quartileValuesLocal = quartileBounds(quartileDataLocal)
                console.log( "Quintile data values : ", quartileValuesLocal);
            
                canvas = d3.select('#chart-area').append('svg')
                        //.attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                        .attr('height',width*.65)
                
                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide();
                
                var centered,zoomState=0;
              
                var g = canvas.append("g");
                IndiaDistrictOutlineMap = g.append("g")
                    .selectAll("path")
                    .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                    .enter()
                    .append("path")
                    .attr("d", pathState)
                    .attr("class", "states")
                    .attr('stroke-width', 0)
                    .attr('stroke', 'white')
                    .attr('style', 'cursor:pointer')
            
                //filling the color and gradient 
                IndiaDistrictOutlineMap
                    .attr('stroke', 'white')
                    .attr('fill', '#eee')
                         
                console.log("Current Plot Variable : ",plotVar.v);
            
               //Show the legends
               $("#nfhs_map_legend").show();
               $("#nfhs_info_box_legend").show();
            
                var variablePresent = {
                    low : null,
                    healthy : null,
                    high : null,
                    elevated : null,
                    severe : null,
                    present : null,
                    dont_know : null,
                    treated : null
                }
                var magnitudeVariation = {
                    low : 1,
                    healthy : 2,
                    high : 3,
                    elevated : 4,
                    severe : 5,
                    present : 1,
                    dont_know : 2,
                    treated : 3
                }
            
                //Get the apoVar listing
                apiVAR.forEach(function(d2,i){

                    if(d2.data_var != undefined){

                        //Condition 
                        if( d2.data_var.split("_")[0] == "l"){
                            variablePresent.low = d2.data_var;
                        }else if(d2.data_var.split("_")[0] == "h"){
                            variablePresent.healthy = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hh"){
                            variablePresent.high = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hhh"){
                            variablePresent.elevated = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hhhh"){
                            variablePresent.severe = d2.data_var;     
                        }
                        //Disease 
                        else if(d2.data_var.split("_")[0] == "p"){
                            variablePresent.present = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "dk"){
                            variablePresent.dont_know = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "t"){
                            variablePresent.treated = d2.data_var;     
                        }
                    }
                });
            
                globalVariablePresent = variablePresent;
            
                //Change the vsisbility of the Information box divs
                if( variablePresent.low == null && variablePresent.present == null ){
                    $("#magnitude_1_div").hide();
                    $("#magnitude_head_1").hide();
                    $("#c1").hide();
                }else{
                    $("#magnitude_1_div").show();
                    $("#magnitude_head_1").show();
                    $("#c1").show();
                    
                    //Change the headers
                    $("#magnitude_head_1").text( variablePresent.low != null?"Low":"Present" )
                }

                if( variablePresent.healthy == null && variablePresent.dont_know == null ){
                    $("#magnitude_2_div").hide();
                    $("#magnitude_head_2").hide();
                    $("#c2").hide();
                }else{
                    $("#magnitude_2_div").show();
                    $("#magnitude_head_2").show();
                    $("#c2").show();
                    
                    //Change the headers
                    $("#magnitude_head_2").text( variablePresent.healthy != null?"Healthy":"Don't Know" )
                }

                if( variablePresent.high == null && variablePresent.treated == null){
                    $("#magnitude_3_div").hidw();
                    $("#magnitude_head_3").hide();
                    $("#c3").hide();
                }else{
                    $("#magnitude_3_div").show();
                    $("#magnitude_head_3").show();
                    $("#c3").show();
                    
                    //Change the headers
                    $("#magnitude_head_3").text( variablePresent.high != null?"High":"Treated" )
                }

                if( variablePresent.elevated == null ){
                    $("#magnitude_4_div").hide();
                    $("#magnitude_head_4").hide();
                    $("#c4").hide();
                }else{
                    $("#magnitude_4_div").show();
                    $("#magnitude_head_4").show();
                    $("#c4").show();
                    
                    //Change the headers
                    $("#magnitude_head_4").text( "Elevated" )
                }

                if( variablePresent.severe == null ){
                    $("#magnitude_5_div").hide();
                    $("#magnitude_head_5").hide();
                    $("#c5").hide();
                }else{
                    $("#magnitude_5_div").show();
                    $("#magnitude_head_5").show();
                    $("#c5").show();
                    
                    //Change the headers
                    $("#magnitude_head_5").text( "Severe" )
                }
            
                //Initial data setup
                console.log("Data type naton ",dataTYPENation);
                console.log("Data income naton ",dataINCOMENation);
            
                //Plot nation wise quintles
                plotQuintuleBars( dataINCOMENation[0] , variablePresent , "nation");
            
                console.log(magnitudeVariation);
                for( var prop in variablePresent ){
                    if( variablePresent.hasOwnProperty(prop) ){
                        if(variablePresent[prop] !== null ){
                            
                            $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[variablePresent[prop]].description.main_head);
                            $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + " %" );

                            for( var i = 1; i<=5 ; i++){
                                d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                                  //.transition()
                                  //.duration(100)
                                  .style('width',function(){

                                        if( dataINCOMENation[0][variablePresent[prop] + "_Q"+i+"_nation"] == undefined ){
                                                return 0 +'%';
                                        }else{
                                            return ( parseFloat(dataINCOMENation[0][ variablePresent[prop] + "_Q"+i+"_nation" ])*100 ).toFixed(1) + '%';
                                        }
                                   })
                               }
                          }
                      }
                  }
              
                $("#district_smart_search").on( 'keyup',function(){
                    var filter = $(this).val().toUpperCase();
                    var list = "";
                    console.log(filter);
                    
                    var serachList = $("#district_smart_search_result");
                    console.log( serachList )
                    
                    districtCollection.forEach(function(d){
                        if(d.toUpperCase().indexOf(filter) != -1 ){
                           list += '<li><a class="DISTRICT_DROP display_c" onclick="getDist(' + "'" +d+ "'" +')" name="'+ d +'" style="cursor:pointer;">'+d+'</a></li>';
                        }
                    })

                    $("#district_smart_search_result").html(list);
                 })
                
                
                plotSpecificDist.selctedDistrict = function(district){
                    console.log("This is function call for "+ district + " in plotNFHS.");
                    //if(checkEnabled == 0){
                        
                          IndiaDistrictOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',function(d2){
                                if( district == d2.properties.DISTRICT ){
                                      console.log("Selecetd district cordinate : ",d2.geometry.coordinates[0][0]);
                                      //Show magnitude table only when the cursor stops
                                      d3.select('#mapTooltip').style("top", (d2.geometry.coordinates[0][0][1]) + "px")
                                      d3.select('#mapTooltip').style("left", (d2.geometry.coordinates[0][0][0]) + "px")
                                      plotQuintileGraphs( d2.properties , variablePresent);
                                      d3.select("#mapTooltip").style('height',"100px")
                                      $("#magnitudeTable").show()
                                    return "#045A8D";
                                }else{
                                    return "#eee";
                                }
                          })
                          
                          $("#main-head-box").show();
                          $("#state_district_selection_box").hide();
                          $("#main-head").text(district);
                          $("#district_smart_search").text(district );
                          checkEnabled = 1;
                    
                }
                
                //Remove the highlight class
                for( var i=1;i<=5;i++ ){
                    $("#magnitude_"+ i +"_name").removeClass("magnitude_highlight");
                }
                
                //Updating the header colors
                if(currentCategoryPlot.split("_")[0] == "l" || currentCategoryPlot.split("_")[0] == "p" ){
                         $("#magnitude_1_name").addClass("magnitude_highlight");
                }else if(currentCategoryPlot.split("_")[0] == "h" || currentCategoryPlot.split("_")[0] == "dk" ){
                         $("#magnitude_2_name").addClass("magnitude_highlight");
                }else if(currentCategoryPlot.split("_")[0] == "hh" || currentCategoryPlot.split("_")[0] == "t" ){
                         $("#magnitude_3_name").addClass("magnitude_highlight");
                }else if(currentCategoryPlot.split("_")[0] == "hhh" ){
                         $("#magnitude_4_name").addClass("magnitude_highlight");
                }else if(currentCategoryPlot.split("_")[0] == "hhhh" ){
                         $("#magnitude_5_name").addClass("magnitude_highlight");
                }
               
                console.log(" Variable present ",variablePresent);
                 
                IndiaDistrictOutlineMap
                   .on('mouseover',function(d){
                    
                      if( checkEnabled == 0 ){
                          
                          
                        console.log( d.properties.DISTRICT + " : " + d.properties.h_glucose_all_ma );
                        console.log( d.properties.DISTRICT + " : " + d.properties.h_glucose_all_ma );
                          
                        if( variablePresent.low == null && variablePresent.present == null ){
                        }else{
                            $("#c1").text((d.properties[variablePresent.low!=null?variablePresent.low:variablePresent.present] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.healthy == null && variablePresent.dont_know == null ){
                        }else{
                           $("#c2").text((d.properties[variablePresent.healthy!=null?variablePresent.healthy:variablePresent.dont_know] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.high == null && variablePresent.treated == null){
                        }else{
                            $("#c3").text((d.properties[variablePresent.high!=null?variablePresent.high:variablePresent.treated] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.elevated == null ){
                        }else{
                             $("#c4").text((d.properties[ variablePresent.elevated ] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.severe == null ){
                        }else{
                            $("#c5").text((d.properties[ variablePresent.severe ] *100 ).toFixed(1) + "%" );
                        }
                       
                        $("#mapToolTipDist").text(d.properties.DISTRICT);
                        $("#mapToolTipState").text(d.properties.ST_NM);

                        var tooltip = $('#mapTooltip');
                        tooltip.show();
                        d3.select('#mapTooltip').style("left", (d3.event.pageX ) + "px")   
                        d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")
                          
                        console.log(d3.event.pageX + " : " + d3.event.pageY) 
                    
                        d3.select(this).style('opacity',"0.6");
                          
                        //This will plot the quintile stacked bar graphs 
                        plotQuintuleBars( d.properties , variablePresent );

                        if(d.properties.ST_NM == "Andhra Pradesh"){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                            MainHeading.text( d.properties.DISTRICT +" (Andhra Pradesh*)")
                            //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                        }else 
                        if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                             //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                             MainHeading.text( d.properties.DISTRICT +" (Delhi)")
                            //InfoStateName.text("Delhi".toUpperCase())
                        }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                            MainHeading.text( d.properties.DISTRICT +" (Arunachal Pradesh)")
                            //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                        }else{
                            MainHeading.text( d.properties.DISTRICT +" (" + d.properties.ST_NM +")")
                            //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                        }
                    }
                    
                }).on('mouseout',function(d){
                    
                    
                    
                    if( checkEnabled == 0 ){
                        
                        MainHeading.text("INDIA")
                        d3.select(this).style('opacity',"1")
                        var tooltip = $('#mapTooltip');
                        tooltip.hide();
                        
                        //Plot nation wise quintles
                        plotQuintuleBars( dataINCOMENation[0] , variablePresent , "nation");
                        
                        for( var prop in variablePresent ){
                        if( variablePresent.hasOwnProperty(prop) ){
                            if(variablePresent[prop] !== null ){

                                $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[variablePresent[prop]].description.main_head);
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + " %" );

                                for( var i = 1; i<=5 ; i++){
                                    d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                                      //.transition()
                                      //.duration(100)
                                      .style('width',function(){

                                            if( dataINCOMENation[0][variablePresent[prop] + "_Q"+i+"_nation"] == undefined ){
                                                    return 0 +'%';
                                            }else{
                                                return ( parseFloat(dataINCOMENation[0][ variablePresent[prop] + "_Q"+i+"_nation" ])*100 ).toFixed(1) + '%';
                                            }
                                    })
                                }
                            }
                        }
                      }
                        
                    }
                   
                })
                .on('click',function(d){
                   
                    
                })
            
               /**/
              
         }
        
        function dynamicPlotPercentageStates()
           {
               console.log("Plotting India State map");
               
                MainHeading.text(plotVarDef[plotVar.v].description.main_head)
               
                if( canvas ){
                    canvas.clear();
                }
                
                //Cleared the div
                $("#chart-area").empty();
                
                canvas = d3.select('#chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
               
                console.log("Canvas created!!!");
               
                var linearScale = d3.scale.linear()
                              .domain([0,5,15,20,30])
                              .range(["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"]);
                            

                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                               .scale([width*1.1*1]);
               
                var centered,zoomState=0;
                var pathState = d3.geo.path().projection(projectionState);
            
                var g = canvas.append("g");
               
                IndiaStateOutlineMap = g.append("g")
                        .selectAll("path")
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0)
                        .attr("class", "states")
                        .attr('stroke', 'white')
                        .attr('style', 'cursor:pointer')
                        .style('fill',function(d,i){
                           if(d == undefined || d.properties[plotVar.v] == undefined){
                                return '#000';
                            }else{
                                return linearScale(parseFloat( d.properties[plotVar.v]*100 ) );
                            }
                         })
                 
              IndiaStateOutlineMap
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
        
        //This one is used for plotting
        function dynamicPlotINDIA_Comp()
        {
                var checkEnabled = 0;
                
                $("#main_nfhs_cat_head").text(plotVarDef[plotVar.v].description.main_head);
                
                //Show nfhs selection option
                $("#nfhs_selection").show();
                
                MainHeading.text("India");
                
                quartileValuesLocal = quartileBounds(quartileDataLocal)
                console.log( "Quintile data values : ", quartileValuesLocal);
                
                var colorArrayLow = ["#ffdecc","#ffbc99","#ff9b66","#ff7933","#ff6513"];
                var colorArrayHigh = ["#ffe0e3","#ffa2aa","#ff6270","#ff1b2f","#ff0016"];
                var colorArrayHealthy = ["#e5f7e0","#b6e8a9","#7dd666","#39c015","#27ba00"];
                var colorArrayElevated = ["#ffcce4","#ff99c9","#ff66ae","#ff3393","#ff0078"];
                var colorArraySevere = ["#ffccfe","#ff99fe","#ff66fd","#ff33fd","#ff00fc"];
                
                var currentColorArray = ["#FEE9EB","#FDE0E1","#FA8E94","#F83539","#F82714"];
                
                if(currentCategoryPlot.split("_")[0] == "l" || currentCategoryPlot.split("_")[0] == "dk"){
                         currentColorArray = colorArrayLow;
                }else if(currentCategoryPlot.split("_")[0] == "h" || currentCategoryPlot.split("_")[0] == "t"){
                         currentColorArray = colorArrayHealthy;
                }else if(currentCategoryPlot.split("_")[0] == "hh" || currentCategoryPlot.split("_")[0] == "p" ){
                         currentColorArray = colorArrayHigh;
                }else if(currentCategoryPlot.split("_")[0] == "hhh" ){
                         currentColorArray = colorArrayElevated;
                }else if(currentCategoryPlot.split("_")[0] == "hhhh" ){
                         currentColorArray = colorArraySevere;
                }   
              
                var linearScale = d3.scale.linear()
                              .domain(
                                  [
                                      0, 
                                      parseFloat(quartileValuesLocal[0])*100,
                                      parseFloat(quartileValuesLocal[1])*100,
                                      parseFloat(quartileValuesLocal[2])*100,
                                      parseFloat(quartileValuesLocal[3])*100
                                  ]
                              )
                              .range(currentColorArray);
            
                var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
                
                /*var linearScale = d3.scale.linear()
                              .domain([0,0.37,0.75,1.2,1.8])
                              .range(["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"]);
                
                var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];*/
                var rangeArr = [0,1.8]
                
                //Getting the legend
                plotContinuousLegend(rangeArr, currentColorArray);
                
                var projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                if( IndiaStateCanvas ){
                    IndiaStateCanvas.remove();
                }
                
                IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"white")
                
                
                var g = IndiaStateCanvas.append("g");
                
                //var getCentroidObject = {};
                var sampleName = "";
                IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0)
                        .attr('stroke', 'white')
                        .attr('style', 'cursor:pointer')
                        .style('fill',function(d,i){
                        
                           /*Needed one time to the centroid for the state maps*/
                           //sampleName = pathState.centroid(d)[0].toFixed(0) + "|" + pathState.centroid(d)[1].toFixed(0);
                           //getCentroidObject[sampleName] = d.properties.ST_NM;
                        
                           if(d == undefined || d.properties[plotVar.v] == undefined){
                                return '#000';
                            }else{
                                //console.log( parseFloat( d.properties[plotVar.v]*100 ) );
                                return linearScale(parseFloat( d.properties[plotVar.v]*100 ) );
                            }
                         })
                //console.log(" Centroid Object Created : ",getCentroidObject);
            
               //Show the legends
               $("#nfhs_map_legend").show();
               $("#nfhs_info_box_legend").show();
                
                var variablePresent = {
                    low : null,
                    healthy : null,
                    high : null,
                    elevated : null,
                    severe : null,
                    present : null,
                    dont_know : null,
                    treated : null
                }
                
                //Information box 
                var magnitudeVariation = {
                    low : 1,
                    healthy : 2,
                    high : 3,
                    elevated : 4,
                    severe : 5,
                    present : 1,
                    dont_know : 2,
                    treated : 3
                }
            
                //Get the apoVar listing
                apiVAR.forEach(function(d2,i){

                    if(d2.data_var != undefined){

                        //Condition 
                        if( d2.data_var.split("_")[0] == "l"){
                            variablePresent.low = d2.data_var;
                        }else if(d2.data_var.split("_")[0] == "h"){
                            variablePresent.healthy = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hh"){
                            variablePresent.high = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hhh"){
                            variablePresent.elevated = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "hhhh"){
                            variablePresent.severe = d2.data_var;     
                        }
                        //Disease 
                        else if(d2.data_var.split("_")[0] == "p"){
                            variablePresent.present = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "dk"){
                            variablePresent.dont_know = d2.data_var;     
                        }else if(d2.data_var.split("_")[0] == "t"){
                            variablePresent.treated = d2.data_var;     
                        }
                    }
                });
            
                globalVariablePresent = variablePresent;
            
                //Change the vsisbility of the Information box divs
                if( variablePresent.low == null && variablePresent.present == null ){
                    $("#magnitude_1_div").hide();
                    $("#magnitude_head_1").hide();
                    $("#c1").hide();
                }else{
                    $("#magnitude_1_div").show();
                    $("#magnitude_head_1").show();
                    $("#c1").show();
                    
                    //Change the headers
                    $("#magnitude_head_1").text( variablePresent.low != null?"Low":"Present" )
                }

                if( variablePresent.healthy == null && variablePresent.dont_know == null ){
                    $("#magnitude_2_div").hide();
                    $("#magnitude_head_2").hide();
                    $("#c2").hide();
                }else{
                    $("#magnitude_2_div").show();
                    $("#magnitude_head_2").show();
                    $("#c2").show();
                    
                    //Change the headers
                    $("#magnitude_head_2").text( variablePresent.healthy != null?"Healthy":"Don't Know" )
                }

                if( variablePresent.high == null && variablePresent.treated == null){
                    $("#magnitude_3_div").hidw();
                    $("#magnitude_head_3").hide();
                    $("#c3").hide();
                }else{
                    $("#magnitude_3_div").show();
                    $("#magnitude_head_3").show();
                    $("#c3").show();
                    
                    //Change the headers
                    $("#magnitude_head_3").text( variablePresent.high != null?"High":"Treated" )
                }

                if( variablePresent.elevated == null ){
                    $("#magnitude_4_div").hide();
                    $("#magnitude_head_4").hide();
                    $("#c4").hide();
                }else{
                    $("#magnitude_4_div").show();
                    $("#magnitude_head_4").show();
                    $("#c4").show();
                    
                    //Change the headers
                    $("#magnitude_head_4").text( "Elevated" )
                }

                if( variablePresent.severe == null ){
                    $("#magnitude_5_div").hide();
                    $("#magnitude_head_5").hide();
                    $("#c5").hide();
                }else{
                    $("#magnitude_5_div").show();
                    $("#magnitude_head_5").show();
                    $("#c5").show();
                    
                    //Change the headers
                    $("#magnitude_head_5").text( "Severe" )
                }
                
                //Initial data setup
                for( var prop in variablePresent ){
                    if( variablePresent.hasOwnProperty(prop) ){
                        if(variablePresent[prop] !== null ){
                            
                            $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[variablePresent[prop]].description.main_head);
                            $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + " %" );

                            for( var i = 1; i<=5 ; i++){
                                d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                                  //.transition()
                                  //.duration(100)
                                  .style('width',function(){

                                        if( dataINCOMENation[0][variablePresent[prop] + "_Q"+i+"_nation"] == undefined ){
                                                return 0 +'%';
                                        }else{
                                            return ( parseFloat(dataINCOMENation[0][ variablePresent[prop] + "_Q"+i+"_nation" ])*100 ).toFixed(1) + '%';
                                        }
                                })
                            }
                        }
                    }
                  }
             
                $("#district_smart_search").on( 'keyup',function(){
                    var filter = $(this).val().toUpperCase();
                    var list = "";
                    console.log(filter);
                    
                    var serachList = $("#district_smart_search_result");
                    console.log( serachList )
                    
                    stateCollection.forEach(function(d){
                        if(d.toUpperCase().indexOf(filter) != -1 ){
                           list += '<li><a class="STATE_DROP display_c" onclick="getState(' + "'" +d+ "'" +')" name="'+ d +'" style="cursor:pointer;">'+d+'</a></li>';
                        }
                    })

                    $("#district_smart_search_result").html(list);
                 })
                
                
                plotSpecificDist.selectedState = function(state){
                    console.log("This is function call for "+ state + " in plotNFHS.");
                    //if(checkEnabled == 0){
                    
                        
                          if( state == "India" ){
                              IndiaStateOutlineMap
                              .attr('stroke', 'white')
                              .style('fill',function(d2){
                                    if(d2 == undefined || d2.properties[plotVar.v] == undefined){
                                        return '#000';
                                    }else{
                                        return linearScale(parseFloat( d2.properties[plotVar.v]*100 ) );
                                    }
                              })
                              
                              $("#main-head-box").show();
                              $("#state_district_selection_box").hide();
                              $("#main-head").text(state);
                              $("#district_smart_search").text(state );
                              checkEnabled = 0;
                          }else{
                              IndiaStateOutlineMap
                              .attr('stroke', 'white')
                              .style('fill',function(d2){
                                    console.log(d2.properties.ST_NM );
                                    if( state == d2.properties.ST_NM ){
                                          plotQuintileGraphs( d2.properties , variablePresent);
                                          return linearScale(parseFloat( d2.properties[plotVar.v]*100 ) );
                                    }else{
                                        return "#eee";
                                    }
                              })
                              
                              $("#main-head-box").show();
                              $("#state_district_selection_box").hide();
                              $("#main-head").text(state);
                              $("#district_smart_search").text(state );
                              checkEnabled = 1;
                          }
                          
                        
                }
                
                                //Remove all the arrow
                $(".arrow_indicator").hide();
            
                //Remove the highlight class
                for( var i=1;i<=5;i++ ){
                    $("#magnitude_"+ i +"_sub_div").attr('style',   "color:#000;");
                    $("#magnitude_"+ i +"_name").removeClass("magnitude_highlight");
                }
                
                //Updating the header colors
                if(currentCategoryPlot.split("_")[0] == "dk" ){
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayLow[4]);
                         $("#arrow_2").css("color",colorArrayLow[4]);
                    
                         $("#magnitude_2_sub_div").attr('style',"color:"+colorArrayLow[4])
                         $("#magnitude_2_name").addClass("magnitude_highlight");
                         $("#arrow_2").show();
                    
                        
                }else if(currentCategoryPlot.split("_")[0] == "t" ){
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayHealthy[4]);
                         $("#arrow_3").css("color",colorArrayHealthy[4]);
                    
                         $("#magnitude_3_sub_div").attr('style',"color:"+colorArrayHealthy[4])
                         $("#magnitude_3_name").addClass("magnitude_highlight");
                         $("#arrow_3").show();
                }else if(currentCategoryPlot.split("_")[0] == "p" ){
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayHigh[4]);
                         $("#arrow_1").css("color",colorArrayHigh[4]);
                    
                         $("#magnitude_1_sub_div").attr('style',"color:"+colorArrayHigh[4])
                         $("#magnitude_1_name").addClass("magnitude_highlight");
                         $("#arrow_1").show();
                }
               
                //Defining the magnitude based change in the variable
                /*$(".MAGNITUDE_HEADER").on('click',function(){
                    var newPlotVar = "";
                    if($(this).attr('value') == 1){
                        if( variablePresent.low != undefined ){
                            newPlotVar = variablePresent.low;
                        }else{
                            newPlotVar = variablePresent.present;
                        }
                    }else if($(this).attr('value') == 2){
                        if( variablePresent.healthy != undefined ){
                            newPlotVar = variablePresent.healthy;
                        }else{
                            newPlotVar = variablePresent.dont_know;
                        }   
                    }else if($(this).attr('value') == 3){
                        if( variablePresent.high != undefined ){
                            newPlotVar = variablePresent.high;
                        }else{
                            newPlotVar = variablePresent.treated;
                        }   
                    }else if($(this).attr('value') == 4){
                        newPlotVar = variablePresent.elevated;
                    }else if($(this).attr('value') == 5){
                       newPlotVar = variablePresent.severe;
                    }
                    //Now begin the plotting of the file
                    currentCategoryPlot = newPlotVar;
                    console.log( newPlotVar );
                    
                    //Show the chnahe with a pointer
                    //d3.select("body").attr('style', 'cursor:progress');
                    function_container.categoryselect(currentStatePlot, currentCategoryPlot);
                    
                });*/
                
                IndiaStateOutlineMap
                   .on('mouseover',function(d){
                    
                      //console.log(" Cordinates (X,Y) : " + ( d3.event.pageX ) +" , "+ ( d3.event.pageY ) );
                    
                      if( checkEnabled == 0 ){
                          
                          
                        if( variablePresent.low == null && variablePresent.present == null ){
                        }else{
                            $("#c1").text((d.properties[variablePresent.low!=null?variablePresent.low:variablePresent.present] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.healthy == null && variablePresent.dont_know == null ){
                        }else{
                           $("#c2").text((d.properties[variablePresent.healthy!=null?variablePresent.healthy:variablePresent.dont_know] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.high == null && variablePresent.treated == null){
                        }else{
                            $("#c3").text((d.properties[variablePresent.high!=null?variablePresent.high:variablePresent.treated] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.elevated == null ){
                        }else{
                             $("#c4").text((d.properties[ variablePresent.elevated ] *100 ).toFixed(1) + "%" );
                        }

                        if( variablePresent.severe == null ){
                        }else{
                            $("#c5").text((d.properties[ variablePresent.severe ] *100 ).toFixed(1) + "%" );
                        }
                       
                        //$("#mapToolTipDist").text(d.properties.DISTRICT);
                        //$("#mapToolTipState").text(d.properties.ST_NM);

                        /*var tooltip = $('#mapTooltip');
                        tooltip.show();
                        d3.select('#mapTooltip').style("left", (d3.event.pageX ) + "px")   
                        d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")*/
                          
                        //console.log(d3.event.pageX + " : " + d3.event.pageY) 
                    
                        d3.select(this).style('opacity',"0.6");
                          
                        //This will plot the quintile row graphs 
                        plotQuintileGraphs( d.properties , variablePresent );

                        if(d.properties.ST_NM == "Andhra Pradesh"){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                            MainHeading.text( " Andhra Pradesh*")
                            //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                        }else 
                        if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                             //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                             MainHeading.text("Delhi")
                            //InfoStateName.text("Delhi".toUpperCase())
                        }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                            MainHeading.text("Arunachal Pradesh")
                            //InfoStateName.text("Arunachal Pradesh".toUpperCase())
                        }else{
                            MainHeading.text(d.properties.ST_NM)
                            //InfoStateName.text(d.properties.ST_NM.toUpperCase())
                        }
                    }
                    
                }).on('mouseout',function(d){
                    
                    if( checkEnabled == 0 ){
                        
                        MainHeading.text("INDIA")
                        d3.select(this).style('opacity',"1")
                        var tooltip = $('#mapTooltip');
                        tooltip.hide();
                        
                        for( var prop in variablePresent ){
                        if( variablePresent.hasOwnProperty(prop) ){
                            if(variablePresent[prop] !== null ){

                                $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[variablePresent[prop]].description.main_head);
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + " %" );

                                for( var i = 1; i<=5 ; i++){
                                    d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                                      //.transition()
                                      //.duration(100)
                                      .style('width',function(){

                                            if( dataINCOMENation[0][variablePresent[prop] + "_Q"+i+"_nation"] == undefined ){
                                                    return 0 +'%';
                                            }else{
                                                return ( parseFloat(dataINCOMENation[0][ variablePresent[prop] + "_Q"+i+"_nation" ])*100 ).toFixed(1) + '%';
                                            }
                                     })
                                 }
                             }
                          }
                       }
                        
                    }
                   
                })
                .on('click',function(d){
                   
                    if(checkEnabled == 0){
                          
                          IndiaStateOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',function(d2){
                                if( d.properties.ST_NM == d2.properties.ST_NM ){
                                    return linearScale(parseFloat( d2.properties[plotVar.v]*100 ) );
                                }else{
                                    return "#eee";
                                }
                          })
                          //Show magnitude table only when the cursor stops
                          d3.select('#mapTooltip').style("top", (d3.event.pageY - 120) + "px")
                          d3.select("#mapTooltip").style('height',"100px")
                          $("#magnitudeTable").show()
                        
                          //This will plot the quintile row graphs 
                          plotQuintileGraphs( d.properties , variablePresent );
                        
                          checkEnabled = 1;
                          $("#district_smart_search").text(d2.properties.ST_NM );
                        
                    }else if(checkEnabled == 1){
                        
                          IndiaStateOutlineMap
                          .attr('stroke', 'white')
                          .style('fill',function(d,i){
                           if(d == undefined || d.properties[plotVar.v] == undefined){
                                return '#000';
                            }else{
                                return linearScale(parseFloat( d.properties[plotVar.v]*100 ) );
                            } 
                         })
                        //Hide magnitude table only when the cursor moves
                        d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")
                        d3.select("#mapTooltip").style('height',"35px")
                        $("#magnitudeTable").hide()
                        checkEnabled = 0;
                        IndiaStateCanvas.attr('style', 'cursor:auto');
                        $("#district_smart_search").text("India");
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
                        .attr('stroke-width', 0)
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
                   
                     
                    var linearScale = d3.scale.linear()
                              .domain([-50,25,0,25,50])
                              .range(["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"]);
                    
                    if(d == undefined || d.properties[plotVar.v]== undefined){
                        return color_PHC_shortage_STATE_2011[4];
                    }
                    else{ 
                        //Changing the formula to {(Existing - Desired) / Desired}
                        if(d.properties[sht] > 0){
                            if(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return linearScale( ((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) );
                                //return plotVarDef[plotVar.v].limit.l4.c;
                            }else{
                                return linearScale( ((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) );
                                //return plotVarDef[plotVar.v].limit.l3.c;
                            }
                        }
                        else if(d.properties[sht] <= 0){
                            if(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return linearScale( ((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0) );
                                //return plotVarDef[plotVar.v].limit.l2.c;
                            }else{
                                return linearScale( ((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0) );
                                //return plotVarDef[plotVar.v].limit.l1.c;
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
                
                if(nfhsPlotEnable == 0){
                    $("#nfhs_selection").hide();
                }else{
                    $("#nfhs_selection").show();
                }
                
                var linearScale = d3.scale.linear()
                              .domain([0,5,15,20,30])
                              .range(["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"]);
                
                
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
                    .attr('stroke-width', 0)
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
                            }else{
                                return linearScale(parseFloat(d.properties[plotVar.v]));
                            }
                            /*else if( parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l4.l && parseFloat(d.properties[plotVar.v])<plotVarDef[plotVar.v].limit.l4.r){
                                return plotVarDef[plotVar.v].limit.l4.c;
                            }else if(parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l3.l && parseFloat(d.properties[plotVar.v]) <=plotVarDef[plotVar.v].limit.l3.r){
                                return plotVarDef[plotVar.v].limit.l3.c;
                            }else if(parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l2.l && parseFloat(d.properties[plotVar.v])<=plotVarDef[plotVar.v].limit.l2.r){
                                return plotVarDef[plotVar.v].limit.l2.c;
                            }else if(parseFloat(d.properties[plotVar.v]) >=plotVarDef[plotVar.v].limit.l1.l ){
                                return plotVarDef[plotVar.v].limit.l1.c;
                            }else{
                                return '#000'
                            }*/
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