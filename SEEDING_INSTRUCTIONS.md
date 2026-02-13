# Database Seeding Instructions

## Quick Start

Run this command from the `server` directory to populate your database with sample data:

```bash
npm run seed
```

## What Gets Created

### Assets (12 total)
- **4 Assigned to Employee** (Sarthak Singh):
  - MacBook Pro 16" M3
  - LG UltraWide 34" Monitor
  - Logitech MX Master 3S Mouse
  - Sony WH-1000XM5 Headphones

- **7 Available**:
  - Dell XPS 15 Laptop
  - Dell UltraSharp 27" Monitor
  - Apple Magic Keyboard
  - HP LaserJet Pro Printer
  - iPad Pro 12.9"
  - Samsung Odyssey G9 Monitor
  - Microsoft Surface Pro 9

- **1 In Maintenance**:
  - Lenovo ThinkPad X1

### Requests (5 total)
All requests are from Employee (Sarthak Singh):
- **2 Pending**:
  - Laptop for video editing
  - Tablet for presentations
  
- **2 Approved** (by Admin):
  - Additional monitor
  - Noise-cancelling headphones
  
- **1 Rejected** (by Admin):
  - Ergonomic keyboard

## User Credentials

### Admin User
- **Email**: admin@gmail.com
- **Password**: (use the password you set during registration)
- **Role**: admin
- **ID**: 698f1f80ed1688d5ab1e46e4

### Employee User
- **Email**: aryaappatel@gmail.com
- **Password**: (use the password you set during registration)
- **Role**: employee
- **Name**: Sarthak Singh
- **ID**: 698f1ae9c8ad2717932d9635

## Important Notes

⚠️ **Warning**: Running the seed script will:
- Delete ALL existing assets
- Delete ALL existing requests
- Keep user accounts intact

## Troubleshooting

If the seed script fails:
1. Make sure MongoDB is running
2. Check that the `.env` file has the correct `MONGO_URI`
3. Verify the user IDs match your database (check MongoDB Compass or shell)
4. Ensure the server is NOT running when you execute the seed script

## After Seeding

1. Start the server: `npm run dev`
2. Start the client: `cd ../client && npm run dev`
3. Login as admin or employee to see the seeded data
4. Test the dashboard statistics, filtering, and CSV export features
