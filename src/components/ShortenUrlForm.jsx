/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');

    // Used for displaying the short url once it's copied to the clipboard
    const [shortUrlDisplay, setShortUrlDisplay] = useState('');

    // Used for displaying error messages
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetail, setErrorDetail] = useState('');

    const onChange = useCallback(
        (e) => {

            // Set the component's new state based on the user's input
            setValue(value + e.target.value)
        },
        [],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            // Reset the shortUrlDisplay and error message every time the user clicks the button
            setErrorMessage('')
            setShortUrlDisplay('')

            // Send a request to the server to shorten the url
            // - If the request succeeds, copy the url to the clipboard and
            //   and show it below the textbox
            // - Otherwise, show an error message and an error detail explaining
            //   why we couldn't send the message
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ realUrl: value}),
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
                    setErrorMessage("Couldn't connect to the server! Please try again later!")
                    setErrorDetail(`${error}`)
                })
                
        },
        [
            /* Include necessary deps */
            value
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
            {/* We show the url below after it's been shortened and copied */}
            <div>{shortUrlDisplay}</div>
            {errorMessage && (<p className="error"> {errorMessage} </p>)}
            {errorDetail && (<p className="error"> {errorDetail} </p>)}
            
        </form>
    );
};

export default ShortenUrlForm;
