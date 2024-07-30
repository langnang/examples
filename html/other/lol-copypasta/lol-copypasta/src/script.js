const toastify = Toastify({
    text: 'Copied to clipboard!',
    duration: 1000,
    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    gravity: 'bottom',
    position: 'center',
});

const pastas = document.querySelectorAll('.copy');

for (const pasta of pastas) {
    new ClipboardJS(pasta, {
        text: (trigger) => {
          toastify.showToast();
          return pasta.innerText;
        },
    });
}