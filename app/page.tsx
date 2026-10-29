import Image from "next/image";
import { site, priceNumber, promoAtiva, precoAtual } from "@/lib/site";
import { rotatingWords, pains, steps, included, forWho, faqs } from "@/lib/content";
import Icon from "@/components/Icon";
import Header from "@/components/Header";
import Effects from "@/components/Effects";
import RotatingWord from "@/components/RotatingWord";
import BuyLink from "@/components/BuyLink";
import Simulator from "@/components/Simulator";
import ModuleTabs from "@/components/ModuleTabs";
import Countdown from "@/components/Countdown";
import MobileBar from "@/components/MobileBar";
import Consent from "@/components/Consent";
import { PromoProvider, Price, IfPromo, IfNotPromo } from "@/components/Promo";

// Gera a página de novo a cada 10 minutos, para o preço e os dados do Google
// acompanharem a virada da oferta mesmo sem novo deploy.
export const revalidate = 600;

const marquee = ["Lançamentos", "Painel financeiro", "Limite do MEI", "Precificação", "Pró-labore", "Contas a pagar", "Contas a receber", "Controle do DAS", "Saldo em caixa"];

function jsonLd() {
  const url = site.url + "/";
  const ativa = promoAtiva();
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": url + "#org", name: site.name, url, logo: site.url + "/apple-icon.png", email: site.email },
      { "@type": "WebSite", "@id": url + "#site", url, name: site.name, inLanguage: "pt-BR", publisher: { "@id": url + "#org" } },
      {
        "@type": "Product",
        name: site.product,
        description:
          "Planilha financeira para MEI e autônomos no Excel e Google Planilhas, com lançamentos, painel de lucro, precificação, pró-labore, contas a pagar e a receber, controle do DAS e alerta do limite anual do MEI.",
        image: site.url + "/opengraph-image.jpg",
        brand: { "@type": "Brand", name: site.name },
        category: "Planilhas de gestão financeira",
        offers: {
          "@type": "Offer",
          price: priceNumber(precoAtual()),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          ...(ativa ? { priceValidUntil: site.fimOferta.slice(0, 10) } : {}),
          url: url + "#oferta",
          seller: { "@id": url + "#org" }
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
      }
    ]
  };
}

