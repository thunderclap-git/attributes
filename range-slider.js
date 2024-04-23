const main = document.querySelector('[tc-range-slider]');
const input = main.querySelector('input');

const handle = main.querySelector('[range-handle]');
const track = main.querySelector('[range-track]');

const handleWidth = handle.offsetWidth;

const min = parseInt(main.getAttribute('range-min')) || 0;
const max = parseInt(main.getAttribute('range-max')) || 100;

const rangeSteps = parseInt(main.getAttribute('range-steps'));

let dragging = false;

handle.addEventListener('mousedown', function (e) {
	dragging = true;
});

document.addEventListener('mouseup', function (e) {
	dragging = false;
});

let value = 20;

document.addEventListener('mousemove', function (e) {
	if (!dragging) return;
	let trackRect = track.getBoundingClientRect();
	let newLeft = e.clientX - trackRect.left;
	let rightLimit = track.offsetWidth - handle.offsetWidth;

	if (newLeft < 0) newLeft = 0;
	if (newLeft > rightLimit) newLeft = rightLimit;

	let newVal = 0;

	if (rangeSteps) {
		newVal = Math.ceil((min + (max - min) * (newLeft / rightLimit)) / rangeSteps) * rangeSteps;
		if (newVal < max) value = newVal;
	} else {
		newVal = min + (max - min) * (newLeft / rightLimit);
		if (newVal < max) value = newVal;
	}

	const handleLeft = ((newVal - min) / (max - min)) * 100;

	if (handleLeft === 0) handle.style.left = '0px';
	else handle.style.left = `calc(${handleLeft}% - ${handleWidth}px)`;

	input.value = value;
	input.dispatchEvent(new Event('change'));
});
