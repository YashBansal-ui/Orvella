const employees = [
  { id: 'PH-0248', name: 'Aarav Mehta', initials: 'AM', email: 'aarav.mehta@orvella.demo', department: 'Engineering', designation: 'Frontend Developer', joined: '12 Mar 2024', status: 'Active', location: 'Delhi' },
  { id: 'PH-0247', name: 'Priya Sharma', initials: 'PS', email: 'priya.sharma@orvella.demo', department: 'People & Culture', designation: 'HR Executive', joined: '08 Jan 2023', status: 'Active', location: 'Delhi' },
  { id: 'PH-0246', name: 'Rohan Verma', initials: 'RV', email: 'rohan.verma@orvella.demo', department: 'Finance', designation: 'Accountant', joined: '02 Nov 2026', status: 'Onboarding', location: 'Gurugram' },
  { id: 'PH-0245', name: 'Maya Kapoor', initials: 'MK', email: 'maya.kapoor@orvella.demo', department: 'Marketing', designation: 'Brand Strategist', joined: '19 Aug 2022', status: 'Active', location: 'Noida' },
  { id: 'PH-0244', name: 'Dev Patel', initials: 'DP', email: 'dev.patel@orvella.demo', department: 'Operations', designation: 'Operations Lead', joined: '17 Jun 2021', status: 'Inactive', location: 'Delhi' },
  { id: 'PH-0243', name: 'Sana Iyer', initials: 'SI', email: 'sana.iyer@orvella.demo', department: 'Engineering', designation: 'QA Engineer', joined: '03 Feb 2025', status: 'Active', location: 'Delhi' }
];

const leaveRequests = [
  { id: 'LR-1082', name: 'Karan Malhotra', initials: 'KM', department: 'Engineering', type: 'Annual leave', days: 2, dates: '06–07 Nov 2026', start: '2026-11-06', end: '2026-11-07', status: 'Pending', note: 'I have a family commitment and will complete pending work before my leave.' },
  { id: 'LR-1081', name: 'Sana Iyer', initials: 'SI', department: 'Engineering', type: 'Sick leave', days: 1, dates: '05 Nov 2026', start: '2026-11-05', end: '2026-11-05', status: 'Pending', note: 'I need a day to recover and rest.' },
  { id: 'LR-1080', name: 'Dev Patel', initials: 'DP', department: 'Operations', type: 'Annual leave', days: 3, dates: '12–14 Nov 2026', start: '2026-11-12', end: '2026-11-14', status: 'Pending', note: 'Planned personal travel.' },
  { id: 'LR-1079', name: 'Neha Joshi', initials: 'NJ', department: 'Marketing', type: 'Personal leave', days: 1, dates: '10 Nov 2026', start: '2026-11-10', end: '2026-11-10', status: 'Approved', note: 'Personal appointment.' }
];

const leaveBalances = [
  { type: 'Annual leave', remaining: 14, total: 20, color: 'purple' },
  { type: 'Sick leave', remaining: 6, total: 10, color: 'blue' },
  { type: 'Personal leave', remaining: 2, total: 5, color: 'green' }
];

