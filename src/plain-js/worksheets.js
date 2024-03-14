//==============================================================================
// worksheets.js
//==============================================================================
// Copyright (c) 2021 The Board of Trustees of the Leland Stanford Junior
// University.  All nonprofit research institutions may use this Software for
// any non-profit purpose, including sponsored research and collaboration.  All
// nonprofit research institutions may publish any information included in the
// Software.  This Software may not be redistributed.  It may not be used for
// commercial purposes.  For any questions regarding commercial use or
// redistribution, please contact the Office of Technology Licensing at Stanford
// University (info@otlmail.stanford.edu).
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS";
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//==============================================================================
//==============================================================================
// global variables
//==============================================================================

indexing = true
dataindexing = true
ruleindexing = true

var lambda = [];
var library = [];

var user = 'anonymous';
var parameters = {};
var datasets = [];
var channels = [];

//==============================================================================
// initialize
//==============================================================================

export function initialize ()
 {parameters = getparameters();

  var widget = document.getElementById('library');  
  library = [];
  definemorerules(library,readdata(widget.textContent));

  widget = document.getElementById('lambda');
  definefacts(lambda,readdata(widget.textContent));

  var widgets = document.getElementsByTagName('dataset');
  for (var i=0; i<widgets.length; i++)
      {var theory = [];
       definefacts(theory,readdata(widgets[i].textContent));
       datasets[widgets[i].id] = theory};

  widgets = document.getElementsByTagName('channel');
  for (var i=0; i<widgets.length; i++)
      {channels[widgets[i].id] = readdata(widgets[i].textContent)};

  fullreact('load');
  return true}

//------------------------------------------------------------------------------

function getparameters ()
 {var parts = location.href.split("?");
  if (parts.length<=1) {return {}};
  var pairs = parts[1].split('&');
  var params = {};
  for (var i=0; i<pairs.length; i++)
      {var args = pairs[i].split('=');
       if (args.length===2 && args[0].length>0 && args[1].length>0)
          {var attr = read(args[0]);
           var value = read(args[1]);
           params[attr] = value}};
  return params}

//==============================================================================
// inputs
//==============================================================================

function handle (widget)
 {if (widget.type==='text' && widget.hasAttribute('autoquote'))
     {return modstring(widget)};
  if (widget.type==='text' && widget.hasAttribute('multiple'))
     {return modmultitext(widget)};
  if (widget.type==='text') {return modtext(widget)};
  if (widget.type==='textarea') {return modstring(widget)};
  if (widget.type==='range') {return modtext(widget)};
  if (widget.type==='select-one') {return modselector(widget)};
  if (widget.type==='select-multiple') {return modmultiselector(widget)};
  if (widget.type==='radio') {return modradio(widget)};
  if (widget.type==='checkbox')  {return modcheck(widget)};
  return modbutton(widget)}

//------------------------------------------------------------------------------
// mod
//------------------------------------------------------------------------------

function modtext (widget)
 {var item = read(widget.id);
  var value = read(widget.value.toLowerCase());
  var action = seq('select',item,value);
  fullreact(action);
  return true}

