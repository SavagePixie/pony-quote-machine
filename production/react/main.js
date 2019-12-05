import ReactDOM from 'react-dom'
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

const randInt = require('../../src/randInt.js')

const newButton = () => {
   const buttons = [
    'Another one!',
    'One more!',
    'I need more!',
    'Next!',
    'Again!',
    'Let\'s keep doing that!'
  ]
  
  return buttons[randInt(0, buttons.length - 1)]
}

//Set an element's style
const setStyle = (element, style, specs) => document.querySelector(element).style[style] = specs

//Let's change colours based on the pony's colour pattern
const setColours = colours => {
	setStyle('body', 'backgroundColor', colours.background)
	setStyle('#quote-box', 'backgroundColor', colours.box)
	setStyle('#photo', 'border', `1px solid ${colours.background}`)
	setStyle('#me', 'color', colours.emphasis)
}

//Let's do some React
const QuoteMachine = () => {
  const [ pony, setPony ] = useState({})
  const [ prevQuote, setPrevQuote ] = useState('')
  const [ button, setButton ] = useState('')
  
  useEffect(() => {
    const fetchPony = () => 
      fetch('/quote')
        .then(res => res.json())
        .then(data => {
          if (data.quote == prevQuote) return fetchPony()
          else {
            setPony(data)
            setButton(newButton())
          }
        })
    fetchPony()
  }, [prevQuote])
  
  useLayoutEffect(() => (pony.name) && setColours(pony.colours), [pony.name])
  
  return(
    <>
      <QuoteText quote={pony.quote} />
      <QuoteAuthor pony={pony.name} image={pony.image} />
      <TweetQuote quote={pony.quote} pony={pony.name} />
      <Button setPony={() => setPrevQuote(pony.quote)} text={button} />
    </>
  )
}

const Button = props => <button id='new-quote' className='btn btn-light' onClick={props.setPony}>{props.text}</button>

const TweetQuote = props => <a className='btn btn-light' id='tweet-quote' href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(props.quote + '\nBy ' + props.pony)}`} target='_blank'><i className='fa fa-twitter'></i></a>

const QuoteAuthor = props => <p id='author'>&mdash; {props.pony} <img id='photo' src={props.image} /></p>

const QuoteText = props => <p id='quote'><i className='fa fa-quote-left'></i> {props.quote}</p>

ReactDOM.render(<QuoteMachine />, document.getElementById('quote-box'))