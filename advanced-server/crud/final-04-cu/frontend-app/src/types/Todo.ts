export type Todo = {
  id: number;
  title: string;
  tag: string;
  content: string;
};

export type TodoDetail = Todo & {
  content: string;
};
