import {ErrorMessage} from "./index"
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

test("verifica se o error-message existe e se ele recebe as props", () => {
    render(
    <Router>
        <ErrorMessage  
        id="teste" 
        width="20%" 
        marginLeft="3%" 
        
        >Teste</ErrorMessage>
    </Router>);

    const componente = screen.getByRole("span");
    expect(componente).toBeInTheDocument();
})
  