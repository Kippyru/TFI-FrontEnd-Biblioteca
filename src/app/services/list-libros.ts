import { computed, Injectable, signal } from '@angular/core';
import { listLibros } from '../model/listLibros.model';

type Filters = 'todos' | 'prestados' | 'libres';
export interface Stats {
  total: number;
  libres: number;
  prestados: number;
}

@Injectable({
  providedIn: 'root',
})
export class ListLibrosService {
  private readonly lista = signal<listLibros[]>([]);
  readonly filter = signal<Filters>('todos');

  readonly filteredList = computed(() => {
    const f = this.filter();
    const items = this.lista();
    if (f === 'prestados') return items.filter((item) => !item.libres);
    if (f === 'libres') return items.filter((item) => item.libres); 
    return items;
  });

  readonly stats = computed(() => {
    const items = this.lista();
    return {
       total: items.length,
       libres: items.filter(item => item.libres).length,
       prestados: items.filter(item => item.libres).length,
       };
  });

  add(title: string) {
    const t = title.trim();
    if (!t) return;
    const lista: listLibros = {
      id: crypto.randomUUID(),
      title,
      libres: false,
      createdAt: new Date(),
    };
    this.lista.update((list) => [...list, lista]);
  }

  toggle(id: string) {
    this.lista.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.libres } : t))
    );
  }

  rename(id: string, title: string) {
    this.lista.update((list) =>
      list.map((t) => (t.id === id ? { ...t, title } : t))
    );
  }

  remove(id: string) {
    this.lista.update((list) => list.filter((t) => t.id !== id));
  }
  
}
