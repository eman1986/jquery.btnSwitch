/**
 * jQuery Switch Plugin
 * Version 1.0.0
 * 
 * Minimal Usage: $('#switch').btnSwitch();
 * Settings:
 * OnCssClass: The Css Class that we'll use when switch in the "On" position
 * OffCssClass: The Css Class that we'll use when switch in the "Off" position
 * DefaultButtonCssClass: The Css Class that we'll use when switch is not used
 * OnText: What to display for the "On" Button
 * OffText: What to display for the "Off" Button
 * OnValue: The value of the "On" Button
 * OffValue: The value of the "Off" Button
 * OnCallback: Callback on "On" selection
 * OffCallback: Callback on "Off" selection
 * ToggleState: Set the state of the switch toggle.
 * ConfirmChanges: Determines if we should confirm any changes
 * ConfirmText: What message we'll display to the user when ConfirmChanges is set to true
 * HiddenInputId: the hidden field the plugin should populate or false to not populate a hidden field
 */

if (typeof jQuery === "undefined") {
    alert("jQuery Switch Button requires jQuery");
    throw new Error("jQuery Switch Button requires jQuery");
}

(function($) {
    $.fn.btnSwitch = function(options) {
        var settings = $.extend({
            OnCssClass: "btn-success",
            OffCssClass: "btn-danger",
            DefaultButtonCssClass: "btn-default",
            OnText: "On",
            OffText: "Off",
            OnValue: true,
            OffValue: false,
            OnCallback: null,
            OffCallback: null,
            ToggleState: true,
            ConfirmChanges: false,
            ConfirmText: 'Are you sure?',
            HiddenInputId: false
        }, options);

        return this.each(function() {
            var dataToggle = Math.floor((Math.random() * 1000000) + 1);

            var switchOnTpl = '<div id="bsh-' + this.id + '" class="btn-group">' +
                        '<a class="btn ' + settings.OnCssClass + ' btn-sm active" data-toggle="' + dataToggle + '" data-title="' + settings.OnValue + '">' + settings.OnText + '</a>' +
                        '<a class="btn ' + settings.DefaultButtonCssClass + ' btn-sm notActive" data-toggle="' + dataToggle + '" data-title="' + settings.OffValue + '">' + settings.OffText + '</a>' +
                    '</div>';

            var switchOffTpl = '<div id="bsh-' + this.id + '" class="btn-group">' +
                        '<a class="btn ' + settings.DefaultButtonCssClass + ' btn-sm notActive" data-toggle="' + dataToggle + '" data-title="' + settings.OnValue + '">' + settings.OnText + '</a>' +
                        '<a class="btn ' + settings.OffCssClass + ' btn-sm active" data-toggle="' + dataToggle + '" data-title="' + settings.OffValue + '">' + settings.OffText + '</a>' +
                    '</div>';

            var btnSwitch = $(this);

            btnSwitch.html(settings.ToggleState == settings.OnValue ? switchOnTpl : switchOffTpl);

            $('#bsh-' + this.id + ' a').on('click', function() {
                var sel = $(this).data('title');

                if (settings.ConfirmChanges) {
                    if (confirm(settings.ConfirmText)) {
                        if (settings.HiddenInputId != false) {
                            $('#' + settings.HiddenInputId).prop('value', sel);
                        }

                        if (sel == settings.OnValue) {
                            $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OnValue + '"]').removeClass(settings.DefaultButtonCssClass).addClass(settings.OnCssClass);
                            $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OffValue + '"]').removeClass(settings.OffCssClass).addClass(settings.DefaultButtonCssClass);

                            if ($.isFunction(settings.OnCallback)) {
                                settings.OnCallback(sel);
                            }
                        } else {
                            $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OnValue + '"]').removeClass(settings.OnCssClass).addClass(settings.DefaultButtonCssClass);
                            $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OffValue + '"]').removeClass(settings.DefaultButtonCssClass).addClass(settings.OffCssClass);

                            if ($.isFunction(settings.OffCallback)) {
                                settings.OffCallback(sel);
                            }
                        }

                        $('a[data-toggle="' + dataToggle + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
                        $('a[data-toggle="' + dataToggle + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
                    }
                } else {
                    if (settings.HiddenInputId != false) {
                        $('#' + settings.HiddenInputId).prop('value', sel);
                    }

                    if (sel == settings.OnValue) {
                        $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OnValue + '"]').removeClass(settings.DefaultButtonCssClass).addClass(settings.OnCssClass);
                        $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OffValue + '"]').removeClass(settings.OffCssClass).addClass(settings.DefaultButtonCssClass);

                        if ($.isFunction(settings.OnCallback)) {
                            settings.OnCallback(sel);
                        }
                    } else {
                        $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OnValue + '"]').removeClass(settings.OnCssClass).addClass(settings.DefaultButtonCssClass);
                        $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OffValue + '"]').removeClass(settings.DefaultButtonCssClass).addClass(settings.OffCssClass);

                        if ($.isFunction(settings.OffCallback)) {
                            settings.OffCallback(sel);
                        }
                    }

                    $('a[data-toggle="' + dataToggle + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
                    $('a[data-toggle="' + dataToggle + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
                }
            });
        });
    };
}(jQuery));