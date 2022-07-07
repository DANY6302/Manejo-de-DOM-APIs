/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app"

const appNode = document.querySelector('#app');

appNode.addEventListener('click', (event) => {
  if(event.target.nodeName === 'H2'){
    window.alert("Hola");
  }
});

const formatPrice = (price) => { 
  const newPrice = new window.Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
}).format(price);
  return newPrice;
};

//web api
//conectarnos al server
//promise --> asinc/await
window
.fetch(`${baseUrl}/api/avo`)
//procesar la respuesta y convertirla en JSON
.then((respuesta) => respuesta.json())
//JSON --> data --> renderizar info to browser
.then((responseJson) => {
  console.log(responseJson);
  const todosLosItems = [];
  responseJson.data.forEach((item) => {
    //crear imagen
    const imagen = document.createElement("img");
    imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
    imagen.src = `${baseUrl}${item.image}`;
    //crear titulo
    const title = document.createElement("h2");
    title.className = "text-lg";
    title.textContent = item.name;
    //crear precio
    //intl
    //Da formato a fechas y monedas
    const price = document.createElement("div");
    price.className = "text-gray-600";
    price.textContent = formatPrice(item.price);
    
    const container = document.createElement("div");
    container.append(imagen, title, price);

    todosLosItems.push(container);
  });

  appNode.append(...todosLosItems);
});