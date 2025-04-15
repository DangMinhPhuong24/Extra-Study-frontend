const student = [
    {
        path: "/",
        component: () => import("../layouts/student.vue"),
        children: [
            // home
            {
                path: "home",
                name: "student-home",
                component: () => import("../pages/student/home.vue")
            },

            // Danh sách đăng ký
            {
                path: "student-registers",
                name: "student-registers",
                component: () => import("../pages/student/registerusers/index.vue")
            },

            // Thời khóa biểu
            {
                path: "timetable",
                name: "student-timetable",
                component: () => import("../pages/student/timetable/index.vue")
            },

            // Thông tin cá nhân
            {
                path: "profile",
                name: "student-profile",
                component: () => import("../pages/student/profile/index.vue")
            },
        ]
    }
];

export default student;