var searched = []; 

// create local storage function pass in searchbox field 
var saveSearches= function(currentSearch){

    
// add parameter to recent searches array
if ( currentSearch != ""){
    searched.push(currentSearch); 
    localStorage.setItem("searches", JSON.stringify(searched)); 
}
// test 
console.log(localStorage.getItem("searches")); 
};



