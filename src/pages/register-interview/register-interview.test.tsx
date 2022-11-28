import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { RegisterInterview } from ".";

describe("Tela Cadastro de usuário", () => {
    test("Verificar se o titulo está no documento", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        )
        expect(document.title).toBe("Cadastro de entrevista");
      });

      test("Encontrar o input candidato", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByLabelText("Candidato");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de email", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByLabelText("E-mail do usuário");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de data da entrevista", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByLabelText("Data da entrevista");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de horario da entrevista", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByLabelText("Horário da entrevista");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de Cidade", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByLabelText("Cidade");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de Estado", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByLabelText("Estado");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de Observações / Lembretes", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByLabelText("Observações / Lembretes");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o mensagem de submit", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
    
        const input = screen.getByText("Após a finalização do cadastro, o candidato receberá um e-mail para confirmar a entrevista.");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o botão", () => {
        render(
          <Router>
            <RegisterInterview/>
          </Router>
        );
        const button = screen.getByTestId ('button-submit-testid-register-interview');
    
        expect(button).toBeVisible();
        expect(button).toBeInTheDocument();
      });


      
})