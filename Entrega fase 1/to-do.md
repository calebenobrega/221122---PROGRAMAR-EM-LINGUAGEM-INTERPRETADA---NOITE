# Entrega Fase 1 - Sistema de Gerenciamento de Estoque

> **Bom dia, pessoal!** Informações importantes para a primeira entrega.

## [*] Instruções Iniciais

1. **Formação de Grupos**: Conforme orientação em sala de aula, vocês devem formar dois grupos:
   - Um grupo com **3 alunos**
   - Um grupo com **4 alunos**

## [>>] Requisitos da Entrega

### Implementação do CRUD
- Implementar o **CRUD** completo da aplicação de gerenciamento de estoque
- Tipo de estoque é **livre** - vocês podem escolher:
  - E-commerce
  - Loja de roupas
  - Supermercado
  - Outro segmento à escolha

### [+] Entidades Obrigatórias

**Item do Estoque:**
```javascript
item = { 
  id: 1, 
  descrição: '', 
  quantidade: 0, 
  preco: 0.0, 
  ativo: true 
}
```

**Usuário do Sistema:**
```javascript
usuário = { 
  id: 1, 
  nome: '', 
  username: '', 
  password: '' 
}
```

### [*] Funcionalidades Obrigatórias

- [ ] **Registrar uma venda** - O sistema deve permitir registrar vendas
- [ ] **Histórico de vendas/compras** - Mostrar histórico completo (similar a histórico de compras em e-commerce)
- [ ] **Persistência de dados** - Salvar dados usando `localStorage`

### [#] Escopo

- > **Foco apenas nos scripts `.js`** - Não precisa focar em HTML/CSS
- > **Envio**: Arquivos completos do projeto
- > **Apresentação**: Funcionamento em sala de aula (grupos apresentam)