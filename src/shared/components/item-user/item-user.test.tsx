import { ItemUser } from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

test("verifica se o item-user existe e se ele recebe as props", () => {
    render(
        <Router>
            <ItemUser
                props={{
                    nomeCompleto: "Josefa",
                    cidade: "Igarassu",
                    estado: "string",
                    genero: "FEMININO",
                    email: "string",
                    trilha: { nome: "string" },
                    perfis: [{nome: "FRONTEND"}],
                    idUsuario: 13,
                    ativo: "T",
                }}
            ></ItemUser>
        </Router>
    );
    const nome = screen.getByText("Josefa");
    expect(nome).toBeInTheDocument();
});