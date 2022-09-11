// ==UserScript==
// @name        WikiMuch
// @namespace   https://greasyfork.org
// @description Wikipedia clean and minimal theme. Press B to show/hide sidebar. Press F9 for dark mode. Custom fonts can be set via userscript variables mainFont, textFont and monoFont. Inspired by https://userstyles.org/styles/102164 and https://greasyfork.org/en/scripts/10731.
// @author      Guillaume
// @version     2.3.4
// @downloadURL https://github.com/ltGuillaume/WikiMuch/raw/master/wikimuch.user.js
// @icon        https://github.com/ltGuillaume/WikiMuch/raw/master/logo.png
// @match       *://*.wikipedia.org/w/*
// @match       *://*.wikipedia.org/wiki/*
// @match       *://*.wikiless.org/w/*
// @match       *://*.wikiless.org/wiki/*
// @homepageURL https://greasyfork.org/scripts/31127
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at      document-start
// ==/UserScript==

// Default fonts
var mainFont = GM_getValue('mainFont') || "Calibri, sans-serif";
var textFont = GM_getValue('textFont') || "Amasis, 'Segoe UI', sans-serif";
var monoFont = GM_getValue('monoFont') || "'Source Code Pro', 'Lucida Sans Unicode', 'Couriew New', monospace";

// Default languages
var myLangs = GM_getValue('myLangs') || ["en", "simple", "nl", "de"];

if (document.URL.indexOf('m.wikipedia') != -1)
	location.assign(document.URL.replace('m.', ''));

var plang = null;

