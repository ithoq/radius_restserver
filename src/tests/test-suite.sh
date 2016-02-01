#!/bin/bash
RES=`/usr/bin/psql -h db -U postgres postgres -c '\d'`
RV=$?
while [ $RV -gt 0 ]
  do
  	echo "Still waiting for Postgres database to come up - return value is $RV"
    sleep 1
    RES=`/usr/bin/psql -h db -U postgres postgres -c '\d'`
    RV=$?
done

./manage.py migrate&&./manage.py test -d
exit $?