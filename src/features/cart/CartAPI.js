// A mock function to mimic making an async request for data
export function addToCart(item){
  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/carts" , {
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(item)
    });
       const data= await response.json();
       resolve ({data});
       console.log(data); 
  })
}
export function updateCart(update){
  console.log(update);
  console.log(update.id);
  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/carts/"+update.id, {
      method : "PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(update)
    });
       const data= await response.json();
       resolve ({data});
       console.log(data); 
  })
}
export function deleteCart(itemId){

  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/carts/"+itemId, {
      method : "DELETE",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify()
    });
       const data= await response.json();
       resolve ({data:{id:itemId}});
       console.log(data); 
  })
}

export function fetchItemById(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/carts?user="+userId);
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteItemById(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemById(userId);
    // const data = await response.json();
    const items = response.data;

    for(let item of items){
      await delete deleteCart(item.id);
    }
    resolve({status : ' success'});
  });
}


