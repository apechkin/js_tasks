const _createDescription = Symbol('_createDescription')
const _sort = Symbol('_sort')
const _gate = Symbol('_gate')
const _seat = Symbol('_seat')
const _baggage = Symbol('_baggage')
const _number = Symbol('_number')
const _findLeft = Symbol('_findLeft')
const _findRight = Symbol('_findRight')

class CardsClass {
  /**
   *
   * @param {Array} cards
   * @return {String}
   */
  sort(cards) {
    if (!Array.isArray(cards)) throw new TypeError('Incoming param is not array')
    const sortedCards = this[_sort](cards)
    return this[_createDescription](sortedCards)
  }

  /**
   *
   * @param {Object} data
   * @return {String}
   */
  [_gate](data) {
    if (data && data['gate']) return `Gate ${data['gate']}.`
    return ``
  }

  /**
   *
   * @param {Object} data
   * @return {String}
   */
  [_seat](data) {
    if (data && data['seat']) return `Seat ${data['seat']}.`
    return `No seat assignment.`
  }

  /**
   *
   * @param {Object} data
   * @return {String}
   */
  [_number](data) {
    if (data && data['number']) return `${data['number']}`
    return ``
  }

  /**
   *
   * @param {Object} data
   * @return {String}
   */
  [_baggage](data) {
    if (data && data['baggage']) return `${data['baggage']}`
    return ``
  }

  /**
   *
   * @param {Array} searchArr
   * @param {Array} stored
   * @return {Boolean}
   */
  [_findLeft](searchArr, stored) {
    let find = 0
    for (let inx = 0; inx < searchArr.length; inx++) {
      const element = searchArr[inx];
      if (stored[0]['from'] === element['destination']) {
        stored.unshift(element)
        find = 1
      }
    }
    return find
  }

  /**
   *
   * @param {Array} searchArr
   * @param {Array} stored
   * @return {Boolean}
   */
  [_findRight](searchArr, stored) {
    let find = 0
    for (let inx = 0; inx < searchArr.length; inx++) {
      const element = searchArr[inx];
      if (stored[stored.length - 1]['destination'] === element['from']) {
        stored.push(element)
        find = 1
      }
    }
    return find
  }

  /**
   *
   * @param {Array} cards
   * @return {Array}
   */
  [_sort](cards) {
    let sortedCards = []
    if (cards && cards.length > 0) {
      // select first card and save it
      sortedCards.push(cards[0])
      let cardsLength = cards.length
      let sortedLength = sortedCards.length
      while (cardsLength !== sortedLength) {
        this[_findLeft](cards, sortedCards)
        this[_findRight](cards, sortedCards)
        sortedLength = sortedCards.length
      }
    }
    return sortedCards
  }

  /**
   *
   * @param {Array} cards
   * @return {String}
   */
  [_createDescription](cards) {
    let description = ''
    for (let index = 0; index < cards.length; index++) {
      if (cards[index]['transportType'] === 'flight') {
        description += `From ${cards[index]['from']}, take ${cards[index]['transportType']} ${this[_number](cards[index])} to ${cards[index]['destination']}. ${this[_gate](cards[index])} ${this[_seat](cards[index])} ${this[_baggage](cards[index])} \n`.replace('  ', '')
      } else {
        description += `Take ${cards[index]['transportType']} ${this[_number](cards[index])} from ${cards[index]['from']} to ${cards[index]['destination']}. ${this[_seat](cards[index])} \n`.replace('  ', '')
      }
    }
    return description
  }

}

module.exports = new CardsClass()
