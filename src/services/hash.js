

const hash = (str) => {
   
    let hash = 0;
    for(let i = 0 ; i < str.length; i++){
        let charCode = str.charCodeAt(i);
        hash += charCode;
    }

    return hash*70;


}

export default hash;