# jscache
Simple Javascript Cache

I needed a spatial cache so I created this simple base cache and derived class.

The comparison function can be overriden in derived class.

The desired numbed of records can be set, it is not a maximum and will be exceeded as checking the cache size and crunching is not done on every addition.

Of course with caching taking place in the browser memory the number of items in the cache should be kept very small.

I have tested basic add and get which automatically "crunches" the cache as expected.

You need to reference linq.js which is used to retrieve data from the cache.

If you want to use the spatial cache you will also need to reference the Google Maps API.

You need to reference jquery, linq.js and Google Maps if using the spatial cache.