GM_addStyle(`
html { height: auto }
body { background: #fafafa !important }
body, #mw-head *, #toc *, #p-lang *, .infobox * {
	font-family: ${mainFont} !important;
	letter-spacing: -.015em;
}
h1, h2, h3, h4, h5, h6 {
	font-family: ${mainFont} !important;
	color: #444;
	border: 0 !important;
}
h1 {
	font-weight: 700 !important;
	font-size: 36px !important;
}
h2 {
	font-weight: 700 !important;
	font-size: 26px !important;
}
h3 {
	font-weight: 700 !important;
	font-size: 16px !important;
}
#content h3 {
	font-size: 20px !important;
}
dd, ol, p, ul {
	font-family: ${textFont} !important;
	letter-spacing: -.0075em;
	line-height: 1.5 !important;
}
table:not(.infobox):not(.sidebar).wikitable thead,
tr:first-child th:not(.infobox-above):not(.summary) {
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 1;
}
table, td, th {
	border: 0 !important;
	border-collapse: collapse !important;
	padding: 5px;
}
ul, li {
	background: transparent !important;
	border: 0 !important;
	line-height: 1.5 !important;
	font-size: 14px !important;
	font-weight: 300 !important;
}
li span {
	background: transparent !important;
	border: 0 !important;
	font-size: 14px !important;
}
.reference, hr { font-size: 9px !important }
dl { font-weight: 300 !important }
dt {
	font-style: italic;
	font-size: 16px !important;
	margin-top: 10px !important;
}
dd { font-size: 15px !important }
code {
	padding: 3px !important;
	background: transparent !important;
	color: #39892f !important;
}
tt {
	font-family: ${monoFont} !important;
	font-size: 16px !important;
}
a, a:link, a:hover, a:visited { color: #067bad !important }
.new, .new:link, .new:visited { color: #cd5b45 !important }
blockquote p {
	font-style: italic !important;
	font-weight: 400 !important;
}
select { padding: 0 10px }
.mw-ui-button, .mw-ui-progressive {
	border-radius: 4px !important;
	border: 1px solid #347bff !important;
	color: #347bff !important;
	background: #fff !important;
	text-shadow: 0 0 0;
}
.mw-ui-button.mw-ui-progressive:hover, .mw-ui-button.mw-ui-progressive:focus, .mw-ui-button.mw-ui-progressive:active, .mw-ui-button:hover, .mw-ui-progressive:hover, .mw-ui-button:focus, .mw-ui-progressive:focus {
	box-shadow: 0 0 0 !important;
	text-shadow: 0 0 0 !important;
	border: 1px solid #347bff !important;
}
#wpSave, #wpPreview, #wpDiff {
	border-radius: 4px !important;
	border: 1px solid #347bff !important;
	color: #347bff !important;
	background: #fff !important;
	text-shadow: 0 0 0;
	padding: .5em 1em;
	cursor: pointer;
}
#wpSave:hover, #wpPreview:hover, #wpDiff:hover { color: rgba(52, 123, 255, .5) !important }
#p-personal, #ca-view, #ca-edit, #ca-talk { display: none }
#right-navigation { margin-top: .5em !important }
/* Search */
#simpleSearch {
	border: 1px solid rgba(0, 0, 0, .25) !important;
	background: transparent !important;
	color: #333 !important;
	border-radius: 5px !important;
	padding: 0 !important;
	height: 1.5em !important;
}
#simpleSearch input { height: auto }
#searchInput {
	border: 0 !important;
	background: transparent !important;
	padding: 4px 7px 7px 7px !important;
}
#searchInput:focus, #simpleSearch:hover #searchInput:focus { box-shadow: none }
#searchButton { right: 7px !important }
.mw-ui-input {
	border: 1px solid #347bff !important;
	color: #333 !important;
	background: #fff !important;
	font-size: 16px !important;
}
.mw-ui-input:focus { box-shadow: 0 0 0 !important }
.suggestions {
	font-weight: 300 !important;
	font-size: 15px !important;
	max-width: 300px !important;
	margin-top: 15px !important;
	border: 0 !important;
	box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, .5);
}
.suggestions-results { border: 0 !important }
.suggestions-result { padding: 10px !important }
.suggestions-result-current { background-color: #067bad }
.imeselector, #searchEngines, #ca-nstab-special { display: none !important }
.vector-menu-tabs, .vector-menu-tabs a, #mw-head .vector-menu-dropdown h3 { background: none !important }
.mw-search-formheader {
	border: 0 !important;
	background: transparent !important;
}
.mw-search-result-heading, .searchresult, .searchmatch {
	font-size: 14px !important;
	font-weight: 400 !important;
	padding: 3px 0 !important;
}
.searchmatch { font-weight: 700 !important }
.mw-search-result-data, .mw-search-createlink { display: none }
#mw-page-base, .vectorTabs {
	background: transparent !important;
	border: 0 !important;
}
div#content.mw-body {
	border: 0 !important;
	margin-left: 255px;
}
.portal { background: transparent !important }
.uls-settings-trigger { display: none !important }
#left-navigation { margin-left: 33px !important }
#ca-nstab-main { display: none }
pre {
	font-family: ${monoFont} !important;
	border: 1px solid #eee !important;
	background: 0 !important;
}
.mw-code {
	border: 1px solid #eee !important;
	padding: 17px !important;
	background: 0 !important;
}
.thumbinner, .thumb, .toccolours, .graytable {
	background: transparent !important;
	border: 0 !important;
}
.thumbimage { border: 0 !important }
.thumbcaption {
	font-style: italic !important;
	margin: 7px 0 !important;
}
.thumbimage:hover { opacity: .85 !important }
.dablink {
	margin: 14px 0 !important;
	font-weight: 300 !important;
	font-size: 18px !important;
}
#siteSub, .flaggedrevs_preview { display: none !important }
.ambox, .tmbox, .Note, .informationbox {
	margin: 5px 0 !important;
	background: #f9f9f9 !important;
	line-height: 1.5 !important;
	border: 1px dashed #aaa !important;
	max-width: 80% !important;
	font-weight: 300 !important;
}
.ambox td, .tmbox td { padding: 10px !important }
.ambox-text-small, .mbox-text, .Note td {
	font-weight: 300 !important;
	color: #333 !important;
}
.ambox-image, .mbox-image { display: none }
#request_for_deletion, .ambox-serious {
	background: rgba(255, 0, 0, .1) !important;
	border: 1px dashed rgba(255, 0, 0, .15) !important;
	color: #a00000 !important;
}
.tmbox-notice, .tmbox-move, .Note {
	background: rgba(150, 75, 0, .1) !important;
	border: 1px dashed rgba(150, 75, 0, .15) !important;
}
.informationbox {
	background: #fff !important;
	padding: 10px !important;
	font-size: 14px !important;
}
.editOptions {
	background: #fff !important;
	border: 0 !important;
}
.catlinks {
	background: transparent !important;
	border: 1px dashed #aaa !important;
	font-size: 16px !important;
}
table:not(.navbox-subgroup):not(.ambox), .infobox, .mbox-small, .navbox, .quotebox, .referencetooltip li, .thumb, .toccolours {
	border: 1px solid #eee !important;
	background: #f9f9f9 !important;
	border-collapse: collapse !important;
	color: #333;
}
.mwe-popups p { line-height: 19.5px !important }
.mwe-popups-container { background: #f9f9f9 !important }
.mwe-popups-extract[dir="ltr"]:after { background: linear-gradient(to right, transparent, #f9f9f9 70%) !important }
.mwe-popups-extract[dir="rtl"]:after { background: linear-gradient(to left,  transparent, #f9f9f9 70%) !important }
.infobox td, .infobox th, .tright td, .tright th, .toccolours td, .toccolours th {
	padding: 5px !important;
	background: transparent !important;
	font-weight: 400 !important;
	border-bottom: 1px dashed #eee !important;
}
div.NavContent.hlist { border-color: #067bad !important }
.globegris { background: transparent !important }
.mw-editsection-bracket, .references-small b, .mw-cite-backlink, .plainlinksneverexpand { display: none !important }
#floating_object { display: none }
table th, .navbox th, .navbox-title, .navbox-abovebelow { background-color: #e7e7e7 !important }
.navbox td, .navbox th, .nowraplinks td, .nowraplinks th { 
	font-size: 14px !important;
	font-weight: 300 !important;
}
.NavFrame {
	border: 0 !important;
	background: transparent !important;
	padding: 0 !important;
}
.NavHead {
	margin: 10px 0 !important;
	padding: 12px !important;
	font-size: 16px !important;
	font-weight: 700 !important;
	background: transparent !important;
}
.Boxmerge { border: 0 !important }
#coordinates { display: none !important }
#siteNotice, #centralNotice, #localNotice, #mw-fr-revisiontag, #mw-fr-reviewnotice { display: none !important }
sub, sup { line-height: .1em /* prevents sub/superscripts from throwing off line spacing */ }
/* title */
#firstHeading { padding: 10px 0 0 0 !important }
@media all and (max-width: 1000px) { #firstHeading { padding-top: 40px !important } }
div.hatnote { padding-left: 0 }
#column-one, #footer { display: none !important }
/* hide left and top panel */
#mw-panel {
	width: 0 !important;
	height: 0 !important;
}
#mw-head {
	height: 0;
	opacity: .5;
	border: 0 !important;
	width: calc(100% - 240px) !important;
	-webkit-transition-property: opacity !important;
	-moz-transition-property: opacity !important;
	-o-transition-property: opacity !important;
	-ms-transition-property: opacity !important;
	transition-property: opacity !important;
	-webkit-transition-duration: .5s !important;
	-moz-transition-duration: .5s !important;
	-o-transition-duration: .5s !important;
	-ms-transition-duration: .5s !important;
	transition-duration: .25s !important;
}
#mw-head:hover { opacity: 1 !important }
#mw-panel {
  padding: 0;
}
#mw-panel :not(#p-lang) {
	display: none !important;
	background-image: none !important;
	padding: .2em;
}
#mw-panel > #p-lang > div {
	position: fixed !important;
	left: 0;
	bottom: 0;
	width: 230px;
	height: 0 !important;
	margin-left: 0;
	background: #f1f1f1 !important;
}
#mw-panel > #p-lang > div, #mw-panel > #p-lang > div *:not(.after-portlet) { display: block !important }
li.interlanguage-link {
	padding-left: .9em !important;
	font-size: 14px !important;
	line-height: 1 !important;
}
.noprint { display: none!important }
#panel, #head, #page-base { display: none !important }
#content.mw-body {
	margin: 0;
	border: none !important;
	border-radius: 2px !important;
	padding: 0 1.6em 2em 1em !important;
	background: none;
	color: #444;
}
.wikitable {
	border: 1px solid #eee !important;
	background: #f9f9f9 !important;
	font-weight: 300 !important;
	font-size: .85em !important;
}
.wikitable td, .wikitable th { border: 1px solid #eee !important }
.mw-body-content p { margin-left: 1px !important }
.mw-body .mw-indicators { margin-top: 5em }
/* table of contents */
#toc {
	border: none !important;
	font-size: 12px !important;
	font-weight: 400;
/* make sidebar */
	position: fixed !important;
	display: inline-block;
	top: 0;
	bottom: 0;
	left: 0;
	width: 240px;
	overflow: auto;
	background: #f1f1f1 center center scroll !important;
}
#toc > ul {
	overflow-y: auto !important;
	width: 100%;
	height: auto;
	 margin: 0;
	background: #ededed;
	vertical-align: middle !important;
	display: table-cell;
	display: inline-block !important;
}
.toc ul ul { margin-left: 1em !important }
.toc a {
	display: block;
	padding: .25em 1em;
	line-height: 1 !important;
}
/* toc headers */
.toclevel-1 > a > .toctext {
	font-family: ${mainFont} !important;
	font-weight: 600;
	text-transform: uppercase;
	padding-top: .25em;
	display: inline-block;
}
.tocnumber { display: none !important }
.toc h2 { display: none !important }
div.toctitle { text-decoration: none !important }
.toctogglespan { display: none !important }
.editsection, .mw-editsection, .plainlinks.hlist.navbar { display: none !important }
#toc a:link {
	color: #666 !important;
	text-decoration: none !important;
}
#toc a:visited { color: #888 !important }
#toc a:hover {
	color: #333 !important;
	text-decoration: none !important;
	background: rgba(0, 0, 0, .05);
}
#toc a:active {
	color: #222 !important;
	outline: none;
}
.hlist #toc li::after {
	display: none;
}
/* hide protected lock */
div#protected-icon { display: none !important }

html.dark,
html.dark div,
html.dark *,
html.dark ::after,
html.dark ::before {
	background: #10100f !important;
	color: #b0b0b0 !important;
	text-shadow: none !important;
	box-shadow: none !important;
	border-color: #1c1c1b !important;
}
html.dark a { color: #69695d !important }
	html.dark a:hover { color: #1d91f0 }
html.dark img,
html.dark svg { transition: filter .25s }
	html.dark img:not(:hover),
	html.dark svg:not(:hover) { filter: opacity(70%) !important }
html.dark input,
html.dark table:not(.navbox-subgroup):not(.ambox) {
  background: transparent !important;
  border-color: #1c1c1b !important;
}
html.dark textarea { color: #69695d !important }
html.dark #toc, html.dark #toc *,
html.dark #mw-panel > #p-lang *,
html.dark #mw-panel > #p-lang > div { background: #111110 !important }
html.dark #simpleSearch,
html.dark .infobox,
html.dark .mbox-small,
html.dark .navbox,
html.dark .quotebox,
html.dark .referencetooltip li,
html.dark .thumb,
html.dark .toccolours { border-color: #1c1c1b !important }
html.dark .mwe-popups-extract[dir="ltr"]:after { background: linear-gradient(to right, transparent, #10100f 70%) !important }
html.dark .mwe-popups-extract[dir="rtl"]:after { background: linear-gradient(to left,  transparent, #10100f 70%) !important }
`);

