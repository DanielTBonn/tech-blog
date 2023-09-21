// adds a comment to a blogpost
const commentFormHandler = async (event) => {
    event.preventDefault();

    const currentUrl = await window.location.href;
    const blogId = await currentUrl.split('/').at(-1)
    const comment = document.querySelector('#comment-content').value.trim();

    if (comment) {
        const response = await fetch('/api/users/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, blogId}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Successfully posted a comment");
            window.location = currentUrl;
        } else {
            alert('Could not post comment');
        }

    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);