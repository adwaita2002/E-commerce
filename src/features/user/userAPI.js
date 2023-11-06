// A mock function to mimic making an async request for data
export function UserOrders(userId) {
  return new Promise(async(resolve) =>{
    // console.log(userId)
   const response =await fetch('http://localhost:8080/orders?user.id='+userId);
   const data = await response.json();
   resolve ({data});
  }
  );
}
export function fetchUserInfo(userId) {
  return new Promise(async(resolve) =>{
    // console.log(userId)
   const response =await fetch('http://localhost:8080/users/'+userId);
   const data = await response.json();
   resolve ({data});
  }
  );
}

export function addAdress(user){
  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/users/"+user.id , {
      method : "PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(user)
    });
       const data= await response.json();
       resolve ({data});
       console.log(data); 
  })
}
