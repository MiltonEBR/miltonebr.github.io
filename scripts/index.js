function run() {
	const desktopBehaviour = (panel) => {
		panel.addEventListener('mouseover', function() {
			if (window.innerWidth < 800) {
				return;
			}
			if (!this.classList.contains('panel-hover')) {
				this.classList.add('panel-hover');
			}
		});

		panel.addEventListener('mouseleave', function() {
			if (window.innerWidth < 800) {
				return;
			}
			if (this.classList.contains('panel-hover')) {
				this.classList.remove('panel-hover');
			}
		});
		panel.href = panel.getAttribute('destination');
	};

	let active;
	const mobileBehaviour = (panel) => {
		panel.addEventListener('click', function() {
			if (!this.classList.contains('panel-hover')) {
				if (active) {
					active.classList.remove('panel-hover');
				}
				this.classList.add('panel-hover');
				active = this;
			} else {
				panel.href = panel.getAttribute('destination');
			}
		});
	};

	const applyBehaviours = (panels) => {
		for (let panel of panels) {
			if (window.innerWidth >= 800) {
				desktopBehaviour(panel);
			} else {
				mobileBehaviour(panel);
			}
		}
	};
	const panels = document.querySelectorAll('.panel-item');
	applyBehaviours(panels);
	window.addEventListener('resize', function() {
		applyBehaviours(panels);
	});
}

run();
