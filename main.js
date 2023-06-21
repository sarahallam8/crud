            //calling the variables 
            let title = document.getElementById('title');                      
            let price = document.getElementById('price');
            let taxes = document.getElementById('taxes');
            let ads = document.getElementById('ads');
            let discount = document.getElementById('discount');
            let total = document.getElementById('total');
            let count = document.getElementById('count');
            let catagory = document.getElementById('catagory');
            let updateBtn = document.getElementById('updateBtn');
            let mood = 'creat';
            let temp;
           


            let dataProduct ;
            if(localStorage.products != null){
            dataProduct = JSON.parse(localStorage.products);
            displayProducts();
            }else{
            dataProduct =[];
            }

            // get total price 
            function getTotal(){

                if(price.value !=""){
                    let result =(+price.value + +taxes.value + +ads.value) - +discount.value;
                    total.innerHTML = result;
                    total.style.background ='#040';
                }else{
                    total.innerHTML = '';
                    total.style.background ='rgb(20, 88, 103)';
                }
            }

            // creat product
            function addProduct(){
            let newProduct = {
                title:title.value,
                price:price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerHTML,
                count:count.value,
                catagory:catagory.value,
            }
            if(title.value !='' && price.value !='' && catagory.value !='' ){
            if(mood === 'creat'){
                if(newProduct.count > 1){
                    for(let i=0; i < newProduct.count; i++){
                    dataProduct.push(newProduct);
                    }
                }else{
                    dataProduct.push(newProduct);
                }
            }else{
                dataProduct[temp] = newProduct;
                mood = 'creat';
                updateBtn.innerHTML = 'creat';
                count.style.display = 'block';

            }
            clearProducts();
            }  
            localStorage.setItem('products' ,  JSON.stringify(dataProduct)    )
            displayProducts(); 

            }
        

            // clear product
            function clearProducts(){
                
                    title.value = '';
                    price.value = '';
                    taxes.value = '';
                    ads.value   = '';
                    discount.value = '';
                    total.innerHTML = '';
                    count.value = '';
                    catagory.value = '';
            }

            // display product
            function displayProducts(){
                let tableOfProducts = '';
                for(let i=0; i<dataProduct.length ;i++){
                tableOfProducts +=`          
                    <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].catagory}</td>
                    <td><button onclick="updateProduct( ${i} )"id="update">update</button></td>
                    <td><button onclick="deleteProduct( ${i} )" id="delete">delete</button></td>
                    </tr>` 
                }

                document.getElementById('tbody').innerHTML = tableOfProducts;
                let btnDelete = document.getElementById('deleteall');
                if(dataProduct.length > 0){
                btnDelete.innerHTML =  `
                <button onclick="deleteAll()">Delete All</button>   `   
                }else{
                    btnDelete.innerHTML='';
                }
            getTotal();
            
            } 


            // delete product 
            function deleteProduct(i){

                dataProduct.splice(i,1);
                localStorage.products = JSON.stringify(dataProduct);
                displayProducts();
            }

            function deleteAll(){
                localStorage.clear();
                dataProduct.splice(0);
                displayProducts();
            }

            // update product
            function updateProduct(i){
                title.value = dataProduct[i].title;
                price.value = dataProduct[i].price;
                taxes.value = dataProduct[i].taxes;
                ads.value = dataProduct[i].ads;
                discount.value = dataProduct[i].discount;
                getTotal();
                count.style.display ='none';
                catagory.value = dataProduct[i].catagory;
                updateBtn.innerHTML = 'Update';
                mood = 'update';
                temp = i;
                scroll({
                    top:0,
                    behavior: "smooth",
                })
                
            }

            // search product
            let searchMood = 'title';
            function searchProduct(id){
                let search = document.getElementById('search');
            if(id == 'searchTitle'){
                searchMood = 'title'
            }else{
                searchMood = 'catagory';
            }
            search.placeholder = 'search by '+ searchMood;
            search.focus();
            search.value = '';
            displayProducts();
            }

            function searchData(value){
                let tableOfSearch ='';
                for(let i=0; i <dataProduct.length; i++){
                    if(dataProduct[i].title.toLowerCase().includes(value.toLowerCase())){
                        tableOfSearch += `<tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].catagory}</td>
                        <td><button onclick="updateProduct( ${i} )"id="update">update</button></td>
                        <td><button onclick="deleteProduct( ${i} )" id="delete">delete</button></td>
                        </tr>`

                    }else{
                        if(dataProduct[i].catagory.toLowerCase().includes(value.toLowerCase())){
                            tableOfSearch += `<tr>
                            <td>${i+1}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].catagory}</td>
                            <td><button onclick="updateProduct( ${i} )"id="update">update</button></td>
                            <td><button onclick="deleteProduct( ${i} )" id="delete">delete</button></td>
                            </tr>`
                    }
                }
                    }
                 
                
                document.getElementById('tbody').innerHTML = tableOfSearch;
            
            }

         

            