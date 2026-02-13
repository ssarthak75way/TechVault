# How to Add Assets to TechVault

## Quick Guide

### Prerequisites
- You must be logged in as an **Admin** or **Manager** role
- Employees cannot create assets (they can only request them)

### Steps to Add a New Asset

1. **Navigate to Assets Page**
   - Click on "Assets" in the sidebar navigation
   - Or go to: `http://localhost:5174/dashboard/assets`

2. **Click "Add New Asset" Button**
   - Located in the top-right corner of the Assets Inventory page
   - Only visible to Admin and Manager users

3. **Fill Out the Asset Form**
   - **Asset Name**: e.g., "MacBook Pro 16-inch"
   - **Serial Number**: e.g., "MBP-2024-001"
   - **Type**: e.g., "Laptop", "Monitor", "Keyboard"

4. **Submit**
   - Click "Create Asset" button
   - You'll be redirected back to the Assets Inventory page
   - The new asset will appear in the list with status "available"

## Troubleshooting

### "Add New Asset" Button Not Visible
- **Check your role**: Only Admin and Manager users can add assets
- **Verify login**: Make sure you're logged in
- **Check user role** in the Dashboard to confirm your permissions

### Asset Creation Fails
- **Check all required fields** are filled
- **Verify backend is running**: `npm run dev` in the server directory
- **Check browser console** for error messages
- **Verify MongoDB connection** is active

## API Endpoint

The asset creation uses:
- **POST** `/api/v1/assets`
- **Body**: `{ name: string, serialNumber: string, type: string }`
- **Auth**: Requires valid JWT token (auto-handled by frontend)

## Default Asset Properties

When created, assets automatically get:
- **Status**: `available`
- **Assigned To**: `null` (unassigned)
- **Created/Updated timestamps**: Auto-generated

Assets can later be assigned to users through the request approval system.
