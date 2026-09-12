# Al Barook Building Management System - Backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Mano6162/al-barook-building.git
cd al-barook-building/backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/al-barook
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
```

### Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

#### Flats
- `GET /api/flats` - Get all flats
- `GET /api/flats/:id` - Get flat by ID
- `POST /api/flats` - Create new flat
- `PUT /api/flats/:id` - Update flat
- `DELETE /api/flats/:id` - Delete flat

#### Rent Collection
- `GET /api/rent` - Get all rent records
- `GET /api/rent/month/:month` - Get rent for specific month
- `POST /api/rent` - Record rent payment
- `PUT /api/rent/:id` - Update rent record

#### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/category/:category` - Get expenses by category
- `POST /api/expenses` - Add expense
- `PUT /api/expenses/:id` - Update expense

#### Tenants
- `GET /api/tenants` - Get all tenants
- `POST /api/tenants` - Add tenant
- `PUT /api/tenants/:id` - Update tenant

#### Reminders
- `GET /api/reminders/pending` - Get pending reminders
- `POST /api/reminders/send-all` - Send all reminders

### Deployment

**Deploy to Heroku:**
```bash
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
```

**Deploy to Render.com:**
1. Connect GitHub repository
2. Set environment variables
3. Deploy

### Database Models

#### Flat
- flatNumber (unique)
- floor (1-7)
- type (Fully/Semi-furnished)
- status (Occupied/Vacant/Maintenance)
- monthlyRent
- tenant (reference)
- parking

#### Tenant
- name
- email
- phone
- emiratesId
- moveInDate
- moveOutDate
- leaseStart & leaseEnd
- flat (reference)

#### RentRecord
- flat & tenant (references)
- month
- expectedRent
- amountReceived
- status (Pending/Partial/Paid)
- dateReceived
- paymentMethod
- reminderSent

#### Expense
- category (Plumbing/Carpenter/Electrical/Painting/Other)
- description
- amount
- date
- vendorName
- status (Pending/Completed/Paid)
- flat (reference)

### Support
For issues, contact: barookbldg@gmail.com
