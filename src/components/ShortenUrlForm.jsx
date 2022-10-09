/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');

    // Used for displaying the short url once it's copied to the clipboard
    const [shortUrlDisplay, setShortUrlDisplay] = useState('');

    // Used for displaying error messages
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = useCallback(
        (e) => {

            // TODO: Set the component's new state based on the user's input
            console.log(e.target.value)
            setValue(value + e.target.value)
        },
        [
            /* TODO: Add necessary deps */
        ],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            // Reset the shortUrlDisplay and error message every time the user clicks the button
            setErrorMessage('')
            setShortUrlDisplay('')

            // Request that the url be turned into a shortUrl
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: '{"realUrl": 5}',
            };

            fetch('http://localhost:8000/api/shortUrl/', requestOptions)
                .then(response => response.json())
                .then(data => {

                    // Get the shortened url from the data
                    const shortUrlValue = data.shortUrl

                    // Copy the shortened url to the clipboard
                    navigator.clipboard.writeText(shortUrlValue)

                    // Update 'shortUrlDisplay', so the short url gets displayed in the div below
                    setShortUrlDisplay(shortUrlValue)

                })    
                .catch(error => {
                    setErrorMessage("We're having technical difficulties at the moment sorry! Please try again later!")
                })
                
        },
        [
            /* TODO: necessary deps */
        ],
    );

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
            <input type="submit" value="Shorten and copy URL" />
            {/* TODO: show below only when the url has been shortened and copied */}
            <div>{/* Show shortened url --- copied! */ shortUrlDisplay}</div>
            {errorMessage && (<p className="error"> {errorMessage} </p>)}
            
        </form>
    );
};

export default ShortenUrlForm;
