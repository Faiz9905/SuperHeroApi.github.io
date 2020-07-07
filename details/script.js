var loo = localStorage.getItem('key');
const name = document.getElementById('name');
const img = document.getElementById('img');
console.log(loo);

function onLoadPage(){
    var xhrRequest = new XMLHttpRequest();
    var url = 'https://www.superheroapi.com/api.php/294165655329865/';
    url = url + loo;
    xhrRequest.open('get', url, true);
    xhrRequest.send();

    xhrRequest.onload = function(){
        var responseJSON = JSON.parse(xhrRequest.response);
        var imageURL = responseJSON.image;
        console.log(imageURL.url);
        img.src = imageURL.url;
    //    document.getElementById('profileImage').style.backgroundImage = url(imageURL);






        name.innerText = responseJSON.name;
        var biography = responseJSON.biography;
        document.getElementById('fullname').innerText = biography['full-name'];
        document.getElementById('egos').innerText = biography['alter-egos'];
        document.getElementById('ali').innerText = biography['aliases'];
        document.getElementById('placeBirth').innerText = biography['place-of-birth'];
        document.getElementById('firstAppear').innerText = biography['first-appearance'];
        document.getElementById('publisher').innerText = biography['publisher'];
        document.getElementById('alignment').innerText = biography['alignment'];
     
        var power = responseJSON.powerstats;

        document.getElementById('intel').innerText = power['intelligence'];
        document.getElementById('strength').innerText = power['strength'];
        document.getElementById('speed').innerText = power['speed'];
        document.getElementById('durability').innerText = power['durability'];
        document.getElementById('power').innerText = power['power'];
        document.getElementById('combat').innerText = power['combat'];


    }
  
}
// console.log(responseJSON.powerstats.speed);
onLoadPage();