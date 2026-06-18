export type TabId = 'home' | 'wiki' | 'recipes' | 'lore' | 'map' | 'commands' | 'status';

export interface Tab {
  id: TabId;
  label: string;
}
