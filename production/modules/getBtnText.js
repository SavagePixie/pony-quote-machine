import randInt from './randInt.js'

export default () => texts[randInt(0, texts.length - 1)]

const texts = [
    'Another one!',
    'One more!',
    'I need more!',
    'Next!',
    'Again!',
    'Let\'s keep doing that!',
]