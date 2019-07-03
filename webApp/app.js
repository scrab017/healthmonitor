var function_container = {};
var nfhsPlotEnable = 0;

/*  NFHS Data categorization  */

/* Exception to be added for NFHS*/
/*
    low_hemoglobin : anemia
*/

//Global definition for the legend
var continuousLegend;

var meternalSelect = 0;

//This defines the type of map to be plotted : 1 => condition Priority ; 2 => income prioroty
var conditionPriorityMap = 1;

var dataCollectSunBurst = {};

var nfhsTitleGenderSelections = " ";

var nfhsTitleRegionSelections = " ";

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

var globalVariablePresent = {
    
};

var dropDownDisease = {
    
};

var dropDownCondition = {
    "bmi" : "BMI",
    "hemoglobin": "Haemoglobin (only Females)",
    "glucose" : "Glucose",
    "bp" : "Blood Pressure",
    "cbp" : "Cuff BP",
    "cancer" : "Cancer",
    "asthma" : "Asthma",
    "diabetes" : "Diabetes",
    "thyroid" : "Thyroid",
    "heart" : "Heart"
};

var districtCollection = [
    "Kupwara(JK)",
    "Badgam(JK)","Leh (ladakh) (JK)","Kargil(JK)","Punch(JK)","Rajouri(JK)","Kathua(JK)","Baramula(JK)","Bandipora(JK)","Srinagar(JK)","Ganderbal(JK)","Pulwama(JK)","Shopian(JK)","Anantnag(JK)","Kulgam(JK)","Doda(JK)","Ramban(JK)","Kishtwar(JK)","Udhampur(JK)","Reasi(JK)","Jammu(JK)","Samba(JK)","Chamba(HP)","Kangra(HP)","Lahul Spiti(HP)","Kullu(HP)","Mandi(HP)","Hamirpur(HP)","Una(HP)","Bilaspur(HP)","Solan(HP)","Sirmaur(HP)","Shimla(HP)","Kinnaur(HP)","Gurdaspur(PB)","Kapurthala(PB)","Jalandhar(PB)","Hoshiarpur(PB)","Shahid Bhagat Singh Nagar(PB)","Fatehgarh Sahib(PB)","Ludhiana(PB)","Moga(PB)","Firozpur(PB)","Muktsar(PB)","Faridkot(PB)","Bathinda(PB)","Mansa(PB)","Patiala(PB)","Amritsar(PB)","Tarn Taran(PB)","Rupnagar(PB)","Sahibzada Ajit Singh Nagar(PB)","Sangrur(PB)","Barnala(PB)","Chandigarh(Chandigarh)","Uttarkashi(UK)","Chamoli(UK)","Rudraprayag(UK)","Tehri Garhwal(UK)","Dehradun(UK)","Garhwal(UK)","Pithoragarh(UK)","Bageshwar(UK)","Almora(UK)","Champawat(UK)","Nainital(UK)","Udham Singh Nagar(UK)","Hardwar(UK)","Panchkula(HR)","Ambala(HR)","Yamunanagar(HR)","Kurukshetra(HR)","Kaithal(HR)","Karnal(HR)","Panipat(HR)","Sonipat(HR)","Jind(HR)","Fatehabad(HR)","Sirsa(HR)","Hisar(HR)","Bhiwani(HR)","Rohtak(HR)","Jhajjar(HR)","Mahendragarh(HR)","Rewari(HR)","Gurgaon(HR)","Mewat(HR)","Faridabad(HR)","Palwal(HR)","North West(DL)","North(DL)","North East(DL)","East(DL)","New Delhi(DL)","Central(DL)","West(DL)","South West(DL)","South(DL)","Ganganagar(RJ)","Hanumangarh(RJ)","Bikaner(RJ)","Churu(RJ)","Jhunjhunun(RJ)","Alwar(RJ)","Bharatpur(RJ)","Dhaulpur(RJ)","Karauli(RJ)","Sawai Madhopur(RJ)","Dausa(RJ)","Jaipur(RJ)","Sikar(RJ)","Nagaur(RJ)","Jodhpur(RJ)","Jaisalmer(RJ)","Barmer(RJ)","Jalor(RJ)","Sirohi(RJ)","Pali(RJ)","Ajmer(RJ)","Tonk(RJ)","Bundi(RJ)","Bhilwara(RJ)","Rajsamand(RJ)","Dungarpur(RJ)","Banswara(RJ)","Chittaurgarh(RJ)","Kota(RJ)","Baran(RJ)","Jhalawar(RJ)","Udaipur(RJ)","Pratapgarh(RJ)","Saharanpur(UP)","Muzaffarnagar(UP)","Bijnor(UP)","Moradabad(UP)","Rampur(UP)","Jyotiba Phule Nagar(UP)","Meerut(UP)","Bagpat(UP)","Ghaziabad(UP)","Gautam Buddha Nagar(UP)","Bulandshahar(UP)","Aligarh(UP)","Mahamaya Nagar(UP)","Mathura(UP)","Agra(UP)","Firozabad(UP)","Mainpuri(UP)","Budaun(UP)","Bareilly(UP)","Pilibhit(UP)","Shahjahanpur(UP)","Kheri(UP)","Sitapur(UP)","Hardoi(UP)","Unnav(UP)","Lucknow(UP)","Rae Bareli(UP)","Farrukhabad(UP)","Kannauj(UP)","Etawah(UP)","Auraiya(UP)","Kanpur Dehat(UP)","Kanpur Nagar(UP)","Jalaun(UP)","Jhansi(UP)","Lalitpur(UP)","Hamirpur(UP)","Mahoba(UP)","Banda(UP)","Chitrakoot(UP)","Fatehpur(UP)","Pratapgarh(UP)","Kaushambi(UP)","Allahabad(UP)","Barabanki(UP)","Faizabad(UP)","Ambedkar Nagar(UP)","Sultanpur(UP)","Bahraich(UP)","Shrawasti(UP)","Balrampur(UP)","Gonda(UP)","Siddharth Nagar(UP)","Basti(UP)","Sant Kabir Nagar(UP)","Mahrajganj(UP)","Gorakhpur(UP)","Kushinagar(UP)","Deoria(UP)","Azamgarh(UP)","Maunathbhanjan(UP)","Ballia(UP)","Jaunpur(UP)","Ghazipur(UP)","Chandauli(UP)","Varanasi(UP)","Sant Ravidas Nagar(UP)","Mirzapur(UP)","Sonbhadra(UP)","Etah(UP)","Kashi Ram Nagar(UP)","Pashchim Champaran(BR)","Purba Champaran(BR)","Sheohar(BR)","Sitamarhi(BR)","Madhubani(BR)","Supaul(BR)","Araria(BR)","Kishanganj(BR)","Purnia(BR)","Katihar(BR)","Madhepura(BR)","Saharsa(BR)","Darbhanga(BR)","Muzaffarpur(BR)","Gopalganj(BR)","Siwan(BR)","Saran(BR)","Vaishali(BR)","Samastipur(BR)","Begusarai(BR)","Khagaria(BR)","Bhagalpur(BR)","Banka(BR)","Munger(BR)","Lakhisarai(BR)","Sheikhpura(BR)","Nalanda(BR)","Patna(BR)","Bhojpur(BR)","Buxar(BR)","Kaimur Bhabua(BR)","Rohtas(BR)","Aurangabad(BR)","Gaya(BR)","Nawada(BR)","Jamui(BR)","Jehanabad(BR)","Arwal(BR)","North(SK)","West(SK)","South(SK)","East(SK)","Tawang(AR)","West Kameng(AR)","East Kameng(AR)","Papum Pare(AR)","Upper Subansiri(AR)","West Siang(AR)","East Siang(AR)","Upper Siang(AR)","Changlang(AR)","Tirap(AR)","Lower Subansiri(AR)","Kurung Kumey(AR)","Dibang Valley(AR)","Lower Dibang Valley(AR)","Lohit(AR)","Anjaw(AR)","Mon(NL)","Mokokchung(NL)","Zunheboto(NL)","Wokha(NL)","Dimapur(NL)","Phek(NL)","Tuensang(NL)","Longleng(NL)","Kiphire(NL)","Kohima(NL)","Peren(NL)","Senapati(MN)","Tamenglong(MN)","Churachandpur(MN)","Bishnupur(MN)","Thoubal(MN)","Imphal West(MN)","Imphal East(MN)","Ukhrul(MN)","Chandel(MN)","Mamit(undefined)","Kolasib(undefined)","Aizawl(undefined)","Champhai(undefined)","Serchhip(undefined)","Lunglei(undefined)","Lawngtlai(undefined)","Saiha(undefined)","West Tripura(TR)","South Tripura(TR)","Dhalai(TR)","North Tripura(TR)","West Garo Hills(ML)","East Garo Hills(ML)","South Garo Hills(ML)","West Khasi Hills(ML)","Ri Bhoi(ML)","East Khasi Hills(ML)","Jaintia Hills(ML)","Kokrajhar(AS)","Dhubri(AS)","Goalpara(AS)","Barpeta(AS)","Marigaon(AS)","Nagaon(AS)","Sonitpur(AS)","Lakhimpur(AS)","Dhemaji(AS)","Tinsukia(AS)","Dibrugarh(AS)","Sibsagar(AS)","Jorhat(AS)","Golaghat(AS)","Karbi Anglong(AS)","Dima Hasao(AS)","Cachar(AS)","Karimganj(AS)","Hailakandi(AS)","Bongaigaon(AS)","Chirang(AS)","Kamrup(AS)","Kamrup Metropolitan(AS)","Nalbari(AS)","Baksa(AS)","Darrang(AS)","Udalguri(AS)","Darjiling(WB)","Jalpaiguri(WB)","Koch Bihar(WB)","Uttar Dinajpur(WB)","Dakshin Dinajpur(WB)","Maldah(WB)","Murshidabad(WB)","Birbhum(WB)","Barddhaman(WB)","Nadia(WB)","North Twenty Four Parganas(WB)","Hugli(WB)","Bankura(WB)","Puruliya(WB)","Haora(WB)","Kolkata(WB)","South Twenty Four Parganas(WB)","Paschim Medinipur(WB)","Purba Medinipur(WB)","Garhwa(JH)","Chatra(JH)","Kodarma(JH)","Giridih(JH)","Deoghar(JH)","Godda(JH)","Sahibganj(JH)","Pakaur(JH)","Dhanbad(JH)","Bokaro(JH)","Lohardaga(JH)","Purbi Singhbhum(JH)","Palamu(JH)","Latehar(JH)","Hazaribagh(JH)","Ramgarh(JH)","Dumka(JH)","Jamtara(JH)","Ranchi(JH)","Khunti(JH)","Gumla(JH)","Simdega(JH)","Pashchimi Singhbhum(JH)","Saraikela(JH)","Bargarh(OR)","Jharsuguda(OR)","Sambalpur(OR)","Deogarh(OR)","Sundargarh(OR)","Keonjhar(OR)","Mayurbhanj(OR)","Baleshwar(OR)","Bhadrak(OR)","Kendrapara(OR)","Jagatsinghpur(OR)","Cuttack(OR)","Jajapur(OR)","Dhenkanal(OR)","Anugul(OR)","Nayagarh(OR)","Khordha(OR)","Puri(OR)","Ganjam(OR)","Gajapati(OR)","Kandhamal(OR)","Baudh(OR)","Sonapur(OR)","Balangir(OR)","Nuapada(OR)","Kalahandi(OR)","Rayagada(OR)","Nabarangapur(OR)","Koraput(OR)","Malkangiri(OR)","Koriya(CG)","Surguja(CG)","Jashpur(CG)","Raigarh(CG)","Korba(CG)","Janjgir Champa(CG)","Bilaspur(CG)","Kabeerdham(CG)","Rajnandgaon(CG)","Durg(CG)","Raipur(CG)","Mahasamund(CG)","Dhamtari(CG)","Uttar Bastar Kanker(CG)","Bastar(CG)","Narayanpur(CG)","Dakshin Bastar Dantewada(CG)","Bijapur(CG)","Sheopur(MP)","Morena(MP)","Bhind(MP)","Gwalior(MP)","Datia(MP)","Shivpuri(MP)","Tikamgarh(MP)","Chhatarpur(MP)","Panna(MP)","Sagar(MP)","Damoh(MP)","Satna(MP)","Rewa(MP)","Umaria(MP)","Neemuch(MP)","Mandsaur(MP)","Ratlam(MP)","Ujjain(MP)","Shajapur(MP)","Dewas(MP)","Dhar(MP)","Indore(MP)","Khargone(MP)","Barwani(MP)","Rajgarh(MP)","Vidisha(MP)","Bhopal(MP)","Sehore(MP)","Raisen(MP)","Betul(MP)","Harda(MP)","Hoshangabad(MP)","Katni(MP)","Jabalpur(MP)","Narsinghpur(MP)","Dindori(MP)","Mandla(MP)","Chhindwada(MP)","Seoni(MP)","Balaghat(MP)","Guna(MP)","Ashok Nagar(MP)","Shahdol(MP)","Anuppur(MP)","Sidhi(MP)","SINGRAULI(MP)","Jhabua(MP)","Alirajpur(MP)","Khandwa(MP)","Burhanpur(MP)","Kachchh(GJ)","Banas Kantha(GJ)","Patan(GJ)","Mahesana(GJ)","Sabar Kantha(GJ)","Gandhinagar(GJ)","Ahmedabad(GJ)","Surendranagar(GJ)","Rajkot(GJ)","Jamnagar(GJ)","Porbandar(GJ)","Junagadh(GJ)","Amreli(GJ)","Bhavnagar(GJ)","Anand(GJ)","Kheda(GJ)","Panch Mahals(GJ)","Dahod(GJ)","Vadodara(GJ)","Narmada(GJ)","Bharuch(GJ)","The Dangs(GJ)","Navsari(GJ)","Valsad(GJ)","Surat(GJ)","Tapi(GJ)","Diu(undefined)","Daman(undefined)","Dadra and Nagar Haveli(undefined)","Nandurbar(MH)","Dhule(MH)","Jalgaon(MH)","Buldana(MH)","Akola(MH)","Washim(MH)","Amravati(MH)","Wardha(MH)","Nagpur(MH)","Bhandara(MH)","Gondiya(MH)","Gadchiroli(MH)","Chandrapur(MH)","Yavatmal(MH)","Nanded(MH)","Hingoli(MH)","Parbhani(MH)","Jalna(MH)","Aurangabad(MH)","Nashik(MH)","Thane(MH)","Brihan Mumbai(MH)","NA(undefined)","Raigarh(MH)","Pune(MH)","Ahmednagar(MH)","Bid(MH)","Latur(MH)","Osmanabad(MH)","Solapur(MH)","Satara(MH)","Ratnagiri(MH)","Sindhudurg(MH)","Kolhapur(MH)","Sangli(MH)","Adilabad(TL)","Nizamabad(TL)","Karimnagar(TL)","Medak(TL)","Hyderabad(TL)","Rangareddy(TL)","Mahabubnagar(TL)","Nalgonda(TL)","Warangal(TL)","Khammam(TL)","Srikakulam(AP)","Vizianagaram(AP)","Vishakapatnam(AP)","East Godavari(AP)","West Godavari(AP)","Krishna(AP)","Guntur(AP)","Prakasam(AP)","Sri Potti Sriramulu Nellore(AP)","YSR Kadapa(AP)","Kurnool(AP)","Anantapur(AP)","Chittoor(AP)","Belgaum(KA)","Bagalkote(KA)","Bijapur(KA)","Bidar(KA)","Raichur(KA)","Koppal(KA)","Gadag(KA)","Dharwad(KA)","Uttara Kannada(KA)","Haveri(KA)","Bellary(KA)","Chitradurga(KA)","Davanagere(KA)","Shimoga(KA)","Udupi(KA)","Chikmagalur(KA)","Tumkur(KA)","Bangalore(KA)","Mandya(KA)","Hassan(KA)","Dakshina Kannada(KA)","Kodagu(KA)","Mysore(KA)","Chamrajnagar(KA)","Gulbarga(KA)","Yadgir(KA)","Kolar(KA)","Chikkaballapur(KA)","Bangalore Rural(KA)","Ramanagar(KA)","North Goa(GA)","South Goa(GA)","Lakshadweep(undefined)","Kasaragod(KL)","Kannur(KL)","Wayanad(KL)","Kozhikode(KL)","Malappuram(KL)","Palakkad(KL)","Thrissur(KL)","Ernakulam(KL)","Idukki(KL)","Kottayam(KL)","Alappuzha(KL)","Pathanamthitta(KL)","Kollam(KL)","Thiruvananthapuram(KL)","Thiruvallur(TN)","Chennai(TN)","Kancheepuram(TN)","Vellore(TN)","Tiruvanamalai(TN)","Viluppuram(TN)","Salem(TN)","Namakkal(TN)","Erode(TN)","The Nilgiris(TN)","Dindigul(TN)","Karur(TN)","Tiruchirappalli(TN)","Perambalur(TN)","Ariyalur(TN)","Cuddalore(TN)","Nagapattinam(TN)","Thiruvarur(TN)","Thanjavur(TN)","Pudukkottai(TN)","Sivaganga(TN)","Madurai(TN)","Theni(TN)","Virudhunagar(TN)","Ramanathapuram(TN)","Thoothukudi(TN)","Tirunelveli(TN)","Kanniyakumari(PD)","Dharmapuri(PD)","Krishnagiri(PD)","Coimbatore(PD)","Tirupur(PD)","Yanam(PD)","Pondicherry(PD)","Mahe(PD)","Karaikal(undefined)","Nicobar(AN)","North and Middle Andaman(AN)","South Andaman(AN)"];

