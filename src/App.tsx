/**
 * Psychomantic Platform — portail développeur (platform.psychomantic.com)
 * Vitrine B2B : API IshtarEngine, Remote MCP, showroom des widgets UI.
 * Les payloads du showroom sont de vrais calculs IshtarEngine (DE440),
 * servis en statique : zéro clé exposée, zéro quota consommé.
 */

import { useState } from 'react';
import {
  PsychomanticNatalChart,
  PsychomanticMatrixGrid,
  PayloadViewer,
  type ChartResponse,
  type MatrixResponse,
} from '@psychomantic/ui-react';
import chartSample from './chart-sample.json';
import matrixSample from './matrix-sample.json';

const chart = chartSample as unknown as ChartResponse;
const matrix = matrixSample as unknown as MatrixResponse;

type ShowroomTab = 'natal' | 'matrix' | 'payload';

const SHOWROOM_TABS: { id: ShowroomTab; label: string }[] = [
  { id: 'natal', label: 'Roue natale' },
  { id: 'matrix', label: 'Matrice du Destin' },
  { id: 'payload', label: 'Inspecteur JSON' },
];

function Header() {
  return (
    <header className="pf-header">
      <div className="container">
        <a className="pf-logo" href="/">
          Psycho<span>Mantic</span>
        </a>
        <span className="pf-badge-beta">Platform</span>
        <nav className="pf-nav">
          <a href="#api">API</a>
          <a href="#mcp">MCP</a>
          <a href="#widgets">Widgets</a>
          <a href="https://api.psychomantic.com/docs">Docs API</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pf-hero">
      <div className="container">
        <h1>
          Le moteur d'éphémérides <em>le plus précis du marché</em>,<br />
          pour vos applications et vos agents IA
        </h1>
        <p>
          API REST et serveur MCP propulsés par NASA JPL DE440. Précision certifiée
          contre JPL Horizons, widgets UI prêts à l'emploi, et la Matrice du Destin
          en exclusivité mondiale.
        </p>
        <div className="pf-hero-metrics">
          <div className="pf-metric">
            <strong>0,110″</strong>
            <span>erreur moyenne certifiée JPL</span>
          </div>
          <div className="pf-metric">
            <strong>10</strong>
            <span>outils MCP pour agents IA</span>
          </div>
          <div className="pf-metric">
            <strong>-53 %</strong>
            <span>de tokens en mode compact</span>
          </div>
          <div className="pf-metric">
            <strong>3</strong>
            <span>widgets UI exportables</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiSection() {
  return (
    <section className="pf-section" id="api">
      <div className="container">
        <h2>API REST IshtarEngine</h2>
        <p>
          Calculs astronomiques certifiés : thèmes natals, transits, synastries,
          astrocartographie, astéroïdes, Matrice du Destin. Authentification par clé
          API, quotas par tier, documentation OpenAPI complète.
        </p>
        <div className="pf-cards">
          <div className="pf-card">
            <h3>Un appel, un thème complet</h3>
            <p>Payload unique typé : 10 planètes, maisons, aspects, angles.</p>
            <pre>{`curl -X POST https://api.psychomantic.com/v1/astro/natal \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ish_live_..." \\
  -d '{"date":"1990-06-15","time":"14:30",
       "latitude":48.8566,"longitude":2.3522,
       "timezone":"Europe/Paris"}'`}</pre>
          </div>
          <div className="pf-card">
            <h3>Précision certifiée NASA</h3>
            <p>
              Erreur moyenne de 0,110 seconde d'arc mesurée contre JPL Horizons,
              le système de référence mondial. 13 fois sous les standards du marché.
            </p>
            <pre>{`Méthodologie publique :
docs/PRECISION_CERTIFICATION.md
(9 corps × 3 époques, QUANTITIES=31)`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function McpSection() {
  return (
    <section className="pf-section" id="mcp">
      <div className="container">
        <h2>Serveur Remote MCP pour agents IA</h2>
        <p>
          Branchez Claude, ChatGPT, Gemini, Cursor ou n8n directement sur le moteur.
          Catalogue public gratuit, appels authentifiés par clé, mode compact
          pour réduire les coûts de tokens de 53 %.
        </p>
        <div className="pf-cards">
          <div className="pf-card">
            <h3>Connexion en une commande</h3>
            <p>Streamable HTTP, aucune installation locale.</p>
            <pre>{`claude mcp add-json psychomantic '{
  "type": "http",
  "url": "https://api.psychomantic.com/mcp",
  "headers": {"X-API-Key": "ish_live_..."}
}'`}</pre>
          </div>
          <div className="pf-card">
            <h3>10 outils, dont l'exclusivité</h3>
            <p>
              Natal, transits, astrocartographie, astéroïdes, phase lunaire,
              géocodage, Yi King, heures miroirs… et la Matrice du Destin,
              absente de toutes les autres API du marché.
            </p>
            <pre>{`tools/list : public et gratuit
tools/call : 1 appel = 1 requête de quota
compact: true sur tous les outils`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function WidgetsSection() {
  const [tab, setTab] = useState<ShowroomTab>('natal');

  return (
    <section className="pf-section" id="widgets">
      <div className="container">
        <h2>Widgets UI exportables</h2>
        <p>
          Package <code>@psychomantic/ui-react</code> (MIT) : nos composants visuels,
          stateless et thémables, chez vous en trois lignes. Showroom ci-dessous sur
          de vrais calculs IshtarEngine.
        </p>
        <div className="pf-tabs" role="tablist">
          {SHOWROOM_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className="pf-tab"
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="pf-showroom-stage">
          {tab === 'natal' && (
            <PsychomanticNatalChart data={chart} size={640} theme="light" />
          )}
          {tab === 'matrix' && (
            <PsychomanticMatrixGrid data={matrix} theme="light" />
          )}
          {tab === 'payload' && (
            <PayloadViewer payload={chart} view="json" theme="light" />
          )}
        </div>
        <div className="pf-cards" style={{ marginTop: 16 }}>
          <div className="pf-card">
            <h3>Intégration en 3 lignes</h3>
            <pre>{`import { PsychomanticNatalChart } from '@psychomantic/ui-react';
import '@psychomantic/ui-react/styles.css';

<PsychomanticNatalChart data={chart} theme="auto" />`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pf-footer">
      <div className="container">
        <span>© 2026 Psychomantic — Kossmonot. Tous droits réservés.</span>
        <span>
          <a href="https://psychomantic.com">psychomantic.com</a>
          {' · '}
          <a href="https://api.psychomantic.com/docs">Documentation API</a>
          {' · '}
          <a href="https://github.com/kossmonot-founder/psychomantic-ui">@psychomantic/ui-react</a>
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ApiSection />
        <McpSection />
        <WidgetsSection />
      </main>
      <Footer />
    </>
  );
}
