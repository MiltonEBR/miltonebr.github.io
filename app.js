//Simple delay function
const delay = (n) => {
	n = n || 2000;
	return new Promise((acc) => {
		setTimeout(() => {
			acc();
		}, n);
	});
};

//Animation of the transition
const transition = () => {
	const div = document.querySelector('.trans');
	if (div.classList.contains('trans-off')) {
		div.classList.remove('trans-off');
		div.classList.add('trans-on');
	} else {
		div.classList.remove('trans-on');
		div.classList.add('trans-off');
	}
};

//Applies background to the body if it's not the index page
const applyBackground = ({ next }) => {
	const body = document.querySelector('body');
	if (next.namespace !== 'home') {
		if (!body.classList.contains('info-body')) {
			body.classList.add('info-body');
		}
	} else {
		if (body.classList.contains('info-body')) {
			body.classList.remove('info-body');
		}
	}
};

const loadScript = (route, next) => {
	let script = document.createElement('script');
	script.src = `${route}`;
	next.container.appendChild(script);
};

barba.init({
	cacheIgnore: [ '/skills/' ],
	transitions: [
		{
			name: 'default',
			async leave(data) {
				transition();
				await delay(600);
			},
			once(data) {
				applyBackground(data);
			},
			beforeEnter(data) {
				applyBackground(data);
			},
			enter(data) {
				transition();
			}
		}
	],
	views: [
		{
			namespace: 'skills',
			beforeEnter({ next }) {
				loadScript('./scripts/skills.js', next);
			}
		},
		{
			namespace: 'projects',
			beforeEnter({ next }) {
				loadScript('./scripts/projects.js', next);
			}
		}
	]
});
