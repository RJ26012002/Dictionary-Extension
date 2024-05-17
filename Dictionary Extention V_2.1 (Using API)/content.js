function getDefinition(selectedText) {
    // Send selected text to Flask server
    fetch('http://localhost:5000/getDefinitions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                words: [selectedText]
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch definition');
            }
            return response.json();
        })
        .then(data => { 
            // Remove existing popovers
            const existingPopover = document.getElementById('definition-popover');
            if (existingPopover) {
                existingPopover.remove();
            }

            // Create a popover to display the definitions
            const popover = document.createElement('div');
            popover.id = 'definition-popover';
            


            

            // Create an unordered list to hold the definitions
            const list = document.createElement('ul');

            Object.entries(data).forEach(([word, definition]) => {
                const listItem = document.createElement('li');
                listItem.style.margin = '10px 10px';
                listItem.style.padding = '6px';
                listItem.innerHTML = `<p>This is Our First Dict</p>`;
                listItem.innerHTML = `<strong>${word} :</strong> ${definition}`;

                list.appendChild(listItem);
            });



            const para = document.createElement('p');
            para.style.fontSize = '25px';
            para.style.boxshadow = ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
            para.style.padding = '0 40% 0 40% ';
            para.textContent = 'Dictionary';

            popover.appendChild(para);
            
            // old starts here 
            
            // Append each word and its definition as list items
            // Object.entries(data).forEach(([word, definition]) => {
            //     // const parah = document.createElement('p');
            //     // parah.style.fontSize = '16px';
            //     // parah.innerHTML= `<strong>${word}</strong>`;
            //     // popover.appendChild(parah);
            //     const listItem = document.createElement('li');
            //     listItem.style.margin = '10px 10px';
            //     listItem.style.padding = '6px';
                
            //     // listItem.innerHTML = `<p>This is Our First Dict</p>`;
            //     // listItem.innerHTML = `<strong>${word} :</strong> ${definition}`;
            //     listItem.innerHTML = `<strong>${word}` ;
            //     // listItem.innerHTML += `<strong>${definition}`;
            //     list.appendChild(listItem);
            //     // const l = document.createElement('ul');
            //     Object.entries(definition).forEach(([meanings,examples]) => {
            //         const listIm = document.createElement('li');
            //         listIm.style.margin = '10px 10px';
            //         listIm.style.padding = '6px';

            //         listIm.innerHTML += `<strong>${meanings} : </strong> ${examples}`;
            //         list.appendChild(listIm);
                    
            //     });
                
            // });

            // old ends here
            // new adfter itt 
            // const para = document.createElement('p');
            // para.style.fontSize = '25px';
            // para.style.boxshadow = ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
            // para.style.padding = '0 40% 0 40% ';
            // para.textContent = 'Dictionary';

            
            // newww
            // Create a popover to display the definitions
            // const popover = document.createElement('div');
            // popover.id = 'definition-popover';

            // // Create an unordered list to hold the definitions
            // const list = document.createElement('ul');

            // // Iterate over each part of speech and its definitions
            // for (const part_of_speech in parts_of_speech_definitions) {
            //     // Create a list item for the part of speech
            //     const listItem = document.createElement('li');
            //     listItem.style.margin = '10px 10px';
            //     listItem.style.padding = '6px';

            //     // Add part of speech label to the list item
            //     const partOfSpeechHeader = document.createElement('p');
            //     partOfSpeechHeader.textContent = `Part of Speech: ${part_of_speech}`;
            //     listItem.appendChild(partOfSpeechHeader);

            //     // Add meanings to the list item
            //     const meaningsHeader = document.createElement('p');
            //     meaningsHeader.textContent = 'Meanings:';
            //     listItem.appendChild(meaningsHeader);

            //     const meanings = parts_of_speech_definitions[part_of_speech]['meanings'];
            //     for (const meaning of meanings) {
            //         const meaningItem = document.createElement('p');
            //         meaningItem.textContent = `- ${meaning}`;
            //         listItem.appendChild(meaningItem);
            //     }

            //     // Add examples to the list item
            //     const examplesHeader = document.createElement('p');
            //     examplesHeader.textContent = 'Examples:';
            //     listItem.appendChild(examplesHeader);

            //     const examples = parts_of_speech_definitions[part_of_speech]['examples'];
            //     for (const example of examples) {
            //         const exampleItem = document.createElement('p');
            //         exampleItem.textContent = `- ${example}`;
            //         listItem.appendChild(exampleItem);
            //     }

            //     // Add the list item to the unordered list
            //     list.appendChild(listItem);
            // }

            // // Create a paragraph for the title
            // const para = document.createElement('p');
            // para.style.fontSize = '25px';
            // para.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
            // para.style.padding = '0 40% 0 40%';
            // para.textContent = 'Dictionary';

            
            // Create a popover to display the definitions

            // const popover = document.createElement('div');
            // popover.id = 'definition-popover';

            // // Create a title for the popover
            // const title = document.createElement('h2');
            // title.textContent = 'Dictionary';
            // title.style.fontSize = '25px';
            // title.style.textAlign = 'center';
            // popover.appendChild(title);

            // // Iterate through the main object
            // Object.entries(data).forEach(([partOfSpeech, details]) => {
            //     // Create a heading for each part of speech
            //     const heading = document.createElement('h3');
            //     heading.textContent = partOfSpeech;
            //     heading.style.marginTop = '20px';
            //     popover.appendChild(heading);

            //     // Iterate through meanings and examples arrays
            //     Object.entries(details).forEach(([key, value]) => {
            //         const sectionHeading = document.createElement('h4');
            //         sectionHeading.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter
            //         popover.appendChild(sectionHeading);

            //         // Create a div for meanings or examples
            //         const div = document.createElement('div');

            //         // Append meanings or examples as innerHTML
            //         value.forEach(item => {
            //             div.innerHTML += `<p>${item}</p>`;
            //         });

            //         // Append the div to the popover
            //         popover.appendChild(div);
            //     });
            // });

            // // Append the popover to the body or any other desired parent element
            // document.body.appendChild(popover);


// Append the popover to the body or any other desired parent element
            // document.body.appendChild(popover);

            // Initialize an empty string to hold the JavaScript code



            const btn = document.createElement('button');
            btn.textContent = 'Read More';

            // btn.addEventListener('click', function() {
            //     window.location.href = ('http://localhost:5000/index');
            // });

            btn.addEventListener('click', function() {
                // window.open('http://localhost:5000/index', '_blank');
                window.open(`http://localhost:5000/index?word=${encodeURIComponent(selectedText)}`, '_blank');
            });
            // document.addEventListener('DOMContentLoaded', function() {
            //     var myButton = document.getElementById('myButton');
            //     myButton.addEventListener('click', function() {
            //         chrome.tabs.create({ url: 'http://localhost:5000/index' });
            //     });
            // });



            // popover.appendChild(para);
            popover.appendChild(list);
            popover.appendChild(btn);

            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const topOffset = rect.top + window.pageYOffset;
            if (topOffset > window.innerHeight / 2) {
                popover.style.top = (topOffset - popover.offsetHeight - 10) + 'px';
            } else {
                // Position below the selected text
                popover.style.top = (topOffset + rect.height + 10) + 'px';
            }

            popover.style.left = (rect.left + window.pageXOffset) + 'px';

            // Append the popover to the document body
            document.body.appendChild(popover);

            // Close the popover when clicked outside
            document.addEventListener('mousedown', function(event) {
                if (!popover.contains(event.target)) {
                    popover.remove();
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// Listen for text selection events
document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText !== '') {
        getDefinition(selectedText);
    }
});