// TODO: autoupdate on opened tabs
const eventHandler = (document.body || document.documentElement);
const elementsToHide = ['.ytp-chrome-bottom', '.ytp-player-content ytp-iv-player-content'];

// icons by https://www.flaticon.com/authors/freepik
let extensionMode = false;
const hideIconSvg = '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24pt" width="24pt" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<path style="fill:#B3404A;" d="M255.999,420.841c-58.045,0-120.387-27.289-180.283-78.915		C31.139,303.503,3.7,265.535,2.553,263.938c-3.404-4.745-3.404-11.133,0-15.878c1.202-1.675,29.987-41.492,76.505-80.838		c59.662-50.472,119.194-76.064,176.941-76.064s117.279,25.592,176.942,76.065c46.518,39.345,75.301,79.16,76.505,80.837		c3.404,4.745,3.404,11.133,0,15.878c-0.923,1.287-23.04,31.913-59.764,65.997c-5.512,5.116-14.127,4.794-19.243-0.718		c-5.116-5.512-4.794-14.127,0.718-19.243c23.842-22.128,41.397-43.024,50.077-53.973c-10.489-13.223-33.952-40.983-65.879-67.985		c-37.546-31.763-95.669-69.625-159.354-69.625s-121.81,37.862-159.354,69.623c-31.917,26.993-55.374,54.741-65.872,67.973		C54.96,286.372,147.991,393.61,255.998,393.61c33.709,0,69.053-10.467,105.053-31.109c6.524-3.742,14.846-1.486,18.585,5.038		c3.742,6.525,1.486,14.845-5.038,18.585C334.423,409.161,294.52,420.841,255.999,420.841z"/>	<path style="fill:#B3404A;" d="M255.999,420.841c-90.894,0-164.842-73.948-164.842-164.842s73.948-164.84,164.842-164.84		s164.842,73.948,164.842,164.842c0,7.52-6.096,13.616-13.616,13.616s-13.616-6.096-13.616-13.616		c0-75.877-61.73-137.609-137.609-137.609s-137.609,61.731-137.609,137.609s61.73,137.609,137.609,137.609		c7.52,0,13.616,6.096,13.616,13.616S263.52,420.841,255.999,420.841z"/></g><circle style="fill:#F4B2B0;" cx="256.001" cy="256.002" r="85.704"/><g>	<path style="fill:#B3404A;" d="M255.999,355.32c-54.765,0-99.319-44.554-99.319-99.319s44.554-99.319,99.319-99.319		s99.319,44.554,99.319,99.319S310.764,355.32,255.999,355.32z M255.999,183.913c-39.749,0-72.087,32.339-72.087,72.087		s32.339,72.087,72.087,72.087s72.087-32.339,72.087-72.087S295.748,183.913,255.999,183.913z"/>	<path style="fill:#B3404A;" d="M436.998,450.617c-3.484,0-6.97-1.329-9.628-3.988l-361.999-362c-5.317-5.317-5.317-13.939,0-19.258		s13.939-5.317,19.258,0L446.628,427.37c5.317,5.317,5.317,13.939,0,19.258C443.968,449.287,440.483,450.617,436.998,450.617z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
const showIconSvg = '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24pt" width="24pt" x="0px" y="0px"	 viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g>	<path style="fill:#B3404A;" d="M255.999,420.842c-58.045,0-120.387-27.289-180.283-78.915		c-44.577-38.423-72.019-76.391-73.164-77.988c-3.404-4.745-3.404-11.133,0.001-15.878c1.202-1.675,29.986-41.492,76.505-80.838		c59.662-50.472,119.194-76.064,176.941-76.064s117.279,25.592,176.942,76.065c46.516,39.345,75.301,79.16,76.504,80.837		c3.405,4.745,3.405,11.133,0.001,15.878c-0.925,1.287-23.042,31.913-59.765,65.997c-5.511,5.114-14.128,4.794-19.243-0.718		c-5.117-5.512-4.794-14.127,0.716-19.243c23.842-22.128,41.397-43.024,50.077-53.973c-10.489-13.223-33.954-40.983-65.88-67.985		c-37.546-31.763-95.669-69.625-159.354-69.625s-121.808,37.862-159.353,69.623c-31.914,26.993-55.372,54.739-65.869,67.972		c24.185,30.384,117.215,137.621,225.222,137.621c37.113,0,76.083-12.644,115.829-37.58c6.371-3.998,14.777-2.071,18.77,4.297		c3.998,6.37,2.072,14.774-4.297,18.77C342.15,406.798,298.311,420.842,255.999,420.842z"/>	<path style="fill:#B3404A;" d="M255.999,420.842c-90.894,0-164.842-73.948-164.842-164.842S165.106,91.16,255.999,91.16		s164.842,73.948,164.842,164.842c0,7.52-6.097,13.616-13.616,13.616c-7.519,0-13.616-6.096-13.616-13.616		c0-75.877-61.731-137.609-137.609-137.609S118.39,180.124,118.39,256.002s61.731,137.609,137.609,137.609		c7.519,0,13.616,6.096,13.616,13.616S263.518,420.842,255.999,420.842z"/></g><circle style="fill:#F4B2B0;" cx="256" cy="256.003" r="85.704"/><path style="fill:#B3404A;" d="M255.999,355.321c-54.765,0-99.319-44.554-99.319-99.319s44.556-99.319,99.319-99.319	s99.319,44.554,99.319,99.319S310.763,355.321,255.999,355.321z M255.999,183.914c-39.749,0-72.087,32.339-72.087,72.087	s32.338,72.087,72.087,72.087s72.087-32.339,72.087-72.087S295.748,183.914,255.999,183.914z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';

