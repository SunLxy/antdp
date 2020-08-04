'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _default;

var allIcons = _interopRequireWildcard(require('@ant-design/icons'));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function toHump(name) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

function formatter(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  var icons = [];
  (data || []).forEach(function () {
    var item =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : {
            path: '/',
          };

    if (item.icon) {
      var icon = item.icon;
      var v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));

      if (allIcons[icon]) {
        icons.push(icon);
      }

      if (allIcons[''.concat(v4IconName, 'Outlined')]) {
        icons.push(''.concat(v4IconName, 'Outlined'));
      } else if (allIcons[''.concat(v4IconName, 'Filled')]) {
        icons.push(''.concat(v4IconName, 'Filled'));
      } else if (allIcons[''.concat(v4IconName, 'TwoTone')]) {
        icons.push(''.concat(v4IconName, 'TwoTone'));
      }
    }

    if (item.routes || item.children) {
      icons = icons.concat(formatter(item.routes || item.children));
    }
  });
  return Array.from(new Set(icons));
}

function _default(api) {
  api.onGenerateFiles(function () {
    var userConfig = api.userConfig;
    var icons = formatter(userConfig.routes);
    var iconsString = icons.map(function (iconName) {
      return 'import '
        .concat(iconName, " from '@ant-design/icons/")
        .concat(iconName, "'");
    });
    api.writeTmpFile({
      path: './plugin-antd-icon/icons.ts',
      content: '\n'
        .concat(iconsString.join(';\n'), '\n\nexport default {\n  ')
        .concat(icons.join(',\n'), '\n}\n    '),
    });
  });
  api.addRuntimePlugin(function () {
    return require.resolve('./app.js');
  });
}