function modstring (widget)
 {var item = read(widget.id);
  var value = quotify(widget.value.replace(/"/g,"'"));
  var action = seq('select',item,value);
  fullreact(action);
  return true}

function modselector (widget)
 {var item = read(widget.id);
  var value = read(widget.value);
  var action = seq('select',item,value);
  fullreact(action);
  return true}

function modmultiselector (widget)
 {var item = read(widget.id);
  var options = widget.options;
  var values = nil;
  for (var i=widget.options.length-1; i>=0; i--)
      {if (options[i].selected)
          {values = seq('cons',options[i].value,values)}};
  fullreact(seq('multiselect',item,values));
  return true}

function modmenu (widget)
 {var item = read(widget.parentNode.id);
  var value = read(widget.value);
  if (widget.selected)
     {var action = seq('select',item,value);
      fullreact(action)}
     else {var action = seq('deselect',item,value);
           fullreact(action)};
  return true}

function modradio (widget)
 {var item = read(widget.name);
  var value = read(widget.id);
  fullreact(seq('select',item,value));
  return true}

function modcheck (widget)
 {var item = read(widget.id);
  var value = widget.checked ? 'true' : 'false';
  fullreact(seq('select',item,value));
  return true}

export function modbutton (widget)
 {return fullreact(seq('click',read(widget.id)))}

function modsubmit (widget)
 {fullreact(seq('click',read(widget.id)));
  return widget.form.submit()}

function modopen (widget)
 {var link = widget.getAttribute("href");
  if (link) {location.href = link};
  return true}

function modreplace (widget)
 {var link = widget.getAttribute("href");
  if (link) {location.replace(link)};
  return true}

//------------------------------------------------------------------------------
// drag and drop
//------------------------------------------------------------------------------

function allowdrop(ev) {ev.preventDefault()}

function drag (ev)
 {ev.dataTransfer.setData("text",ev.target.id);
  //console.log('Dragging ' + ev.target.id);
  return true}

function drop (ev)
 {//ev.preventDefault();
  //console.log('Dropped ' + ev.dataTransfer.getData("text") + ' in ' + ev.target.id);
  var source = ev.dataTransfer.getData("text");
  var target = ev.target.id;
  fullreact(seq('drag',read(source),read(target)));
  return true}

//------------------------------------------------------------------------------
// timer
//------------------------------------------------------------------------------

var ticker = false;

function dostep ()
 {return fullreact('tick')}

function doplay ()
 {document.getElementById('stepper').disabled = true;
  document.getElementById('player').disabled = true;
  document.getElementById('pauser').disabled = false;
  document.getElementById('stepper').style.backgroundColor = '#efefef';
  document.getElementById('player').style.backgroundColor = '#efefef';
  document.getElementById('pauser').style.backgroundColor = '#ffffff';
  run();
  return true}

function dopause ()
 {document.getElementById('stepper').disabled = false;
  document.getElementById('player').disabled = false;
  document.getElementById('pauser').disabled = true;
  document.getElementById('stepper').style.backgroundColor = '#ffffff';
  document.getElementById('player').style.backgroundColor = '#ffffff';
  document.getElementById('pauser').style.backgroundColor = '#efefef';
  if (ticker) {clearTimeout(ticker); ticker = false};
  return true}

function run()
 {fullreact('tick');
  var tickinterval = compfindx("X",seq("tickinterval","X"),lambda,library);
  var interval = parseFloat(tickinterval || 500);
  ticker = setTimeout(run,interval);
  return true}

//==============================================================================
// fullreact
//==============================================================================

exportables = ['alert'];

export function fullreact (event)
 {var deltas = compexecute(event,lambda,library);
  populatesheet();
  for (var i=0; i<deltas.length; i++) {execute(deltas[i])};
  return true}

function execute (action)
 {if (symbolp(action)) {return enqueue(action)};
  if (action[0]==='alert') {return alert(action[1])};
  return enqueue(action)}

function enqueue (event)
 {//console.log('Queuing: ' + event);
  setTimeout(function () {fullreact(event)},0);
  return true};

//==============================================================================
// Output
//==============================================================================

function populatesheet ()
 {var widgets = document.querySelectorAll('[id]');
  for (var i=0; i<widgets.length; i++)
      {populate(widgets[i])};
  reposition();
  return true}

//------------------------------------------------------------------------------

var populators = [];

function populate (widget)
 {populatevalue(widget);
  populateattributes(widget);
  populatestyles(widget);
  populatecontents(widget);
  return false}

//------------------------------------------------------------------------------

function populatevalue (widget)
 {if (widget.type==='hidden') {return populatetext(widget)};
  if (widget.type==='text' & !widget.hasAttribute('autoquote'))
     {return populatetext(widget)};
  if (widget.type==='text' & widget.hasAttribute('autoquote'))
     {return populatestring(widget)};
  if (widget.type==='textarea') {return populatetextarea(widget)};
  if (widget.type==='range') {return populatetext(widget)};
  if (widget.type==='select-one') {return populateselector(widget)};
  if (widget.type==='select-multiple') {return populatemenu(widget)};
  if (widget.type==='radio') {return populateradio(widget)};
  if (widget.type==='checkbox') {return populatecheck(widget)};
  if (widget.tagName==="TABLE") {return populatetable(widget)};
  var handler = populators[widget.tagName];
  if (handler) {return handler.call(null,widget)};
  return true}

//------------------------------------------------------------------------------

function populatetext (widget)
 {var id = read(widget.id);
  var value = compfindx('Y',seq('value',id,'Y'),lambda,library);
  if (document.activeElement!==widget)
     {widget.value = (value!==false) ? grind(value) : ""};
  return true}

//------------------------------------------------------------------------------

function populatestring (widget)
 {var id = read(widget.id);
  var value = compfindx('Y',seq('value',id,'Y'),lambda,library);
  if (document.activeElement!==widget)
     {widget.value = (value!==false) ? stripquotes(value) : ""};
  return true}

//------------------------------------------------------------------------------

function populatetextarea (widget)
 {if (widget.id==='lambda' || widget.id==='library') {return false};
  var id = read(widget.id);
  var value = compfindx('Y',seq('value',id,'Y'),lambda,library);
  if (document.activeElement!==widget)
     {widget.value = (value!==false) ? stripquotes(value) : ""};
  return true}

//------------------------------------------------------------------------------

function populateselector (widget)
 {var id = read(widget.id);
  var options = compfindx('Y',seq('options',id,'Y'),lambda,library);
  var value = compfindx('Y',seq('value',id,'Y'),lambda,library);
  if (options) {saveoptions(widget,options)};
  saveselection(widget,value);
  return true}

function saveoptions (widget,options)
 {while (widget.options.length>1) {widget.remove(1)};
  while (options!=='nil')
   {var option = document.createElement('option');
    var value = grind(options[1]);
    option.value = value;
    option.text = stripquotes(value);
    widget.add(option);
    options = options[2]}
  return true}

function saveselection (widget,value)
 {widget.selectedIndex = -1;
  for (var i=0; i<widget.options.length; i++)
      {if (widget.options[i].value==value)
          {widget.options[i].selected = true; break}};
  return true}

//------------------------------------------------------------------------------

function populatemenu (widget)
 {var id = read(widget.id);
  var options = compfindx('Y',seq('options',id,'Y'),lambda,library);
  var valuelist = compfindx('Y',seq('valuelist',id,'Y'),lambda,library);
  if (options) {saveoptions(widget,options)};
  saveselections(widget,valuelist);
  return true}

function saveselections (widget,valuelist)
 {for (var i = 0; i<widget.options.length; i++)
      {if (ismember(widget.options[i].value,valuelist))
          {widget.options[i].selected = true}
          else {widget.options[i].selected = false}};
  return true}

function ismember (x,l)
 {while (!symbolp(l) && l[0]==='cons')
   {if (equalp(x,l[1])) {return true};
    l = l[2]};
  return false}

//------------------------------------------------------------------------------

function populateradio (widget)
 {var name = read(widget.name);
  var id = read(widget.id);
  widget.checked = compfindp(seq('value',name,id),lambda,library);
  return false}

//------------------------------------------------------------------------------

function populatecheck (widget)
 {var id = read(widget.id);
  var value = compfindx('Y',seq('value',id,'Y'),lambda,library);
  if (value==='true') {widget.checked = true} else {widget.checked = false};
  return true}

//------------------------------------------------------------------------------

function populatetable (widget)
 {var id = read(widget.id);
  var result = compfindx('Y',seq('rows',id,'Y'),lambda,library);
  if (!result) {return false};
  var styles = getstyles(widget);
  var bodies = widget.tBodies;
  if (bodies.length===0)
     {widget.appendChild(document.createElement('tbody'));
      bodies = widget.tBodies};
  var body = bodies[0];
  while (body.rows.length>0) {body.deleteRow(0)};
  while (result!==nil)
   {var row = body.insertRow(body.rows.length);
    for (var j=0; j<styles.length; j++)
        {var cell = row.insertCell(j);
         cell.innerHTML = display(result[1][j+1],styles[j])};
    result = result[2]};
  return true}

function getstyles (widget)
 {var styles = seq();
  var head = widget.tHead;
  if (head===null) {return new Array().fill(null)};
  var cells = head.rows[0].cells;
  for (var j=0; j<cells.length; j++)
      {styles.push(cells[j].getAttribute('displaystyle'))};
  return styles}

function display (x,style)
 {if (style===null) {return grind(x)}
  if (style==='stringfield') {return stripquotes(x)};
  var xs = compfindx('Out',seq(style,x,'Out'),lambda,library);
  if (xs) {return stripquotes(xs)};
  return grind(x)}

//------------------------------------------------------------------------------

function populateattributes (widget)
 {var id = read(widget.id);
  var pattern = seq('attribute',id,'A','Y');
  var data = compfinds(pattern,pattern,lambda,library);
  for (var i=0; i<data.length; i++)
      {var id = grind(data[i][1]);
       if (id==='id') {continue};
       var property = stripquotes(data[i][2]);
       var val = stripquotes(data[i][3]);
       if (property==='disabled' && val==='false')
          {widget.disabled = false}
       else if (property==='readonly' && val==='false')
               {widget.removeAttribute('readonly')}
       else {widget.setAttribute(property,val)}};
  return true}

function saveattribute (datum)
 {var widget = document.getElementById(grind(datum[1]));
  if (!widget) {return false};
  var property = stripquotes(datum[2]);
  var val = stripquotes(datum[3]);
  if (property==='disabled' && val==='false')
     {widget.disabled = false}
     else if (property==='readonly' && val==='false')
             {widget.removeAttribute('readonly')}
     else {widget.setAttribute(property,val)};
  return true}

//------------------------------------------------------------------------------

function populatestyles (widget)
 {var id = read(widget.id);
  var pattern = seq('style',id,'A','Y');
  var data = compfinds(pattern,pattern,lambda,library);
  for (var i=0; i<data.length; i++)
      {var property = stripquotes(data[i][2]);
       var style = stripquotes(data[i][3]);
       widget.style[property] = style};
  return true}

//------------------------------------------------------------------------------

function populatecontents (widget)
 {var id = read(widget.id);
  var pattern = seq('innerhtml',id,'Y');
  var value = compfindx('Y',pattern,lambda,library);
  if (!value) {return false};
  widget.innerHTML = stripquotes(value);
  return true}

//==============================================================================
//reposition
// xoffset, yoffset: numeric, {left, center, right}, {top, center, bottom};
// xref, yref: ids
//==============================================================================

function reposition ()
 {var a = document.querySelectorAll("[yref],[xref],[xoffset],[yoffset]");
  var all = [];
  for (var i=0; i<a.length; i++) {all.push(a[i])};
  for (var i=0; i<all.length; i++) {all[i].removeAttribute("positioned")};
  for (var i=0; i<all.length; i++)
      {if (!all[i].getAttribute("positioned")) {position(all[i])}};
  return true}

function position (w)
 {var xref = document.getElementById(w.getAttribute("xref")||"");
  var xoffset = w.getAttribute("xoffset");
  var yref = document.getElementById(w.getAttribute("yref")||"");
  var yoffset = w.getAttribute("yoffset");

  var left = 0, top = 0;

  var grp = closestgroup(w.parentNode);
  if (grp)
     {if (!grp.getAttribute("positioned")) position(grp);
      var lt = getlefttop(grp);
      left = parseFloat(lt[0]), top = parseFloat(lt[1])}

  if (xref && isrelative(xref) && !xref.getAttribute("positioned"))
		position(xref);
  if (yref && isrelative(yref) && !yref.getAttribute("positioned"))
		position(yref);

  var em = document.querySelector("._main")? document.querySelector("._main"): document.body;

  if (!xoffset)
		xoffset = xref? 0: parseFloat(w.getAttribute("data-x") || 0);
	else if (xoffset == "left")
		xoffset = -1 * parseFloat(getComputedStyle(w).width);
	else if (xoffset == "right")
		xoffset = xref? parseFloat(getComputedStyle(xref).width): parseFloat(w.getAttribute("data-x") || 0);
	else if (xoffset == "center")
		xoffset = ((xref? parseFloat(getComputedStyle(xref).width): parseFloat(em.scrollWidth)) - parseFloat(getComputedStyle(w).width)) / 2;
	else 
		xoffset = xoffset.length && !isNaN(xoffset)? xoffset: parseFloat(w.getAttribute("data-x") || 0);

  if (!yoffset)
		yoffset = yref? 0: parseFloat(w.getAttribute("data-y") || 0);
	else if (yoffset == "top")
		yoffset = -1 * parseFloat(getComputedStyle(w).height);
	else if (yoffset == "bottom")
		yoffset = yref? parseFloat(getComputedStyle(yref).height): parseFloat(w.getAttribute("data-y") || 0);
	else if (yoffset == "center")
		yoffset = ((yref? parseFloat(getComputedStyle(yref).height): parseFloat(em.scrollHeight)) - parseFloat(getComputedStyle(w).height)) / 2;
	else 
		yoffset = yoffset.length && !isNaN(yoffset)? yoffset: parseFloat(w.getAttribute("data-y") || 0);

  var x, y;
  var yo = document.querySelector("._main")? 24: 0;

  if (xref)
		x = getAbsoluteBoundingRect(xref).left + parseFloat(xoffset) - left;//xref.getBoundingClientRect().left + parseFloat(xoffset);
	else x = /*parseFloat(w.getAttribute("data-x") || 0) + */parseFloat(xoffset);
  if (yref)
		y = getAbsoluteBoundingRect(yref).top + parseFloat(yoffset) - yo - top;//yref.getBoundingClientRect().top + parseFloat(yoffset) - 24;
	else y = /*parseFloat(w.getAttribute("data-y") || 0) + */parseFloat(yoffset);

  w.setAttribute("data-x",x);
  w.setAttribute("data-y",y);

  var transform = w.style["transform"] || w.style["-webkit-transform"] || w.style["-moz-transform"] || "";
    
  var prev = transform;
  var translate = "translate(" + x + "px," + y + "px)";  
  if (transform.match(/translate\([^)]+\)/g))
     transform = transform.replace(/translate\([^)]+\)/g,translate);
      else
        transform = translate + " " + transform;
   	w.style["-moz-transform"] = w.style["-webkit-transform"] = w.style["transform"] = transform;
   	w.setAttribute("positioned",true)}

