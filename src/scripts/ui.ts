/**
 * KEdit - UI
 * @author Kali@F-List.net
 */

/// <reference path="../../lib/vue.d.ts" />
/// <reference path="module.ts" />
/// <reference path="interfaces.ts" />

module Editor {
    function inputOnChange(val: string): void{
        var event: any;
        localStorage['input'] = val;

        for (event in Stats) {
            if (Stats.hasOwnProperty(event) && Stats[event].onChange) {
                Stats[event].onChange(val);
            }
        }

        View.Modal['highlights'] = highlight(val);
        return;
    }

    function highlight(input: string): string {
        var words = Editor.Stats.repeated._value;
        var word: string;
        var patterns: RegExp[] = [];
        var colors: Array<number[]> = [
            [255, 0, 0, 0.2],
            [0, 255, 0, 0.2],
            [0, 0, 255, 0.2],
            [255, 255, 0, 0.2],
            [255, 0, 255, 0.2],
            [0, 255, 255, 0.2],
            [150, 255, 0, 0.2],
            [150, 0, 255, 0.2],
            [255, 150, 0, 0.2],
            [255, 0, 150, 0.2],
            [0, 150, 255, 0.2],
            [0, 255, 150, 0.2],
            [50, 150, 255, 0.2],
            [150, 50, 255, 0.2],
            [255, 150, 50, 0.2],
            [150, 255, 50, 0.2]
        ];

        input = input.toLowerCase();

        for (word in words) {
            if (words.hasOwnProperty(word)) {
                input = input.replace(new RegExp(`(\\b${word}\\b)`, 'g'), '%$1%');
                patterns.push(new RegExp(`%(${word})%`, 'g'));
            }
        }

        for (var i = 0, ii = patterns.length; i < ii; i++) {
            input = input.replace(patterns[i],
                `<span class="group" style="background-color:rgba(${
                colors[i % 16].join(',') 
                });">$1</span>`
            );
        }
        return input;
    }

    export module View {
        function pickColor(colors: ColorPicker): ColorPicker {
            // Prioritize b -> g -> r

            return colors;
        }

        export var Main = new Vue({
            el: '#editor',
            data: {
                stats: Stats,
                input: Editor.input
            }
        });

        Main.$watch('input', inputOnChange);

        export var Modal = new Vue({
            el: '#modal',
            data: {
                modalActive: false,
                component: 'repeats',
                heading: 'Repeated Words Analysis',
                input: Editor.input,
                highlights: highlight(Editor.input),
                stats: Stats
            },
            methods: {
                close: function(): void {
                    this.modalActive = false;
                    return;
                }
            },
            components: {
                repeats: {
                    template: '#repeats-template',
                    inherit: true
                }
            }
        });
    }
}