export default function Home() {
  const { precoDe, precoPor } = site;
  const atual = precoAtual();
  return (
    <PromoProvider end={site.fimOferta} de={precoDe} por={precoPor} initialActive={promoAtiva()}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header price={atual} />

      <main id="conteudo">
        {/* HERO */}
        <section className="hero" aria-labelledby="titulo">
          <div className="hero-bg" aria-hidden="true"><div className="orb orb-a" /><div className="orb orb-b" /><div className="grid-bg" /></div>
          <div className="wrap">
            <span className="pill load" style={{ ["--d" as string]: ".05s" }}><b>2027</b> Excel e Google Planilhas · para MEI e autônomos</span>
            <h1 id="titulo" className="load" style={{ ["--d" as string]: ".15s" }}>
              <span className="kw">Planilha financeira para MEI</span>
              Saiba quanto o seu negócio <RotatingWord words={rotatingWords} />
            </h1>
            <p className="lead load" style={{ ["--d" as string]: ".3s" }}>
              Registre entradas e saídas em poucos minutos por semana e deixe a planilha calcular o resto: o lucro do mês, o preço ideal de cada produto, as contas a vencer e quanto falta para o limite de R$ 81 mil do MEI.
            </p>
            <div className="cta-row load" style={{ ["--d" as string]: ".45s" }}>
              <BuyLink price={atual}>Quero a planilha por R$ <Price /><Icon name="arrow" strokeWidth={2.4} /></BuyLink>
              <div className="trust">
                <span><Icon name="check" size={16} strokeWidth={2.6} className="ok" />Acesso imediato</span>
                <span><Icon name="check" size={16} strokeWidth={2.6} className="ok" />Pagamento único, sem mensalidade</span>
                <span><Icon name="check" size={16} strokeWidth={2.6} className="ok" />7 dias de garantia</span>
              </div>
            </div>
            <div className="stage load" id="stage" style={{ ["--d" as string]: ".6s" }}>
              <div className="chip chip-1" aria-hidden="true">
                <span className="ico" style={{ background: "rgba(120,214,150,.15)", color: "var(--ok)" }}><Icon name="check" size={16} strokeWidth={2.6} /></span>
                <span>Dentro do limite do MEI<small>7,5% de R$ 81.000 utilizado</small></span>
              </div>
              <div className="chip chip-2" aria-hidden="true">
                <span className="ico" style={{ background: "rgba(242,166,90,.15)", color: "var(--accent)" }}><Icon name="tag" size={16} /></span>
                <span>Bolo de aniversário 2 kg<small>Preço saudável · margem de 24,5%</small></span>
              </div>
              <div className="chip chip-3" aria-hidden="true">
                <span className="ico" style={{ background: "rgba(70,199,202,.15)", color: "var(--teal)" }}><Icon name="calendar" size={16} /></span>
                <span>DAS de janeiro pago<small>Próximo vencimento: dia 20</small></span>
              </div>
              <div className="device" id="device">
                <div className="dots" aria-hidden="true"><i /><i /><i /></div>
                <Image
                  src="/img/menu.webp"
                  width={1600}
                  height={827}
                  priority
                  sizes="(max-width: 1100px) 100vw, 1050px"
                  alt="Menu da planilha financeira do MEI com faturamento, lucro, uso do limite, saldo em caixa e os módulos Lançamentos, Painel, Contas, DAS, Precificação, Pró-labore, Configurações e Ajuda"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>

        {/* NÚMEROS */}
        <section className="band" aria-label="A planilha em números">
          <div className="wrap">
            <div className="stats reveal">
              <div className="stat"><strong data-count="8">8</strong><span>módulos integrados</span></div>
              <div className="stat"><strong data-count="3264" data-sep="">3.264</strong><span>fórmulas prontas</span></div>
              <div className="stat"><strong data-count="2">2</strong><span>versões incluídas: Excel e Google Planilhas</span></div>
              <div className="stat"><strong data-count="7">7</strong><span>dias de garantia incondicional</span></div>
            </div>
          </div>
        </section>

        {/* DORES */}
        <section className="band" style={{ paddingTop: 0 }} aria-labelledby="dores">
          <div className="wrap">
            <div className="head reveal">
              <h2 id="dores">Você trabalha muito. Mas sabe quanto sobra?</h2>
              <p className="lead">Estas são as situações mais comuns entre microempreendedores, e todas têm uma solução simples.</p>
            </div>
            <div className="grid g4">
              {pains.map((p, i) => (
                <article className="card reveal" key={p.title} style={{ ["--d" as string]: i * 0.08 + "s" }}>
                  <span className="icon"><Icon name={p.icon} size={22} strokeWidth={2} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SIMULADOR */}
        <section className="band band-alt" id="simulador" aria-labelledby="sim-t">
          <div className="wrap">
            <div className="sim reveal">
              <div className="sim-copy">
                <span className="eyebrow">Simulador gratuito</span>
                <h2 id="sim-t" style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>Quanto do limite do MEI você já usaria?</h2>
                <p className="muted">
                  Informe o seu faturamento médio mensal e veja a projeção para o ano. Na planilha, esse cálculo é feito com os seus números reais, mês a mês, com alerta automático a partir de 80% do limite.
                </p>
              </div>
              <Simulator />
            </div>
          </div>
        </section>

        {/* MÓDULOS */}
        <section className="band" id="recursos" aria-labelledby="rec-t">
          <div className="wrap">
            <div className="head reveal">
              <span className="eyebrow">Conheça a planilha</span>
              <h2 id="rec-t">Tudo o que um MEI precisa para controlar o dinheiro, em um só arquivo</h2>
            </div>
            <ModuleTabs />
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="band band-alt" aria-labelledby="como-t">
          <div className="wrap">
            <div className="head reveal">
              <span className="eyebrow">Como funciona</span>
              <h2 id="como-t">Simples de usar desde o primeiro dia</h2>
              <p className="lead">Cerca de 10 minutos por semana são suficientes para manter tudo em dia.</p>
            </div>
            <div className="steps reveal" id="steps">
              {steps.map((s) => (
                <article className="card" key={s.n}>
                  <span className="step-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INCLUSO */}
        <section className="band" aria-labelledby="inc-t">
          <div className="wrap">
            <div className="head reveal">
              <h2 id="inc-t">O que está incluído</h2>
              <p className="lead">Você recebe tudo por e-mail, logo após a confirmação do pagamento.</p>
            </div>
            <div className="grid g3">
              {included.map((it, i) => (
                <article className="card reveal" key={it.title} style={{ ["--d" as string]: (i % 3) * 0.06 + "s" }}>
                  {it.tag ? <span className="tag">{it.tag}</span> : <span className="icon"><Icon name={it.icon} size={22} strokeWidth={2} /></span>}
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PARA QUEM */}
        <section className="band" style={{ paddingTop: 0 }} aria-label="Para quem é a planilha">
          <div className="wrap who">
            <article className="card who-yes reveal">
              <h2 style={{ fontSize: 28 }}>Indicada para</h2>
              <ul className="checks">
                {forWho.yes.map((t) => <li key={t}><Icon name="check" strokeWidth={2.6} /><span>{t}</span></li>)}
              </ul>
            </article>
            <article className="card who-no reveal" style={{ ["--d" as string]: ".08s" }}>
              <h2 style={{ fontSize: 28 }}>Não indicada para</h2>
              <ul className="checks">
                {forWho.no.map((t) => <li key={t}><Icon name="x" strokeWidth={2.6} /><span>{t}</span></li>)}
              </ul>
            </article>
          </div>
        </section>

        {/* OFERTA */}
        <section className="band band-alt" id="oferta" aria-labelledby="of-t">
          <div className="wrap">
            <div className="offer reveal">
              <div className="offer-in">
                <IfPromo>
                  <span className="live"><i />Condição especial de Black Friday</span>
                  <Countdown end={site.fimOferta} />
                </IfPromo>
                <IfNotPromo>
                  <span className="live"><i />Acesso imediato após o pagamento</span>
                </IfNotPromo>
                <h2 id="of-t" style={{ fontSize: "clamp(26px,3vw,34px)" }}>{site.product}</h2>
                <p className="muted">Planilha para Excel + versão Google Planilhas + 3 bônus</p>
                <div className="price">
                  <IfPromo><span className="muted">de <s>R$ {precoDe}</s> por</span></IfPromo>
                  <strong><sup>R$</sup><Price /></strong>
                  <span className="muted" style={{ fontSize: 15 }}>Pagamento único. Sem mensalidade.</span>
                </div>
                <BuyLink className="btn btn-primary btn-lg" price={atual}>Garantir minha planilha<Icon name="arrow" size={22} strokeWidth={2.4} /></BuyLink>
                <div className="pay" aria-label="Formas de pagamento"><span>Pix</span><span>Cartão de crédito</span><span>Boleto</span></div>
                <div className="guarantee">
                  <Icon name="shield" size={42} strokeWidth={1.8} />
                  <p><strong>Garantia incondicional de 7 dias.</strong> Experimente a planilha com calma. Se ela não atender o seu negócio, solicite o reembolso pela plataforma de pagamento e receba 100% do valor.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="band" id="duvidas" aria-labelledby="faq-t">
          <div className="wrap narrow">
            <div className="head reveal"><h2 id="faq-t">Perguntas frequentes</h2></div>
            <div className="faq reveal">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}<i aria-hidden="true">+</i></summary>
                  <p className="ans">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="muted" style={{ textAlign: "center", marginTop: 28 }}>
              Ainda tem dúvidas? Escreva para <strong style={{ color: "var(--fg)" }}>{site.email}</strong>
            </p>
          </div>
        </section>

        {/* FECHAMENTO */}
        <section className="band band-alt final" aria-labelledby="fim-t">
          <div className="hero-bg" aria-hidden="true"><div className="orb orb-a" style={{ left: "20%", top: -300 }} /></div>
          <div className="wrap" style={{ position: "relative" }}>
            <h2 id="fim-t" className="reveal">Comece 2027 com as finanças do seu negócio organizadas</h2>
            <BuyLink className="btn btn-primary reveal" price={atual}>Quero a planilha por R$ <Price /><Icon name="arrow" strokeWidth={2.4} /></BuyLink>
            <small>Acesso imediato · Pagamento único · 7 dias de garantia</small>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {site.name} · {site.empresa} · CNPJ {site.cnpj}</span>
          <span>Atendimento: {site.email} · <a href="/politica-de-privacidade">Política de privacidade</a></span>
          <p>Esta planilha é uma ferramenta de organização financeira e não substitui a orientação de um contador. Valores de referência do MEI: Portal do Empreendedor (gov.br).</p>
        </div>
      </footer>

      <MobileBar />
      <Consent gaId={site.gaId} pixelId={site.pixelId} />
      <Effects />
    </PromoProvider>
  );
}
