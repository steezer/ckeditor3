::
:: Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
:: For licensing, see LICENSE.html or http://ckeditor.com/license
::

@ECHO OFF

CLS
ECHO.

:: rmdir /S /Q release

java -jar ckreleaser/ckreleaser.jar ckreleaser.release ../.. release "CKEditor 3.0 RC" ckeditor_3.0rc
