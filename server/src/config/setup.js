import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose"
import * as Models from "../model/index.js"
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";
import { light, dark, noSidebar } from "@adminjs/themes";

AdminJS.registerAdapter(AdminJSMongoose)

export const admin = new AdminJS(


    {
        resources: [
            {
                resource: Models.Customer,
                options: {
                    listProperties: ["isActivated", "role", "phone"],
                    filterProperties: ["isActivated", "phone"],
                    navigation: "Customers"
                }
            },
            {
                resource: Models.DeliveryPartner,
                options: {
                    listProperties: ["email", "role", "isActivated"],
                    filterProperties: ["email", "role", "isActivated"],

                }
            },
            {
                resource: Models.Admin,
                options: {
                    listProperties: ["email", "role", "isActivated"],
                    filterProperties: ["email", "role", "isActivated"],

                }
            },
            {
                resource: Models.Branch,
                resource: Models.Product,
                resource: Models.Category ,
            },
        ],
        branding: {
            companyName: "Blinkit",
            withMadeWithLove: false,
            logo: "/logo.png",
            // favicon: "/favicon.ico",
        },
        defaultTheme: dark.id,
        availableThemes: [light, dark, noSidebar],
        rootPath: "/admin",
    }
)

export const buildAdminRouter = async (app) => {
    await AdminJSFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,

            cookieName: "adminjs",
            cookiePassword: COOKIE_PASSWORD,
        },
        app,
        {
            store: sessionStore,
            saveUninitialized: false,
            secret: COOKIE_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            }
        }
    )
}