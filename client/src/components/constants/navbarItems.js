import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BugReportIcon from '@mui/icons-material/BugReport';

const navbarItems = [
  {
    id: 0,
    text: 'Projects',
    icon: <DashboardIcon />,
    link: '/dashboard/projects'
  }, {
    id: 1,
    text: 'Assigned to me',
    icon: <AssignmentIcon />,
    link: '/dashboard/assigned'
  }, {
    id: 2,
    text: 'Submitted by me',
    icon: <BugReportIcon />,
    link: '/dashboard/submitted'
  },
]

export default navbarItems