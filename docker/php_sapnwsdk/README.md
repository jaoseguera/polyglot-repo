# Docker PHP with SAP NW RFC SDK

A specialized Docker environment designed to run **PHP** applications that require integration with **SAP systems** using the **SAP NW RFC SDK**.

## 🚀 Overview

This repository provides a pre-configured Docker image (or Dockerfile) that handles the complex setup of the SAP Northwest Remote Function Call (NW RFC) SDK within a PHP environment. It is ideal for developers building interfaces between web applications and SAP ERP systems.

## 🛠 Features

- **PHP Integration**: Ready-to-use PHP environment.
- **SAP NW RFC SDK Support**: Pre-configured to include the necessary libraries and headers.
- **Extension Support**: Configured to work with the `sapnwrfc` PHP extension.
- **Linux-based**: Built on a stable Linux distribution (e.g., Debian/Ubuntu) for production reliability.

## 📦 Prerequisites

Due to SAP's licensing, the **SAP NW RFC SDK** files cannot be redistributed. You must have a valid SAP Service Marketplace account to download the SDK:
1. Download the `nwrfc750X_X-XXXXXXX.zip` (or similar) from the [SAP Support Portal](https://support.sap.com/).
2. Place the SDK files in the designated folder (e.g., `/sdk` or as specified in the Dockerfile) before building.
