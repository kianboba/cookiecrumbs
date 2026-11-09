import { useDocumentTitle } from "../../hooks/useDocumentTitle.js";
import { Container } from "../common/Container.jsx";
import { Section } from "../common/Section.jsx";

export function PageShell({ title, children }) {
  useDocumentTitle(title);
  return (
    <Section>
      <Container>{children}</Container>
    </Section>
  );
}
