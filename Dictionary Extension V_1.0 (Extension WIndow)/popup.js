// document.addEventListener('DOMContentLoaded', function() {
//     const wordInput = document.getElementById('word-input');
//     const searchButton = document.getElementById('search-button');
//     const definitionContainer = document.getElementById('definition-container');

//     searchButton.addEventListener('click', function() {
//         // const word = wordInput.value.trim();
//         // if (word !== '') {
//         //     // getDefinition(word);
            
//         //     const wordsArray = word.split(' ');
//         //     getDefinition(word);
//         //     definitionContainer.innerHTML = '';
           

//         //     // Print each word separately
            

//         //     for (const word of wordsArray) {
//         //         getDefinition(word);
//         //     }
//         // }

//         const words = wordInput.value.trim().split(' ');

//         if (words.length > 0) {
//             getDefinitions(words);
//         }
//     });

//     function getDefinitions(words) {
//         fetch('http://localhost:5000/getDefinitions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ words: words }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             displayDefinitions(data);
//         })
//         .catch(error => {
//             console.error('Error fetching definitions:', error);
//         });
//     }

//     function displayDefinitions(definitions) {
//         definitionContainer.innerHTML = '';

//         for (const [word, meaning] of Object.entries(definitions)) {
//             definitionContainer.innerHTML += `<p><b>${word}:</b> ${meaning}</p>`;
//         }
//     }
// });

// document.addEventListener('mouseup', function () {
//     var selectedText = getSelectedText();
//     const words = selectedText.value.trim().split(' ');
//     if (words.length > 0) {
//         getDefinitions(words);
//     }

// });

// function getSelectedText() {
//     var text = '';
//     if (window.getSelection) {
//         text = window.getSelection().toString();
//     } else if (document.selection && document.selection.type != 'Control') {
//         text = document.selection.createRange().text;
//     }
//     return text;
// }


document.addEventListener('DOMContentLoaded', function() {
    const wordInput = document.getElementById('word-input');
    const searchButton = document.getElementById('search-button');
    const definitionContainer = document.getElementById('definition-container');

    searchButton.addEventListener('click', function() {
        const words = wordInput.value.trim().split(' ');

        if (words.length > 0) {
            getDefinitions(words);
        }
    });

    function getDefinitions(words) {
        fetch('http://localhost:5000/getDefinitions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ words: words }),
            })
            .then(response => response.json())
            .then(data => {
                displayDefinitions(data);
            })
            .catch(error => {
                console.error('Error fetching definitions:', error);
            });
    }

    function displayDefinitions(definitions) {
        definitionContainer.innerHTML = '';

        for (const [word, meaning] of Object.entries(definitions)) {
            definitionContainer.innerHTML += `<p><b>${word}:</b> ${meaning}</p>`;
        }
    }
});