export function fetchUserData(userData){
  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/users" , {
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(userData)
    });
       const data= await response.json();
       resolve ({data});
       console.log(data); 
  })
}
export function SingOut(userData){
  return new Promise(async(resolve, reject) => {
    resolve({data:'success'})
    });
    
  }

export function fetchLoginData(logInfo){
  const email=logInfo.email;
  const passwod=logInfo.passwod;
  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/users?email="+email);
      
       const data= await response.json();
      
       if(data.length){
        if(passwod===data[0].passwod){
          resolve({data:data[0]});
        }
        else{
          reject({message:'Wrong credential'})
        }
       }
       else{
        reject({message:"user not found"})
       }
       
      
  })
}


