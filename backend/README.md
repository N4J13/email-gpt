# Email GPTfication

This guide will help you set up and run this Node.js application locally.

## Getting Started

1. Clone the repository:
```bash
   git clone <repository_url>
   cd <repository_name>
```

2. Create a .env file in the root directory of the project and add the following environment variables in the format KEY=VALUE:

```bash
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_REDIRECT_URI=<your_google_redirect_uri>
DATABASE_URL=<your_database_url>
SUCCESS_REDIRECT_URL=<your_success_redirect_url>
PORT=<port_number> 
```

3. To run the application locally, use the following command:
```bash
npm run dev
```
