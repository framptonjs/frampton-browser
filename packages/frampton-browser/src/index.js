import Frampton from 'frampton/namespace';
import Mouse from 'frampton-browser/mouse';
import Window from 'frampton-browser/window';
import Keyboard from 'frampton-browser/keyboard/keyboard';
import keyCode from 'frampton-browser/keyboard/utils/key_code';
import isKey from 'frampton-browser/keyboard/utils/is_key';
import isEnter from 'frampton-browser/keyboard/utils/is_enter';
import isEsc from 'frampton-browser/keyboard/utils/is_esc';
import isUp from 'frampton-browser/keyboard/utils/is_up';
import isDown from 'frampton-browser/keyboard/utils/is_down';
import isLeft from 'frampton-browser/keyboard/utils/is_left';
import isRight from 'frampton-browser/keyboard/utils/is_right';
import isSpace from 'frampton-browser/keyboard/utils/is_space';
import isCtrl from 'frampton-browser/keyboard/utils/is_ctrl';
import isShift from 'frampton-browser/keyboard/utils/is_shift';


/**
 * @name Browser
 * @namespace
 * @memberof Frampton
 */
Frampton.Browser          = {};
Frampton.Browser.VERSION  = '{-- VERSION_PLACEHOLDER --}';
Frampton.Browser.Mouse    = Mouse;
Frampton.Browser.Window   = Window;

Frampton.Browser.Keyboard               = Keyboard;
Frampton.Browser.Keyboard.Utils         = {};
Frampton.Browser.Keyboard.Utils.keyCode = keyCode;
Frampton.Browser.Keyboard.Utils.isKey   = isKey;
Frampton.Browser.Keyboard.Utils.isEnter = isEnter;
Frampton.Browser.Keyboard.Utils.isEsc   = isEsc;
Frampton.Browser.Keyboard.Utils.isUp    = isUp;
Frampton.Browser.Keyboard.Utils.isDown  = isDown;
Frampton.Browser.Keyboard.Utils.isLeft  = isLeft;
Frampton.Browser.Keyboard.Utils.isRight = isRight;
Frampton.Browser.Keyboard.Utils.isSpace = isSpace;
Frampton.Browser.Keyboard.Utils.isCtrl  = isCtrl;
Frampton.Browser.Keyboard.Utils.isShift = isShift;
