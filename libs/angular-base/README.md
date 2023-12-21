# angular-base

Library with different abstract components and utilities that come in handy for simple angular-applications.

# model-component

A collection of abstract classes(components) that can reflect the different action pages(list/add/edit) for a subject(model).

# navigation-service

Keeps track of visited pages and navigates back to the previous page if 'back' is called. If back is called on the initial page, the fallback route is used.
For example if the user is on the route '/users/edit' and clicks on the back button, the router will navigate to '/users'.
These base paths can be defined in the implementation of the base-model-components.
