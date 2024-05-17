/*chrome.action.onClicked.addListener(tab => {
    if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
                alert('Hello from my first extention!');
            }
        }).then(()=>{
            console.log('Script executed successfuly');
        }).catch(error => {
            console.log('error executing script:',error);
        });
    }else{
        console.error('Cannot execute script on internal pages.');
    
    }
   
});*/
/*chrome.action.onClicked.addListener(tab => {
    if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
                alert('Hello from my first extention!');
            }
        }).then(()=>{
            console.log('Script executed successfuly');
        }).catch(error => {
            console.log('error executing script:',error);
        });
    }else{
        console.error('Cannot execute script on interna pages.');
    
    }
   
});
*/