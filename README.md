## 🧠 Chat GitGuru com IA integrada

Este projeto inclui um **agente de IA chamado GitGuru**, que responde dúvidas sobre Git usando modelos de linguagem via [OpenRouter](https://openrouter.ai).

### ✅ Tecnologias utilizadas no Chat:

- OpenRouter API
- Modelo: `mistralai/mistral-7b-instruct`
- Integração via `fetch` usando a estrutura compatível com OpenAI

---

### ⚙️ Como configurar a IA no projeto

1. Acesse: [https://openrouter.ai](https://openrouter.ai)
2. Crie uma conta (Google/GitHub)
3. Gere uma nova chave de API em **API Keys**
4. Crie um arquivo `.env` na raiz do projeto com o conteúdo:

```env
VITE_OPENROUTER_API_KEY=org-sua-chave-aqui
```
