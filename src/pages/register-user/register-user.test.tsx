import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { RegisterUser } from ".";

describe("Tela Cadastro de usuário", () => {
    test("Verificar se o titulo está no documento", () => {
        render(
          <Router>
            <RegisterUser/>
          </Router>
        )
        expect(document.title).toBe("Cadastro de usuário");
      });

      test("Encontrar o input da foto", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Foto");
    
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de nome completo", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Nome completo");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de cidade", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Cidade");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de estado", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Estado");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de gênero feminino", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Feminino");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de gênero masculino", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Masculino");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de email", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Email");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de gestão de pessoas", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Gestão de pessoas");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de instrutor", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Instrutor");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o input de instrutor", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
    
        const input = screen.getByLabelText("Instrutor");
        expect(input).toBeInTheDocument();
      });

      test("Encontrar o botão", () => {
        render(
          <Router>
            <RegisterUser />
          </Router>
        );
        const button = screen.getByRole("button");
    
        expect(button).toBeVisible();
        expect(button).toBeInTheDocument();
      });


      
})