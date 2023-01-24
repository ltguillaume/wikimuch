// ==UserScript==
// @name        WikiMuch
// @namespace   https://greasyfork.org
// @description Clean and minimal theme for new Wikipedia. Press F8 for dark mode.
// @author      Guillaume
// @version     3.0.0
// @downloadURL https://codeberg.org/ltGuillaume/WikiMuch/raw/master/wikimuch.user.js
// @icon        https://codeberg.org/ltGuillaume/WikiMuch/raw/master/logo.png
// @match       https://*.wikipedia.org/*
// @homepageURL https://greasyfork.org/scripts/31127
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at      document-start
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function() {
	darkMode();
	GM_addStyle(`

/* Light theme */
:root {
	--nav-bg:        #f1f1f1;
	--nav-text:      #333;
	--link-text:     #067bad;
	--main-bg:       #fafafa;
	--main-text:     #444;
	--main-border:   #bbb;
	--box-bg:        #f7f7f7;
	--box-bg2:       #fafafa;
	--box-head-bg:   #e7e7e7;
	--box-text:      #333;
	--box-border:    #e7e7e7;
	--navbox-border: #fdfdfd;
}

/* Dark theme */
:root.dark {
	--nav-bg:        #111110;
	--nav-text:      #1d1d1c;
	--link-text:     #6b6b5f;
	--main-bg:       #10100f;
	--main-text:     #999;
	--main-border:   #1c1c1b;
	--box-bg:        #111110;
	--box-head-bg:   #1c1c1b;
	--box-text:      #888;
	--box-border:    #1c1c1b;
	--navbox-border: #111110;
}

/* Main page container */
body, .mw-page-container {
	background: var(--main-bg);
	color: var(--main-text);
}

/* Links */
a,
a:hover,
.vector-feature-page-tools-disabled .vector-main-menu-group .vector-menu-content li a,
.vector-feature-page-tools-disabled .vector-main-menu-action-item .vector-menu-content li a,
.skin-vector:not(.skin-vector-legacy) .wb-langlinks-link a,
.vector-toc .vector-toc-link,
.vector-menu-tabs .mw-list-item a,
.vector-pinnable-header-toggle-button,
.vector-pinnable-header-toggle-button:hover,
.vector-menu-tabs .mw-list-item a,
.mw-parser-output a.extiw, .mw-parser-output a.external {
	color: var(--link-text) !important;
}

/* Header, main menu, user menu, TOC */
.mw-header,
.vector-feature-page-tools-disabled .vector-main-menu,
.vector-menu-content,
#mw-panel-toc,
#vector-toc-pinned-container,
.vector-toc,
.vector-toc .vector-toc-list-item-active > .vector-toc-link,
.vector-toc .vector-toc-level-1-active:not(.vector-toc-list-item-expanded) > .vector-toc-link,
.vector-toc .vector-toc-list-item-active.vector-toc-level-1-active > .vector-toc-link,
.navbox-title,
.mw-parser-output .tmbox,
.catlinks {
	color: var(--nav-text);
	background: var(--nav-bg) !important;
	border-color: var(--main-border) !important;
}

/* Main menu, TOC */
.vector-feature-page-tools-disabled .vector-main-menu,
.vector-feature-page-tools-disabled #vector-toc-pinned-container .vector-toc {
	width: 100%;
}

body.vector-toc-pinned .mw-ui-icon-flush-left,
.vector-feature-page-tools-disabled .vector-main-menu {
	margin-left: 0 !important;
}

/* Pinned Table of Contents */
body.vector-toc-pinned .mw-body-header {
	margin-top: 1.2rem;
}

.vector-feature-page-tools-disabled #vector-toc-pinned-container .vector-toc,
.vector-feature-page-tools-disabled #vector-toc-pinned-container .vector-toc::after {
	margin-left: 0;
}

/* Main menu button, language chooser */
.mw-ui-button.mw-ui-icon-element:not(.mw-ui-icon-with-label-desktop),
input[type="checkbox"]:hover + .mw-ui-button.mw-ui-progressive.mw-ui-quiet,
.mw-ui-button.mw-ui-progressive.mw-ui-quiet,
.mw-ui-button.mw-ui-progressive.mw-ui-quiet:hover,
.mw-ui-button.mw-ui-progressive.mw-ui-quiet:focus,
.uls-language-block a {
	background: transparent;
	color: var(--link-text);
	border: none;
	box-shadow: none;
	outline: none;
}

/* Language chooser drop-down icon color when clicked */
.vector-page-titlebar .mw-portlet-lang .vector-menu-heading.mw-ui-progressive.mw-ui-quiet::after {
	background-image: url(/w/skins/Vector/resources/common/images/arrow-down-progressive.svg?f0b59) !important;
}

/* Language chooser icon, external links icon */
.mw-ui-icon-wikimedia-language-progressive::before,
.mw-parser-output a.external {
	background: none;
}

/* Tabs */
.vector-menu-tabs .mw-list-item.selected a,
.vector-menu-tabs .mw-list-item.selected a:visited {
	color: var(--main-text);
}

/* Main text, tables/infoboxes */
#content.mw-body,
.client-js .vector-below-page-title .vector-page-titlebar-toc {
	background-color: var(--main-bg) !important;
	color: var(--main-text) !important;
	border-color: var(--main-border) !important;
}

/* Headers */
h1, h2, h3, h4, h5, h6 {
	color: var(--main-text);
}

/* Tables, boxes (.mw-parser-output > ...) */
.infobox,
.help-box,
.navbox,
.navbox-subgroup,
.side-box,
.wikitable,
.thumbinner,
.module-shortcutboxplain {
	background-color: var(--box-bg) !important;
	color: var(--box-text) !important;
	border-color: var(--box-border) !important;
}

.wikitable *,
.navbox-even,
.navbox-abovebelow,
.navbox-image,
.navbox-list,
.mw-parser-output tr + tr > .navbox-group {
	border-color: var(--navbox-border) !important;
}

.wikitable th,
.infobox th.infobox-above,
.infobox th.infobox-header,
.navbox .navbox-group {
	background-color: var(--box-head-bg) !important;
}

/* Account links */
.vector-user-links {
	margin-right: 2em;
}

/* Language/edit/footer icons */
img.noprint,
.vector-toc-pinned #vector-toc-pinned-container .vector-toc::after,
#footer-icons {
	display: none;
}

	`);
});

document.addEventListener('keydown', function(e) {
	if (e.key == 'F8') {
		e.preventDefault();
		GM_setValue('darkMode', !GM_getValue('darkMode') || false);
		darkMode();
	}
});

function darkMode() {
	if (GM_getValue('darkMode'))
		document.documentElement.classList.add('dark');
	else
		document.documentElement.classList.remove('dark');
}