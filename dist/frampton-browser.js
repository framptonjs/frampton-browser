(function() {
/*globals Frampton:true */
var define, require;
var global = this;

(function() {

  if (typeof Frampton === 'undefined') {
    throw new Error('Frampton is undefined');
  }

  define = Frampton.__loader.define;
  require = Frampton.__loader.require;

  if (typeof Frampton.DOM === 'undefined') {
    Frampton.__loader.registry['frampton-dom/scene'] = {
      deps : [],
      callback : function() {}
    };
  }

}());

define('frampton-browser', ['frampton/namespace', 'frampton-browser/mouse', 'frampton-browser/window', 'frampton-browser/keyboard/keyboard', 'frampton-browser/keyboard/utils/key_code', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/is_enter', 'frampton-browser/keyboard/utils/is_esc', 'frampton-browser/keyboard/utils/is_up', 'frampton-browser/keyboard/utils/is_down', 'frampton-browser/keyboard/utils/is_left', 'frampton-browser/keyboard/utils/is_right', 'frampton-browser/keyboard/utils/is_space', 'frampton-browser/keyboard/utils/is_ctrl', 'frampton-browser/keyboard/utils/is_shift'], function (_namespace, _mouse, _window, _keyboard, _key_code, _is_key, _is_enter, _is_esc, _is_up, _is_down, _is_left, _is_right, _is_space, _is_ctrl, _is_shift) {
  'use strict';

  var _namespace2 = _interopRequireDefault(_namespace);

  var _mouse2 = _interopRequireDefault(_mouse);

  var _window2 = _interopRequireDefault(_window);

  var _keyboard2 = _interopRequireDefault(_keyboard);

  var _key_code2 = _interopRequireDefault(_key_code);

  var _is_key2 = _interopRequireDefault(_is_key);

  var _is_enter2 = _interopRequireDefault(_is_enter);

  var _is_esc2 = _interopRequireDefault(_is_esc);

  var _is_up2 = _interopRequireDefault(_is_up);

  var _is_down2 = _interopRequireDefault(_is_down);

  var _is_left2 = _interopRequireDefault(_is_left);

  var _is_right2 = _interopRequireDefault(_is_right);

  var _is_space2 = _interopRequireDefault(_is_space);

  var _is_ctrl2 = _interopRequireDefault(_is_ctrl);

  var _is_shift2 = _interopRequireDefault(_is_shift);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name Browser
   * @namespace
   * @memberof Frampton
   */
  _namespace2.default.Browser = {};
  _namespace2.default.Browser.VERSION = '0.0.2';
  _namespace2.default.Browser.Mouse = _mouse2.default;
  _namespace2.default.Browser.Window = _window2.default;

  _namespace2.default.Browser.Keyboard = _keyboard2.default;
  _namespace2.default.Browser.Keyboard.Utils = {};
  _namespace2.default.Browser.Keyboard.Utils.keyCode = _key_code2.default;
  _namespace2.default.Browser.Keyboard.Utils.isKey = _is_key2.default;
  _namespace2.default.Browser.Keyboard.Utils.isEnter = _is_enter2.default;
  _namespace2.default.Browser.Keyboard.Utils.isEsc = _is_esc2.default;
  _namespace2.default.Browser.Keyboard.Utils.isUp = _is_up2.default;
  _namespace2.default.Browser.Keyboard.Utils.isDown = _is_down2.default;
  _namespace2.default.Browser.Keyboard.Utils.isLeft = _is_left2.default;
  _namespace2.default.Browser.Keyboard.Utils.isRight = _is_right2.default;
  _namespace2.default.Browser.Keyboard.Utils.isSpace = _is_space2.default;
  _namespace2.default.Browser.Keyboard.Utils.isCtrl = _is_ctrl2.default;
  _namespace2.default.Browser.Keyboard.Utils.isShift = _is_shift2.default;
});
define('frampton-browser/keyboard/keyboard', ['exports', 'frampton-utils/curry', 'frampton-list/contains', 'frampton-list/append', 'frampton-list/remove', 'frampton-events/on_event', 'frampton-signal/stepper', 'frampton-browser/keyboard/utils/key_map', 'frampton-browser/keyboard/utils/key_code'], function (exports, _curry, _contains, _append, _remove, _on_event, _stepper, _key_map, _key_code) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Keyboard;

  var _curry2 = _interopRequireDefault(_curry);

  var _contains2 = _interopRequireDefault(_contains);

  var _append2 = _interopRequireDefault(_append);

  var _remove2 = _interopRequireDefault(_remove);

  var _on_event2 = _interopRequireDefault(_on_event);

  var _stepper2 = _interopRequireDefault(_stepper);

  var _key_map2 = _interopRequireDefault(_key_map);

  var _key_code2 = _interopRequireDefault(_key_code);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //+ keyUp :: Signal DomEvent
  var keyUp = (0, _on_event2.default)('keyup');

  //+ keyDown :: Signal DomEvent
  var keyDown = (0, _on_event2.default)('keydown');

  //+ keyPress :: Signal DomEvent
  var keyPress = (0, _on_event2.default)('keypress');

  //+ keyUpCodes :: Signal KeyCode
  var keyUpCodes = keyUp.map(_key_code2.default);

  //+ keyDownCodes :: Signal KeyCode
  var keyDownCodes = keyDown.map(_key_code2.default);

  var addKey = function addKey(keyCode) {
    return function (arr) {
      if (!(0, _contains2.default)(arr, keyCode)) {
        return (0, _append2.default)(arr, keyCode);
      }
      return arr;
    };
  };

  var removeKey = function removeKey(keyCode) {
    return function (arr) {
      return (0, _remove2.default)(keyCode, arr);
    };
  };

  var update = function update(acc, fn) {
    return fn(acc);
  };

  //+ rawEvents :: Signal Function
  var rawEvents = keyUpCodes.map(removeKey).merge(keyDownCodes.map(addKey));

  //+ keysDown :: Signal []
  var keysDown = rawEvents.fold(update, []);

  //+ keyIsDown :: KeyCode -> Signal Boolean
  var keyIsDown = function keyIsDown(keyCode) {
    return keysDown.map(function (arr) {
      return (0, _contains2.default)(arr, keyCode);
    });
  };

  //+ direction :: KeyCode -> [KeyCode] -> Boolean
  var direction = (0, _curry2.default)(function (keyCode, arr) {
    return (0, _contains2.default)(arr, keyCode) ? 1 : 0;
  });

  //+ isUp :: [KeyCode] -> Boolean
  var isUp = direction(_key_map2.default.UP);

  //+ isDown :: [KeyCode] -> Boolean
  var isDown = direction(_key_map2.default.DOWN);

  //+ isRight :: [KeyCode] -> Boolean
  var isRight = direction(_key_map2.default.RIGHT);

  //+ isLeft :: [KeyCode] -> Boolean
  var isLeft = direction(_key_map2.default.LEFT);

  //+ arrows :: Signal [horizontal, vertical]
  var arrows = keysDown.map(function (arr) {
    return [isRight(arr) - isLeft(arr), isUp(arr) - isDown(arr)];
  });

  var defaultKeyboard = {
    downs: keyDown,
    ups: keyUp,
    presses: keyPress,
    codes: keyUpCodes,
    arrows: (0, _stepper2.default)([0, 0], arrows),
    shift: (0, _stepper2.default)(false, keyIsDown(_key_map2.default.SHIFT)),
    ctrl: (0, _stepper2.default)(false, keyIsDown(_key_map2.default.CTRL)),
    escape: (0, _stepper2.default)(false, keyIsDown(_key_map2.default.ESC)),
    enter: (0, _stepper2.default)(false, keyIsDown(_key_map2.default.ENTER)),
    space: (0, _stepper2.default)(false, keyIsDown(_key_map2.default.SPACE))
  };

  function Keyboard() {
    return defaultKeyboard;
  }
});
define('frampton-browser/keyboard/utils/is_ctrl', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.CTRL);
});
define('frampton-browser/keyboard/utils/is_down', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.DOWN);
});
define('frampton-browser/keyboard/utils/is_enter', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.ENTER);
});
define('frampton-browser/keyboard/utils/is_esc', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.ESC);
});
define('frampton-browser/keyboard/utils/is_key', ['exports', 'frampton-utils/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _curry2 = _interopRequireDefault(_curry);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _curry2.default)(function is_key(key, keyCode) {
    return key === keyCode;
  });
});
define('frampton-browser/keyboard/utils/is_left', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.LEFT);
});
define('frampton-browser/keyboard/utils/is_right', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.RIGHT);
});
define('frampton-browser/keyboard/utils/is_shift', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.SHIFT);
});
define('frampton-browser/keyboard/utils/is_space', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.SPACE);
});
define('frampton-browser/keyboard/utils/is_up', ['exports', 'frampton-browser/keyboard/utils/is_key', 'frampton-browser/keyboard/utils/key_map'], function (exports, _is_key, _key_map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_key2 = _interopRequireDefault(_is_key);

  var _key_map2 = _interopRequireDefault(_key_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_key2.default)(_key_map2.default.UP);
});
define('frampton-browser/keyboard/utils/key_code', ['exports', 'frampton-object/get'], function (exports, _get) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _get2 = _interopRequireDefault(_get);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _get2.default)('keyCode');
});
define("frampton-browser/keyboard/utils/key_map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    CTRL: 17,
    SHIFT: 16,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
  };
});
define('frampton-browser/mouse', ['exports', 'frampton-signal/stepper', 'frampton-events/on_event', 'frampton-events/contains', 'frampton-events/get_position', 'frampton-events/get_position_relative'], function (exports, _stepper, _on_event, _contains, _get_position, _get_position_relative) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Mouse;

  var _stepper2 = _interopRequireDefault(_stepper);

  var _on_event2 = _interopRequireDefault(_on_event);

  var _contains2 = _interopRequireDefault(_contains);

  var _get_position2 = _interopRequireDefault(_get_position);

  var _get_position_relative2 = _interopRequireDefault(_get_position_relative);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var clicks = (0, _on_event2.default)('click');
  var downs = (0, _on_event2.default)('mousedown');
  var ups = (0, _on_event2.default)('mouseup');
  var moves = (0, _on_event2.default)('mousemove');
  var isDown = (0, _stepper2.default)(false, downs.map(true).merge(ups.map(false)));

  var defaultMouse = { clicks: clicks,
    downs: downs,
    ups: ups,
    position: (0, _stepper2.default)([0, 0], moves.map(_get_position2.default)),
    isDown: isDown
  };

  /**
   * @name Mouse
   * @memberof Frampton
   * @class
   */
  function Mouse(element) {
    if (!element) {
      return defaultMouse;
    } else {
      return {
        clicks: clicks.filter((0, _contains2.default)(element)),
        downs: downs.filter((0, _contains2.default)(element)),
        ups: ups.filter((0, _contains2.default)(element)),
        position: (0, _stepper2.default)([0, 0], moves.filter((0, _contains2.default)(element)).map((0, _get_position_relative2.default)(element))),
        isDown: isDown
      };
    }
  }
});
define('frampton-browser/window', ['exports', 'frampton-signal/stepper', 'frampton-events/on_event', 'frampton-object/get', 'frampton-utils/is_something'], function (exports, _stepper, _on_event, _get, _is_something) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Window;

  var _stepper2 = _interopRequireDefault(_stepper);

  var _on_event2 = _interopRequireDefault(_on_event);

  var _get2 = _interopRequireDefault(_get);

  var _is_something2 = _interopRequireDefault(_is_something);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var element = null;
  var resize = (0, _on_event2.default)('resize', window);
  var dimensions = (0, _stepper2.default)([getWidth(), getHeight()], resize.map(update));
  var width = (0, _stepper2.default)(getWidth(), dimensions.map((0, _get2.default)(0)));
  var height = (0, _stepper2.default)(getHeight(), dimensions.map((0, _get2.default)(1)));

  function getWidth() {
    return (0, _is_something2.default)(element) ? element.clientWidth : window.innerWidth;
  }

  function getHeight() {
    return (0, _is_something2.default)(element) ? element.clientHeight : window.innerHeight;
  }

  function update() {
    var w = getWidth();
    var h = getHeight();
    return [w, h];
  }

  /**
   * @typedef Window
   * @type Object
   * @property {Frampton.Signal} dimensions - A Signal of the window dimensions
   * @property {Frampton.Signal} width      - A Signal of with window width
   * @property {Frampton.Signal} height     - A Signal of the window height
   * @property {Frampton.Signal} resize     - A Signal of window resize events
   */

  /**
   * @name Window
   * @method
   * @namespace
   * @memberof Frampton
   * @param {Object} [element] - DomNode to act as applicaton window
   * @returns {Window}
   */
  function Window(element) {
    element = element;
    return {
      dimensions: dimensions,
      width: width,
      height: height,
      resize: resize
    };
  }
});
require("frampton-browser");
})();
