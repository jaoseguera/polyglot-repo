# Usar la imagen de PHP 7.4 con Apache
FROM php:7.4-apache

COPY ./config_sap/nwrfcsdk /usr/sap/nwrfcsdk

RUN cp /usr/sap/nwrfcsdk/sapnwrfc.so "$(php-config --extension-dir)"/

RUN echo "extension=sapnwrfc.so" > /usr/local/etc/php/conf.d/sapnwrfc.ini

RUN echo "/usr/sap/nwrfcsdk/lib" > /etc/ld.so.conf.d/nwrfcsdk.conf

RUN ldconfig
