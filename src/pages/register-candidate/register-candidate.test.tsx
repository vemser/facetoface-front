import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { RegisterCandidate } from ".";

describe("Tela Cadastro de candidato", () => {
  test("Verificar se o titulo está no documento", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );
    expect(document.title).toBe("Cadastro de candidato");
  });

  test("Encontrar o input da foto", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText("Foto");

    expect(input).toBeInTheDocument();
  });

  test("Encontrar o input de nome completo", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText("Nome completo");
    expect(input).toBeInTheDocument();
  });

  test("Encontrar o input de cidade", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText("Cidade");
    expect(input).toBeInTheDocument();
  });

  test("Encontrar o input de estado", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText("Estado");
    expect(input).toBeInTheDocument();
  });

  test("Encontrar o inputs de gênero", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const feminino = screen.getByLabelText("Feminino");
    const masculino = screen.getByLabelText("Masculino");

    expect(feminino).toBeInTheDocument();
    expect(masculino).toBeInTheDocument();
  });

  test("Encontrar o input de email", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText("E-mail do candidato");
    expect(input).toBeInTheDocument();
  });

  test("Encontrar o input de CV", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText("CV");
    expect(input).toBeInTheDocument();
  });

  test("Encontrar o input de edição vem ser", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByPlaceholderText("Edição vem ser");
    expect(input).toBeInTheDocument();
  });

  test("Encontrar input de turma escolhida", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );
    const front = screen.getByLabelText("Front");
    const back = screen.getByLabelText("Back");
    const qa = screen.getByLabelText("QA");

    expect(front).toBeInTheDocument();
    expect(back).toBeInTheDocument();
    expect(qa).toBeInTheDocument();
  });

  test("Encontrar o input de linguagens de programação", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText(
      "Linguagens de programação que você conhece"
    );
    expect(input).toBeInTheDocument();
  });

  test("Encontrar o input de observações", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );

    const input = screen.getByLabelText("Observações / Lembretes");
    expect(input).toBeInTheDocument();
  });

  test("Encontrar o botão", () => {
    render(
      <Router>
        <RegisterCandidate />
      </Router>
    );
    const button = screen.getByText("Enviar");

    expect(button).toBeVisible();
    expect(button).toBeInTheDocument();
  });
});