var stateCollection = [
    "Jammu & Kashmir"
    ,"Himachal Pradesh","Punjab","Chandigarh","Uttarakhand","Haryana","Delhi","Rajasthan","Uttar Pradesh","Bihar","Sikkim","Arunachal Pradesh","Nagaland","Manipur","Mizoram","Tripura","Meghalaya","Assam","West Bengal","Jharkhand","Odisha","Chhattisgarh","Madhya Pradesh","Gujarat","Daman & Diu","Dadra & Nagar Haveli","Maharashtra","NA","Telangana","Andhra Pradesh","Karnataka","Goa","Lakshadweep","Kerala","Tamil Nadu","Puducherry","A & N Islands","India"];

var plotSpecificDist = {};

function enableLoader() {
    document.getElementById("overlay").style.display = "block";
}

function disableLoader() {
    document.getElementById("overlay").style.display = "none";
}

function getDist(district){
    console.log("This is selected : "+district);
    plotSpecificDist.selctedDistrict(district);
}

function getState(state){
    console.log("This is selected : "+state);
    plotSpecificDist.selectedState(state);
}

propertiesOnInitialLoading();
function propertiesOnInitialLoading(){
    
    $("#nfhs_index_legend").hide();
    
    //Make the availability selected
    $("#AVL_RADIO").prop("checked",true);
    
    //Public health infra selected
    $("#H_C_D").addClass("selected-nav"); 
    
    //The initial map is Public Health center dist map, so no quality variable visible
    $("#HR").hide()
    $("#INFRA").hide()
    $("#SUPPLY").hide()
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
    //Table for district level income file with quintile division
    INCOME_Q_D : 0,
    //Table for state level income file with quintile division
    INCOME_Q_S : 0,
    //Table for nation level income file with quintile division
    INCOME_Q_N : 0,
    //Table for state level disease file
    DISEASE_S : 0,
    //Table for nation level disease file
    DISEASE_N : 0
}    

//Radio object
const radioObject = {
    availability : $("#AVL_DIV"),
    distance : $("#ACCESSIBILITY_DIV"),
    hr : $("#HR_RADIO_DIV"),
    infrastructure  : $("#INFRA_RADIO_DIV"),
    supply : $("#SUPPLY_RADIO_DIV"),
    region_select : $("#region_select"),
    gender_select : $("#gender_select"),
    meternity_select : $("#meternity_select"),
    distribution_select : $("#distribution_select"),
    big_state_select : $("#BIG_STATES_RADIO_DIV"),
    small_state_select : $("#SMALL_STATE_RADIO_DIV"),
    ut_state_select : $("#UT_STATE_RADIO_DIV")
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

fontSize = 9*(window.innerWidth)/screen.width;

var stateAPIData = null,STATEDistrictTopo=null,SaveData=null;

var MainHeading = d3.select('#main-head');
var MainHMISHead = d3.select('#main_hmis_cat_head');    

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

//Creating and loading the dropdown for the NFHS category 
var data, rowObject, list = "" , list2 = "";
    
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
    
    //This as no district map is available
    $("#India_state_radio_button").prop("checked",false);
    $("#India_dist_radio_button").prop("checked",true);
    
    //Show the dropdown for income when in condition
    //$("#income_group_dist").show();
    
    
    //Also change the radio selection
    $("#nfhs_cond").attr("checked",true);
    $("#nfhs_inc").attr("checked",false);
    
    //The distributed by selection should be there in condition selection only
    $("#income_group_dist").css("cursor","pointer");
    $("#income_group_dist").prop("disable",false);
    
    //Remove the highlight for PHI : REMOVED AT CATEGORY DROPDOWN, NFHS DISEASE, VITALS DROP, 
    $("#H_C_D").removeClass("selected-nav"); 
    
    console.log( $(this).attr('id') );
    console.log( $(this).attr('name') );
    console.log( nfshRegionIdentifier[$(this).attr('id')] );
    
    //Initiating the loader when selected
    enableLoader();
            
    plotDynamiCPlot( nfshRegionIdentifier[$(this).attr('id')] , $(this).attr('id') , $(this).attr('name'))
})

$(".NFHS_DISEASE_DROPDOWN_SELECT").on('click',function(){
    
    //This as no district map is available
    $("#India_state_radio_button").prop("checked",true);
    $("#India_dist_radio_button").prop("checked",false);
    
    //remove the dropdown for income when in disease
    $("#income_group_dist").css("cursor","not-allowed");
    $("#India").css("cursor","not-allowed");
    $("#income_group_dist").prop("disable",true);
    $("#India").prop("disable",true);
    
    //Remove the highlight for PHI : REMOVED AT CATEGORY DROPDOWN, NFHS DISEASE, VITALS DROP, 
    $("#H_C_D").removeClass("selected-nav"); 
    
    //Also change the radio selection
    $("#nfhs_cond").attr("checked",true);
    $("#nfhs_inc").attr("checked",false);
    
    //Initiating the loader when selected
    enableLoader();
    
    console.log( $(this).attr('id') );
    console.log( $(this).attr('name') );
    plotDynamiCPlot( nfshRegionIdentifier[$(this).attr('id')] , $(this).attr('id') , $(this).attr('name'))
})

