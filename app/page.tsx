import { CitationList } from "@/components/citation-list";
import { conversations, sources, viewer } from "@/data/fixtures";

type HomeProps = {
  searchParams?: Promise<{
    conversation?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = searchParams ? await searchParams : {};
  const requestedConversation = Array.isArray(params.conversation)
    ? params.conversation[0]
    : params.conversation;
  const activeConversation =
    conversations.find((conversation) => conversation.id === requestedConversation) ?? conversations[0];

  return (
    <main className="page-shell">
      <aside className="sidebar" aria-label="Conversations">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Internal Knowledge Assistant</h1>
          <p className="workspace-pill">Acme Workspace</p>
        </div>

        <nav>
          {conversations.map((conversation) => (
            <a
              className={conversation.id === activeConversation.id ? "conversation active" : "conversation"}
              href={`/?conversation=${conversation.id}`}
              key={conversation.id}
            >
              {conversation.title}
            </a>
          ))}
        </nav>
      </aside>

      <section className="conversation-panel" aria-labelledby="conversation-title">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Question</p>
            <h2 id="conversation-title">{activeConversation.question}</h2>
          </div>
          <div className="viewer-context" aria-label="Current viewer">
            <span>{viewer.displayName}</span>
            <span>{viewer.role}</span>
          </div>
        </header>

        <article className="answer-block">
          <p className="eyebrow">Assistant Answer</p>
          <p>{activeConversation.answer.body}</p>
        </article>

        <section className="sources-block" aria-labelledby="sources-title">
          <h3 id="sources-title">Sources</h3>
          <CitationList answer={activeConversation.answer} sources={sources} viewer={viewer} />
        </section>
      </section>
    </main>
  );
}
