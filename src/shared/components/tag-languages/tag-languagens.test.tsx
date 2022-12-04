import { TagLanguages } from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

test("verifica se tag-linguagens existe e se ele recebe as props", () => {
    render(
        <Router>
            <TagLanguages
                    language = "JAVA"
                    onClick=""
            ></TagLanguages>
        </Router>
    );
    const nome = screen.getByText("JAVA");
    expect(nome).toBeInTheDocument();
});