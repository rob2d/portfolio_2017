import createBrowserHistory from 'history/createBrowserHistory'
let appHistory = createBrowserHistory();

appHistory.goTo = function(url, e) {
    // extract actual event from React API
    const event = e.nativeEvent;

    // normal left click/touch behavior;
    // push to app history

    if(!event.defaultPrevented && 
      !(event.button == 1 || event.button == 2 || 
       event.metaKey || event.ctrlKey)
    ) {
        appHistory.push({ pathname : url });
    } 

    // if we discover that it was a middle click 
    // (or special click), simply open URL in new 
    // tab and do not push to history

    else if(event.button == 1 || event.ctrlKey){
        window.open(url, '_blank'); 
    }
};

export default appHistory