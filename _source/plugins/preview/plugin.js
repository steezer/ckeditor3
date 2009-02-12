/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @file Preview plugin.
 */

(function()
{
	var previewCmd =
	{
		exec : function( editor )
		{
			var sHTML,
				isCustomDomain = CKEDITOR.env.ie && document.domain != window.location.hostname;
			if ( editor.config.fullPage )
				sHTML = editor.getData();
			else
			{
				var bodyHtml = '<body ',
					body = CKEDITOR.document.getBody(),
					baseTag = ( editor.config.baseHref.length > 0 ) ? '<base href="' + editor.config.baseHref + '" _cktemp="true"></base>' : '';

				if ( body.getAttribute( 'id' ) )
					bodyHtml += 'id="' + body.getAttribute( 'id' ) + '" ';
				if ( body.getAttribute( 'class' ) )
					bodyHtml += 'class="' + body.getAttribute( 'class' ) + '" ';
				bodyHtml += '>';

				sHTML =
					editor.config.docType +
					'<html dir="' + editor.config.contentsLangDirection + '">' +
					'<head>' +
					baseTag +
					'<title>' + editor.lang.preview + '</title>' +
					'<link href="' + editor.config.contentsCss + '" type="text/css" rel="stylesheet" _cktemp="true"/>' +
					'</head>' + bodyHtml +
					editor.getData() +
					'</body></html>';
			}

			var iWidth	= 640,	// 800 * 0.8,
				iHeight	= 420,	// 600 * 0.7,
				iLeft	= 80;	// (800 - 0.8 * 800) /2 = 800 * 0.1.
			try
			{
				iWidth = Math.Round( screen.width * 0.8 );
				iHeight = Math.Round( screen.height * 0.7 );
				iLeft = Math.Round( screen.width * 0.1 );
			}
			catch ( e ){}

			var sOpenUrl = '';
			if ( isCustomDomain )
			{
				window._cke_htmlToLoad = sHTML;
				sOpenUrl = 'javascript:void( (function(){' +
					'document.open();' +
					'document.domain="' + document.domain + '";' +
					'document.write( window.opener._cke_htmlToLoad );' +
					'document.close();' +
					'window.opener._cke_htmlToLoad = null;' +
					'})() )';
			}

			var oWindow = window.open( sOpenUrl, null, 'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=' + 
				iWidth + ',height=' + iHeight + ',left=' + iLeft );

			if ( !isCustomDomain )
			{
				oWindow.document.write( sHTML );
				oWindow.document.close();
			}
		}
	};

	var pluginName = 'preview';

	// Register a plugin named "preview".
	CKEDITOR.plugins.add( pluginName,
	{
		init : function( editor, pluginPath )
		{
			editor.addCommand( pluginName, previewCmd );
			editor.ui.addButton( 'Preview',
				{
					label : editor.lang.preview,
					command : pluginName
				});
		}
	});
})();
