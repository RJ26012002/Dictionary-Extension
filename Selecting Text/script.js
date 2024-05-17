// function checkSelection() {
//     const popover = document.getElementById('popover');
//     const selection = window.getSelection();
//     const selectedText = selection.toString().trim();
  
//     if (selectedText) {
//       const range = selection.getRangeAt(0);
//       const rect = range.getBoundingClientRect();
//       popover.textContent = selectedText;
//       popover.style.top = rect.bottom + 'px';
//       popover.style.left = rect.left + (rect.width / 2) + 'px';
//       popover.style.display = 'block';
  
//       document.addEventListener('mousedown', hidePopoverOnClick);
//     } else {
//       popover.style.display = 'none';
//     }
  
//     function hidePopoverOnClick(event) {
//       const isClickedInsidePopover = popover.contains(event.target);
//       if (!isClickedInsidePopover) {
//         popover.style.display = 'none';
//         document.removeEventListener('mousedown', hidePopoverOnClick);
//       }
//     }
//   }
  

// good code 

// document.addEventListener('selectionchange', function() {
//     const popover = document.getElementById('popover');
//     const selection = window.getSelection();
//     const selectedText = selection.toString().trim();
  
//     if (selectedText) {
//       const range = selection.getRangeAt(0);
//       const rect = range.getBoundingClientRect();
//       popover.textContent = selectedText;
//       popover.style.top = rect.bottom + 'px';
//       popover.style.left = rect.left + (rect.width / 2) + 'px';
//       popover.style.display = 'block';
//     } else {
//       popover.style.display = 'none';
//     }
//   });

document.addEventListener('selectionchange', function(event) {
    event.preventDefault(); // Prevent default behavior
  
    const popover = document.getElementById('popover');
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
  