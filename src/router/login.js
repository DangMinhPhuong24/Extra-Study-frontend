const login = [
    {
        children: [
            // login
            {
                path: "/",
                name: "login",
                component: () => import("../pages/login.vue")
            },
            // register
            {
                path: "/register",
                name: "register",
                component: () => import("../pages/register.vue")
            },
            // forgot password
            {
                path: "/forgot-password",
                name: "ForgotPassword",
                component: () => import("../pages/ForgotPassword.vue")
            },
            //reset password
            {
                path: "/reset-password/:token",
                name: "ResetPassword",
                component: () => import("../pages/ResetPassword.vue")
            }
        ]
    }
];

export default login;