import { createFileRoute } from '@tanstack/react-router'
import { CreatePlaylist } from '../pages/CreatePlaylist';

export const Route = createFileRoute("/createplaylist")({
  component: () => <CreatePlaylist />
});

