#!/bin/sh

# Migrate database tables
knex migrate:latest

# Run test (for a simplistic CI/CD)
npm test

if [[ $? != 0 ]]; then
    echo "CI/CD: Tests are not passing. Exiting...";
    exit;
fi

#Start the application
npm start
