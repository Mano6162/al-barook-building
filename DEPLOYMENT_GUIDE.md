# Al Barook Building - Deployment Guide

## Project Overview

**Building Name:** Al Barook Building  
**Address:** Al Zahra'a Street - near Al Ihsan Charity Association - Al Nakhil - Al Rumailah 1 - Ajman  
**Total Units:** 80 Fully & Semi-Furnished Flats  
**Parking Spaces:** 18 Car Parking Facility  

### Building Structure
- **Floors 1-6:** 12 flats per floor
- **Floor 7:** 8 flats
- **Total:** 80 flats

---

## System Features

### 1. **Flat Management**
- Inventory of 80 flats with unit details
- Flat numbering and floor assignment
- Furnished status tracking (Fully/Semi-Furnished)
- Occupancy status management
- Tenant information database

### 2. **Rent Collection Module**
- Monthly rent tracking per flat
- Rent due date reminders
- Payment status monitoring
- Automated reminder notifications to tenants
- Rent payment history and receipts
- Late payment tracking

### 3. **Maintenance & Expenses**
Track separate maintenance categories:
- **Plumbing:** Repairs, replacements, maintenance
- **Carpentry:** Repairs, installations, maintenance
- **Electrical:** Repairs, upgrades, safety checks
- **Painting:** Interior/exterior touch-ups, repainting

Additional features:
- Expense categorization and logging
- Vendor management
- Budget tracking
- Maintenance request system
- Work order generation

### 4. **Parking Management**
- 18 parking space inventory
- Tenant parking allocation
- Parking fee tracking (if applicable)
- Availability monitoring

### 5. **Notification System**
- Automated rent payment reminders
- Maintenance alerts
- Expense notifications
- Tenant communications

---

## Technology Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling and Responsive Design
- **JavaScript** - Interactivity
- **Bootstrap 5** - Responsive Framework

### Backend (Recommended for Production)
- **Node.js/Express** - Server
- **Python/Flask** - Alternative Backend
- **Database:** MongoDB or PostgreSQL

### Deployment Options
- **GitHub Pages** - Static site
- **Heroku** - Full-stack deployment
- **AWS** - Enterprise deployment
- **Firebase** - Cloud-based solution

---

## Project Structure

```
al-barook-building/
├── index.html                 # Main dashboard
├── css/
│   ├── style.css             # Main stylesheet
│   ├── responsive.css        # Mobile responsive styles
│   └── dashboard.css         # Dashboard styling
├── js/
│   ├── app.js                # Main application
│   ├── rent-manager.js       # Rent collection logic
│   ├── maintenance.js        # Maintenance tracking
│   ├── parking.js            # Parking management
│   ├── notifications.js      # Reminder system
│   └── utils.js              # Utility functions
├── data/
│   ├── flats.json            # Flat inventory
│   ├── tenants.json          # Tenant information
│   ├── rent-records.json     # Rent payments
│   ├── maintenance.json      # Maintenance records
│   └── parking.json          # Parking assignments
├── pages/
│   ├── dashboard.html        # Main dashboard
│   ├── flats.html            # Flat management
│   ├── rent.html             # Rent collection
│   ├── maintenance.html      # Maintenance tracking
│   ├── parking.html          # Parking management
│   └── reports.html          # Reports & Analytics
├── assets/
│   ├── images/               # Building images
│   ├── icons/                # UI icons
│   └── documents/            # Contracts, receipts
├── api/ (Backend)
│   ├── routes/               # API endpoints
│   ├── models/               # Database models
│   └── middleware/           # Authentication, validation
├── DEPLOYMENT_GUIDE.md       # This file
└── README.md                 # Project documentation

```

---

## Installation & Setup

### Prerequisites
- Node.js v14+ (for backend)
- npm or yarn package manager
- Git
- Modern web browser

### Step 1: Clone Repository
```bash
git clone https://github.com/Mano6162/al-barook-building.git
cd al-barook-building
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Setup Configuration
Create `.env` file in root directory:
```
BUILDING_NAME=Al Barook Building
TOTAL_FLATS=80
PARKING_SPACES=18
ADMIN_EMAIL=your-email@example.com
REMINDER_DAY=28
CURRENCY=AED
```

### Step 4: Initialize Database
```bash
npm run init-db
```

### Step 5: Run Development Server
```bash
npm start
# Server runs on http://localhost:3000
```

---

## Feature Implementation Guide

### Rent Collection Setup

1. **Configure Rent Schedule**
   - Set monthly due date (e.g., 1st of each month)
   - Define late fee percentage
   - Set reminder notification days (default: 3 days before due)

2. **Flat Configuration**
   - Input rent amount per flat
   - Assign tenants
   - Set payment method preferences

3. **Automated Reminders**
   - System automatically sends reminders on configured dates
   - Email notifications to tenant contact
   - SMS reminders (optional integration)
   - In-app notifications

### Maintenance Expense Tracking

1. **Category Setup**
   - Configure expense categories (Plumbing, Carpentry, Electrical, Painting)
   - Set budget limits per category
   - Define approval workflows

2. **Vendor Management**
   - Add vendor details
   - Store contact information
   - Track payment history

3. **Work Orders**
   - Create work orders for maintenance tasks
   - Assign to vendors
   - Track completion status
   - Log expenses

### Flat Management

1. **Add Flats**
   - Create 80 flats (Floors 1-7)
   - Assign flat numbers
   - Mark furnished status
   - Set rental rate

2. **Tenant Assignment**
   - Input tenant information
   - Define lease terms
   - Set move-in/move-out dates
   - Emergency contacts

### Parking Management

1. **Allocate Spaces**
   - Register 18 parking spaces
   - Assign to tenants
   - Track availability
   - Define parking fees (if applicable)

---

## Deployment Options

### Option 1: GitHub Pages (Static Site)
```bash
# Build static files
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Pros:** Free, automatic updates from git push  
**Cons:** Limited backend functionality