//Change the header to smart search option
$("#main-head-box").on('click',function(){
    //if(conditionPriorityMap == 1 ){
        $("#main-head-box").hide();
        $("#state_district_selection_box").show();
        $("#district_smart_search").val("");
        
        if( nfhsDiseaseIdetifier == "DISEASE"  ){
           $("#district_smart_search").attr("placeholder","Enter state name...");
        }else{
           $("#district_smart_search").attr("placeholder","Enter district name...");
        }
    //}
})
$("#alternate_state_select").on('click',function(){
    //if(conditionPriorityMap == 1 ){
        $("#main-head-box").hide();
        $("#state_district_selection_box").show();
        $("#district_smart_search").val("");

        if( nfhsDiseaseIdetifier == "DISEASE"  ){
           $("#district_smart_search").attr("placeholder","Enter state name...");
        }else{
           $("#district_smart_search").attr("placeholder","Enter district name...");
        }
    //}
})
$("#alternate_header_select").on('click',function(){
    $("#main-head-box").show();
    $("#state_district_selection_box").hide();
})
//Defining the magnitude based change in the variable
$(".MAGNITUDE_HEADER").on('click',function(){
        
          console.log("Magnitude click identified!!");
    
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
    
            //Initiating the loader when selected
            enableLoader();
            
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
        nfhsTitleRegionSelections = "";
    }else{
        currentCategoryPlot = currentCategoryPlot+"_"+nfhsPropertyDescription[cat].region[0];
        if( nfhsPropertyDescription[cat].region[0] == "ru" ){
            nfhsTitleRegionSelections = " Rural";
        }else if( nfhsPropertyDescription[cat].region[0] == "ur" ){
            nfhsTitleRegionSelections = " Urban";
        }else{
            nfhsTitleRegionSelections = "";
        }
    }
    
    console.log("Category with region : "+currentCategoryPlot);
    
    //Set gender 
    if( nfhsPropertyDescription[cat].gender.indexOf("fe") != -1 ){
        
        if( mainCategoryIdentifier == 'thyroid' || mainCategoryIdentifier == 'cancer' ){
            currentCategoryPlot = currentCategoryPlot+"_"+"ma";
            nfhsTitleGenderSelections = " Male";
        }else{
            currentCategoryPlot = currentCategoryPlot+"_"+"fe";
            nfhsTitleGenderSelections = " Female";
        }
        
    }else{
        currentCategoryPlot = currentCategoryPlot+"_"+nfhsPropertyDescription[cat].gender[0];
        if( nfhsPropertyDescription[cat].gender[0] == "fe" ){
            nfhsTitleGenderSelections = " Female";
        }else if( nfhsPropertyDescription[cat].gender[0] == "ma" ){
            nfhsTitleGenderSelections = " Male";
        }else{
            nfhsTitleGenderSelections = "";
        }
    }
    
    console.log("Category with Gender : "+currentCategoryPlot);
    
    //Set magnitude
    currentCategoryPlot = nfhsPropertyDescription[cat].magnitude[0] +"_" +currentCategoryPlot;
    console.log("Category with Gender : "+currentCategoryPlot);
    
    //Check if pregnant and Non Pregnant options are available
    if( nfhsPropertyDescription[cat].gender.indexOf("pw") != -1 ){
        $("#all_mat").prop("checked",true);
        nfhsTitleGenderSelections = " Female";
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
    $("#all_mat").prop("checked",true);
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
            
            //Update the header value
            if( $(this).attr("value") == 'ru' ){
                nfhsTitleRegionSelections = " Rural"
            }else if( $(this).attr("value") == 'ur' ){
                nfhsTitleRegionSelections = " Urban"   
            }else{
                nfhsTitleRegionSelections = ""   
            }
            
            //Initiating the loader when selected
            enableLoader();
            
            //Now begin the plotting of the file
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#India-state-chart-area").hide();
            $("#chart-area").hide();
            
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
        
//        if( mainCategoryIdentifier == "cancer" &&  $(this).attr("value") == "fe"){
//            
//            console.log("This selection here");
//            
//            $("#nfhs_map_legend").show();
//            $("#nfhs_info_box_legend").show();
//            
//            //Change the checkbox
//            $("#"+$(this).attr("value")).prop('checked',false);
//            $("#"+currentCategoryPlot.split("_")[3]).prop('checked',true);
//            //Show message for non availability
//            console.log($(this).attr("value") +" is not available for " + mainCategoryIdentifier);
//            $("#snackbar").addClass('show');
//            $("#snackbar").text( $(this).attr("text") +" is not available for " + dropDownCondition[mainCategoryIdentifier] );
//            setTimeout(function(){  $("#snackbar").removeClass('show');   }, 3000);
//            
//        }else 
        if( nfhsPropertyDescription[mainCategoryIdentifier].gender.indexOf( $(this).attr("value") ) != -1 ){
            
            sampleArr = currentCategoryPlot.split("_");
            sampleArr[ sampleArr.length - 1 ] = $(this).attr("value");
            
            for( var  i = 0 ; i < sampleArr.length ; i++ ){
                sampleName += sampleArr[i]+"_";
            }
            
            currentCategoryPlot = sampleName.substring(0, sampleName.length-1);
            console.log(currentCategoryPlot);
            
            //Update the header value
            if( $(this).attr("value") == 'fe' ){
                nfhsTitleGenderSelections = " Female"
            }else if( $(this).attr("value") == 'ma' ){
                nfhsTitleGenderSelections = " Male"   
            }else{
                nfhsTitleGenderSelections = ""   
            }
            
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
             
            //Update the header value
            if( $(this).attr("value") == 'pw' ){
                nfhsTitleGenderSelections = " Pregnant Female"
            }else if( $(this).attr("value") == 'npw' ){
                nfhsTitleGenderSelections = " Non Pregnant Female"   
            }else{
                nfhsTitleGenderSelections = " Female"   
            }
             
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
              
             //console.log("Distribution unavilable");
             $("#snackbar").addClass('show');
             $("#snackbar").text( "Distribution unavailable" );
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
    
//Hover functonality on "State" dropdowns
$("#StateDrop").on('mouseover',function(){
    $(this).trigger('click')
})

var metArrCheck = ["p_jsy_anc","p_1trimester_anc","p_3chkups_anc","p_100ifa_anc","p_inst_delivery","p_safe_delivery",
             "p_w48h_chkup_delivery","p_b48h14d_chkup_delivery","p_tt2_anc"];
    
var AccessArray = ["SC_ACCESSIBILITY","PHC_ACCESSIBILITY","CHC_ACCESSIBILITY"];
    
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
        num_head : "PP Checkups within 48 hrs of Delivery",
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
        num_head : "PP Checkups from 48 hrs to 14 days of Delivery",
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
        num_head : "TT2 or Booster Given",
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
            main_head : "JSY Registrations",
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
            main_head : "First Trimester Registrations",
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
            main_head : "3 ANC Checkups Received",
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
            main_head : "100 IFA Given",
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
            main_head : "Institutional Deliveries",
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
            main_head : "Safe Deliveries",
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
            main_head : "Post-partum Checkups in <48 hrs.",
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
            main_head : "Post-partum Checkups within 2-14 days",
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
            main_head : "TT2 or Booster Given",
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
d3.json('./../../analysis/nfhs2Sample.json',function(err,data){
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
d3.json('./../../analysis/nfhsSample.json',function(err,data){
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

function loaderInit(){
    var prog_number = $("#loading_details");
    var width = 10;
    var id = setInterval(frame, 7);
    function frame() {
        if (width >= 100) {
            
        } else if( width >= 50){
          width++; 
          prog_number.html("Loading Data (" +( width) + "%)..");
        } else {
          width++; 
          prog_number.html("Preparing Map (" +( width) + "%)..");
        }
    }
}
plotMap(2);
function plotMap(geoCode,stateCode,MapCode){
    
    //This is to inform that first map selecetd is district wise map only
    $("#India_dist_radio_button").prop("checked",true);
    
    /*cleanup the area for the new map to be plotted*/
    MainHeading.text("Generating Map ...");
    d3.select("#legHead").text('');
    if(Map) Map.remove();
    if(canvas) canvas.remove();
    if(legendHead) legendHead.text("");
    d3.select('#CHC-LABEL').text("");
    if(outlineMap) outlineMap.remove();
    
    if(geoCode == 1){
        createNewIndiaMap();
    }else if(geoCode ==2){
        if(stateCode == null || MapCode == null)
        {
            generateStates("India",'PHC_AVL');
        }
        else
        {
            generateStates(stateCode,MapCode);
        }
    }
}

//loading the file that stores geoMercator(geolocation) and CSV file link for various states
d3.json('./../json/loadstate.json',function(err,data){
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

        //This is for the updation of radio , information box and legend
        function updatePageWidgets(){

        }

        $(".STATE_DROPDOWN_SELECT").on('click',function(){
            
            //Initiating the loader when selected
            enableLoader();
        
            nfhsPlotEnable = 0;
            stateDropDownSelect($(this).attr('id'),$(this).attr('name'));
        })
    
        function stateDropDownSelect(regionSelected,nameType){
            MainHeading.text("Generating Map ... ");
            $("#legHead").hide()

            //Other webPageUpdates
            if( PlotCategory[currentCategoryPlot].plotType == "NON_COMP_QUALITY" ){
                $("#nfhs_map_legend").hide();
                $("#HR").show()
                $("#INFRA").show()
                $("#SUPPLY").show() 
            }else{
                $("#nfhs_map_legend").show();
                $("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide() 
            }
            
            if( PlotCategory[currentCategoryPlot].plotType == "nfhs_percent" ){
                nfhsPlotEnable = 1;
                console.log("NFHS Selecetd");
                currentStatePlot = regionSelected;
                
                //This will initiate the loader before the map comes
                $("#India-district-chart-area").hide();
                $("#India-state-chart-area").hide();
                $("#chart-area").hide();
                $("#loader_screen").show();
                $("#sub-info").hide();
                setTimeout(function(){
                    function_container.categoryselect(currentStatePlot, currentCategoryPlot);
                },
                500);
                
            }else{

                //This is to hide the quintile legends
                $("#nfhs_info_box_legend").hide();
                
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
                    currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1)+"AVL";
                
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

                }else if(PlotCategory[currentCategoryPlot].plotType == "NON_COMP_QUALITY"){

                    //District Maps not available right now for any Quality
                    //So Nothing here
                    MainHeading.text("Generating Map ...")

                    currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1)+"AVL";

                    //No map legend needed
                    $("#nfhs_map_legend").hide();

                    $("#HR").show()
                    $("#INFRA").show()
                    $("#SUPPLY").show()
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

        }
    
        $(".CATEGORY_DROPDOWN_SELECT").on('click',function(){
            
             //Initiating the loader when selected
             enableLoader();
            
             $("#India").show();
            
             //Remove the highlight for PHI : REMOVED AT CATEGORY DROPDOWN, NFHS DISEASE, VITALS DROP, 
             $("#H_C_D").removeClass("selected-nav"); 
            
             nfhsPlotEnable = 0;
             $("#nfhs_selection").hide();
            
             $("#tooltip-area").show();
             $("#nfhs_sunburst").hide();
            
            categoryDropDownSelect(currentStatePlot,$(this).attr('id'),$(this).attr('name'));
        })
      
        function categoryDropDownSelect(currentStatePlot,categoryDorpDownSelected,nameType){
            
            MainHeading.text("Generating Map ...");
            $("#legHead").hide()
            
            $("#sub-info").addClass("col-border");
            $("#sub-info").show();
            $("#sub-info-q").hide();

            //This is to hide the quintile legends
            $("#nfhs_info_box_legend").hide();
            
            console.log("CURRENT CAT : " + currentCategoryPlot + " ; PLOT TYPE : ", PlotCategory[currentCategoryPlot]);

            //Other webPageUpdates
            if( PlotCategory[currentCategoryPlot].plotType == "NON_COMP_QUALITY" ){
                $("#nfhs_map_legend").hide();
                $("#HR").show()
                $("#INFRA").show()
                $("#SUPPLY").show() 
            }else{
                $("#nfhs_map_legend").show();
                $("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide() 
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
            
            //Changing the size of the No.of Hospital
            InfoExistingLabel.style("font-size","15px")
            InfoExisting.style("font-size","20px")
            
            //Hiding the comming soon if data present
            $("#comming_soon").hide();
            
            currentCategoryPlot = categoryDorpDownSelected;
            hideXtra();
            $("#legends").show();
            
            if(nameType == 'MET_CARE'){
               
                //this is implemented for now only
                if(currentStatePlot == "India_state"){
                    console.log("Changing the current state plot to India", currentStatePlot);
                    currentStatePlot = "India";
                    $("#India").prop("checked",true);
                    $("#India_state").prop("checked",false);
                }
                
                $(".SUB_CATEGORY_DROPDOWN_SELECT").hide();
                
                meternalSelect = 1;
                
            }else if(nameType == 'QLTY_INDX'){
                $("#legends").show();
                $("#dummy_div_for_header").show();
                meternalSelect = 0;
            }
            else{
                meternalSelect = 0;
                $("#dummy_div_for_header").hide();
                $(".SUB_CATEGORY_DROPDOWN_SELECT").show();
                if(currentCategoryPlot == 'SDH_AVL' || currentCategoryPlot == 'DH_AVL')
                {
                    $("#ACCESSIBILITY").hide()
                }
                else
                {
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
                
                        hideQualityVariables();
                        /*$("#HR").hide()
                        $("#INFRA").hide()
                        $("#SUPPLY").hide()*/
                       

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
            
            console.log("Current state plot : ",currentStatePlot );
            createState(currentStatePlot,currentCategoryPlot); 
           
        }
      
        function_container.categoryselect = function(state,category){
            categoryDropDownSelect(state,category);
        }
    
        $(".SUB_CATEGORY_DROPDOWN_SELECT").on('click',function(){
            
            //SUB_CATEGORY_DROPDOWN_SELECT
            $(".SUB_CATEGORY_DROPDOWN_SELECT_RADIO").prop("checked",false);
            //now applying check only to the needed on
            if( $(this).attr('id') == "AVL"){
                $("#AVL_RADIO").prop("checked",true);
            }else if( $(this).attr('id') == "ACCESSIBILITY"){
                $("#ACCESSIBILITY_RADIO").prop("checked",true);
            }else if( $(this).attr('id') == "HR"){
                $("#HR_RADIO").prop("checked",true);
            }else if( $(this).attr('id') == "INFRA"){
                $("#INFRA_RADIO").prop("checked",true);
            }else if( $(this).attr('id') == "SUPPLY"){
                $("#SUPPLY_RADIO").prop("checked",true);
            }
            
            //Initiating the loader when selected
            enableLoader();
            
            console.log("Sub category dropdown select with id = "+$(this).attr('id'));
            nfhsPlotEnable = 0;
            subCategoryDropDown($(this).attr('id'));

        })
    
        function subCategoryDropDown(subCategoryDropDownSelect){
            
            MainHMISHead.text("Generating Map ...");
            MainHeading.text("Generating Map ...");
            //Hiding the comming soon if data present
            $("#comming_soon").hide();

            //This is to hide the quintile legends
            $("#nfhs_info_box_legend").hide();
            
            InfoExistingLabel.style("font-size","15px");
            InfoExisting.style("font-size","20px");
            
            
            if( subCategoryDropDownSelect == 'AVL' || subCategoryDropDownSelect == 'ACCESSIBILITY'){
                currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1) +subCategoryDropDownSelect;
                console.log("Distance selection is made!!!");
            }else{
                currentCategoryPlot = currentCategoryPlot.substr(0,currentCategoryPlot.indexOf("_")+1) +"QUALITY";
                typeVar = subCategoryDropDownSelect;
            }
            
            hideXtra();
           
            if(currentStatePlot == 'India' && PlotCategory[currentCategoryPlot].plotType == "NON_COMP_QUALITY"){
                
                //District Maps not available right now for any Quality
                //So Nothing here
                
            }else if(currentStatePlot == 'India_state' && PlotCategory[currentCategoryPlot].plotType == "NON_COMP_QUALITY"){

                /*$("#HR").show();
                $("#INFRA").show();
                $("#SUPPLY").show();*/

            }else{

                /*$("#HR").hide();
                $("#INFRA").hide();
                $("#SUPPLY").hide();*/
                
                $("#tooltip-area").show();
                $("#table-area").hide();
                $("#legends").show();

                MainHeading.text("Generating Map ...");
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
           
                $("#India").hide();
           
                //Initiating the loader when selected
                enableLoader();
           
                IndexDropDownSelect( $(this).attr('id') );
        })
       
       function IndexDropDownSelect( indexDropdownSelect )
       {
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
    
       //Back to India map button
       $("#back_to_india_map").on('click',function(){
           enableLoader();
           //This will bring back the Last Indai map
           console.log("Getting to India Map");
           currentStatePlot = 'India_state';
           stateDropDownSelect(currentStatePlot);
       })
       
       if(stateCallCode == null){
           createState("Assam",'PHC_AVL');
       }else{
           createState(stateCallCode,mapCallCode);
       }
        
    function createState(stateCall,functionCall){
        
             //Initiating the loader when selected
            enableLoader();
        
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

        //Show the district and state map selection
        $("#India").show();
        $("#India_state").show();
    
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
        legendsData.style('visibility','hidden');

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
        var color_PHC_shortage_STATE_2011 = ['#045A8D','#2B8CBE','#FFC107','#E65100'];
        
    function create(stateNameCall,categoryCall){
        
        //Every tim running process
        $("#nfhs_index_legend").hide();
            
        //Change in the navigation plots
        if( currentStatePlot == "India" || currentStatePlot == "India_state"){
            if( currentStatePlot == "India" ){
                stateNameCall = "India";
                $("#India_dist_radio_button").prop("checked",true);
                $("#India_state_radio_button").prop("checked",false);
            }else if(currentStatePlot == "India_state"){
                stateNameCall = "India_state";
                $("#India_dist_radio_button").prop("checked",false);
                $("#India_state_radio_button").prop("checked",true);
            }
            $("#back_to_india_map").hide();
            $("#map_view").show();
        }else{
            $("#back_to_india_map").show();
            $("#map_view").hide();
        }

            
        //Change the visiblity of the district/state radio button as per the availability of the map
        if( PlotCategory[categoryCall].plotType == "nfhs_percent" && nfhsDiseaseIdetifier == "DISEASE"){
            $("India_state").hide();
        }else{
            $("India_state").show();
        }
           
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
        console.log("Check API : ",apiVAR);
        
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
                d3.json('./../geojson/indianewmaptopo.json',function(error,data){
                    STATEDistrictTopo = data;
                    callReady();
                })
            }else if( stateNameCall == "India" ){
                console.log(" Getting s map ");
                d3.json('./../geojson/2011_dist_topojson.json',function(error,data){
                    STATEDistrictTopo = data;
                    callReady();
                })
            }
        }else if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
           
            //Asynchronous download of the data :: District TopoJson ; APICallData 
            d3.json('./../geojson/indianewmaptopo.json',function(error,data){
                
                STATEDistrictTopo = data;
                callReady();
            })
            
        }else if(stateNameCall == 'India_state' || PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){

                  
            d3.json('./../geojson/indianewmaptopo.json',function(error,data){

                STATEDistrictTopo = data;
                callReady();
            })

        }else{
            //Asynchronous download of the data :: District TopoJson ; APICallData 
            d3.json('./../geojson/2011_dist_topojson.json',function(error,data){
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
    
            
            console.log("NFHS Data Collection initiated");
            
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
                if( conditionPriorityMap == 1 ){
                    console.log("Income quntile table seleceted");
                    tableTYPE = "CONDITION_D";
                    tableTYPENation = "CONDITION_N";
                    tableINCOME = "INCOME_Q_D";
                    tableINCOMENation = "INCOME_Q_N";
                }else{
                    tableTYPE = "CONDITION_D";
                    tableTYPENation = "CONDITION_N";
                    tableINCOME = "INCOME_D";
                    tableINCOMENation = "INCOME_N";
                }
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
                  sqlTYPE = 'CREATE TABLE IF NOT EXISTS '+tableTYPE+' ; SELECT * INTO '+tableTYPE+' FROM CSV("../data/nfhsAssets/'+tableTYPE+'.csv")';
            }else{
              sqlTYPE = 'CREATE TABLE IF NOT EXISTS '+ tableTYPE +';';
            }

            //For Nation Disease/Condition
            if(tableCheck[tableTYPENation] == 0){
                  tableCheck[tableTYPENation] = 1;
                  sqlTYPENation = 'CREATE TABLE IF NOT EXISTS '+ tableTYPENation +'; SELECT * INTO '+ tableTYPENation +' FROM CSV("../data/nfhsAssets/'+ tableTYPENation +'.csv")';
            }else{
              sqlTYPENation = 'CREATE TABLE IF NOT EXISTS '+ tableTYPENation +';';
            }

            //For Local Income
            if(tableCheck[tableINCOME] == 0){
                  tableCheck[tableINCOME] = 1;
                  sqlINCOME = 'CREATE TABLE IF NOT EXISTS ' + tableINCOME + '; SELECT * INTO ' + tableINCOME + ' FROM CSV("../data/nfhsAssets/' + tableINCOME + '.csv")';
                  console.log("SQL TABLE QUERY : "+sqlINCOME);
            }else{
              sqlINCOME = 'CREATE TABLE IF NOT EXISTS ' + tableINCOME + ';';
            }

            //For Nation income
            if(tableCheck[tableINCOMENation] == 0){
                  tableCheck[tableINCOMENation] = 1;
                  sqlINCOMENation = 'CREATE TABLE IF NOT EXISTS '+tableINCOMENation+'; SELECT * INTO '+tableINCOMENation+' FROM CSV("../data/nfhsAssets/'+tableINCOMENation+'.csv")';
                  console.log("SQL TABLE QUERY 2 : "+sqlINCOME);
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
                 
                    console.log("Check query : ", query);

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
                                if( conditionPriorityMap == 1 ){
                                    query += " , " + 'Q'+j+'_'+d.data_var.split("_")[1]+'_'+d.data_var.split("_")[2]+'_'+d.data_var.split("_")[3]+'_'+d.data_var.split("_")[0]+'_DI as '
                                    + d.data_var + '_Q'+j+'_'+ ( stateNameCall == 'India'?'district' : 'state' ); 
                                }else{
                                    query += " , " + d.data_var + '_Q'+j+'_'+ ( stateNameCall == 'India'?'district' : 'state' )  ; 
                                }
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
                                if ( d.data_var != undefined ){
                                    if( conditionPriorityMap == 1 ){
                                        query += " , " + 'Q'+j+'_'+d.data_var.split("_")[1]+'_'+d.data_var.split("_")[2]+'_'+d.data_var.split("_")[3]+'_'+d.data_var.split("_")[0]+' as '
                                        + d.data_var + '_Q'+j+'_nation'; 
                                    }else{
                                        query += " , " + d.data_var + '_Q'+j+'_nation' ; 
                                    }
                                }
                            }
                        }
                    })

                    //Update the data location
                    query += " FROM "+tableINCOMENation;

                    console.log("Check the complete query : ", query);
                  
                    //Call the next query to populate
                    alasql.promise(query).then(function(resultData){
                        //console.log("Result Data : ", resultData);
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
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS HMIS; SELECT * INTO HMIS FROM CSV("../data/hmis.csv")';
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
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS quality; SELECT * INTO quality FROM CSV("../data/quality.csv")';
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
                        if(stateNameCall == 'India_state' || stateNameCall == 'India'){
                            query += " FROM quality";
                        }else{
                            query += " FROM quality WHERE ST_CD = "+StateCodeObject[stateNameCall];
                        }
                  
                        console.log("REGION CALL : ",stateNameCall);
                        console.log("QUERY FOR MAP : ",query);

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
                      sqlCreate = 'CREATE TABLE IF NOT EXISTS stateWiseData; SELECT * INTO stateWiseData FROM CSV("../data/stateWiseData.csv")';
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
                  sqlCreate = 'CREATE TABLE IF NOT EXISTS datafile; SELECT * INTO datafile FROM CSV("../data/datafile.csv")';
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
    The plotting functions will be called as both of the above are asynchronous*/
    function callReady()
    {
  
            $("#HR").hide()
            $("#INFRA").hide()
            $("#SUPPLY").hide()
        
        

        if( PlotCategory[categoryCall].plotType == "nfhs_percent" ){
            if( dataTYPE != "" && dataTYPENation != "" && dataINCOME != "" && dataINCOMENation != "" && STATEDistrictTopo!=null){
 
                 {
                     if(canvas) canvas.remove();
                     PlotNFHSPlots(STATEDistrictTopo,stateAPIData,dataTYPE,dataTYPENation,dataINCOME,dataINCOMENation); 
                 }
            }

        }else if(stateAPIData!=null && STATEDistrictTopo!=null){
            
            console.log("Instance for state api data : ",stateAPIData)
            
            if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY" || stateNameCall == 'India_state' ||       PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){
                
                $("#HR").show()
                $("#INFRA").show()
                $("#SUPPLY").show()
                
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
    //This is to inform the user, that MAP for Andhra Pradesh and Telengana are combined together
    if(currentStatePlot == 'Andhra Pradesh')
    {
        var info = d3.select("#INFO-CAVEAT").text();
        d3.select("#INFO-CAVEAT").text(info +"   *The data shown is for Andhra Pradesh and Telangana combined");
    }
    else
    {
        d3.select("#INFO-CAVEAT").text("");
    } 
    if(currentCategoryPlot == 'p_jsy_anc')
    {
        var info = d3.select("#INFO-CAVEAT").text();
        d3.select("#INFO-CAVEAT").text(info + " *JSY : Janani Suraksha Yojana");
    }
    else
    {
        d3.select("#INFO-CAVEAT").text("");
    }
        
    function PlotStates(STATEDistrictTopo,stateAPIData)
    {   
           /*var TotalSC2011,TotalSC2016, DesiredSC, TotalPHC2011,TotalPHC2016=0, DesiredPHC=0, TotalCHC2011,TotalCHC2016, DesiredCHC;*/
           var TotalRuralPop = 0, TotalRuralTribalPop = 0,TotalUrbanPopulation = 0,Total = 0, Desired = 0,TotalInfoVillage = 0,TotalPopulation = 0;
        
           var plotVariableArray = [];
           var quartileArray = [];
           var count = 0;
        
           //Show the radio button for the HMIS INDEX
           radioSelectionAvailabitity("HMIS");
           
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
               plotVariableArray.push( !isNaN(parseFloat(d.properties[plotVar.v]))?d.properties[plotVar.v]:0 );
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
            
        console.log("Array for the plot var : ", plotVariableArray);
        try{
            quartileArray = quartileBounds(plotVariableArray)
        }catch(e){
            quartileArray = [-50,-25,25,50]
        }
        
        //Add 0 as one of the value and sort the data accordingly
        //quartileArray.push(0);   
        quartileArray.sort(function(a,b){return a-b;});
        
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
               
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text(STATE)
               
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
                
              var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
              var colorArrayRev = ["#4f9cb4","#80c6a7","#e0f19d","#f18a5e","#a31244"];

              //Updating the map colors with the quartile data
              var linearScale = d3.scale.linear()
                  .domain(quartileArray)
                  .range(colorArrayRev);

              plotContinuousLegend([...quartileArray], colorArray,"HMIS");
           
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

               //Disabling the loader when selected
               disableLoader();
                
                outlineMap.style('fill',function(d,i){
                    if(d == undefined || d.properties[sht] == undefined || d.properties[dsr]==undefined){
                        /*if(STATE == 'Andhra Pradesh' || STATE == 'Telangana'){
                            return "#FFF";
                        }*/
                        return color_PHC_shortage_STATE_2011[4];
                    }
                    else{ /*if(d.properties[sht]<=-30){
                        */
                        
                        return linearScale((d.properties[sht])*100/(d.properties[dsr]));
                        /*if(d.properties[sht] > 0){
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
                        }*/
                    }
                 })
            
               .on('mouseover',function(d){
                
                d3.select(this).style('opacity',"0.6")
                    
                    if(STATE == "Andhra Pradesh"){
                        MainHeading.text("Andhra Pradesh*")
                    }else 
                    if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                         MainHeading.text("Delhi")
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text("Arunachal Pradesh")
                    }else{
                        MainHeading.text(STATE)
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
                    MainHeading.text(STATE)
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
                     }).on('click',function(){

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
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text(STATE)
           
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
           
           
               var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
               var colorArrayRev = ["#4f9cb4","#80c6a7","#e0f19d","#f18a5e","#a31244"];

               //Updating the map colors with the quartile data
               var linearScale = d3.scale.linear()
                  .domain(quartileArray)
                  .range(colorArray);

              plotContinuousLegend([...quartileArray], colorArray,"HMIS");
                       
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
                  
                   //Disabling the loader when selected
                   disableLoader();
                
                   outlineMap.attr('stroke-width', 1)
                      .attr('stroke', 'white')
                      .style('fill',function(d,i){

                       if(d == undefined || d.properties[plotVar.v]== undefined){
                            return '#445'//colorAccessSubCenter_STATE_gt_5km[4];
                        }else if(d.properties[plotVar.v]=='NA'){
                            return '#e1e1e1'
                        }else{
                            return linearScale(d.properties[plotVar.v].toFixed(0));
                        }
                        /*else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l4.l && d.properties[plotVar.v].toFixed(0)<plotVarDef[plotVar.v].limit.l4.r){
                            return plotVarDef[plotVar.v].limit.l4.c;
                        }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l3.l && d.properties[plotVar.v].toFixed(0) <=plotVarDef[plotVar.v].limit.l3.r){
                            return plotVarDef[plotVar.v].limit.l3.c;
                        }else if(d.properties[plotVar.v].toFixed(0) >=plotVarDef[plotVar.v].limit.l2.l && d.properties[plotVar.v].toFixed(0)<=plotVarDef[plotVar.v].limit.l2.r){
                            return plotVarDef[plotVar.v].limit.l2.c;
                        }else if(d.properties[plotVar.v].toFixed(0) >plotVarDef[plotVar.v].limit.l1.l ){
                            return plotVarDef[plotVar.v].limit.l1.c;
                        }else{
                            
                        }*/
                     })
                   .on('mouseover',function(d){
                       
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                MainHeading.text( d.properties.DISTRICT +" (Andhra Pradesh*)")
                            }else 
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 MainHeading.text( d.properties.DISTRICT +" (Delhi)")
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                MainHeading.text( d.properties.DISTRICT +" (Arunachal Pradesh)")
                            }else{
                                MainHeading.text( d.properties.DISTRICT +" (" + d.properties.ST_NM +")")
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
                    MainHeading.text(STATE)
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
                   
                }).on('click',function(){

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
                
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text(STATE)
           
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
                                return "#e1e1e1";
                            }else{
                                return "#74A9CF"
                            }
                        })
           
               //Disabling the loader when selected
               disableLoader();
           
              outlineMap
               .on('mouseover',function(d){
                     if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text( d.properties.DISTRICT +" (Andhra Pradesh*)")
                    }else 
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text( d.properties.DISTRICT +" (Delhi)")
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text( d.properties.DISTRICT +" (Arunachal Pradesh)")
                    }else{
                        MainHeading.text( d.properties.DISTRICT +" (" + d.properties.ST_NM +")")
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
                    MainHeading.text(STATE)
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
                }).on('click',function(){

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
    }
            
    function PlotNFHSPlots(STATEDistrictTopo,stateAPIData,dataTYPE,dataTYPENation,dataINCOME,dataINCOMENation)
    {
        console.log(" NFHS data download setup !!! ");
        $("#non_index_tabs").hide();
        $("#nfhs_quartile_legend").show();
        
        for(var prop in dataTYPENation[0]){
            if( dataTYPENation[0].hasOwnProperty(prop) ){
                dataINCOMENation[0][prop] = dataTYPENation[0][prop];
            }
        }
        console.log("update object : ",dataINCOMENation[0]);
        
        //Show the radio button for the NFHS
        radioSelectionAvailabitity("NFHS");

        /*QuickFix : To adjust the margin between map and legends for StateWise and IndiaWise map*/
        d3.select("#leg_id").style('margin-top','0');

        //Now here the local and national level data needs to be added into the topojson files
        var TotalRuralPop = 0, 
           TotalRuralTribalPop = 0,
           TotalUrbanPopulation = 0,
           Total = 0, 
           Desired = 0,
           TotalInfoVillage = 0,
           TotalPopulation = 0,
           STATEDistrict,
           dataValue,
           count = 0,
           quartileDataLocal = [],
           quartileValuesLocal = [];

        MainHeading.text("Generating India Map ... ");

        console.log("REGION TYPE : ", currentStatePlot );

        if(stateNameCall == "India")
        {

                $("#India-district-chart-area").show();
                $("#India-state-chart-area").hide();
                $("#chart-area").hide();

                if( IndiaDistrictOutlineMap == null){

                    STATEDistrictTopo.objects['2011_Dist'].geometries.forEach(function(d,i){

                        STATEDistrict = d.properties.DISTRICT;
    
                        dataTYPE.forEach(function(d2){
                            if(d2.DISTRICT == STATEDistrict)
                                    {
                                        //console.log(d2.DISTRICT);
                                        count++;
    
//                                        if( d.properties.DISTRICT == 'Bangalore'){
//                                            d.properties.DISTRICT = 'Bengaluru';
//                                        }if( d.properties.DISTRICT == 'Bangalore Rural'){
//                                            d.properties.DISTRICT = 'Bengaluru Rural';
//                                        }if( d.properties.DISTRICT == 'Darjiling'){
//                                            d.properties.DISTRICT = 'Darjeeling';
//                                        }if(d.properties.DISTRICT == 'Y.S.R'){
//                                            d.properties.DISTRICT = "YSR Kadapa"
//                                        }if(d.properties.DISTRICT == 'Ganganagar'){
//                                            d.properties.DISTRICT = "Sri Ganganagar"
//                                        }if(d.properties.DISTRICT == 'Jhunjhunun'){
//                                            d.properties.DISTRICT = "Jhunjhunu";
//                                        }if(d.properties.DISTRICT == 'Dohad'){
//                                            d.properties.DISTRICT = "Dahod";
//                                        }
    
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
    
//                                        if( d.properties.DISTRICT == 'Bangalore'){
//                                            d.properties.DISTRICT = 'Bengaluru';
//                                        }
//                                          if( d.properties.DISTRICT == 'Bangalore Rural'){
//                                            d.properties.DISTRICT = 'Bengaluru Rural';
//                                        }if( d.properties.DISTRICT == 'Darjiling'){
//                                            d.properties.DISTRICT = 'Darjeeling';
//                                        }if(d.properties.DISTRICT == 'Y.S.R'){
//                                            d.properties.DISTRICT = "YSR Kadapa"
//                                        }if(d.properties.DISTRICT == 'Ganganagar'){
//                                            d.properties.DISTRICT = "Sri Ganganagar"
//                                        }if(d.properties.DISTRICT == 'Jhunjhunun'){
//                                            d.properties.DISTRICT = "Jhunjhunu";
//                                        }if(d.properties.DISTRICT == 'Dohad'){
//                                            d.properties.DISTRICT = "Dahod";
//                                        }
                                        
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

                }else{

                    IndiaDistrictOutlineMap.style('fill',function(d,i){

                        STATEDistrict = d.properties.DISTRICT;
    
                        dataTYPE.forEach(function(d2){
                            if(d2.DISTRICT == STATEDistrict)
                                    {
                                        //console.log(d2.DISTRICT);
                                        count++;
    
//                                        if( d.properties.DISTRICT == 'Bangalore'){
//                                            d.properties.DISTRICT = 'Bengaluru';
//                                        }if( d.properties.DISTRICT == 'Bangalore Rural'){
//                                            d.properties.DISTRICT = 'Bengaluru Rural';
//                                        }if( d.properties.DISTRICT == 'Darjiling'){
//                                            d.properties.DISTRICT = 'Darjeeling';
//                                        }if(d.properties.DISTRICT == 'Y.S.R'){
//                                            d.properties.DISTRICT = "YSR Kadapa"
//                                        }if(d.properties.DISTRICT == 'Ganganagar'){
//                                            d.properties.DISTRICT = "Sri Ganganagar"
//                                        }if(d.properties.DISTRICT == 'Jhunjhunun'){
//                                            d.properties.DISTRICT = "Jhunjhunu";
//                                        }if(d.properties.DISTRICT == 'Dohad'){
//                                            d.properties.DISTRICT = "Dahod";
//                                        }
    
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
    
//                                        if( d.properties.DISTRICT == 'Bangalore'){
//                                            d.properties.DISTRICT = 'Bengaluru';
//                                        }if( d.properties.DISTRICT == 'Bangalore Rural'){
//                                            d.properties.DISTRICT = 'Bengaluru Rural';
//                                        }if( d.properties.DISTRICT == 'Darjiling'){
//                                            d.properties.DISTRICT = 'Darjeeling';
//                                        }if(d.properties.DISTRICT == 'Y.S.R'){
//                                            d.properties.DISTRICT = "YSR Kadapa"
//                                        }if(d.properties.DISTRICT == 'Ganganagar'){
//                                            d.properties.DISTRICT = "Sri Ganganagar"
//                                        }if(d.properties.DISTRICT == 'Jhunjhunun'){
//                                            d.properties.DISTRICT = "Jhunjhunu";
//                                        }if(d.properties.DISTRICT == 'Dohad'){
//                                            d.properties.DISTRICT = "Dahod";
//                                        }
                                        
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
        }
        else if(stateNameCall == "India_state")
        {
            $("#India-district-chart-area").hide();
            $("#India-state-chart-area").show();
            $("#chart-area").hide();

            if(IndiaStateOutlineMap == null){

                STATEDistrictTopo.objects.Admin2.geometries.forEach(function(d,i){

                    dataTYPE.forEach(function(d2,i)
                     {
                        if(StateCodeObject[d.properties.ST_NM] == d2.ST_CEN_CD)
                        {
                               if(d2[currentCategoryPlot] != 'NA' &&  d2[currentCategoryPlot]!= undefined){
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

            }else{

                IndiaStateOutlineMap.style('fill',function(d,i){

                    dataTYPE.forEach(function(d2,i)
                     {
                        if(StateCodeObject[d.properties.ST_NM] == d2.ST_CEN_CD)
                        {
                               if(d2[currentCategoryPlot] != 'NA' &&  d2[currentCategoryPlot]!= undefined){
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



        } 

        console.log("NFHS UPDATED MAP : ",STATEDistrictTopo); 
        
        //Update the position of smart search
        var countDataVal = 0;
        for(var prop in dataTYPENation[0]){
            if( dataTYPENation[0].hasOwnProperty(prop) ){
                //console.log("Data value : ", prop);
                countDataVal++;
            }
        }
        if( countDataVal-1 == 3 )
        {
            $("#district_smart_search_result").css("margin-top","-37%");
        }
        else if( countDataVal-1 == 4 )
        {
            $("#district_smart_search_result").css("margin-top","-50%");
        }
        else if( countDataVal-1 == 5 )
        {
            $("#district_smart_search_result").css("margin-top","-62%");
        }
        
        console.log("Quintile data collected : ",quartileDataLocal  );
        
        //Enable the visibility of a quintile plots
        $(".NFHS_QUINTLIE").show();
        
        if(stateNameCall == "India")
        {
            //Changes to implement
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
        }
        else if(stateNameCall == "India_state")
        {
            
            if(nfhsDiseaseIdetifier == "CONDITION"){
                
                if(conditionPriorityMap == 1 ){
                    //Map Change
                    dynamicPlotConditionPercentageState();
                    $("#quintile_container").hide();
                    $("#sunburst").show();
                    $("#nfhs_health_legend").hide();
                    $("#nfhs_quartile_legend").show();
                    $("#legend_Header").show();
                    $("#nfhs_legend_1").show();

                }else{
                    //Map Change
                    IndiaStateNFHSConditionIncome();
                    $("#quintile_container").show();
                    $("#sunburst").hide();
                    $("#nfhs_health_legend").show();
                    $("#nfhs_quartile_legend").hide();
                    $("#legend_Header").hide();
                    $("#nfhs_legend_1").hide();
                }
            }else{
                
                //$("#India").prop("disabled","true");
                //$("#India_dist_radio_button").prop("disabled","true");
                $("#India_dist_radio_button").on('click',function(e){
                    e.preventDefault();
                })
                
                //dynamicPlotPercentageStates();
                dynamicPlotINDIA_Comp();
                $("#quintile_container").hide();
                $("#sunburst").show();
                $("#nfhs_health_legend").hide();
                $("#nfhs_quartile_legend").show();
                $("#legend_Header").show();
                $("#nfhs_legend_1").show();
            }
        }
        
        //this check if the map has been enabled
        var checkEnabled = 0;
        
        //This to define the position of the magnitudes in the graphs
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
        hideLoader();
        
        //This will plot the Income quintile bars for the district conditions maps
        function plotQuintuleBars(dataCollection , varPresent , typeOfData)
        {   
            if( typeOfData == null ){
                typeOfData = (stateNameCall=="India")? "district" : "state"
            }
            
            //This check how many magnitude categories are present
            var valueCount = 0 ;
            
            //This will check if the last bar is being plotted, this will check that total sums up to 100 only, not lesses not more
            var correntPlotCounter = 0;
            var correntPlotSum = 0;
            
            for(var prop in varPresent){
                if( varPresent.hasOwnProperty(prop) ){
                    if( varPresent[prop] != null ){
                        valueCount++;
                    }
                }
            }
            
            //This is to update the legend as the category idetifier in the dropdown changes
            var width = 20;
            width = (100/valueCount);
            for( var i=1; i<=5; i++ ){
                if( i <= valueCount ){
                    $("#legend_heading_c_color_"+i).show();
                    $("#legend_heading_c_val_"+i).show();
                    
                    $("#legend_heading_c_color_"+i).css('width',width+"%");
                    $("#legend_heading_c_val_"+i).css('width',width+"%");
                    
                }else{
                    $("#legend_heading_c_color_"+i).hide();
                    $("#legend_heading_c_val_"+i).hide();
                }
            }
            
            //
           
            //Chaning the visibility of the bars and legend
            for( var i = 0; i < 5 ; i++ ){
               for( var j = 0; j < 5 ; j++ ){
                   if( j < valueCount ){
                       $("#quintile_bar_"+ (i+1) +"_" + ( j+1 )).show()
                   }else{
                       $("#quintile_bar_"+ (i+1) +"_" + ( j+1 )).hide()
                   }
               }
            }
            
            var valueCollecetd = {
                1 : [],
                2 : [],
                3 : [],
                4 : [],
                5 : []
            }
            var sumCollecetd = {
                1 : 0,
                2 : 0,
                3 : 0,
                4 : 0,
                5 : 0
            }
            
            var objVal = 0;
            
            for( var q = 1; q <= 5 ; q++ ){
                for( var prop in varPresent ){
                if( varPresent.hasOwnProperty(prop) ){
                    if(varPresent[prop] != null ){
                        var magNum = 1;
                        
                        //This shows the magnitude values
                        if( prop == "low" || prop == "present" ){
                                 magNum = 1;
                        }else if(prop == "healthy" || prop == "dont_know" ){
                                 magNum = 2;  
                        }else if(prop == "high" || prop == "treated"){
                                 magNum = 3;  
                        }else if(prop == "elevated"){
                                 magNum = 4;  
                        }else if(prop == "severe"){
                                 magNum = 5; 
                        }
                        
                        
                        if( dataCollection[varPresent[prop] + "_Q"+q+"_"+ typeOfData] == undefined ){
                            objVal = 0;
                        }else{
                            objVal = (parseFloat(dataCollection[ varPresent[prop] + "_Q"+q+"_"+ typeOfData ])*100).toFixed(1);
                        }
                        valueCollecetd[q].push(parseFloat(objVal));
                        sumCollecetd[q] += parseFloat(objVal);
                      }
                   }
                }
            }
            
            console.log("Value collected array : ", valueCollecetd);
            console.log("Sum collected array : ", sumCollecetd);
            
            for( var q = 1; q <= 5 ; q++ ){
                
                correntPlotCounter = 0;
                correntPlotSum = 0;
                for( var prop in varPresent ){
                if( varPresent.hasOwnProperty(prop) ){
                    if(varPresent[prop] != null ){
                        
                        correntPlotCounter++;
                        
                        var magNum = 1;
                        
                        //This shows the magnitude values
                        if( prop == "low" || prop == "present" ){
                                 magNum = 1;
                        }else if(prop == "healthy" || prop == "dont_know" ){
                                 magNum = 2;  
                        }else if(prop == "high" || prop == "treated"){
                                 magNum = 3;  
                        }else if(prop == "elevated"){
                                 magNum = 4;  
                        }else if(prop == "severe"){
                                 magNum = 5; 
                        }
                        
                        d3.select("#quintile_bar_"+q+"_"+magNum)
                            .style('width',function(){
                                    console.log(valueCollecetd[q][magNum-1]);
                                        //correntPlotSum += parseFloat(valueCollecetd[q][magNum-1]*100 / sumCollecetd[q]);
                                    return Math.floor( parseFloat(valueCollecetd[q][magNum-1]*100 / sumCollecetd[q]) ) + "%";
                            })
                            .text(function(d,i){
                                    return parseFloat(valueCollecetd[q][magNum-1]).toFixed(1) + "%";
                            })
                      }
                   }
                }
            }
            
        }
        
        //This will plot the graphs for the quintile data 
        function plotQuintileGraphs( dataCollection , varPresent, regionDivision)
        {
            console.log("Data collection : ", dataCollection);
            console.log("Var collection : ", varPresent);
            console.log("Region : ", regionDivision);
            
            if( currentStatePlot == "India_state" ){
                $(".INCOME_QUINTILE_HEADER").hide();
            }else{
                $(".INCOME_QUINTILE_HEADER").show();
            }
            
            if( regionDivision == undefined ){
                regionDivision = (stateNameCall=="India"? "district" : "state");
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
            
            //Applying the details on the values
            for( var prop in varPresent ){
                if( varPresent.hasOwnProperty(prop) ){
                    if(varPresent[prop] !== null ){
                        
                        console.log("Check prop : ",prop)
                        console.log("Check num : ",parseFloat(dataCollection[varPresent[prop]])*100)
                        
                        //console.log( "This is selected : ",plotVarDef[varPresent[prop]].description.main_head );
                        $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[varPresent[prop]].description.main_head);
                        
                        if( isNaN(dataCollection[varPresent[prop]]) ){
                            $("#magnitude_" + magnitudeVariation[prop] + "_percent").text("Data Not Available");
                        }else{
                            $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataCollection[varPresent[prop]])*100)).toFixed(1) + "%" );
                        }
                        
                        for( var i = 1; i<=5 ; i++){
                            d3.select("#magnitude_" + magnitudeVariation[prop] + "_quintile_"+i)
                              //.transition()
                              //.duration(100)
                              .style('width',function(){
                                    if( dataCollection[varPresent[prop] + "_Q"+i+"_"+ regionDivision] == undefined ){
                                            return 0 +'%';
                                    }else{
                                        return ( parseFloat(dataCollection[ varPresent[prop] + "_Q"+i+"_"+ regionDivision ])*100 ).toFixed(1) + '%';
                                    }
                            })
                        }
                    }
                }
              }
            
              $(".QUINTILE_DIVISION").on('mouseover',function(){
                  //console.log("HOVER on QUINTLE DATA");
                  var magVar = "healthy"
                  if( $(this).attr('value') == "1" ){
                      
                      if( varPresent.low != undefined ){
                          magVar = "low";
                      }else{
                          magVar = "present";
                      }
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ regionDivision ])*100 ).toFixed(1));
                      }
                  }else if( $(this).attr('value') == "2" ){
                      
                      if( varPresent.healthy != undefined ){
                          magVar = "healthy";
                      }else{
                          magVar = "dont_know";
                      }
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ regionDivision ])*100 ).toFixed(1));
                      }
                  }else if( $(this).attr('value') == "3" ){

                      if( varPresent.high != undefined ){
                          magVar = "high";
                      }else{
                          magVar = "treated";
                      }
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ regionDivision ])*100 ).toFixed(1));
                      }
                  }else if( $(this).attr('value') == "4" ){
                      
                      magVar = "elevated";
                      
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ regionDivision ])*100 ).toFixed(1));
                      }
                  }else if( $(this).attr('value') == "5" ){
                      
                      magVar = "severe";
                      
                      for ( var i = 1;i<=5 ; i++ ){
                          $("#q"+i).text(  ( parseFloat(dataCollection[ varPresent[magVar] + "_Q"+i+"_"+ regionDivision ])*100 ).toFixed(1));
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
        
        //MAP-PLOTTING-FUNCTION
        // 7 maps to be plotted
        // [ DISEASE : INDIA_STATE]
        // [ CONDITION : INDIA_STATE, INDIA_DISTRICT, STATES]
        // [ INCOME : INDIA_STATE, INDIA_DISTRICT, STATES]
        
        //CONDITION_BY_CONDITION
        
        // | MAP TYPE : INDIA DISTRICT | CATEGORY : NFHS-CONDITION WITH DISTRIBUTED BY CONDITIONS | 
        function dynamicPlotPercentage()
        {
                //Defining the data on the information box
               $(".main_nfhs_cat_head").text(dropDownCondition[mainCategoryIdentifier]+nfhsTitleGenderSelections+nfhsTitleRegionSelections);
                $("#legend_heading_c").text(plotVarDef[plotVar.v].description.main_head);
            
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
                
                //Getting the legend
                plotContinuousLegend(quartileValuesLocal, currentColorArray);
            
                //legendsData.style('visibility','visible')
           
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
                $("#CAVEAT_ROW").hide();
                
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
                        .attr('style', 'cursor:pointer')
                }else{
                    
                        
                    
                }
             
                //Disabling the loader when selected
                disableLoader();
            
                IndiaDistrictOutlineMap
                          .attr('stroke-width', 0.2)
                          .attr('stroke', 'white')
                          .style('fill',function(d,i){
                           if(d == undefined || d.properties[plotVar.v] == undefined){
                                return '#e1e1e1';
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
                            $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + "%" );

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
                    var nam2Send = "";
                    districtCollection.forEach(function(d){
                        if(d.toUpperCase().indexOf(filter) != -1 ){
                           if( d == "Leh (ladakh)(JK)" ){
                              nam2Send = "Leh (ladakh)";
                           }else{
                              nam2Send = d.split("(")[0];
                           }
                           list += '<li><a class="DISTRICT_DROP display_c" onclick="getDist(' + "'" +nam2Send+ "'" +')" name="'+ d +'" style="cursor:pointer;">'+d+'</a></li>';
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
                                        return '#e1e1e1'//colorAccessSubCenter_STATE_gt_5km[4];
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
                    //This will add opacity to ensure that non selected are not selected
                    $("#magnitude_"+ i +"_div").addClass("non-selected-opacity");
                    $("#magnitude_"+ i +"_sub_div").attr('style',"color:#888;");
                    $("#magnitude_"+ i +"_name").removeClass("magnitude_highlight");
                }
                
                //Updating the header colors
                if(currentCategoryPlot.split("_")[0] == "l" || currentCategoryPlot.split("_")[0] == "p" ){
                         //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_1_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_1_sub_div").attr('style',"color:"+colorArrayLow[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayLow[4]);
                         $("#arrow_1").css("color",colorArrayLow[4]);
                         $("#magnitude_1_name").addClass("magnitude_highlight");
                         $("#arrow_1").show();
                }else if(currentCategoryPlot.split("_")[0] == "h" || currentCategoryPlot.split("_")[0] == "dk" ){
                    
                          //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_2_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_2_sub_div").attr('style',"color:"+colorArrayHealthy[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayHealthy[4]);
                         $("#arrow_2").css("color",colorArrayHealthy[4]);
                         $("#magnitude_2_name").addClass("magnitude_highlight");
                         $("#arrow_2").show();
                }else if(currentCategoryPlot.split("_")[0] == "hh" || currentCategoryPlot.split("_")[0] == "t" ){
                         //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_3_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_3_sub_div").attr('style',"color:"+colorArrayHigh[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayHigh[4]);
                         $("#arrow_3").css("color",colorArrayHigh[4]);
                         $("#magnitude_3_name").addClass("magnitude_highlight");
                         $("#arrow_3").show();
                }else if(currentCategoryPlot.split("_")[0] == "hhh" ){
                        //This will add opacity to ensure that non selected are not selected
                        $("#magnitude_4_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_4_sub_div").attr('style',"color:"+colorArrayElevated[4])
                         $("#chart-area").css("border-right","2px solid "+colorArrayElevated[4]);
                         $("#arrow_4").css("color",colorArrayElevated[4]);
                         $("#magnitude_4_name").addClass("magnitude_highlight");
                         $("#arrow_4").show();
                }else if(currentCategoryPlot.split("_")[0] == "hhhh" ){
                        //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_5_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_5_sub_div").attr('style',"color:"+colorArraySevere[4])
                         $("#chart-area").css("border-right","2px solid "+colorArraySevere[4]);
                         $("#arrow_5").css("color",colorArraySevere[4]);
                         $("#magnitude_5_name").addClass("magnitude_highlight");
                         $("#arrow_5").show();
                }
               
                console.log(" Variable present ",variablePresent);
                
                //Plot the quintile graphs for the nation
                plotQuintileGraphs( dataINCOMENation[0] , variablePresent ,"nation");
                 
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
                        //console.log("Income data : ",dataINCOMENation);
                        //console.log("Income local : ",d.properties);
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
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + "%" );

                                plotQuintileGraphs( dataINCOMENation[0] , variablePresent ,"nation");
                               
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
                                return '#e1e1e1';
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
        
        // | MAP TYPE : INDIA STATES | CATEGORY : NFHS-CONDITION WITH DISTRIBUTED BY CONDITIONS | 
        function dynamicPlotConditionPercentageState()
        {
            console.log("Initiate the state plot for the condition!!!");
            
                $(".main_nfhs_cat_head").text(dropDownCondition[mainCategoryIdentifier]+nfhsTitleGenderSelections+nfhsTitleRegionSelections);
                $("#legend_heading_c").text(plotVarDef[plotVar.v].description.main_head);
            
                $("#sub-info").hide();
                $("#nfhs_quartile_legend").hide();
            
                //Change the pointer back to auto
                d3.select("body").attr('style', 'cursor:auto');
                
                MainHeading.text("INDIA")
                
                //Show nfhs selection option
                $("#nfhs_selection").show();
                 //Defining the data on the information box
            
                //To keep a check on the data
                if(quartileDataLocal.length == 0){
                    quartileValuesLocal = [0.1,0.20,0.30,0.40,0.5]
                }else{
                    quartileValuesLocal = quartileBounds(quartileDataLocal)
                }
                
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
                plotContinuousLegend(quartileValuesLocal, currentColorArray);
            
                var projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                        .attr('height',width*.65)
                        .attr('width',width)
                        .style('background',"white")
                }else{
                    //Do nothing!!!
                }
                
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide();
                
                var centered,zoomState=0;
              
                var g;
                
                if(IndiaStateOutlineMap == null){
                    
                    g = IndiaStateCanvas.append("g");
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                        .attr('style', 'cursor:pointer')
                }else{
                        
                }

                IndiaStateOutlineMap.style('fill',function(d,i){
                    if(d == undefined || d.properties[plotVar.v] == undefined){
                        return '#e1e1e1';
                    }else{
                        //console.log( parseFloat( d.properties[plotVar.v]*100 ) );
                        return linearScale(parseFloat( d.properties[plotVar.v]*100 ) );
                    }
                })
            
               //Disabling the loader when selected
               disableLoader();
            
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
                            $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + "%" );

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
                                        return '#e1e1e1';
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
                              /*.style('opacity',function(d2){
                                  if( state == d2.properties.ST_NM ){
                                         return "1";
                                    }else{
                                        return "0.3";
                                    }
                              })*/
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
                    //This will add opacity to ensure that non selected are not selected
                    $("#magnitude_"+ i +"_div").addClass("non-selected-opacity");
                    $("#magnitude_"+ i +"_sub_div").attr('style',"color:#888;");
                    $("#magnitude_"+ i +"_name").removeClass("magnitude_highlight");
                }
                
                //Updating the header colors
                if(currentCategoryPlot.split("_")[0] == "l" || currentCategoryPlot.split("_")[0] == "p" ){
                         //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_1_div").removeClass("non-selected-opacity")
                     
                         $("#magnitude_1_sub_div").attr('style',"color:"+colorArrayLow[4])
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayLow[4]);
                         $("#arrow_1").css("color",colorArrayLow[4]);
                         $("#magnitude_1_name").addClass("magnitude_highlight");
                         $("#arrow_1").show();
                }else if(currentCategoryPlot.split("_")[0] == "h" || currentCategoryPlot.split("_")[0] == "dk" ){
                        //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_2_div").removeClass("non-selected-opacity")
                    
                    
                         $("#magnitude_2_sub_div").attr('style',"color:"+colorArrayHealthy[4])
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayHealthy[4]);
                         $("#arrow_2").css("color",colorArrayHealthy[4]);
                         $("#magnitude_2_name").addClass("magnitude_highlight");
                         $("#arrow_2").show();
                }else if(currentCategoryPlot.split("_")[0] == "hh" || currentCategoryPlot.split("_")[0] == "t" ){
                        //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_3_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_3_sub_div").attr('style',"color:"+colorArrayHigh[4])
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayHigh[4]);
                         $("#arrow_3").css("color",colorArrayHigh[4]);
                         $("#magnitude_3_name").addClass("magnitude_highlight");
                         $("#arrow_3").show();
                }else if(currentCategoryPlot.split("_")[0] == "hhh" ){
                        //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_4_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_4_sub_div").attr('style',"color:"+colorArrayElevated[4])
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayElevated[4]);
                         $("#arrow_4").css("color",colorArrayElevated[4]);
                         $("#magnitude_4_name").addClass("magnitude_highlight");
                         $("#arrow_4").show();
                }else if(currentCategoryPlot.split("_")[0] == "hhhh" ){
                        //This will add opacity to ensure that non selected are not selected
                         $("#magnitude_5_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_5_sub_div").attr('style',"color:"+colorArraySevere[4])
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArraySevere[4]);
                         $("#arrow_5").css("color",colorArraySevere[4]);
                         $("#magnitude_5_name").addClass("magnitude_highlight");
                         $("#arrow_5").show();
                }
               
                //Plot the quintile graphs for the nation
                plotQuintileGraphs( dataINCOMENation[0] , variablePresent ,"nation");
                
                console.log(" Variable present ",variablePresent);
                 
                IndiaStateOutlineMap
                   .on('mouseover',function(d){
                    
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
                       
                        $("#mapToolTipDist").text("");
                        $("#mapToolTipState").text(d.properties.ST_NM);

                        /*var tooltip = $('#mapTooltip');
                        tooltip.show();
                        d3.select('#mapTooltip').style("left", (d3.event.pageX ) + "px")   
                        d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")
                          
                        console.log(d3.event.pageX + " : " + d3.event.pageY) */
                    
                        d3.select(this).style('opacity',"0.6");
                          
                        //This will plot the quintile row graphs 
                        plotQuintileGraphs( d.properties , variablePresent );

                        if(d.properties.ST_NM == "Andhra Pradesh"){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Andhra Pradesh*")
                            MainHeading.text( "Andhra Pradesh ")
                            //InfoStateName.text("Andhra Pradesh*".toUpperCase())
                        }else 
                        if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                             //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Delhi")
                             MainHeading.text( " Delhi")
                            //InfoStateName.text("Delhi".toUpperCase())
                        }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                            //MainHeading.text(plotVarDef[plotVar.v].description.main_head + " : " +"Arunachal Pradesh")
                            MainHeading.text( "Arunachal Pradesh")
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
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + "%" );

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
                                return '#e1e1e1';
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
               
            
              if( stateNameData == null ){
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

        }
        
        // | MAP TYPE : STATES | CATEGORY : NFHS-CONDITION WITH DISTRIBUTED BY CONDITIONS |     --> EMPTY
        function stateMapNFHSConditionConditon()
        {
            
        }
        
        //CONDITION_BY_INCOME
        
        // | MAP TYPE : INDIA DISTRICT | CATEGORY : NFHS-CONDITION WITH DISTRIBUTED BY INCOMES |
        function dynamicPlotQuintilePercentage()
        {
                $("#district_smart_search_result").css("margin-top","-50%");
                //Defining the data on the information box
                $(".main_nfhs_cat_head").text(dropDownCondition[mainCategoryIdentifier]+nfhsTitleGenderSelections+nfhsTitleRegionSelections);
                $("#legend_heading_c").text(dropDownCondition[mainCategoryIdentifier]);
            
                //Change the pointer back to auto
                d3.select("body").attr('style', 'cursor:auto');
            
                console.log("Data for overall nation : ",dataTYPENation);
            
                $("#nfhs_legend_1_val").hide()
                
                MainHeading.text("INDIA")
                
                //Show nfhs selection option
                $("#nfhs_selection").show();
            
                quartileValuesLocal = quartileBounds(quartileDataLocal)
                console.log( "Quintile data values : ", quartileValuesLocal);
            
                if(IndiaDistrictCanvas == null){
                    IndiaDistrictCanvas = d3.select('#India-district-chart-area').append('svg')
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
                $("#CAVEAT_ROW").hide();
                
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
                     .attr('style', 'cursor:pointer')
                }else{
                    
                }
            
                //filling the color and gradient 
                IndiaDistrictOutlineMap
                    .attr('stroke-width', 0.5)
                    .attr('stroke', 'white')
                    .attr('fill', '#BFDFF1')
                         
                //Disabling the loader when selected
                disableLoader();
               
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
                     
                          if( district == "India" ){
                           IndiaDistrictOutlineMap
                              .attr('stroke', 'white')
                              .style('fill',function(d2,i){
                                   if(d2 == undefined || d2.properties[plotVar.v] == undefined){
                                        return '#e1e1e1'//colorAccessSubCenter_STATE_gt_5km[4];
                                    }else{
                                        return "#eee";
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
                                        return "#fc6b6b";
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
                   //Here the functionaliy to plot the state map for the NFHS COND INCOM will be coming
                    
                })
         }
        
        // | MAP TYPE : INDIA STATE | CATEGORY : NFHS-CONDITION WITH DISTRIBUTED BY INCOMES |   --> EMPTY
        function IndiaStateNFHSConditionIncome()
        {
                $("#district_smart_search_result").css("margin-top","-50%");
                //Defining the data on the information box
                $(".main_nfhs_cat_head").text(dropDownCondition[mainCategoryIdentifier]+nfhsTitleGenderSelections+nfhsTitleRegionSelections);
                $("#legend_heading_c").text(dropDownCondition[mainCategoryIdentifier]);
            
                //Change the pointer back to auto
                d3.select("body").attr('style', 'cursor:auto');
            
                console.log("Data for overall nation : ",dataTYPENation);
                
                MainHeading.text("INDIA")
                
                //Show nfhs selection option
                $("#nfhs_selection").show();
            
                //quartileValuesLocal = quartileBounds(quartileDataLocal)
                //console.log( "Quintile data values : ", quartileValuesLocal);
            
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                        .attr('height',width*.65)
                        .attr('width',width)
                        .style('background',"white")
                }else{
                    //Do nothing!!!
                }
                
                var projectionState = d3.geo.mercator()
                               .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                d3.select("#CAVEAT").text("")
                $("#CAVEAT_ROW").hide();
                
                var centered,zoomState=0,checkEnabled=0;
              
                var g;
                
                if(IndiaStateOutlineMap == null){
                    
                    g = IndiaStateCanvas.append("g");
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                        .attr('style', 'cursor:pointer')
                }else{
                        
                }
                        
               //Disabling the loader when selected
               disableLoader();
            
               console.log("Current Plot Variable : ",plotVar.v);
            
               //filling the color and gradient 
               IndiaStateOutlineMap
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
            
                //Get the apiVar listing
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
                /*if( variablePresent.low == null && variablePresent.present == null ){
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
                }*/
            
                //Initial data setup
                /*console.log("Data type naton ",dataTYPENation);
                console.log("Data income naton ",dataINCOMENation);*/
            
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
              
                /*$("#district_smart_search").on( 'keyup',function(){
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
                                        return '#e1e1e1'//colorAccessSubCenter_STATE_gt_5km[4];
                                    }else{
                                        return "#eee";
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
                                        return "#fc6b6b";
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
                    
                }*/
                
                //Remove the highlight class
                for( var i=1;i<=5;i++ ){
                    $("#magnitude_"+ i +"_name").removeClass("magnitude_highlight");
                }
                 
                IndiaStateOutlineMap
                   .on('mouseover',function(d){
                    
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
                       
                        $("#mapToolTipDist").text("");
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
                            MainHeading.text( "Andhra Pradesh*")
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
                   //Here the functionaliy to plot the state map for the NFHS COND INCOM will be coming
                    
                })
        }
        
        // | MAP TYPE : STATE | CATEGORY : NFHS-CONDITION WITH DISTRIBUTED BY INCOMES |         --> EMPTY
        function IndiaStateNFHSConditionCondition()
        {
            
        }
        
        //DISEASE
        
        // | MAP TYPE : INDIA STATES | CATEGORY : NFHS-DISEASES WITH DISTRIBUTED BY CONDITIONS |
        function dynamicPlotINDIA_Comp()
        {
                var checkEnabled = 0;
                
                $(".main_nfhs_cat_head").text(dropDownCondition[mainCategoryIdentifier]+nfhsTitleGenderSelections+nfhsTitleRegionSelections);
                $("#legend_heading_d").text(plotVarDef[plotVar.v].description.main_head)
                
                //Show nfhs selection option
                $("#nfhs_selection").show();
                $(".NFHS_QUINTLIE").hide();
                $("#nfhs_info_box_legend").hide();
                //nfhs_quartile_legend    
                
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
                plotContinuousLegend(quartileValuesLocal, currentColorArray);
                
                var projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                var pathState = d3.geo.path().projection(projectionState);
                
                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                        .attr('height',height)
                        .attr('width',width)
                        .style('background',"white")
                }else{
                    //Do nothing!!!
                }
 
                
                
                var g;
                
                if(IndiaStateOutlineMap == null){
                    
                    g = IndiaStateCanvas.append("g");
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                        .attr('style', 'cursor:pointer')
                }else{
                        
                }

                IndiaStateOutlineMap.style('fill',function(d,i){
                    if(d == undefined || d.properties[plotVar.v] == undefined){
                        return '#e1e1e1';
                    }else{
                        //console.log( parseFloat( d.properties[plotVar.v]*100 ) );
                        return linearScale(parseFloat( d.properties[plotVar.v]*100 ) );
                    }
                })
            
                //Disabling the loader when selected
                disableLoader();
            
               //Show the legends
               $("#nfhs_map_legend").show();
               //$("#nfhs_info_box_legend").show();
                
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
                    $("#magnitude_3_div").hide();
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
                            
                            console.log("Identified : ",prop);
                            console.log("Search val : ",variablePresent[prop])
                            console.log("Searched Object : ",plotVarDef[variablePresent[prop]])
                            
                            //If the name variables are not present
                            if( plotVarDef[variablePresent[prop]] == undefined ){
                                $("#magnitude_" + magnitudeVariation[prop] + "_name").text("Not Available");
                                
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text("Data Not Available");
                                
                            }else{
                                $("#magnitude_" + magnitudeVariation[prop] + "_name").text(plotVarDef[variablePresent[prop]].description.main_head);
                                
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + "%" );
                            }
                            
                       
                                

                            /*for( var i = 1; i<=5 ; i++){
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
                            }*/
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
                                        return '#e1e1e1';
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
                              /*.style('opacity',function(d2){
                                  if( state == d2.properties.ST_NM ){
                                         return "1";
                                    }else{
                                        return "0.3";
                                    }
                              })*/
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
                    //This will add opacity to ensure that non selected are not selected
                    $("#magnitude_"+ i +"_div").addClass("non-selected-opacity")
                    $("#magnitude_"+ i +"_sub_div").attr('style',   "color:#888;");
                    $("#magnitude_"+ i +"_name").removeClass("magnitude_highlight");
                }
                
                //Updating the header colors
                if(currentCategoryPlot.split("_")[0] == "dk" ){
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayLow[4]);
                         $("#arrow_2").css("color",colorArrayLow[4]);
                    
                         $("#magnitude_2_div").removeClass("non-selected-opacity");
                    
                         $("#magnitude_2_sub_div").attr('style',"color:"+colorArrayLow[4])
                         $("#magnitude_2_name").addClass("magnitude_highlight");
                         $("#arrow_2").show();
                }else if(currentCategoryPlot.split("_")[0] == "t" ){
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayHealthy[4]);
                         $("#arrow_3").css("color",colorArrayHealthy[4]);
                    
                         $("#magnitude_3_div").removeClass("non-selected-opacity")
                    
                         $("#magnitude_3_sub_div").attr('style',"color:"+colorArrayHealthy[4])
                         $("#magnitude_3_name").addClass("magnitude_highlight");
                         $("#arrow_3").show();
                }else if(currentCategoryPlot.split("_")[0] == "p" ){
                         $("#India-state-chart-area").css("border-right","2px solid "+colorArrayHigh[4]);
                         $("#arrow_1").css("color",colorArrayHigh[4]);
                    
                         $("#magnitude_1_div").removeClass("non-selected-opacity")
                    
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
                                $("#magnitude_" + magnitudeVariation[prop] + "_percent").text( ((parseFloat(dataTYPENation[0][variablePresent[prop]])*100)).toFixed(1) + "%" );

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
                                return '#e1e1e1';
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
                
              
            
                if( stateNameData == null ){
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
                
        }
    }       
           
    //In Progress
    function PlotIndia(STATEDistrictTopo,stateAPIData)
    {
            
           /*QuickFix : To adjust the margin between map and legends for StateWise and IndiaWise map*/
           d3.select("#leg_id").style('margin-top','0');
        
           //Show the radio button for the HMIS
           radioSelectionAvailabitity("HMIS");
        
           var TotalRuralPop = 0, TotalRuralTribalPop = 0,TotalUrbanPopulation = 0,Total = 0, Desired = 0,TotalInfoVillage = 0,TotalPopulation = 0;
        
           var plotVariableArray = [];
           var quartileArray = [];
           var count = 0;
        
           //Variables for data filling
           var STATEDistrict,dataValue;
        
            $("#India-district-chart-area").show();
            $("#India-state-chart-area").hide();
            $("#chart-area").hide();
            $("#backdrop-image").hide(); 
            
           MainHeading.text("Generating India Map ... ")
          
           //Consolidating the STATE data in one file
     
           //This is to change the updates done to map : Speed will slow down a bit , but the data will be correct
           if( IndiaDistrictOutlineMap == null)
           {
             STATEDistrictTopo.objects['2011_Dist'].geometries.forEach(function(d,i){
                    STATEDistrict = d.properties.DISTRICT;
                    stateAPIData.forEach(function(d2){
                        if(d2.DISTRICT == STATEDistrict)
                                {
                                    //console.log(d2.DISTRICT);
                                    count++;
                                    
//                                    if( d.properties.DISTRICT == 'Bangalore'){
//                                        d.properties.DISTRICT = 'Bengaluru';
//                                    }
//                                    if( d.properties.DISTRICT == 'Bangalore Rural'){
//                                        d.properties.DISTRICT = 'Bengaluru Rural';
//                                    }
//                                    if( d.properties.DISTRICT == 'Darjiling'){
//                                        d.properties.DISTRICT = 'Darjeeling';
//                                    }if(d.properties.DISTRICT == 'Y.S.R'){
//                                        d.properties.DISTRICT = "YSR Kadapa"
//                                    }if(d.properties.DISTRICT == 'Ganganagar'){
//                                        d.properties.DISTRICT = "Sri Ganganagar"
//                                    }if(d.properties.DISTRICT == 'Jhunjhunun'){
//                                        d.properties.DISTRICT = "Jhunjhunu";
//                                    }
//                                    if(d.properties.DISTRICT == 'Dohad'){
//                                        d.properties.DISTRICT = "Dahod";
//                                    }

                                    //Loading the variables specified in the plotVar category list
                                    //console.log(apiVAR);
                                    apiVAR.forEach(function(pv){
                                        prop = pv.data_var;
                                        d.properties[prop] = d2[prop];
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
                 
                 if(categoryCall == "PHC_AVL"){
                    plotVariableArray.push((d.properties.shortagePHC)*100/(d.properties.desiredPHC-d.properties.shortagePHC));
                 }else if(categoryCall == "SC_AVL"){
                    plotVariableArray.push((d.properties.shortageSC)*100/(d.properties.desiredSC-d.properties.shortageSC));
                 }else if(categoryCall == "CHC_AVL"){
                    plotVariableArray.push((d.properties.shortageCHC)*100/(d.properties.desiredCHC-d.properties.shortageCHC));
                 }
                 //plotVariableArray.push( !isNaN(parseFloat(d.properties[plotVar.v]))?d.properties[plotVar.v]:0 );
                 
            })
           }
            
            /*console.log("Array for the plot var : ", plotVariableArray);
        
            //QUARTILE NEED TO BE CHANGED AS PER THE NEED OF MAP
            if( plotVariableArray.length == 0 || categoryCall == "PHC_AVL" || categoryCall == "SC_AVL" || categoryCall == "CHC_AVL"){
                quartileArray = [-50,-25,25,50];
            }else{
                quartileArray = quartileBounds(plotVariableArray);
            }
            console.log("Quartile array obtained : ",quartileArray);
        
            //Add 0 as one of the value and sort the data accordingly
            //quartileArray.push(0);   
            quartileArray.sort(function(a,b){return a-b;});
        
            console.log("Quartile for " + plotVar.v + " : " , quartileArray);
            console.log("APIVAR : ", apiVAR)
        
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
            })*/

        
           else
           {
               
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
//                    if( d.properties.DISTRICT == 'Bengaluru'){
//                        d.properties.DISTRICT = 'Bangalore';
//                    }
//                    if( d.properties.DISTRICT == 'Bengaluru Rural'){
//                        d.properties.DISTRICT = 'Bangalore Rural';
//                    }if( d.properties.DISTRICT == 'Darjeeling'){
//                        d.properties.DISTRICT = 'Darjiling';
//                    }if(d.properties.DISTRICT == 'YSR Kadapa'){
//                        d.properties.DISTRICT = "Y.S.R"
//                    }if(d.properties.DISTRICT == 'Sri Ganganagar'){
//                        d.properties.DISTRICT = "Ganganagar"
//                    }if(d.properties.DISTRICT == 'Jhunjhunu'){
//                        d.properties.DISTRICT = "Jhunjhunun";
//                    }
//                    if(d.properties.DISTRICT == 'Dahod'){
//                        d.properties.DISTRICT = "Dohad";
//                    }
                     
                   
                    stateAPIData.forEach(function(d2){
                        if(d2.DISTRICT == STATEDistrict)
                                {
                                    //console.log("DIST Idetified at API : ",d2.DISTRICT)
                                    count++; 
                                      
//                                    if( d.properties.DISTRICT == 'Bangalore'){
//                                        d.properties.DISTRICT = 'Bengaluru';
//                                    }if( d.properties.DISTRICT == 'Bangalore Rural'){
//                                        d.properties.DISTRICT = 'Bengaluru Rural';
//                                    }if( d.properties.DISTRICT == 'Darjiling'){
//                                        d.properties.DISTRICT = 'Darjeeling';
//                                    }if(d.properties.DISTRICT == 'Y.S.R'){
//                                        d.properties.DISTRICT = "YSR Kadapa"
//                                    }if(d.properties.DISTRICT == 'Ganganagar'){
//                                        d.properties.DISTRICT = "Sri Ganganagar"
//                                    }if(d.properties.DISTRICT == 'Jhunjhunun'){
//                                        d.properties.DISTRICT = "Jhunjhunu";
//                                    }if(d.properties.DISTRICT == 'Dohad'){
//                                        d.properties.DISTRICT = "Dahod";
//                                    }

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
        
        console.log("Array for the plot var : ", plotVariableArray);
    
        //QUARTILE NEED TO BE CHANGED AS PER THE NEED OF MAP
        if(metArrCheck.indexOf(categoryCall) != -1){
            quartileArray = [0,60,90,100];     
        }else if( AccessArray.indexOf(categoryCall) != -1 ){
            quartileArray = [0,30,60,100];  
        }
        else if( plotVariableArray.length == 0 || categoryCall == "PHC_AVL" || categoryCall == "SC_AVL" || categoryCall == "CHC_AVL"){
            quartileArray = [-50,-25,25,50];
        }else{
            quartileArray = [0,60,90,100];  
            //quartileArray = quartileBounds(plotVariableArray);
        }
        console.log("Quartile array obtained : ",quartileArray);
    
        //Add 0 as one of the value and sort the data accordingly
        //quartileArray.push(0);   
        quartileArray.sort(function(a,b){return a-b;});
    
        console.log("Quartile for " + plotVar.v + " : " , quartileArray);
        console.log("APIVAR : ", apiVAR)
    
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
        
        $("#DENOMINATOR").text(PlotCategory[categoryCall].denom_head)
        $("#NUMERATOR").text(PlotCategory[categoryCall].num_head)
        
        if(PlotCategory[categoryCall].plotType == "DIST"){
            dynamicPlot(); 
        }else{
            dynamicPlotPercentage();
        }
        
        function dynamicPlot()
        {
                var sht = apiVAR[0].data_var;
                var dsr = apiVAR[3].data_var;
                
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
            
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text("INDIA")
               
                legendsData.style('visibility','visible')

                if(IndiaDistrictCanvas == null){
                    
                    IndiaDistrictCanvas = d3.select('#India-district-chart-area').append('svg')
                        //.attr('height',height)
                        .attr('width',width)
                        .style('background',"#fff")
                        .attr('height',width*.65)
                    
                }else{
                    
                }
            
                var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
                var colorArrayRev = ["#4f9cb4","#80c6a7","#e0f19d","#f18a5e","#a31244"];

                //Updating the map colors with the quartile data
                var checkEnabled = 0;
                var linearScale = d3.scale.linear()
                      .domain(quartileArray)
                      .range(colorArrayRev);

                plotContinuousLegend([...quartileArray], colorArray,"HMIS");
           
                
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
                        InfoShortage.text("NA");
                    }else{
                        InfoShortage.text(((Desired-Total)*100/Desired).toFixed(0)+"%");
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
              var g;
              if(IndiaDistrictOutlineMap == null){
                      
                    g = IndiaDistrictCanvas.append("g");
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
                  
              //Disabling the loader when selected
               disableLoader();
                  
              IndiaDistrictOutlineMap
                  .attr('stroke-width', 0)
                  .style('fill',function(d,i){
                    if(firstLoad == 0){
                        firstLoad = 1;
                        $("#India-district-chart-area").show();
                        $("#India-state-chart-area").hide();
                        $("#chart-area").hide();
                        $("#backdrop-image").hide();
                    }
                    /*var linearScale = d3.scale.linear()
                              .domain([-50,25,0,25,50])
                              .range(["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"]);*/
                  
                    if(d == undefined || d.properties[plotVar.v]== undefined){
                        return color_PHC_shortage_STATE_2011[4];
                    }
                    else{ 
                        //Changing the formula to {(Existing - Desired) / Desired}
                        //if(d.properties[sht] > 0)
                        return linearScale( ((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) );
                    }
                 })
               
               .on('mouseover',function(d){
                
                d3.select(this).style('opacity',"0.6")
                   
                    if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text( d.properties.DISTRICT +" (Andhra Pradesh*)")
                    }else 
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text( d.properties.DISTRICT +" (Delhi)")
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text( d.properties.DISTRICT +" (Arunachal Pradesh)")
                    }else{
                        MainHeading.text( d.properties.DISTRICT +" (" + d.properties.ST_NM +")")
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
                        
                        $("#mapToolTipDist").text(d.properties.DISTRICT);
                        $("#mapToolTipState").text(d.properties.ST_NM);

                        var tooltip = $('#mapTooltip');
                        tooltip.show();
                        d3.select('#mapTooltip').style("left", (d3.event.pageX ) + "px")   
                        d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")
                        
                        console.log("Data values : ", d.properties[sht]);
                        
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
                                console.log(d.properties[sht]);
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
                    MainHeading.text("INDIA")
                    d3.select(this).style('opacity',"1")
                     
                        var tooltip = $('#mapTooltip');
                        tooltip.hide();
                    
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
                     }).on('click',function(){

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
                InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
                
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text("INDIA")
                
                /*$("#HR").hide()
                $("#INFRA").hide()
                $("#SUPPLY").hide()*/
                
                if(nfhsPlotEnable == 0){
                    $("#nfhs_selection").hide();
                }else{
                    $("#nfhs_selection").show();
                }
            
                var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
                var colorArrayRev = ["#4f9cb4","#80c6a7","#e0f19d","#f18a5e","#a31244"];
                
                //Updating the map colors with the quartile data
                var linearScale = d3.scale.linear()
                          .domain(quartileArray)
                          .range(["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"]);
            
                plotContinuousLegend([...quartileArray], colorArray,"HMIS");
                
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
                $("#CAVEAT_ROW").hide();  
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
                }else if(plotVar.v == 'SDH' || plotVar.v == 'DH'){
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
                       
                        InfoExisting.text(((TotalRuralTribalPop/TotalRuralPop)*100).toFixed(0))
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("Percent")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        $(".SUB_CATEGORY_DROPDOWN_SELECT").hide();  
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
                       
                        InfoExisting.text(((TotalRuralTribalPop/TotalRuralPop)*100).toFixed(0)+"%")
                        InfoRequired.text("")
                        InfoRequired.style('background','#fff')
                        InfoExisting.style('background','#BFDFF1')
                        InfoRequiredLabel.text("")
                        InfoExistingLabel.text("Percent")
                        InfoShortageLabel.text("")
                        InfoShortage.text("")
                        $(".SUB_CATEGORY_DROPDOWN_SELECT").hide();  
                }
                
              var checkEnabled=0,g;

              if(IndiaDistrictOutlineMap == null){

                g = IndiaDistrictCanvas.append("g");
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

               //Disabling the loader when selected
               disableLoader();
                
                if(currentCategoryPlot == 'SDH_AVL' || currentCategoryPlot == 'DH_AVL'){
                      IndiaDistrictOutlineMap
                          .attr('stroke-width', 0.5)
                          .attr('stroke', 'white')
                          .style('fill',"BFDFF1")
                }else{
                     IndiaDistrictOutlineMap
                          .attr('stroke-width', 0)
                          .attr('stroke', 'white')
                          .style('fill',function(d,i){
                           if(d == undefined || d.properties[plotVar.v] == undefined)
                            {
                                return '#e1e1e1';//colorAccessSubCenter_STATE_gt_5km[4];
                            }else{
                                return linearScale(parseFloat(d.properties[plotVar.v]));
                            }
                         })
                }
                 
                IndiaDistrictOutlineMap
                /*.on('click',function(d){
                   
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
                                return '#e1e1e1';
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
                })*/
               .on('mouseover',function(d){
                
 		            if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text( d.properties.DISTRICT +" (Andhra Pradesh*)")
                    }else 
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text( d.properties.DISTRICT +" (Delhi)")
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text( d.properties.DISTRICT +" (Arunachal Pradesh)")
                    }else{
                        MainHeading.text( d.properties.DISTRICT +" (" + d.properties.ST_NM +")")
                    }
                    
                    $("#mapToolTipDist").text(d.properties.DISTRICT);
                    $("#mapToolTipState").text(d.properties.ST_NM);

                    var tooltip = $('#mapTooltip');
                    tooltip.show();
                    d3.select('#mapTooltip').style("left", (d3.event.pageX ) + "px")   
                    d3.select('#mapTooltip').style("top", (d3.event.pageY - 50) + "px")

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
                            
                        }else if(plotVar.v == 'SDH' || plotVar.v == 'DH')
                        {
                            InfoExistingLabel.text("No. of Hospitals")
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
                       
                            InfoExisting.text(parseFloat(d.properties[plotVar.v]).toFixed(0)+"%")
                          
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
                    MainHeading.text("INDIA")
                    d3.select(this).style('opacity',"1")
                    
                    var tooltip = $('#mapTooltip');
                    tooltip.hide();
                     
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
                   
                })/*.on('click',function(d){
                   
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
                                return '#e1e1e1';
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
                    
                })*/
                
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
      
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }  
    }   
           
    function qualityPlots(STATEDistrictTopo,stateAPIData)
    {
           MainHeading.text("Generating Map...");
           
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
           
            var quartileArray = [];
            var plotVariableArray = [];

           if(PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){
             
               radioSelectionAvailabitity("HMIS_INDEX");

               if( IndiaStateOutlineMap != null ){

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

                radioSelectionAvailabitity();
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
                     });
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

            //Resize funciton for this particular rmap
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
        
            //QUARTILE NEED TO BE CHANGED AS PER THE NEED OF MAP
        try
        {
            quartileArray = quartileBounds(plotVariableArray);
        }
        catch(e){
            quartileArray = [-50,-25,25,50];
        }
        console.log("Quartile array obtained : ",quartileArray);
           
        if(metArrCheck.indexOf(categoryCall) != -1){
            quartileArray = [0,60,90,100];     
        }else if( AccessArray.indexOf(categoryCall) != -1 ){
            quartileArray = [0,30,60,100];  
        }
        else if( plotVariableArray.length == 0 || categoryCall == "PHC_AVL" || categoryCall == "SC_AVL" || categoryCall == "CHC_AVL"){
            quartileArray = [-50,-25,25,50];
        }else{
            quartileArray = [0,60,90,100];  
            //quartileArray = quartileBounds(plotVariableArray);
        }
       
        if(IndiaStateOutlineMap != null){
           //console.log("State Map : ",IndiaStateOutlineMap);
            IndiaStateOutlineMap.style('fill',function(d,i){
                //console.log("ARR : ",d.properties);
            })
           //console.log("State API data : ",STATEDistrictTopo);
        }
        
        InfoRuralPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
        InfoRuralTribalPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
        InfoUrbanPopulation.style("font-size",(fontSize*infoBoxPopulationFontRatio)+'px')
        
        //Final check for the appearance of the radio
//        if( currentStatePlot == "India_state" && categoryCall.indexOf("ACCESSIBILITY") != -1){
//            console.log("This is current category pliot " + categoryCall);
//            $("#hmis_selection_1").show();
//            $(".SUB_CATEGORY_DROPDOWN_SELECT").show();
//        }

            
        if(stateNameCall == 'India_state' && PlotCategory[categoryCall].plotType == "DIST"){
              //Changing the visisbility of the data
              $("#nfhs_legend_1").show();
              $("#nfhs_legend_1_val").show();
              $("#legend_Header").hide();
              $("#sub-info").show();
              $("#sub-info-box").show();
            
            dynamicPlotINDIA_Comp()     
        }else if(stateNameCall == 'India_state' && PlotCategory[categoryCall].plotType == "percent"){
            console.log("Selected INDIA STATE + PERSENT");
            dynamicPlotINDIA_Percentage()     
        }else if(stateNameCall == 'India_state' && PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY"){
                //Changing the visisbility of the data
                $("#nfhs_legend_1").show();
                $("#nfhs_legend_1_val").show();
                $("#legend_Header").hide();
                $("#sub-info").show();
                $("#sub-info-box").show();
            dynamicPlot_INDIA_NON_COMP_QUALITY();
        }else if(PlotCategory[categoryCall].plotType == "QUALITY_INDEX"){
            
            $("#nfhs_legend_1").hide();
            $("#nfhs_legend_1_val").hide();
            $("#legend_Header").hide();
            
            dynamicPlot_HMIS_INDEX()   
        }else if(PlotCategory[categoryCall].plotType == "NON_COMP_QUALITY" && stateNameCall != 'India_state'){
            //Changing the visisbility of the data
              $("#nfhs_legend_1").hide();
              $("#nfhs_legend_1_val").hide();
              $("#legend_Header").hide();
              $("#sub-info").hide();
              $("#sub-info-box").hide();
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
                $("#hmis_selection_1").show();
                $("#category_div_for_header").show();
                $(".SUB_CATEGORY_DROPDOWN_SELECT").show();
                console.log("Applied visibility");
            
                var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
                var colorArrayRev = ["#4f9cb4","#80c6a7","#e0f19d","#f18a5e","#a31244"];

                //Updating the map colors with the quartile data
                var linearScale = d3.scale.linear()
                      .domain(quartileArray)
                      .range(colorArrayRev);

                plotContinuousLegend([...quartileArray], colorArray,"HMIS");
                
                projectionState = d3.geo.mercator()
                             .translate([-width*1.0*1, height*1.0*1.24])
                             .scale([width*1.1*1]);
                pathState = d3.geo.path().projection(projectionState);
                
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text("INDIA")
            
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

                var g;
                
                if(IndiaStateOutlineMap == null){
                    
                    g = IndiaStateCanvas.append("g");
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                }else{
                        
                }

                IndiaStateOutlineMap.style('fill','#A6BDDB');
                
                //Disabling the loader when selected
                disableLoader();
                
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
                
            
                if( stateNameData == null ){
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
                
                    IndiaStateOutlineMap.style('fill',function(d,i){
                    if(d == undefined || d.properties[sht] == undefined || d.properties[dsr]==undefined){
                        /*if(STATE == 'Andhra Pradesh' || STATE == 'Telangana'){
                            return "#FFF";
                        }*/
                        return color_PHC_shortage_STATE_2011[4];
                    }
                    else{ 
                        //Changing the formula to {(Existing - Desired) / Desired}
                        linearScale
                        if(d.properties[sht] > 0){
                            if(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return linearScale(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0));
                                //return plotVarDef[plotVar.v].limit.l4.c;
                            }else{
                                return linearScale(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0));
                                //return plotVarDef[plotVar.v].limit.l3.c;
                            }
                        }
                        else if(d.properties[sht] <= 0){
                            if(((d.properties[sht]*-1)*100/(d.properties[dsr])).toFixed(0) <= 25){
                                return linearScale(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0));
                                //return plotVarDef[plotVar.v].limit.l2.c;
                            }else{
                                return linearScale(((d.properties[sht])*100/(d.properties[dsr])).toFixed(0));
                                //return plotVarDef[plotVar.v].limit.l1.c;
                            } 
                        }
                    }
                 })
               .on('mouseover',function(d){
                
                d3.select(this).style('opacity',"0.6")
                    if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text(  "Andhra Pradesh*")
                    }else 
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text(  "Delhi")
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text(  "Arunachal Pradesh")
                    }else{
                        MainHeading.text(d.properties.ST_NM )
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
                    MainHeading.text("INDIA")
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
       
        //Thsi is to work on --
        function dynamicPlotINDIA_NON_COMP()
        { 
               $("#legends").hide();
               $("#main_hmis_cat_head").show();
               MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
               MainHeading.text("INDIA")      
          
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
             IndiaStateOutlineMap.style('fill','#A6BDDB');
            
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
                
              //Disabling the loader when selected
              disableLoader();
            
              if( stateNameData == null ){
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
      
              stateNameData.on('mouseover',function(d){
                  
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                MainHeading.text("Andhra Pradesh*")
                            }else 
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 MainHeading.text("Delhi")
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                MainHeading.text("Arunachal Pradesh")
                            }else{
                                MainHeading.text(d.properties.ST_NM)
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
                     MainHeading.text("INDIA");
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
                        InfoShortage.text("");
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
                     MainHeading.text("IND")
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
            console.log("Show mapped data : ",STATEDistrictTopo);
            
            console.log("Thsi is called : " + categoryCall )
            
//            $(".SUB_CATEGORY_DROPDOWN_SELECT").hide();
//            $("#AVL").hide();
            if( categoryCall.indexOf("SC") != -1 || categoryCall.indexOf("PHC") != -1 || categoryCall.indexOf("CHC") != -1 || 
              categoryCall.indexOf("DH") != -1 || categoryCall.indexOf("SDH") != -1 ){
                $("#hmis_selection_1").show();
                $("#category_div_for_header").show();
                $(".SUB_CATEGORY_DROPDOWN_SELECT").show();
            }else{
                $(".SUB_CATEGORY_DROPDOWN_SELECT").hide();
                $("#AVL").hide();
            }
            
            
            MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
            MainHeading.text("INDIA");
               
            legendsData.style('visibility','visible');
          
            $("#DENOMINATOR").text(PlotCategory[categoryCall].denom_head);
            $("#NUMERATOR").text(PlotCategory[categoryCall].num_head);
          
            if(IndiaStateCanvas == null){
                IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                   .attr('width',width)
                   .style('background',"#fff")
                   .attr('height',width*.65)
            }else{
                //Do nothing
            }
            
            //Changing the visisbility of the data
            if( meternalSelect == 0 ){
                  $("#nfhs_legend_1").show();
                  $("#nfhs_legend_1_val").show();
                  $("#legend_Header").hide();
                  $("#sub-info").show();
                  $("#sub-info-box").show();
            }
            
            var colorArray = ["#a31244","#f18a5e","#e0f19d","#80c6a7","#4f9cb4"];
            var colorArrayRev = ["#4f9cb4","#80c6a7","#e0f19d","#f18a5e","#a31244"];

            //Updating the map colors with the quartile data
            var linearScale = d3.scale.linear()
                  .domain(quartileArray)
                  .range(colorArray);
            
            plotContinuousLegend([...quartileArray], colorArray,"HMIS");
          
            var projectionState = d3.geo.mercator()
                           .translate([-width*1.0*1, height*1.0*1.24])
                         .scale([width*1.1*1]);
            var pathState = d3.geo.path().projection(projectionState);
             $("#CAVEAT_ROW").hide()
             d3.select("#CAVEAT").text("")

            InfoStateName.text("INDIA".toUpperCase())
            
            
          
            if(plotVar.v == 'p_within5_SC' || plotVar.v == 'p_within10_CHC' || plotVar.v == 'p_within5_PHC')
            {

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
            }
            else
            {

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
            var g;
          
            if(IndiaStateOutlineMap == null){
                g = IndiaStateCanvas.append("g");
                IndiaStateOutlineMap = g.selectAll('path')
                    .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                    .enter().append('path')
                    .attr('d',pathState)
                    .attr('stroke-width', 0.5)
                    .style('fill','#A6BDDB')
                    .attr('stroke', 'white')
            }else{
                    
            }
            
          IndiaStateOutlineMap
                  .attr('stroke', 'white')
                  .style('fill',function(d,i){
                    console.log("This is individual data ", d);
                   if(d == undefined || d.properties[plotVar.v] == undefined){
                        return '#445'//colorAccessSubCenter_STATE_gt_5km[4];
                    }
                    else{
                        console.log( "Value Obtained : ",d.properties[plotVar.v].toFixed(0) );
                        return  linearScale(d.properties[plotVar.v].toFixed(0));
                    } 
                 })
               
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
            
            
              //Disabling the loader when selected
              disableLoader();
            
              if( stateNameData == null ){
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
      
              stateNameData.on('mouseover',function(d){
                  
                            if(d.properties.ST_NM == "Andhra Pradesh"){
                                MainHeading.text("Andhra Pradesh*")
                            }else 
                            if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                                 MainHeading.text("Delhi")
                            }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                                MainHeading.text("Arunachal Pradesh")
                            }else{
                                MainHeading.text(d.properties.ST_NM)
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
                  
                         MainHeading.text("INDIA")
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
          
                
               
                 IndiaStateOutlineMap.on('mouseover',function(d){
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
           
         }
          
        //Plotting the main data map
        function dynamicPlot_INDIA_NON_COMP_QUALITY()
        {   
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text("INDIA");
            
                //This has been implemented before, its just here coz i could not find the reason why it is not working
                $("#nfhs_legend_1").hide();
                $("#nfhs_legend_1_val").hide();
                $("#legend_Header").hide();
                $("#sub-info").hide();
                $("#sub-info-box").hide();

                //show the non comp qality radio
                $("#HR").show()
                $("#INFRA").show()
                $("#SUPPLY").show()

                $("#nfhs_map_legend").hide();
            
            
                console.log("Collected data in function : ",stateAPIData);
                $("#AVL").show();
            
                if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                   STATE == 'DELHI'
                }if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                    STATE == 'ARUNACHAL PRADESH'
                }
                
                hideXtra();
                if(typeVar == 'HR'){
                    InfoStateName.text("Human Resources")
                    console.log("Quality Object : ",myQObj)
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
            
                var g;
                
                if(IndiaStateOutlineMap == null){
                    g = IndiaStateCanvas.append("g");
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                }else{
                        
                }
             
             IndiaStateOutlineMap.style('fill','#A6BDDB');
                
              //Disabling the loader when selected
              disableLoader();
                
             IndiaStateOutlineMap.attr('stroke', 'white')
                .on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")
                        console.log("Get data",d);
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
                
            
                if( stateNameData == null ){
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
                
                  stateNameData.on('mouseover',function(d){
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
                 
                  console.log("data obtained : ",d);
                    
                  if(PlotCategory[categoryCall].hr.length == 0){
                      InfoHealthCategoryName.text("Data Not Available")
                  }else{    
                      InfoHealthCategoryName.text(plotVarDef[plotVar.v].description.category_head)
                  }
                
                  for(var i = 0 ; i < PlotCategory[categoryCall].hr.length ; i++){
                    var var_name = PlotCategory[categoryCall].hr[i];
                    
                        console.log(d[var_name])    
                        
                        $("#LABEL_"+(i+1)).show();
                        $("#VALUE_"+(i+1)).show();
                        d3.select("#LABEL_"+(i+1)).text(PlotCategory[categoryCall].hr_label[i])
                         if(d == undefined || d[var_name] == null){
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
                         if(d == undefined || d[var_name] == null){
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
                         if(d == undefined || d[var_name] == null){
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
                
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text("INDIA")
                
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
                 
                var g;
                
                if(IndiaStateOutlineMap == null){
                    g = IndiaStateCanvas.append("g");
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects['2011_Dist']).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                }else{
                        
                }
                IndiaStateOutlineMap.style('fill','#A6BDDB');

                //Disabling the loader when selected
                disableLoader();
                
                IndiaStateOutlineMap.attr('stroke', 'white')
                
                .on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")

                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                    })
        }
       
        function dynamicPlot_STATE_NON_COMP_QUALITY()
        {
                MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
                MainHeading.text("INDIA");

                //$("#ACCESSIBILITY").show();
                $("#AVL").show();

                $("#nfhs_map_legend").hide();

                //show the non comp qality radio
                $("#HR").show()
                $("#INFRA").show()
                $("#SUPPLY").show();
            
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
            
                console.log("Data collected : ",stateAPIData);
                
                InfoRuralPopulation.text(stateAPIData[0].n_rural_pop)
                InfoRuralTribalPopulation.text(stateAPIData[0].n_rural_tr_pop)
            
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

                    /*if(d.properties.ST_NM == "Andhra Pradesh"){
                        MainHeading.text("Andhra Pradesh*")
                    }else 
                    if(d.properties.ST_NM.toUpperCase() == 'NCT OF DELHI' || d.properties.ST_NM.toUpperCase() == 'DELHI'){
                         MainHeading.text("Delhi")
                    }else if(d.properties.ST_NM.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text("Arunachal Pradesh")
                    }else{
                        MainHeading.text(d.properties.ST_NM)
                    }*/

                if(IndiaStateCanvas == null){
                    IndiaStateCanvas = d3.select('#India-state-chart-area').append('svg')
                            .attr('height',height)
                            .attr('width',width)
                            .style('background',"white")
                }else{
                    
                }
             
                var g ;
               
                if(IndiaStateOutlineMap == null){
                    
                   g = IndiaStateCanvas.append("g");
                    IndiaStateOutlineMap = g.selectAll('path')
                        .data(topojson.feature(STATEDistrictTopo, STATEDistrictTopo.objects.Admin2).features)
                        .enter().append('path')
                        .attr('d',pathState)
                        .attr('stroke-width', 0.5)
                        .style('fill','#A6BDDB')
                        .attr('stroke', 'white')
                }else{
                        
                }

                IndiaStateOutlineMap.style('fill','#A6BDDB');
               
                //Disabling the loader when selected
                disableLoader();
           
                IndiaStateOutlineMap.on('mouseover',function(d){
                    d3.select(this).style('opacity',"0.7")
                    })
                .on('mouseout',function(){
                    d3.select(this).style('opacity',"1")
                    })
                .on('click',function(d){
                  
                })
        }
            
        /*function dynamicPlotNonComp()
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
             
             
              //Disabling the loader when selected
              disableLoader();
            
              MainHMISHead.text(plotVarDef[plotVar.v].description.main_head);
              MainHeading.text("INDIA")
                
              IndiaStateOutlineMap
               .on('mouseover',function(d){
                    if(STATE == "Andhra Pradesh"){
                        MainHeading.text("Andhra Pradesh*")
                    }else 
                    if(STATE.toUpperCase() == 'NCT OF DELHI' || STATE.toUpperCase() == 'DELHI'){
                         MainHeading.text("Delhi")
                    }else if(STATE.toUpperCase() == 'ARUNANCHAL PRADESH'){
                        MainHeading.text("Arunachal Pradesh")
                    }else{
                        MainHeading.text(STATE)
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
                    MainHeading.text("INDIA")
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
        }*/
       
        //Plotting the HMIS Indexes map
        function dynamicPlot_HMIS_INDEX()
        {

                $("#nfhs_index_legend").show();
            
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
            
                
                $("#main_hmis_cat_head").text("Health Infrastructure Index : INDIA");
                MainHeading.text("INDIA")
                //MainHeading.text("Health Infrastructure Index : INDIA")

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
                
                var g;
                if(IndiaStateOutlineMap == null){
                    
                    g = IndiaStateCanvas.append("g");
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
            
                //Disabling the loader when selected
                disableLoader();

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
                                return '#e1e1e1'
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
                            return '#e1e1e1'
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
                            return '#e1e1e1'
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

             if( stateNameData == null ){
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
        }
    }   
    
/**********************************************   UTILITY FUNCTIONS   *********************************************************/
            
    //This function will hide the loader from the screen once the map is ready
    function hideLoader()
    {
        $("#loader_screen").hide();
    } 

    function plotContinuousLegend(rangeArr, colorArr,mapType)
    {
            
            if( continuousLegend ){
                continuousLegend.remove();
            }
            
            $("#legend_Header").text("Population Distribution (in Percentage)");

            var w = 360, h = 40;

            //Need to updated as per the need of the MAP
            continuousLegend = d3.select("#nfhs_legend_1").append("svg").attr("width", '90%').attr("height", h);
        
            $("#nfhs_legend_1").show();
            $("#nfhs_legend_1_val").show();

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
        
            console.log("My collected range array : ",rangeArr[3]);
        
            var y;
            if( mapType == "HMIS" ){
                $("#quartile_1_val").text( parseFloat(rangeArr[0]).toFixed(1) );
                $("#quartile_2_val").text( parseFloat(rangeArr[1]).toFixed(1) );
                $("#quartile_3_val").text( parseFloat(rangeArr[2]).toFixed(1) );
                $("#quartile_4_val").text( parseFloat(rangeArr[3]).toFixed(1) );
            }else{
                $("#quartile_1_val").text( (parseFloat(rangeArr[0])*100).toFixed(1) );
                $("#quartile_2_val").text( (parseFloat(rangeArr[1])*100).toFixed(1) );
                $("#quartile_3_val").text( (parseFloat(rangeArr[2])*100).toFixed(1) );
                $("#quartile_4_val").text( (parseFloat(rangeArr[3])*100).toFixed(1));
            }
           
            /*if( mapType == "HMIS" ){
                y = d3.scale.linear()
                    .domain( [-34 ,540] )
                    .range( [0,300] )
            }
            else
            {
                y = d3.scale.linear()
                    .domain([(parseFloat(rangeArr[1])*100).toFixed(0) ,0 ]  )
                    .range([300, 0])
            }*/

            /*var yAxis = d3.svg.axis()
                        .scale(y)
                        .tickSize(0)
                        .ticks(4)
                        .orient("bottom");*/

            /*continuousLegend.append("g")
                //.attr("class", "y axis")
                .attr("transform", "translate(51,20)")
                .call(yAxis)
                .append("text")
                .attr("width", w)
                .attr("transform", "rotate(-90)")
                .attr("y", 30)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style("font-size", "8px")*/

}

    //This is to change the adjust the size of the maps as per the change in the screen size
    d3.select(window).on('resize',function()
    {
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

    //Function to calculate the quartile i.e. an array of 4 numbers, for plotting the maps
    function quartileBounds(_sample)
    {
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

    //This function is to apply the commas in a lare number 
    function numberWithCommas(x)
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }  
        
    function radioSelectionAvailabitity(type){
        if( type == "NFHS" ){
            $("#hmis_indexes_1").hide();
            $("#hmis_selection_1").hide();
            $("#nfhs_selection").show();
        }else if( type == "HMIS_INDEX" ){
            $("#hmis_indexes_1").show();
            $("#hmis_selection_1").hide();
            $("#nfhs_selection").hide();
        }else if( type == "HMIS" ){
            $("#hmis_indexes_1").hide();
            $("#hmis_selection_1").show();
            $("#nfhs_selection").hide();
        }else{
            $("#hmis_indexes_1").hide();
            $("#hmis_selection_1").hide();
            $("#nfhs_selection").hide();
        }
    }
              
/******************************************************************************************************************************/
  }
  function hideXtra()
  {
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
  function hideQualityVariables()
  {
        $("#HR").hide()
        $("#INFRA").hide()
        $("#SUPPLY").hide()
        
    }
  function showQualityVariables()
  {
        $("#HR").show()
        $("#INFRA").show()
        $("#SUPPLY").show()
        
    }
}
    
})(window, document, jQuery);