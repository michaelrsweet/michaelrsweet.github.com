/* Sidebar loading code - we do it here to avoid changing it on every page */
function load_sidebar() {
  contents =
'<img src="images/mike.png" alt="Michael R Sweet">\
<ul>\
  <li><a href="index.html">Home</a></li>\
  <li><a href="https://github.com/michaelrsweet">GitHub Profile</a></li>\
  <li id="sideheading">Miscellaneous</li>\
  <li><a href="git-cheat.html">GIT Cheatsheet</a></li>\
  <li><a href="photogear.html">Photo Gear</a></li>\
  <li><a href="qm.html">QuickModel Format</a></li>\
  <li><a href="serial.html">Serial Guide</a></li>\
  <li><a href="svn-cheat.html">SVN Cheatsheet</a></li>\
  <li><a href="uiexperiments.html">UI Experiments</a></li>\
  <li id="sideheading">Projects</li>\
  <li><a href="Mini-XML/index.html">Mini-XML</a></li>';

  if (document.anchors.length > 0)
  {
    contents = contents + '\n<li id="sideheading">This Page</li>';
    for (i = 0; i < document.anchors.length; i ++)
      contents = contents + '\n  <li><a href="#' + document.anchors[i].name +
                 '">' + document.anchors[i].innerHTML + '</a></li>';
  }

  contents = contents + '\n</ul>';

  document.getElementById('sidebar').innerHTML = contents;
}
