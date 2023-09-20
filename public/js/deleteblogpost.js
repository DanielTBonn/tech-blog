const deleteFormHandler = async (event) => {
    try {

        event.preventDefault();
        
        console.log('here?')
        
        
        const currentUrl = await window.location.href;
    const blogId = await currentUrl.split('/').at(-1)
    console.log(blogId)
    
    
    
    const response = await fetch(`/api/blogpost/deleteblogpost/${blogId}`, {
        method: 'DELETE',
        body: JSON.stringify({ }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
        console.log("Successfully deleted a blogpost");
        window.location = `/dashboard`
    } else {
        alert('Could not delete blogpost');
    }
} catch (err) {
    console.log(err)
}
    // console.log("sup")
    
};

document
    .querySelector('.delete-btn')
    .addEventListener('click', deleteFormHandler);