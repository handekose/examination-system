//Admin imports
import AdminDashboard from './views/admin/dashboard';
import AdminUserAdd from './views/admin/user/UserAdd';
import AdminUserEdit from './views/admin/user/UserEdit';
import AdminUserList from './views/admin/user/UserList';
import AdminCouseList from './views/admin/course/CourseList';
import AdminCourseAdd from './views/admin/course/CourseAdd';
import AdminCourseEdit from './views/admin/course/CourseEdit';
import AdminEnrollmentAdd from './views/admin/enrollment/EnrollmentAdd';
import AdminEnrollmentList from './views/admin/enrollment/EnrollmentList';

//Teacher imports
import TeacherDashboard from './views/teacher/dashboard';
import TeacherExamAdd from './views/teacher/exam/ExamAdd';
import TeacherExamEdit from './views/teacher/exam/ExamEdit';
import TeacherExamList from './views/teacher/exam/ExamList';
import TeacherCourseList from './views/teacher/course/CourseList';
import TeacherCourseDetail from './views/teacher/course/CourseDetail';
import TeacherAnswerSheet from './views/teacher/course/AnswerSheet';
import TeacherStudentInformation from './views/teacher/course/StudentInformation';

//Student imports
import StudentDashboard from './views/student/dashboard';
import StudentCourses from './views/student/enrollment/EnrollmentList';
import StudentCourseDetail from './views/student/enrollment/CourseDetail';
import StudentExams from './views/student/exam/ExamList';
import Exam from './views/student/exam/Exam';
import StudentAnswerSheet from './views/student/exam/AnswerSheet';


const dashboardRoutes = [
  //Admin
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: AdminUserList,
    layout: "/admin",
  },
  {
    path: "/users/add",
    name: "User Add",
    icon: "nc-icon nc-notes",
    component: AdminUserAdd,
    layout: "/admin",
    hideInMenu: true
  },
  {
    path: "/users/edit",
    name: "User Edit",
    icon: "nc-icon nc-paper-2",
    component: AdminUserEdit,
    layout: "/admin",
    hideInMenu: true
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "nc-icon nc-paper-2",
    component: AdminCouseList,
    layout: "/admin",
  },
  {
    path: "/courses/add",
    name: "Course Add",
    icon: "nc-icon nc-paper-2",
    component: AdminCourseAdd,
    layout: "/admin",
    hideInMenu: true
  },
  {
    path: "/courses/edit",
    name: "Course Edit",
    icon: "nc-icon nc-paper-2",
    component: AdminCourseEdit,
    layout: "/admin",
    hideInMenu: true
  },
  {
    path: "/enrollments",
    name: "Enrollment List",
    icon: "nc-icon nc-bullet-list-67",
    component: AdminEnrollmentList,
    layout: "/admin",
  },
  {
    path: "/enrollments/add",
    name: "Enrollment Add",
    icon: "nc-icon nc-paper-2",
    component: AdminEnrollmentAdd,
    layout: "/admin",
    hideInMenu: true
  },
  //Student
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: StudentDashboard,
    layout: "/student",
  },
  {
    path: "/enrollments",
    name: "Student Courses",
    icon: "nc-icon nc-notes",
    component: StudentCourses,
    layout: "/student",
  },
  {
    path: "/enrollments/detail",
    name: "Student Courses",
    icon: "nc-icon nc-notes",
    component: StudentCourseDetail,
    layout: "/student",
    hideInMenu: true
  },
  {
    path: "/exams/list",
    name: "Student Exams",
    icon: "nc-icon nc-bullet-list-67",
    component: StudentExams,
    layout: "/student",
  },
  {
    path: "/exam/takeExam",
    name: "Student Exam",
    icon: "nc-icon nc-paper-2",
    component: Exam,
    layout: "/student",
    hideInMenu: true

  },
  {
    path: "/exam/result",
    name: "Student Answer Sheet",
    icon: "nc-icon nc-paper-2",
    component: StudentAnswerSheet,
    layout: "/student",
    hideInMenu: true

  },
  //Teacher
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: TeacherDashboard,
    layout: "/teacher",
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "nc-icon nc-notes",
    component: TeacherCourseList,
    layout: "/teacher",
  },
  {
    path: "/courses/detail",
    name: "Course Detail",
    icon: "nc-icon nc-circle-09",
    component: TeacherCourseDetail,
    layout: "/teacher",
    hideInMenu: true
  },
  {
    path: "/courses/answerSheet",
    name: "Answer Sheet",
    icon: "nc-icon nc-circle-09",
    component: TeacherAnswerSheet,
    layout: "/teacher",
    hideInMenu: true
  },
  {
    path: "/courses/getStudentInfo",
    name: "Answer Sheet",
    icon: "nc-icon nc-circle-09",
    component: TeacherStudentInformation,
    layout: "/teacher",
    hideInMenu: true
  },
  {
    path: "/exams",
    name: "Exams",
    icon: "nc-icon nc-bullet-list-67",
    component: TeacherExamList,
    layout: "/teacher",
  },
  {
    path: "/exams/add",
    name: "Exam Add",
    icon: "nc-icon nc-chart-pie-35",
    component: TeacherExamAdd,
    layout: "/teacher",
    hideInMenu: true
  },
  {
    path: "/exams/edit",
    name: "User Edit",
    icon: "nc-icon nc-paper-2",
    component: TeacherExamEdit,
    layout: "/teacher",
    hideInMenu: true
  }
];

export default dashboardRoutes;
