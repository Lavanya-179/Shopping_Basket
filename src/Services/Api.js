 export const buyNow = (data) => {
    fetch('url', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => res.json()).then(r => {
        //Success Response
    });
}