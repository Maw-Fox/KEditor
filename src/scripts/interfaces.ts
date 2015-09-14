/**
 * KEdit - Interfaces
 * @author Kali@F-List.net
 */

interface ColorProps {
	cur: number;
	min: number;
	max: number;
}

interface ColorPicker {
	r: ColorProps;
	g: ColorProps;
	b: ColorProps;
}