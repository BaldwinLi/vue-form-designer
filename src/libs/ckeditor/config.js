/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	
	config.extraPlugins = 'wordcount,notification';
	
	config.wordcount = {

		    // Whether or not you want to show the Paragraphs Count
		    showParagraphs: true,

		    // Whether or not you want to show the Word Count
		    showWordCount: false,

		    // Whether or not you want to show the Char Count
		    showCharCount: true,

		    // Whether or not you want to count Spaces as Chars
		    countSpacesAsChars: false,

		    // Whether or not to include Html chars in the Char Count
		    countHTML: false,
		    
		    // Maximum allowed Word Count, -1 is default for unlimited
		    maxWordCount: 10,

		    // Maximum allowed Char Count, -1 is default for unlimited
		    maxCharCount: 1500,

		    // Add filter to add or remove element before counting (see CKEDITOR.htmlParser.filter), Default value : null (no filter)
		    filter: new CKEDITOR.htmlParser.filter({
		        elements: {
		            div: function( element ) {
		                if(element.attributes.class == 'mediaembed') {
		                    return false;
		                }
		            }
		        }
		    })
	};
};
