// As soon as content is added to the skeleton screen container, the `:empty` pseudo-class won't match anymore and the background will be automatically removed.
document.querySelector('button').addEventListener('click', function() {
  document.querySelector('.demo').innerHTML = '<h1>Injected content.</h1>';
})