module.exports = {
  extends: [
    'angular'
  ],
  rules: {
    'angular/no-service-method': 0,
    'max-params': 'off'
  },
  globals: {
    PRODUCTION: true,
    API_URL: true
  }
}
