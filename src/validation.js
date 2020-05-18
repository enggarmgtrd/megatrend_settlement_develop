import { extend } from 'vee-validate';

extend('min', {
    validate(value, { length }) {
      return value.length >= length;
    },
    params: ['length'],
    message: '{_field_} harus diisi minimal {length} karakter'
  });