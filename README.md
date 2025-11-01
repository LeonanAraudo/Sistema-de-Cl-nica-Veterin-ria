# Sistema de Clínica Veterinária

## 🐾 Sobre o Projeto
Este é um sistema de gestão para uma clínica veterinária, desenvolvido como uma SPA (Single Page Application) utilizando Vue.js 3. O objetivo é permitir o cadastro, listagem e gerenciamento de pets, tutores e consultas, simulando uma integração com uma API mockada localmente.O sistema foi desenvolvido para uso em interfaces desktop, mas o design também oferece suporte para dispositivos móveis.
---

## 🚀 Funcionalidades

### 📋 Cadastro
- **Pets**: Nome, espécie, raça, idade e tutor (selecionado a partir de uma lista).
- **Tutores**: Nome completo, telefone, e-mail e endereço.
- **Consultas**: Pet, data, hora, veterinário e motivo/observações.

### 📄 Listagem
- Exibição de listas de pets, tutores e consultas.
- Botões para editar e excluir itens diretamente na tabela.
- Modal com detalhes ao clicar em um item.

### 🔍 Busca
- Campo de busca integrado para filtrar os dados exibidos nas tabelas.

### 🖥️ Responsividade
- Layout responsivo, adaptado para diferentes tamanhos de tela.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Vue.js 3**: Framework JavaScript para construção de interfaces reativas.
- **Pinia**: Gerenciamento de estado para os dados da aplicação.
- **PrimeVue**: Biblioteca de componentes UI modernos e responsivos.
- **CSS Moderno**: Flexbox para estilização e responsividade.

### Backend Simulado
- **JSON Server**: API mockada para simular operações de CRUD.

### Ferramentas Adicionais
- **Vue3-Toastify**: Exibição de notificações de sucesso e erro.

---

## 📂 Estrutura do Projeto
```
vue-project/
├── public/                # Arquivos estáticos
├── src/
│   ├── components/        # Componentes Vue
│   │   ├── forms/         # Formulários de cadastro
│   │   ├── tables/        # Tabelas de listagem
│   │   ├── layout/        # Layout principal
│   ├── router/            # Configuração de rotas
│   ├── service/           # Serviços para comunicação com a API
│   ├── stores/            # Gerenciamento de estado com Pinia
│   ├── composables/       # Funções reutilizáveis (composables)
│   ├── views/             # Páginas principais
├── db.json                # Banco de dados mockado
├── vite.config.js         # Configuração do Vite
└── package.json           # Dependências do projeto
```

---

## 🧪 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado na máquina.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/LeonanAraudo/Sistema-de-Cl-nica-Veterin-ria.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd Sistema-de-Cl-nica-Veterin-ria/vue-project
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor JSON:
   ```bash
   json-server --watch db.json --port 3000
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse a aplicação no navegador:
   ```
   http://localhost:5173
   ```

