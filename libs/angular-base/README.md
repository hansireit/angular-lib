# angular-base

Library with different abstract components and utilities that come in handy for simple angular-applications.

# base-auth-service

Includes logic to receive the current login-state/user/etc. as observables.
This abstract auth-service is used for the two included auth-guard-functions that can be used for protecting routes.

The reason behind the 'pending' auth-state is to ensure the correct state inside the auth-guard. For example if the frontend used cookies for keeping the auth state, you can check the token and then decide if the user is logged-in or logged-out after the token was validated.

## login-in-guard

Waits until the auth state is not pending

- If the user is not logged-in, the user is redirected to the route '/auth/login' (will be customizable in the future)

## login-out-guard

Waits until the auth state is not pending

- If the user is not logged-out, the user is redirected to the route '/' (will be customizable in the future)

# form-util

Contains static helper functions

# model-component

A collection of abstract classes(components) that can reflect the different action pages(list/add/edit) for a subject(model).

# navigation-service

Keeps track of visited pages and navigates back to the previous page if 'back' is called. If back is called on the initial page, the fallback route is used.
For example if the user is on the route '/users/edit' and clicks on the back button, the router will navigate to '/users'.
These base paths can be defined in the implementation of the base-model-components.
