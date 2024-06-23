# ecommerce-backend

<p align="center">
  <img src="https://i.ibb.co/TBM45pT/logo.png" alt="logo">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-nestjs-blue%3Fstyle%3Dflat" alt="Framework-nestjs"/>
  <img src="https://img.shields.io/badge/Version-0.0.1_(Alpha)-purple?style=flat" alt="Version-0.0.1(Alpha)"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="License-MIT"/>
</p>

## About

Server part of the e-commerce app. Authorization and registration are supported, along with the ability to add items to a wishlist or cart, create an order and follow its delivery status, manage items by categories and filter them based on a variety of criteria, and manage many parts of application through the admin panel (like adding new brands / products / categories / etc.).

The figma layout of the application was found in the public domain. [The figma layout](https://www.figma.com/community/file/1376901695536369893)

## Technologies

- NestJS (10.0.0)
- Prisma (5.15.0)
- PostgreSQL (16)
- Jest (29.5.0)

## Environment

- Node 20.14.0
- npm 10.7.0

## Common setup

Clone the repo and install the dependencies.

```
  git clone https://github.com/evdmatvey/ecommerce-backend.git
  cd ecommerce-backend
```

```
  npm install
```

### Development

Run in development mode.

```
  npm run start:dev
```

Run tests.

```
  npm run test
```

Run code format checker.

```
  npm run prettier:check
```

### Build

Get package.

```
  npm run package
```

## Developers

- [evdmatvey](https://github.com/evdmatvey)

## License

Project ecommerce-backend is distributed under the MIT license.
