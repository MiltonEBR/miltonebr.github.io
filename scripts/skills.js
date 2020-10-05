function closeCards() {
	const clicked = document.getElementsByClassName('clicked');

	for (let click of clicked) {
		click.classList.remove('clicked');
	}
}

function openCard(icons) {
	if (icons)
		return function(evt) {
			var close = false;
			for (let icon of icons) {
				if (evt.target === icon) {
					close = true;
					break;
				}
			}
			if (!this.classList.contains('clicked') && !close) {
				closeCards();
				this.classList.add('clicked');
			}
		};
}

function run() {
	buttons = document.querySelectorAll('.skill-container');
	icons = document.querySelectorAll('i');

	document.addEventListener('click', (evt) => {
		var clickInside = false;
		for (let button of buttons) {
			if (button.contains(evt.target)) {
				clickInside = true;
			}
		}

		if (!clickInside) {
			closeCards();
		}
	});

	if (buttons.length > 0) {
		for (let button of buttons) {
			button.onclick = openCard(icons);
		}

		for (let icon of icons) {
			icon.onclick = function() {
				closeCards();
			};
		}
	}
}

run();
