# WhatsApp Cloud API Setup

## Required Environment Variables
```
WHATSAPP_ACCESS_TOKEN=your_whatsapp_cloud_api_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
```

## Message Template Setup
1. Go to Meta Business Manager
2. Navigate to WhatsApp > Message Templates
3. Create a new template with name: "otp_login"
4. Template content:
```
Your ComputerHut login code is: {{1}}

This code will expire in 10 minutes. Do not share this code with anyone.
```
5. Set category as: Authentication
6. Add variable: Number

## Template Configuration
- Language: English
- Category: Authentication
- Template Name: otp_login
- Format: Text

## Implementation Notes
- OTP is 6 digits
- Expires in 10 minutes
- Uses international phone number format (e.g., +1234567890)
- Template must be approved before use