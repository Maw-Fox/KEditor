/**
 * KEdit - Module
 * @author Kali@F-List.net
 */

/// <reference path="../../lib/vue.d.ts" />
/// <reference path="./interfaces.ts" />
/// <reference path="./classes.ts" />

module Editor {
    export module Stats {
        export module characters {
            export var id = 'characters';
            export var display = 'Characters';

            export var onChange = function(val: string): number {
                value = val.length;
                return value;
            };

            export var value = onChange(localStorage['input'] || '');
        }

        export module words {
            export var id = 'words';
            export var display = 'Words';

            export var onChange = function(val: string): number {
                value = val.split(/\b[a-zA-Z']+\b/g).length - 1;
                return value;
            };

            export var value = onChange(localStorage['input'] || '');
        }
        
        export module repeated {
            var _value: {};
            var _exclude = ["a","being","an","then","was","could","would","should","did","least","just","than","come","all","be","i","the","had","another","any","anybody","anyone","anything","both","each","other","either","everybody","everyone","everything","few","he","her","hers","herself","him","himself","his","I","it","its","itself","many","me","mine","more","most","much","myself","neither","no","one","nobody","none","nothing","one","one","another","other","others","ours","ourselves","several","she","some","somebody","someone","something","that","their","theirs","them","themselves","these","they","this","those","us","we","what","whatever","which","whichever","who","whoever","whom","whomever","whose","you","your","yours","yourself","yourselves","abaft","aboard","about","above","according","across","after","against","ahead","along","with","amid","among","apart","from","around","as","far","well","at","back","because","before","behind","below","beneath","beside","between","beyond","but","concerning","contrary","despite","down","during","except","excepting","for","from","in","addition","back","front","place","regard","spite","view","inside","instead","into","like","near","of","off","on","account","out","outside","over","past","rather","regarding","since","through","throughout","till","to","together","with","toward","towards","under","underneath","until","unto","up","upon","versus","via","with","regard","within","without","worth","after","although","and","as","far","how","long","soon","though","well","because","before","both","but","either","even","even","though","for","how","however","if","only","case","in","order","that","neither","nor","now","once","only","or","provided","rather","than","since","so","than","that","though","till","unless","until","when","whenever","where","whereas","wherever","whether","while","yet"];

            export var id = 'repeated';
            export var display = 'Repeated Words';
            export var onClick = function(): void {
                return;
            };

            export var onChange = function(val: string): number {
                var words: string[];
                var repeated = {};
                var word: string;
                var total = 0;

                val = val.replace(/\./g, '')
                    .replace(/[ -]+/g, ' ')
                    .toLowerCase();

                words = val.split(/\b/gi)
                    .filter(function(value): boolean {
                        if (/[a-z]+/gi.test(value) && _exclude.indexOf(value) === -1) {
                            return true;
                        }
                        return false;
                    });

                for (var i = 0, ii = words.length; i < ii; i++) {
                    word = words[i];

                    if (!repeated[word]) {
                        repeated[word] = 1;
                        continue;
                    }

                    if (repeated[word] === 1) {
                        total += 1;
                    }

                    total += 1;
                    repeated[word] += 1;
                }

                for (word in repeated) {
                    if (repeated[word] === 1) {
                        delete repeated[word];
                    }
                }

                _value = repeated;
                value = total;

                console.log(words, repeated);

                return total;
            };

            export var value = onChange(localStorage['input'] || '');
        }

        export module timer {
            function pad(num: number): string {
                var out = num + '';

                while (out.length < 2) {
                    out = '0' + out;
                }
                return out;
            }

            var _value = 0;
            var _tickId = 0;

            export var id = 'timer';
            export var display = 'Timer';
            export var value = "00:00:00";

            export var onClick = function(): void {
                pauseTick();
                return;
            };

            export var stopTick = function(): void {
                clearInterval(_tickId);
                
                _tickId = 0;

                value = '00:00:00';

                _value = 0;
                return;
            };

            export var pauseTick = function(): void {
                if (!_tickId) {
                    startTick();
                    return;
                }

                clearInterval(_tickId);

                _tickId = 0;
                return;
            };

            export var startTick = function(): void {
                _tickId = setInterval(function() {
                    onTick();
                    return;
                }, 1000);
                return;
            };

            export var onTick = function (): void {
                var output = 'hh:mm:ss';

                _value += 1;

                output = output.replace('hh', pad(~~(_value / 3600)))
                    .replace('mm', pad(~~(_value / 60)))
                    .replace('ss', pad(_value % 60));

                value = output;
                return;
            };
        }
    }
}
