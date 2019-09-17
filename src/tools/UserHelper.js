import {getManagerID, getPhone, removeItem, setManagerID, setPhone,setName,setWorkNumber} from "./StorageUtils";

function getUser() {
    let customManagerId = getManagerID();
    let phone = getPhone();
    // let customerManagerNo ='112';
    // let phone = '13333333333';
    if (!customManagerId) {
        return null
    }
    return {customManagerId, phone,customerManagerNo:customManagerId};
}
function setUser(id, phone,name,wknum) {
    setManagerID(id);
    setPhone(phone);
    setName(name);
    setWorkNumber(wknum)
}


function clearData() {
    removeItem();
    setManagerID('');
    setPhone('');
    setName('');
    setWorkNumber('')
}

export default {
    getUser,
    setUser,
    clearData
}