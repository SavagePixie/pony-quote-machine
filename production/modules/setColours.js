const setStyle = (element, style, specs) => document.querySelector(element).style[style] = specs

export default colours => {
	setStyle('body', 'backgroundColor', colours.background)
	setStyle('#quote-box', 'backgroundColor', colours.box)
	setStyle('#photo', 'border', `1px solid ${colours.background}`)
	setStyle('#me', 'color', colours.emphasis)
}