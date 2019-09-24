let hideYoutubePanelPort;
const fieldName = `hideYoutubeVideoPanelExtensionStatus`;

function connected(port) {
  hideYoutubePanelPort = port;
  hideYoutubePanelPort.onMessage.addListener(onMessageRecieved);
}

browser.runtime.onConnect.addListener(connected);

function onMessageRecieved(message) {
    switch(true){
        case message.updateStatus:
            browser.storage.local.get(fieldName).then((result) => {
                const status = !(result[fieldName]|| false);
                setExtensionStatus(status).then((result)=> {
                updateOpenedTabs(status);
                });
            });
            break;
        case message.requestStatus:
            getExtensionStatus();
            break;
        default:
            console.log(`Unknown command from content script: ${message}`)
    }
}

const updateOpenedTabs = (status) => {
    const tabsQuery = browser.tabs.query({url: "*://*.youtube.com/*"});
    tabsQuery.then(
        (tabs) => {
            tabs.forEach(tab => {
                console.log("send to " + tab.id);
                browser.tabs.sendMessage(
                    tab.id,
                    {status: status}
                );
            });
        },
        (error) => {
            console.log(`Can't get opened tabs: ${error}`);
        }
    );
}

const setExtensionStatus = (status) => {
    return browser.storage.local.set({[fieldName]: status});
}

const getExtensionStatus = () => {
    browser.storage.local.get(fieldName).then(onGettingResult, onGettingError);
}

const onGettingError = (err) => {
    console.log(`Recieved error, while trying to connect to local storage : ${err}`)  
}
const onGettingResult = (result) => {
    const status = result.hideYoutubeVideoPanelExtensionStatus || false;
    hideYoutubePanelPort.postMessage({status: status});
}

setExtensionStatus(false).then(()=> { console.log("Extension mode initialized to false by default"); });
