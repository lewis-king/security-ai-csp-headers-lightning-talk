const express = require('express');
const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'xss_demo'
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS olr_requests (
        id SERIAL PRIMARY KEY,
        request_type VARCHAR(50) NOT NULL,
        client_name VARCHAR(100) NOT NULL,
        pickup_location VARCHAR(200),
        destination VARCHAR(200),
        date_time TIMESTAMP,
        passengers INTEGER,
        additional_details TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Add some sample dining requests if table is empty
    const result = await pool.query('SELECT COUNT(*) FROM olr_requests');
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO olr_requests (request_type, client_name, pickup_location, destination, date_time, passengers, additional_details) VALUES
        ('dining_request', 'Emma Watson', '', 'Triton Restaurant', '2024-09-05 19:30:00', 2, 'Anniversary dinner - vegetarian options required'),
        ('dining_request', 'James Mitchell', '', 'Sketch Restaurant', '2024-09-08 20:00:00', 4, 'Business dinner - need private dining room'),
        ('dining_request', 'Sarah Thompson', '', 'The Ledbury', '2024-09-10 18:00:00', 2, 'Birthday celebration - guest has severe nut allergy'),
        ('dining_request', 'Michael Chen', '', 'Dinner by Heston', '2024-09-12 19:00:00', 6, 'Special celebration - prefer tasting menu with wine pairings')
      `);
    }
    
    console.log('Database initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Routes

// Member request submission page
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM olr_requests ORDER BY created_at DESC');
    const requests = result.rows;
    
    // This is VULNERABLE - no nonce generated, no CSP header
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ten Lifestyle - Dining Request</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          :root {
            --primary-color: #4a3d5c;
            --primary-light: #6b5b8a;
            --accent-color: #6366f1;
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --bg-tertiary: #f1f5f9;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --text-muted: #94a3b8;
            --border-light: #e2e8f0;
            --border-medium: #cbd5e1;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
            --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 25px rgba(0,0,0,0.12);
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 16px;
            --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
            color: var(--text-primary);
            line-height: 1.6;
          }
          
          .header-nav { 
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
            color: white; 
            padding: 16px 0;
            box-shadow: var(--shadow-md);
            position: relative;
            overflow: hidden;
          }
          
          .header-nav::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 50%);
            pointer-events: none;
          }
          
          .nav-content { 
            max-width: 1200px; 
            margin: 0 auto; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 0 24px;
            position: relative;
            z-index: 1;
          }
          
          .logo { 
            font-size: 2rem; 
            font-weight: 700; 
            letter-spacing: 3px; 
            background: linear-gradient(45deg, #ffffff, #e2e8f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .nav-links { 
            display: flex; 
            gap: 32px; 
          }
          
          .nav-links a { 
            color: rgba(255,255,255,0.9); 
            text-decoration: none; 
            font-size: 0.95rem; 
            font-weight: 500;
            transition: var(--transition);
            position: relative;
            padding: 8px 0;
          }
          
          .nav-links a:hover { 
            color: white;
            transform: translateY(-1px);
          }
          
          .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: rgba(255,255,255,0.8);
            transition: var(--transition);
          }
          
          .nav-links a:hover::after {
            width: 100%;
          }
          
          .breadcrumb { 
            background: rgba(74, 61, 92, 0.95);
            backdrop-filter: blur(10px);
            color: rgba(255,255,255,0.9); 
            padding: 12px 0; 
            font-size: 0.875rem; 
          }
          
          .breadcrumb-content { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 24px; 
          }
          
          .breadcrumb a { 
            color: rgba(255,255,255,0.7); 
            text-decoration: none; 
            transition: var(--transition);
          }
          
          .breadcrumb a:hover { 
            color: white; 
          }
          
          .main-content { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 48px 24px; 
            display: grid; 
            grid-template-columns: 1fr 380px; 
            gap: 48px; 
          }
          
          .form-section h1 { 
            font-size: 2rem; 
            font-weight: 600; 
            margin-bottom: 32px; 
            color: var(--text-primary);
            letter-spacing: -0.025em;
          }
          
          .step-indicator { 
            display: flex; 
            align-items: center; 
            margin-bottom: 32px; 
            padding: 20px;
            background: var(--bg-primary);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
          }
          
          .step-number { 
            background: linear-gradient(135deg, var(--accent-color), var(--primary-light));
            color: white; 
            width: 32px; 
            height: 32px; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 0.9rem; 
            font-weight: 600;
            margin-right: 16px; 
            box-shadow: var(--shadow-sm);
          }
          
          .step-text { 
            font-weight: 500; 
            font-size: 1.1rem;
            color: var(--text-primary);
          }
          
          .form-section-card {
            background: var(--bg-primary);
            border-radius: var(--radius-lg);
            padding: 32px;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-light);
          }
          
          .form-group { 
            margin-bottom: 24px; 
          }
          
          .form-group label { 
            display: block; 
            margin-bottom: 8px; 
            font-weight: 500; 
            color: var(--text-primary); 
            font-size: 0.95rem; 
          }
          
          .form-group input, 
          .form-group select, 
          .form-group textarea { 
            width: 100%; 
            padding: 14px 16px; 
            border: 2px solid var(--border-light); 
            border-radius: var(--radius-sm);
            font-size: 0.95rem; 
            background: var(--bg-primary);
            transition: var(--transition);
            font-family: inherit;
          }
          
          .form-group input:focus, 
          .form-group select:focus, 
          .form-group textarea:focus { 
            outline: none; 
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            transform: translateY(-1px);
          }
          
          .form-group input:hover:not(:focus), 
          .form-group select:hover:not(:focus), 
          .form-group textarea:hover:not(:focus) {
            border-color: var(--border-medium);
          }
          
          .form-group textarea { 
            height: 100px; 
            resize: vertical; 
            line-height: 1.5;
          }
          
          .form-row { 
            display: flex; 
            gap: 24px; 
          }
          
          .form-row .form-group { 
            flex: 1; 
          }
          
          .checkbox-group { 
            display: flex; 
            align-items: center; 
            margin: 20px 0;
            padding: 16px;
            background: var(--bg-secondary);
            border-radius: var(--radius-sm);
          }
          
          .checkbox-group input { 
            width: auto; 
            margin-right: 12px;
            accent-color: var(--accent-color);
          }
          
          .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 32px 0 20px;
            color: var(--text-primary);
            position: relative;
            padding-left: 16px;
          }
          
          .section-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: linear-gradient(135deg, var(--accent-color), var(--primary-light));
            border-radius: 2px;
          }
          
          .submit-btn {
            background: linear-gradient(135deg, var(--accent-color), var(--primary-light));
            color: white;
            padding: 16px 32px;
            border: none;
            border-radius: var(--radius-sm);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: var(--shadow-sm);
            position: relative;
            overflow: hidden;
          }
          
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
          }
          
          .submit-btn:active {
            transform: translateY(0);
          }
          
          .vulnerability-warning { 
            background: linear-gradient(135deg, var(--danger-color), #dc2626);
            color: white; 
            padding: 20px; 
            border-radius: var(--radius-md);
            margin-bottom: 32px; 
            font-size: 0.95rem; 
            box-shadow: var(--shadow-md);
            position: relative;
            overflow: hidden;
          }
          
          .vulnerability-warning::before {
            content: '⚠️';
            font-size: 1.5rem;
            position: absolute;
            top: 20px;
            right: 20px;
            opacity: 0.5;
          }
          
          .demo-section { 
            background: var(--bg-tertiary);
            padding: 24px; 
            margin: 32px 0; 
            border-radius: var(--radius-md);
            border-left: 4px solid var(--danger-color); 
            box-shadow: var(--shadow-sm);
          }
          
          .demo-payload { 
            background: #1e293b; 
            color: #10b981; 
            padding: 16px; 
            font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace; 
            font-size: 0.875rem; 
            margin: 16px 0; 
            border-radius: var(--radius-sm);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
            position: relative;
          }
          
          .demo-payload::before {
            content: '$ ';
            color: #64748b;
          }
          
          .summary-panel { 
            background: var(--bg-primary); 
            border-radius: var(--radius-lg);
            height: fit-content; 
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-light);
            overflow: hidden;
            position: sticky;
            top: 24px;
          }
          
          .summary-header { 
            background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
            padding: 24px; 
            border-bottom: 1px solid var(--border-light); 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
          }
          
          .summary-title { 
            font-weight: 600; 
            font-size: 1.1rem;
            color: var(--text-primary);
          }
          
          .summary-content { 
            padding: 24px; 
          }
          
          .summary-item { 
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-light);
          }
          
          .summary-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          
          .summary-label { 
            font-weight: 600; 
            font-size: 0.9rem; 
            margin-bottom: 4px;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .summary-value { 
            color: var(--text-primary); 
            font-size: 1rem;
            font-weight: 500;
          }
          
          .requests-section { 
            grid-column: 1 / -1; 
            margin-top: 48px; 
            background: var(--bg-primary); 
            padding: 40px; 
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-light);
          }
          
          .request-card { 
            border: 2px solid var(--border-light); 
            padding: 24px; 
            margin-bottom: 20px; 
            background: var(--bg-secondary);
            border-radius: var(--radius-md);
            transition: var(--transition);
          }
          
          .request-card:hover {
            border-color: var(--accent-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
          }
          
          .request-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 16px; 
          }
          
          .client-name { 
            font-weight: 600; 
            font-size: 1.2rem;
            color: var(--text-primary);
          }
          
          .request-details { 
            margin: 16px 0; 
            color: var(--text-secondary); 
            font-size: 0.95rem;
            line-height: 1.6;
          }
          
          .additional-details { 
            background: var(--bg-primary); 
            padding: 20px; 
            margin: 16px 0; 
            border-left: 4px solid var(--accent-color);
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-sm);
          }
          
          @media (max-width: 768px) {
            .main-content {
              grid-template-columns: 1fr;
              gap: 32px;
              padding: 24px 16px;
            }
            
            .form-row {
              flex-direction: column;
              gap: 16px;
            }
            
            .nav-content {
              padding: 0 16px;
            }
            
            .nav-links {
              gap: 20px;
            }
            
            .logo {
              font-size: 1.5rem;
            }
          }
        </style>
      </head>
      <body>
        <nav class="header-nav">
          <div class="nav-content">
            <div class="logo">TEN</div>
            <div class="nav-links">
              <a href="#">Travel</a>
              <a href="#">Dining</a>
              <a href="#">Entertainment</a>
              <a href="#">Events</a>
              <a href="#">Offers & Experiences</a>
              <a href="#">Inspiration</a>
            </div>
            <div style="display: flex; gap: 15px; align-items: center;">
              <span>♡</span>
              <span>👤</span>
              <span>☰</span>
            </div>
          </div>
        </nav>
        
        <div class="breadcrumb">
          <div class="breadcrumb-content">
            <a href="#">Home</a> • <a href="#">Dining search</a> • Request summary
          </div>
        </div>

        <div class="main-content">
          <div class="form-section">
            <h1>Request summary</h1>
            
            <div style="background: linear-gradient(135deg, var(--accent-color), var(--primary-light)); color: white; padding: 20px; border-radius: var(--radius-md); margin-bottom: 32px; box-shadow: var(--shadow-md);">
              <strong>👤 MEMBER PORTAL:</strong> Submit your dining request below. Our concierge team will review and process your booking within 24 hours.
            </div>
            
            <div class="step-indicator">
              <div class="step-number">1</div>
              <div class="step-text">Reservation details</div>
            </div>

            <div class="form-section-card">
              <form action="/olr" method="POST">
                <input type="hidden" name="request_type" value="dining_request">
                
                <h3 class="section-title">Contact details</h3>
              
              <div class="form-group">
                <label for="phone">Add phone number*</label>
                <input type="tel" name="phone" placeholder="+44 7777632613" required>
              </div>
              
              <div class="form-group">
                <label for="contact_method">Preferred contact method*</label>
                <select name="contact_method" required>
                  <option value="">Select contact method...</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="text">Text message</option>
                </select>
              </div>
              
              <h3 class="section-title">Booking requirements</h3>
              
              <div class="form-group">
                <label for="guests">How many people will be dining?*</label>
                <input type="number" name="passengers" min="1" max="20" value="2" required>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="date">Date</label>
                  <select name="date" required>
                    <option value="2024-09-05">5 Sep</option>
                    <option value="2024-09-06">6 Sep</option>
                    <option value="2024-09-07">7 Sep</option>
                    <option value="2024-09-08">8 Sep</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="time">Time*</label>
                  <select name="time" required>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30" selected>7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                  </select>
                </div>
              </div>
              
              <div class="checkbox-group">
                <input type="checkbox" name="flexible_time" id="flexible">
                <label for="flexible">This time is flexible</label>
              </div>
              
              <h3 class="section-title">Special requirements</h3>
              
              <div class="form-group">
                <label for="special_occasion">Is this a special occasion? (optional)</label>
                <textarea name="special_occasion" placeholder="Anniversary, birthday, business dinner..."></textarea>
              </div>
              
              <div class="form-group">
                <label for="additional_details">Dietary requirements (optional)</label>
                <textarea name="additional_details" placeholder="Allergies, dietary preferences, special requests..."></textarea>
              </div>
              
              <input type="hidden" name="client_name" value="Demo User">
              <input type="hidden" name="destination" value="Triton Restaurant">
              <input type="hidden" name="pickup_location" value="">
              
              <button type="submit" class="submit-btn">
                Submit Request
              </button>
              </form>
            </div>
            
          </div>

          <div class="summary-panel">
            <div class="summary-header">
              <span class="summary-title">✕ Dining request</span>
              <span>^</span>
            </div>
            <div class="summary-content">
              <div class="summary-item">
                <div class="summary-label">Restaurant:</div>
                <div class="summary-value">Triton Restaurant</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Address:</div>
                <div class="summary-value">26 Václavské nám.</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Date:</div>
                <div class="summary-value">5 September 2024</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Time:</div>
                <div class="summary-value">7:30 PM</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Number of guests:</div>
                <div class="summary-value">2</div>
              </div>
              <div style="font-size: 0.85rem; color: #666; margin-top: 20px; line-height: 1.4;">
                Can't find what you're looking for? Browse restaurants by cuisine, atmosphere and occasion and request your table. We have key contacts at top restaurants, who will do their best to accommodate our members – even at short notice. If we're unable to secure you a booking, we'll be ready with alternatives to suit you.
              </div>
            </div>
          </div>
        </div>


        <script>
          // Legitimate Ten Lifestyle dining system script
          console.log('Ten Lifestyle dining request system loaded');
          document.addEventListener('DOMContentLoaded', function() {
            console.log('Dining system ready with ' + ${requests.length} + ' requests');
          });
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching dining requests:', error);
    res.status(500).send('Server error');
  }
});

// Staff Dashboard - VULNERABLE VERSION (where XSS executes)
app.get('/maid', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM olr_requests ORDER BY created_at DESC');
    const requests = result.rows;
    
    // This is VULNERABLE - no nonce generated, no CSP header
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ten Maid - Lifestyle Manager Portal</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          :root {
            --primary-color: #4a3d5c;
            --primary-light: #6b5b8a;
            --accent-color: #6366f1;
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --bg-tertiary: #f1f5f9;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --text-muted: #94a3b8;
            --border-light: #e2e8f0;
            --border-medium: #cbd5e1;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
            --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 25px rgba(0,0,0,0.12);
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 16px;
            --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
            color: var(--text-primary);
            line-height: 1.6;
          }
          
          .header-nav { 
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
            color: white; 
            padding: 16px 0;
            box-shadow: var(--shadow-md);
            position: relative;
            overflow: hidden;
          }
          
          .nav-content { 
            max-width: 1400px; 
            margin: 0 auto; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 0 24px;
            position: relative;
            z-index: 1;
          }
          
          .logo { 
            font-size: 2rem; 
            font-weight: 700; 
            letter-spacing: 3px; 
            background: linear-gradient(45deg, #ffffff, #e2e8f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .maid-info {
            display: flex;
            align-items: center;
            gap: 16px;
            color: rgba(255,255,255,0.9);
          }
          
          .maid-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
          }
          
          .main-content { 
            max-width: 1400px; 
            margin: 0 auto; 
            padding: 48px 24px; 
          }
          
          .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
          }
          
          .dashboard-title {
            font-size: 2.5rem;
            font-weight: 600;
            color: var(--text-primary);
            letter-spacing: -0.025em;
          }
          
          .stats-bar {
            display: flex;
            gap: 24px;
          }
          
          .stat-card {
            background: var(--bg-primary);
            padding: 20px 24px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
            text-align: center;
            border: 1px solid var(--border-light);
          }
          
          .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent-color);
            margin-bottom: 4px;
          }
          
          .stat-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          
          
          .requests-grid {
            display: grid;
            gap: 24px;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          }
          
          .request-card { 
            background: var(--bg-primary);
            border: 2px solid var(--border-light); 
            padding: 24px; 
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-md);
            transition: var(--transition);
            position: relative;
          }
          
          .request-card:hover {
            border-color: var(--accent-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
          
          .request-status {
            position: absolute;
            top: 16px;
            right: 16px;
            background: var(--warning-color);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          .client-info {
            margin-bottom: 20px;
          }
          
          .client-name { 
            font-weight: 700; 
            font-size: 1.25rem;
            color: var(--text-primary);
            margin-bottom: 4px;
          }
          
          .request-date {
            color: var(--text-muted);
            font-size: 0.875rem;
          }
          
          .booking-details {
            background: var(--bg-secondary);
            padding: 16px;
            border-radius: var(--radius-sm);
            margin: 16px 0;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            font-size: 0.95rem;
          }
          
          .detail-label {
            color: var(--text-secondary);
            font-weight: 500;
          }
          
          .detail-value {
            color: var(--text-primary);
            font-weight: 600;
          }
          
          .special-requirements {
            background: #fef3c7;
            border-left: 4px solid var(--warning-color);
            padding: 16px;
            border-radius: var(--radius-sm);
            margin: 16px 0;
          }
          
          .requirements-label {
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .requirements-content {
            color: var(--text-primary);
            line-height: 1.5;
            white-space: pre-wrap;
          }
          
          .process-btn {
            background: linear-gradient(135deg, var(--success-color), #059669);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: var(--radius-sm);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            width: 100%;
            margin-top: 16px;
          }
          
          .process-btn:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
          }
        </style>
      </head>
      <body>
        <nav class="header-nav">
          <div class="nav-content">
            <div class="logo">TEN MAID</div>
            <div class="maid-info">
              <span>Sarah Mitchell - Concierge Manager</span>
              <div class="maid-avatar">SM</div>
            </div>
          </div>
        </nav>

        <div class="main-content">
          <div class="dashboard-header">
            <h1 class="dashboard-title">Lifestyle Manager Portal</h1>
            <div class="stats-bar">
              <div class="stat-card">
                <div class="stat-number">${requests.length}</div>
                <div class="stat-label">Pending</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Today</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">89%</div>
                <div class="stat-label">Success Rate</div>
              </div>
            </div>
          </div>



          <div class="requests-grid">
            ${requests.map(request => `
              <div class="request-card">
                <div class="request-status">PENDING</div>
                <div class="client-info">
                  <div class="client-name">${request.client_name}</div>
                  <div class="request-date">Submitted ${request.created_at.toLocaleDateString('en-GB', { 
                    weekday: 'long',
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>
                
                <div class="booking-details">
                  <div class="detail-row">
                    <span class="detail-label">Restaurant:</span>
                    <span class="detail-value">${request.destination}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Date & Time:</span>
                    <span class="detail-value">${request.date_time ? new Date(request.date_time).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'TBD'}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Guests:</span>
                    <span class="detail-value">${request.passengers}</span>
                  </div>
                </div>
                
                <div class="special-requirements">
                  <div class="requirements-label">
                    🍽️ Special Requirements & Dietary Notes
                  </div>
                  <div class="requirements-content">${request.additional_details}</div>
                </div>
                
                <button class="process-btn" onclick="processBooking('${request.id}')">
                  Process Booking
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <script>
          // Simulate Ten Maid portal functionality
          console.log('Ten Maid Lifestyle Manager Portal loaded');
          console.log('Ten Maid Manager: Sarah Mitchell (Lifestyle Manager)');
          console.log('Session: tenmaid_session_abc123');
          
          function processBooking(id) {
            alert('Processing booking #' + id + '\\nThis would normally send confirmation emails, update member profiles, charge payment methods, etc.');
          }
          
          // Simulate sensitive Ten Maid data
          localStorage.setItem('authToken', 'maid_token_xyz789');
          localStorage.setItem('memberDatabase', 'access_granted');
          document.cookie = 'maidSession=abc123; adminLevel=manager; memberAccess=full';
          
          document.addEventListener('DOMContentLoaded', function() {
            console.log('Dashboard ready. Processing ' + ${requests.length} + ' member requests.');
            console.log('⚠️  WARNING: This page will execute any JavaScript found in member requests!');
          });
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching dining requests:', error);
    res.status(500).send('Server error');
  }
});

// Secure Staff Dashboard - WITH CSP NONCE PROTECTION (simulates Lambda@Edge nonce injection)
app.get('/secure/maid', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM olr_requests ORDER BY created_at DESC');
    const requests = result.rows;
    
    // Generate a cryptographic nonce for CSP
    const nonce = crypto.randomBytes(16).toString('base64');
    
    // Set strict CSP headers with nonce for both scripts and styles (production approach)
    res.setHeader('Content-Security-Policy', `script-src 'nonce-${nonce}' 'strict-dynamic'; style-src 'nonce-${nonce}'; object-src 'none'; base-uri 'none';`);
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta http-equiv="Content-Security-Policy" content="script-src 'nonce-${nonce}' 'strict-dynamic'; style-src 'nonce-${nonce}'; object-src 'none'; base-uri 'none';">
        <title>Ten Maid - Lifestyle Manager Portal (Secure)</title>
        <style nonce="${nonce}">
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          :root {
            --primary-color: #4a3d5c;
            --primary-light: #6b5b8a;
            --accent-color: #6366f1;
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --bg-tertiary: #f1f5f9;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --text-muted: #94a3b8;
            --border-light: #e2e8f0;
            --border-medium: #cbd5e1;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
            --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 25px rgba(0,0,0,0.12);
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 16px;
            --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
            color: var(--text-primary);
            line-height: 1.6;
          }
          
          .header-nav { 
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
            color: white; 
            padding: 16px 0;
            box-shadow: var(--shadow-md);
            position: relative;
            overflow: hidden;
          }
          
          .nav-content { 
            max-width: 1400px; 
            margin: 0 auto; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 0 24px;
            position: relative;
            z-index: 1;
          }
          
          .logo { 
            font-size: 2rem; 
            font-weight: 700; 
            letter-spacing: 3px; 
            background: linear-gradient(45deg, #ffffff, #e2e8f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .maid-info {
            display: flex;
            align-items: center;
            gap: 16px;
            color: rgba(255,255,255,0.9);
          }
          
          .maid-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
          }
          
          .security-indicator {
            background: var(--success-color);
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            margin-left: 16px;
          }
          
          .main-content { 
            max-width: 1400px; 
            margin: 0 auto; 
            padding: 48px 24px; 
          }
          
          .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
          }
          
          .dashboard-title {
            font-size: 2.5rem;
            font-weight: 600;
            color: var(--text-primary);
            letter-spacing: -0.025em;
          }
          
          .stats-bar {
            display: flex;
            gap: 24px;
          }
          
          .stat-card {
            background: var(--bg-primary);
            padding: 20px 24px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
            text-align: center;
            border: 1px solid var(--border-light);
          }
          
          .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent-color);
            margin-bottom: 4px;
          }
          
          .stat-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          
          
          .requests-grid {
            display: grid;
            gap: 24px;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          }
          
          .request-card { 
            background: var(--bg-primary);
            border: 2px solid var(--border-light); 
            padding: 24px; 
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-md);
            transition: var(--transition);
            position: relative;
          }
          
          .request-card:hover {
            border-color: var(--accent-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
          
          .request-status {
            position: absolute;
            top: 16px;
            right: 16px;
            background: var(--warning-color);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          .client-info {
            margin-bottom: 20px;
          }
          
          .client-name { 
            font-weight: 700; 
            font-size: 1.25rem;
            color: var(--text-primary);
            margin-bottom: 4px;
          }
          
          .request-date {
            color: var(--text-muted);
            font-size: 0.875rem;
          }
          
          .booking-details {
            background: var(--bg-secondary);
            padding: 16px;
            border-radius: var(--radius-sm);
            margin: 16px 0;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            font-size: 0.95rem;
          }
          
          .detail-label {
            color: var(--text-secondary);
            font-weight: 500;
          }
          
          .detail-value {
            color: var(--text-primary);
            font-weight: 600;
          }
          
          .special-requirements {
            background: #fef3c7;
            border-left: 4px solid var(--warning-color);
            padding: 16px;
            border-radius: var(--radius-sm);
            margin: 16px 0;
          }
          
          .requirements-label {
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .requirements-content {
            color: var(--text-primary);
            line-height: 1.5;
            white-space: pre-wrap;
          }
          
          .process-btn {
            background: linear-gradient(135deg, var(--success-color), #059669);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: var(--radius-sm);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            width: 100%;
            margin-top: 16px;
          }
          
          .process-btn:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
          }
        </style>
      </head>
      <body>
        <nav class="header-nav">
          <div class="nav-content">
            <div class="logo">TEN MAID</div>
            <div class="maid-info">
              <span>Sarah Mitchell - Concierge Manager</span>
              <div class="maid-avatar">SM</div>
              <div class="security-indicator">🔒 SECURE</div>
            </div>
          </div>
        </nav>
        <div class="main-content">
          <div class="dashboard-header">
            <h1 class="dashboard-title">Lifestyle Manager Portal</h1>
            <div class="stats-bar">
              <div class="stat-card">
                <div class="stat-number">${requests.length}</div>
                <div class="stat-label">Pending</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Today</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">89%</div>
                <div class="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
          <div class="requests-grid">
            ${requests.map(request => `
              <div class="request-card">
                <div class="request-status">PENDING</div>
                <div class="client-info">
                  <div class="client-name">${request.client_name}</div>
                  <div class="request-date">Submitted ${request.created_at.toLocaleDateString('en-GB', { 
                    weekday: 'long',
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>
                
                <div class="booking-details">
                  <div class="detail-row">
                    <span class="detail-label">Restaurant:</span>
                    <span class="detail-value">${request.destination}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Date & Time:</span>
                    <span class="detail-value">${request.date_time ? new Date(request.date_time).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'TBD'}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Guests:</span>
                    <span class="detail-value">${request.passengers}</span>
                  </div>
                </div>
                
                <div class="special-requirements">
                  <div class="requirements-label">
                    🍽️ Special Requirements & Dietary Notes
                  </div>
                  <div class="requirements-content">${request.additional_details}</div>
                </div>
                
                <button class="process-btn" onclick="processBooking('${request.id}')">
                  Process Booking
                </button>
              </div>
            `).join('')}
          </div>
        </div>
        <script nonce="${nonce}">
          // Simulate Ten Maid portal functionality - SECURE VERSION (Production approach)
          console.log('🔒 Ten Maid Lifestyle Manager Portal loaded (SECURE - Production CSP)');
          console.log('Ten Maid Manager: Sarah Mitchell (Lifestyle Manager)');
          console.log('Session: tenmaid_session_abc123');
          console.log('🛡️ Strict CSP Active: Nonce injected into all elements (scripts, styles, meta)');
          
          function processBooking(id) {
            alert('Processing booking #' + id + '\\nThis would normally send confirmation emails, update member profiles, charge payment methods, etc.');
          }
          
          // Simulate sensitive Ten Maid data
          localStorage.setItem('authToken', 'maid_token_xyz789');
          localStorage.setItem('memberDatabase', 'access_granted');
          document.cookie = 'maidSession=abc123; adminLevel=manager; memberAccess=full';
          
          document.addEventListener('DOMContentLoaded', function() {
            console.log('Dashboard ready. Processing ' + ${requests.length} + ' member requests.');
            console.log('🔒 Production CSP Active: All inline content requires valid nonce');
          });
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching dining requests:', error);
    res.status(500).send('Server error');
  }
});

// Post OLR endpoint
app.post('/olr', async (req, res) => {
  try {
    const { request_type, client_name, pickup_location, destination, date_time, passengers, additional_details } = req.body;
    const secure = req.query.secure === 'true';
    
    if (!additional_details || additional_details.trim() === '') {
      return res.status(400).send('Additional details are required');
    }

    // Store the OLR request as-is (no sanitization - this is the vulnerability)
    await pool.query(`
      INSERT INTO olr_requests (request_type, client_name, pickup_location, destination, date_time, passengers, additional_details) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [request_type, client_name, pickup_location || '', destination || '', date_time || null, passengers || 1, additional_details]);
    
    // Redirect back to appropriate page
    res.redirect(secure ? '/secure' : '/');
  } catch (error) {
    console.error('Error submitting OLR:', error);
    res.status(500).send('Server error');
  }
});

// Clear requests endpoint (for demo purposes)
app.post('/clear', async (req, res) => {
  try {
    await pool.query('DELETE FROM olr_requests WHERE id > 4'); // Keep sample data
    res.redirect('/');
  } catch (error) {
    console.error('Error clearing requests:', error);
    res.status(500).send('Server error');
  }
});

// Start server
async function startServer() {
  await initDB();
  app.listen(port, () => {
    console.log(`XSS Demo App running on port ${port}`);
    console.log(`Member portal: http://localhost:${port}/`);
    console.log(`Ten Maid portal (vulnerable): http://localhost:${port}/maid`);
    console.log(`Ten Maid portal (secure): http://localhost:${port}/secure/maid`);
  });
}

startServer().catch(console.error);