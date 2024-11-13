// src/gtag.js
export const initializeGA = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-TDCJ0Y04C1");
};
