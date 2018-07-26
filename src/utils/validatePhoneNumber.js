export const phoneNumber = (input_txt) => {
    var phoneNo = /^\d{10}$/;
    if (input_txt.match(phoneNo)) {
        return true;
    }
    return false;
}