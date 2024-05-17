// content.js
document.addEventListener('selectionchange', function(event) {
    event.preventDefault(); // Prevent default behavior
  
    const popover = document.createElement('div');
    popover.classList.add('popover-custom');
    document.body.appendChild(popover);
  
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
  
    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      popover.textContent = selectedText;
      popover.style.top = rect.bottom + 'px';
      popover.style.left = rect.left + (rect.width / 2) + 'px';
      popover.style.display = 'block';
    } else {
      popover.style.display = 'none';
    }
  });
  