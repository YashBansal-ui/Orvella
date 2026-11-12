const express = require('express');
const path = require('path');
const { dashboardData, employees, leaveRequests, leaveBalances } = require('./data');
const iconSvg = require('./icons');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const roles = {
  admin: {
    label: 'Admin', title: 'Workforce overview', subtitle: 'A high-level view of your people, departments and operations.',
    nav: [['Overview','/admin','grid'],['Employees','/hr/employees','users'],['Departments','#','layers'],['Leave management','/manager/leaves','calendar'],['Attendance','#','clock'],['Reports','#','chart'],['User roles','#','shield']], active: 'Overview', action: 'Add employee'
  },
  hr: {
    label: 'HR', title: 'People operations', subtitle: 'Manage employee records, onboarding, attendance and leave.',
    nav: [['Overview','/hr','grid'],['Employee directory','/hr/employees','users'],['Onboarding','#','user-plus'],['Leave requests','/manager/leaves','calendar'],['Attendance','#','clock'],['Reports','#','chart'],['Settings','#','settings']], active: 'Overview', action: 'Add employee'
  },
  manager: {
    label: 'Manager', title: 'Team dashboard', subtitle: 'Keep track of your team and respond to requests.',
    nav: [['Overview','/manager','grid'],['My team','#','users'],['Leave approvals','/manager/leaves','calendar'],['Attendance','#','clock'],['Team reports','#','chart']], active: 'Overview', action: 'View team'
  },
  employee: {
    label: 'Employee', title: 'My workspace', subtitle: 'Your profile, attendance and time-off information in one place.',
    nav: [['My dashboard','/employee','grid'],['My profile','#','user'],['Attendance','#','clock'],['Apply for leave','/employee/leave/apply','calendar-plus'],['Leave history','#','history'],['Documents','#','file']], active: 'My dashboard', action: 'Apply for leave'
  }
};

function renderDashboard(req, res, role) {
  res.render('dashboard', {
    page: roles[role], role,
    data: dashboardData[role],
    employees,
    leaveBalances,
    notice: req.query.notice || ''
  });
}

app.get('/', (req, res) => res.redirect('/admin'));
app.get('/login', (req, res) => res.render('login', { error: '' }));
app.post('/login', (req, res) => res.redirect('/admin?notice=Welcome%20to%20the%20Orvella%20demo'));
app.get('/admin', (req, res) => renderDashboard(req, res, 'admin'));
app.get('/hr', (req, res) => renderDashboard(req, res, 'hr'));
app.get('/manager', (req, res) => renderDashboard(req, res, 'manager'));
app.get('/employee', (req, res) => renderDashboard(req, res, 'employee'));

app.get('/hr/employees', (req, res) => {
  res.render('employees', {
    page: { label: 'HR', title: 'Employee directory', subtitle: 'Find, review and maintain employee records across the organisation.' },
    role: 'hr', employees, notice: req.query.notice || '', iconSvg
  });
});

app.get('/manager/leaves', (req, res) => {
  res.render('leaves', {
    page: { label: 'Manager', title: 'Leave approvals', subtitle: 'Review requests from your team and make a clear decision.' },
    role: 'manager', leaveRequests, notice: req.query.notice || '', iconSvg
  });
});

app.get('/employee/leave/apply', (req, res) => {
  res.render('leave-form', {
    page: { label: 'Employee', title: 'Request time off', subtitle: 'Submit a leave request for your manager to review.' },
    role: 'employee', leaveBalances, notice: req.query.notice || '', iconSvg
  });
});

app.post('/employee/leave/apply', (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  if (!leaveType || !startDate || !endDate || !reason) {
    return res.redirect('/employee/leave/apply?notice=Please%20complete%20all%20fields');
  }
  res.redirect('/employee?notice=Your%20leave%20request%20has%20been%20submitted%20in%20this%20demo');
});

app.listen(PORT, () => console.log(`Orvella frontend running at http://localhost:${PORT}`));
