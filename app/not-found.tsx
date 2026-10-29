import Link from "next/link";

export default function NotFound() {
  return (
    <main className="nf">
      <h1 style={{ fontSize: "clamp(32px,5vw,48px)" }}>Página não encontrada</h1>
      <p className="muted">O endereço pode ter mudado. Volte para a página inicial para conhecer a planilha.</p>
      <Link className="btn btn-primary" href="/">Ir para a página inicial</Link>
    </main>
  );
}
