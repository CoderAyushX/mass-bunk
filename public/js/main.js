function show() {
    document.getElementById("nav-box-2-ul").classList.toggle("show");
  }
function navigate(){
  document.getElementById("check").checked = false;
}


function copyLink() {
    // Get the link text
    const linkText = document.getElementById('linkContainer').innerText;

    // Create a temporary input element
    const inputElement = document.createElement('input');
    inputElement.value = linkText;
    document.body.appendChild(inputElement);

    // Select and copy the text
    inputElement.select();
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(inputElement);

    // Optionally, provide user feedback (e.g., show a message)
    alert('Link copied to clipboard!');
}
