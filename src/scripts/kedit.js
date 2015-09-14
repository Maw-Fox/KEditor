/**
 * KEdit - Module
 * @author Kali@F-List.net
 */
/// <reference path="../../lib/vue.d.ts" />
/// <reference path="./interfaces.ts" />
/// <reference path="./classes.ts" />
var Editor;
(function (Editor) {
    var Stats;
    (function (Stats) {
        var characters;
        (function (characters) {
            characters.id = 'characters';
            characters.display = 'Characters';
            characters.onChange = function (val) {
                this.value = val.length;
                return this.value;
            };
            characters.value = characters.onChange(localStorage['input'] || '');
        })(characters = Stats.characters || (Stats.characters = {}));
        var words;
        (function (words) {
            words.id = 'words';
            words.display = 'Words';
            words.onChange = function (val) {
                this.value = val.split(/\b[a-zA-Z']+\b/g).length - 1;
                return this.value;
            };
            words.value = words.onChange(localStorage['input'] || '');
        })(words = Stats.words || (Stats.words = {}));
        var repeated;
        (function (repeated) {
            repeated.id = 'repeated';
            repeated.display = 'Repeated Words';
            repeated.onClick = function () {
                return;
            };
            repeated.onChange = function (val) {
                return 0;
            };
            repeated.value = repeated.onChange(localStorage['input'] || '');
        })(repeated = Stats.repeated || (Stats.repeated = {}));
        var timer;
        (function (timer) {
            timer.id = 'timer';
            timer.display = 'Timer';
            timer.value = "00:00:00";
            timer.onTick = function () {
                return;
            };
        })(timer = Stats.timer || (Stats.timer = {}));
    })(Stats = Editor.Stats || (Editor.Stats = {}));
})(Editor || (Editor = {}));
/**
 * KEdit - Classes
 * @author Kali@F-List.net
 */
/// <reference path="../../lib/vue.d.ts" />
/// <reference path="./interfaces.ts" />
/// <reference path="./module.ts" />
/**
 * KEdit - UI
 * @author Kali@F-List.net
 */
/// <reference path="../../lib/vue.d.ts" />
/// <reference path="module.ts" />
/// <reference path="interfaces.ts" />
var Editor;
(function (Editor) {
    function inputOnChange(val) {
        var event;
        localStorage['input'] = val;
        for (event in Editor.Stats) {
            if (Editor.Stats.hasOwnProperty(event) && Editor.Stats[event].onChange) {
                Editor.Stats[event].onChange(val);
            }
        }
        return;
    }
    var View;
    (function (View) {
        View.Main = new Vue({
            el: '#editor',
            data: {
                stats: Editor.Stats,
                input: localStorage['input'] || ''
            }
        });
        View.Main.$watch('input', inputOnChange);
    })(View = Editor.View || (Editor.View = {}));
})(Editor || (Editor = {}));