function closestgroup (w)
 {if (w.nodeName == "BODY") {return null}
     else if (w.getAttribute("widget") && w.getAttribute("widget") == "group")
          {return w}
     else {return closestgroup(w.parentNode)}}

function isrelative (w)
 {return w.getAttribute("xref") || w.getAttribute("yref") || false}

function getlefttop (w)
 {var x = parseFloat(w.getAttribute("data-x")||0);
  var y = parseFloat(w.getAttribute("data-y")||0);
  var g = closestgroup(w.parentNode);
  if (!g) {return [x,y]};
  var a = getlefttop(g);
  return [a[0] + x,a[1] + y]}

function getAbsoluteBoundingRect (el) 
 {var doc  = document,
        win  = window,
        body = doc.body,

        // pageXOffset and pageYOffset work everywhere except IE <9.

        offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
            (doc.documentElement || body.parentNode || body).scrollLeft,
        offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
            (doc.documentElement || body.parentNode || body).scrollTop,

        rect = el.getBoundingClientRect();

    if (el !== body) 
       {var parent = el.parentNode;

        // The element's rect will be affected by the scroll positions of
        // *all* of its scrollable parents, not just the window, so we have
        // to walk up the tree and collect every scroll offset. Good times.

        while (parent !== body && parent !== null) 
         {offsetX += parent.scrollLeft;
          offsetY += parent.scrollTop;
          parent   = parent.parentNode}}

    return {bottom: rect.bottom + offsetY,
            height: rect.height,
            left  : rect.left + offsetX,
            right : rect.right + offsetX,
            top   : rect.top + offsetY,
            width : rect.width}}

