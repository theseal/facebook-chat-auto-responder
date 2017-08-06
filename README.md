# facebook-auto-responder
Yet another Facebook Chat Auto Responder?

* Made to fit my needs.
* Node isn't strong in this one.
* Patches are welcome!

## Tested with
```
# node --version
v6.11.0
```

## Installation
* Clone this repo
* `npm install`
* `$EDITOR ./config`
* `./index.js login` to login and create your cookiejar.
* Enable and run with systemd `./systemd-enabler` or just run `./index.js` (preferable in screen or tmux)

# Caveats
* If you have Facebook set to require 2FA you need to enter a code at the first launch.
* Facebook web GUI will whine about unrecognised sessions, recommended to save the "browser" to get Facebook more quiet. (Session states stored in cookiejar.json)
