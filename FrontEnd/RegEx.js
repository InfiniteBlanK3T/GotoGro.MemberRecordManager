// Declaring RegEx Constants

const firstNameRegEx = /^[a-zA-Z]{2,20}/;
const lastNameRegEx = /\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*){1,20}/;
const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegEx = /^[0-9]{10}$|^\(0[1-9]{1}\)[0-9]{8}$|^[0-9]{8}$|^[0-9]{4}[ ][0-9]{3}[ ][0-9]{3}$|^\(0[1-9]{1}\)[ ][0-9]{4}[ ][0-9]{4}$|^[0-9]{4}[ ][0-9]{4}$/;
const streetNoRegEx = /[A-Za-z0-9'\.\-\s\,]{1,40}/; //need to update
const streetNameRegEx = /[A-Za-z0-9'\.\-\s\,]{2,40}/; //need to update
const suburbRegEx = /[A-Za-z0-9'\.\-\s\,]{2,40}/; //need to update
const postcodeRegEx = /[0-9]{4}/;