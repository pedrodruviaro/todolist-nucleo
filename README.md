# TodoList

- Layouts -> porque não um único?

- Perfomance

  - AsyncComponents -> LazyDialogConfirm

- Estados de loading (HOC) (excalidraw maybe?)

```vue
<TodoFormCreateLoader :loading="loading">
  <TodoFormCreate v-model="todo" @submited="handleCreateTodo" :loading="false" />
</TodoFormCreateLoader>
```
