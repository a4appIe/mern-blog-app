const formatDate = (date)=>{
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
}

export default formatDate;