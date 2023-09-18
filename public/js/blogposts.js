const blogPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-content').value.trim();
    const content = document.querySelector('#body-content').value.trim();


    if (title) {
        const response = await fetch('/api/users/comment', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Successfully created a blogpost");
            window.location = currentUrl;
        } else {
            alert('Could not create blogpost');
        }

    }
};

document
    .querySelector('.blogpost-form')
    .addEventListener('submit', blogPostFormHandler);