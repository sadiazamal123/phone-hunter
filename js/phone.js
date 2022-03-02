const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
   
    searchField.value='';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url) 
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
      
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result'); 
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onclick="singleProduct('${phone.slug}')" class="btn btn-dark details-btn" data-bs-toggle="modal" data-bs-target="#single">Details</button>
            
        </div> 
        `;
        searchResult.appendChild(div);
    }) 
      
}

const singleProduct = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const {name, image, releaseDate, mainFeatures, others} = data.data;

    document.querySelector('.modal-title').innerText = name;
    document.querySelector('.modal-body img').src = image;
    document.getElementById('release-date').innerText = `${releaseDate ? releaseDate : "Release Date is not found"}`;
}
