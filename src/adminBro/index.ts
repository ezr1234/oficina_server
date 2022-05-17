import AdminBro, { AdminBroOptions } from "admin-bro";

import AdminBroExpress from "@admin-bro/express";
import AdminBroMongoose from "@admin-bro/mongoose";
import BoardModel from "../models/BoardModel";
import DataModel from "../models/DataModel";
import { Express } from "express";

const isSuper = ({ currentAdmin, record }) => {
  return currentAdmin && currentAdmin.role === "super";
};

const baseNaviagation = {
  name: "Base",
  icon: "Chip",
};

const registerAdminBro = (app: Express) => {
  AdminBro.registerAdapter(AdminBroMongoose);
  const AdminBroOptions: AdminBroOptions = {
    resources: [
      {
        resource: BoardModel,
        options: {
          navigation: baseNaviagation,
          listProperties: [],
          properties: {},
          actions: {
            new: {
              isAccessible: false,
            },
            edit: {
              guard: "Are you sure you want to do this?",
            },
            delete: {
              guard: "Are you sure you want to do this?",
            },
          },
        },
      },
      {
        resource: DataModel,
        options: {
          navigation: baseNaviagation,
          listProperties: ["data", "board", "createdAt"],
          properties: {},
          actions: {
            new: {},
            edit: {
              guard: "Are you sure you want to do this?",
            },
            delete: {
              guard: "Are you sure you want to do this?",
            },
          },
        },
      },
    ],
    rootPath: "/",
    loginPath: "/login",
    logoutPath: "/logout",
    branding: {
      companyName: "Oficina",
    },
  };

  const adminBro = new AdminBro(AdminBroOptions);

  const router = AdminBroExpress.buildRouter(adminBro);

  app.use(adminBro.options.rootPath, router);
};
export default registerAdminBro;
