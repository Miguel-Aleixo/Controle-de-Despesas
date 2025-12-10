import { NextFunction, Request, Response, Router } from "express";
import { buscarCategorias } from "../controller/categoriaController";
import { buscarUsuarios } from "../controller/userController";

const router = Router();

// Middleware para proteger rotas
function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) return res.redirect("/usuario/login");
    next();
}

router.get("/inicio", requireAuth, (req, res) => {
    res.render("dashboard/inicio", {
        user: req.session.user,
        activePage: "inicio"
    });
});

router.get("/cadastrar_categoria", requireAuth, (req, res) => {
    res.render("dashboard/cadastrar_categoria", {
        user: req.session.user,
        activePage: "cadastrar_categoria"
    });
});

router.get("/listar", requireAuth, async (req, res) => {
    const categorias = await buscarCategorias();
    const usuarios = await buscarUsuarios()

    res.render("dashboard/listar", {
        user: req.session.user,
        activePage: "listar",
        categorias: categorias,
        usuarios: usuarios
    });
});

router.get("/configuracoes", requireAuth, (req, res) => {
    res.render("dashboard/configuracoes", {
        user: req.session.user,
        activePage: "configuracoes"
    });
});

export { router as dashboardRoutes };
