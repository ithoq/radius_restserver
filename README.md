# radius_restserver
REST Endpoint for FreeRadius Server

![build status](https://codeship.com/projects/f21c2f30-a7c1-0133-1520-721682b6b155/status?branch=master)

This includes a (very insecure) FreeRADIUS 2.0 server and a Django app for accessing RADIUS data.
We're hoping this will one day be a replacement for ARA.

This is designed to be built with docker-compose

something like…

```
docker-compose up -d
docker-compose run --rm radius /usr/src/build/load-test-data.sh
```

You probably want to use `docker-compose logs` a lot.

The web app is exposed on port 81 in docker-compose. We develop with docker-machine and this works nicely.

Once you've started the app, a few housekeeping things are needed

```
docker-compose run --rm django ./manage.py migrate
docker-compose run --rm django ./manage.py createsuperuser
#if you want to load the test data - recommended
docker-compose run --rm radius /usr/src/build/load-test-data.sh
```

## Development Instructions

We follow a standard git development workflow. The master branch should always be deployable and is frequently
tested by our CI server.

Any changes you wish to make should be completed in a branch, and then a pull request should be initiated to
this repo. If this is ready to merge, it will cause a CI build to be run which should identify any issues
relating to the operability of your code.

If you think you've found a bug and it makes sense to test for it (and... let's face it, when does it NOT make
sense to test) please write a test, and ensure that it runs in the appropriate runner.

We use Codeship for CI, and so our CI steps are defined in codeship-steps.yml. You can run this locally on your
machine installing Jet using the instructions at https://codeship.com/documentation/docker/installation/.