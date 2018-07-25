export const phoneNumber = (input_txt) => {
    var phoneNo = /^\(\d{3}\)\s*\d{3}(?:-|\s*)\d{4}$/;
    if (input_txt.match(phoneNo)) {
        return true;
    }
    return false;
}