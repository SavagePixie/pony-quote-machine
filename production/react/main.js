import ReactDOM from 'react-dom'
import React, { useEffect, useLayoutEffect, useReducer } from 'react'
import getBtnText from '../modules/getBtnText'
import setColours from '../modules/setColours'
import reducer from './stateHandler'

const initialState = {
  status: 'fetching',
  pony: {},
  error: null,
}

const QuoteMachine = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  const fetchPony = currQuote => fetch('/quote')
    .then(res => res.json())
    .then(data => data.quote == currQuote
      ? fetchPony(currQuote)
      : dispatch({ type: 'RESOLVE', data, button: getBtnText() })
    )
    .catch(error => dispatch({ type: 'ERROR', error }))
  
  useEffect(() => {
    if (state.status == 'fetching') fetchPony(state.pony.quote)
  }, [state.status])
  
  useLayoutEffect(() => {
    if (state.status == 'success') setColours(state.pony.colours)
  }, [state.pony.name])
  
  return(
    <>
      <QuoteText quote={state.pony.quote} />
      <QuoteAuthor pony={state.pony.name} image={state.pony.image} />
      <div className='buttons'>
        <TweetQuote quote={state.pony.quote} pony={state.pony.name} />
        <Button setPony={() => dispatch({ type: 'FETCH' })} text={state.button} />
      </div>
    </>
  )
}

const Button = props => (<button 
    id='new-quote'
    className='btn'
    onClick={props.setPony}
  >
    {props.text}
  </button>)

const TweetQuote = props => (<a
    className='btn'
    id='tweet-quote'
    href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`${props.quote}\nBy ${props.pony}`)}`}
    target='_blank'
  >
    <i className='fa fa-twitter'></i>
  </a>)

const QuoteAuthor = props => (<p id='author'>
    &mdash; {props.pony} <img id='photo' src={props.image} />
  </p>)

const QuoteText = props => (<p id='quote'>
    <i className='fa fa-quote-left'></i> {props.quote}
  </p>)

ReactDOM.render(<QuoteMachine />, document.getElementById('quote-box'))