import { createWebHistory, createRouter } from "vue-router"
import HomeComponent from "@/components/HomeComponent"
import LoginComponent from "@/components/LoginComponent"
import RegisterComponent from "@/components/RegisterComponent"
import HackathonComponent from "@/components/HackathonComponent"
import TeamsComponent from "@/components/TeamsComponent"
import ProfileComponent from "@/components/ProfileComponent"
import ForgotPasswordComponent from "@/components/ForgotPasswordComponent"
import ChangePasswordComponent from "@/components/ChangePasswordComponent"


const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeComponent,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent,
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: ForgotPasswordComponent,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ChangePasswordComponent,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterComponent,
  },
  {
    path: "/hackathon/:id",
    name: "Hackathon",
    component: HackathonComponent,
  },
  {
    path: "/teams/:id",
    name: "Teams",
    component: TeamsComponent,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileComponent,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = localStorage.user;
  if (requiresAuth && !isAuthenticated) {
      next("/login");
  } else {
      next();
  }
});

export default router;