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

    let container = document.getElementById('container');

    try {

        // fetch contacts from api

        let response = await fetch('https://jsonplaceholder.typicode.com/users');

        // convert the response to js object

        let contacts = await response.json();

        console.log(typeof contacts);
        console.log(contacts);
        display(contacts);

        // Loop through the contacts

        function display(contacts) {
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
                    contactListingPage.classList = 'd-none';
                    contactDetails.classList = 'd-block';
                    nameOfUser.textContent = `${name}`;
                    phoneNumber.textContent = `${phone}`;
                    emailId.textContent = `${email}`;


                })

                // Go back to listing page from contact details page 

                goBack.addEventListener("click", (e) => {
                    contactListingPage.classList = 'd-block bg-secondary mt-3';
                    contactDetails.classList = 'd-none';

                })

                //delete a contact
                deleteButton.addEventListener("click", (e) => {
                    contactDetails.classList = 'd-none';
                    contactListingPage.classList = 'd-block bg-secondary mt-3';
                    // contacts.splice(i,1);
                    contactListItem.remove()// this is removing all
                    //contactListItem.removeChild(contactListItem);not working
                    //yet to be implemented

                })

                // contactListItem.addEventListener("dblclick",()=>{
                //     contactListItem.remove();
                // })


            }
        }


        //Add contact

        addButton.addEventListener("click", (e) => {
            contactListingPage.classList = 'd-none';
            addNewContact.classList = 'd-block';
            // doneButton.className = 'btn text-primary'

            doneButton.addEventListener("click", (e) => {
                contacts = []; //make the array empty first otherwise it will show first array view plus the replaced array. in this case it will show 21 elemenet if we didn't empty the array here
                const num = phoneNum.value;

                const firstName = fName.value;
                const lastName = lName.value;
                const mail = email.value;

                if (num === '' || firstName === "") {
                    // alertModal.classList = 'd-block modal';

                    // addNewContact.classList = 'd-none';
                    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
                    alertModal.show();
                    document.getElementById('alert').textContent = 'Please enter phone number and name'
                    return;
                }
                let contact = {
                    phone: `${num}`,
                    name: `${firstName} ${lastName}`,
                    email: `${mail}`
                };

                
                // console.log(contact);
                contacts.push(contact);

                // console.log(contacts);
                display(contacts);
                
                
                contactListingPage.classList = 'd-block bg-secondary mt-3';
                
                addNewContact.classList = 'd-none';
                // num = '';
                // firstName = '';
                // lastName = '';
                // mail = '';// these only reset the variables. not the input ui
                phoneNum.value = '';
                fName.value = '';
                lName.value = '';
                email.value = '';



            })
            //cancel button in add new conyact page
            cancelButton.addEventListener("click", (e) => {
                contactListingPage.classList = 'd-block bg-secondary mt-3';
                addNewContact.classList = 'd-none';
            })





        })
    } catch (error) {
        console.log("Something went wrong while fetching the data");
        document.getElementById('errorAlert').textContent = 'Something went wrong while fetching the data'
    }



}
