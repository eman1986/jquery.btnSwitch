/**
 * jQuery Switch Plugin
 * Version 1.0.0
 * 
 * Minimal Usage: $('#switch').btnSwitch();
 * Settings:
 * Theme: Select a theme (Button, Light, Swipe, iOS, Android)
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
        // Private Methods
        var buttonClickEvent = function(dataToggle, toggle) {
            if (toggle == settings.OnValue) {
                $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OnValue + '"]').removeClass('button-default').addClass('button-on');
                $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OffValue + '"]').removeClass('button-off').addClass('button-default');

                if ($.isFunction(settings.OnCallback)) {
                    settings.OnCallback(toggle);
                }
            } else {
                $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OnValue + '"]').removeClass('button-on').addClass('button-default');
                $('a[data-toggle="' + dataToggle + '"][data-title="' + settings.OffValue + '"]').removeClass('button-default').addClass('button-off');

                if ($.isFunction(settings.OffCallback)) {
                    settings.OffCallback(toggle);
                }
            }

            $('a[data-toggle="' + dataToggle + '"]').not('[data-title="' + toggle + '"]').removeClass('active').addClass('notActive');
            $('a[data-toggle="' + dataToggle + '"][data-title="' + toggle + '"]').removeClass('notActive').addClass('active');
        };

        var lightClickEvent = function (toggle, value) {
            if (!toggle) {
                $('#light-' + id).addClass('tgl-light-checked tgl-active');

                $(this).data('state', true);

                if ($.isFunction(settings.OnCallback)) {
                    settings.OnCallback(value);
                }
            } else {
                $('#light-' + id).removeClass('tgl-light-checked tgl-active');

                $(this).data('state', false);

                if ($.isFunction(settings.OffCallback)) {
                    settings.OffCallback(value);
                }
            }
        };

        var swipeClickEvent = function (dataToggle, toggle) {

        };

        var iosClickEvent = function (dataToggle, toggle) {

        };

        var androidClickEvent = function (dataToggle, toggle) {

        };

        var settings = $.extend({
            Theme: "Button",
            OnText: "On",
            OffText: "Off",
            OnValue: true,
            OffValue: false,
            OnCallback: null,
            OffCallback: null,
            ToggleState: false,
            ConfirmChanges: false,
            ConfirmText: 'Are you sure?',
            HiddenInputId: false
        }, options);

        return this.each(function() {
            var dataToggle = Math.floor((Math.random() * 1000000) + 1);
            var switchOnTpl, switchOffTpl;
            var btnSwitch = $(this);
            var id = this.id;

            switch(settings.Theme) {
                case 'Button':
                default:
                    switchOnTpl = '<div id="bsh-' + id + '">' +
                        '<a class="button-group button-on" data-toggle="' + dataToggle + '" data-title="' + settings.OnValue + '">' + settings.OnText + '</a>' +
                        '<a class="button-group button-default" data-toggle="' + dataToggle + '" data-title="' + settings.OffValue + '">' + settings.OffText + '</a>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + id + '">' +
                        '<a class="button-group button-default" data-toggle="' + dataToggle + '" data-title="' + settings.OnValue + '">' + settings.OnText + '</a>' +
                        '<a class="button-group button-off" data-toggle="' + dataToggle + '" data-title="' + settings.OffValue + '">' + settings.OffText + '</a>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    btnSwitch.html(settings.ToggleState == settings.OnValue ? switchOnTpl : switchOffTpl);

                    $('#bsh-' + id + ' a').on('click', function() {
                        var sel = $(this).data('title');

                        if (settings.ConfirmChanges) {
                            if (confirm(settings.ConfirmText)) {
                                if (settings.HiddenInputId != false) {
                                    $('#' + settings.HiddenInputId).prop('value', sel);
                                }

                                buttonClickEvent(dataToggle, sel);
                            }
                        } else {
                            if (settings.HiddenInputId != false) {
                                $('#' + settings.HiddenInputId).prop('value', sel);
                            }

                            buttonClickEvent(dataToggle, sel);
                        }
                    });
                    break;
                case 'Light':
                    switchOnTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-light tgl-light-checked tgl-active" id="light-' + id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="light-' + id +'" id="sw-light-'+ dataToggle + '" data-state="true"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-light" id="light-' + id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="light-' + id +'" id="sw-light-'+ dataToggle + '" data-state="false"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    btnSwitch.html(settings.ToggleState == settings.OnValue ? switchOnTpl : switchOffTpl);

                    $('#sw-light-' + dataToggle).on('click', function() {
                        var state = $(this).data('state');
                        var selValue = state ? settings.OnValue : settings.OffValue;

                        if (settings.ConfirmChanges) {
                            if (confirm(settings.ConfirmText)) {
                                if (settings.HiddenInputId != false) {
                                    $('#' + settings.HiddenInputId).prop('value', selValue);
                                }

                                lightClickEvent(state, selValue);
                            }
                        } else {
                            if (settings.HiddenInputId != false) {
                                $('#' + settings.HiddenInputId).prop('value', selValue);
                            }

                            lightClickEvent(dataToggle, selValue);
                        }
                    });
                    break;
                case 'Swipe':
                    switchOnTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-swipe tgl-swipe-checked tgl-active" id="swipe-' + id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="swipe-' + id +'" id="sw-swipe-'+ dataToggle + '" data-tg-off="' + settings.OffText + '" data-tg-on="' + settings.OnText + '" data-state="true"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-swipe" id="swipe-' + id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="swipe-' + id +'" id="sw-swipe-'+ dataToggle + '" data-tg-off="' + settings.OffText + '" data-tg-on="' + settings.OnText + '" data-state="false"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
                case 'iOS':
                    switchOnTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-ios tgl-ios-checked tgl-active" id="ios-' + id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="ios-' + id +'" id="sw-ios-'+ dataToggle + '" data-state="true"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-ios" id="ios-' + id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="ios-' + id +'" id="sw-ios-'+ dataToggle + '" data-state="false"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
                case 'Android':
                    switchOnTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-android tgl-android-checked tgl-active" id="android-' + id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="android-' + id +'" id="sw-android-'+ dataToggle + '" data-state="true"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + id + '">' +
                        '<input class="tgl tgl-android" id="android-' + id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="android-' + id +'" id="sw-android-'+ dataToggle + '" data-state="false"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
            }
        });
    };
}(jQuery));