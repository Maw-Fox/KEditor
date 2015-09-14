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
				this.value = val.length;
				return this.value;
			};
			export var value = onChange(localStorage['input'] || '');
		}

		export module words {
			export var id = 'words';
			export var display = 'Words';
			export var onChange = function(val: string): number {
				this.value = val.split(/\b[a-zA-Z']+\b/g).length - 1;
				return this.value;
			};
			export var value = onChange(localStorage['input'] || '');
		}
		
		export module repeated {
			export var id = 'repeated';
			export var display = 'Repeated Words';
			export var onClick = function(): void {
				return;
			};
			export var onChange = function(val: string): number {
				return 0;
			};
			export var value = onChange(localStorage['input'] || '');
		}

		export module timer {
			export var id = 'timer';
			export var display = 'Timer';
			export var value = "00:00:00";
			export var onTick = function (): void {
				return;
			};
		}
	}
}
