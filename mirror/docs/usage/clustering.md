# Clustering

This application only supports running one instance per database.

Otherwise, when doing clustering, push messages do not work anymore between devices
connected to different instances and the rate limiting is per instance and thus not
strictly enforced.
