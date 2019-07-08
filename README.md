# printful

This is a quick prototype of the test application.

It is built using class based TS components (with strictNullChecks for non-nullability).

It uses VueRouter for navigation and data fields/router params for data storage. A production app would need to move the data to and data modification methods to Vuex.

The app uses axios for ajax requests, but has no logic to handle failed requests. A production app would need an error view and also a loading indicator instead of an empty page while the ajax requests complete.

There is no validation library used, opting for a simple set of reactive calculated properties to do the heavy lifting. This would be too much duplicated code for a production app, which is why it would require to move to a separate validation library. I admit though, that the chosen class based components do not work out of the box with most Vue validation libraries, but with little work and custom decorators, they can look work native. Though preferably, I'd like storing logic to validate in Vuex rather than in views, I've yet to find a Vue library that allows validating the store without creating a component instance.