var fs = require('fs');

var sampleObj = {};

var data, rowObject, mObj = {};

var newSample = "";


/*var STATE_TO_INIT_MAP = {
    "Jammu & Kashmir" : "JK",
    "Himachal Pradesh" : "HP",
    "Punjab" : "PB",
    "Chandigarh" : "Chandigarh",
    "Uttarakhand" : "UK",
    "Haryana" : "HR",
    "Delhi" : "DL",
    "Rajasthan" : "RJ" ,
    "Uttar Pradesh" : "UP" ,
    "Bihar" : "BR",
    "Sikkim" : "SK",
    "Arunachal Pradesh" : "AR",
    "Nagaland" : "NL" , 
    "Manipur" : "MN",
    "Tripura" : "TR",
    "Meghalaya" : "ML",
    "Assam" : "AS",
    "West Bengal" : "WB",
    "Jharkhand" : "JH",
    "Odisha" : "OR",
    "Chhattisgarh" : "CG",
    "Madhya Pradesh" : "MP",
    "Gujarat" : "GJ", 
    "Maharashtra" : "MH",
    "Telangana" : "TL",
    "Andhra Pradesh" : "AP",
    "Karnataka" : "KA",
    "Goa" : "GA",
    "Kerala" : "KL",
    "Tamil Nadu ": "TN",
    "A & N Islands" : "AN",
    "Pondicherry" : "PY"
}


//Get the collection name for the distrct
var distrcit = [];
var states = [];
var rowObject = [];
var sampleStr = "";
fs.readFile('../assets/data/regionCollection.csv', 'utf8', function (error, data) {

   data = data.split("\n");
   data.forEach( function(d,i){
       if( i!=0 )
       {
           rowObject = d.split(",");
           sampleStr = "";
           sampleStr = rowObject[2].trim() +"("+ STATE_TO_INIT_MAP[rowObject[1]] +")";
           distrcit.push(sampleStr);
       }
     })
    
    fs.writeFile(__dirname + "/regionCollected.txt", JSON.stringify(distrcit), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Saved");
     });
});*/

/*fs.readFile('../assets/data/upadted/condition_s.csv', 'utf8', function (error, data) {
   
    if( error){
        console.log(error)
    }else{
        
        data = data.split('\n');
        rowObject = data[0].split(',');
        if(rowObject[0] == ""  ){
            console.log("Blank row present");
        }
        console.log("check : ",data[1][0]);
    }
});*/

fs.readFile('../assets/data/nfhsAssets/nfhsdictionary.csv', 'utf8', function (error, data) {
    //console.log(data);
    data = data.split('\n');
    data.forEach(function (d, i) {

        rowObject = d.split(',');

        mObj["reqVar"] = [];

        mObj["reqVar"].push({
            v: rowObject[0]
        });
        mObj["plotVar"] = {
            v: rowObject[0]
        }
        mObj["denom_head"] = "Denominator";
        mObj["num_head"] = "Numerator";
        mObj["plotType"] = "nfhs_percent";
        mObj["plot_division"] = "nfhs";

        sampleObj[rowObject[0]] = mObj;

        mObj = {};

    });
    console.log(JSON.stringify(sampleObj));

});



/*fs.readFile('../assets/data/nfhsAssets/nfhsdictionary.csv','utf8',function(error, data){
    data = data.split('\n');
    data.forEach( function(d,i){
        
        rowObject = d.split(',');
        mObj["limit"] = {};
        mObj["limit"] = {
               l1 : {
                l : 0, r : .05 , c : "#045A8D" , head : ""
                },
                l2 : {
                    l : .06, r : .20 , c : "#2B8CBE" , head : ""
                }, 
                l3 : {
                    l : .21, r : .40 , c : "#FFC107" , head : ""
                },
                l4 : {
                    l : .41, r : 1 , c : "#E65100" , head : ""
                }
        };
        mObj["description"] = {};
        mObj["description"] = {
                main_head : rowObject[2] ,
                category_head : "",
                leg_head : "",
                desc : ""
        }
        
        sampleObj[ rowObject[0] ] = mObj;
        
        mObj = {};
        
    });
    console.log(JSON.stringify(sampleObj));
    
});*/

//Finding the gender array, category array , magnitude array

/*var mainArr = {};
var genArr = [], region = [] , magnitude = [];
var id = "" , property = "";
fs.readFile('../assets/data/finaldata/nfhsdictionary.csv', 'utf8', function (error, data) {
    //console.log(data);
    data = data.split('\n');
    data.forEach(function (d, i) {
        property = "";
        rowObject = d.split(',');
        id = rowObject[0];
        id = id.split("_");
        if(id.length == 3){
            for(var i=0;i<id.length -2 ;i++){
                property += id[i]+"_";
            }
        }else{
            for(var i=1;i<id.length -2 ;i++){
                property += id[i]+"_";
            }
        }
        
        property = property.substring(0,property.length-1);
        if( mainArr[property] == undefined ){
              mainArr[property] = {
                        gender : [],
                        region : [],
                        magnitude : []
                    };
        }
        if( id.length == 3 ){
            if( mainArr[property].magnitude.indexOf( "" ) == -1){
                mainArr[property].magnitude.push( "" );
            }
        }else{
            if( mainArr[property].magnitude.indexOf( id[0] ) == -1){
                mainArr[property].magnitude.push( id[0] );
            }
        }
        if( mainArr[property].magnitude.indexOf( id[0] ) == -1){
            mainArr[property].magnitude.push( id[0] );
        }
        if( mainArr[property].gender.indexOf( id[ id.length -1 ] ) == -1){
            mainArr[property].gender.push( id[ id.length -1 ]  );
        }
        if( mainArr[property].region.indexOf( id[ id.length -2 ] ) == -1){
            mainArr[property].region.push( id[ id.length -2 ] );
        }
        
    });
    console.log(JSON.stringify(mainArr));

});*/
