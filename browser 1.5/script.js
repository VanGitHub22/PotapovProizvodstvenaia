/*for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;
  console.log(li.getElementsByTagName('li').length)
}


<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType); // 1
  </script>
</body>

</html>



let body = document.body;

body.innerHTML = "<!--" + body.tagName + "-->";

alert( body.firstChild.data ); // BODY*/



alert(document); // [object HTMLDocument]

alert(HTMLDocument.prototype.constructor === HTMLDocument); // true

alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node