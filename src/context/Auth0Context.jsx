import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

export default function ({children}) {
    const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
    if (!domain || !clientId) {
        console.error('Auth0 configuration is missing. Please check your environment variables.');
    }
    return(
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
            redirect_uri: window.location.origin
            }}
        >
            {children}
        </Auth0Provider>
    );
}
