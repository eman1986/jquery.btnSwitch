type btnSwitchThemeType = 'Button'|'Light'|'Swipe'|'iOS'|'Android';

interface btnswitch {
    /**
     * Select a theme (Button, Light, Swipe, iOS, Android)
     * @default Button
     */
    Theme?: btnSwitchThemeType;
    /**
     * What to display for the "On" Button
     * @default On
     */
    OnText?: string;
    /**
     * What to display for the "Off" Button
     * @default Off
     */
    OffText?: string;
    /**
     * The value of the "On" Button
     * @default true
     */
    OnValue?: string;
    /**
     * The value of the "Off" Button
     * @default false
     */
    OffValue?: string;
    /**
     * Callback on "On" selection
     * @default null
     */
    OnCallback?: Function;
    /**
     * Callback on "Off" selection
     * @default null
     */
    OffCallback?: Function;
    /**
     * Set the state of the switch toggle
     * @default false
     */
    ToggleState?: boolean;
    /**
     * Determines if we should confirm any changes
     * @default false
     */
    ConfirmChanges?: boolean;
    /**
     * What message we'll display to the user when ConfirmChanges is set to true
     * @default Are you sure?
     */
    ConfirmText?: string;
    /**
     * the hidden field the plugin should populate or false to not populate a hidden field
     * @default false
     */
    HiddenInputId?: string | boolean
}