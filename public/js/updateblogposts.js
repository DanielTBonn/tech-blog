// makes a put request to update a blogpost
const blogPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-content').value.trim();
    const content = document.querySelector('#body-content').value.trim();

    const currentUrl = await window.location.href;
    const blogId = await currentUrl.split('/').at(-1)

    if (title && content) {
        const response = await fetch('/api/blogpost/updateblogpost', {
            method: 'PUT',
            body: JSON.stringify({ title, content, id: blogId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Successfully created a blogpost");
            window.location = `/dashboard`
        } else {
            alert('Could not create blogpost');
        }

    }
};

document
    .querySelector('.blogpost-form')
    .addEventListener('submit', blogPostFormHandler);