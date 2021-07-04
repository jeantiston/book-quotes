import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShip, faPlane } from '@fortawesome/free-solid-svg-icons'
import styles from './quotes.module.css'

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max += 1
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const Quotes = () => {

    const [startCountry, setStartCountry] = useState('')
    const [destCountry, setDestCountry] = useState('')
    const [quotePrice, setQuotePrice] = useState(0)
    const [shippingChannel, setShippingChannel] = useState('')
    const [estDeliveryStart, setEstDeliveryStart] = useState(0)
    const [estDateStart, setEstDateStart] = useState('')
    const [estDeliveryEnd, setEstDeliveryEnd] = useState(0)
    const [estDateEnd, setEstDateEnd] = useState('')
    const [showQuote, setShowQuote] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    const getDateString = (date, offSetDay) => {

        let randomDate = new Date(date)
        randomDate.setDate(randomDate.getDate() + offSetDay)

        return randomDate.toDateString().slice(4,-4)
    }

    const setDeliveryDates = (shippingChannel) => {
        let start = 0
        let end = 0

        if (shippingChannel === 'air') {
            start = getRandomInt(3,7)
            end = getRandomInt(2,4)


        }
        else if (shippingChannel === 'ocean') {
            start = getRandomInt(25,30)
            end = getRandomInt(5,10)
            
            setEstDeliveryStart(getRandomInt(25,30))
            setEstDeliveryEnd(getRandomInt(5,10))
        }

        setEstDeliveryStart(start)
        setEstDeliveryEnd(start + end)

        const startDate = getDateString(Date.now(), start)
        const endDate = getDateString(Date.now(), start + end)

        setEstDateStart(startDate)
        setEstDateEnd(endDate)

        
    }

    // The 'required' on the inputs should take care of blank inputs but I added this just in case
    // I can't think of anything else to check short of checking if a country is a valid one
    // And a dropdown of valid countries is a better choice than a text input if I need to check that
    // But demo used a text input
    const checkInput = (input) => { 
        if (input['shipping-channel'].value && input['start-country'].value && input['destination-country'].value && input['quote-price'].value){
            setErrorMsg('')
            return true
        }
        
        setErrorMsg('All inputs are required')
        return false
    }

    const generateQuote = e => {
        e.preventDefault()

        if( checkInput(e.target) === true) {

            setDeliveryDates(e.target['shipping-channel'].value)

            setStartCountry(e.target['start-country'].value)
            setDestCountry(e.target['destination-country'].value)
            setQuotePrice(e.target['quote-price'].value)
            setShippingChannel(e.target['shipping-channel'].value)

            setShowQuote(true)
        }
    }

    return (
        <div>
            <form onSubmit={generateQuote} className={styles.form}>
                <div className={styles.input}>
                    <label htmlFor="start-country">Starting country</label><br />
                    <input type="text" id="start-country" name="start-country" required />
                </div>

                <div className={styles.input}>
                    <label htmlFor="destination-country">Destination country</label><br />
                    <input type="text" id="destination-country" name="destination-country" required />
                </div>

                <div className={styles.input}>
                    <label htmlFor="quote-price">Quote price</label><br />
                    <input type="number" id="quote-price" name="quote-price" required />
                </div>

                <div className={styles.input}>
                <label htmlFor="shipping-channel">Shipping channel</label><br />
                    <select name="shipping-channel" id="shipping-channel" required>
                        <option value="ocean">Ocean</option>
                        <option value="air">Air</option>
                    </select>
                </div>

                { errorMsg && <p className={styles.error}>{errorMsg}</p> }

                <input className={styles.button} type="submit" value="Create quote" />

            </form>
            {showQuote &&
                <div className={styles.quoteBox}>
                    <div className={styles.col1}>
                        <div className={styles.shippingChannel}>
                            { shippingChannel === 'air' && <FontAwesomeIcon icon={faPlane} className={styles.shippingIcon} /> }
                            { shippingChannel === 'ocean' && <FontAwesomeIcon icon={faShip} className={styles.shippingIcon} /> }
                            Traditional {shippingChannel} freight
                        </div>
                        <div className={styles.bodyDeliver}>
                            <p className={styles.deliveryDays}>{estDeliveryStart}-{estDeliveryEnd} Days</p>
                            <div className={styles.estimatedDelivery}>
                                <p>Estimated delivery</p>
                                <b>{estDateStart} - {estDateEnd}</b>
                            </div>
                        </div>
                    </div>
                    <div className={styles.col2}>
                        <div className={styles.destination}>
                            {startCountry} -{'>'} {destCountry}
                        </div>
                        <div className={styles.quotePrice}>
                            <p>US$ {quotePrice}</p>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Quotes