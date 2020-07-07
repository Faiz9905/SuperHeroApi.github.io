const btn = document.getElementById('btn');
const search = document.getElementById('search');
const resultBar = document.querySelector('.result');


const tempList = [];

let response = localStorage.getItem('list');
console.log(response);
if(response != null){
    tempList = JSON.parse(response);
}



let LIST = new Array();

function getPresentOrnot(arr, value){
   if(arr == null)
   return 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].id == value)
          return 1; 
    }

    return 0;
}

function goToBio(value){
    localStorage.setItem('key', value)
    window.location.href = "superHeroDetails.html";
    console.log(suggested.id);
}



function addToFav(bt, value, name, trash, imageURL){
    
    
    console.log(tempList);
    let res = getPresentOrnot(tempList, value)
    if(res == 1){
        alert("Already Added");
    }
    else{
     
        if(tempList == null){
            LIST.push({
                'id' : value,
                'name' : name,
                'trash' : trash,
                'url' : imageURL
                
        });
        localStorage.setItem('list' , JSON.stringify(LIST));

        }
   else{
    tempList.push({
        'id' : value,
        'name' : name,
        'trash' : trash,
        'url' : imageURL
  });
  localStorage.setItem('list' , JSON.stringify(tempList));

   }
       
        bt.innerText = "Added";
       

    }
  
//    console.log(LIST);
}
function displayList(){
    var val = search.value;
    if(val === "") {
        resultBar.innerHTML = "";
       
    }
    var xhrRequest = new XMLHttpRequest();
    var url = 'https://www.superheroapi.com/api.php/294165655329865/search/';
    url = url + val;
    xhrRequest.open('get', url, 'false');
    xhrRequest.send();

   

    xhrRequest.onload = function(){
        var responseJSON = JSON.parse(xhrRequest.response);
        if(responseJSON.response == 'error'){
            resultBar.innerHTML = '';
            return;
        }
        // console.log(responseJSON);
        resultBar.innerHTML = '';

                 responseJSON.results.forEach(function(suggested){

                 const div = document.createElement('div');
                 div.setAttribute('even' , 'div');

                 const bt = document.createElement("BUTTON");
                 bt.setAttribute('even', 'btn');
                  
                 let res = getPresentOrnot(tempList, suggested.id);
                     console.log(res);
                     if(res == 1){
                         bt.innerHTML = "Added";
                     }
                     else{
                         bt.innerHTML = "Add";
                     }
                 
                //  bt.innerHTML = suggested.id;
                 div.innerHTML = suggested.name;
                 
                 
                 div.addEventListener('click', function(e){
                    
                    let i = e.target;
                    let item = i.getAttribute("even");
                    if(item == 'div'){
                        var value = (suggested.id).toString();
                        goToBio(value);
                       
                    }
                    else{

                        // var value = (suggested.id).toString();
                        
                        var xhrRequestImage = new XMLHttpRequest();
                        var url = 'https://www.superheroapi.com/api.php/294165655329865/';
                        url = url + suggested.id;
                        xhrRequestImage.open('get', url, true);
                        xhrRequestImage.send();
                        
                        xhrRequestImage.onload = function(){
                            var responseImage = JSON.parse(xhrRequestImage.response);
                            var imageURL = responseImage.image;
                            // console.log(imageURL.url);
                           

                            addToFav(bt, suggested.id, suggested.name, false, imageURL.url);
                        }

                        // alert(imageResponse.image)
                        // alert(suggested.id);
                        // alert('https://www.superheroapi.com/api.php/294165655329865/' + suggested.id + '/image');
                       
                        
                    }
                   
                   
                });



                 resultBar.appendChild(div);
                 div.appendChild(bt);
               });



             }
}





search.addEventListener('keyup', displayList);

