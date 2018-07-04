export const phonenumber = (input_txt) => {
    var phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (input_txt.value.match(phoneNo)) {
        return true;
    }
    return false;
}