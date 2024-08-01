const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones,isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

// display show all button if there are more than 12 phones
const showAllContainer = document.getElementById('show-all-container');
  if(phones.length>12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  } else{
    showAllContainer.classList.add('hidden');
  }
  // display only 12 phones
if(!isShowAll){
  phones = phones.slice(0,12);
}
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
      <img src="${phone.image}"alt="${phone.phone_name}"class="rounded-xl" />
    </figure>
     <div class="card-body items-center text-center">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>Latest Model & Faster</p>
       <div class="card-actions">
         <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
       </div>
      </div>               
    `;
    phoneContainer.appendChild(phoneCard);
  });
  //  Hide loading spinner
  toggleLoadingSpinner(false);
};
//show details
const handleShowDetail = async (id) => {
  console.log("show details", id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt=""/>
    <h2>${phone.name}</h2>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
  `
  showPhoneDetails(phone);
}
const showPhoneDetails = (phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  show_details_modal.showModal();
}

// Search Handler Button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}
// Handle show all
const handleShowAll = () =>{
    handleSearch(true);
}