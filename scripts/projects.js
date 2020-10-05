function setHidden(panel) {
	if (panel.classList.contains('show')) {
		panel.classList.remove('show');
	}

	if (!panel.classList.contains('hide')) {
		panel.classList.add('hide');
	}
}

function setVisible(panel) {
	if (!panel.classList.contains('show')) {
		panel.classList.add('show');
	}

	if (panel.classList.contains('hide')) {
		panel.classList.remove('hide');
	}
}

async function readJSONFile(file) {
	const resp = await fetch(file);
	const jsonData = await resp.json();
	return jsonData;
}

function createCards(cards) {
	const list = document.querySelector('.proj-list');

	const createdCards = [];

	for (i = 0; i < cards.length; i++) {
		const article = document.createElement('article');
		article.classList.add('proj');

		const header = document.createElement('header');
		header.classList.add('proj-header');
		const title = document.createElement('h2');
		title.innerHTML = cards[i].title;
		header.appendChild(title);
		article.append(header);

		const imgDiv = document.createElement('div');
		imgDiv.classList.add('thumb-container');

		const bigThumb = document.createElement('img');
		bigThumb.classList.add('big-thumb');
		bigThumb.src = cards[i].thumb;
		imgDiv.append(bigThumb);

		const smallContainer = document.createElement('div');
		smallContainer.classList.add('small-container');

		for (j = 0; j < cards[i].smallThumbs.length; j++) {
			const smallImg = document.createElement('img');
			smallImg.classList.add('small-thumb');
			smallImg.src = cards[i].smallThumbs[j];
			smallContainer.append(smallImg);
		}
		imgDiv.append(smallContainer);

		article.append(imgDiv);

		const desc = document.createElement('p');
		desc.innerHTML = cards[i].short;
		article.append(desc);

		createdCards.push({ article, data: cards[i] });
		list.append(article);
	}
	return createdCards;
}

function addOnClick(cardList, callback) {
	for (let card of cardList) {
		card.article.onclick = () => {
			callback(card);
		};
	}
}

function setPanel(data, bigPanel) {
	const panel = document.querySelector('#full-proj');
	panel.innerHTML = `<i class="far fa-times-circle close-btn"></i>${data}`;

	const closeBtn = panel.querySelector('i');
	closeBtn.onclick = () => {
		setHidden(bigPanel);
	};
}

async function run() {
	const panel = document.querySelector('#proj-panel');
	setHidden(panel);
	panel.addEventListener('click', (evt) => {
		if (panel === evt.target) {
			setHidden(panel);
		}
	});

	const jsonData = await readJSONFile('../data/projects.json');

	const cardList = createCards(jsonData);
	addOnClick(cardList, (card) => {
		setPanel(card.data.full, panel);
		setVisible(panel);
	});
}

run();
