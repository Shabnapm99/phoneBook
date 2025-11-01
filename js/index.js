//This function will run on load of body elemennt

async function fetchContacts() {

    let contactsList = document.getElementById('contactsList');//reference of parent element <ul>
    let contactDetails = document.getElementById('contactDetails');//refrence of contact details view div
    let contactListingPage = document.getElementById('contactListingPage');////refrence of contact listing view div
    let nameOfUser = document.getElementById('name');
    let phoneNumber = document.getElementById('phoneNumber');
    let emailId = document.getElementById('emailId');
    let goBack = document.getElementById('exitIcon');
    let deleteButton = document.getElementById('deleteButton');
    let addNewContact = document.getElementById('addNewContact');
    let addButton = document.getElementById('addButton');
    let phoneNum = document.getElementById('phoneNumberInput');
    let fName = document.getElementById('fNameInput');
    let lName = document.getElementById('lNameInput');
    let email = document.getElementById('emailInput');
    let doneButton = document.getElementById('doneButton');
    let cancelButton = document.getElementById('cancelButton');
    // let alertModal = document.getElementById('alertModal');
    let searchButton = document.getElementById('searchButton');
    let editButton = document.getElementById('editButton');
    let searchBar = document.getElementById('searchBar');


    let index = null;// variable to store the index
    let isEditing = false;//since reusing the add contact page in edit page, to avoid adding multiple listeners to done and cancel button use this flag

    try {

        // fetch contacts from api

        let response = await fetch('https://jsonplaceholder.typicode.com/users');

        // convert the response to js object

        let contacts = await response.json();

        console.log(typeof contacts);
        console.log(contacts);
        display(contacts);

        
        function display(contacts) {

            contactsList.innerHTML = ''; //reset UI. since we are looping through new array when adding a contact and editing

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

                contactListItem.addEventListener("click", (event) => {

                    index = i;//index will store the index of contact which we are clicking

                    contactListingPage.classList.add('d-none');
                    contactDetails.classList.replace('d-none','d-block');//replace d-none class with d-block
                    nameOfUser.textContent = `${name}`;
                    phoneNumber.textContent = `${phone}`;
                    emailId.textContent = `${email}`

                    console.log(i);

                })

                // Go back to listing page from contact details page 

                goBack.addEventListener("click", (e) => {
                    
                    contactListingPage.classList.replace('d-none','d-block');
                    contactDetails.classList.replace('d-block','d-none') ;

                })
            }
        }

        //delete a contact

        deleteButton.addEventListener("click", (e) => {
            contactDetails.classList.add('d-none');
            // contactListingPage.classList.remove('d-none');
            // contactListingPage.classList.add('d-block bg-secondary mt-3');
            contactListingPage.classList.replace('d-none','d-block');
            // console.log(e.target)
            // contacts.splice(contacts[i], 1);
            console.log(index);
            console.log(contacts[index]);

            contacts.splice(index, 1);
            console.log(contacts);
            display(contacts);

        })

        //Add contact

        addButton.addEventListener("click", (e) => {


            contactListingPage.classList.add('d-none');
            addNewContact.classList.replace('d-none','d-block');
            // doneButton.className = 'btn text-primary'
            isEditing = false;//make the isEditing flag false when click on a add button.
        })

        // Add listener to doneButton

        doneButton.addEventListener("click", (e) => {

            if (!isEditing) {
                // contacts = []; //make the array empty first otherwise it will show first array view plus the replaced array. in this case it will show 21 elemenet if we didn't empty the array here

                // Store the entered value to variables

                const num = phoneNum.value;
                const firstName = fName.value;
                const lastName = lName.value;
                const mail = email.value;

                if (num === '' || firstName === "") {

                    
                    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
                    alertModal.show();
                    document.getElementById('alert').textContent = 'Please enter phone number and name';
                    return;
                }

                // create an object with the enterd values and push it to contacts array and call display() by passing this new array 

                let contact = {
                    phone: `${num}`,
                    name: `${firstName} ${lastName}`,
                    email: `${mail}`
                };


                console.log(contact);
                contacts.push(contact);

                display(contacts);


                contactListingPage.classList.replace('d-none','d-block'); 

                addNewContact.classList.replace('d-block','d-none');
                
                // num = '';
                // firstName = '';
                // lastName = '';
                // mail = '';// these only reset the variables. not the input ui

                phoneNum.value = '';
                fName.value = '';
                lName.value = '';
                email.value = '';//cleares the input field

                //if isEditing is true run the else logic

            } else {
                addNewContact.classList.replace('d-block','d-none');
                contactDetails.classList.replace('d-none','d-block');
                fName.value = fName.value;
                lName.value = lName.value;
                phoneNum.value = phoneNum.value;
                email.value = email.value;
                let uName = `${contacts[index].name}`;
                uName = `${fName.value} ${lName.value}`;
                nameOfUser.textContent = `${uName}`;
                phoneNumber.textContent = `${phoneNum.value}`;
                emailId.textContent = `${email.value}`;

                //To reflect the edit in contact listing page

                let contact = {
                    phone: `${phoneNum.value}`,
                    name: `${uName}`,
                    email: `${email.value}`
                };
                contacts.splice(index, 1, contact);
                console.log(contacts);
                display(contacts);

                phoneNum.value = '';
                fName.value = '';
                lName.value = '';
                email.value = '';//cleares the input field
            }


        })

        //cancel button in add new contact page

        cancelButton.addEventListener("click", (e) => {

            if (!isEditing) {
                contactListingPage.classList.replace('d-none','d-block');
                addNewContact.classList.replace('d-block','d-none');
                contactDetails.classList.replace('d-block','d-none');
                // isEditing = true;
            } else {
                contactDetails.classList.replace('d-none','d-block');
                addNewContact.classList.replace('d-block','d-none');
                //when we click on editing these fields will get filled with the details. Remove those as well when cancel the page. otherwise when we click on add button after the editing cancelled, the values will be there
                phoneNum.value = '';
                fName.value = '';
                lName.value = '';
                email.value = '';//cleares the input field
            }


        })



        //search button

        searchButton.addEventListener("click", () => {
            // console.log("I am getting called");

            // filter returns a new array if name or phone includes the typed value in seacrhbar

            let filteredContacts = contacts.filter((contacts) => {
                if (contacts.name.toLowerCase().includes(`${searchBar.value}`) || contacts.phone.includes(`${searchBar.value}`)) {
                    console.log(`${searchBar.value}`)
                    return contacts;
                }

            }
            )
            

            // call display function by passing new filtered array

            display(filteredContacts);
            searchBar.value = '';//clears the search bar

        })



        //edit button

        editButton.addEventListener('click', () => {
            console.log("I am getting called")
            addNewContact.classList = 'd-block';
            contactDetails.classList = 'd-none';
            console.log(contacts[index]);

            let uName = `${contacts[index].name}`;
            let names = uName.split(' ');
            fName.value = names[0];
            lName.value = names.slice(1).join(' ');//create an array with slice of names array removing 1st element and join  all the left elements. its useful incase of 3 names otherwise last name will cut off
            phoneNum.value = `${contacts[index].phone}`;
            email.value = `${contacts[index].email}`;

            isEditing = true; //when clicked on edit button value of isEditing change to true

        })


    } catch (error) {
        console.log("Something went wrong while fetching the data");
        document.getElementById('errorAlert').textContent = 'Something went wrong while fetching the data'
    }



}
