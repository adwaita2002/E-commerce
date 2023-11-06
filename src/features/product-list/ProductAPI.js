// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}
export function addProduct(product) {
  console.log(product);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/",{
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(product)
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllProductsByFilters({ filter, sort,pagination }) {
  //filter = {"category" : "smartphone"}
  //pagination =_page=1_limit=10;{_page:1,_limit:10}
  console.log(sort);
  // console.log(pagination);
  let string = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategory = categoryValues[categoryValues.length - 1];
      string += `${key}=${lastCategory}&`;
    }
  }

  for (let key in sort) {
    string += `${key}=${sort[key]}`;
  }
  for (let key in pagination) {
    string += `${key}=${pagination[key]}`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products?" + string);
    console.log(string)
    const data = await response.json();
    const totalItems=await response.headers.get('X-Total-Count');
    resolve({ data : {products:data,totalItems:+totalItems} });
  });
}

export function updateProduct(update){

  return new Promise(async(resolve, reject) => {
    const response = await fetch("http://localhost:8080/products/"+update.id, {
      method : "PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(update)
    });
       const data= await response.json();
       resolve ({data});
       
  })
}
