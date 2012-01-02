/* Sidebar loading code - we do it here to avoid changing it on every page */
function load_sidebar() {
  contents =
'<img src="images/mike.png" alt="Michael R Sweet">\
<ul>\
  <li><a href="index.html">Home</a></li>\
  <li><a href="https://github.com/michaelrsweet">GitHub Profile</a><hr></li>\
  <li><b>Projects</b><br><a href="Mini-XML/index.html">Mini-XML</a></li>\
</ul>';

  if (document.anchors.length > 0)
  {
    contents = contents + '\n<p>This Page:</p>\n<ul>\n';
    for (i = 0; i < document.anchors.length; i ++)
      contents = contents + '  <li><a href="#' + document.anchors[i].name +
                 '">' + document.anchors[i].innerHTML + '</a></li>\n';
    contents = contents + '</ul>';
  }

  document.getElementById('sidebar').innerHTML = contents;
}
