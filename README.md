# TodoList

- Demo: https://todolist-nucleo.netlify.app/

## Plano de Implementação

### Estrutura do Projeto

- components => componentes contendo loaders (HOC) seguem o padrão `index.vue` + `Loader.vue`.

- composables => todos os composables da aplicação. Separados por features ou global (sem pastas). Composables como` useTodoCreate.ts` chamam uma action da store que chama um serviço.

- directives => diretivas Vue (Ex. Auto focus).

- layouts => seguem o conceito do Nuxt de múltiplos layouts (admin, default, etc). Nesse caso, temos apenas um, que controla a parte visual do app.

- services => camada contendo chamadas para a api, tipos e adapters (quando necessário).

- stores => gerenciamento de estados globais, se comunicam com os serviços.

- views => todas as telas da aplicação.

### Bibliotecas e Ferramentas

- Utilizei VueJS como framework JS (com TypeScript).

- Para animações, UI/UX e ínoces => @tailwindcss, @formkit/auto-animate, @vueuse/core, @iconify/vue.

- Gerenciamento de estado => Pinia.

- Validações => Zod.

- API => Axios.

### Gerenciamento de Estado

- Não vejo como necessário para a aplicação, porém usei com a finalidade de aumentar um pouco a complexidade. Nesse contexto, usaria apenas os composables dentro das screens (views) chamando a camada de serviço. Dessa forma, conseguimos controlar melhor os estados de loading, errors, validações, etc.

### Otimização e Performance

#### Code splitting a nível de rota

- não aplicado pois só temos uma página, mas seguiria o padrão:

```ts
const router = createRouter({
  routes: [{ path: '/about', component: () => import('@/views/AboutView.vue') }],
})
```

#### Async components (LazyLoading)

- Forma nativa do Vue de carregar componentes assíncronos. Uso o prefixo `Lazy` para entender no template.

```ts
const LazyDialogConfirm = defineAsyncComponent({ loader: () => import('@/components/Dialog/Confirm.vue') })
```

### Acessibilidade

- Tomei cuidado com contraste das cores.

- Estados de hover e principalmente focus.

- Uso do componente `Tooltip`, criado para mostrar as labels dos botões de ícones.

- Uso de `aria-label="Tarefa"` no input de criação, visto que não utilizei a tag `label`.

- Modal de confirmação de apagar todo.

  - uso do `<Teleport to="body">` para colocar o componente mais pra cima no DOM.

  - uso de `role="dialog"` e `aria-modal="true"` para melhorar a acessibilidade em leitores de tela.

  - atalhos de teclado com `@keydown.esc="isOpen = false"` para fechar a modal.

  - implementação de `focus trap` para manter o foco apenas dentro do modal e não em componentes de fora. Isso previne o click em lugares indevidos.

#### Trabalhando com loading

- utilizo de HOC para envolver os componentes que precisam do dado e exibir um skeleton ou loader (dependendo do layout). O padrão segue:

```vue
<TodoListLoader :loading="loadingTodos">
  <TodoList v-auto-animate v-if="todos.length > 0">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :id="todo.id"
      :todo="todo.todo"
      :completed="todo.completed"
      @complete="(id: string) => todosStore.completeTodo(id)"
      @remove="handleRemove"
    />
  </TodoList>

  <p class="opacity-80" v-else>Sem tarefas por aqui</p>
</TodoListLoader>
```

- `TodoListLoader` renderiza um _skeleton_ ou o `<slot />` contendo a lista, dependendo do valor de **loading**.

### Extra

#### Lazy Loading de Componentes

- Pontos citados acima, utilizo a forma nativa com `defineAsyncComponent`.

#### Uso de Hooks Personalizados

- Muitos dos problemas em Vue são resolvidos com a biblioteca [Vue Use](https://vueuse.org/). Deixei um hook (`useClickOutside.ts`) como exemplo de funcionalidade própria.

- Gosto de separar as features em pequenos composables quando posso: usePostCreate, usePostEdit, usePostList, etc... Nesse caso, como temos apenas uma view, separei algumas funcionalidades em composables e outras mantive na view por conta do gerenciamento de modal, estado, etc.

## Teste prático

![todolist](https://utfs.io/f/GMvi6tcKj6u3EnFhH2tzPZXVolI0vQ5N2xp98hGus6qt3JUa)

## Instalação

Versões

- Node 20+
- Yarn 1.22

Para rodar o projeto

```
$ yarn

$ yarn dev
```

Para rodar a API (JSON Server)

```
$ yarn db
```

## Observações finais

- Não consegui implementar os testes com Jest/Vitest por falta de familiaridade (faz algum tempo que não escrevo testes) e tempo.

- Algumas funcionalidades (edição de todo, por exemplo) ficaram de fora. A implementação seguiria a ideia: ao clicar no botão de edição, o form é populado com os valores (via emits do Vue) e o mesmo composable de criação seria adaptado para fazer a função, já que ele possui a validação e lógica de estado dentro dele.

- Algunas estados de loading ficaram pendentes: botão de deletar/completar. A lógica seria extrair a funcionalidade para um composable que faria a chamada à store e teria um loading interno para tratar isso.
  - Como citei anteriormente, gosto de trabalhar com vários composables, um para cada pequena feature.