### Option 2: Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create al-barook-building

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 3: Docker Containerization
```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t al-barook .
docker run -p 3000:3000 al-barook
```

### Option 4: AWS Deployment
- **EC2:** VPS hosting with Node.js
- **RDS:** PostgreSQL/MySQL database
- **S3:** Static asset storage
- **CloudFront:** CDN distribution
- **SES:** Email notifications

### Option 5: Firebase/Google Cloud
- **Firestore:** Database
- **Cloud Functions:** Serverless backend
- **Cloud Storage:** File storage
- **Cloud Scheduler:** Automated reminders

---

## Database Schema

### Flats Table
```json
{
  "flatId": "1-001",
  "floor": 1,
  "flatNumber": 1,
  "furnished": "fully",
  "rentAmount": 2500,
  "currentTenant": "tenant-id-001",
  "occupancyStatus": "occupied",
  "createdAt": "2026-09-12"
}
```

### Tenants Table
```json
{
  "tenantId": "tenant-001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971-123-456",
  "flatId": "1-001",
  "leaseStartDate": "2026-01-01",
  "leaseEndDate": "2027-01-01",
  "emergencyContact": "+971-999-8888"
}
```

### Rent Records Table
```json
{
  "rentId": "rent-001",
  "flatId": "1-001",
  "tenantId": "tenant-001",
  "month": "2026-09",
  "amount": 2500,
  "dueDate": "2026-09-01",
  "paidDate": "2026-09-01",
  "status": "paid",
  "paymentMethod": "bank-transfer"
}
```

### Maintenance Table
```json
{
  "maintenanceId": "maint-001",
  "category": "plumbing",
  "flatId": "1-001",
  "description": "Leaking faucet",
  "vendor": "vendor-001",
  "cost": 150,
  "status": "completed",
  "date": "2026-09-10"
}
```

### Parking Table
```json
{
  "parkingId": "park-001",
  "spaceNumber": 1,
  "assignedTo": "tenant-001",
  "status": "occupied",
  "fee": 300
}
```

---

## API Endpoints (Backend)

### Flats API
- `GET /api/flats` - Get all flats
- `POST /api/flats` - Create new flat
- `PUT /api/flats/:id` - Update flat
- `DELETE /api/flats/:id` - Delete flat

### Rent API
- `GET /api/rent` - Get rent records
- `POST /api/rent/pay` - Record payment
- `GET /api/rent/pending` - Get pending payments
- `POST /api/rent/remind` - Send reminders

### Maintenance API
- `GET /api/maintenance` - Get maintenance records
- `POST /api/maintenance` - Create work order
- `PUT /api/maintenance/:id` - Update status
- `GET /api/maintenance/expenses` - Get expense summary

### Parking API
- `GET /api/parking` - Get parking spaces
- `POST /api/parking/assign` - Assign space
- `PUT /api/parking/:id` - Update assignment

### Tenants API
- `GET /api/tenants` - Get all tenants
- `POST /api/tenants` - Add tenant
- `PUT /api/tenants/:id` - Update tenant

---

## Security Considerations

1. **Authentication**
   - Implement login system for admins
   - Role-based access control
   - Session management

2. **Data Protection**
   - Encrypt sensitive data (rent amounts, contact info)
   - HTTPS only
   - Secure password hashing (bcrypt)

3. **Backup & Recovery**
   - Daily automated backups
   - Disaster recovery plan
   - Data retention policy

4. **Audit Trails**
   - Log all transactions
   - Track user actions
   - Maintain compliance records

---

## Maintenance & Updates

### Regular Tasks
- **Weekly:** Backup database, check system health
- **Monthly:** Review maintenance expenses, reconcile rent payments
- **Quarterly:** Security updates, performance optimization
- **Annually:** System audit, feature evaluation

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor uptime (UptimeRobot)
- Track performance metrics
- Email alerts for critical issues

---

## Support & Troubleshooting

### Common Issues

**Issue:** Reminders not sending
- Check email configuration
- Verify SMTP credentials
- Review notification logs

**Issue:** Database connection fails
- Verify database credentials
- Check network connectivity
- Review firewall settings

**Issue:** Page not loading
- Clear browser cache
- Check server logs
- Verify file permissions

### Contact & Support
- **Email:** Mano6162@gmail.com
- **Phone:** +971-XXX-XXXX (To be updated)
- **Repository:** https://github.com/Mano6162/al-barook-building

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-09-12 | Initial deployment guide & system setup |
| TBD | TBD | Enhanced features & improvements |

---

## License

This project is private and for Al Barook Building management use only.

---

**Last Updated:** September 12, 2026  
**Maintained By:** Mano6162
