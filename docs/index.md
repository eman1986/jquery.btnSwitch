## jQuery Button Switch Plugin

A simple way to create button switches.

## Install

```bash
npm install jquery-btnswitch
```

**you must be using at least jQuery 2.0**

## Settings

- **Theme:** Select a theme (Button, Light, Swipe, iOS, Android)
- **OnText:** What to display for the "On" Button
- **OffText:** What to display for the "Off" Button
- **OnValue:** The value of the "On" Button
- **OffValue:** The value of the "Off" Button
- **OnCallback:** Callback on "On" selection
- **OffCallback:** Callback on "Off" selection
- **ToggleState:** Set the state of the switch toggle.
- **ConfirmChanges:** Determines if we should confirm any changes
- **ConfirmText:** What message we'll display to the user when ConfirmChanges is set to true
- **HiddenInputId:** the hidden field the plugin should populate or false to not populate a hidden field

## Examples

### Basic Implentation

```javascript
$('#switch').btnSwitch();
```