const dashboardData = {
  admin: {
    metrics: [
      { label: 'Active employees', value: '248', note: '+12 this month', tone: 'positive', icon: 'users' },
      { label: 'Departments', value: '12', note: 'Across 4 locations', tone: 'neutral', icon: 'layers' },
      { label: 'Open leave requests', value: '18', note: '6 need attention', tone: 'warning', icon: 'calendar' },
      { label: 'Attendance today', value: '94.6%', note: '+2.4% vs last week', tone: 'positive', icon: 'clock' }
    ],
    tableTitle: 'Recently added employees', tableAction: 'View directory',
    rows: [
      { name: 'Aarav Mehta', initials: 'AM', detail: 'Engineering', date: '04 Nov 2026', status: 'Active', tone: 'success' },
      { name: 'Priya Sharma', initials: 'PS', detail: 'People & Culture', date: '03 Nov 2026', status: 'Active', tone: 'success' },
      { name: 'Rohan Verma', initials: 'RV', detail: 'Finance', date: '02 Nov 2026', status: 'Onboarding', tone: 'info' }
    ],
    insightTitle: 'Department distribution', insightDescription: 'Headcount across your largest teams',
    insights: [{label:'Engineering',value:'78 people',percent:78,color:'purple'},{label:'Sales & Marketing',value:'54 people',percent:54,color:'blue'},{label:'Operations',value:'42 people',percent:42,color:'green'}],
    activity: [{time:'10:24 AM',text:'New employee added to Engineering',tag:'Employee'},{time:'09:50 AM',text:'Leave policy updated by HR',tag:'Policy'},{time:'Yesterday',text:'Quarterly report was generated',tag:'Report'}]
  },
  hr: {
    metrics: [
      { label: 'Employee records', value: '248', note: 'All records up to date', tone: 'neutral', icon: 'users' },
      { label: 'New joiners', value: '08', note: 'This month', tone: 'positive', icon: 'user-plus' },
      { label: 'Pending leave requests', value: '18', note: '6 awaiting review', tone: 'warning', icon: 'calendar' },
      { label: 'Onboarding tasks', value: '03', note: '2 due this week', tone: 'warning', icon: 'clipboard' }
    ],
    tableTitle: 'Leave requests to review', tableAction: 'Open requests',
    rows: [
      { name: 'Maya Kapoor', initials: 'MK', detail: 'Annual leave', date: '06–08 Nov', status: 'Pending', tone: 'warning' },
      { name: 'Arjun Nair', initials: 'AN', detail: 'Sick leave', date: '05 Nov', status: 'Pending', tone: 'warning' },
      { name: 'Neha Joshi', initials: 'NJ', detail: 'Personal leave', date: '10 Nov', status: 'Approved', tone: 'success' }
    ],
    insightTitle: "Today's attendance", insightDescription: 'Attendance overview · 04 November',
    insights: [{label:'Present',value:'216',percent:87,color:'green'},{label:'Working remotely',value:'18',percent:7,color:'blue'},{label:'Absent / on leave',value:'14',percent:6,color:'amber'}],
    activity: [{time:'11:02 AM',text:'3 leave requests are waiting for review',tag:'Leave'},{time:'09:42 AM',text:'Attendance sync completed successfully',tag:'Attendance'},{time:'Yesterday',text:'6 new employee profiles created',tag:'People'}]
  },
  manager: {
    metrics: [
      { label: 'Team members', value: '08', note: 'Across 2 functions', tone: 'neutral', icon: 'users' },
      { label: 'Pending approvals', value: '03', note: 'Action required', tone: 'warning', icon: 'calendar' },
      { label: 'Team attendance', value: '96%', note: 'Above company average', tone: 'positive', icon: 'clock' },
      { label: 'On leave today', value: '02', note: '1 annual · 1 sick', tone: 'neutral', icon: 'coffee' }
    ],
    tableTitle: 'Leave approval queue', tableAction: 'Review all',
    rows: [
      { name: 'Karan Malhotra', initials: 'KM', detail: 'Annual leave · 2 days', date: '06–07 Nov', status: 'Pending', tone: 'warning' },
      { name: 'Sana Iyer', initials: 'SI', detail: 'Sick leave · 1 day', date: '05 Nov', status: 'Pending', tone: 'warning' },
      { name: 'Dev Patel', initials: 'DP', detail: 'Annual leave · 3 days', date: '12–14 Nov', status: 'Pending', tone: 'warning' }
    ],
    insightTitle: 'Team availability', insightDescription: 'Current availability across your team',
    insights: [{label:'Available',value:'05',percent:62,color:'green'},{label:'Working remotely',value:'01',percent:13,color:'blue'},{label:'On leave',value:'02',percent:25,color:'amber'}],
    activity: [{time:'10:15 AM',text:'Karan Malhotra submitted a leave request',tag:'Leave'},{time:'09:35 AM',text:'Team attendance was updated',tag:'Attendance'},{time:'Yesterday',text:'Sana Iyer completed onboarding',tag:'People'}]
  },
  employee: {
    metrics: [
      { label: 'Annual leave balance', value: '14 days', note: 'Available to use', tone: 'positive', icon: 'calendar' },
      { label: 'Sick leave balance', value: '06 days', note: 'Available to use', tone: 'neutral', icon: 'heart' },
      { label: 'Attendance this month', value: '96%', note: '20 of 21 working days', tone: 'positive', icon: 'clock' },
      { label: 'Pending requests', value: '02', note: 'Waiting for approval', tone: 'warning', icon: 'hourglass' }
    ],
    tableTitle: 'My recent leave requests', tableAction: 'View history',
    rows: [
      { name: 'Annual leave', initials: 'AL', detail: '2 working days', date: '14–15 Oct', status: 'Approved', tone: 'success' },
      { name: 'Sick leave', initials: 'SL', detail: '1 working day', date: '28 Oct', status: 'Approved', tone: 'success' },
      { name: 'Annual leave', initials: 'AL', detail: '3 working days', date: '18–20 Nov', status: 'Pending', tone: 'warning' }
    ],
    insightTitle: 'Leave balance', insightDescription: 'Your remaining time off for 2026',
    insights: [{label:'Annual leave',value:'14 / 20',percent:70,color:'purple'},{label:'Sick leave',value:'06 / 10',percent:60,color:'blue'},{label:'Personal leave',value:'02 / 05',percent:40,color:'green'}],
    activity: [{time:'Today',text:'Your attendance was marked present',tag:'Attendance'},{time:'28 Oct',text:'Sick leave request was approved',tag:'Leave'},{time:'24 Oct',text:'Profile information was updated',tag:'Profile'}]
  }
};

module.exports = { employees, leaveRequests, leaveBalances, dashboardData };
