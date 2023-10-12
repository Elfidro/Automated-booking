// ==UserScript==
// @name         Mandirigma auto booking
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Script that automatically books classes
// @author       Elfidro
// @match        https://mandirigmagym.setmore.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=setmore.com
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function clickAndWait(element, delayTime) {
        element.click();
        await delay(delayTime);
    }

    async function automateBooking() {
        await clickAndWait(document.querySelector('button.g-btn-primary.pull-right[data-testid="booking-policy-okay-btn"]'), 500);
        await clickAndWait(document.querySelector('li[data-testid="ca15464ca80caf3a1534ee0fbc913074b304b034b3"]'), 500);
        await clickAndWait(document.querySelector('li[data-testid="r79131595166268208"]'), 500);
        await clickAndWait(document.querySelector('li[data-testid="Asia/Qatar"]'), 500);
    }

    async function waitForHotkey() {
        return new Promise(resolve => {
            window.addEventListener('keydown', function(event) {
                if (event.key === 'c' && event.ctrlKey) { // Adjust the hotkey combination as needed
                    resolve();
                }
            });
        });
    }

    async function startAutomation() {
        console.log("Press Ctrl + c to start automation.");
        await waitForHotkey();
        await automateBookingInfo();
    }

    function typeInInput(element, message) {
        element.value = message;
    }

    function automateBookingInfo() {
        typeInInput(document.querySelector('input.g-inputfield[data-testid="name"]'), 'Your Name');
        typeInInput(document.querySelector('input.g-inputfield[data-testid="email"]'), 'Your Email');
    }

    /* Start of automation on page open */
    // Wait for 3 seconds before starting
    await delay(3000);

    // Execute the automation
    await automateBooking();
    startAutomation();
})();