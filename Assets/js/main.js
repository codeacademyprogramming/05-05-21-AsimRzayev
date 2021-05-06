let prodcuctDOM=document.querySelector("#productDOM");
//getting Products
class Products{
   async  getProducts(){

    try{
        let result=await fetch('./Assets/js/products.json');
        let data=await result.json();
        let products=data.items;
        products=products.map(item=>{
        const {title,price,description,count}=item.fields;
        const {id}=item.sys;
        const image=item.fields.image.fields.file.url;
        return {title,price,description,count,id,image};
        })
        return products;
    }catch(error){
        console.log(error)
    }


    }
}

//Display Products

class UI{
 
    displayProducts(products){
        let result ='';
        products.forEach(product => {
            
            result+= ` <div class="col-xl-3">
                               <div class="card card-active">
                                   <img src="${product.image}" class="card-image" alt="">
                                   <div class="card-text">
                                       <h3>${product.title}</h3>
                                       <h4>${product.price}</h4>
                                       <p>${product.description}</p>
                                       <div class="card-footer display-flex justify-content-between">
                                           <div class="stars">
                                               <i class="fas fa-star"></i>
                                               <i class="fas fa-star"></i>
                                               <i class="fas fa-star"></i>
                                               <i class="fas fa-star"></i>
                                               <i class="fas fa-star-half-alt"></i>
                                               <span>${product.count}</span>
                                           </div>
                                           <button class="button"><i class="far fa-heart"></i> Watch</button>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           `
        });
        prodcuctDOM.innerHTML=result;

    }
}

//localStorage
class Storage{
    static saveProducts(products)
    {
   localStorage.setItem("products",JSON.stringify(products));
    }

}

document.addEventListener("DOMContentLoaded",()=>{

const ui=new UI();
const products=new Products();
products.getProducts().then(data=>{
    
    ui.displayProducts(data);
    Storage.saveProducts(data)
})

})