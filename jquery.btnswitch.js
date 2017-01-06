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
        var settings = $.extend({
            Theme: "Button",
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
            var switchOnTpl, switchOffTpl;

            switch(settings.Theme) {
                case 'Button':
                default:
                    switchOnTpl = '<div id="bsh-' + this.id + '">' +
                        '<a class="button-group button-on" data-toggle="' + dataToggle + '" data-title="' + settings.OnValue + '">' + settings.OnText + '</a>' +
                        '<a class="button-group button-default" data-toggle="' + dataToggle + '" data-title="' + settings.OffValue + '">' + settings.OffText + '</a>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + this.id + '">' +
                        '<a class="button-group button-default" data-toggle="' + dataToggle + '" data-title="' + settings.OnValue + '">' + settings.OnText + '</a>' +
                        '<a class="button-group button-off" data-toggle="' + dataToggle + '" data-title="' + settings.OffValue + '">' + settings.OffText + '</a>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
                case 'Light':
                    switchOnTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-light" id="light-' + this.id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="light-' + this.id +'"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-light" id="light-' + this.id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="light-' + this.id +'"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
                case 'Swipe':
                    switchOnTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-swipe" id="swipe-' + this.id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="swipe-' + this.id +'" data-tg-off="' + settings.OffText + '" data-tg-on="' + settings.OnText + '"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-swipe" id="swipe-' + this.id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="swipe-' + this.id +'" data-tg-off="' + settings.OffText + '" data-tg-on="' + settings.OnText + '"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
                case 'iOS':
                    switchOnTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-ios" id="ios-' + this.id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="ios-' + this.id +'"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-ios" id="ios-' + this.id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="ios-' + this.id +'"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
                case 'Android':
                    switchOnTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-ios" id="ios-' + this.id +'" type="checkbox" checked>' +
                        '<label class="tgl-btn" for="ios-' + this.id +'"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';

                    switchOffTpl = '<div id="bsh-' + this.id + '">' +
                        '<input class="tgl tgl-android" id="android-' + this.id +'" type="checkbox">' +
                        '<label class="tgl-btn" for="android-' + this.id +'"></label>' +
                        '</div>' +
                        '<div style="clear:both"></div>';
                    break;
            }

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