window.onresize = function() {reposition()};

//==============================================================================
// File system
//==============================================================================

function dosavefile()
 {var filename = prompt("Enter File Name.  (if Automatic Downloads are enabled, then the file will appear in the downloads directory as per your browser's settings.)");
  if (!filename) {return false};
  if (filename.length===0)
     {alert('Error: no file name was specified.'); return false};
  return savefile(filename,grindem(lambda))}
 
function savefile(filename, data)
 {//works for IE 10, Edge 12, Firefox 4, Chrome 8, Safari 6, Opera 15
  var blob = new Blob([data], {type: 'plain/text'});
  if (window.navigator.msSaveOrOpenBlob) 
     {return window.navigator.msSaveBlob(blob,filename)};
  var elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;        
  document.body.appendChild(elem);
  elem.click();        
  document.body.removeChild(elem);
  return true}

//------------------------------------------------------------------------------

function doloadfile ()
 {var widget = document.getElementById('file');
  widget.value = null;
  widget.click();
  return true}

function fileselect (e) 
 {if (!(window.File && window.FileReader && window.FileList && window.Blob))
     {alert('The File APIs are not fully supported in this browser.');
      return}
  var files = e.target.files;
  var output = [], f;
  for (var i = 0; f = files[i]; i++)
      {var reader = new FileReader();
       reader.onload = function(fe)
        {var content = fe.target.result;
         definefacts(lambda,readdata(content));
         populatesheet()};
       reader.readAsText(f)}
  return true}

