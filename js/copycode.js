/**!
 * CopyCode JS v1.0.0
 *
 * Simple and Lightweight Slideshow Gallery
 *
 * @copyright Copyright 2024 Rayiumir Limited.
 * @author    Raymond Baghumian.
 * @link      https://github.com/Rayiumir/copycode-js
 *
 */

jQuery(document).ready(function ($) {
    var copyid = 0;

    $('pre').each(function () {
        copyid++;
        $(this).attr('data-copyid', copyid).wrap('<div class="precode"/>');
        $('<button class="copy"><i class="fa-duotone fa-copy"></i></button>').insertAfter($(this)).data('copytarget', copyid);
    });

    $('body').on('click', '.copy', function (ev) {
        ev.preventDefault();

        var $copyButton = $(this);

        $pre = $(document).find('pre[data-copyid=' + $copyButton.data('copytarget') + ']');
        if ($pre.length) {
            var textArea = document.createElement("textarea");

            // Place in top-left corner of screen regardless of scroll position.
            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;

            // Ensure it has a small width and height. Setting to 1px / 1em
            // doesn't work as this gives a negative w/h on some browsers.
            textArea.style.width = '2em';
            textArea.style.height = '2em';

            // We don't need padding, reducing the size if it does flash render.
            textArea.style.padding = 0;

            // Clean up any borders.
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';

            // Avoid flash of white box if rendered for any reason.
            textArea.style.background = 'transparent';

            //Set value to text to be copied
            textArea.value = $pre.text();

            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                $copyButton.html('<i class="fa-duotone fa-check" aria-hidden="true"></i>').prop('disabled', true);
            } catch (err) {
                $copyButton.text('FAILED: Could not copy').prop('disabled', true);
            }
            setTimeout(function () {
                $copyButton.html('<i class="fa-duotone fa-copy"></i>').prop('disabled', false);
            }, 3000);
        }
    });
});