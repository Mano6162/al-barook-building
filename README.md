# Al Barook Building - Management System

**Building Address:** Al Zahra'a Street - near Al Ihsan Charity Association - Al Nakhil - Al Rumailah 1 - Ajman

![Building Status](https://img.shields.io/badge/Status-Active-success) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-Private-red)

## 📋 Overview

Al Barook Building is a comprehensive real estate management system designed to handle the operations of a residential building with:
- **80 Fully & Semi-Furnished Flats** (Floors 1-6: 12 units each | Floor 7: 8 units)
- **18 Car Parking Spaces**
- Monthly rent collection and tracking
- Maintenance expense management
- Tenant information database
- Automated payment reminders

---

## 🏗️ Building Structure

### Floor Layout
| Floor | Units | Type |
|-------|-------|------|
| 1-6 | 12 each | Residential |
| 7 | 8 | Residential |
| **Total** | **80** | **Fully & Semi-Furnished** |

### Amenities
- **Parking:** 18 dedicated car parking spaces
- **Unit Types:** Fully furnished and Semi-furnished options
- **Average Rent:** 2,500 - 3,500 AED (configurable per unit)

---

## ✨ Key Features

### 1. **Flat Management**
- ✅ Complete inventory of 80 units
- ✅ Track occupancy status (Occupied/Vacant)
- ✅ Assign tenants to flats
- ✅ Monitor furnished status
- ✅ Rental rate tracking

### 2. **Rent Collection Module**
- ✅ Monthly rent tracking per flat
- ✅ Payment history and records
- ✅ **Automated rent payment reminders** (configurable date)
- ✅ Late payment tracking
- ✅ Payment receipts generation
- ✅ Tenant notifications via email/SMS

### 3. **Maintenance & Expenses**
Track four categories of maintenance:
- **🔧 Plumbing** - Repairs, pipe replacements, leak fixes
- **🪵 Carpentry** - Door/window repairs, installations
- **⚡ Electrical** - Wiring repairs, appliance fixes, safety checks
- **🎨 Painting** - Interior/exterior touch-ups, full repainting

Features:
- Work order generation
- Vendor management
- Expense categorization
- Budget tracking
- Completion status monitoring

### 4. **Parking Management**
- ✅ 18 parking space inventory
- ✅ Tenant-to-space allocation
- ✅ Availability monitoring
- ✅ Parking fee tracking
- ✅ Tenant parking reports

### 5. **Tenant Directory**
- ✅ Complete tenant information
- ✅ Contact details and emergency contacts
- ✅ Lease terms tracking
- ✅ Lease expiration alerts
- ✅ Tenant communication history

### 6. **Notification System**
- 📧 **Email Reminders** - Automated rent payment notifications
- 📱 **SMS Alerts** (Optional) - Payment reminders
- 🔔 **In-App Notifications** - System alerts
- 📋 **Maintenance Alerts** - Expense tracking

### 7. **Reports & Analytics**
- 📊 Monthly rent collection report
- 💰 Revenue summaries
- 🔧 Maintenance expense analysis
- 📈 Occupancy trends
- 💳 Payment status reports

---

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Node.js v14+ (for backend/database)
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mano6162/al-barook-building.git
   cd al-barook-building
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Settings**
   Create `.env` file:
   ```
   BUILDING_NAME=Al Barook Building
   TOTAL_FLATS=80
   PARKING_SPACES=18
   ADMIN_EMAIL=your-email@example.com
   REMINDER_DAY=28
   CURRENCY=AED
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Access Dashboard**
   Open browser: `http://localhost:3000`

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📁 Project Structure

```
al-barook-building/
├── index.html                 # Main dashboard
├── style.css                  # Main stylesheet
├── script.js                  # JavaScript functionality
├── pages/
│   ├── flats.html            # Flat management
│   ├── rent.html             # Rent collection
│   ├── maintenance.html      # Maintenance tracking
│   ├── parking.html          # Parking management
│   ├── tenants.html          # Tenant directory
│   └── reports.html          # Reports & analytics
├── js/
│   ├── app.js                # Main application logic
│   ├── rent-manager.js       # Rent tracking
│   ├── maintenance.js        # Maintenance management
│   ├── notifications.js      # Reminder system
│   └── utils.js              # Utility functions
├── css/
│   ├── style.css             # Main styles
│   └── responsive.css        # Mobile responsive
├── data/
│   ├── flats.json            # Flat inventory
│   ├── tenants.json          # Tenant database
│   ├── rent-records.json     # Rent payments
│   └── maintenance.json      # Maintenance records
├── api/                       # Backend endpoints (if applicable)
├── DEPLOYMENT_GUIDE.md       # Detailed deployment guide
└── README.md                 # This file
```

---

## 📊 Database Schema

### Flat Record
```json
{
  "flatId": "1-001",
  "floor": 1,
  "flatNumber": 1,
  "furnished": "fully",
  "rentAmount": 2500,
  "currentTenant": "tenant-id-001",
  "occupancyStatus": "occupied"
}
```

### Rent Record
```json
{
  "rentId": "rent-001",
  "flatId": "1-001",
  "month": "2026-09",
  "amount": 2500,
  "dueDate": "2026-09-01",
  "paidDate": "2026-09-01",
  "status": "paid"
}
```

### Maintenance Record
```json
{
  "maintenanceId": "maint-001",
  "category": "plumbing",
  "flatId": "1-001",
  "description": "Leaking faucet",
  "vendor": "vendor-001",
  "cost": 150,
  "status": "completed"
}
```

---

## 🔐 Security Features

- User authentication system
- Role-based access control
- Encrypted sensitive data (contact info, payment details)
- HTTPS encryption
- Regular automated backups
- Audit trail for all transactions
- Session management

---

## 📱 Features by Module

### Rent Collection
- Monthly rent due date notifications
- Customizable reminder schedule
- Payment confirmation receipts
- Tenant payment history
- Late fee calculations
- Multi-payment method support

### Maintenance Tracking
- **Plumbing:** Emergency leaks, pipe repairs, maintenance
- **Carpentry:** Door repairs, cabinet fixes, installations
- **Electrical:** Outlet repairs, lighting, safety checks
- **Painting:** Touch-ups, repainting, deep cleaning prep

Each with:
- Work order system
- Vendor assignment
- Progress tracking
- Cost management
- Photo documentation

### Tenant Management
- Complete tenant profiles
- Emergency contacts
- Lease terms and dates
- Communication history
- Lease renewal reminders
- Security deposit tracking

### Parking Management
- Space allocation
- Parking fee tracking
- Availability status
- Tenant parking reports
- Reserved space management

---

## 🔔 Notification Examples

### Rent Payment Reminder
```
Subject: Rent Payment Reminder - Flat 1-001
Body: Dear [Tenant Name],
This is a reminder that your rent (AED 2,500) for Flat 1-001
is due on [Due Date]. Please arrange payment at your earliest convenience.
```

### Maintenance Notification
```
Subject: Maintenance Completed - Flat 2-005
Body: Dear [Tenant Name],
Plumbing maintenance in your flat has been completed.
Cost: AED 150 | Date: [Date] | Contact: [Vendor Phone]
```

---

## 🛠️ Deployment Options

Choose your preferred deployment method:

1. **GitHub Pages** - Static hosting (free)
2. **Heroku** - Full-stack deployment
3. **Docker** - Containerized deployment
4. **AWS** - Enterprise-grade hosting
5. **Firebase** - Serverless backend
6. **Traditional VPS** - Dedicated server

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📈 Rent Management Configuration

### Setting Rent Reminder Date
```javascript
// Default: 28th of each month
// Customizable in settings

const reminderDay = 28;  // Send reminder on 28th
const reminderDays = 3;  // 3 days before due date (25th)
const dueDate = 1;       // Rent due on 1st of month
```

### Automatic Reminder System
- ✅ Calculates days until due date
- ✅ Sends reminder at configured time
- ✅ Tracks tenant responses
- ✅ Records manual reminder sends
- ✅ Escalation for overdue payments

---

## 🎯 Monthly Operations Checklist

- [ ] Send rent payment reminders (28th of month)
- [ ] Track rent collection progress
- [ ] Process maintenance requests
- [ ] Verify work order completions
- [ ] Review maintenance expenses by category
- [ ] Generate monthly reports
- [ ] Follow up on late payments
- [ ] Update tenant contact information
- [ ] Review parking space assignments
- [ ] Plan preventive maintenance

---

## 📞 Support & Contact

- **Administrator:** Mano6162
- **Email:** Mano6162@gmail.com
- **GitHub:** [Mano6162/al-barook-building](https://github.com/Mano6162/al-barook-building)
- **Building Address:** Al Zahra'a Street, Ajman
- **Website:** https://Mano6162.github.io/al-barook-building/

---

## 📄 Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [API Documentation](docs/api.md) - API endpoints and usage
- [Database Schema](docs/database.md) - Database structure
- [User Guide](docs/user-guide.md) - System usage guide

---

## 🗓️ Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-09-12 | Initial release with core features |
| Coming | Soon | Enhanced analytics and reporting |

---

## ⚖️ License

This project is **PRIVATE** and restricted to Al Barook Building management use only.

---

## 🤝 Contributing

This is a private project. For inquiries or contributions, please contact the administrator.

---

## ✅ Checklist: What's Included

- [x] Building information and structure documentation
- [x] 80-flat inventory management system
- [x] 18-parking space allocation
- [x] Monthly rent collection tracking
- [x] Automated payment reminders
- [x] Maintenance expense tracking (Plumbing, Carpentry, Electrical, Painting)
- [x] Tenant management system
- [x] Dashboard with key statistics
- [x] Notification system
- [x] Deployment guide
- [x] Responsive design for all devices
- [x] Security features

---

**Last Updated:** September 12, 2026  
**Status:** ✅ Active and Maintained
