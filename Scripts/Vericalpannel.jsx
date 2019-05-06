var w = new Window ('dialog {text: "Preferences", orientation: "column", alignChildren: ["fill","fill"], properties: {closeButton: false}}');
w.main = w.add ('group {preferredSize: [600, 500], alignChildren: ["left","fill"]}');
w.stubs = w.main.add ('listbox', undefined, ['General', 'Interface', 'UI Scaling']);
 w.stubs.preferredSize.width = 150;
w.tabGroup = w.main.add ('group {alignment: ["fill","fill"], orientation: "stack"}');
w.tabs = [];
 w.tabs[0] = w.tabGroup.add ('group');
 w.tabs[0].add ('statictext {text: "General"}');
 w.tabs[0].add ('panel');
 w.tabs[0].add ('checkbox {text: "Show Start workspace when no documents are open"}');
 w.tabs[0].add ('checkbox {text: "Show Recent Files workspace when opening a file"}');
 w.tabs[0].add ('panel {text: "Page numbering", preferredSize: [-1, 80]}');
 w.tabs[0].add ('panel {text: "Font downloading and embedding", preferredSize: [-1, 80]}');
 w.tabs[0].add ('panel {text: "Object editing", preferredSize: [-1, 150]}');
 w.tabs[0].add ('panel {text: "When placing or pasting content", preferredSize: [-1, 80]}');
 with (w.tabs[0]) {
 with (add ('group {alignment: "center"}')) {
 add ('button {text: "Reset al warning dialogs"}');
 }
 }
 w.tabs[1] = w.tabGroup.add ('group');
 w.tabs[1].add ('statictext {text: "Interface"}');
 w.tabs[1].add ('panel {preferredSize: [-1, -10]}');
 w.tabs[1].add ('panel {text: "Appearance", preferredSize: [-1, 80]}');
 w.tabs[1].add ('panel {text: "Cursor and gesture options", preferredSize: [-1, 150]}');
 w.tabs[1].add ('panel {text: "Panels", preferredSize: [-1, 150]}');
 w.tabs[1].add ('panel {text: "Options", preferredSize: [-1, 100]}');
65
 w.tabs[2] = w.tabGroup.add ('group');
 w.tabs[2].add ('statictext {text: "UI Scaling"}');
 w.tabs[2].add ('panel');
 w.tabs[2].add ('panel {text: "Options", preferredSize: [-1, 200]}');

w.buttons = w.add ('group {alignment: "right"}');
 w.buttons.add ('button {text: "OK"}');
 w.buttons.add ('button {text: "Cancel"}');
for (var i = 0; i < w.tabs.length; i++) {
 w.tabs[i].orientation = 'column';
 w.tabs[i].alignChildren = 'fill';
 w.tabs[i].alignment = ['fill','fill'];
 w.tabs[i].visible = false;
}
w.stubs.onChange = showTab;
function showTab () {
 if (w.stubs.selection !== null) {
 for (var i = w.tabs.length-1; i >= 0; i--) {
 w.tabs[i].visible = false;
 }
 w.tabs[w.stubs.selection.index].visible = true;
 }
}
w.onShow = function () {
 w.stubs.selection = 1;
 showTab;
}
w.show();