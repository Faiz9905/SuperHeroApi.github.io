var main = document.getElementById('main');
var receive = localStorage.getItem('list');
var removeButton = document.getElementById('removeButton');
const list = document.getElementById('list');


var response = JSON.parse(receive);
console.log(response)
console.log(response[0].name);

function createList(name, i, url){
   // var name = 'Faizan';
   const text = `
   <li class="item">
                <img class="img" src="${url}" alt="">
                <p class="text">${name}</p>
                <button class="removeButton" work = "remove" id = "${i}">Remove</button>
            </li>
      
   `
   const position = "beforeend";

   list.insertAdjacentHTML(position, text);
}


function removeFunction(t){
   t.parentNode.parentNode.removeChild(t.parentNode);
   let id = t.getAttribute('id')
   console.log(t.getAttribute('id'));
  response.splice(t, 1); 
  
  
   localStorage.setItem('list' , JSON.stringify(response));


  
}

list.addEventListener('click', function(event){
   let t = event.target;
   let i = t.getAttribute('work');
   if(i == 'remove'){

      removeFunction(t);
   }
})
for(let i = 0; i < response.length; i++){
   if(response[i].trash == 'false'){
      // console.log(response[i].trash);
      continue;
     
   }
   else
   createList(response[i].name, i, response[i].url);
}

