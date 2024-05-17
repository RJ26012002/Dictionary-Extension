async function sayHello() {
    console.log("I m inside this sayHello Function");
    alert('Hello from my first extennsiionnn!');

    let [tab] = await chrome.tabs.query({ active : true});
    chrome.scripting.executeScript({
        target: { tabId : tab.id},
        func: () =>{
            alert('Hello from my first extennsiionnn!');
            console.log("I m inside this sayHello Function");
        }
    });
}
document.getElementById("mybutton").addEventListener("click",sayHello);
