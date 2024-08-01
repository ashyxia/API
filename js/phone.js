const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

// display show all button if there are more than 12 phones
const showAllContainer = document.getElementById('show-all-button');
  if(phones.length>12){
    showAllContainer.classList.remove('hidden');
  } else{
    showAllContainer.classList.add('hidden');
  }
  // display only 12 phones
  phones = phones.slice(0,12);

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
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions">
         <button class="btn btn-primary">Buy Now</button>
       </div>
      </div>               
    `;
    phoneContainer.appendChild(phoneCard);
  });
  //  Hide loading spinner
  toggleLoadingSpinner(false);
};
// Search Handler Button
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}