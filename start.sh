#!/bin/sh

# Print the value of PATH environment variable
echo $PATH

# Start the backend service
java -jar app.jar &

# Start the frontend service
/usr/local/bin/serve -s build

