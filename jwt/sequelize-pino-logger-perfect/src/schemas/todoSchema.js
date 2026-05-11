import { z } from 'zod';

export const createTodoBodySchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().max(255).optional().default(''),
  tag: z.string().max(255).optional().default(''),
});

export const updateTodoBodySchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(255).optional(),
  content: z.string().max(255).optional(),
  tag: z.string().max(255).optional(),
});

export const todoIdParamsSchema = z.object({
  todoId: z.coerce.number().int().positive(),
});

export const listTodoQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional().default(''),
});

export const countTodoQuerySchema = z.object({
  search: z.string().optional().default(''),
});