const iconMark = '#{svgIcon}';
const extensionButtonTemplate = `
<div id="hide-panel-extension-button" class="style-scope ytd-masthead style-default" new-subscribe-color="" is-icon-button="" has-no-text="" style="width: 40px;">
<div id="button" class="style-scope ytd-topbar-menu-button-renderer" style="margin-top: 4px;">
<a class="yt-simple-endpoint style-scope ytd-topbar-menu-button-renderer" tabindex="-1">
<div="button" class="style-scope ytd-topbar-menu-button-renderer style-default">
<button id="button" class="style-scope yt-icon-button">
<div class="style-scope ytd-topbar-menu-button-renderer" id="svg-icon-parent">
${iconMark}
</div></button></div></a></div>
</div>`;

const hideYoutubePanelPort = browser.runtime.connect({name:"hide-youtube-panel-port"});

hideYoutubePanelPort.onMessage.addListener(function(message) {
  switch (true) {
    case typeof message.status === "boolean":
      extensionMode = message.status;
      updateIcon();
      processVideoPanelStatus();
      break;
    default:
        hideYoutubePanelPort.postMessage(message);
  }
});

const requestStatus = () => {
  hideYoutubePanelPort.postMessage({requestStatus: true});
}

requestStatus();

eventHandler.addEventListener('transitionend', processTransitionedEvent, true);
eventHandler.addEventListener('spfdone', processNavigate, true);
eventHandler.addEventListener('yt-navigate-start', processNavigate, true);
eventHandler.addEventListener('yt-navigate-finish', postprocessNavigate, true);
eventHandler.addEventListener('yt-player-updated', updateHandler, true);
eventHandler.addEventListener('load', insertButton, true);

function updateHandler() {
  processVideoPanelStatus();
}

function processVideoPanelStatus(){
  elementsToHide.forEach(elementSelector => {
    const element = document.querySelector(elementSelector);
    extensionMode ? hideElement(element) : showElement(element) ;
  });
}

const hideElement = (element) => { element.style.display = 'none'; }
const showElement = (element) => { element.style.display = ''; }

function processTransitionedEvent () {
  if (event.propertyName === 'width' && event.target.id === 'progress')
    processNavigate();
}

function postprocessNavigate() {
  if (location.pathname === '/watch') {
    processVideoPanelStatus();
  }
}

function processNavigate() {
  processVideoPanelStatus();
}

function insertButton() {
  const buttonsElement = document.getElementById('buttons');
  if (!buttonsElement.querySelector('#hide-panel-extension-button')){
    const extensionButtonHtml = extensionButtonTemplate.replace(iconMark, extensionMode ? showIconSvg : hideIconSvg);
    buttonsElement.insertAdjacentHTML('afterbegin',extensionButtonHtml);
    const extensionButton = document.getElementById('hide-panel-extension-button');
    extensionButton.addEventListener('click', onClickEventHandler, false); 
  } 
}

function onClickEventHandler(event){
  hideYoutubePanelPort.postMessage({updateStatus: true});
}

function updateIcon(){
  const iconContainer = document.getElementById('svg-icon-parent');
  iconContainer.innerHTML = "";
  iconContainer.insertAdjacentHTML('beforeend', extensionMode ? showIconSvg : hideIconSvg);
}

processNavigate();