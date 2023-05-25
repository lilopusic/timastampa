function createContextMenus() {
  chrome.contextMenus.create({
    type: 'normal',
    id: 'timestampConvert',
    title: 'Convert timestamp!',
    checked: false,
    contexts: ['selection'],
  })
}
chrome.runtime.onInstalled.addListener(() => {
  createContextMenus()
})

function contextClick(info, _tab) {
  const { menuItemId } = info

  if (menuItemId === 'timestampConvert') {
    chrome.storage.local.set({ selection: info.selectionText }).then(() => {
      chrome.windows.create({
        url: chrome.runtime.getURL('index.html'),
        type: 'popup',
        top: 100,
        left: 300,
        width: 700,
        height: 600,
      })
    })
  }
}

chrome.contextMenus.onClicked.addListener(contextClick)
