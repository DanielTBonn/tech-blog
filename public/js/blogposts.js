// makes a post request for a blogpost
const blogPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-content').value.trim();
    const content = document.querySelector('#body-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blogpost/addblogpost', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Successfully created a blogpost");
            window.location = '/dashboard'
        } else {
            alert('Could not create blogpost');
        }

    }
};

document
    .querySelector('.blogpost-form')
    .addEventListener('submit', blogPostFormHandler);