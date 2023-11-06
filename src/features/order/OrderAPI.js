// A mock function to mimic making an async request for data
export function addOrder(order){
  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/orders/" , {
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(order)
    });
       const data= await response.json();
       resolve ({data});
       console.log(data); 
  })
}
export function fetchAllOrder(pagination){

  console.log(pagination);
  let string="";
  for (let key in pagination) {
    string += `${key}=${pagination[key]}`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + string);
    const data = await response.json();
    const totalOrders=await response.headers.get('X-Total-Count');
    resolve({ data : {order:data,totalOrders:+totalOrders} });
  });
}


export function updateOrder(order){
  
  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/orders/"+order.id, {
      method : "PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(order)
    });
       const data= await response.json();
       resolve ({data});
       console.log(data); 
  })
}
