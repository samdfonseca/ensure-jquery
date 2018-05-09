const addJQuery = function() {
  const version = document.getElementById('jq-version-select').value
  const injected = function(version) {
    if (typeof(window.jQuery) !== 'undefined') {
      console.debug('jQuery already included on page')
      return
    }
    const elem = document.createElement('script')
    elem.src = (window.location.protocol === 'file:' ? 'http:' : '') + 
      `//ajax.googleapis.com/ajax/libs/jquery/${version}/jquery.min.js`
	  document.getElementsByTagName('head')[0].appendChild(elem)
	  console.debug(`jQuery version ${version} added to page`)
  }
  const code = `(${injected.toString()})('${version}')`
  if (typeof chrome.tabs === 'undefined') {
    eval(code)
    return
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code})
  })
}

const addButton = document.getElementById('add-jquery-button')
addButton.onclick = addJQuery
