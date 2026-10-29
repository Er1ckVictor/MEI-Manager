import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o site MEI no Controle trata dados pessoais e cookies, de acordo com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" }
};

export default function Privacidade() {
  return (
    <main className="doc">
      <Link className="brand" href="/">← MEI no Controle</Link>
      <h1>Política de Privacidade</h1>
      <p>Última atualização: 29 de outubro de 2026.</p>
      <p>
        Esta política explica como o site {site.name}, mantido por {site.empresa}{site.cnpj ? `, CNPJ ${site.cnpj}` : ""}, trata dados pessoais,
        de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>Dados coletados</h2>
      <ul>
        <li><strong>Navegação:</strong> se você aceitar os cookies de medição, coletamos informações como páginas visitadas, tipo de dispositivo e origem da visita, por meio do Google Analytics e/ou do Pixel da Meta.</li>
        <li><strong>Compra:</strong> nome, e-mail, CPF e dados de pagamento são coletados diretamente pela {site.plataforma}, que possui política de privacidade própria. Não temos acesso aos dados do seu cartão.</li>
        <li><strong>Planilha:</strong> as informações financeiras que você registra na planilha ficam no seu computador ou na sua conta Google e não são enviadas para nós.</li>
      </ul>

      <h2>Finalidades</h2>
      <ul>
        <li>Entregar o produto adquirido e prestar atendimento.</li>
        <li>Entender quais canais trazem visitantes e aprimorar o site e as campanhas.</li>
      </ul>

      <h2>Cookies</h2>
      <p>Os cookies de medição só são ativados após o seu consentimento no aviso exibido no site. Você pode recusá-los ou apagá-los a qualquer momento nas configurações do navegador.</p>

      <h2>Compartilhamento</h2>
      <p>Compartilhamos dados apenas com os serviços necessários para operar o site e processar as vendas: a {site.plataforma} e, se você aceitar os cookies, Google e Meta. Não vendemos dados pessoais.</p>

      <h2>Seus direitos</h2>
      <p>Você pode solicitar acesso, correção ou exclusão dos seus dados e revogar o consentimento a qualquer momento pelo e-mail {site.email}.</p>
    </main>
  );
}
