# Project Name

## Description
A brief description of the project. Include details about its purpose, architecture, and main features.

---

## Setup Instructions

### 1. Install Dependencies
Run the following command to install all npm dependencies in the relevant subdirectories (e.g., `api-gateway`, `microservices/<service>`):

```bash
for /d %d in (api-gateway microservices\*) do (cd %d && npm install && cd ..)