document.addEventListener('DOMContentLoaded', function() {
  darkMode();

	var tabs = document.getElementById('p-views').getElementsByTagName('ul')[0];
	var talk = document.getElementById('ca-talk');
	tabs.appendChild(talk);
	talk.style.display = 'block';

	var foundcount = 0;
	plang = document.getElementById('p-lang');
	if (plang != null) {
		var langs = plang.querySelectorAll('div > ul > li');
		var first = langs[0];
		if (first != null) {
			var ul = first.parentNode;
			var found = [];
			for (var i = 0; i < langs.length; i++) {
				var lncn = langs[i].className;
				var l1 = lncn.replace(/^.*interwiki-(\S+).*$/, '$1');
				var ln = myLangs.indexOf(l1);
				if (ln > -1)
					found[ln] = langs[i];
			}
			for (var i = found.length - 1; i >= 0; i--){
				if (found[i]) {
					ul.insertBefore(found[i], first);
					first = found[i];
					foundcount++;
				}
			}
		}
		if (foundcount == 0 && plang) { 
			plang.parentNode.removeChild(plang);
		} else if (first != null) {
			while(ul.children.length > foundcount)
				ul.removeChild(ul.children[foundcount]);
		}
	}
	var plangBody = document.querySelector('#mw-panel > #p-lang > div');
	if (plangBody) plangBody.setAttribute('style', 'height: auto !important');
	var toc = document.querySelector('#toc > ul');
	if (toc) toc.setAttribute('style', 'margin: 0 0 '+ (6 + 25.2 * foundcount) +'px 0 !important');
	document.getElementById('p-namespaces').outerHTML = "";
  
  for (pref of ['mainFont', 'textFont', 'monoFont', 'myLangs'])
    if (!GM_getValue(pref)) GM_setValue(pref, eval(pref));
});

document.addEventListener('keydown', function(e) {
	if (e.altKey || e.ctrlKey || e.shiftKey) return;
	switch(e.key) {
		case 'b':
			if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') return;
			var toc = document.getElementById('toc');
			if (document.getElementById('content').style.marginLeft == '0px') {
				document.getElementById('content').style.marginLeft = '';
				if (toc) toc.style.display = '';
				if (plang) plang.style.display = '';
			} else {
				document.getElementById('content').style.marginLeft = '0px';
				if (toc) toc.style.display = 'none';
				if (plang) plang.style.display = 'none';
			}
			break;
		case 'F9':
			e.preventDefault();
			GM_setValue('darkMode', !GM_getValue('darkMode') || false);
			darkMode();
			break;
	}
});

function darkMode() {
	if (GM_getValue('darkMode')) document.documentElement.classList.add('dark');
	else document.documentElement.classList.remove('dark');
}

darkMode();