//==============================================================================
// epilog builtins
//==============================================================================

builtins.push("parameter");

function parameter (attr)
 {var value = parameters[attr];
  if (value) {return value};
  return false}


builtins.push("source");

function source (dataset)
 {var widget = document.getElementById(dataset);
  var source = widget.getAttribute('src');
  if (source) {return source};
  return false}


builtins.push("dayofweek");

function dayofweek (timestamp)
 {timestamp = numberize(timestamp);
  var d = new Date(timestamp);
  return stringize(d.getDay())}


builtins.push("totimestamp");

function totimestamp (date)
 {date = stripquotes(date);
  var d = new Date(date);
  return stringize(d.getTime())} 


builtins.push("formattimestamp");

function formattimestamp (timestamp)
 {timestamp = numberize(timestamp);
  var d = new Date(timestamp);
  var year = d.getFullYear(), month = d.getMonth(), day = d.getDate(), hour = d.getHours(), min = d.getMinutes(), sec = d.getSeconds();
  return seq('time',stringize(year),
                   stringize(month > 9? month: "0" + month),
                   stringize(day > 9? day: "0" + day),
                   stringize(hour > 9? hour: "0" + hour),
                   stringize(min > 9? min: "0" + min),
                   stringize(sec > 9? sec: "0" + sec))}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------