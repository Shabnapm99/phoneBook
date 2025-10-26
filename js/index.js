//This function will run on load of body elemennt

async function fetchContacts() {

    let contactsList = document.getElementById('contactsList');//reference of parent element <ul>
    let contactDetails = document.getElementById('addNew');//refrence of contact details view div

    try {

        // fetch contacts from api

        let response = await fetch('https://jsonplaceholder.typicode.com/users');

        // convert the response to js object

        let contacts = await response.json();

        console.log(typeof contacts);
        console.log(contacts);

        // Loop through the contacts

        for (let i = 0; i < contacts.length; i++) {

            console.log(contacts[i]);

            // Store the details to variable

            let name = contacts[i].name;
            let phone = contacts[i].phone;
            let email = contacts[i].email;

            // create an elemenet <li> under <ul> to occupy each contact

            const contactListItem = document.createElement("li");
            contactListItem.className = 'list-group-item d-flex align-items-center gap-2'
            contactListItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                        class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fill-rule="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                    <p id="contactName">${name}</p>`

            // append li to ul
            contactsList.appendChild(contactListItem);

            // To show all the details on clicking a list item add event listener

            contactListItem.addEventListener("click",(event)=>{
                
                contactDetails.className = 'd-block';

            })

        }
    } catch (error) {
        console.log("Something went wrong while fetching the data");
        document.getElementById('errorAlert').textContent = 'Something went wrong while fetching the data'
    }

}