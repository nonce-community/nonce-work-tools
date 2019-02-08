// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const TabGroup = require("electron-tabs");
const {
  remote,
  shell
} = require('electron')
const electronLocalshortcut = require('electron-localshortcut');

let tabGroup = new TabGroup({});

let mail = tabGroup.addTab({
  title: "메일",
  src: "https://mail.google.com/a/nonce.community",
  visible: true,
  active: true,
  closable: false
});

let notion = tabGroup.addTab({
  title: "노션",
  // src: "https://www.notion.so/noncefoundation",
  src: "https://www.notion.so/googlepopupredirect?redirectToAuth=true",
  visible: true,
  active: false,
  closable: false
});


let slack = tabGroup.addTab({
  title: "슬랙",
  src: "https://nonce-community.slack.com",
  visible: true,
  active: false,
  closable: false
});

let calendar = tabGroup.addTab({
  title: "캘린더",
  src: "https://calendar.google.com/a/nonce.community",
  visible: true,
  active: false,
  closable: false
});

let drive = tabGroup.addTab({
  title: "구글 드라이브",
  src: "https://drive.google.com/a/nonce.community",
  visible: true,
  active: false,
  closable: false
});

let groups = tabGroup.addTab({
  title: "그룹메일",
  src: "https://groups.google.com/a/nonce.community",
  visible: true,
  active: false,
  closable: false
});

let analytics = tabGroup.addTab({
  title: "애널리틱스",
  src: "https://analytics.google.com/analytics/a/nonce.foundation",
  visible: true,
  active: false,
  closable: false
});

let facebook = tabGroup.addTab({
  title: "페이스북",
  src: "https://www.facebook.com/nonce.community/",
  visible: true,
  active: false,
  closable: false
});

let twitter = tabGroup.addTab({
  title: "트위터",
  src: "https://twitter.com/nonce_community",
  visible: true,
  active: false,
  closable: false
});

let brunch = tabGroup.addTab({
  title: "브런치",
  src: "https://brunch.co.kr/@nonce#articles",
  visible: true,
  active: false,
  closable: false
});

let help = tabGroup.addTab({
  title: "사용법",
  src: "help.html",
  visible: true,
  active: false,
  closable: false
});


let nextTab;
const goToNextTab = () => {
  nextTab = tabGroup.getNextTab();
  if (!nextTab) {
    nextTab = tabGroup.getTabByPosition(1);
  }
  nextTab.activate();
}

let prevTab;
const goToPrevTab = () => {
  prevTab = tabGroup.getPreviousTab();
  if (!prevTab) {
    prevTab = tabGroup.getTabByPosition(-1);
  }
  prevTab.activate();
}

const goToTabByPosition = (position) => () => {
  tabGroup.getTabByPosition(position).activate();
}

const goForward = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.goForward()
  }
}

const goBackward = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.goBack()
  }
}

const redo = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.redo()
  }
}

const undo = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.undo()
  }
}

const copy = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.copy()
  }
}

const paste = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.paste()
  }
}

const selectAll = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.selectAll()
  }
}

const reLoadPage = () => {
  let activeTab = tabGroup.getActiveTab();
  if(activeTab) {
    activeTab.webview.loadURL(activeTab.webviewAttributes.src);
  }
}

tabGroup.getTabs().forEach(tab => {
  tab.webview.addEventListener('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    shell.openExternal(event.url);
  });
});

let win = remote.getCurrentWindow()
electronLocalshortcut.register(win, 'Ctrl+Tab', goToNextTab);
electronLocalshortcut.register(win, 'Ctrl+Shift+Tab', goToPrevTab);
electronLocalshortcut.register(win, 'Cmd+Right', goToNextTab);
electronLocalshortcut.register(win, 'Cmd+Left', goToPrevTab);
electronLocalshortcut.register(win, 'CmdOrCtrl+1', goToTabByPosition(1));
electronLocalshortcut.register(win, 'CmdOrCtrl+2', goToTabByPosition(2));
electronLocalshortcut.register(win, 'CmdOrCtrl+3', goToTabByPosition(3));
electronLocalshortcut.register(win, 'CmdOrCtrl+4', goToTabByPosition(4));
electronLocalshortcut.register(win, 'CmdOrCtrl+5', goToTabByPosition(5));
electronLocalshortcut.register(win, 'CmdOrCtrl+6', goToTabByPosition(6));
electronLocalshortcut.register(win, 'CmdOrCtrl+7', goToTabByPosition(7));
electronLocalshortcut.register(win, 'CmdOrCtrl+8', goToTabByPosition(8));
electronLocalshortcut.register(win, 'CmdOrCtrl+9', goToTabByPosition(9));
electronLocalshortcut.register(win, 'CmdOrCtrl+0', goToTabByPosition(-1));
electronLocalshortcut.register(win, 'CmdOrCtrl+PageUp', goToPrevTab);
electronLocalshortcut.register(win, 'CmdOrCtrl+PageDown', goToNextTab);
electronLocalshortcut.register(win, 'CmdOrCtrl+R', reLoadPage);
electronLocalshortcut.register(win, 'CmdOrCtrl+[', goBackward);
electronLocalshortcut.register(win, 'CmdOrCtrl+]', goForward);
electronLocalshortcut.register(win, 'CmdOrCtrl+Z', undo);
electronLocalshortcut.register(win, 'CmdOrCtrl+Shift+Z', redo);
electronLocalshortcut.register(win, 'CmdOrCtrl+C', copy);
electronLocalshortcut.register(win, 'CmdOrCtrl+V', paste);
electronLocalshortcut.register(win, 'CmdOrCtrl+A', selectAll);
