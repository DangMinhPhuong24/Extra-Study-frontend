const login = [
    {
        children: [
            // login
            {
                path: "/",
                name: "login",
                component: () => import("../pages/login.vue")
            },
        ]
    }
];

export default login;