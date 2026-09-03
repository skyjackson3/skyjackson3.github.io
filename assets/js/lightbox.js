/* Contact-sheet lightbox: click a frame to enlarge, arrows to move, Esc to close.
   No dependencies. Restores focus to the frame you opened from. */
(function () {
  var frames = Array.prototype.slice.call(document.querySelectorAll('.frame__shot'));
  if (!frames.length) return;

  var index = 0;
  var opener = null;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Enlarged photograph');
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">Close</button>' +
    '<button class="lightbox__step lightbox__step--prev" type="button" aria-label="Previous photograph">&#8592;</button>' +
    '<button class="lightbox__step lightbox__step--next" type="button" aria-label="Next photograph">&#8594;</button>' +
    '<div><img alt=""><p class="lightbox__caption"></p></div>';
  document.body.appendChild(box);

  var img = box.querySelector('img');
  var caption = box.querySelector('.lightbox__caption');
  var closeBtn = box.querySelector('.lightbox__close');

  function show(i) {
    index = (i + frames.length) % frames.length;
    var frame = frames[index];
    var inner = frame.querySelector('img');
    img.src = frame.getAttribute('data-full') || inner.src;
    img.alt = inner ? inner.alt : '';
    caption.textContent = frame.getAttribute('data-caption') || '';
  }

  function open(i) {
    opener = frames[i];
    show(i);
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }

  frames.forEach(function (frame, i) {
    frame.addEventListener('click', function () { open(i); });
  });

  closeBtn.addEventListener('click', close);
  box.querySelector('.lightbox__step--prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lightbox__step--next').addEventListener('click', function () { show(index + 1); });

  box.addEventListener('click', function (event) {
    if (event.target === box) close();
  });

  document.addEventListener('keydown', function (event) {
    if (!box.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
    if (event.key === 'Tab') {
      var focusable = box.querySelectorAll('button');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
