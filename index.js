let titla = document.getElementById('titla');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let supmit = document.getElementById('supmit');
let tbody = document.getElementById('tbody');
let mood = 'create';
let tmp;

// get total
function getTotal() {
   if(price.value !='')
   {
      let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
      total.innerHTML=result;
      total.style.backgroundColor='#040';
   }else{
      total.innerHTML=' ';
      total.style.backgroundColor='#a0002d';
   }
}

// create
let dataProduct;
if(localStorage.product !=null){
   dataProduct = JSON.parse(localStorage.product)
}else{
   dataProduct=[];
}
supmit.onclick = function(){
   let newProduct = {
      titla:titla.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value.toLowerCase(),
}
if(titla.value !='' && price.value !='' && category.value !='' && newProduct.count < 100){
   if(mood === 'create'){
      if (newProduct.count > 1){
         for(let i = 0 ; i < newProduct.count;i++){
            dataProduct.push(newProduct)
         }
      }else{
         dataProduct.push(newProduct)
      }
      
   }else{
      dataProduct[tmp]=newProduct;
      mood='create';
      supmit.innerHTML='Create';
      count.style.display='block';
   }
   clearData();
}


localStorage.setItem('product' , JSON.stringify(dataProduct))


showData();
}


// // clear Data 
function clearData(){
      titla.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   discount.value='';
   total.innerHTML = '';
   count.value=''
   category.value=''
}

function showData(){
   getTotal();
   let table='';
      for(let i = 0; i < dataProduct.length ;i++ ){
      table+=`
      <tr>
      <td>${i+1}</td>
      <td>${dataProduct[i].titla}</td>
      <td>${dataProduct[i].price}</td>
      <td>${dataProduct[i].taxes}</td>
      <td>${dataProduct[i].ads}</td>
      <td>${dataProduct[i].discount}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].category}</td>
      <td><button onclick="updateData(${i})">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
  </tr>
      `
   }
   tbody.innerHTML=table;
   let btnDelete= document.getElementById('deleteAll');
   if(dataProduct.length >0){
      btnDelete.innerHTML=`
         <button onclick="clearDatat()">Delete All (${dataProduct.length})</button>
      `
   }else{
      btnDelete.innerHTML='';
   }

}
showData();
// delete
function deleteData(i){
   dataProduct.splice(i,1);
   localStorage.product=JSON.stringify(dataProduct);
   showData();
} 
function clearDatat(){
   localStorage.clear();
   dataProduct.splice(0);
   showData();
}

function updateData(i){
   titla.value = dataProduct[i].titla;
   price.value = dataProduct[i].price;
   taxes.value = dataProduct[i].taxes;
   ads.value = dataProduct[i].ads;
   discount.value = dataProduct[i].discount;
   getTotal();
   count.style.display='none';
   category.value = dataProduct[i].category;
   supmit.innerHTML='Update';
   mood='update';
   tmp=i;
   scroll({
      top:0,
      behavior:'smooth',
   })
} 
// Search
let searchMood = 'title';

function getSearchMood(id){
   let search = document.getElementById('search');
   if(id === 'searchTital'){
      searchMood = 'title';
   }else{
      searchMood = 'Category';
   }
   search.placeholder='Search By ' + searchMood;
   search.focus();
   search.value='';
   showData();
}

function searchData(value){
   let table='';
   if(searchMood == 'title'){
      for(let i = 0 ; i < dataProduct.length;i++){
         if(dataProduct[i].titla.includes(value.toLowerCase())){
            
               table+=`
               <tr>
               <td>${i}</td>
               <td>${dataProduct[i].titla}</td>
               <td>${dataProduct[i].price}</td>
               <td>${dataProduct[i].taxes}</td>
               <td>${dataProduct[i].ads}</td>
               <td>${dataProduct[i].discount}</td>
               <td>${dataProduct[i].total}</td>
               <td>${dataProduct[i].category}</td>
               <td><button onclick="updateData(${i})">Update</button></td>
               <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
           </tr>
               `
            } 
         }
      
   }else{
      for(let i = 0 ; i < dataProduct.length;i++){
         if(dataProduct[i].category.includes(value.toLowerCase())){
            
               table+=`
               <tr>
               <td>${i}</td>
               <td>${dataProduct[i].titla}</td>
               <td>${dataProduct[i].price}</td>
               <td>${dataProduct[i].taxes}</td>
               <td>${dataProduct[i].ads}</td>
               <td>${dataProduct[i].discount}</td>
               <td>${dataProduct[i].total}</td>
               <td>${dataProduct[i].category}</td>
               <td><button onclick="updateData(${i})">Update</button></td>
               <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
           </tr>
               `
            } 
         }
   }
   tbody.innerHTML=table;
}
// clean code 
