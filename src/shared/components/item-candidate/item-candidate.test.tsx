import { ItemCandidate } from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

test("verifica se o item-candidate existe e se ele recebe as props", () => {
    render(
        <Router>
            <ItemCandidate
                props={{
                    nomeCompleto: "string",
                    cidade: "string",
                    estado: "string",
                    genero: "string",
                    email: "string",
                    observacoes: "string",
                    linguagens: [{ nome: "string" }],
                    trilha: { nome: "string" },
                    edicao: { nome: "string" },
                    idCandidato: 13,
                    notaProva: 10,
                    ativo: "string",
                }}
                onDetail=""
                onDelete=""
                onUpdate=""
                onInterview=""
            ></ItemCandidate>
        </Router>
    );

    const titulo = screen.getByText("Marcar");
    expect(titulo).toBeInTheDocument();
});