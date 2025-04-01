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
                path: "registers",
                name: "student-registers",
                component: () => import("../pages/student/registerusers/index.vue")
            },
        ]
    }
];

export default student;