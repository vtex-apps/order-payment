# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.8.0] - 2021-01-11
### Added
- `isFreePurchase` property to payment context.

## [0.7.0] - 2020-07-13
### Added
- `setCardFormFilled` and `paymentsValid` properties to payment context.

## [0.6.0] - 2020-06-04
### Added
- Fields `value` and `interestValue` to payment context.

### Changed
- Updated calculation for `referenceValue` to take into account all totalizers.

## [0.5.0] - 2020-06-02
### Added
- `cardLastDigits` and `setCardLastDigits` to context.

## [0.4.0] - 2020-06-01
### Removed
- `setCardFormData` and `cardFormData` from payment context.

## [0.3.0] - 2020-05-12
### Added
- `setPaymentField` method to update a field of payment 
- Get data from `OrderForm` and send to `children`

### Removed
- `savePaymentData` mutation

## [0.2.0] - 2020-04-03
### Added
- `setOrderPayment` mutation to update payment data

## [0.1.0] - 2020-03-05
### Added
- Initial version of OrderPayment.
