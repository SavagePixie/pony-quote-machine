import getBtnText from '../modules/getBtnText.js'

const setContent = (element, tag, content) => document.querySelector(element)[tag] = content

const setStyle = (element, style, specs) => document.querySelector(element).style[style] = specs

const setColours = colours => {
	setStyle('body', 'backgroundColor', colours.background)
	setStyle('#quote-box', 'backgroundColor', colours.box)
	setStyle('#photo', 'border', `1px solid ${colours.background}`)
	setStyle('#me', 'color', colours.emphasis)
}

const changePony = (pony, pName) => {
	if (pony.name != pName) {
		setContent('#author', 'innerHTML', `&mdash; ${pony.name} <img id='photo' src=${pony.image} />`)
		setColours(pony.colours)
	}
}

const changeQuote = data => {
	setContent('#quote', 'innerHTML', `<i class="fa fa-quote-left"></i> ${data.quote}`)
	setContent('#new-quote', 'innerHTML', getBtnText())
	setContent('#new-quote', 'onclick', () => getQuote(data.name, data.quote))
	setContent('#tweet-quote', 'href', `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(data.quote + '\nBy ' + data.name)}`)
}

const getQuote = (pName, pQuote) =>
	fetch('/quote')
		.then(res => res.json())
		.then(data => {
			if (data.quote == pQuote) return getQuote(pName, pQuote)
			changeQuote(data)
			changePony(data, pName)
		})

window.onload = getQuote