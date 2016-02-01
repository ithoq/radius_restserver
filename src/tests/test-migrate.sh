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

# check that MySQL has come up
echo "USE radius;" | mysql -u radius --password=radius  -h mysqldb
RETVAL=$?
while [ $RETVAL -ne 0 ]; do
	sleep 1
	echo "USE radius;" | mysql -u radius --password=radius -h mysqldb
	RETVAL=$?
done

./manage.py migrate
exit $?