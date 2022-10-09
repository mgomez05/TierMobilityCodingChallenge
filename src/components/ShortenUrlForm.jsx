/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');

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

            // Request that the url be turned into a shortUrl
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: '{"realUrl": 5}',
            };

            fetch('http://localhost:8000/api/shortUrl/', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("Hi")
                    console.log(data)
                })    
                .catch(error => console.log(error))
                
            // TODO: shorten url and copy to clipboard
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
            <div>{/* Show shortened url --- copied! */}</div>
        </form>
    );
};

export default ShortenUrlForm;
